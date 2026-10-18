import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useStatsStore } from '../store/statsStore'
import { useQuizStore } from '../store/quizStore'
import { usePWAInstall } from '../hooks/usePWAInstall'
import Mascot from '../components/Mascot'
import Icon from '../components/Icon'
import ChipGroup from '../components/ChipGroup'
import { useVideoSource, canPickFolder, pickVideoFolder, reconnectVideoFolder, loadFolderFiles, forgetVideoFolder, countAvailable, testMediaServer } from '../utils/videoSource'
import { japaneseVoices, currentVoiceURI, setVoice, onVoicesChanged, speakJapanese, canSpeak } from '../utils/speech'
import { pushSupport, enableReminders, disableReminders, sendTestReminder, syncReminders } from '../utils/push'

const THEME_OPTIONS = [
  { id: 'system', label: 'Match device' },
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
]

const GOAL_OPTIONS = [
  { id: 30, label: 'Casual · 30' },
  { id: 50, label: 'Regular · 50' },
  { id: 100, label: 'Serious · 100' },
  { id: 200, label: 'Intense · 200' },
]

const EVENING_OPTIONS = [18, 19, 20, 21, 22].map((h) => ({ id: h, label: `${h - 12}pm` }))
const MORNING_OPTIONS = [7, 8, 9, 10].map((h) => ({ id: h, label: `${h}am` }))
const PUSH_HELP = {
  'ios-home-screen': 'On iPhone, add the app to your Home Screen first (Share → Add to Home Screen), then turn reminders on from there.',
  unsupported: "This browser can't show notifications. Try Chrome, Edge or Safari on a recent device.",
  denied: 'Notifications are blocked for this site. Allow them in your browser or system settings, then try again.',
}

// Settings → Quizzes & flashcards → Voice: which of this device's Japanese voices reads quizzes aloud.
// Automatic = the best-ranked one (natural/network, female first); a choice is remembered per device.
function VoiceBlock() {
  const [voices, setVoices] = useState(() => japaneseVoices())
  const [uri, setUri] = useState(() => currentVoiceURI())
  useEffect(() => onVoicesChanged(() => setVoices(japaneseVoices())), [])
  if (!canSpeak) return null
  const choose = (value) => { setUri(value); setVoice(value); speakJapanese('こんにちは。日本語を勉強しましょう。') }
  return (
    <section className="stats-card settings-block">
      <div className="settings-block-head">
        <span className="icon-chip"><Icon name="speaker" size={22} /></span>
        <span className="settings-item-text">
          <b>Voice</b>
          <small>{voices.length ? 'Reads Japanese aloud in quizzes and flashcards. Each device keeps its own choice.' : 'No Japanese voice on this device yet. Add one in your system’s speech settings.'}</small>
        </span>
      </div>
      {voices.length > 0 && (
        <div className="settings-actions">
          <select className="settings-select" value={uri} onChange={(e) => choose(e.target.value)} aria-label="Japanese voice">
            <option value="">Automatic · {voices[0].name}</option>
            {voices.map((v) => <option key={v.voiceURI} value={v.voiceURI}>{v.name}{v.localService ? '' : ' (online)'}</option>)}
          </select>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => speakJapanese('こんにちは。日本語を勉強しましょう。')}>Test</button>
        </div>
      )}
    </section>
  )
}

// Settings → Lesson videos: the folder on this computer that holds the encoded lesson videos.
// The deployed app never hosts them; see utils/videoSource.js.
function VideoFolderBlock() {
  const { status, folderName, files } = useVideoSource()
  const inputRef = useRef(null)
  const [msg, setMsg] = useState(null)
  const found = status === 'ready' ? countAvailable(files) : 0
  const choose = async () => {
    setMsg(null)
    if (!canPickFolder) { inputRef.current?.click(); return }
    try { await pickVideoFolder() } catch (e) { if (e?.name !== 'AbortError') setMsg("Couldn't open that folder.") }
  }
  const sub = status === 'ready' ? `“${folderName}” · ${found} lesson video${found === 1 ? '' : 's'} found`
    : status === 'scanning' ? `Looking through “${folderName}”…`
      : status === 'reconnect' ? `“${folderName}” · the browser needs one click to open it again`
        : 'Not connected. Lesson videos play from a folder on this computer.'
  return (
    <section className="stats-card settings-block">
      <div className="settings-block-head">
        <span className="icon-chip accent"><Icon name="folder" size={22} /></span>
        <span className="settings-item-text"><b>Video folder</b><small>{sub}</small></span>
      </div>
      <div className="settings-actions">
        {status === 'reconnect' && <button type="button" className="btn btn-primary btn-sm" onClick={() => reconnectVideoFolder().catch(() => setMsg('Access was not granted.'))}>Reconnect</button>}
        <button type="button" className={`btn btn-sm ${status === 'none' ? 'btn-primary' : 'btn-ghost'}`} onClick={choose}>{status === 'none' ? 'Choose folder' : 'Change folder'}</button>
        {status !== 'none' && <button type="button" className="btn btn-ghost btn-sm" onClick={() => forgetVideoFolder()}>Forget</button>}
        <input ref={inputRef} type="file" webkitdirectory="" multiple hidden onChange={(e) => e.target.files?.length && loadFolderFiles(e.target.files)} />
      </div>
      <p className="settings-note">
        Files named like <b>15-stream.mp4</b> (or containing the YouTube id) are matched automatically, in subfolders too.
        {canPickFolder ? ' Chrome and Edge remember the folder.' : ' This browser forgets the folder when the tab closes: Chrome or Edge remember it.'}
        {' '}On a phone, lessons link to YouTube instead.
      </p>
      {msg && <p className="settings-note" role="status">{msg}</p>}
    </section>
  )
}

// Settings → Lesson videos → Video server: the Cloudflare Worker that streams the lessons to any device.
// URL + key stay on this device. "Copy setup link" carries them to another device in the link's #fragment,
// which browsers never send to a server.
function VideoServerBlock() {
  const saved = useStatsStore((st) => st.mediaServer)
  const setMediaServer = useStatsStore((st) => st.setMediaServer)
  const [url, setUrl] = useState(saved?.url ?? '')
  const [key, setKey] = useState(saved?.key ?? '')
  const [state, setState] = useState(null) // null | 'checking' | 'ok' | 'forbidden' | 'unreachable' | 'copied'
  const connected = Boolean(saved?.url && saved?.key)
  const save = async () => {
    setState('checking')
    const result = await testMediaServer({ url, key })
    setState(result)
    if (result === 'ok') setMediaServer({ url, key })
  }
  const copyLink = async () => {
    const link = `${window.location.origin}/#media=${encodeURIComponent(saved.url)}&k=${encodeURIComponent(saved.key)}`
    try { await navigator.clipboard.writeText(link); setState('copied') } catch { setState(null) }
  }
  const msg = {
    checking: 'Checking…',
    ok: 'Connected. Lessons stream from the server when they aren’t in your folder.',
    forbidden: 'The server answered, but the key is wrong.',
    unreachable: 'Couldn’t reach that address.',
    copied: 'Setup link copied. Open it on your phone once and it’s connected.',
  }[state]
  return (
    <section className="stats-card settings-block">
      <div className="settings-block-head">
        <span className="icon-chip"><Icon name="lesson" size={22} /></span>
        <span className="settings-item-text">
          <b>Video server</b>
          <small>{connected ? `Streaming from ${saved.url.replace(/^https?:\/\//, '')}` : 'Stream lessons on any device, phone included, from your Cloudflare server.'}</small>
        </span>
      </div>
      <label className="settings-field"><span className="field-label">Server address</span>
        <input type="url" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://nihongo-media.<you>.workers.dev" autoComplete="off" spellCheck={false} />
      </label>
      <label className="settings-field"><span className="field-label">Access key</span>
        <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="Paste the key" autoComplete="off" spellCheck={false} />
      </label>
      <div className="settings-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={save} disabled={!url || !key || state === 'checking'}>{connected ? 'Update' : 'Connect'}</button>
        {connected && <button type="button" className="btn btn-ghost btn-sm" onClick={copyLink}>Copy setup link</button>}
        {connected && <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setMediaServer({ url: '', key: '' }); setUrl(''); setKey(''); setState(null) }}>Disconnect</button>}
      </div>
      {msg && <p className="settings-note" role="status">{msg}</p>}
    </section>
  )
}

function Switch({ on }) {
  return <span className={`switch${on ? ' on' : ''}`} aria-hidden="true"><i /></span>
}

function ToggleItem({ icon, tone = 'primary', title, sub, on, onToggle }) {
  return (
    <button type="button" className="settings-item" role="switch" aria-checked={on} onClick={onToggle}>
      <span className={`icon-chip ${tone}`}>{icon}</span>
      <span className="settings-item-text"><b>{title}</b><small>{sub}</small></span>
      <Switch on={on} />
    </button>
  )
}

export default function SettingsScreen() {
  const { canInstall, isIOS, install, installed } = usePWAInstall()
  const s = useStatsStore()
  const resetQuizzesProgress = useQuizStore((st) => st.resetQuizzesProgress)
  const [confirmReset, setConfirmReset] = useState(false)
  const [resetDone, setResetDone] = useState(false)

  const [pushBusy, setPushBusy] = useState(false)
  const [pushMsg, setPushMsg] = useState(null)
  const support = pushSupport()

  const toggleReminders = async () => {
    setPushBusy(true)
    setPushMsg(null)
    try {
      if (s.remindersOn) { await disableReminders(); setPushMsg('Reminders are off.') }
      else { await enableReminders(); setPushMsg("Reminders are on. You'll get at most two a day.") }
    } catch (e) {
      setPushMsg(PUSH_HELP[e.reason] ?? `Couldn't turn on reminders: ${e.message}`)
    } finally {
      setPushBusy(false)
    }
  }
  const setPref = (patch) => { s.setReminders(patch); syncReminders() }
  const test = async () => {
    setPushBusy(true)
    setPushMsg(null)
    try { await sendTestReminder(); setPushMsg('Test sent. It should appear in a few seconds.') }
    catch (e) { setPushMsg(`Test failed: ${e.message}`) }
    finally { setPushBusy(false) }
  }

  const doReset = () => {
    s.resetStats()
    resetQuizzesProgress()
    setConfirmReset(false)
    setResetDone(true)
  }

  return (
    <div className="page settings-page">
      <header>
        <h1 className="tab-title">Settings</h1>
        <p className="tab-sub">Your profile, daily goal, video folder and how quizzes behave.</p>
      </header>

      {/* ── Profile ── */}
      <section className="stats-card settings-profile">
        <div className="stats-avatar"><Mascot who="nori" mood="happy" size={52} className="mascot-idle" /></div>
        <label className="settings-name" htmlFor="settings-name">
          <span className="field-label">Your name</span>
          <input id="settings-name" type="text" value={s.username} onChange={(e) => s.setUsername(e.target.value)} placeholder="Student" maxLength={24} autoComplete="nickname" />
        </label>
      </section>

      {/* ── Daily goal ── */}
      <h2 className="stats-h">Daily goal</h2>
      <section className="stats-card settings-block">
        <div className="settings-block-head">
          <span className="icon-chip accent"><Icon name="target" size={22} /></span>
          <span className="settings-item-text"><b>XP per day</b><small>Hitting it keeps your streak alive. Watching earns 2 XP a minute; a quiz is roughly 100 XP.</small></span>
        </div>
        <ChipGroup options={GOAL_OPTIONS} value={s.dailyGoal} onChange={s.setDailyGoal} />
      </section>

      {/* ── Lessons ── */}
      <h2 className="stats-h">Quizzes &amp; flashcards</h2>
      <section className="stats-card settings-list">
        <ToggleItem icon={<span className="jp" style={{ fontWeight: 800, fontSize: 18 }}>あ</span>} title="Show romaji" sub="Readings under Japanese everywhere. Also one tap from any header." on={s.showRomaji} onToggle={s.toggleRomaji} />
        <ToggleItem icon={<Icon name="speaker" size={22} />} title="Auto-play pronunciation" sub="Read Japanese aloud on flashcards and vocab answers." on={s.autoSpeak} onToggle={s.toggleAutoSpeak} />
        <ToggleItem icon={<Icon name="bolt" size={22} />} tone="accent" title="Speed mode" sub="Timed questions: +3 XP when fast, a timeout counts as wrong." on={s.speedMode} onToggle={s.toggleSpeedMode} />
        <ToggleItem icon={<Icon name="bell" size={22} />} tone="gold" title="Sound effects" sub="Chimes for right and wrong answers." on={s.soundEnabled} onToggle={s.toggleSound} />
      </section>

      <VoiceBlock />

      {/* ── Lesson videos ── */}
      <h2 className="stats-h">Lesson videos</h2>
      <VideoFolderBlock />
      <VideoServerBlock />

      {/* ── Reminders ── */}
      <h2 className="stats-h">Reminders</h2>
      <section className="stats-card settings-list">
        <button type="button" className="settings-item" role="switch" aria-checked={s.remindersOn} onClick={toggleReminders} disabled={pushBusy || (!support.ok && !s.remindersOn)}>
          <span className="icon-chip accent"><Icon name="bell" size={22} /></span>
          <span className="settings-item-text">
            <b>Daily reminders</b>
            <small>{!support.ok && !s.remindersOn ? PUSH_HELP[support.reason] : 'A nudge before your streak ends, and when reviews are due.'}</small>
          </span>
          <Switch on={s.remindersOn} />
        </button>
        {s.remindersOn && (
          <>
            <div className="settings-sub">
              <div className="settings-sub-head">
                <span className="settings-item-text"><b>Keep my streak</b><small>Only if you haven&apos;t hit today&apos;s goal yet.</small></span>
                <button type="button" role="switch" aria-checked={s.reminderEvening} aria-label="Evening reminder" className="switch-btn" onClick={() => setPref({ reminderEvening: !s.reminderEvening })}><Switch on={s.reminderEvening} /></button>
              </div>
              {s.reminderEvening && <ChipGroup options={EVENING_OPTIONS} value={s.reminderEveningHour} onChange={(h) => setPref({ reminderEveningHour: h })} />}
            </div>
            <div className="settings-sub">
              <div className="settings-sub-head">
                <span className="settings-item-text"><b>Reviews due</b><small>Only on days when reviews are waiting.</small></span>
                <button type="button" role="switch" aria-checked={s.reminderMorning} aria-label="Morning reminder" className="switch-btn" onClick={() => setPref({ reminderMorning: !s.reminderMorning })}><Switch on={s.reminderMorning} /></button>
              </div>
              {s.reminderMorning && <ChipGroup options={MORNING_OPTIONS} value={s.reminderMorningHour} onChange={(h) => setPref({ reminderMorningHour: h })} />}
            </div>
            <div className="settings-sub">
              <button type="button" className="btn btn-ghost" onClick={test} disabled={pushBusy}>Send a test notification</button>
            </div>
          </>
        )}
        {pushMsg && <p className="settings-note" role="status">{pushMsg}</p>}
      </section>

      {/* ── Appearance ── */}
      <h2 className="stats-h">Appearance</h2>
      <section className="stats-card settings-block">
        <div className="settings-block-head">
          <span className="icon-chip"><Mascot who="mentai" mood="happy" size={30} /></span>
          <span className="settings-item-text"><b>Theme</b><small>Light, dark, or follow your device.</small></span>
        </div>
        <ChipGroup options={THEME_OPTIONS} value={s.theme} onChange={s.setTheme} />
      </section>

      {/* ── App install ── */}
      {(canInstall || installed) && (
        <>
          <h2 className="stats-h">App</h2>
          <section className="stats-card settings-block">
            {installed ? (
              <div className="settings-block-head">
                <span className="icon-chip"><Icon name="check" size={22} color="var(--success)" /></span>
                <span className="settings-item-text"><b>Installed</b><small>Nihongo ToGo is on this device.</small></span>
              </div>
            ) : isIOS ? (
              <div className="settings-block-head">
                <span className="icon-chip"><Icon name="home" size={22} /></span>
                <span className="settings-item-text"><b>Add to Home Screen</b><small>Tap Share, then Add to Home Screen.</small></span>
              </div>
            ) : (
              <button type="button" className="btn btn-lg btn-primary" onClick={install}>Install the app</button>
            )}
          </section>
        </>
      )}

      {/* ── Progress ── */}
      <h2 className="stats-h">Progress</h2>
      <section className="stats-card settings-list">
        <button type="button" className="settings-item danger" onClick={() => setConfirmReset(true)}>
          <span className="icon-chip error"><Icon name="cross" size={22} /></span>
          <span className="settings-item-text"><b>Reset progress</b><small>{resetDone ? 'Progress was reset.' : 'Delete all XP, streaks, learned words and scores.'}</small></span>
          <Icon name="next" size={18} color="var(--text-muted)" />
        </button>
      </section>

      <footer className="settings-about">
        <div className="mascot-pair">
          <Mascot who="nori" mood="happy" size={40} className="mascot-idle" />
          <Mascot who="mentai" mood="happy" size={34} className="mascot-idle" style={{ animationDelay: '-1.2s' }} />
        </div>
        <div><b className="jp">日本語ToGo</b><small>Version 2.0 · Genki I &amp; II</small></div>
      </footer>

      {createPortal(
        <AnimatePresence>
          {confirmReset && (
            <>
              <motion.div key="reset-bg" className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmReset(false)} />
              <motion.div key="reset" className="sheet" role="dialog" aria-label="Reset all progress?" style={{ textAlign: 'center', justifyItems: 'center' }}
                initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} transition={{ type: 'spring', stiffness: 360, damping: 28 }}>
                <Mascot who="mentai" mood="oops" size={90} />
                <div>
                  <div className="sheet-title" style={{ fontFamily: 'var(--font-ui)', fontWeight: 900 }}>Reset all progress?</div>
                  <p className="sheet-body">This deletes your XP, streak, learned words, reviews and best scores. It can&apos;t be undone.</p>
                </div>
                <div style={{ display: 'grid', gap: 12, width: '100%' }}>
                  <button type="button" className="btn btn-lg btn-primary" onClick={() => setConfirmReset(false)}>Keep my progress</button>
                  <button type="button" className="btn btn-lg btn-danger" onClick={doReset}>Reset everything</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
