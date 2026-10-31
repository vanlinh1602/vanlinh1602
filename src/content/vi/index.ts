import type { SiteContent } from '@/types';

import { COPY } from './copy';
import { EXPERIENCE } from './experience';
import { GARDEN } from './garden';
import { NOTES } from './notes';
import { PROFILE } from './profile';
import { PROJECTS } from './projects';
import { SECTIONS } from './sections';

export const VI_CONTENT: SiteContent = {
  copy: COPY,
  profile: PROFILE,
  projects: PROJECTS,
  sections: SECTIONS,
  experience: EXPERIENCE,
  notes: NOTES,
  garden: GARDEN,
};
