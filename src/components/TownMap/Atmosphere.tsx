import { type ReactElement, useId } from 'react';

import {
  BIRD_ROUTES,
  BUTTERFLY_ROUTES,
  PALETTE,
  STUDIO_SCREEN,
  WIND_GUSTS,
} from '@/configs';

import styles from './living.module.css';

export default function Atmosphere(): ReactElement {
  const identity: string = useId();
  const screenClip: string = `${identity}-screen`;
  const pondClip: string = `${identity}-pond`;
  return (
    <g data-atmosphere="true">
      <defs>
        <clipPath id={screenClip}>
          <polygon points={STUDIO_SCREEN} />
        </clipPath>
        <clipPath id={pondClip}>
          <path d="M 727 331 Q 766 316 790 344 Q 818 368 789 388 Q 749 399 714 378 Q 707 352 727 331 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${screenClip})`}>
        <polygon
          points={STUDIO_SCREEN}
          fill={PALETTE.windowGlow}
          className={styles.windowLight}
        />
        <path
          className={styles.windowShine}
          d="M 160 290 L 230 175 L 248 175 L 178 290 Z"
          fill={PALETTE.white}
        />
        <rect
          className={styles.screenCursor}
          x="230"
          y="235"
          width="5"
          height="2"
          rx="0.6"
          fill={PALETTE.windowGlow}
        />
      </g>
      <g
        clipPath={`url(#${pondClip})`}
        stroke={PALETTE.waterGlint}
        fill="none"
        strokeLinecap="round"
      >
        <path
          className={styles.waterFlow}
          d="M 709 350 Q 734 344 756 350 T 805 350 M 701 373 Q 735 366 760 373 T 812 373"
          strokeWidth="2"
        />
        <path
          className={styles.waterSparkle}
          d="M 746 351 V 361 M 741 356 H 751 M 785 372 V 378 M 782 375 H 788"
          strokeWidth="1.5"
        />
      </g>
      {WIND_GUSTS.map(([x, y], index) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          <path
            className={styles.wind}
            style={{ animationDelay: `${-index * 3.1}s` }}
            d="M -36 0 Q -16 -9 5 0 T 46 -1 M -19 10 Q 2 3 28 11"
            fill="none"
            stroke={PALETTE.white}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      ))}
      {BUTTERFLY_ROUTES.map((route) => (
        <g key={route.id} data-butterfly={route.id}>
          <animateMotion
            path={route.path}
            dur={`${route.duration}s`}
            begin={`${-route.delay}s`}
            repeatCount="indefinite"
            rotate="0"
          />
          <g className={styles.butterflyBody}>
            <g
              className={styles.butterflyWings}
              fill={
                route.color === 'pink'
                  ? PALETTE.butterflyPink
                  : route.color === 'gold'
                    ? PALETTE.butterflyGold
                    : PALETTE.butterflyBlue
              }
              stroke={PALETTE.ink}
              strokeWidth="0.6"
            >
              <ellipse
                cx="-4"
                cy="-2.5"
                rx="4.5"
                ry="5.5"
                transform="rotate(-30 -4 -2.5)"
              />
              <ellipse
                cx="4"
                cy="-2.5"
                rx="4.5"
                ry="5.5"
                transform="rotate(30 4 -2.5)"
              />
              <ellipse cx="-3" cy="3" rx="3" ry="3.5" />
              <ellipse cx="3" cy="3" rx="3" ry="3.5" />
            </g>
            <path
              d="M 0 -4 V 5 M 0 -3 -2 -6 M 0 -3 2 -6"
              stroke={PALETTE.ink}
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}
      {BIRD_ROUTES.map((route) => (
        <g key={route.id} data-birds={route.id} opacity="0.65">
          <animateMotion
            path={route.path}
            dur={`${route.duration}s`}
            begin={`${-route.delay}s`}
            repeatCount="indefinite"
            rotate="0"
          />
          {[0, 1, 2].map((bird) => (
            <g
              key={bird}
              transform={`translate(${-bird * 22} ${bird * 11}) scale(${1 - bird * 0.12})`}
              fill="none"
              stroke={PALETTE.ink}
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path className={styles.birdWingLeft} d="M 0 0 Q -5 -7 -12 -3" />
              <path className={styles.birdWingRight} d="M 0 0 Q 5 -7 12 -3" />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}
