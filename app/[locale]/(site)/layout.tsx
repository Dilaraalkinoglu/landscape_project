import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getDict } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <Header locale={locale} dict={dict} />
      <main>{children}</main>
      <Footer locale={locale} dict={dict} />
    </ThemeProvider>
  );
}
