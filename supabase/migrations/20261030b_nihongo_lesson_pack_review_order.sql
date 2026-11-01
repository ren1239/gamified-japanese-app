-- lesson_pack: review items ordered requested section → this chapter → earlier chapters, capped at 15.
-- (Full function body as applied; supersedes the definition in 20261030_nihongo_content.sql.)
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
  ),
  review as (
    -- missed grammar questions: the requested section first, then this chapter, then earlier chapters
    select q.point_key, q.prompt, q.jp, q.answer, b.wrong_count, b.due,
           row_number() over (order by (q.point_key in (select point_key from pts)) desc, (g.chapter = p_chapter) desc,
                                       b.wrong_count desc nulls last, g.chapter desc) as rn
    from bank b
    join grammar_questions q on b.key = q.point_key || '-' || q.qid
    join grammar_points g on g.point_key = q.point_key
    where g.chapter <= p_chapter
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
      'review_items', (select jsonb_agg(jsonb_build_object('point', point_key, 'prompt', prompt, 'jp', jp, 'answer', answer,
                                          'times_missed', wrong_count, 'due', due) order by rn)
                       from review where rn <= 15),
      'recent_sessions', (select jsonb_agg(to_jsonb(s) - 'id' order by s.held_at desc)
                          from (select * from voice_sessions where chapter = p_chapter order by held_at desc limit 3) s)
    )
  );
$$;

revoke all on function nihongo.lesson_pack(int, int, int) from public, anon, authenticated;
