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
