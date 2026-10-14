// Japanese text-to-speech via the browser's built-in speechSynthesis (no backend).

let jaVoice = null

function pickVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()
  jaVoice = voices.find((v) => v.lang === 'ja-JP' && /Kyoko|Otoya|Google/.test(v.name))
    ?? voices.find((v) => v.lang?.startsWith('ja'))
    ?? null
  return jaVoice
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickVoice()
  window.speechSynthesis.onvoiceschanged = pickVoice
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
