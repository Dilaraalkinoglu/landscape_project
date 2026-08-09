'use client';

import { InteractiveGalleryViewer } from './interactive-gallery-viewer';

export function Project3DInspect({ images, alt }: { images: string[]; alt: string }) {
  return <InteractiveGalleryViewer images={images} alt={alt} />;
}
