import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getDict, services } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { Icon } from '@/components/icon';
import { SectionReveal } from '@/components/section-reveal';
import { notFound } from 'next/navigation';

export default function ServicesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);
  return <div><section className="relative min-h-[32vh] flex items-end bg-primary px-4 pb-8 pt-28 text-white sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-7xl text-left"><SectionReveal><p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{dict.servicesPage.hero.badge}</p><h1 className="mt-2.5 max-w-3xl text-3xl font-semibold sm:text-5xl">{dict.servicesPage.hero.title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{dict.servicesPage.hero.subtitle}</p></SectionReveal></div></section><section className="bg-background pt-6 pb-16 sm:pt-8 sm:pb-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-6 md:grid-cols-2">{services.map((service, index) => <SectionReveal key={service.id} delay={index * .06}><Link href={`/${locale}/services/${service.id}`} className="group grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-56"><Image src={service.image} alt={service.title[locale]} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 40vw" /></div><div className="p-6"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon name={service.icon} /></div><h2 className="mt-5 text-2xl font-semibold">{service.title[locale]}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{service.short[locale]}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">{dict.servicesPage.explore}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></Link></SectionReveal>)}</div></div></section></div>;
}
