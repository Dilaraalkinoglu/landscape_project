'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Flower2, Leaf, Snowflake, Sun } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { Season, SeasonalImage } from '@/lib/dictionary';

const seasons = [
  { id: 'spring', icon: Flower2, label: { tr: 'İlkbahar', en: 'Spring' } },
  { id: 'summer', icon: Sun, label: { tr: 'Yaz', en: 'Summer' } },
  { id: 'autumn', icon: Leaf, label: { tr: 'Sonbahar', en: 'Autumn' } },
  { id: 'winter', icon: Snowflake, label: { tr: 'Kış', en: 'Winter' } },
] as const;

type GalleryState = { active: Season; previous?: Season };
const photoSizes = '(min-width: 1552px) 1100px, (min-width: 1024px) 75vw, 100vw';

export function HeroSeasonalView({ locale, seasonalImages, children }: {
  locale: Locale;
  seasonalImages: SeasonalImage;
  children: ReactNode;
}) {
  const [{ active, previous }, setGallery] = useState<GalleryState>({ active: 'summer' });
  const [pending, setPending] = useState<Season>();
  const [failed, setFailed] = useState(false);
  const request = useRef(0);
  const english = locale === 'en';
  const groupLabel = english ? 'Seasons' : 'Mevsimler';
  const activeLabel = seasons.find(({ id }) => id === active)?.label[locale];
  const alt = english ? 'Villa garden with a stone path and terrace' : 'Taş patikalı ve teraslı villa bahçesi';

  useEffect(() => () => { request.current += 1; }, []);

  async function selectSeason(season: Season) {
    const id = ++request.current;
    setFailed(false);
    setPending(season === active ? undefined : season);
    if (season === active) return;

    try {
      const image = new window.Image();
      image.src = seasonalImages[season];
      await image.decode();
      if (id !== request.current) return;
      setGallery({ active: season, previous: active });
    } catch {
      if (id === request.current) setFailed(true);
    } finally {
      if (id === request.current) setPending(undefined);
    }
  }

  return (
    <div className="home-hero-layout">
      <div className="home-hero-copy">
        <Image
          src="/images/mediterranean/hero-sprig.png"
          alt=""
          aria-hidden="true"
          width={320}
          height={200}
          className="home-hero-sprig"
        />
        {children}
      </div>
      <figure className="hero-season-photo">
        {previous && <Image src={seasonalImages[previous]} alt="" className="season-landscape" fill sizes={photoSizes} />}
        <Image
          key={active}
          src={seasonalImages[active]}
          alt={`${alt} · ${activeLabel}`}
          className={`season-landscape ${previous ? 'season-enter' : ''}`}
          priority={active === 'summer' && !previous}
          sizes={photoSizes}
          fill
          onAnimationEnd={() => setGallery((view) => view.active === active ? { active } : view)}
        />
        <div className="season-controls" role="group" aria-label={groupLabel}>
          {seasons.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              className="season-button"
              aria-label={label[locale]}
              title={label[locale]}
              aria-pressed={active === id}
              data-season={id}
              data-pending={pending === id || undefined}
              onClick={() => void selectSeason(id)}
            >
              <span className="season-glyph"><Icon size={17} aria-hidden="true" /></span>
            </button>
          ))}
        </div>
        <p className={failed ? 'season-notice' : 'sr-only'} role="status">
          {failed
            ? (english ? 'The photo could not load.' : 'Fotoğraf yüklenemedi.')
            : pending
              ? (english ? 'Loading photo…' : 'Fotoğraf yükleniyor…')
              : activeLabel}
        </p>
      </figure>
    </div>
  );
}
