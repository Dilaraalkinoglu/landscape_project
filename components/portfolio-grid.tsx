'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/lib/i18n';
import type { Dict, Project } from '@/lib/dictionary';

type Props = { locale: Locale; dict: Dict; projects: Project[]; };

export function PortfolioGrid({ locale, dict, projects }: Props) {
  const [filter, setFilter] = useState<string>('all');
  const filters = ['all', 'residential', 'commercial', 'hardscape', 'irrigation', 'lighting', 'maintenance'];
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-2 flex items-center gap-1.5 text-sm text-muted-foreground"><Filter className="h-4 w-4" /></span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f ? 'bg-primary text-white' : 'border border-border bg-card text-foreground hover:bg-muted'
            }`}
          >
            {dict.portfolioPage.filters[f as keyof typeof dict.portfolioPage.filters]}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/${locale}/portfolio/${project.id}`} className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={project.cover} alt={project.title[locale]} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">
                    {dict.portfolioPage.filters[project.category]}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold">{project.title[locale]}</h3>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-cta" />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{project.location[locale]} · {project.year}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
