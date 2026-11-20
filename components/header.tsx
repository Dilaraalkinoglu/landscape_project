'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, X, Leaf, Sun, Moon } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/dictionary';
import { sectionHref, sections, type SectionId } from '@/lib/site-navigation';

export function Header({ locale, dict }: { locale: Locale; dict: Dict }) {
  const pathname = usePathname();
  const home = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [active, setActive] = useState<SectionId>('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const english = locale === 'en';
  const navigationLabel = english ? 'Main navigation' : 'Ana menü';
  const alternate = english ? 'tr' : 'en';
  const detail = sections.find((id) => pathname.startsWith(`/${locale}/${id}/`));
  const current = home ? active : detail;
  const otherPath = home ? sectionHref(alternate, active) : pathname.replace(`/${locale}`, `/${alternate}`);

  useEffect(() => {
    const targets = home ? sections.flatMap((id) => {
      const node = document.getElementById(id);
      return node ? [{ id, node }] : [];
    }) : [];
    let scheduled = 0;
    let currentSection: SectionId | undefined;
    let pastHeader: boolean | undefined;

    const measure = () => {
      scheduled = 0;
      const compact = window.scrollY > 30;
      if (compact !== pastHeader) {
        pastHeader = compact;
        setScrolled(compact);
      }
      if (!targets.length) return;

      const line = (header.current?.getBoundingClientRect().bottom ?? 80) + 48;
      let visible = targets[0].id;
      for (const { id, node } of targets) {
        if (node.getBoundingClientRect().top > line) break;
        visible = id;
      }
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) {
        visible = targets[targets.length - 1].id;
      }
      if (visible !== currentSection) {
        currentSection = visible;
        setActive(visible);
      }
    };

    const schedule = () => {
      if (!scheduled) scheduled = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('load', schedule);
    const content = document.querySelector('main');
    const observer = content ? new ResizeObserver(schedule) : undefined;
    if (content) observer?.observe(content);

    return () => {
      window.cancelAnimationFrame(scheduled);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('load', schedule);
      observer?.disconnect();
    };
  }, [home]);

  const href = (id: SectionId) => home ? `#${id}` : sectionHref(locale, id);
  const localLinks = (mobile: boolean) => sections.map((id) => (
    <a
      key={id}
      href={href(id)}
      aria-current={current === id ? (home ? 'location' : 'page') : undefined}
      className={`section-nav-link ${mobile ? 'block rounded-lg px-4 py-3' : 'px-2.5 py-2 xl:px-3'}`}
      onClick={() => {
        if (!mobile) return;
        setMobileOpen(false);
        if (home) document.getElementById(id)?.focus({ preventScroll: true });
      }}
    >
      {dict.nav[id]}
    </a>
  ));

  return (
    <header
      ref={header}
      data-site-header
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background text-foreground shadow-sm"
      onBlur={(event) => {
        if (mobileOpen && !event.currentTarget.contains(event.relatedTarget)) setMobileOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && mobileOpen) {
          setMobileOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8" style={{ minHeight: scrolled ? 56 : 76 }}>
        <a href={sectionHref(locale, 'home')} className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-white"><Leaf size={20} aria-hidden="true" /></span>
          <span className="font-serif text-base font-semibold leading-tight lg:text-lg">Yeşil Toprak Peyzaj</span>
        </a>
        <nav className="hidden items-center lg:flex" aria-label={navigationLabel}>{localLinks(false)}</nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <a className="header-action" href={otherPath} lang={alternate} hrefLang={alternate} aria-label={english ? 'Türkçe' : 'English'}>{alternate.toUpperCase()}</a>
          <button
            className="header-action"
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={english ? 'Change colour theme' : 'Renk temasını değiştir'}
          >
            <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
            <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
          </button>
          <a className="hidden rounded-lg bg-[#944c22] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#753918] xl:inline-block" href={href('contact')}>{dict.nav.cta}</a>
          <button
            ref={toggle}
            className="header-action lg:hidden"
            type="button"
            aria-label={mobileOpen ? (english ? 'Close menu' : 'Menüyü kapat') : navigationLabel}
            aria-expanded={mobileOpen}
            aria-controls={mobileOpen ? 'mobile-navigation' : undefined}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-40 bg-black/45 lg:hidden" style={{ top: scrolled ? 56 : 76 }} aria-hidden="true" onClick={() => { setMobileOpen(false); toggle.current?.focus(); }} />
          <nav id="mobile-navigation" className="absolute right-0 top-full z-50 max-h-[calc(100dvh-5rem)] w-[min(20rem,100vw)] overflow-auto border-l border-border bg-background p-3 shadow-lg lg:hidden" aria-label={navigationLabel}>
            {localLinks(true)}
          </nav>
        </>
      )}
      <noscript><nav className="flex flex-wrap border-t border-border px-4 lg:hidden" aria-label={navigationLabel}>{localLinks(false)}</nav></noscript>
    </header>
  );
}
