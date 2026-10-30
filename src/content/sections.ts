import { ENUM_SECTION, type SectionMeta } from '@/types';

/** Labels shown in the nav bar and on the district tags on the town map. */
export const SECTIONS: Readonly<Record<ENUM_SECTION, SectionMeta>> = {
  [ENUM_SECTION.PROJECTS]: { label: 'Dự án', emoji: '💻' },
  [ENUM_SECTION.ABOUT]: { label: 'Giới thiệu', emoji: '🐱' },
  [ENUM_SECTION.CONTACT]: { label: 'Liên hệ', emoji: '💌' },
};

/** Display order of the sections in the nav bar. */
export const SECTION_IDS: readonly ENUM_SECTION[] = Object.values(ENUM_SECTION);
