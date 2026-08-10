import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Check, Quote } from 'lucide-react';
import { getDict, heroImage, ctaBgImage, projects, services, testimonials } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { SectionReveal } from '@/components/section-reveal';
import { Icon } from '@/components/icon';
import { StatCounter } from '@/components/stat-counter';

import { notFound } from 'next/navigation';

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  const featured = projects.slice(0, 4);

  return (
    <div>
      <section className="relative min-h-screen flex items-end overflow-hidden bg-primary">
        <Image src={heroImage} alt="Modern garden landscape surrounding a home" fill priority className="object-cover" sizes="100vw" />
        
        {/* Soft Dark Transparency Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.35) 40%, rgba(0, 0, 0, 0) 75%)'
          }} 
        />

        <div className="relative z-10 mx-auto w-full max-w-[85rem] px-4 pb-8 pt-28 sm:px-6 sm:pt-44 lg:px-10 lg:pb-12">
          <div className="max-w-2xl text-white">
            <SectionReveal>
              <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/80"><span className="h-px w-8 bg-accent-cta" />{dict.hero.badge}</p>
              <h1 className="max-w-2xl text-3xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{dict.hero.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg">{dict.hero.subtitle}</p>
              <div className="mt-6 flex flex-row flex-wrap gap-3">
                <Link href={`/${locale}/contact`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-cta px-5 py-3 sm:px-7 sm:py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] whitespace-nowrap">{dict.hero.primaryCta}<ArrowRight className="h-4 w-4" /></Link>
                <Link href={`/${locale}/portfolio`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/10 px-5 py-3 sm:px-7 sm:py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 whitespace-nowrap">{dict.hero.secondaryCta}<ArrowUpRight className="h-4 w-4" /></Link>
              </div>
            </SectionReveal>
          </div>
          <div className="mt-16 hidden items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70 sm:flex"><span className="h-10 w-px bg-white/40" />{dict.hero.scroll}</div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="max-w-2xl"><p className="eyebrow">01 — {dict.nav.about}</p><h2 className="mt-3 text-4xl font-semibold text-foreground sm:text-5xl">{dict.whyUs.title}</h2><p className="mt-4 text-lg leading-8 text-muted-foreground">{dict.whyUs.subtitle}</p></SectionReveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dict.whyUs.items.map((item, index) => <SectionReveal key={item.title} delay={index * 0.08} className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name={item.icon} /></div><h3 className="mt-5 text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p></SectionReveal>)}
          </div>
        </div>
      </section>

      <section className="bg-background-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">02 — {dict.nav.services}</p><h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.servicesPreview.title}</h2><p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">{dict.servicesPreview.subtitle}</p></div><Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-cta">{dict.featuredProjects.viewAll}<ArrowRight className="h-4 w-4" /></Link></SectionReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, index) => <SectionReveal key={service.id} delay={index * 0.05}><Link href={`/${locale}/services/${service.id}`} className="group block overflow-hidden rounded-2xl border border-border bg-card"><div className="relative aspect-[16/10] overflow-hidden"><Image src={service.image} alt={service.title[locale]} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /><div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary"><Icon name={service.icon} /></div></div><div className="p-5"><div className="flex items-start justify-between gap-3"><h3 className="text-xl font-semibold">{service.title[locale]}</h3><ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-cta" /></div><p className="mt-2 text-sm leading-6 text-muted-foreground">{service.short[locale]}</p></div></Link></SectionReveal>)}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionReveal className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">03 — {dict.nav.portfolio}</p><h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.featuredProjects.title}</h2><p className="mt-4 text-lg text-muted-foreground">{dict.featuredProjects.subtitle}</p></div><Link href={`/${locale}/portfolio`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-cta">{dict.featuredProjects.viewAll}<ArrowRight className="h-4 w-4" /></Link></SectionReveal><div className="mt-12 grid gap-5 md:grid-cols-2">{featured.map((project, index) => <SectionReveal key={project.id} delay={index * 0.08}><Link href={`/${locale}/portfolio/${project.id}`} className={`group block ${index === 0 ? 'md:row-span-2' : ''}`}><div className={`group relative overflow-hidden rounded-2xl bg-muted ${index === 0 ? 'aspect-[4/5]' : 'aspect-[16/10]'}`}><Image src={project.cover} alt={project.title[locale]} fill priority={index === 0} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-5 text-white"><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/75"><span className="h-1.5 w-1.5 rounded-full bg-accent-cta" />{project.location[locale]}</div><h3 className="text-2xl font-semibold">{project.title[locale]}</h3><div className="mt-2 flex items-center justify-between text-sm text-white/75"><span>{project.year}</span><span className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">{dict.portfolioPage.inspect}<ArrowUpRight className="h-4 w-4" /></span></div></div></div></Link></SectionReveal>)}</div></div></section>

      <section className="bg-primary py-20 text-white sm:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionReveal className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">04 — {dict.nav.testimonials}</p><h2 className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.testimonials.title}</h2><p className="mt-4 text-lg text-white/70">{dict.testimonials.subtitle}</p></SectionReveal><div className="mt-12 grid gap-4 md:grid-cols-3">{testimonials.slice(0, 3).map((item, index) => <SectionReveal key={item.id} delay={index * 0.08} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"><Quote className="h-7 w-7 text-accent-cta" /><div className="mt-5 flex gap-1 text-accent-cta">{Array.from({ length: item.rating }).map((_, i) => <span key={i}>★</span>)}</div><p className="mt-4 text-sm leading-7 text-white/80">“{item.text[locale]}”</p><div className="mt-6 border-t border-white/15 pt-4"><p className="font-semibold">{item.name}</p><p className="mt-1 text-xs text-white/55">{item.location[locale]} · {item.project[locale]}</p></div></SectionReveal>)}</div></div></section>

      <section className="bg-background-secondary py-16 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionReveal className="mb-10 text-center"><p className="eyebrow">05 — {dict.stats.title}</p><h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{dict.stats.subtitle}</h2></SectionReveal><div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">{dict.stats.items.map((stat, index) => <SectionReveal key={stat.id} delay={index * 0.06} className="text-center"><p className="font-serif text-5xl font-semibold text-primary sm:text-6xl"><StatCounter value={stat.value} suffix={stat.suffix} /></p><p className="mt-2 text-sm text-muted-foreground">{stat.label[locale]}</p></SectionReveal>)}</div></div></section>

      <section className="relative overflow-hidden py-24 sm:py-32">
        <Image src={ctaBgImage} alt="Lush landscaped garden" fill className="object-cover" sizes="100vw" />
        
        {/* Soft Directional Dark Shade Over Text Area on the Right Edge */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'linear-gradient(to left, rgba(15, 23, 17, 0.72) 0%, rgba(15, 23, 17, 0.45) 40%, rgba(15, 23, 17, 0) 75%)'
          }} 
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center sm:ml-auto sm:text-right text-white">
            <SectionReveal>
              <h2 className="text-3xl font-semibold sm:text-5xl text-shadow-soft">{dict.ctaSection.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/90 sm:text-lg sm:ml-auto">{dict.ctaSection.subtitle}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-end">
                <a href={`tel:${dict.ctaSection.phone.replace(/\s/g, '')}`} className="text-sm font-semibold text-white/90 hover:text-white transition-colors">{dict.ctaSection.phone}</a>
                <Link href={`/${locale}/contact`} className="inline-flex items-center gap-2 rounded-lg bg-accent-cta px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]">{dict.ctaSection.button}<ArrowRight className="h-4 w-4" /></Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
