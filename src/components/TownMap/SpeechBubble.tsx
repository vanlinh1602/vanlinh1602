import type { ReactElement } from 'react';

import { PALETTE } from '@/configs';

interface SpeechBubbleProps {
  text: string;
}

/** SVG text cannot size its own box, so the width is estimated per glyph. */
const GLYPH_WIDTH = 5.3;
const PADDING_X = 16;
const HEIGHT = 18;
const TAIL = 6;

/** A rounded bubble whose tail points at (0, 0). */
export default function SpeechBubble({
  text,
}: SpeechBubbleProps): ReactElement {
  const width: number = Math.round([...text].length * GLYPH_WIDTH + PADDING_X);
  const top: number = -TAIL - HEIGHT;

  return (
    <g pointerEvents="none">
      <rect
        x={-width / 2}
        y={top}
        width={width}
        height={HEIGHT}
        rx={HEIGHT / 2}
        fill={PALETTE.labelPaper}
        stroke={PALETTE.labelBorder}
        strokeWidth="1"
      />
      <path
        d={`M -4.5 ${-TAIL - 0.6} L 0 0 L 4.5 ${-TAIL - 0.6}`}
        fill={PALETTE.labelPaper}
        stroke={PALETTE.labelBorder}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <rect
        x="-4"
        y={-TAIL - 1.6}
        width="8"
        height="2.2"
        fill={PALETTE.labelPaper}
      />
      <text
        y={top + HEIGHT / 2 + 0.5}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9.5"
        fontWeight="700"
        fill={PALETTE.ink}
      >
        {text}
      </text>
    </g>
  );
}
