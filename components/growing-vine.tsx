'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';

const segmentHeight = 340;
const shoots = [
  { x: 56, y: 80, facing: -1, at: 22 },
  { x: 111, y: 152, facing: 1, at: 42 },
  { x: 77, y: 218, facing: -1, at: 61 },
  { x: 86, y: 286, facing: 1, at: 80 },
];
const homeTracks = ['left', 'center', 'right'] as const;
const detailTracks = ['right'] as const;

export function HomeVines() {
  const segment = useSelectedLayoutSegment();
  return segment === null ? <GrowingVine animated /> : null;
}

export function GrowingVine({ animated = false }: { animated?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const drawingId = useId();
  const [segmentCount, setSegmentCount] = useState(1);
  const tracks = animated ? homeTracks : detailTracks;

  useEffect(() => {
    const root = container.current;
    if (!root) return;

    const segments = root.querySelectorAll<HTMLElement>('.vine-segment');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let lastSegment = -1;

    const draw = () => {
      frame = 0;
      const { top, bottom } = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const distanceToEnd = Math.max(0, bottom - viewportHeight);
      // Let the last stretch reach the footer edge at the bottom of the page.
      const growthLine = viewportHeight - Math.min(viewportHeight * 0.18, distanceToEnd);
      const progress = Math.max(0, (growthLine - top) / segmentHeight);
      const currentSegment = Math.min(segments.length - 1, Math.floor(progress));
      const first = lastSegment < 0 ? 0 : Math.min(lastSegment, currentSegment);
      const last = lastSegment < 0 ? segments.length - 1 : Math.max(lastSegment, currentSegment);

      for (let index = first; index <= last; index += 1) {
        const reveal = Math.round(Math.min(1, Math.max(0, progress - index)) * 100);
        segments[index].style.setProperty('--vine-reveal', String(reveal));
      }
      lastSegment = currentSegment;
    };

    const schedule = () => {
      if (animated && !frame && !reduceMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    const sizeToFlow = () => {
      setSegmentCount(Math.max(1, Math.ceil(root.getBoundingClientRect().height / segmentHeight)));
      schedule();
    };

    const applyMotionPreference = () => {
      if (reduceMotion.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        lastSegment = -1;
        segments.forEach((segment) => segment.style.removeProperty('--vine-reveal'));
      } else {
        schedule();
      }
    };

    sizeToFlow();
    const observer = new ResizeObserver(sizeToFlow);
    observer.observe(root);
    if (animated) {
      reduceMotion.addEventListener('change', applyMotionPreference);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    }
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      reduceMotion.removeEventListener('change', applyMotionPreference);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [animated, segmentCount]);

  return (
    <div ref={container} className="vine-layer" aria-hidden="true">
      <svg className="absolute" width="0" height="0" fill="none">
        <defs>
          <g id={drawingId}>
            <path
              className="vine-stem"
              d="M86 0 C86 28 56 48 56 80 S111 118 111 152 S77 192 77 218 S86 258 86 286 S99 334 86 360"
            />
            {shoots.map(({ x, y, facing, at }) => (
              <g key={y} transform={`translate(${x} ${y}) scale(${facing} 1)`} className="vine-shoot" style={{ '--sprout-at': at } as CSSProperties}>
                <path className="vine-stem vine-twig" d="M0 0 Q14 -17 37 -21 M13 -12 Q17 -22 19 -37" />
                <path className="vine-leaf" d="M27 -19 C34 -37 53 -39 64 -35 C57 -20 42 -13 27 -19 Z M17 -29 C11 -42 17 -54 26 -60 C31 -45 26 -35 17 -29 Z" />
                <path className="vine-vein" d="M31 -20 Q45 -25 56 -31 M18 -34 Q21 -42 24 -52" />
              </g>
            ))}
          </g>
        </defs>
      </svg>
      {Array.from({ length: segmentCount }, (_, index) => (
        <div key={index} className="vine-segment" style={{ height: segmentHeight }}>
          {tracks.map((track) => (
            <svg key={track} className={`vine-track vine-${track}`} viewBox="0 0 172 360" preserveAspectRatio="none" fill="none">
              <use href={`#${drawingId}`} transform={(index % 2 === 1) !== (track === 'left') ? 'translate(172 0) scale(-1 1)' : undefined} />
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
}
