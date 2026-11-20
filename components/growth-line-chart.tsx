export function GrowthLineChart() {
  return (
    <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-primary-accent opacity-20 dark:opacity-15" fill="none" aria-hidden="true">
      <path d="M 0,110 Q 250,90 400,60 T 750,30 T 1000,10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />
    </svg>
  );
}
