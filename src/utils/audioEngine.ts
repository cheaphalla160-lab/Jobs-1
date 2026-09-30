import { BgmTrack } from '../types/job';

// Web Audio API Synthesizer for cheerful background music & kid-friendly sound effects
class AudioEngine {
  private ctx: AudioContext | null = null;
  private bgmGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private isSfxEnabled: boolean = true;
  private currentTrack: BgmTrack = 'sunshine';
  private timerId: number | null = null;
  private step: number = 0;
  private bgmVolume: number = 0.35;
  private speechRate: number = 0.9;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master BGM gain
      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
      this.bgmGainNode.connect(this.ctx.destination);

      // Master SFX gain
      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGainNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public getBgmVolume(): number {
    return this.bgmVolume;
  }

  public setBgmVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGainNode && this.ctx) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }

  public getSpeechRate(): number {
    return this.speechRate;
  }

  public setSpeechRate(rate: number) {
    this.speechRate = rate;
  }

  public toggleSfx(): boolean {
    this.isSfxEnabled = !this.isSfxEnabled;
    return this.isSfxEnabled;
  }

  public getIsSfxEnabled(): boolean {
    return this.isSfxEnabled;
  }

  public getCurrentTrack(): BgmTrack {
    return this.currentTrack;
  }

  public setTrack(track: BgmTrack) {
    this.currentTrack = track;
    this.step = 0;
  }

  // Soft Marimba / Music Box Synthesizer Note
  private playNote(freq: number, startTime: number, duration: number, gainMultiplier = 0.25, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.bgmGainNode) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // Filter to give a soft, warm toy-piano / marimba texture
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);

    // Warm envelope
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(gainMultiplier, startTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.bgmGainNode);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  // Melodic Loops for Different Tracks (cheerful, light, non-fatiguing)
  private getTrackNotes(step: number, track: BgmTrack): { melody: number[]; bass: number } {
    // Note frequencies in Hz
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, B4 = 493.88;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46, G5 = 783.99, A5 = 880.00, B5 = 987.77;
    const C3 = 130.81, F3 = 174.61, G3 = 196.00, A3 = 220.00;

    if (track === 'sunshine') {
      // 16-step upbeat cheerful classroom loop
      const melodySequence = [
        [C5, E5], [G5], [E5], [C5],
        [D5, F5], [A5], [F5], [D5],
        [E5, G5], [C5], [G5], [E5],
        [D5], [E5], [D5, G5], [C5],
      ];
      const bassSequence = [C3, C3, C3, C3, F3, F3, F3, F3, C3, C3, A3, A3, G3, G3, G3, G3];
      const idx = step % 16;
      return { melody: melodySequence[idx], bass: bassSequence[idx] };
    } else if (track === 'rainbow') {
      // 12-step sweet waltz
      const melodySequence = [
        [E5, G5], [C5], [E5],
        [F5, A5], [D5], [F5],
        [G5, B4], [E5], [G5],
        [C5, E5, G5], [A5], [G5],
      ];
      const bassSequence = [C3, E4, G4, F3, A4, C4, G3, B4, D4, C3, G4, C4];
      const idx = step % 12;
      return { melody: melodySequence[idx], bass: bassSequence[idx] };
    } else {
      // Adventure bouncy rhythm
      const melodySequence = [
        [G4, C5], [E5], [G5], [E5],
        [A4, D5], [F5], [A5], [F5],
        [B4, E5], [G5], [B5], [G5],
        [C5, G5], [E5], [D5], [C5],
      ];
      const bassSequence = [C3, G3, C3, G3, F3, C4, F3, C4, G3, D4, G3, D4, C3, G3, C3, G3];
      const idx = step % 16;
      return { melody: melodySequence[idx], bass: bassSequence[idx] };
    }
  }

  public startBgm() {
    this.initContext();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    const interval = 300; // ms per beat
    this.timerId = window.setInterval(() => {
      if (!this.ctx || !this.isBgmPlaying) return;

      const now = this.ctx.currentTime;
      const { melody, bass } = this.getTrackNotes(this.step, this.currentTrack);

      // Play soft bass
      this.playNote(bass, now, 0.45, 0.18, 'triangle');

      // Play melody bells
      melody.forEach((freq, i) => {
        this.playNote(freq, now + i * 0.04, 0.35, 0.22, 'sine');
      });

      this.step++;
    }, interval);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isBgmPlaying;
  }

  // --- Sound Effects (SFX) ---
  public playClick() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  public playFlip() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playCorrect() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx!.currentTime + idx * 0.08;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGainNode!);
      osc.start(now);
      osc.stop(now + 0.35);
    });
  }

  public playWrong() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playLetter() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700 + Math.random() * 200, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playFanfare() {
    if (!this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    // Victory triumphant arpeggio
    const chords = [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 0.12 },
      { f: 783.99, t: 0.24 },
      { f: 1046.5, t: 0.36 },
      { f: 1318.5, t: 0.55 },
    ];

    chords.forEach(({ f, t }) => {
      const start = this.ctx!.currentTime + t;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, start);

      gain.gain.setValueAtTime(0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxGainNode!);
      osc.start(start);
      osc.stop(start + 0.6);
    });
  }

  // --- Web Speech API (English Pronunciation) ---
  public speak(text: string, customRate?: number) {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = customRate || this.speechRate;
    utterance.pitch = 1.05; // slightly cheerful friendly pitch

    // Try finding an English voice
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Karen')));
    if (enVoice) {
      utterance.voice = enVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const audioEngine = new AudioEngine();
