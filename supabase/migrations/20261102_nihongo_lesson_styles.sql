-- Lesson styles for voice lessons. "Japanese lesson, chapter 15" → nihongo.start_lesson(15) works out the
-- chapter (default: the last voice lesson's), offers the styles, and picks the next section per style from
-- voice_sessions, so the claude.ai Project instructions only need to call it.

create table nihongo.lesson_styles (
  style      text primary key,              -- teach | translate | vocab — logged as voice_sessions.mode
  name       text not null,
  say_it     text[] not null default '{}',  -- what the learner might say to ask for it
  pack       text not null,                 -- query that loads the content; {chapter} / {section} are filled in
  how_to_run text not null,
  sort       int not null
);
alter table nihongo.lesson_styles enable row level security;
revoke all on nihongo.lesson_styles from public, anon, authenticated;

comment on column nihongo.voice_sessions.mode is 'lesson style key (nihongo.lesson_styles): teach | translate | vocab';
update nihongo.voice_sessions set mode = 'translate' where mode like 'translation drill%';

insert into nihongo.lesson_styles (style, name, say_it, pack, how_to_run, sort) values
('teach', 'Guided lesson', array['lesson', 'guided lesson', 'quiz', 'teach me'],
 'select nihongo.lesson_pack({chapter}, {section});',
 $t$For each point in the pack (usually one section):
1) Explain it in about a minute: what it is for, the formation (notes.formation), two examples from notes.examples.
2) Run notes.drills one at a time: say the cue, wait for my answer.
3) Ask the point's app questions as spoken prompts: say the English and the Japanese with the blank as "something". Never read the choices. Accept any correct answer, not only the app's.
4) Two or three minutes of free conversation where I have to use the pattern (ideas in notes.conversation).
5) Recap: three quick questions mixing this point with learner.review_items.
Correct each wrong answer in one or two sentences with the rule, have me say the right version once, then move on. Log misses with ref = the point key.$t$, 1),

('translate', 'Translation drill', array['translation', 'translate', 'sentences', 'english to japanese'],
 'select nihongo.lesson_pack({chapter}, {section});',
 $t$For each point in the pack, in order:
1) Name the point and give its rule in at most two sentences (rule / notes.formation).
2) Give me 5 English sentences, one at a time (I may ask for more or fewer). Make them up yourself; don't read the app questions or notes.drills verbatim. Use vocab.this_chapter first, then vocab.earlier, and favour learner.weak_vocab. Across the 5, vary affirmative / negative / past / question, plain vs polite, u-verb / ru-verb / irregular, include time words and places so particles get practised, aim at notes.pitfalls, and make the last one combine the pattern with an earlier one.
3) After each answer: if right, say so and give a more natural version only if there is one. If wrong, say the correct sentence, name the one thing that was off (form, particle, tense, word), and have me say it again.
4) Before the next point, re-test each kind of sentence I missed with a fresh sentence.
Log misses with ref = the point key.$t$, 2),

('vocab', 'Vocab test', array['vocab', 'words', 'vocabulary', 'vocab test'],
 'select nihongo.vocab_pack({chapter});',
 $t$Test me on `words` (this chapter) in rounds of 10, in the order given (words I haven't learned or have missed come first).
- Mostly English → Japanese: say the English, I say the Japanese. Every third word go Japanese → English instead.
- Verbs: the dictionary form is the answer (if I give the ます form, accept it and say the dictionary form).
- Right: a quick "yes" and on to the next. Wrong or "I don't know": say the word clearly, give a tiny memory hook or a short example sentence, and put it back to ask again later in the session.
- After each round, say my score and the missed words.
- When the chapter is done (or I stop), re-test every missed word once, then offer a bonus round of `earlier_weak`.
- If I say "sentences", switch to: you say a short English sentence using the word, I translate it.
Log misses with ref = the word key (e.g. ch15-n04).$t$, 3);

-- This chapter's words with the learner's status, plus weak words from earlier chapters.
create or replace function nihongo.vocab_pack(p_chapter int)
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
    select e->>'key' as key, (e->>'wrongCount')::int as wrong_count
    from st, jsonb_array_elements(coalesce(st.s->'wrongBank', '[]')) e
  ),
  w as (
    select v.word_key, v.chapter, v.sort, coalesce(nullif(v.kanji, ''), v.kana) as word, v.kana, v.english, v.category,
           v.word_key in (select word_key from learned) as learned,
           (select max(b.wrong_count) from bank b where b.key like 'ch' || v.chapter || '-vocab-' || v.word_id || '-%') as times_missed,
           coalesce((st.s->'wordProgress') ? v.word_key, false) as started
    from vocab v, st
    where v.chapter between 1 and p_chapter
  )
  select jsonb_build_object(
    'how_to_use', 'Follow the vocab style''s how_to_run from nihongo.start_lesson.',
    'chapter', (select jsonb_build_object('chapter', chapter, 'book', book, 'subtitle', subtitle) from chapters where chapter = p_chapter),
    'counts', (select jsonb_build_object('words', count(*), 'learned', count(*) filter (where learned)) from w where chapter = p_chapter),
    'words', (select jsonb_agg(jsonb_build_object('key', word_key, 'word', word, 'kana', kana, 'english', english, 'category', category,
                       'status', case when times_missed is not null then 'missed ' || times_missed || '×'
                                      when learned then 'learned' when started then 'learning' else 'new' end)
                     order by learned, times_missed desc nulls last, sort)
              from w where chapter = p_chapter),
    'earlier_weak', (select jsonb_agg(x.j) from (
                       select jsonb_build_object('key', word_key, 'word', word, 'kana', kana, 'english', english) as j
                       from w where chapter < p_chapter and not learned and (times_missed is not null or started)
                       order by times_missed desc nulls last, chapter desc limit 15) x),
    'recent_sessions', (select jsonb_agg(jsonb_build_object('held_at', held_at::date, 'summary', summary, 'missed', missed, 'next_focus', next_focus)
                                         order by held_at desc)
                        from (select * from voice_sessions where chapter = p_chapter and mode = 'vocab' order by held_at desc limit 3) s)
  );
$$;

-- Entry point for every voice lesson: chapter, styles, next section per style, how to start and log.
create or replace function nihongo.start_lesson(p_chapter int default null)
returns jsonb
language plpgsql stable
set search_path = nihongo, pg_temp
as $$
declare
  ch int := coalesce(p_chapter, (select chapter from voice_sessions where chapter is not null order by held_at desc limit 1));
begin
  if ch is null or not exists (select 1 from chapters where chapter = ch) then
    return jsonb_build_object(
      'how_to_start', 'Ask me which chapter, then run select nihongo.start_lesson(<chapter>); again.',
      'chapters', (select jsonb_agg(chapter || ' ' || subtitle order by chapter) from chapters));
  end if;

  return (
    with secs as (
      select section, label, title from grammar_points where chapter = ch and section is not null
    ),
    done as (
      select s.mode, u.section, max(s.held_at)::date as held_at
      from voice_sessions s, unnest(s.sections) as u(section)
      where s.chapter = ch
      group by s.mode, u.section
    ),
    styles as (
      select ls.*,
             case when ls.style <> 'vocab' then
               (select min(section) from secs where section not in (select d.section from done d where d.mode = ls.style))
             end as next_section
      from lesson_styles ls
    )
    select jsonb_build_object(
      'how_to_start', $h$You are my Japanese tutor in a voice lesson.
1. Chapter: this is for `chapter` (see chapter_from). If I asked for a different chapter, run select nihongo.start_lesson(<n>); again.
2. Style: if I said which one, use it (match my words to the styles' say_it). Otherwise ask in one short sentence: "Guided lesson, translation drill, or vocab test?"
3. Section (teach and translate): use the section I named, else the style's next_section, and say in one line which point we're on. If next_section is null I've done every section in that style: offer the whole chapter as a mixed review (run the pack with section null) or another chapter.
4. Run the style's `pack` query and follow its `how_to_run` (it overrides the pack's own how_to_use). If the style's last_session has a next_focus, start there.
5. Throughout: short spoken turns, one prompt at a time, wait for my answer. Japanese at my level, English only for explanations, never spell out romaji. If I say harder / easier / skip / next / stop, adapt at once. Answer side questions briefly, then carry on.
6. When I say stop or done (or after about 20 minutes, ask): give a 3-line recap (went well / to fix / next), then run `log_with` with the values filled in.$h$,
      'chapter', (select jsonb_build_object('chapter', chapter, 'book', book, 'subtitle', subtitle) from chapters where chapter = ch),
      'chapter_from', case when p_chapter is null then 'the last voice lesson' else 'you asked for it' end,
      'sections', (select jsonb_agg(jsonb_build_object(
                      'section', s.section, 'label', s.label, 'title', s.title,
                      'done', (select jsonb_object_agg(d.mode, d.held_at) from done d where d.section = s.section)
                    ) order by s.section) from secs s),
      'styles', (select jsonb_agg(jsonb_build_object(
                    'style', st.style, 'name', st.name, 'say_it', st.say_it, 'next_section', st.next_section,
                    'pack', replace(replace(st.pack, '{chapter}', ch::text), '{section}', coalesce(st.next_section::text, 'null')),
                    'last_session', (select jsonb_build_object('held_at', v.held_at::date, 'sections', v.sections,
                                                               'summary', v.summary, 'next_focus', v.next_focus)
                                     from voice_sessions v where v.chapter = ch and v.mode = st.style
                                     order by v.held_at desc limit 1),
                    'how_to_run', st.how_to_run
                  ) order by st.sort) from styles st),
      'log_with', 'insert into nihongo.voice_sessions (chapter, sections, mode, duration_min, summary, strengths, missed, next_focus) values ('
                  || ch || $l$, '{<sections covered; empty for vocab>}', '<style key>', <minutes>, '<2–4 sentences>', array['<strength>', '…'], '[{"ref":"<point key or word key>","prompt":"…","said":"…","correct":"…","note":"…"}]'::jsonb, '<what to start with next time>');$l$
    )
  );
end;
$$;

revoke all on function nihongo.vocab_pack(int) from public, anon, authenticated;
revoke all on function nihongo.start_lesson(int) from public, anon, authenticated;
comment on schema nihongo is 'Nihongo ToGo (Genki I/II) content + voice lesson log. Start every lesson with select nihongo.start_lesson(<chapter or null>);';
