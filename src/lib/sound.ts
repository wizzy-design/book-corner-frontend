// Lightweight Web Audio API sound synthesizer — zero external audio assets required.

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  try {
    if (!sharedAudioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      sharedAudioCtx = new AudioCtx();
    }

    if (sharedAudioCtx.state === "suspended") {
      void sharedAudioCtx.resume();
    }

    return sharedAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Tactile tap when selecting an option.
 */
export function playOptionTap(enabled = true): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(460, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.055);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.065);
  } catch {
    // Ignore audio playback errors
  }
}

/**
 * Crisp paper page-flip rustle for question navigation and card swipes.
 */
export function playPageFlip(enabled = true): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.2;
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const progress = i / bufferSize;
      // Asymmetric envelope: quick paper snap at start, smooth whoosh tail
      const envelope = Math.pow(Math.sin(progress * Math.PI), 0.7);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.9;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Main paper sweep filter
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2000, now);
    filter.frequency.exponentialRampToValueAtTime(520, now + duration);
    filter.Q.value = 0.9;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.42, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    // Subtle crisp edge transient for page lift
    const snap = ctx.createBufferSource();
    snap.buffer = buffer;
    const snapFilter = ctx.createBiquadFilter();
    snapFilter.type = "highpass";
    snapFilter.frequency.setValueAtTime(2800, now);

    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(0.22, now);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    snap.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
    snap.start(now);
    snap.stop(now + 0.065);
  } catch {
    // Ignore audio playback errors
  }
}

/**
 * Warm two-note chime when personalized recommendations are revealed.
 */
export function playSuccessChime(enabled = true): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25]; // C5 -> E5

    notes.forEach((freq, idx) => {
      const start = now + idx * 0.09;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.14, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.32);
    });
  } catch {
    // Ignore audio playback errors
  }
}
