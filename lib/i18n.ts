export type Locale = 'tr' | 'en';

export const locales: Locale[] = ['tr', 'en'];

export const defaultLocale: Locale = 'tr';

export function isLocale(value: string): value is Locale {
  return value === 'tr' || value === 'en';
}
