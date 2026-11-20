'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: [0.88, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.22, delay: Math.min(delay, 0.12) }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
