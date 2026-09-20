'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useVelocity,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';
import { X, Sparkles, ArrowUpRight, Mouse, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import {
  ProductItem,
  ProductCategory,
  PRODUCT_CATEGORIES,
  PRODUCTS_LIST,
  getShuffledProducts,
} from '@/lib/products-data';

interface ProductsMegaDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

// 3D Diagonal Plane Component - Stabil, z-index sıralaması bozulmayan ve kontrollü dalgalanan kart
interface Plane3DProps {
  product: ProductItem;
  index: number;
  totalCards: number;
  spacing: number;
  scrollOffset: MotionValue<number>;
  smoothVelocity: MotionValue<number>;
  locale: Locale;
}

function Plane3D({
  product,
  index,
  totalCards,
  spacing,
  scrollOffset,
  smoothVelocity,
  locale,
}: Plane3DProps) {
  // Odak noktasına olan bağıl mesafe (kart index'i - aktif scroll progress)
  const offsetFromFocus = useTransform(scrollOffset, (val) => {
    const progress = val / spacing;
    return index - progress;
  });

  // 1. Koordinat Hesaplamaları (Tamamen deterministik ve kararlı)
  // d == 0: Kart tam vitrin odağında (ön planda)
  // d > 0: Kart arkada, sağa ve yukarı doğru uzanıyor
  // d < 0: Kart odağı geçmiş, sol alta doğru uzaklaşıyor
  const x = useTransform(offsetFromFocus, (d) => {
    return d >= 0 ? d * 155 : d * 180;
  });

  const y = useTransform(offsetFromFocus, (d) => {
    return d >= 0 ? -d * 42 : -d * 50;
  });

  const z = useTransform(offsetFromFocus, (d) => {
    return -d * 60;
  });

  const scale = useTransform(offsetFromFocus, (d) => {
    if (d >= 0) {
      return Math.max(0.72, 1 - d * 0.045);
    }
    return Math.min(1.05, 1 - d * 0.025);
  });

  // 2. Kontrollü Dalgalanma (Sadece scroll anında nazikçe dalgalanır, şekli bozulmaz)
  const wave = useTransform([offsetFromFocus, smoothVelocity], ([d, v]: any[]) => {
    const clampedV = Math.max(-1200, Math.min(1200, v));
    const speedRatio = clampedV / 1200;
    // Maksimum ±6 derece nazik dalgalanma
    return Math.sin(d * 0.7) * (speedRatio * 6);
  });

  const rotateX = useTransform(wave, (w) => 6 + w);
  const rotateZ = useTransform(wave, (w) => 3 + w * 0.4);
  // rotateY sabit tutularak kartların düzlem kesişmesi veya ters dönmesi engellenir
  const rotateY = -22;

  // 3. Görünürlük Aralığı & Yumuşak Kaybolma (Uzaklaşan kartlar transparanlaşır)
  const opacity = useTransform(offsetFromFocus, (d) => {
    if (d > 7) return 0;
    if (d > 5) return Math.max(0, 1 - (d - 5) / 2);
    if (d < -2.2) return 0;
    if (d < -1) return Math.max(0, 1 - (-d - 1) / 1.2);
    return 1;
  });

  // 4. SABİT VE ASLA BOZULMAYAN Z-INDEX:
  // Öndeki kart (küçük index) DAİMA arkadaki kartın önündedir!
  // Hiçbir koşulda birbirlerinin arkasına geçemezler.
  const zIndex = (totalCards - index) * 10;

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        scale,
        rotateX,
        rotateY,
        rotateZ,
        opacity,
        zIndex,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        scale: 1.04,
        y: -10,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      className="absolute top-1/2 left-1/2 -ml-[130px] -mt-[175px] sm:-ml-[150px] sm:-mt-[200px] w-[260px] h-[350px] sm:w-[300px] sm:h-[400px] cursor-pointer select-none group origin-center pointer-events-auto"
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-[0_25px_60px_rgba(34,197,94,0.25)]">
        {/* Fotoğraf */}
        <Image
          src={product.image}
          alt={product.title[locale]}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
        />

        {/* Karartma degrade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 transition-opacity duration-300 group-hover:opacity-75" />

        {/* Sol Üst: Minimalist Sıra Numarası (00, 01, 02...) */}
        <div className="absolute top-3.5 left-4 z-10 font-mono text-xs sm:text-sm font-bold tracking-widest text-white/95 drop-shadow-md">
          {String(index).padStart(2, '0')}
        </div>

        {/* Sağ Üst: Kategori Rozeti */}
        <div className="absolute top-3.5 right-4 z-10 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-primary/95 border border-white/15">
          {product.tag[locale]}
        </div>

        {/* Alt Detay Alanı */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/85 to-transparent pt-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-primary/85">
            {PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.name[locale]}
          </span>
          <h3 className="font-serif text-base sm:text-lg font-semibold text-white mt-0.5 line-clamp-1 group-hover:text-primary transition-colors">
            {product.title[locale]}
          </h3>
          <p className="text-[11px] text-neutral-300/80 mt-1 line-clamp-2 leading-relaxed font-light">
            {product.subtitle[locale]}
          </p>

          {product.specs && (
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="line-clamp-1">{product.specs[locale]}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsMegaDropdown({
  isOpen,
  onClose,
  locale,
}: ProductsMegaDropdownProps) {
  // Seçili kategori (null = tüm ürünler karışık)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Kartlar arası adım mesafesi
  const SPACING = 200;

  // Hedef scroll değeri ve useSpring ile pürüzsüzleştirilmiş reel scroll değeri
  const targetOffset = useMotionValue(0);
  const scrollOffset = useSpring(targetOffset, {
    stiffness: 110,
    damping: 25,
    mass: 0.5,
  });

  const velocity = useVelocity(scrollOffset);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  // Mobil ve reduced motion kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 860);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', onChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mql.removeEventListener('change', onChange);
    };
  }, []);

  // Karışık başlangıç listesi
  const initialShuffled = useMemo(() => getShuffledProducts(), [isOpen]);

  // Kategoriye göre filtrelenmiş ürün listesi
  const displayedProducts = useMemo(() => {
    if (!selectedCategory) {
      return initialShuffled;
    }
    return PRODUCTS_LIST.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, initialShuffled]);

  // Kategori değiştiğinde scroll pozisyonunu başa al
  useEffect(() => {
    targetOffset.set(0);
  }, [selectedCategory, targetOffset]);

  // ESC ile kapatma
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const maxScroll = Math.max(0, (displayedProducts.length - 1) * SPACING);

  // Fare Tekerleği İle Kaydırma
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    const current = targetOffset.get();
    // Yumuşak sınır kısıtı
    const next = Math.max(-20, Math.min(maxScroll + 20, current + delta * 0.9));
    targetOffset.set(next);
  };

  // Dokunma ve Fare ile Sürükleme (Drag / Pan)
  const isDraggingRef = useRef(false);
  const startDragRef = useRef({ x: 0, y: 0, offset: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    startDragRef.current = {
      x: e.clientX,
      y: e.clientY,
      offset: targetOffset.get(),
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - startDragRef.current.x;
    const dy = e.clientY - startDragRef.current.y;
    // Çapraz çekme vektörü
    const dragDelta = -(dx * 0.9 - dy * 0.35);
    const next = Math.max(-30, Math.min(maxScroll + 30, startDragRef.current.offset + dragDelta));
    targetOffset.set(next);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    // Sınır aşımı varsa yumuşakça sınır içine çek
    const current = targetOffset.get();
    if (current < 0) {
      targetOffset.set(0);
    } else if (current > maxScroll) {
      targetOffset.set(maxScroll);
    }
  };

  // Butonlarla Adım Adım İlerleme
  const handlePrev = () => {
    const current = targetOffset.get();
    targetOffset.set(Math.max(0, current - SPACING));
  };

  const handleNext = () => {
    const current = targetOffset.get();
    targetOffset.set(Math.min(maxScroll, current + SPACING));
  };

  // Aktif Kategori Başlığı
  const currentCategoryData = useMemo(() => {
    if (!selectedCategory) {
      return {
        title: locale === 'tr' ? 'HERITAGE PEYZAJ' : 'HERITAGE LANDSCAPE',
        subtitle: locale === 'tr' ? 'KOLEKSİYONU' : 'COLLECTION',
        desc:
          locale === 'tr'
            ? 'Doğanın estetiğini ve zamansız peyzaj mimarisini açık hava alanlarınıza taşıyan seçkin ürün ve bitki koleksiyonu.'
            : 'Exclusive outdoor living, plants, and architectural landscape elements curated for modern spaces.',
      };
    }
    const cat = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory);
    return {
      title: cat ? cat.name[locale].toUpperCase() : '',
      subtitle: locale === 'tr' ? 'KOLEKSİYONU' : 'COLLECTION',
      desc:
        locale === 'tr'
          ? `${cat?.name[locale]} kategorisinde yer alan en seçkin ve profesyonel peyzaj çözümleri.`
          : `Premier solutions and architectural designs in ${cat?.name[locale]}.`,
    };
  }, [selectedCategory, locale]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Arka plan karartması */}
          <motion.div
            key="products-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
          />

          {/* Mega Dropdown Paneli */}
          <motion.div
            key="products-dropdown-panel"
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 sm:top-20 z-50 h-[88vh] max-h-[88vh] flex flex-col bg-[#050606] text-white border-b border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Üst Bar: Kategori Filtreleri ve Kontroller */}
            <div className="shrink-0 border-b border-white/10 bg-black/60 backdrop-blur-xl px-4 py-3 sm:px-8 z-30">
              <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
                {/* Sol: Kategori Butonları */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                      selectedCategory === null
                        ? 'bg-primary text-black font-semibold shadow-md shadow-primary/20'
                        : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>{locale === 'tr' ? 'Tüm Ürünler (Karışık)' : 'All Items (Mixed)'}</span>
                  </button>

                  {PRODUCT_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                          isSelected
                            ? 'bg-primary text-black font-semibold shadow-md shadow-primary/20'
                            : 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.name[locale]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sağ: İndikatör ve Kapat Butonu */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono tracking-widest text-neutral-400 hidden sm:inline-block">
                    {displayedProducts.length} {locale === 'tr' ? 'ÜRÜN' : 'ITEMS'}
                  </span>
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/15 border border-white/10 transition-colors"
                    aria-label="Kapat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ANA VİTRİN ALANI */}
            <div className="relative flex-1 w-full overflow-hidden">
              {/* Sol Üst Başlık (Motion.dev Tarzı Tipografi) */}
              <div className="absolute top-6 left-6 sm:top-10 sm:left-12 z-20 pointer-events-none max-w-sm sm:max-w-md">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-primary font-semibold block mb-1">
                  {locale === 'tr' ? 'DOĞAL YAŞAM & PEYZAJ' : 'EXCLUSIVE OUTDOOR'}
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white uppercase leading-[0.95]">
                  {currentCategoryData.title}
                  <br />
                  {currentCategoryData.subtitle}
                  <sup className="text-sm sm:text-lg font-mono font-normal text-primary ml-1.5">
                    ({displayedProducts.length})
                  </sup>
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed hidden sm:block">
                  {currentCategoryData.desc}
                </p>
              </div>

              {/* Sağ Alt: SCROLL TO SURF & İlerleme Butonları */}
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-20 flex items-center gap-3">
                {/* Ok Butonları */}
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/15">
                  <button
                    onClick={handlePrev}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/15 text-white transition-colors"
                    aria-label="Önceki"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/15 text-white transition-colors"
                    aria-label="Sonraki"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Mouse Scroll İpucu */}
                <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-widest text-neutral-400 uppercase pointer-events-none">
                  <Mouse className="h-4 w-4 text-primary animate-bounce" />
                  <span className="text-white font-medium">
                    {locale === 'tr' ? 'SCROLL İLE KAYDIRIN' : 'SCROLL TO SURF'}
                  </span>
                </div>
              </div>

              {/* 3D Planes Carousel Sahnesi (Desktop) */}
              {!isMobile && !prefersReducedMotion ? (
                <div
                  onWheel={handleWheel}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden select-none"
                  style={{
                    perspective: 1200,
                    perspectiveOrigin: '55% 48%',
                  }}
                >
                  {/* Diagonal 3D Sahnesi */}
                  <div
                    className="w-full h-full relative pointer-events-none"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {displayedProducts.map((product, idx) => (
                        <Plane3D
                          key={`${selectedCategory ?? 'all'}-${product.id}`}
                          product={product}
                          index={idx}
                          totalCards={displayedProducts.length}
                          spacing={SPACING}
                          scrollOffset={scrollOffset}
                          smoothVelocity={smoothVelocity}
                          locale={locale}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Mobil & Reduced Motion Görünümü */
                <div className="w-full h-full overflow-y-auto px-4 py-8 pt-32 sm:px-8">
                  <div className="mx-auto max-w-5xl">
                    <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <AnimatePresence mode="popLayout">
                        {displayedProducts.map((product, idx) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                            className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-lg"
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.title[locale]}
                                fill
                                sizes="400px"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              <div className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-mono font-bold text-white">
                                {String(idx).padStart(2, '0')}
                              </div>
                              <div className="absolute top-3 right-3 rounded-full bg-primary/90 text-black px-2 py-0.5 text-[10px] font-semibold">
                                {product.tag[locale]}
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-serif text-base font-semibold text-white">
                                {product.title[locale]}
                              </h4>
                              <p className="text-xs text-neutral-300/80 mt-1 line-clamp-2">
                                {product.subtitle[locale]}
                              </p>
                              {product.specs && (
                                <div className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-primary">
                                  {product.specs[locale]}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProductsMegaDropdown;
