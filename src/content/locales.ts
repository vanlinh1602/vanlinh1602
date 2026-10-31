import { ENUM_LOCALE, type SiteContent } from '@/types';

import { EN_CONTENT } from './en';
import { VI_CONTENT } from './vi';

export const CONTENT: Readonly<Record<ENUM_LOCALE, SiteContent>> = {
  [ENUM_LOCALE.VI]: VI_CONTENT,
  [ENUM_LOCALE.EN]: EN_CONTENT,
};

export const DEFAULT_LOCALE: ENUM_LOCALE = ENUM_LOCALE.VI;
