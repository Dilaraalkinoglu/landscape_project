'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/dictionary';

type Props = {
  locale: Locale;
  dict: Dict;
};

export function Header({ locale, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'portfolio', href: `/${locale}/portfolio` },
    { key: 'testimonials', href: `/${locale}/testimonials` },
    { key: 'contact', href: `/${locale}/contact` },
  ] as const;

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  const switchLang = (newLocale: Locale) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    window.location.href = newPath;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border/40' 
            : 'bg-background/80 backdrop-blur-md border-b border-border/30 shadow-xs'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-20'}`}>
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <div className={`flex items-center justify-center rounded-lg bg-primary text-white transition-all duration-300 ${scrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                <Leaf className={scrolled ? 'w-4 h-4' : 'w-5 h-5'} />
              </div>
              <span className={`font-serif font-semibold text-foreground transition-all duration-300 ${scrolled ? 'text-base' : 'text-lg'}`}>
                Yeşil Toprak Peyzaj
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-accent-cta font-semibold'
                      : 'text-foreground/80'
                  }`}
                >
                  <span className="inline-block transition-transform duration-200 hover:scale-115">
                    {dict.nav[item.key]}
                  </span>
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent-cta rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-md text-sm font-medium text-foreground hover:text-accent-cta hover:bg-accent-cta/10 transition-colors"
                  aria-label={dict.language}
                >
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{locale}</span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1 z-50 w-28 rounded-lg border border-border bg-card shadow-lg overflow-hidden"
                      >
                        <button
                          onClick={() => switchLang('tr')}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent-cta/10 hover:text-accent-cta ${locale === 'tr' ? 'text-accent-cta font-medium' : 'text-foreground'}`}
                        >
                          <span className="text-base">🇹🇷</span> TR
                        </button>
                        <button
                          onClick={() => switchLang('en')}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-accent-cta/10 hover:text-accent-cta ${locale === 'en' ? 'text-accent-cta font-medium' : 'text-foreground'}`}
                        >
                          <span className="text-base">🇬🇧</span> EN
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-md text-foreground hover:text-accent-cta hover:bg-accent-cta/10 transition-colors"
                aria-label={theme === 'dark' ? dict.theme.light : dict.theme.dark}
              >
                {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* CTA button */}
              <Link
                href={`/${locale}/contact`}
                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-accent-cta text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
              >
                {dict.nav.cta}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md text-foreground hover:text-accent-cta hover:bg-accent-cta/10 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-card shadow-xl overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-accent-cta bg-muted font-bold'
                          : 'text-foreground hover:scale-105 inline-block origin-left'
                      }`}
                    >
                      {dict.nav[item.key]}
                    </Link>
                  ))}
                </nav>
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 flex items-center justify-center px-4 py-2.5 rounded-lg bg-accent-cta text-white text-sm font-medium"
                >
                  {dict.nav.cta}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
