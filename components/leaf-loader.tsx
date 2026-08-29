'use client';

import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeafLoaderProps {
  size?: number;
  className?: string;
}

export function LeafLoader({ size = 32, className }: LeafLoaderProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
      className={cn('inline-flex items-center justify-center text-[#5C7A52]', className)}
    >
      <Leaf size={size} fill="currentColor" />
    </motion.div>
  );
}
