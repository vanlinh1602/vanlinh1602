import { useCallback, useEffect, useState } from 'react';

import { CONTENT } from '@/content';
import { ENUM_LOCALE } from '@/types';

interface Locale {
  readonly locale: ENUM_LOCALE;
  readonly toggle: () => void;
}

const STORAGE_KEY = 'town-locale';
const LOCALES: readonly ENUM_LOCALE[] = Object.values(ENUM_LOCALE);

function findLocale(value: string | null): ENUM_LOCALE | undefined {
  return LOCALES.find((locale) => locale === value);
}

function readStoredLocale(): ENUM_LOCALE | undefined {
  try {
    return findLocale(localStorage.getItem(STORAGE_KEY));
  } catch {
    return undefined;
  }
}

function storeLocale(locale: ENUM_LOCALE): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // Storage can be blocked; the choice then only lasts for this visit.
  }
}

/** Vietnamese browsers get Vietnamese; every other visitor gets English. */
function readBrowserLocale(): ENUM_LOCALE {
  return navigator.language.toLowerCase().startsWith(ENUM_LOCALE.VI)
    ? ENUM_LOCALE.VI
    : ENUM_LOCALE.EN;
}

function readInitialLocale(): ENUM_LOCALE {
  return readStoredLocale() ?? readBrowserLocale();
}

export function useLocale(): Locale {
  const [locale, setLocale] = useState<ENUM_LOCALE>(readInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = CONTENT[locale].copy.pageTitle;
  }, [locale]);

  const toggle = useCallback((): void => {
    const next: ENUM_LOCALE =
      LOCALES[(LOCALES.indexOf(locale) + 1) % LOCALES.length];
    storeLocale(next);
    setLocale(next);
  }, [locale]);

  return { locale, toggle };
}
