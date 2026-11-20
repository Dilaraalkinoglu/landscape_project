import type { Locale } from './i18n';

export const sections = ['home', 'about', 'services', 'portfolio', 'products', 'testimonials', 'contact'] as const;
export type SectionId = typeof sections[number];

export function sectionHref(locale: Locale, section: SectionId) {
  return section === 'home' ? `/${locale}` : `/${locale}#${section}`;
}
