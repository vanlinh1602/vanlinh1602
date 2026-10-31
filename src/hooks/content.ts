import { createContext, useContext } from 'react';

import { CONTENT, DEFAULT_LOCALE } from '@/content';
import type { SiteContent } from '@/types';

/** Content of the active locale; `App` provides it from `useLocale`. */
export const ContentContext = createContext<SiteContent>(
  CONTENT[DEFAULT_LOCALE],
);

export function useContent(): SiteContent {
  return useContext(ContentContext);
}
