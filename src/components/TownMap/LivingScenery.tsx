import type { ReactElement } from 'react';

import {
  CAT_ROUTES,
  CHIMNEYS,
  CLOUDS,
  DRIFTING_LEAVES,
  LAMP_LIGHTS,
  PALETTE,
  POND_RIPPLES,
  VILLAGER_ROUTES,
} from '@/configs';
import { ENUM_DAY_PHASE } from '@/types';

import Atmosphere from './Atmosphere';
import styles from './living.module.css';
import Villager from './Villager';
import WanderingCat from './WanderingCat';

interface LivingSceneryProps {
  isRunning: boolean;
  dayPhase: ENUM_DAY_PHASE;
}

export default function LivingScenery({
  isRunning,
  dayPhase,
}: LivingSceneryProps): ReactElement {
  // Villagers head home for the night; the cats stay out.
  const hasVillagers: boolean = dayPhase !== ENUM_DAY_PHASE.NIGHT;

  return (
    <g className={styles.layer} data-motion={isRunning ? 'running' : 'paused'}>
      {CLOUDS.map(([x, y], index) => (
        <g key={`cloud-${x}`} transform={`translate(${x} ${y})`}>
          <g
            className={styles.cloud}
            style={{ animationDelay: `${-index * 13}s` }}
            fill={PALETTE.cloud}
          >
            <path d="M -25 4 C -33 -5 -23 -13 -14 -12 C -10 -26 10 -25 15 -13 C 29 -18 40 -3 31 5 C 21 11 -13 12 -25 4 Z" />
          </g>
        </g>
      ))}
      {CHIMNEYS.map(([x, y]) => (
        <g key={`chimney-${x}`} transform={`translate(${x} ${y})`}>
          {[0, 1, 2].map((puff) => (
            <ellipse
              key={puff}
              className={styles.smoke}
              cx="0"
              cy="-3"
              rx="6.5"
              ry="5"
              fill={PALETTE.smoke}
              style={{ animationDelay: `${-puff * 2}s` }}
            />
          ))}
        </g>
      ))}
      {POND_RIPPLES.map(([x, y], index) => (
        <g key={`water-${x}`} transform={`translate(${x} ${y})`}>
          <ellipse
            className={styles.ripple}
            rx="13"
            ry="4.2"
            fill="none"
            stroke={PALETTE.white}
            strokeWidth="1.3"
            style={{ animationDelay: `${-index * 1.4}s` }}
          />
        </g>
      ))}
      {LAMP_LIGHTS.map(([x, y], index) => (
        <ellipse
          key={`lamp-${x}`}
          className={styles.lamp}
          cx={x}
          cy={y}
          rx="3.2"
          ry="5"
          fill={PALETTE.lampLight}
          style={{ animationDelay: `${-index * 0.8}s` }}
        />
      ))}
      {DRIFTING_LEAVES.map(([x, y], index) => (
        <g key={`leaf-${x}`} transform={`translate(${x} ${y})`}>
          <path
            className={styles.leaf}
            d="M 0 0 Q 8 -5 8 0 Q 4 5 0 0"
            fill={PALETTE.floatingLeaf}
            style={{ animationDelay: `${-index * 2.3}s` }}
          />
        </g>
      ))}
      <Atmosphere />
      {hasVillagers &&
        VILLAGER_ROUTES.map((route, index) => (
          <Villager key={route.id} route={route} index={index} />
        ))}
      {CAT_ROUTES.map((route) => (
        <WanderingCat key={route.id} route={route} isRunning={isRunning} />
      ))}
    </g>
  );
}
