import { MUSIC } from '@/configs';

interface ToneOptions {
  readonly frequency: number;
  readonly startTime: number;
  readonly duration: number;
  readonly peak: number;
  readonly attack: number;
  readonly type: OscillatorType;
}

const SEMITONES_PER_OCTAVE = 12;
const A4_MIDI = 69;
const A4_HERTZ = 440;
const SILENT_GAIN = 0.0001;
const TAIL_SECONDS = 0.1;

function midiToHertz(note: number): number {
  return A4_HERTZ * 2 ** ((note - A4_MIDI) / SEMITONES_PER_OCTAVE);
}

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export class AmbientMusic {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices: AudioNode | null = null;
  private timerId: number | null = null;
  private suspendId: number | null = null;
  private nextStepTime = 0;
  private stepIndex = 0;
  private lastMelodyNote = -1;

  get hasStarted(): boolean {
    return this.context !== null;
  }

  play(): void {
    if (this.suspendId !== null) {
      window.clearTimeout(this.suspendId);
      this.suspendId = null;
    }
    const context: AudioContext = this.context ?? this.createGraph();
    const master: GainNode | null = this.master;
    if (!master) return;

    void context.resume();
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.linearRampToValueAtTime(
      MUSIC.volume,
      context.currentTime + MUSIC.fadeSeconds,
    );
    this.startScheduler(context);
  }

  pause(): void {
    const context: AudioContext | null = this.context;
    const master: GainNode | null = this.master;
    if (!context || !master || this.suspendId !== null) return;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(master.gain.value, context.currentTime);
    master.gain.linearRampToValueAtTime(
      0,
      context.currentTime + MUSIC.fadeSeconds,
    );
    this.suspendId = window.setTimeout(() => {
      this.stopScheduler();
      void context.suspend();
      this.suspendId = null;
    }, MUSIC.fadeSeconds * 1000);
  }

  private createGraph(): AudioContext {
    const context: AudioContext = new AudioContext();
    const master: GainNode = context.createGain();
    master.gain.value = 0;
    master.connect(context.destination);

    const tone: BiquadFilterNode = context.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.value = MUSIC.toneCutoffHertz;

    const echo: DelayNode = context.createDelay(1);
    echo.delayTime.value = MUSIC.echoSeconds;
    const feedback: GainNode = context.createGain();
    feedback.gain.value = MUSIC.echoFeedback;
    const mix: GainNode = context.createGain();
    mix.gain.value = MUSIC.echoMix;

    tone.connect(master);
    tone.connect(echo);
    echo.connect(feedback);
    feedback.connect(echo);
    echo.connect(mix);
    mix.connect(master);

    this.context = context;
    this.master = master;
    this.voices = tone;
    return context;
  }

  private startScheduler(context: AudioContext): void {
    if (this.timerId !== null) return;

    this.nextStepTime = context.currentTime + MUSIC.startDelaySeconds;
    this.timerId = window.setInterval(
      () => this.scheduleSteps(context),
      MUSIC.tickMilliseconds,
    );
    this.scheduleSteps(context);
  }

  private stopScheduler(): void {
    if (this.timerId === null) return;
    window.clearInterval(this.timerId);
    this.timerId = null;
  }

  private scheduleSteps(context: AudioContext): void {
    const stepSeconds: number = 60 / MUSIC.beatsPerMinute / MUSIC.stepsPerBeat;

    while (this.nextStepTime < context.currentTime + MUSIC.lookAheadSeconds) {
      this.scheduleStep(this.stepIndex, this.nextStepTime, stepSeconds);
      this.nextStepTime += stepSeconds;
      this.stepIndex += 1;
    }
  }

  private scheduleStep(
    stepIndex: number,
    startTime: number,
    stepSeconds: number,
  ): void {
    const chord =
      MUSIC.chords[
        Math.floor(stepIndex / MUSIC.stepsPerChord) % MUSIC.chords.length
      ];

    if (stepIndex % MUSIC.stepsPerChord === 0) {
      this.playChord({
        chord,
        startTime,
        duration: stepSeconds * MUSIC.stepsPerChord,
      });
    }
    if (Math.random() < MUSIC.melodyChance) {
      this.playMelodyNote(startTime, stepSeconds);
    }
  }

  private playChord({
    chord,
    startTime,
    duration,
  }: {
    chord: (typeof MUSIC.chords)[number];
    startTime: number;
    duration: number;
  }): void {
    this.playTone({
      frequency: midiToHertz(chord.bass),
      startTime,
      duration: duration * 0.9,
      peak: MUSIC.bassPeak,
      attack: 0.05,
      type: 'sine',
    });
    chord.notes.forEach((note) =>
      this.playTone({
        frequency: midiToHertz(note),
        startTime,
        duration: duration + MUSIC.padAttackSeconds,
        peak: MUSIC.padPeak,
        attack: MUSIC.padAttackSeconds,
        type: 'triangle',
      }),
    );
  }

  private playMelodyNote(startTime: number, stepSeconds: number): void {
    const candidates: readonly number[] = MUSIC.melodyScale.filter(
      (offset) => offset !== this.lastMelodyNote,
    );
    const offset: number = pickRandom(candidates);
    this.lastMelodyNote = offset;
    this.playTone({
      frequency: midiToHertz(MUSIC.melodyRoot + offset),
      startTime,
      duration: stepSeconds * 3,
      peak: MUSIC.melodyPeak,
      attack: 0.01,
      type: 'triangle',
    });
  }

  private playTone({
    frequency,
    startTime,
    duration,
    peak,
    attack,
    type,
  }: ToneOptions): void {
    const context: AudioContext | null = this.context;
    const destination: AudioNode | null = this.voices;
    if (!context || !destination) return;

    const oscillator: OscillatorNode = context.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;

    const envelope: GainNode = context.createGain();
    const endTime: number = startTime + duration;
    envelope.gain.setValueAtTime(SILENT_GAIN, startTime);
    envelope.gain.exponentialRampToValueAtTime(peak, startTime + attack);
    envelope.gain.exponentialRampToValueAtTime(SILENT_GAIN, endTime);

    oscillator.connect(envelope);
    envelope.connect(destination);
    oscillator.start(startTime);
    oscillator.stop(endTime + TAIL_SECONDS);
  }
}
