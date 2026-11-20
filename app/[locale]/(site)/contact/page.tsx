import { notFound } from 'next/navigation';
import { LegacySection, legacyMetadata } from '@/components/legacy-section';
import { isLocale } from '@/lib/i18n';

export const metadata = legacyMetadata;

export default function LegacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return <LegacySection locale={params.locale} section="contact" />;
}
