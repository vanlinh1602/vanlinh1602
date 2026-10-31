export enum ENUM_DAY_PHASE {
  DAWN = 'dawn',
  DAY = 'day',
  DUSK = 'dusk',
  NIGHT = 'night',
}

export enum ENUM_SEASON {
  SPRING = 'spring',
  SUMMER = 'summer',
  AUTUMN = 'autumn',
  WINTER = 'winter',
}

export interface Ambience {
  readonly dayPhase: ENUM_DAY_PHASE;
  readonly season: ENUM_SEASON;
}
