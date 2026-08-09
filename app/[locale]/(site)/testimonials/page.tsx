import { Quote } from 'lucide-react';
import { getDict, testimonials } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { SectionReveal } from '@/components/section-reveal';
import { notFound } from 'next/navigation';

export default function TestimonialsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);

  return (
    <div>
      <section className="relative min-h-[32vh] flex items-end bg-primary px-4 pb-8 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl text-left">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{dict.testimonials.title}</p>
            <h1 className="mt-2.5 max-w-3xl text-3xl font-semibold sm:text-5xl">{dict.testimonials.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{dict.testimonials.subtitle}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-background pt-6 pb-16 sm:pt-8 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <SectionReveal key={item.id} delay={index * 0.06} className="flex flex-col rounded-2xl border border-border bg-card p-6">
                <Quote className="h-8 w-8 text-accent-cta" />
                <div className="mt-4 flex gap-1 text-accent-cta text-lg">
                  {Array.from({ length: item.rating }).map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">"{item.text[locale]}"</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.location[locale]} · {item.project[locale]}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
