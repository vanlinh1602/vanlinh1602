export interface MusicChord {
  readonly bass: number;
  readonly notes: readonly number[];
}

/** Notes are MIDI numbers; a soft lo-fi loop in C major. */
export const MUSIC = {
  volume: 0.2,
  fadeSeconds: 1.2,
  beatsPerMinute: 72,
  stepsPerBeat: 2,
  stepsPerChord: 8,
  lookAheadSeconds: 0.6,
  tickMilliseconds: 150,
  startDelaySeconds: 0.05,
  toneCutoffHertz: 1800,
  echoSeconds: 0.42,
  echoFeedback: 0.35,
  echoMix: 0.3,
  padPeak: 0.05,
  padAttackSeconds: 0.9,
  bassPeak: 0.16,
  melodyPeak: 0.09,
  melodyChance: 0.45,
  melodyRoot: 72,
  melodyScale: [0, 2, 4, 7, 9, 12, 14],
  chords: [
    { bass: 36, notes: [60, 64, 67, 71] },
    { bass: 33, notes: [57, 60, 64, 67] },
    { bass: 41, notes: [53, 57, 60, 64] },
    { bass: 43, notes: [55, 59, 62, 64] },
  ],
  storageKey: 'profile-music',
} as const;
