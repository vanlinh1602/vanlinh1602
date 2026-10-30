import { type MouseEvent, type ReactElement, useEffect, useState } from 'react';

import {
  CAT_WALK_ARTWORK,
  type CatRoute,
  PALETTE,
  PET_RESPONSE_MS,
} from '@/configs';
import { COPY } from '@/content';

import styles from './living.module.css';

interface WanderingCatProps {
  route: CatRoute;
  isRunning: boolean;
}

export default function WanderingCat({
  route,
  isRunning,
}: WanderingCatProps): ReactElement {
  const [reaction, setReaction] = useState<number>(0);
  const [isReacting, setIsReacting] = useState<boolean>(false);

  const handlePet = (event: MouseEvent<SVGGElement>): void => {
    event.stopPropagation();
    setReaction((previous: number) => previous + 1);
    setIsReacting(true);
  };

  useEffect(() => {
    if (reaction === 0) return;
    const timer: number = window.setTimeout(
      () => setIsReacting(false),
      PET_RESPONSE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [reaction]);

  return (
    <g className={styles.catRoute} data-cat={route.id} onClick={handlePet}>
      <title>{COPY.petCat}</title>
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
      {isReacting && (
        <g
          key={reaction}
          data-cat-reaction={route.id}
          className={isRunning ? styles.catCheer : styles.catCheerStill}
        >
          <path
            d="M 0 -37 C -13 -47 -10 -55 -4 -54 C -1 -54 0 -52 0 -51 C 2 -56 10 -56 11 -50 C 12 -45 6 -40 0 -37 Z"
            fill={PALETTE.pinkDeep}
            stroke={PALETTE.white}
            strokeWidth="1.5"
          />
          <path
            d="M -15 -35 V -29 M -18 -32 H -12 M 17 -48 V -42 M 14 -45 H 20"
            stroke={PALETTE.yellow}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      )}
      <g className={styles.facing} data-cat-facing={route.id}>
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
        <g
          key={reaction}
          className={isReacting && isRunning ? styles.catHop : undefined}
        >
          <g className={route.isGray ? styles.grayCat : undefined}>
            <svg
              x={-route.size / 2}
              y={-route.size * 0.85}
              width={route.size}
              height={route.size}
              viewBox="0 0 256 256"
              overflow="hidden"
            >
              <image
                className={styles.spriteSheet}
                style={{ animationDelay: `${-route.delay * 0.13}s` }}
                href={CAT_WALK_ARTWORK}
                width="512"
                height="512"
                preserveAspectRatio="none"
              />
            </svg>
          </g>
        </g>
      </g>
      <ellipse className={styles.catHit} cx="0" cy="-15" rx="19" ry="18" />
    </g>
  );
}
