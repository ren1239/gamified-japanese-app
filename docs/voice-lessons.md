# Voice lessons in Claude chat

Nihongo ToGo's content (vocab, grammar points, quiz questions, teaching notes) and your synced
progress are readable from Supabase, so a Claude chat can run a spoken lesson from them.

## One-time setup (claude.ai)

1. **Connect Supabase**: Settings → Connectors → Supabase → Connect, sign in, allow the
   **macro-monster** project. (The connector can see the whole project; the instructions below keep
   Claude inside the `nihongo` schema.)
2. **Make a Project** called 日本語 Tutor and paste the instructions below into its custom instructions.
3. Start every lesson in that Project. In the mobile app you can switch to voice once the lesson
   has loaded. If voice mode in your app version can't call connectors, send the first message
   ("Japanese lesson, chapter 15") as text, then switch to voice.

## Project instructions (paste this)

```
You are my Japanese tutor. I study Genki I & II; my lessons and progress live in Supabase
(project macro-monster, schema `nihongo`). Only read the nihongo schema, and only write to
nihongo.voice_sessions.

Whenever I ask for a Japanese lesson, in any words ("Japanese lesson, chapter 15",
"vocab test", "let's do translation"), first run:
    select nihongo.start_lesson(<chapter number, or null if I didn't say one>);
and follow its how_to_start. Don't ask me for section numbers: it works out where I'm up to.

When I say stop or done, give a 3-line recap and save the session with the log_with
query from start_lesson. If you no longer have it, run start_lesson again to get it.
```

## Lesson styles

Just say what you want; `start_lesson` matches your words, picks the chapter (the one you name, else
your last voice lesson's) and the next section you haven't done in that style.

| Style | Say | What happens |
|-------|-----|--------------|
| Guided lesson (`teach`) | "lesson", "quiz", "teach me" | Short explanation → drills → the app's quiz questions spoken → conversation → recap |
| Translation drill (`translate`) | "translation", "sentences" | Per grammar point: the rule, then 5 English sentences you put into Japanese; misses re-tested |
| Vocab test (`vocab`) | "vocab", "words" | The chapter's words in rounds of 10 (EN→JP, some JP→EN), unlearned and missed words first; misses re-tested at the end |

Mid-lesson you can say "harder", "easier", "skip", "next", "sentences" (vocab → sentence mode) or "stop".
Each lesson is logged with `mode` = the style key, so next time it carries on from there.
The styles live in `nihongo.lesson_styles` (one row each: `how_to_run` is the script) — edit a row
to change how a style runs, or insert a row to add a style.

## Handy queries

```sql
select nihongo.start_lesson(15);                      -- styles + where I'm up to (null = last chapter)
select nihongo.vocab_pack(15);                        -- vocab test content
select nihongo.lesson_pack(15, 1);                    -- one section
select nihongo.lesson_pack(15);                       -- whole chapter
select nihongo.lesson_pack(15, 1, 13);                -- vocab from Ch.13 onward only
select * from nihongo.syllabus where chapter = 15;    -- table of contents
select held_at, chapter, summary, next_focus from nihongo.voice_sessions order by held_at desc limit 5;
```
