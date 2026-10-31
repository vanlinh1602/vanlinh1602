import type { ReactElement, ReactNode } from 'react';

import { PALETTE, WEATHER_PARTICLE_COUNTS, WEATHER_PARTICLES } from '@/configs';
import { ENUM_DAY_PHASE, ENUM_SEASON } from '@/types';

import styles from './living.module.css';

interface SeasonalWeatherProps {
  season: ENUM_SEASON;
  dayPhase: ENUM_DAY_PHASE;
  isRunning: boolean;
}

/** Phones get half the particles; every one is its own CSS animation. */
const IS_COMPACT: boolean = window.matchMedia('(max-width: 640px)').matches;
const BASE_DURATION_S = 9;
const DURATION_STEPS = 5;
const DURATION_STEP_S = 1.6;

const PARTICLE_CLASSES: Readonly<Record<ENUM_SEASON, string>> = {
  [ENUM_SEASON.SPRING]: styles.petal,
  [ENUM_SEASON.SUMMER]: styles.firefly,
  [ENUM_SEASON.AUTUMN]: styles.fallingLeaf,
  [ENUM_SEASON.WINTER]: styles.snowflake,
};

function renderParticle(season: ENUM_SEASON, index: number): ReactNode {
  switch (season) {
    case ENUM_SEASON.SPRING:
      return <ellipse rx="4.6" ry="2.6" fill={PALETTE.petal} />;
    case ENUM_SEASON.SUMMER:
      return <circle r="2.6" fill={PALETTE.firefly} />;
    case ENUM_SEASON.AUTUMN:
      return <path d="M 0 0 Q 8 -6 10 0 Q 4 6 0 0" fill={PALETTE.autumnLeaf} />;
    case ENUM_SEASON.WINTER:
      return <circle r={1.3 + (index % 3) * 0.5} fill={PALETTE.snow} />;
  }
}

/** Fireflies only come out once the lamps are on. */
function isWeatherVisible(
  season: ENUM_SEASON,
  dayPhase: ENUM_DAY_PHASE,
): boolean {
  if (season !== ENUM_SEASON.SUMMER) return true;
  return dayPhase === ENUM_DAY_PHASE.DUSK || dayPhase === ENUM_DAY_PHASE.NIGHT;
}

export default function SeasonalWeather({
  season,
  dayPhase,
  isRunning,
}: SeasonalWeatherProps): ReactElement | null {
  if (!isWeatherVisible(season, dayPhase)) return null;
  const count: number = WEATHER_PARTICLE_COUNTS[season];
  const particles = WEATHER_PARTICLES.slice(
    0,
    IS_COMPACT ? Math.ceil(count / 2) : count,
  );

  return (
    <g
      className={styles.layer}
      data-motion={isRunning ? 'running' : 'paused'}
      data-season={season}
    >
      {particles.map(([x, y], index) => {
        const duration: number =
          BASE_DURATION_S + (index % DURATION_STEPS) * DURATION_STEP_S;
        return (
          <g key={`${season}-${x}-${y}`} transform={`translate(${x} ${y})`}>
            <g
              className={PARTICLE_CLASSES[season]}
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${-((index * 2.3) % duration)}s`,
              }}
            >
              {renderParticle(season, index)}
            </g>
          </g>
        );
      })}
    </g>
  );
}
