import { ENUM_SECTION, type MapView, type Vec2 } from '@/types';

export const MAP_SIZE = { width: 1000, height: 700 } as const;

export const MAP_ZOOM = {
  initial: 1,
  maximum: 3,
  step: 1.2,
  wheelSensitivity: 0.0015,
  wheelLineSize: 16,
  dragThreshold: 6,
  epsilon: 0.001,
} as const;

const MAP_CENTER: Vec2 = [MAP_SIZE.width / 2, MAP_SIZE.height / 2];

/** Where each district sits on the map, in map units. */
export const DISTRICT_POSITIONS: Readonly<Record<ENUM_SECTION, Vec2>> = {
  [ENUM_SECTION.PROJECTS]: [218, 175],
  [ENUM_SECTION.ABOUT]: [765, 170],
  [ENUM_SECTION.CONTACT]: [510, 480],
};

export const DISTRICT_SHAPES: Readonly<Record<ENUM_SECTION, string>> = {
  [ENUM_SECTION.PROJECTS]:
    'M -107 -42 L -35 -104 L 27 -125 L 47 -124 L 48 -103 L 83 -78 L 92 -56 L 78 -49 L 78 72 L 13 116 L -101 67 Z',
  [ENUM_SECTION.ABOUT]:
    'M -87 -31 L -54 -106 L 15 -83 L 42 -125 L 59 -124 L 59 -76 L 97 -39 L 92 -26 L 89 65 L -8 101 L -79 60 Z',
  [ENUM_SECTION.CONTACT]:
    'M -84 -33 L -31 -101 L 21 -78 L 39 -86 L 53 -74 L 52 -57 L 90 -26 L 90 69 L 7 99 L -79 56 Z',
};

interface BuildingSign {
  readonly offset: Vec2;
  readonly width: number;
  readonly slope: number;
  readonly material: 'wood' | 'enamel' | 'postal';
}

export const DISTRICT_SIGNS: Readonly<Record<ENUM_SECTION, BuildingSign>> = {
  [ENUM_SECTION.PROJECTS]: {
    offset: [26, 26],
    width: 82,
    slope: -0.38,
    material: 'wood',
  },
  [ENUM_SECTION.ABOUT]: {
    offset: [-11, 21],
    width: 62,
    slope: 0.46,
    material: 'enamel',
  },
  [ENUM_SECTION.CONTACT]: {
    offset: [-31, 12],
    width: 68,
    slope: 0.52,
    material: 'postal',
  },
};

export const HOME_VIEW: MapView = { center: MAP_CENTER, scale: 1 };

const FOCUS_SCALE = 1.65;

export const SECTION_VIEWS: Readonly<Record<ENUM_SECTION, MapView>> = {
  [ENUM_SECTION.PROJECTS]: {
    center: DISTRICT_POSITIONS[ENUM_SECTION.PROJECTS],
    scale: FOCUS_SCALE,
  },
  [ENUM_SECTION.ABOUT]: {
    center: DISTRICT_POSITIONS[ENUM_SECTION.ABOUT],
    scale: FOCUS_SCALE,
  },
  [ENUM_SECTION.CONTACT]: {
    center: DISTRICT_POSITIONS[ENUM_SECTION.CONTACT],
    scale: FOCUS_SCALE,
  },
};

/** Screen point a focused district is moved to, leaving room for the panel. */
export const FOCUS_ANCHOR: Vec2 = [330, 320];

export const MOBILE_FOCUS_ANCHOR: Vec2 = [500, 180];

export const HOME_ANCHOR: Vec2 = MAP_CENTER;
