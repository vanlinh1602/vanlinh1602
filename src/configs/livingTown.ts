import type { Vec2 } from '@/types';

export interface CatRoute {
  readonly id: string;
  readonly path: string;
  readonly duration: number;
  readonly delay: number;
  readonly size: number;
  readonly isGray: boolean;
}

export const CAT_ROUTES: readonly CatRoute[] = [
  {
    id: 'studio',
    path: 'M 354 165 Q 399 211 472 253 Q 493 271 517 252 L 640 162',
    duration: 34,
    delay: 6,
    size: 44,
    isGray: false,
  },
  {
    id: 'bus-stop',
    path: 'M 155 571 L 250 515 Q 292 468 326 429',
    duration: 31,
    delay: 15,
    size: 40,
    isGray: true,
  },
  {
    id: 'post-office',
    path: 'M 481 649 L 550 609 L 615 571 L 676 537',
    duration: 33,
    delay: 9,
    size: 44,
    isGray: false,
  },
  {
    id: 'park',
    path: 'M 524 320 Q 553 342 570 365 L 620 410',
    duration: 27,
    delay: 24,
    size: 38,
    isGray: true,
  },
  {
    id: 'cottage',
    path: 'M 895 205 Q 932 216 974 224',
    duration: 24,
    delay: 3,
    size: 38,
    isGray: false,
  },
  {
    id: 'town-square',
    path: 'M 480 235 Q 518 258 544 284 L 559 320',
    duration: 29,
    delay: 12,
    size: 42,
    isGray: false,
  },
  {
    id: 'garden-stroll',
    path: 'M 540 625 Q 588 597 641 572 L 687 546',
    duration: 28,
    delay: 18,
    size: 39,
    isGray: true,
  },
];

export const BUTTERFLY_ROUTES = [
  {
    id: 'pond',
    path: 'M 728 352 C 703 314 777 306 797 343 C 830 386 744 407 728 352 Z',
    duration: 12,
    delay: 3,
    color: 'pink',
  },
  {
    id: 'garden',
    path: 'M 379 381 C 352 354 408 333 430 367 C 447 405 378 421 379 381 Z',
    duration: 10,
    delay: 1,
    color: 'gold',
  },
  {
    id: 'cottage',
    path: 'M 778 262 C 749 238 817 210 838 251 C 858 277 785 290 778 262 Z',
    duration: 14,
    delay: 7,
    color: 'blue',
  },
] as const;

export const BIRD_ROUTES = [
  {
    id: 'north',
    path: 'M -50 172 C 240 60 590 116 1070 42',
    duration: 32,
    delay: 9,
  },
  {
    id: 'south',
    path: 'M 1060 266 C 730 147 540 123 -70 62',
    duration: 38,
    delay: 23,
  },
] as const;

export const WIND_GUSTS: readonly Vec2[] = [
  [463, 301],
  [670, 438],
  [251, 479],
];
export const STUDIO_SCREEN = '190,223 278,192 278,240 190,273';
export const PET_RESPONSE_MS = 1300;

export const POND_RIPPLES: readonly Vec2[] = [
  [750, 343],
  [771, 368],
  [737, 371],
];
export const LAMP_LIGHTS: readonly Vec2[] = [
  [337, 176],
  [559, 106],
  [571, 260],
  [522, 307],
  [862, 321],
  [628, 410],
  [326, 483],
  [448, 623],
];
export const CHIMNEYS: readonly Vec2[] = [
  [252, 52],
  [812, 66],
  [553, 410],
];
export const CLOUDS: readonly Vec2[] = [
  [97, 54],
  [285, 48],
  [675, 45],
  [940, 48],
];
export const DRIFTING_LEAVES: readonly Vec2[] = [
  [368, 95],
  [602, 231],
  [701, 398],
  [402, 443],
  [903, 452],
];
