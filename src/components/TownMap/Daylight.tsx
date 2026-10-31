import { type ReactElement, useId } from 'react';

import {
  DAY_PHASE_TINTS,
  LAMP_LIGHTS,
  MAP_SIZE,
  PALETTE,
  STARS,
} from '@/configs';
import { ENUM_DAY_PHASE } from '@/types';

import styles from './living.module.css';

interface DaylightProps {
  dayPhase: ENUM_DAY_PHASE;
  isRunning: boolean;
}

const LAMP_GLOW_RADIUS = 26;

export default function Daylight({
  dayPhase,
  isRunning,
}: DaylightProps): ReactElement {
  const glowId: string = `${useId()}-lamp-glow`;
  const tint = DAY_PHASE_TINTS[dayPhase];
  const isNight: boolean = dayPhase === ENUM_DAY_PHASE.NIGHT;
  const isLampLit: boolean = isNight || dayPhase === ENUM_DAY_PHASE.DUSK;

  return (
    <g
      className={styles.layer}
      data-motion={isRunning ? 'running' : 'paused'}
      data-day-phase={dayPhase}
    >
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor={PALETTE.lampLight} stopOpacity="0.85" />
          <stop offset="1" stopColor={PALETTE.lampLight} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        className={styles.tint}
        width={MAP_SIZE.width}
        height={MAP_SIZE.height}
        fill={tint.color}
        opacity={tint.opacity}
      />
      {isNight &&
        STARS.map(([x, y], index) => (
          <circle
            key={`star-${x}`}
            className={styles.star}
            cx={x}
            cy={y}
            r="1.4"
            fill={PALETTE.star}
            style={{ animationDelay: `${-index * 0.7}s` }}
          />
        ))}
      {isLampLit &&
        LAMP_LIGHTS.map(([x, y], index) => (
          <circle
            key={`glow-${x}`}
            className={styles.lampGlow}
            cx={x}
            cy={y + 6}
            r={LAMP_GLOW_RADIUS}
            fill={`url(#${glowId})`}
            style={{ animationDelay: `${-index * 0.9}s` }}
          />
        ))}
    </g>
  );
}
