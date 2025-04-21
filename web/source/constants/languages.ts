import { LOCALE } from '@/translations';

export const languageToLocale: Record<string, string> = {
  Français: LOCALE.FRENCH,
  English: LOCALE.ENGLISH,
};

export const localeToLanguage: Record<string, string> = {
  [LOCALE.FRENCH]: 'Français',
  [LOCALE.ENGLISH]: 'English',
};
