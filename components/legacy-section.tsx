import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { sectionHref, type SectionId } from '@/lib/site-navigation';

export const legacyMetadata: Metadata = { robots: { index: false, follow: true } };

export function LegacySection({ locale, section }: { locale: Locale; section: SectionId }) {
  const href = sectionHref(locale, section);
  return (
    <div className="mx-auto max-w-7xl px-6 pb-16 pt-36">
      <meta httpEquiv="refresh" content={`0; url=${href}`} />
      <h1 className="text-3xl font-semibold">{locale === 'tr' ? 'Bu içerik ana sayfaya taşındı.' : 'This content has moved to the homepage.'}</h1>
      <a className="mt-5 inline-block underline" href={href}>{locale === 'tr' ? 'İlgili bölüme git' : 'Go to the section'}</a>
    </div>
  );
}
