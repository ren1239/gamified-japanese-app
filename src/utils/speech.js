// Japanese text-to-speech via the browser's built-in speechSynthesis (no backend).
//
// Every device offers a different set of Japanese voices (Mac Chrome: Apple's Kyoko/O-Ren/Hattori, eight
// novelty voices and the network "Google 日本語"; Android: Google TTS local/network variants; iPhone:
// Kyoko/Otoya/O-ren). Taking the first match picked whichever came first — often a robotic compact voice.
// Instead voices are ranked (natural/network first, female before male, novelty and compact last), and a
// choice made in Settings → Quizzes & flashcards → Voice is remembered per device.

const PREF_KEY = 'nihongo-voice' // voiceURI picked in Settings, this device only
let jaVoice = null

/** Higher = more natural-sounding. Unknown voices score 0. */
function voiceScore(v) {
  const n = `${v.name} ${v.voiceURI}`.toLowerCase()
  let s = 0
  if (/premium/.test(n)) s += 60
  if (/enhanced|neural|natural/.test(n)) s += 50
  if (/google/.test(n)) s += 40 // Chrome's network voice: far smoother than compact system voices
  if (/network/.test(n)) s += 30 // Android Google TTS network variants beat the -local ones
  if (v.localService === false) s += 5
  if (/kyoko|o-?ren|x-htm|x-jab|nanami|haruka|ayumi|female/.test(n)) s += 10 // female first
  else if (/otoya|hattori|ichiro|keita|x-jac|x-jad|male/.test(n)) s -= 10
  if (/compact/.test(n)) s -= 20
  if (/eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley/.test(n)) s -= 30 // Apple novelty voices
  return s
}

/** Japanese voices on this device, best first. */
export function japaneseVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return []
  return window.speechSynthesis.getVoices()
    .filter((v) => /^ja/i.test(v.lang))
    .sort((a, b) => voiceScore(b) - voiceScore(a))
}

function savedVoiceURI() {
  try { return localStorage.getItem(PREF_KEY) } catch { return null }
}

function pickVoice() {
  const voices = japaneseVoices()
  const saved = savedVoiceURI()
  jaVoice = voices.find((v) => v.voiceURI === saved) ?? voices[0] ?? null
  return jaVoice
}

/** Remember a voice for this device ('' = back to automatic). */
export function setVoice(voiceURI) {
  try {
    if (voiceURI) localStorage.setItem(PREF_KEY, voiceURI)
    else localStorage.removeItem(PREF_KEY)
  } catch { /* private mode: choice lasts for this session */ }
  pickVoice()
}

export function currentVoiceURI() {
  return savedVoiceURI() ?? ''
}

/** Call cb whenever the voice list changes (it loads asynchronously). Returns an unsubscribe function. */
export function onVoicesChanged(cb) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return () => {}
  window.speechSynthesis.addEventListener('voiceschanged', cb)
  return () => window.speechSynthesis.removeEventListener('voiceschanged', cb)
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickVoice()
  window.speechSynthesis.addEventListener('voiceschanged', pickVoice)
}

export const canSpeak = typeof window !== 'undefined' && !!window.speechSynthesis

const HAS_JAPANESE = /[぀-ヿ一-鿿]/

export function speakJapanese(text, rate = 0.9) {
  if (!canSpeak || !text || !HAS_JAPANESE.test(text)) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'
  u.rate = rate
  const voice = jaVoice ?? pickVoice()
  if (voice) u.voice = voice
  window.speechSynthesis.speak(u)
}

/**
 * What to read aloud for a quiz question. Vocab questions carry `_speak` (kana).
 * Grammar questions read the jp sentence, with the blank filled in once answered.
 */
export function speechTextFor(q, answered) {
  if (!q) return null
  // EN→JP vocab: speaking before answering would give the answer away
  if (q._speak) return q.jp || answered ? q._speak : null
  if (!q.jp) return null
  const blank = /_{2,}|＿+/
  if (blank.test(q.jp)) {
    if (!answered) return null
    const answer = q.choices[q.correct]
    return HAS_JAPANESE.test(answer) ? q.jp.replace(blank, answer) : null
  }
  return q.jp
}
