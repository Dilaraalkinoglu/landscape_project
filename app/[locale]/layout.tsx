import { redirect } from 'next/navigation';
import { locales, isLocale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    redirect('/tr');
  }

  return (
    <>
      {children}
    </>
  );
}
