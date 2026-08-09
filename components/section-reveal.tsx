'use client';

import { motion } from 'framer-motion';

export function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}
