import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { Service } from '@/lib/dictionary';
import { Icon } from '@/components/icon';

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  return (
    <Link href={`/${locale}/services/${service.id}`} className="surface-card group block overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={service.image} alt="" fill className="object-cover" sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#2D4A2B]" aria-hidden="true"><Icon name={service.icon} /></div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold">{service.title[locale]}</h3>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
        </div>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.short[locale]}</p>
      </div>
    </Link>
  );
}
