'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Move, Leaf } from 'lucide-react';
import { useCursor } from '@/hooks/use-cursor';

export function CustomCursor() {
  const { cursorType } = useCursor();
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Sadece "fine pointer" (mouse) olan cihazlarda aktif et
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setIsTouchDevice(!finePointer);

    if (!finePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;

    const render = () => {
      // Lerp (Linear Interpolation) with high frequency for ultra-smooth 60/120fps tracking
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.35;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    >
      <AnimatePresence mode="wait">
        {cursorType === 'default' && (
          <motion.div
            key="default"
            className="w-3 h-3 rounded-full bg-[#8ECA7E] border border-[#1B1F19]/40 shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
        {cursorType === 'inspect' && (
          <motion.div
            key="inspect"
            className="flex items-center gap-2 rounded-full px-4 py-2 bg-[#1B1F19]/90 text-white text-sm font-medium shadow-lg border border-white/10 whitespace-nowrap"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <Search size={14} className="text-white shrink-0" />
            <span>İncele</span>
          </motion.div>
        )}
        {cursorType === 'drag' && (
          <motion.div
            key="drag"
            className="flex items-center gap-2 rounded-full px-4 py-2 bg-[#B5652F] text-white text-sm font-medium shadow-lg border border-white/10 whitespace-nowrap"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <Move size={14} className="text-white shrink-0" />
            <span>Sürükle</span>
          </motion.div>
        )}
        {cursorType === 'leaf' && (
          <motion.div
            key="leaf"
            className="text-[#8ECA7E] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 15 }}
            transition={{ duration: 0.12 }}
          >
            <Leaf size={24} fill="currentColor" className="stroke-[#1B1F19]/60 stroke-[1.2]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
