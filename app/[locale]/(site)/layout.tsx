import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { GrowingVine } from '@/components/growing-vine';
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
      <div className="relative overflow-hidden w-full">
        {/* Tüm sayfalarda hero altından başlayıp en alttaki footer/hızlı erişime kadar uzanan dal */}
        <GrowingVine />
        <main className="relative z-10">{children}</main>
        <Footer locale={locale} dict={dict} />
      </div>
    </ThemeProvider>
  );
}
