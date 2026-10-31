import { type MouseEvent, type ReactElement, useEffect, useState } from 'react';

import { PALETTE, VILLAGER_BUBBLE_MS, type VillagerRoute } from '@/configs';
import { useContent } from '@/hooks';

import styles from './living.module.css';
import SpeechBubble from './SpeechBubble';

/** The figure is drawn in a 27-unit box; this sizes it beside the cats. */
const FIGURE_SCALE = 1.45;

interface VillagerProps {
  route: VillagerRoute;
  /** Offsets which line this villager starts with. */
  index: number;
}

export default function Villager({
  route,
  index,
}: VillagerProps): ReactElement {
  const { copy } = useContent();
  const [greetings, setGreetings] = useState<number>(0);
  const [isTalking, setIsTalking] = useState<boolean>(false);
  const lines: readonly string[] = copy.villagerLines;
  const line: string = lines[(index + greetings) % lines.length] ?? '';

  const handleGreet = (event: MouseEvent<SVGGElement>): void => {
    event.stopPropagation();
    setGreetings((previous: number) => previous + 1);
    setIsTalking(true);
  };

  useEffect(() => {
    if (greetings === 0) return;
    const timer: number = window.setTimeout(
      () => setIsTalking(false),
      VILLAGER_BUBBLE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [greetings]);

  return (
    <g
      className={styles.villager}
      data-villager={route.id}
      onClick={handleGreet}
    >
      <animateMotion
        path={route.path}
        dur={`${route.duration}s`}
        begin={`${-route.delay}s`}
        repeatCount="indefinite"
        rotate="0"
        keyPoints="0;1;0"
        keyTimes="0;0.5;1"
        calcMode="linear"
      />
      <ellipse
        cx="0"
        cy="0"
        rx="8.5"
        ry="2.8"
        fill={PALETTE.ink}
        opacity="0.16"
      />
      <g className={styles.facing}>
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1 1;-1 1;1 1"
          keyTimes="0;0.5;1"
          calcMode="discrete"
          dur={`${route.duration}s`}
          begin={`${-route.delay}s`}
          repeatCount="indefinite"
        />
        <g transform={`scale(${FIGURE_SCALE})`}>
          <g className={styles.villagerBob}>
            <rect
              className={styles.legBack}
              x="-3.2"
              y="-7"
              width="2.4"
              height="7"
              rx="1"
              fill={PALETTE.trousers}
            />
            <rect
              className={styles.legFront}
              x="0.8"
              y="-7"
              width="2.4"
              height="7"
              rx="1"
              fill={PALETTE.trousers}
            />
            <path
              d="M -5 -6 Q -5.5 -15 0 -16 Q 5.5 -15 5 -6 Z"
              fill={route.shirt}
              stroke={PALETTE.ink}
              strokeWidth="0.6"
            />
            <circle
              cx="0"
              cy="-20.5"
              r="5.2"
              fill={PALETTE.skin}
              stroke={PALETTE.ink}
              strokeWidth="0.6"
            />
            <path
              d="M -5.3 -20.5 Q -5.6 -27 0.5 -26.4 Q 5.8 -26 5.3 -20 Q 3 -23.5 -1 -22.6 Q -3.6 -22 -5.3 -20.5 Z"
              fill={route.hair}
            />
            <circle cx="2.4" cy="-19.6" r="0.6" fill={PALETTE.ink} />
          </g>
        </g>
      </g>
      {isTalking && (
        <g transform="translate(0 -42)" className={styles.villagerTalk}>
          <SpeechBubble text={line} />
        </g>
      )}
      <ellipse className={styles.villagerHit} cx="0" cy="-19" rx="12" ry="21" />
    </g>
  );
}
