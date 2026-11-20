import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HomeVines } from '@/components/growing-vine';
import { getDict } from '@/lib/dictionary';
import { isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default function SiteLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDict(locale);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <a className="skip-contents" href="#main-content">{locale === 'tr' ? 'Ana içeriğe geç' : 'Skip to main content'}</a>
      <Header locale={locale} dict={dict} />
      <div className="garden-flow">
        <HomeVines />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer locale={locale} dict={dict} />
      </div>
    </ThemeProvider>
  );
}
