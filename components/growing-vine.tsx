'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function GrowingVine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stemPathRef = useRef<SVGPathElement>(null);
  const [metrics, setMetrics] = useState<{
    height: number;
    pathD: string;
    leaves: Array<{
      id: number;
      side: 'left' | 'right';
      x: number;
      y: number;
      progressPercent: number;
    }>;
  }>({
    height: 3000,
    pathD: 'M 500,0',
    leaves: [],
  });

  // Sayfanın gerçek piksel yüksekliğini ölçüp SVG'nin getPointAtLength API'si ile tam gövde teğet noktalarını bulur
  useEffect(() => {
    const updateMetrics = () => {
      if (!containerRef.current) return;
      const h = Math.max(containerRef.current.offsetHeight, 1000);

      // Dalın her bir S-dalgası periyodu tam 800px
      const wavePeriod = 800;
      const wavesCount = Math.max(Math.ceil(h / wavePeriod), 1);
      const totalSvgHeight = wavesCount * wavePeriod;

      let d = 'M 500,0';
      for (let i = 0; i < wavesCount; i++) {
        const yStart = i * wavePeriod;
        d += ` C 300,${yStart + 260} 700,${yStart + 540} 500,${yStart + 800}`;
      }

      // Geçici bir SVG path oluşturup eğrinin kesin (x, y) koordinatlarını hesapla
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', d);
      const totalLength = tempPath.getTotalLength();

      const leafDistance = 360;
      const leafCount = Math.max(Math.floor((h - 80) / leafDistance), 2);
      const leavesList = [];

      for (let i = 1; i <= leafCount; i++) {
        const targetY = 160 + (i - 1) * leafDistance;
        if (targetY > h - 40) break;

        // targetY yüksekliğindeki kesin dal eğrisi (x, y) noktasını ikili arama ile bul
        let low = 0;
        let high = totalLength;
        let bestPoint = tempPath.getPointAtLength(0);

        for (let step = 0; step < 24; step++) {
          const mid = (low + high) / 2;
          const pt = tempPath.getPointAtLength(mid);
          if (Math.abs(pt.y - targetY) < 1) {
            bestPoint = pt;
            break;
          }
          if (pt.y < targetY) {
            low = mid;
          } else {
            high = mid;
          }
          bestPoint = pt;
        }

        const isLeft = i % 2 !== 0;
        // Dal kalınlığı 6px olduğu için teğet çıkış noktası
        const exactX = isLeft ? bestPoint.x - 2 : bestPoint.x + 2;

        leavesList.push({
          id: i,
          side: isLeft ? ('left' as const) : ('right' as const),
          x: exactX,
          y: bestPoint.y,
          progressPercent: bestPoint.y / h,
        });
      }

      setMetrics({
        height: totalSvgHeight,
        pathD: d,
        leaves: leavesList,
      });
    };

    updateMetrics();

    const ro = new ResizeObserver(() => {
      updateMetrics();
    });

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!stemPathRef.current || !containerRef.current || metrics.leaves.length === 0) return;

      const stem = stemPathRef.current;
      const pathLength = stem.getTotalLength();

      // Başlangıçta ana dalı gizle
      gsap.set(stem, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Ana dalın scroll ile %100 senkron uzaması
      gsap.to(stem, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      // Her yaprağın dal ucu o noktaya ulaştığı an tam kullanıcının gözü önünde filizlenmesi
      metrics.leaves.forEach((leaf) => {
        const leafGroup = containerRef.current?.querySelector(`.dynamic-leaf-${leaf.id}`);
        if (!leafGroup) return;

        gsap.set(leafGroup, {
          scale: 0,
          opacity: 0,
          transformOrigin: '0px 0px',
        });

        // Dalın ucu o noktaya geldiği anda (ekranın altından girer girmez) yaprak anında büyüyüp açılır
        gsap.to(leafGroup, {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${leaf.progressPercent * 100}% 95%`,
            end: `top+=${leaf.progressPercent * 100}% 80%`,
            scrub: 0.2,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [metrics] }
  );

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-0 opacity-90 dark:opacity-30 transition-opacity duration-300"
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1000 ${metrics.height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
      >
        <defs>
          <linearGradient id="dynamicVineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5C7A52" />
            <stop offset="30%" stopColor="#8ECA7E" />
            <stop offset="70%" stopColor="#5C7A52" />
            <stop offset="100%" stopColor="#8ECA7E" />
          </linearGradient>
        </defs>

        {/* Ana Gövde Asma Dalı */}
        <path
          ref={stemPathRef}
          d={metrics.pathD}
          stroke="url(#dynamicVineGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Kesin Matematiksel Teğet Noktalarından Filizlenen Yapraklar */}
        {metrics.leaves.map((leaf) => (
          <g
            key={leaf.id}
            className={`dynamic-leaf-${leaf.id}`}
            transform={`translate(${leaf.x}, ${leaf.y})`}
          >
            {leaf.side === 'left' ? (
              <>
                <path d="M 0,0 C -15,5 -35,5 -50,-10" stroke="#5C7A52" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path
                  d="M -50,-10 C -70,-50 -130,-40 -150,-10 C -160,20 -105,40 -65,20 C -52,12 -50,-10 -50,-10 Z"
                  fill="#5C7A52"
                  stroke="#8ECA7E"
                  strokeWidth="2.5"
                />
                <path d="M -50,-10 Q -95,-10 -140,-10" stroke="#8ECA7E" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <path d="M 0,0 C 15,5 35,5 50,-10" stroke="#5C7A52" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path
                  d="M 50,-10 C 70,-50 130,-40 150,-10 C 160,20 105,40 65,20 C 52,12 50,-10 50,-10 Z"
                  fill="#5C7A52"
                  stroke="#8ECA7E"
                  strokeWidth="2.5"
                />
                <path d="M 50,-10 Q 95,-10 140,-10" stroke="#8ECA7E" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
