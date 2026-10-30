export enum ENUM_SECTION {
  PROJECTS = 'projects',
  ABOUT = 'about',
  CONTACT = 'contact',
}

/** `null` means no section is open and the camera shows the whole room. */
export type ActiveSection = ENUM_SECTION | null;

export interface SectionMeta {
  readonly label: string;
  readonly emoji: string;
}
