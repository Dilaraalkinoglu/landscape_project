import '../globals.css';
import '../local-fonts.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return params.locale === 'en' ? {
    title: 'Yeşil Toprak Peyzaj | Landscape Design and Installation',
    description: 'Residential and commercial landscape design, installation, irrigation, garden maintenance and lighting.',
  } : {
    title: 'Yeşil Toprak Peyzaj | Doğal Tasarım, Profesyonel Uygulama',
    description: 'Konut ve ticari peyzaj tasarımı, uygulama, sulama sistemleri, bahçe bakımı ve aydınlatma.',
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  return <html lang={params.locale} suppressHydrationWarning><body className="font-sans antialiased">{children}</body></html>;
}
