# 授業 Lessons — the video half of Nihongo ToGo

Design canvas: https://claude.ai/artifact/1AcNMuXJQ4y6Tsq8jR42Rb (6 phone screens + notes)

The Learn tab is the **games** half (vocab + grammar quizzes). Lessons is the **video** half, built from
ToKini Andy's Genki course videos and wired into the same games, XP, streak and reviews.

## Content

| | |
|---|---|
| Courses | `beginner-japanese-genki-1-start-here` (L1–12), `beginner-japanese-genki-2` (L13–23) on tokiniandy.com (Kajabi) |
| Per lesson | 5 videos: Vocabulary · Grammar Stream Cut · Textbook Practice · Bonus Grammar Sentences · Listening & Shadowing |
| Catalogue | `~/Dev/genki-videos/data/catalog.tsv` (lesson, type, Kajabi post id, YouTube id, Wistia id) |
| Source | The YouTube copy: public, so yt-dlp works with no cookies. The Wistia id is kept as a fallback |
| Structure | Every video has YouTube chapters. Lesson 15 example below |

Lesson 15 (2 h 09 m total):

| Video | Length | Chapters |
|---|---|---|
| Vocabulary | 12:40 | Nouns · Godan · Ichidan · Complex/other verbs · Adverbs & expressions |
| Grammar Stream | 34:25 | 〜(よ)う · 〜(よ)うと思っています · 〜ておく · Clause + Noun (= the 4 existing `ch15-*` quizzes) |
| Textbook Practice | 20:30 | Volitional · Plans · Preparing · Noun phrases · Review |
| Bonus Sentences | 28:06 | each grammar point followed by a BONUS chapter |
| Listening & Shadowing | 33:35 | 7 dialogues (Book I–III, Stream I–IV) × 8 stages (Listen → Read → Translation → Slow → Medium read-aloud → Medium shadow → Normal read-aloud → Normal shadow) |

## Decision: one file per video, chapters as "virtual clips"

We don't split videos with ffmpeg. Each video stays one MP4, and the UI treats each chapter as its own clip:

- **The user sees units, not files.** Tap a grammar point and only that range plays. The scrubber zooms to the
  point (0:43 / 7:13), it pauses at the end and hands off to the quiz, and it can loop. That is the UX benefit
  of splitting without the costs below.
- **Continuous watching still works.** Separate files leave a gap or rebuffer at every boundary, unless we
  build double-buffered players.
- **Chapter times are data, not baked cuts.** YouTube timestamps are sometimes a second off, a BONUS chapter
  may need merging, and point names must match quiz ids. With virtual clips we edit `points.json`; with split
  files we would have to re-cut and re-encode.
- **Shadowing would be 57 tiny files per lesson** (7 × 8 stages of 20–70 s). One file plus ranges is far simpler.
- **Seeking is instant when served locally.** The MP4 is `+faststart`, and we put a keyframe at every chapter start during
  the re-encode (`-force_key_frames` with the chapter times), so jumps land frame-exact.

We'd only split later if we move to hosted streaming, and then it would be HLS segments anyway.

## Media pipeline (`~/Dev/genki-videos/`, same tools as Rehab Monster: `~/.local/bin/yt-dlp`, `ffmpeg`)

1. `fetch_meta.sh`: `yt-dlp -J` → `data/meta/<id>.json` (title, duration, chapters). Sleep between calls: subtitle
   requests hit HTTP 429 quickly, so subtitles are a separate, slow pass (auto-captions only, for later transcript features).
2. Download 360p (`-f 134+140`, needs `--js-runtimes node:<path>`, otherwise YouTube throttles to a crawl).
   The user picked 360p over 720p.
3. Encode (`encode_test.sh` results on the 34:25 L15 grammar stream, 96 MB as downloaded):

   | Variant | Size | Notes |
   |---|---|---|
   | A: YouTube video untouched, audio 64k | 80 MB | |
   | **B: H.264 CRF 28 slow, AAC 48k mono** | **49 MB** | looks the same as the source, plays everywhere |
   | C: H.264 CRF 31 | 40 MB | slightly soft furigana and small grey text |
   | D: HEVC CRF 30 (hvc1) | 39 MB | no real gain over C, weaker browser support |

   Plus `-movflags +faststart`, a keyframe at each chapter start, and a poster `.jpg` per video.
4. `build-lessons.mjs` → `src/data/lessons.generated.js`: lessons → videos → points `{start, end, title, quizId?}`,
   merged with a hand-written `points.overrides.json` (rename points, merge BONUS chapters, map to quiz ids).
5. Serve locally: `public/media` → symlink to the encoded folder (Vite serves range requests). `VITE_MEDIA_BASE`
   overrides it for hosting later.

## App integration (`~/Dev/japanese`)

- **Nav**: a 5th tab `lessons` (授業) in `BottomNav.jsx`, between Learn and Review.
- **Screens**: `LessonsScreen` (continue card, Genki I/II switch, lesson rows with 5 dots), `LessonScreen` (5-video
  timeline + linked games + まとめ), `PlayerScreen` (clip scrubber, points list, loop / pause-at-end, speed),
  `ShadowingMode` (dialogue chips, 8-stage stepper, repeat stage, audio-only).
- **Track colours**: indigo = vocab, vermilion = grammar (existing), plus a new 紫 purple `--listen` token for shadowing
  (needs `-deep`/`-tint` and dark-mode values in `index.css`).
- **Progress** (`statsStore`, add to `partialize`, bump `version`): `videoProgress[videoId] = { pos, points: {i: maxPct}, doneAt }`
  and `lastVideo` for the Continue card. A point counts as watched at ≥ 90%. A video is done when all its points are.
- **XP**: +10 per point watched, counted toward the daily goal and streak, so videos and games share one economy.
- **Links into games**: `point.quizId` → existing `onStartQuiz(quizMap[quizId])`; Vocabulary → `onFlashcard({chapter})`;
  end of lesson → `chNN-review`.
- **Offline**: Workbox CacheFirst on `/media/*` with range requests (copy Rehab Monster's config), plus per-lesson Save/Remove.

## Status (2026-10-18)

Built: Lessons tab, lesson timeline, player (virtual clips, checkpoint → quiz, shadowing stepper), Settings folder picker, video progress + XP. Lesson 15: 5 videos encoded, 159 MB. Tested on desktop and at phone width in Chrome.

## MVP: Lesson 15 only

- [ ] Quality test: 360p vs 720p→540p on the Grammar Stream (size + legibility of on-screen text)
- [ ] Download + encode the 5 Lesson 15 videos; `points.json` for L15 with quiz ids
- [ ] Lessons tab with L15 live, every other lesson listed from the catalogue as "coming soon"
- [ ] Lesson screen, player with virtual clips, checkpoint → quiz, shadowing stepper
- [ ] Progress + XP persisted; Continue card
- Not in the MVP: recording yourself, transcripts, Save-offline button (cache-on-play only), hosting

## Caveat

The app is deployed publicly on Vercel. Keep `public/media` out of the deploy (gitignored symlink, local only) unless
you have the rights to host these videos.
