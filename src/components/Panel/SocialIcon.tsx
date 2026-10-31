import type { ReactElement } from 'react';

import type { SocialIconName } from '@/types';

interface SocialIconProps {
  name: SocialIconName;
}

// Outline paths adapted from Feather Icons (MIT).
const ICON_PATHS: Readonly<Record<SocialIconName, string>> = {
  github:
    'M 9 19 C 4 20.5 4 16.5 2 16 M 16 22 V 18.13 A 3.37 3.37 0 0 0 15.06 15.52 C 18.2 15.17 21.5 13.98 21.5 8.52 A 5.44 5.44 0 0 0 20 4.77 A 5.07 5.07 0 0 0 19.91 1 S 18.73 0.65 16 2.48 A 13.38 13.38 0 0 0 9 2.48 C 6.27 0.65 5.09 1 5.09 1 A 5.07 5.07 0 0 0 5 4.77 A 5.44 5.44 0 0 0 3.5 8.55 C 3.5 13.97 6.8 15.16 9.94 15.55 A 3.37 3.37 0 0 0 9 18.13 V 22',
  linkedin:
    'M 16 8 A 6 6 0 0 1 22 14 V 21 H 18 V 14 A 2 2 0 0 0 14 14 V 21 H 10 V 14 A 6 6 0 0 1 16 8 Z M 2 9 H 6 V 21 H 2 Z M 2 4 A 2 2 0 1 0 6 4 A 2 2 0 1 0 2 4',
  facebook:
    'M 18 2 H 15 A 5 5 0 0 0 10 7 V 10 H 7 V 14 H 10 V 22 H 14 V 14 H 17 L 18 10 H 14 V 7 A 1 1 0 0 1 15 6 H 18 Z',
  website:
    'M 2 12 A 10 10 0 1 0 22 12 A 10 10 0 1 0 2 12 M 2 12 H 22 M 12 2 A 15.3 15.3 0 0 1 16 12 A 15.3 15.3 0 0 1 12 22 A 15.3 15.3 0 0 1 8 12 A 15.3 15.3 0 0 1 12 2 Z',
};

export default function SocialIcon({ name }: SocialIconProps): ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
