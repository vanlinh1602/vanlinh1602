import { ENUM_SECTION, type SectionMeta } from '@/types';

/** Labels shown in the nav bar and on the district tags on the town map. */
export const SECTIONS: Readonly<Record<ENUM_SECTION, SectionMeta>> = {
  [ENUM_SECTION.PROJECTS]: {
    label: 'Projects',
    emoji: '💻',
    greeting: "Come see what I've built!",
  },
  [ENUM_SECTION.ABOUT]: {
    label: 'About',
    emoji: '🐱',
    greeting: "Hi there, I'm Linh 👋",
  },
  [ENUM_SECTION.CONTACT]: {
    label: 'Contact',
    emoji: '💌',
    greeting: 'Drop me a letter 💌',
  },
  [ENUM_SECTION.EXPERIENCE]: {
    label: 'Experience',
    emoji: '🧭',
    greeting: 'My journey so far',
  },
  [ENUM_SECTION.NOTES]: {
    label: 'Notes',
    emoji: '📌',
    greeting: 'Fresh notes on the board!',
  },
  [ENUM_SECTION.GARDEN]: {
    label: 'Garden',
    emoji: '🌱',
    greeting: 'Fancy a stroll in the garden?',
  },
  [ENUM_SECTION.GITHUB]: {
    label: 'GitHub',
    emoji: '🐙',
    greeting: "Let's fish for some stats 🎣",
  },
};
