import { ENUM_DAY_PHASE, ENUM_SEASON, type Vec2 } from '@/types';

import { MAP_SIZE } from './mapViews';
import { PALETTE } from './palette';

interface DayTint {
  readonly color: string;
  readonly opacity: number;
}

export const AMBIENCE = {
  refreshMs: 60_000,
  /** `?time=night` and `?season=winter` preview a phase or season. */
  timeQuery: 'time',
  seasonQuery: 'season',
} as const;

/** First local hour of each phase, in order; the last one wraps past midnight. */
export const DAY_PHASE_STARTS: readonly (readonly [
  hour: number,
  phase: ENUM_DAY_PHASE,
])[] = [
  [5, ENUM_DAY_PHASE.DAWN],
  [7, ENUM_DAY_PHASE.DAY],
  [17, ENUM_DAY_PHASE.DUSK],
  [19, ENUM_DAY_PHASE.NIGHT],
];

export const DAY_PHASE_TINTS: Readonly<Record<ENUM_DAY_PHASE, DayTint>> = {
  [ENUM_DAY_PHASE.DAWN]: { color: PALETTE.dawnTint, opacity: 0.22 },
  [ENUM_DAY_PHASE.DAY]: { color: PALETTE.white, opacity: 0 },
  [ENUM_DAY_PHASE.DUSK]: { color: PALETTE.duskTint, opacity: 0.32 },
  [ENUM_DAY_PHASE.NIGHT]: { color: PALETTE.nightTint, opacity: 0.6 },
};

/** Indexed by `Date#getMonth()`. */
export const SEASON_BY_MONTH: readonly ENUM_SEASON[] = [
  ENUM_SEASON.WINTER,
  ENUM_SEASON.WINTER,
  ENUM_SEASON.SPRING,
  ENUM_SEASON.SPRING,
  ENUM_SEASON.SPRING,
  ENUM_SEASON.SUMMER,
  ENUM_SEASON.SUMMER,
  ENUM_SEASON.SUMMER,
  ENUM_SEASON.AUTUMN,
  ENUM_SEASON.AUTUMN,
  ENUM_SEASON.AUTUMN,
  ENUM_SEASON.WINTER,
];

export const WEATHER_PARTICLE_COUNTS: Readonly<Record<ENUM_SEASON, number>> = {
  [ENUM_SEASON.SPRING]: 22,
  [ENUM_SEASON.SUMMER]: 18,
  [ENUM_SEASON.AUTUMN]: 18,
  [ENUM_SEASON.WINTER]: 42,
};

const WEATHER_SEED = 1602;
const MAX_WEATHER_PARTICLES = 42;

/** Deterministic scatter so particles keep their spots between renders. */
function scatterPoints(count: number, seed: number): readonly Vec2[] {
  let state: number = seed;
  const next = (): number => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
  return Array.from({ length: count }, (): Vec2 => [
    Math.round(next() * MAP_SIZE.width),
    Math.round(next() * MAP_SIZE.height * 0.85),
  ]);
}

export const WEATHER_PARTICLES: readonly Vec2[] = scatterPoints(
  MAX_WEATHER_PARTICLES,
  WEATHER_SEED,
);

/** Patches of sky along the top edge of the backdrop. */
export const STARS: readonly Vec2[] = [
  [42, 14],
  [118, 30],
  [196, 9],
  [268, 24],
  [538, 12],
  [610, 30],
  [688, 10],
  [760, 26],
  [842, 12],
  [908, 32],
  [968, 10],
];
