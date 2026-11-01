-- Nihongo ToGo content for voice lessons in Claude chat.
-- Lives in its own `nihongo` schema in the shared macro-monster project: not exposed to the
-- Data API, no anon/authenticated access. Claude chat reads it through the Supabase connector
-- (`select nihongo.lesson_pack(15, 1);`). Content is loaded from the repo by
-- `npm run content:sql` → supabase/content/*.sql (see CLAUDE.md §16).

create schema if not exists nihongo;
revoke all on schema nihongo from public, anon, authenticated;
comment on schema nihongo is 'Nihongo ToGo (Genki I/II) content + voice lesson log. Start with nihongo.lesson_pack(chapter, section).';

-- Who the learner is (progress comes from public.nihongo_progress for this account)
create table nihongo.settings (
  key text primary key,
  value text not null
);

create table nihongo.chapters (
  chapter   int primary key,             -- 0 = conjugation drills, 1–12 Genki I, 13–23 Genki II
  book      text not null,               -- 'Basics' | 'Genki I' | 'Genki II'
  title     text not null,               -- 'Chapter 15'
  subtitle  text not null,               -- '長野旅行'
  loaded_at timestamptz not null default now()
);

create table nihongo.vocab (
  word_key  text primary key,            -- 'ch15-n04' — same key the app uses for learned words
  chapter   int not null references nihongo.chapters on delete cascade,
  word_id   text not null,               -- 'n04'
  kana      text not null,
  kanji     text not null default '',
  english   text not null,
  category  text not null,               -- noun | u-verb | ru-verb | irregular | other
  sort      int not null
);
create index on nihongo.vocab (chapter, sort);

create table nihongo.grammar_points (
  point_key text primary key,            -- the quiz id ('ch15-volitional') or 'ch5-s3' when there is no quiz
  chapter   int not null references nihongo.chapters on delete cascade,
  section   int,                         -- 1, 2, 3… in textbook order; null for the まとめ review quiz
  kind      text not null default 'grammar', -- grammar | review | drill
  label     text not null,               -- '〜(よ)う'
  title     text not null,               -- 'Volitional form'
  summary   text,                        -- one line: what it's for
  rule      text,                        -- the app's rule text (hint sheet)
  notes     jsonb,                       -- teaching notes: formation, examples, pitfalls, drills, conversation
  has_quiz  boolean not null default false,
  unique (chapter, section)
);

create table nihongo.grammar_questions (
  point_key   text not null references nihongo.grammar_points on delete cascade,
  qid         int not null,              -- question id; the app's review key is '<point_key>-<qid>'
  prompt      text not null,
  jp          text,
  answer      text not null,
  distractors text[] not null,
  explanation text,
  primary key (point_key, qid)
);

-- Voice lessons held in Claude chat
create table nihongo.voice_sessions (
  id           bigint generated always as identity primary key,
  held_at      timestamptz not null default now(),
  chapter      int references nihongo.chapters,
  sections     int[] not null default '{}',
  mode         text,                     -- grammar | vocab | conversation | mixed
  duration_min int,
  summary      text,                     -- 2–4 sentences: what was practised, how it went
  strengths    text[] not null default '{}',
  missed       jsonb not null default '[]', -- [{ "ref": "ch15-volitional" | "ch15-n04", "prompt": "…", "said": "…", "correct": "…", "note": "…" }]
  next_focus   text                      -- what to start with next time
);
create index on nihongo.voice_sessions (chapter, held_at desc);

alter table nihongo.settings          enable row level security;
alter table nihongo.chapters          enable row level security;
alter table nihongo.vocab             enable row level security;
alter table nihongo.grammar_points    enable row level security;
alter table nihongo.grammar_questions enable row level security;
alter table nihongo.voice_sessions    enable row level security;

-- One chapter of content, replaced as a whole (called by supabase/content/chNN.sql)
create or replace function nihongo.load_chapter(doc jsonb)
returns text
language plpgsql
set search_path = nihongo, pg_temp
as $$
declare
  n int := (doc->>'chapter')::int;
begin
  insert into chapters (chapter, book, title, subtitle, loaded_at)
  values (n, doc->>'book', doc->>'title', doc->>'subtitle', now())
  on conflict (chapter) do update
    set book = excluded.book, title = excluded.title, subtitle = excluded.subtitle, loaded_at = now();

  delete from vocab where chapter = n;
  insert into vocab (word_key, chapter, word_id, kana, kanji, english, category, sort)
  select 'ch' || n || '-' || (w->>'id'), n, w->>'id', w->>'kana', coalesce(w->>'kanji', ''), w->>'english', w->>'category', ord::int
  from jsonb_array_elements(doc->'vocab') with ordinality as t(w, ord);

  delete from grammar_points where chapter = n;   -- cascades to questions
  insert into grammar_points (point_key, chapter, section, kind, label, title, summary, rule, notes, has_quiz)
  select p->>'key', n, (p->>'section')::int, coalesce(p->>'kind', 'grammar'), p->>'label', p->>'title',
         p->>'summary', p->>'rule', p->'notes', jsonb_array_length(coalesce(p->'questions', '[]')) > 0
  from jsonb_array_elements(doc->'points') as p;

  insert into grammar_questions (point_key, qid, prompt, jp, answer, distractors, explanation)
  select p->>'key', (q->>'id')::int, q->>'prompt', q->>'jp', q->>'answer',
         array(select jsonb_array_elements_text(q->'distractors')), q->>'explanation'
  from jsonb_array_elements(doc->'points') as p, jsonb_array_elements(coalesce(p->'questions', '[]')) as q;

  return format('chapter %s: %s words, %s points, %s questions', n,
    jsonb_array_length(doc->'vocab'), jsonb_array_length(doc->'points'),
    (select count(*) from grammar_questions q join grammar_points g using (point_key) where g.chapter = n));
end;
$$;

-- The learner's synced app progress (single learner, set in nihongo.settings)
create or replace function nihongo.learner_state()
returns jsonb
language sql stable
set search_path = nihongo, public, pg_temp
as $$
  select p.state->'stats'
  from public.nihongo_progress p
  where p.user_id = (select value::uuid from nihongo.settings where key = 'learner_user_id');
$$;

-- Everything a voice lesson needs, as one JSON object.
--   p_section null → all sections of the chapter
--   vocab: this chapter in full; chapters p_vocab_from … p_chapter-1 as compact lines
create or replace function nihongo.lesson_pack(p_chapter int, p_section int default null, p_vocab_from int default 1)
returns jsonb
language sql stable
set search_path = nihongo, pg_temp
as $$
  with st as (select nihongo.learner_state() as s),
  learned as (
    select e->>'wordId' as word_key
    from st, jsonb_array_elements(coalesce(st.s->'learnedBank', '[]')) e
  ),
  bank as (
    select e->>'key' as key, (e->>'box')::int as box, (e->>'wrongCount')::int as wrong_count, e->>'due' as due
    from st, jsonb_array_elements(coalesce(st.s->'wrongBank', '[]')) e
  ),
  pts as (
    select * from grammar_points
    where chapter = p_chapter and (p_section is null and kind <> 'review' or section = p_section)
  ),
  weak_vocab as (
    -- missed in a quiz (still in the review bank) or started but not yet learned, chapters ≤ p_chapter
    select v.word_key, v.chapter, v.kanji, v.kana, v.english,
           max(b.wrong_count) as wrong_count
    from vocab v
    left join bank b on b.key like 'ch' || v.chapter || '-vocab-' || v.word_id || '-%'
    left join st on true
    where v.chapter between p_vocab_from and p_chapter
      and v.word_key not in (select word_key from learned)
      and (b.key is not null or (st.s->'wordProgress') ? v.word_key)
    group by v.word_key, v.chapter, v.kanji, v.kana, v.english
  )
  select jsonb_build_object(
    'how_to_use', 'You are a Japanese tutor running a spoken lesson. Teach the grammar in `points` (notes = formation, examples, pitfalls, drills, conversation ideas; questions = the app''s quiz items, use them as spoken prompts, never read the choices out). Build sentences from `vocab.this_chapter` first, then `vocab.earlier`; prefer words in `learner.weak_vocab` and revisit `learner.review_items`. One prompt at a time, wait for the answer, correct briefly with the rule, then move on. Speak mostly Japanese at the learner''s level with short English explanations. At the end, log the session: insert into nihongo.voice_sessions (chapter, sections, mode, duration_min, summary, strengths, missed, next_focus).',
    'chapter', (select to_jsonb(c) - 'loaded_at' from chapters c where c.chapter = p_chapter),
    'sections', (select jsonb_agg(jsonb_build_object('section', section, 'label', label, 'title', title) order by section)
                 from grammar_points where chapter = p_chapter and section is not null),
    'points', (select jsonb_agg(jsonb_build_object(
                  'section', p.section, 'key', p.point_key, 'label', p.label, 'title', p.title,
                  'summary', p.summary, 'rule', p.rule, 'notes', p.notes,
                  'questions', (select jsonb_agg(jsonb_build_object('prompt', q.prompt, 'jp', q.jp, 'answer', q.answer, 'explanation', q.explanation) order by q.qid)
                                from grammar_questions q where q.point_key = p.point_key)
                ) order by p.section) from pts p),
    'vocab', jsonb_build_object(
      'this_chapter', (select jsonb_agg(jsonb_build_object('key', v.word_key, 'kanji', v.kanji, 'kana', v.kana, 'english', v.english,
                                'category', v.category, 'learned', v.word_key in (select word_key from learned)) order by v.sort)
                       from vocab v where v.chapter = p_chapter),
      'earlier', (select jsonb_agg(case when v.kanji = '' then v.kana else v.kanji || '（' || v.kana || '）' end || ' ' || v.english
                                   order by v.chapter, v.sort)
                  from vocab v where v.chapter >= p_vocab_from and v.chapter < p_chapter and v.chapter > 0)
    ),
    'learner', jsonb_build_object(
      'name', (select s->>'username' from st),
      'streak', (select s->'streak' from st),
      'words_learned', (select count(*) from learned),
      'weak_vocab', (select jsonb_agg(jsonb_build_object('key', word_key, 'chapter', chapter, 'word', coalesce(nullif(kanji, ''), kana), 'kana', kana, 'english', english, 'times_missed', wrong_count)
                                      order by wrong_count desc nulls last, chapter desc) from weak_vocab),
      'review_items', (select jsonb_agg(jsonb_build_object('point', q.point_key, 'prompt', q.prompt, 'jp', q.jp, 'answer', q.answer,
                                          'times_missed', b.wrong_count, 'due', b.due) order by b.wrong_count desc)
                       from bank b join grammar_questions q on b.key = q.point_key || '-' || q.qid
                       join grammar_points g on g.point_key = q.point_key
                       where g.chapter <= p_chapter),
      'recent_sessions', (select jsonb_agg(to_jsonb(s) - 'id' order by s.held_at desc)
                          from (select * from voice_sessions where chapter = p_chapter order by held_at desc limit 3) s)
    )
  );
$$;

-- Quick table of contents
create or replace view nihongo.syllabus as
  select c.chapter, c.book, c.subtitle, g.section, g.label, g.title, g.has_quiz, g.notes is not null as has_notes,
         (select count(*) from nihongo.vocab v where v.chapter = c.chapter) as vocab_words
  from nihongo.chapters c
  left join nihongo.grammar_points g on g.chapter = c.chapter and g.section is not null
  order by c.chapter, g.section;

revoke all on all tables in schema nihongo from public, anon, authenticated;
revoke all on all functions in schema nihongo from public, anon, authenticated;

-- Upload endpoint for `npm run content:push`: callable with the public anon key, but only does
-- anything with the content key from .env.local (the database keeps just its SHA-256).
create or replace function public.nihongo_load_content(doc jsonb, content_key text)
returns text
language plpgsql
security definer
set search_path = nihongo, extensions, pg_temp
as $$
begin
  if content_key is null
     or encode(extensions.digest(content_key, 'sha256'), 'hex') is distinct from
        (select value from nihongo.settings where key = 'content_key_sha256') then
    raise exception 'invalid content key' using errcode = '28000';
  end if;
  return nihongo.load_chapter(doc);
end;
$$;
revoke all on function public.nihongo_load_content(jsonb, text) from public, authenticated;
grant execute on function public.nihongo_load_content(jsonb, text) to anon;
