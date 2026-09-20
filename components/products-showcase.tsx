'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useVelocity,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Mouse,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import {
  ProductItem,
  ProductCategory,
  PRODUCT_CATEGORIES,
  PRODUCTS_LIST,
  ALL_PRODUCTS_MIXED,
} from '@/lib/products-data';

interface ProductsShowcaseProps {
  locale: Locale;
  initialCategory?: ProductCategory | null;
  showViewAllLink?: boolean;
  showHeading?: boolean;
}

// 3D Diagonal Plane Component - Kararlı katman hiyerarşisi ve kontrollü dalgalanma
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
  // Odak noktasına göre bağıl mesafe
  const offsetFromFocus = useTransform(scrollOffset, (val) => {
    const progress = val / spacing;
    return index - progress;
  });

  // Deterministik 3D Koordinatlar (Soldan başlayarak sağa doğru genişleyerek tüm alanı doldurur)
  const x = useTransform(offsetFromFocus, (d) => {
    return d >= 0 ? d * 180 : d * 220;
  });

  // Düz zemin hizası: Kartlar yukarı doğru fırlamaz, aynı seviyede kalır
  const y = 0;

  const z = useTransform(offsetFromFocus, (d) => {
    return -d * 55;
  });

  const scale = useTransform(offsetFromFocus, (d) => {
    if (d >= 0) {
      return Math.max(0.66, 1 - d * 0.042);
    }
    return Math.min(1.03, 1 - d * 0.02);
  });

  // Sadece kaydırma anında nazikçe dalgalanma (maksimum ±4 derece)
  const wave = useTransform([offsetFromFocus, smoothVelocity], ([d, v]: any[]) => {
    const clampedV = Math.max(-1000, Math.min(1000, v));
    const speedRatio = clampedV / 1000;
    return Math.sin(d * 0.7) * (speedRatio * 4);
  });

  const rotateX = useTransform(wave, (w) => 4 + w);
  const rotateZ = useTransform(wave, (w) => 2 + w * 0.3);
  const rotateY = -22; // Kartların kesişmesini veya dönmesini engelleyen sabit açı

  // Görünürlük Aralığı (Sağdaki geniş alanı dolduracak şekilde 7-8 kart görünür)
  const opacity = useTransform(offsetFromFocus, (d) => {
    if (d > 8.5) return 0;
    if (d > 6.8) return Math.max(0, 1 - (d - 6.8) / 1.7);
    if (d < -1.4) return 0;
    if (d < -0.2) return Math.max(0, 1 - (-d - 0.2) / 1.2);
    return 1;
  });

  // SABİT VE ASLA BOZULMAYAN Z-INDEX:
  // Kart 00 her zaman 01'in önündedir, 01 daima 02'nin önündedir.
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
      className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-6 md:left-8 w-[260px] h-[350px] sm:w-[300px] sm:h-[400px] cursor-pointer select-none group origin-center pointer-events-auto"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#182016] border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:border-primary-accent/70 group-hover:shadow-[0_25px_60px_rgba(45,74,43,0.35)]">
        {/* Ürün Fotoğrafı */}
        <Image
          src={product.image}
          alt={product.title[locale]}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-106"
        />

        {/* Karartma degrade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-75" />

        {/* Sol Üst: Minimalist Numara (00, 01, 02...) */}
        <div className="absolute top-3.5 left-4 z-10 font-mono text-xs sm:text-sm font-bold tracking-widest text-white/90 drop-shadow-md">
          {String(index).padStart(2, '0')}
        </div>

        {/* Sağ Üst: Kategori Rozeti */}
        <div className="absolute top-3.5 right-4 z-10 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-[#92B380] border border-white/15">
          {product.tag[locale]}
        </div>

        {/* Alt Detay Alanı */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/85 to-transparent pt-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#92B380]">
            {PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.name[locale]}
          </span>
          <h3 className="font-serif text-base sm:text-lg font-semibold text-white mt-0.5 line-clamp-1 group-hover:text-[#92B380] transition-colors">
            {product.title[locale]}
          </h3>
          <p className="text-[11px] text-neutral-300/80 mt-1 line-clamp-2 leading-relaxed font-light">
            {product.subtitle[locale]}
          </p>

          {product.specs && (
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="line-clamp-1">{product.specs[locale]}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#E0854B] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProductsShowcase({
  locale,
  initialCategory = null,
  showViewAllLink = false,
  showHeading = true,
}: ProductsShowcaseProps) {
  // Seçili Kategori (null = Tüm Ürünler)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(initialCategory);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const SPACING = 200;

  // Scroll Pozisyonu ve Hız Hesabı
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

  // Ekran boyutu ve prefers-reduced-motion tespiti
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

  // Kategoriye göre filtrelenmiş ürün listesi (Deterministik ve hydration-safe)
  const displayedProducts = useMemo(() => {
    if (!selectedCategory) {
      return ALL_PRODUCTS_MIXED;
    }
    return PRODUCTS_LIST.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Kategori değiştiğinde scroll pozisyonunu sıfırla
  useEffect(() => {
    targetOffset.set(0);
  }, [selectedCategory, targetOffset]);

  const maxScroll = Math.max(0, (displayedProducts.length - 1) * SPACING);

  // Fare Tekerleği İle Kaydırma
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    const current = targetOffset.get();
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
    const current = targetOffset.get();
    if (current < 0) {
      targetOffset.set(0);
    } else if (current > maxScroll) {
      targetOffset.set(maxScroll);
    }
  };

  // İlerleme Okları
  const handlePrev = () => {
    const current = targetOffset.get();
    targetOffset.set(Math.max(0, current - SPACING));
  };

  const handleNext = () => {
    const current = targetOffset.get();
    targetOffset.set(Math.min(maxScroll, current + SPACING));
  };

  // Aktif Kategori Adı (Mobil dropdown için)
  const currentCategoryName = useMemo(() => {
    if (!selectedCategory) {
      return locale === 'tr' ? 'Tüm Ürünler' : 'All Products';
    }
    const cat = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory);
    return cat ? cat.name[locale] : '';
  }, [selectedCategory, locale]);

  return (
    <div className="w-full">
      {/* Üst Başlık & Kontroller Alanı */}
      {showHeading && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-serif font-semibold text-foreground sm:text-4xl lg:text-5xl">
              {locale === 'tr' ? 'Ürünlerimiz' : 'Our Products'}
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              {locale === 'tr'
                ? 'Bahçeniz için özenle seçilmiş rulo çimler, heykelsi bitkiler, mimari aydınlatma ve dış mekan mobilyaları.'
                : 'Curated sod lawns, specimen plants, exterior lighting, and all-weather furniture for your garden.'}
            </p>
          </div>

          {showViewAllLink && (
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent-cta transition-colors shrink-0"
            >
              <span>{locale === 'tr' ? 'Tüm Ürünleri İncele' : 'Explore All Products'}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}

      {/* KATEGORİ SEÇİCİ BAR, KONTROLLER & SAYAÇ */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        {/* Sol: Kategori Butonları & Dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mobil Ekranlar İçin Dropdown */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-xl bg-card border border-border text-xs font-semibold text-foreground shadow-xs"
            >
              <span>{currentCategoryName}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                <div className="absolute left-0 mt-2 z-40 w-56 rounded-xl border border-border bg-card shadow-xl p-1.5 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === null ? 'bg-primary text-white font-semibold' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{locale === 'tr' ? 'Tüm Ürünler' : 'All Products'}</span>
                  </button>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        selectedCategory === cat.id ? 'bg-primary text-white font-semibold' : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name[locale]}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Masaüstü Butonları */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-card text-foreground border border-border hover:bg-muted'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{locale === 'tr' ? 'Tüm Ürünler' : 'All Products'}</span>
            </button>

            {PRODUCT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-card text-foreground border border-border hover:bg-muted'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name[locale]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sağ: İlerleme Butonları, Mouse İpucu & Sayaç */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
            <span className="font-bold text-accent-cta">{displayedProducts.length}</span>{' '}
            {locale === 'tr' ? 'ÜRÜN' : 'ITEMS'}
          </div>

          {/* Ok Butonları */}
          <div className="flex items-center gap-1 bg-card border border-border rounded-full p-1 shadow-xs">
            <button
              onClick={handlePrev}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
              aria-label="Önceki"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-foreground transition-colors"
              aria-label="Sonraki"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mouse Scroll İpucu */}
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            <Mouse className="h-3.5 w-3.5 text-accent-cta animate-bounce" />
            <span>{locale === 'tr' ? 'KAYDIRIN' : 'SCROLL'}</span>
          </div>
        </div>
      </div>

      {/* 3D VİTRİN ALANI (Kartsız, doğrudan sayfa zemininde) */}
      <div className="relative w-full overflow-hidden min-h-[440px] sm:min-h-[460px] md:min-h-[480px] select-none">
        {/* 3D Diagonal Planes Sahnesi (Masaüstü: md ve üzeri ekranlarda görünür) */}
        <div
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="hidden md:block w-full h-[440px] sm:h-[460px] md:h-[480px] relative cursor-grab active:cursor-grabbing overflow-hidden select-none"
          style={{
            perspective: 1200,
            perspectiveOrigin: '38% 45%',
          }}
        >
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

        {/* Dokunmatik Grid Görünümü (Mobil: md altı ekranlarda görünür) */}
        <div className="block md:hidden w-full py-4">
          <div className="mx-auto max-w-5xl">
            <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {displayedProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    className="relative overflow-hidden rounded-xl border border-border bg-card shadow-md"
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
                      <div className="absolute top-3 right-3 rounded-full bg-primary text-white px-2 py-0.5 text-[10px] font-semibold">
                        {product.tag[locale]}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-serif text-base font-semibold text-foreground">
                        {product.title[locale]}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {product.subtitle[locale]}
                      </p>
                      {product.specs && (
                        <div className="mt-2 pt-2 border-t border-border text-[10px] font-mono text-primary">
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
      </div>
    </div>
  );
}

export default ProductsShowcase;
