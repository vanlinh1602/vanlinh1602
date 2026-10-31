import clsx from 'clsx';

import { DISTRICT_SHAPES, DISTRICT_SIGNS, PALETTE } from '@/configs';
import { useContent } from '@/hooks';
import type { ENUM_SECTION, Vec2 } from '@/types';

import styles from './index.module.css';
import SpeechBubble from './SpeechBubble';

interface DistrictProps {
  id: ENUM_SECTION;
  position: Vec2;
  isActive: boolean;
  isDimmed: boolean;
  /** Keeps the greeting bubble open, e.g. while the tour stops here. */
  isGreeting: boolean;
  onSelect: (id: ENUM_SECTION) => void;
}

const SIGN_HEIGHT = 21;
const BUBBLE_LIFT = 16;
const SIGN_COLORS = {
  wood: {
    face: PALETTE.signWood,
    edge: PALETTE.signWoodEdge,
    ink: PALETTE.ink,
  },
  enamel: {
    face: PALETTE.signEnamel,
    edge: PALETTE.signEnamelEdge,
    ink: PALETTE.white,
  },
  postal: {
    face: PALETTE.labelPaper,
    edge: PALETTE.pinkDeep,
    ink: PALETTE.pinkDeep,
  },
} as const;

export default function District({
  id,
  position,
  isActive,
  isDimmed,
  isGreeting,
  onSelect,
}: DistrictProps) {
  const { sections } = useContent();
  const { label, greeting } = sections[id];
  const sign = DISTRICT_SIGNS[id];
  const colors = SIGN_COLORS[sign.material];
  const left: number = -sign.width / 2;
  const top: number = -SIGN_HEIGHT / 2;

  return (
    <g transform={`translate(${position[0]} ${position[1]})`}>
      <g
        className={clsx(
          styles.district,
          isActive && styles.active,
          isDimmed && styles.dimmed,
          isGreeting && styles.greeting,
        )}
        onClick={() => onSelect(id)}
        data-district={id}
      >
        <path className={styles.buildingHit} d={DISTRICT_SHAPES[id]} />
        <g
          transform={`translate(${sign.offset[0]} ${sign.offset[1]}) matrix(1 ${sign.slope} 0 1 0 0) scale(${sign.scale ?? 1})`}
          data-map-label={id}
        >
          <g className={styles.label} data-material={sign.material}>
            <rect
              x={left}
              y={top + 2}
              width={sign.width}
              height={SIGN_HEIGHT}
              rx="2"
              fill={colors.edge}
            />
            <rect
              className={styles.labelPlate}
              x={left}
              y={top}
              width={sign.width}
              height={SIGN_HEIGHT}
              rx="2"
              fill={colors.face}
              stroke={colors.edge}
              strokeWidth="1.2"
            />
            <rect
              x={left + 3}
              y={top + 3}
              width={sign.width - 6}
              height={SIGN_HEIGHT - 6}
              rx="1"
              fill="none"
              stroke={colors.ink}
              strokeWidth="0.45"
              opacity="0.4"
            />
            <circle
              cx={left + 6}
              cy="0"
              r="1"
              fill={colors.ink}
              opacity="0.65"
            />
            <circle
              cx={-left - 6}
              cy="0"
              r="1"
              fill={colors.ink}
              opacity="0.65"
            />
            <text
              y="0.5"
              textAnchor="middle"
              dominantBaseline="central"
              fill={colors.ink}
            >
              {label}
            </text>
          </g>
        </g>
        <g
          transform={`translate(${sign.offset[0]} ${sign.offset[1] - BUBBLE_LIFT})`}
        >
          <g className={styles.bubble} data-greeting={id}>
            <SpeechBubble text={greeting} />
          </g>
        </g>
      </g>
    </g>
  );
}
