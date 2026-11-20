import Image from 'next/image';
import { ArrowLeft, Calendar, Check, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getDict, projects } from '@/lib/dictionary';
import { isLocale } from '@/lib/i18n';
import { sectionHref } from '@/lib/site-navigation';
import { GardenFlow, GardenSection } from '@/components/garden-section';
import { FeaturedProjectCard } from '@/components/featured-project-card';
import { InteractiveGalleryViewer } from '@/components/interactive-gallery-viewer';

export function generateStaticParams() {
  return projects.map(({ id }) => ({ projectId: id }));
}

export default function ProjectDetailPage({ params }: { params: { locale: string; projectId: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const project = projects.find(({ id }) => id === params.projectId);
  if (!project) notFound();
  const dict = getDict(locale);
  const matching = projects.filter((item) => item.id !== project.id && item.category === project.category);
  const related = [...matching, ...projects.filter((item) => item.id !== project.id && item.category !== project.category)].slice(0, 3);
  const photoLabel = locale === 'tr' ? 'Temsili peyzaj fotoğrafı' : 'Illustrative landscape photo';

  return (
    <div>
      <section className="hero-landscape relative isolate flex items-end overflow-hidden bg-primary">
        <Image src={project.cover} alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="hero-landscape-shade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 text-white sm:px-6 lg:px-8">
          <a href={sectionHref(locale, 'portfolio')} className="mb-5 inline-flex items-center gap-2 text-sm text-white/85 hover:underline"><ArrowLeft size={16} aria-hidden="true" />{dict.portfolioPage.backToPortfolio}</a>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/90">{dict.portfolioPage.filters[project.category]}</p>
          <h1 className="text-4xl font-semibold text-white sm:text-6xl">{project.title[locale]}</h1>
          <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/90">
            <span className="flex items-center gap-2"><MapPin size={16} aria-hidden="true" />{project.location[locale]}</span>
            <span className="flex items-center gap-2"><Calendar size={16} aria-hidden="true" />{project.year}</span>
          </div>
          <p className="mt-4 text-sm text-white/85">{photoLabel}</p>
        </div>
      </section>
      <GardenFlow>
        <GardenSection className="py-16 sm:py-24">
          <div className="grid gap-9 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <h2 className="text-3xl font-semibold">{project.title[locale]}</h2>
              <p className="mt-4 leading-8 text-muted-foreground">{project.description[locale]}</p>
              <h3 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-wider text-primary-accent">{dict.portfolioPage.gallery}</h3>
              <InteractiveGalleryViewer images={project.gallery} locale={locale} />
            </div>
            <div className="h-fit rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">{dict.portfolioPage.scope}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {project.scope[locale].map((item) => <li key={item} className="flex items-center gap-2"><Check size={17} className="text-primary-accent" aria-hidden="true" />{item}</li>)}
              </ul>
              <dl className="mt-6 space-y-2 border-t border-border pt-4 text-sm">
                <div className="flex justify-between gap-2"><dt className="text-muted-foreground">{dict.portfolioPage.location}</dt><dd>{project.location[locale]}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-muted-foreground">{dict.portfolioPage.year}</dt><dd>{project.year}</dd></div>
              </dl>
              <a href={sectionHref(locale, 'contact')} className="mt-6 inline-flex rounded-lg bg-[#944c22] px-4 py-3 text-sm font-semibold text-white hover:bg-[#753918]">{dict.nav.cta}</a>
            </div>
          </div>
        </GardenSection>
        <GardenSection tone="sage" className="border-t border-border py-16">
          <h2 className="text-3xl font-semibold">{dict.featuredProjects.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{photoLabel}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => <FeaturedProjectCard key={item.id} project={item} locale={locale} index={1} inspectLabel={dict.portfolioPage.inspect} />)}
          </div>
        </GardenSection>
      </GardenFlow>
    </div>
  );
}
