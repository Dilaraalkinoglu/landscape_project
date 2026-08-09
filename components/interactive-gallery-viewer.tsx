'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Move
} from 'lucide-react';

type Props = {
  images: string[];
  alt: string;
  className?: string;
};

export function InteractiveGalleryViewer({ images, alt, className = '' }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  const resetTransform = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetTransform();
  }, [images.length, resetTransform]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetTransform();
  }, [images.length, resetTransform]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.25, 4));
    } else {
      setZoom((prev) => {
        const next = Math.max(prev - 0.25, 1);
        if (next === 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging && zoom > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const maxPanX = (rect.width * (zoom - 1)) / 2;
      const maxPanY = (rect.height * (zoom - 1)) / 2;

      setPan({
        x: Math.max(-maxPanX, Math.min(maxPanX, newX)),
        y: Math.max(-maxPanY, Math.min(maxPanY, newY)),
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (zoom > 1) {
      resetTransform();
    } else {
      setZoom(2.5);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleNext, handlePrev]);

  const currentImg = images[currentIndex] || images[0];

  return (
    <div className={`w-full ${className}`}>
      {/* Primary Main Interactive Box */}
      <div 
        ref={containerRef}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onDoubleClick={handleDoubleClick}
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black/90 shadow-xl cursor-grab active:cursor-grabbing select-none"
      >
        {/* Zoomable & Pannable Image Container */}
        <div
          className="w-full h-full transition-transform duration-75 ease-linear"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
          }}
        >
          <Image
            src={currentImg}
            alt={`${alt} - ${currentIndex + 1}`}
            fill
            priority
            className="object-cover pointer-events-none"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        </div>

        {/* Top Info Bar (Counter) */}
        <div className="pointer-events-none absolute top-4 right-4 flex items-center gap-2 z-10 text-white">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium backdrop-blur-md border border-white/10">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Floating Zoom & Control Toolbar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-black/70 p-1.5 text-white backdrop-blur-md border border-white/15 shadow-xl transition-all duration-300">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            title="Yakınlaştır (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            title="Uzaklaştır (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetTransform}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            title="Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="h-4 w-px bg-white/20 mx-1" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-cta text-white text-xs font-semibold hover:bg-accent-cta/90 transition-colors shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Tam Ekran</span>
          </button>
        </div>

        {/* Left & Right Next/Prev Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 text-white hover:bg-accent-cta backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Önceki Fotoğraf"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/50 text-white hover:bg-accent-cta backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Sonraki Fotoğraf"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Hint Banner */}
        {zoom > 1 && (
          <div className="pointer-events-none absolute bottom-16 left-4 flex items-center gap-1.5 text-[11px] text-white/70 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-xs">
            <Move className="w-3 h-3 text-accent-cta" />
            <span>Fotoğraf üzerinde sürükleyerek gezinebilirsiniz</span>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-2.5">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                resetTransform();
              }}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                currentIndex === idx 
                  ? 'border-accent-cta scale-105 shadow-md ring-2 ring-accent-cta/30' 
                  : 'border-transparent opacity-70 hover:opacity-100 hover:scale-102'
              }`}
            >
              <Image src={img} alt={`Küçük görsel ${idx + 1}`} fill className="object-cover" sizes="15vw" />
            </button>
          ))}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8 select-none"
          >
            {/* Modal Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                resetTransform();
              }}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-accent-cta transition-colors"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Controls Bar */}
            <div className="absolute top-5 left-5 z-50 flex items-center gap-3">
              <span className="text-sm font-medium text-white/70">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            {/* Modal Canvas Center */}
            <div
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onDoubleClick={handleDoubleClick}
              className="relative w-full h-[80vh] max-w-6xl overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing"
            >
              <div
                className="w-full h-full transition-transform duration-75 ease-linear flex items-center justify-center"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                }}
              >
                <Image
                  src={currentImg}
                  alt={alt}
                  fill
                  priority
                  className="object-contain pointer-events-none"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Modal Floating Toolbar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-white/10 p-2 text-white backdrop-blur-xl border border-white/20 shadow-2xl">
              <button
                onClick={handleZoomIn}
                className="p-3 rounded-full hover:bg-white/20 transition-colors"
                title="Yakınlaştır (+)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-3 rounded-full hover:bg-white/20 transition-colors"
                title="Uzaklaştır (-)"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={resetTransform}
                className="p-3 rounded-full hover:bg-white/20 transition-colors"
                title="Sıfırla"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold px-2 text-white/80">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Next / Prev Modal Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 text-white hover:bg-accent-cta backdrop-blur-md transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 text-white hover:bg-accent-cta backdrop-blur-md transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
