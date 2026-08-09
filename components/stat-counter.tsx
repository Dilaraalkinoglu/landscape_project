'use client';

import { useEffect, useRef, useState } from 'react';

export function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const duration = 1200;
      const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
}
