import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { Project } from '@/lib/dictionary';

export function FeaturedProjectCard({ project, locale, index, inspectLabel }: {
  project: Project;
  locale: Locale;
  index: number;
  inspectLabel: string;
}) {
  return (
    <Link href={`/${locale}/portfolio/${project.id}`} className="surface-card group block overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image src={project.cover} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" className={`object-cover ${index === 0 ? 'object-[50%_65%]' : ''}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/90">{project.location[locale]}</p>
          <h3 className="text-2xl font-semibold text-white">{project.title[locale]}</h3>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm text-white/90">
            <span>{project.year}</span>
            <span className="flex items-center gap-1 underline-offset-4 group-hover:underline group-focus-visible:underline">{inspectLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></span>
          </div>
        </div>
      </div>
    </Link>
  );
}
