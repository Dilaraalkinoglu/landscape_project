import type { ComponentPropsWithoutRef } from 'react';
import { GrowingVine } from '@/components/growing-vine';

type GardenTone = 'soft' | 'sage';

export function GardenFlow({ children }: { children: React.ReactNode }) {
  return (
    <div className="garden-flow">
      <GrowingVine />
      {children}
    </div>
  );
}

export function GardenSection({ children, tone = 'soft', className = '', ...props }: ComponentPropsWithoutRef<'section'> & { tone?: GardenTone }) {
  return (
    <section className={`garden-section ${className}`} data-tone={tone} {...props}>
      <div className="garden-section-inner mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
