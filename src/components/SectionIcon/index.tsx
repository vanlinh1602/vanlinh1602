import type { ReactElement } from 'react';

import { ENUM_SECTION } from '@/types';

interface SectionIconProps {
  section: ENUM_SECTION;
}

const ICON_PATHS: Readonly<Record<ENUM_SECTION, string>> = {
  [ENUM_SECTION.PROJECTS]:
    'M 4 4 H 20 V 16 H 4 Z M 8 20 H 16 M 12 16 V 20 M 9 8 L 7 10 L 9 12 M 15 8 L 17 10 L 15 12',
  [ENUM_SECTION.ABOUT]:
    'M 3 11 L 12 3 L 21 11 M 5 9 V 21 H 19 V 9 M 9 21 V 14 H 15 V 21',
  [ENUM_SECTION.CONTACT]:
    'M 3 5 H 21 V 19 H 3 Z M 3 5 L 12 12 L 21 5 M 3 19 L 9 13 M 21 19 L 15 13',
  [ENUM_SECTION.EXPERIENCE]:
    'M 3 8 H 21 V 20 H 3 Z M 8 8 V 5 H 16 V 8 M 3 13 H 21 M 11 13 V 15 H 13 V 13',
  [ENUM_SECTION.NOTES]:
    'M 4 4 H 20 V 16 H 4 Z M 8 16 L 6 21 M 16 16 L 18 21 M 7 8 H 14 M 7 12 H 17',
  [ENUM_SECTION.GARDEN]:
    'M 12 21 V 11 M 12 11 C 12 6 9 4 4 4 C 4 9 7 11 12 11 Z M 12 14 C 12 10 15 8 20 8 C 20 12 17 14 12 14 Z M 7 21 H 17',
  [ENUM_SECTION.GITHUB]:
    'M 6 3 V 15 M 6 15 A 3 3 0 1 0 6 21 A 3 3 0 1 0 6 15 M 18 3 A 3 3 0 1 0 18 9 A 3 3 0 1 0 18 3 M 18 9 C 18 13 6 12 6 15',
};

export default function SectionIcon({
  section,
}: SectionIconProps): ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[section]} />
    </svg>
  );
}
