'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sun, Leaf, Snowflake, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Season, SeasonalImage } from '@/lib/dictionary';

interface HeroSeasonalViewProps {
  seasonalImages: SeasonalImage;
  alt: string;
  className?: string;
}

const seasons: { key: Season; label: string; icon: LucideIcon }[] = [
  { key: 'spring', label: 'İlkbahar', icon: Flower2 },
  { key: 'summer', label: 'Yaz', icon: Sun },
  { key: 'autumn', label: 'Sonbahar', icon: Leaf },
  { key: 'winter', label: 'Kış', icon: Snowflake },
];

export function HeroSeasonalView({ seasonalImages, alt, className }: HeroSeasonalViewProps) {
  const [selectedSeason, setSelectedSeason] = useState<Season>('summer');

  // Preload an image on button hover for instant response
  const handlePreload = (src: string) => {
    if (typeof window !== 'undefined' && src) {
      const img = new window.Image();
      img.src = src;
    }
  };

  return (
    <div className={cn('absolute inset-0', className)}>
      {/* Background Animated Image */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSeason}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={seasonalImages[selectedSeason]}
              alt={`${alt} - ${seasons.find((s) => s.key === selectedSeason)?.label || ''}`}
              fill
              priority={selectedSeason === 'summer'}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Season Toggle Panel (Vertical Pill on Top Right) */}
      <div className="absolute top-24 right-3 sm:right-6 md:right-10 z-20">
        <div 
          className="flex flex-col gap-2 rounded-full px-2 py-3 border border-white/10 shadow-2xl"
          style={{
            backgroundColor: 'rgba(27, 31, 25, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          role="group"
          aria-label="Mevsimsel Değişim Önizlemesi"
        >
          {seasons.map((season) => {
            const isSelected = selectedSeason === season.key;
            return (
              <button
                key={season.key}
                type="button"
                onClick={() => setSelectedSeason(season.key)}
                onMouseEnter={() => handlePreload(seasonalImages[season.key])}
                onFocus={() => handlePreload(seasonalImages[season.key])}
                aria-label={`${season.label} mevsimini göster`}
                aria-pressed={isSelected}
                title={season.label}
                className={cn(
                  'flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 min-w-[40px] min-h-[40px] rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#B5652F]',
                  isSelected
                    ? 'bg-[#B5652F] text-white scale-105 shadow-md font-bold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                <season.icon className="w-[18px] h-[18px] shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
