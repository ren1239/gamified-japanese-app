const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  window.audioCtx = window.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  return window.audioCtx;
};

export function playSuccessChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const t = ctx.currentTime;
  
  // Happy chord (C5, E5, G5)
  playTone(ctx, 523.25, t, 0.15, 'sine', 0.15); // C5
  playTone(ctx, 659.25, t + 0.1, 0.2, 'sine', 0.15); // E5
  playTone(ctx, 783.99, t + 0.2, 0.4, 'sine', 0.2); // G5
}

export function playErrorBuzzer() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const t = ctx.currentTime;
  playTone(ctx, 220, t, 0.15, 'triangle', 0.2); // A3
  playTone(ctx, 207.65, t + 0.15, 0.3, 'triangle', 0.2); // G#3 (dissonant step down)
}

export function playPerfectChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const t = ctx.currentTime;
  // Super happy upward arpeggio
  playTone(ctx, 523.25, t, 0.1, 'sine', 0.15); // C5
  playTone(ctx, 659.25, t + 0.1, 0.1, 'sine', 0.15); // E5
  playTone(ctx, 783.99, t + 0.2, 0.1, 'sine', 0.15); // G5
  playTone(ctx, 1046.50, t + 0.3, 0.5, 'sine', 0.25); // C6 sustained
}

export function playVictoryChime() {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  const t = ctx.currentTime;
  // Nice passing score chime
  playTone(ctx, 440, t, 0.15, 'sine', 0.15); // A4
  playTone(ctx, 554.37, t + 0.15, 0.15, 'sine', 0.15); // C#5
  playTone(ctx, 659.25, t + 0.3, 0.4, 'sine', 0.2); // E5 sustained
}

function playTone(ctx, freq, time, duration, type = 'sine', volume = 0.3) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);
  
  // Sharp attack, nice decay
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(volume, time + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start(time);
  osc.stop(time + duration);
}
