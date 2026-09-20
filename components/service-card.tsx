'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { Service } from '@/lib/dictionary';
import { Icon } from '@/components/icon';

interface ServiceCardProps {
  service: Service;
  locale: Locale;
}

export function ServiceCard({ service, locale }: ServiceCardProps) {
  return (
    <Link
      href={`/${locale}/services/${service.id}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title[locale]}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-primary shadow-sm">
          <Icon name={service.icon} />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">{service.title[locale]}</h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-cta" />
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {service.short[locale]}
        </p>
      </div>
    </Link>
  );
}
