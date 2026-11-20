'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

const labels = {
  tr: { previous: 'Önceki fotoğraf', next: 'Sonraki fotoğraf', open: 'Fotoğrafı tam ekranda aç', close: 'Galeriyi kapat', zoomIn: 'Yakınlaştır', zoomOut: 'Uzaklaştır', photo: 'Fotoğraf', sample: 'Temsili peyzaj fotoğrafı' },
  en: { previous: 'Previous photo', next: 'Next photo', open: 'Open photo in fullscreen', close: 'Close gallery', zoomIn: 'Zoom in', zoomOut: 'Zoom out', photo: 'Photo', sample: 'Illustrative landscape photo' },
};

export function InteractiveGalleryViewer({ images, locale }: { images: string[]; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  if (!images.length) return null;

  const copy = labels[locale];
  const image = images[index];
  const caption = `${copy.sample} ${index + 1}/${images.length}`;

  function select(nextIndex: number) {
    setIndex((nextIndex + images.length) % images.length);
    setZoom(1);
    viewport.current?.scrollTo(0, 0);
  }

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-background-secondary">
        <Image src={image} alt={caption} fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-black/55 p-2 text-white">
          <div className="flex gap-1">
            {images.length > 1 && <button type="button" className="gallery-control" aria-label={copy.previous} onClick={() => select(index - 1)}><ChevronLeft size={20} /></button>}
            {images.length > 1 && <button type="button" className="gallery-control" aria-label={copy.next} onClick={() => select(index + 1)}><ChevronRight size={20} /></button>}
          </div>
          <span className="text-sm" aria-live="polite">{index + 1} / {images.length}</span>
          <button ref={openButton} type="button" className="gallery-control" aria-label={copy.open} onClick={() => dialog.current?.showModal()}><Maximize2 size={18} /></button>
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto p-1">
          {images.map((source, number) => (
            <button key={source} type="button" className="gallery-thumbnail relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2" aria-label={`${copy.photo} ${number + 1}`} aria-pressed={index === number} onClick={() => select(number)}>
              <Image src={source} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <dialog
        ref={dialog}
        className="gallery-dialog rounded-xl"
        aria-label={caption}
        onClose={() => { setZoom(1); viewport.current?.scrollTo(0, 0); openButton.current?.focus(); }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' && images.length > 1) { event.preventDefault(); select(index + 1); }
          if (event.key === 'ArrowLeft' && images.length > 1) { event.preventDefault(); select(index - 1); }
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/25 p-2">
          <div className="flex gap-1">
            {images.length > 1 && <button type="button" className="gallery-control" aria-label={copy.previous} onClick={() => select(index - 1)}><ChevronLeft size={20} /></button>}
            {images.length > 1 && <button type="button" className="gallery-control" aria-label={copy.next} onClick={() => select(index + 1)}><ChevronRight size={20} /></button>}
            <button type="button" className="gallery-control" aria-label={copy.zoomOut} disabled={zoom <= 1} onClick={() => setZoom(Math.max(1, zoom - 0.5))}><Minus size={18} /></button>
            <button type="button" className="gallery-control" aria-label={copy.zoomIn} disabled={zoom >= 2.5} onClick={() => setZoom(Math.min(2.5, zoom + 0.5))}><Plus size={18} /></button>
          </div>
          <span className="text-sm" aria-live="polite">{index + 1} / {images.length}</span>
          <button type="button" autoFocus className="gallery-control" aria-label={copy.close} onClick={() => dialog.current?.close()}><X size={20} /></button>
        </div>
        <div ref={viewport} className="h-[min(72svh,46rem)] overflow-auto">
          <div className="relative" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}>
            <Image src={image} alt={caption} fill sizes="90vw" className="object-contain" loading="lazy" />
          </div>
        </div>
      </dialog>
    </div>
  );
}
