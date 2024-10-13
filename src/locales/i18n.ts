import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import { convertLanguageJsonToObject } from './translations';
import vi from './vi.json';

export const translationsJson = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

// Create the 'translations' object to provide full intellisense support for the static json files.
convertLanguageJsonToObject(vi);

export const i18n = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: translationsJson,
    fallbackLng: 'en',
    debug: import.meta.env.REACT_APP_STAGE !== 'production',

    interpolation: {
      escapeValue: false,
    },
  });
