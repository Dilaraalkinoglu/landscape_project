'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

const labels = {
  tr: {
    gallery: 'Fotoğraf galerisi',
    fullscreen: 'Tam ekran fotoğraf galerisi',
    previous: 'Önceki fotoğraf',
    next: 'Sonraki fotoğraf',
    open: 'Fotoğrafı tam ekranda aç',
    close: 'Galeriyi kapat',
    photo: 'Fotoğraf',
    sample: 'Temsili peyzaj fotoğrafı',
  },
  en: {
    gallery: 'Photo gallery',
    fullscreen: 'Fullscreen photo gallery',
    previous: 'Previous photo',
    next: 'Next photo',
    open: 'Open photo in fullscreen',
    close: 'Close gallery',
    photo: 'Photo',
    sample: 'Illustrative landscape photo',
  },
};

type GalleryPhoto = { src: string; caption: string };

const swipeThreshold = 40;

export function InteractiveGalleryViewer({ photos, locale }: { photos: GalleryPhoto[]; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ id: number; x: number; y: number } | null>(null);

  if (!photos.length) return null;

  const copy = labels[locale];
  const photo = photos[index];
  const multiplePhotos = photos.length > 1;
  const count = `${index + 1} / ${photos.length}`;

  function step(direction: number) {
    setIndex((current) => (current + direction + photos.length) % photos.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!multiplePhotos || (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft')) return;
    event.preventDefault();
    step(event.key === 'ArrowRight' ? 1 : -1);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!multiplePhotos || event.pointerType !== 'touch') return;
    touchStart.current = event.isPrimary ? { id: event.pointerId, x: event.clientX, y: event.clientY } : null;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = touchStart.current;
    if (!start || start.id !== event.pointerId) return;
    touchStart.current = null;

    const horizontal = event.clientX - start.x;
    const vertical = event.clientY - start.y;
    if (Math.abs(horizontal) >= swipeThreshold && Math.abs(horizontal) > Math.abs(vertical)) {
      step(horizontal < 0 ? 1 : -1);
    }
  }

  const swipeHandlers = {
    onPointerDown: handlePointerDown,
    onPointerUp: handlePointerUp,
    onPointerCancel: () => { touchStart.current = null; },
  };

  const navigation = (
    <div className="flex gap-1">
      {multiplePhotos && (
        <>
          <button type="button" className="gallery-control" aria-label={copy.previous} onClick={() => step(-1)}>
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" className="gallery-control" aria-label={copy.next} onClick={() => step(1)}>
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );

  const caption = (
    <>
      <span className="sr-only">{copy.photo} {count}. </span>
      <span className="block text-xs font-medium opacity-80">{copy.sample}</span>
      <span className="mt-1 block text-sm">{photo.caption}</span>
    </>
  );

  return (
    <div>
      <div role="group" aria-label={copy.gallery} onKeyDown={handleKeyDown}>
        <figure className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative aspect-[16/10] bg-background-secondary">
            <div className="gallery-swipe absolute inset-0" {...swipeHandlers}>
              <Image src={photo.src} alt="" fill draggable={false} sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover" />
            </div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-black/70 p-2 text-white">
              {navigation}
              <span className="text-sm tabular-nums" aria-hidden="true">{count}</span>
              <button
                ref={openButton}
                type="button"
                className="gallery-control justify-self-end"
                aria-label={copy.open}
                aria-haspopup="dialog"
                onClick={() => {
                  dialog.current?.showModal();
                  closeButton.current?.focus();
                }}
              >
                <Maximize2 size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          <figcaption className="border-t border-border px-4 py-3" aria-live="polite" aria-atomic="true">
            {caption}
          </figcaption>
        </figure>
        {multiplePhotos && (
          <div className="mt-3 flex gap-2 overflow-x-auto p-1">
            {photos.map(({ src, caption: thumbnailCaption }, number) => (
              <button
                key={src}
                type="button"
                className="gallery-thumbnail relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2"
                aria-label={`${copy.photo} ${number + 1}. ${thumbnailCaption}`}
                aria-pressed={index === number}
                onClick={() => setIndex(number)}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog rounded-xl"
        aria-label={copy.fullscreen}
        onClose={() => openButton.current?.focus()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex h-[min(92svh,54rem)] flex-col">
          <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-white/25 p-2">
            {navigation}
            <span className="text-sm tabular-nums" aria-hidden="true">{count}</span>
            <button ref={closeButton} type="button" className="gallery-control justify-self-end" aria-label={copy.close} onClick={() => dialog.current?.close()}>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <figure className="flex min-h-0 flex-1 flex-col">
            <div className="gallery-swipe relative min-h-0 flex-1" {...swipeHandlers}>
              <Image src={photo.src} alt="" fill draggable={false} sizes="(max-width: 1217px) 92vw, 70rem" className="object-contain" />
            </div>
            <figcaption className="shrink-0 border-t border-white/25 px-4 py-3" aria-live="polite" aria-atomic="true">
              {caption}
            </figcaption>
          </figure>
        </div>
      </dialog>
    </div>
  );
}
