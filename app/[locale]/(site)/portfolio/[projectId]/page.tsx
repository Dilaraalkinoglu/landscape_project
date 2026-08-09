import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Check, MapPin, Calendar } from 'lucide-react';
import { getDict, projects } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { SectionReveal } from '@/components/section-reveal';
import { InteractiveGalleryViewer } from '@/components/interactive-gallery-viewer';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return ['tr', 'en'].flatMap((locale) => projects.map((project) => ({ locale, projectId: project.id })));
}

export default function ProjectDetailPage({ params }: { params: { locale: string; projectId: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const project = projects.find((p) => p.id === params.projectId);
  if (!project) notFound();
  const dict = getDict(locale);
  const related = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);
  if (related.length < 3) {
    const others = projects.filter((p) => p.id !== project.id && !related.includes(p));
    while (related.length < 3 && others.length) related.push(others.shift()!);
  }

  return (
    <div>
      <section className="relative min-h-[55vh] overflow-hidden bg-primary">
        <Image src={project.cover} alt={project.title[locale]} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="relative mx-auto flex min-h-[55vh] max-w-7xl items-end px-4 pb-16 pt-40 text-white sm:px-6 lg:px-8">
          <SectionReveal>
            <Link href={`/${locale}/portfolio`} className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
              <ArrowLeft className="h-4 w-4" />{dict.portfolioPage.backToPortfolio}
            </Link>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-cta" />
              {dict.portfolioPage.filters[project.category]}
            </div>
            <h1 className="text-4xl font-semibold sm:text-6xl">{project.title[locale]}</h1>
            <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{project.location[locale]}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{project.year}</span>
            </div>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <SectionReveal>
              <h2 className="text-3xl font-semibold">{project.title[locale]}</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{project.description[locale]}</p>

              <div className="mt-8">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-accent">{dict.portfolioPage.gallery}</h3>
                <InteractiveGalleryViewer images={project.gallery} alt={project.title[locale]} />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold">{dict.portfolioPage.scope}</h3>
                <ul className="mt-4 space-y-3">
                  {project.scope[locale].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white"><Check className="h-3 w-3" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-3 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">{dict.portfolioPage.location}</span><span className="font-medium">{project.location[locale]}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">{dict.portfolioPage.year}</span><span className="font-medium">{project.year}</span></div>
                </div>
                <Link href={`/${locale}/contact`} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white" style={{ backgroundColor: 'var(--accent-cta)' }}>
                  {dict.nav.cta}
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-background-secondary py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold">{dict.featuredProjects.title}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/${locale}/portfolio/${p.id}`} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={p.cover} alt={p.title[locale]} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 p-5 text-white">
                    <h3 className="text-xl font-semibold">{p.title[locale]}</h3>
                    <p className="mt-1 text-sm text-white/70">{p.location[locale]}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
