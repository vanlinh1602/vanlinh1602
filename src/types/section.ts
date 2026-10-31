export enum ENUM_SECTION {
  PROJECTS = 'projects',
  ABOUT = 'about',
  CONTACT = 'contact',
  EXPERIENCE = 'experience',
  NOTES = 'notes',
  GARDEN = 'garden',
  GITHUB = 'github',
}

/** `null` means no section is open and the map shows the whole town. */
export type ActiveSection = ENUM_SECTION | null;

export interface SectionMeta {
  readonly label: string;
  readonly emoji: string;
  /** Speech bubble shown over the building on hover and during the tour. */
  readonly greeting: string;
}
