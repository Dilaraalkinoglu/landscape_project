import { getDict, projects } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { SectionReveal } from '@/components/section-reveal';
import { PortfolioGrid } from '@/components/portfolio-grid';
import { notFound } from 'next/navigation';

export default function PortfolioPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);

  return (
    <div>
      <section className="relative min-h-[32vh] flex items-end bg-primary px-4 pb-8 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl text-left">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{dict.portfolioPage.hero.badge}</p>
            <h1 className="mt-2.5 max-w-3xl text-3xl font-semibold sm:text-5xl">{dict.portfolioPage.hero.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{dict.portfolioPage.hero.subtitle}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-background pt-6 pb-16 sm:pt-8 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PortfolioGrid locale={locale} dict={dict} projects={projects} />
        </div>
      </section>
    </div>
  );
}
