import type { ExperienceItem } from '@/types';

/** Newest first. Replace the placeholders with your real history. */
export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    kind: 'work',
    period: '2024 – now',
    title: 'Freelance Software Engineer',
    organization: 'Self-employed',
    description:
      'Building web apps, browser extensions and interactive experiences for small clients.',
  },
  {
    kind: 'work',
    period: '20xx – 20xx',
    title: 'Your position',
    organization: 'Company name',
    description: 'One sentence about what you did and your best result.',
  },
  {
    kind: 'education',
    period: '20xx – 20xx',
    title: 'Your major',
    organization: 'School name',
    description: 'A thesis, award or course you are proud of.',
  },
];
