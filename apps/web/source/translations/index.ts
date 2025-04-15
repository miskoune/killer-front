import i18next, { t as i18nTranslate } from 'i18next';
import {
  initReactI18next,
  useTranslation as useI18nTranslation,
} from 'react-i18next';

import english from './locales/en-US.json';
import french from './locales/fr-FR.json';

const LOCALE = {
  FRENCH: 'fr-FR',
  ENGLISH: 'en-US',
} as const;

export type TranslationKey = keyof typeof french | keyof typeof english;

/**
 * Setup the internationalization.
 * @param userLocale  - The user locale.
 */
function setupIntl(userLocale: string | null): void {
  i18next.use(initReactI18next).init({
    lng: userLocale || LOCALE.FRENCH,
    returnNull: false,
    resources: {
      [LOCALE.FRENCH]: { translation: french },
      [LOCALE.ENGLISH]: { translation: english },
    },
    interpolation: { escapeValue: false },
  });
}

function t(
  key: TranslationKey,
  interpolations: Record<string, unknown> = {},
): string {
  return i18nTranslate(key, interpolations);
}

function useTranslation() {
  const { t: translateFunc, ...i18nTranslation } = useI18nTranslation();

  const translate = (
    key: TranslationKey,
    interpolations: Record<string, unknown> = {},
  ): string => {
    return translateFunc(key, interpolations);
  };

  return { ...i18nTranslation, t: translate };
}

export { setupIntl, useTranslation, t, LOCALE };
