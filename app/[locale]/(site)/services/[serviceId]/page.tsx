import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getDict, projects, services } from '@/lib/dictionary';
import { isLocale } from '@/lib/i18n';
import { Icon } from '@/components/icon';
import { GardenFlow, GardenSection } from '@/components/garden-section';
import { FeaturedProjectCard } from '@/components/featured-project-card';
import { sectionHref } from '@/lib/site-navigation';

export function generateStaticParams() {
  return services.map(({ id }) => ({ serviceId: id }));
}

export default function ServiceDetailPage({ params }: { params: { locale: string; serviceId: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDict(locale);
  const service = services.find(({ id }) => id === params.serviceId);
  if (!service) notFound();

  const category = service.id === 'implementation' || service.id === 'design' ? 'residential' : service.id;
  const matching = projects.filter((project) => project.category === category);
  const related = [...matching, ...projects.filter((project) => project.category !== category)].slice(0, 3);

  return (
    <div>
      <section className="hero-landscape relative isolate flex items-end overflow-hidden bg-primary">
        <Image src={service.image} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-landscape-shade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 text-white sm:px-6 lg:px-8">
          <a href={sectionHref(locale, 'services')} className="mb-5 inline-flex items-center gap-2 text-sm text-white/85 hover:underline"><ArrowLeft size={16} aria-hidden="true" />{dict.servicesPage.backToServices}</a>
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"><Icon name={service.icon} />{dict.servicesPage.hero.badge}</p>
          <h1 className="text-4xl font-semibold text-white sm:text-6xl">{service.title[locale]}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90">{service.description[locale]}</p>
        </div>
      </section>
      <GardenFlow>
        <GardenSection className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">{dict.servicesPage.processTitle}</h2>
              <ol className="mt-6 space-y-3">
                {service.steps[locale].map((step, index) => (
                  <li key={step.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
                    <span className="font-serif text-2xl text-primary-accent" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3 className="text-lg font-semibold">{step.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{step.desc}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">{dict.servicesPage.scopeTitle}</h2>
              <div className="mt-6 rounded-2xl border border-border bg-card p-6">
                <ul className="space-y-3 text-sm">
                  {service.scope[locale].map((item) => <li key={item} className="flex items-center gap-2"><Check size={17} className="text-primary-accent" aria-hidden="true" />{item}</li>)}
                </ul>
                <a href={sectionHref(locale, 'contact')} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#944c22] px-4 py-3 text-sm font-semibold text-white hover:bg-[#753918]">{dict.nav.cta}<ArrowRight size={16} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </GardenSection>
        <GardenSection tone="sage" className="border-t border-border py-16">
          <h2 className="text-3xl font-semibold">{dict.servicesPage.relatedProjects}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{locale === 'tr' ? 'Temsili peyzaj fotoğrafları' : 'Illustrative landscape photos'}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((project) => <FeaturedProjectCard key={project.id} project={project} locale={locale} index={1} />)}
          </div>
        </GardenSection>
      </GardenFlow>
    </div>
  );
}
