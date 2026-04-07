let audioCtx: AudioContext | null = null;
let bgmActive = false;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const playSplat = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);
};

export const playBossHit = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.2);
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
};

export const startBGM = () => {
  if (!audioCtx || bgmActive) return;
  bgmActive = true;
  const notes = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // E G A C D E (Pentatonic)
  let nextNoteTime = audioCtx.currentTime + 0.1;

  const schedule = () => {
    if (!bgmActive || !audioCtx) return;
    while (nextNoteTime < audioCtx.currentTime + 0.1) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      // Random note from pentatonic scale for a magical, light feel
      osc.frequency.value = notes[Math.floor(Math.random() * notes.length)];
      gain.gain.setValueAtTime(0.02, nextNoteTime); // Very light/quiet
      gain.gain.exponentialRampToValueAtTime(0.001, nextNoteTime + 0.3);
      osc.start(nextNoteTime);
      osc.stop(nextNoteTime + 0.3);

      nextNoteTime += 0.3; // Speed of the arpeggio
    }
    requestAnimationFrame(schedule);
  };
  schedule();
};

export const stopBGM = () => {
  bgmActive = false;
};
