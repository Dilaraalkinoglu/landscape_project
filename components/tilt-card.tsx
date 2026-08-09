'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';

export function TiltCard({ src, alt, className = '', children }: { src: string; alt: string; className?: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });
  const imgX = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 180, damping: 22 });
  const imgY = useSpring(useTransform(y, [-0.5, 0.5], [-15, 15]), { stiffness: 180, damping: 22 });

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left) / bounds.width - 0.5);
        y.set((event.clientY - bounds.top) / bounds.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div className="relative w-full h-full" style={{ x: imgX, y: imgY, scale: 1.12 }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </motion.div>
      {children}
    </motion.div>
  );
}
