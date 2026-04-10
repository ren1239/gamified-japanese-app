import { useState, useEffect } from 'react'

const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
  || window.navigator.standalone === true

export function usePWAInstall() {
  const [prompt, setPrompt] = useState(() => window.__pwaPrompt || null)
  const [installed, setInstalled] = useState(isInStandaloneMode)

  useEffect(() => {
    if (isInStandaloneMode) return

    // Pick up prompt if it already fired before this component mounted
    if (window.__pwaPrompt && !prompt) {
      setPrompt(window.__pwaPrompt)
    }

    const onReady = () => setPrompt(window.__pwaPrompt)
    const onInstalled = () => { setInstalled(true); setPrompt(null) }

    window.addEventListener('pwaPromptReady', onReady)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('pwaPromptReady', onReady)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (!prompt) return
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
      setPrompt(null)
      window.__pwaPrompt = null
    }
  }

  return {
    canInstall: !installed && (!!prompt || isIOS),
    isIOS,
    install,
    installed,
  }
}
