'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { Project } from '@/lib/dictionary';

interface FeaturedProjectCardProps {
  project: Project;
  locale: Locale;
  index: number;
  inspectLabel: string;
}

export function FeaturedProjectCard({ project, locale, index, inspectLabel }: FeaturedProjectCardProps) {
  return (
    <Link
      href={`/${locale}/portfolio/${project.id}`}
      className={`group block ${index === 0 ? 'md:row-span-2' : ''}`}
    >
      <div
        className={`group relative overflow-hidden rounded-2xl bg-muted ${
          index === 0 ? 'aspect-[4/5]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={project.cover}
          alt={project.title[locale]}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/75">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cta" />
            {project.location[locale]}
          </div>
          <h3 className="text-2xl font-semibold">{project.title[locale]}</h3>
          <div className="mt-2 flex items-center justify-between text-sm text-white/75">
            <span>{project.year}</span>
            <span className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {inspectLabel}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
