import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, Clock } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import type { Dict } from '@/lib/dictionary';
import { services } from '@/lib/dictionary';

type Props = {
  locale: Locale;
  dict: Dict;
};

export function Footer({ locale, dict }: Props) {
  const navItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'services', href: `/${locale}/services` },
    { key: 'portfolio', href: `/${locale}/portfolio` },
    { key: 'testimonials', href: `/${locale}/testimonials` },
    { key: 'contact', href: `/${locale}/contact` },
  ] as const;

  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif font-semibold text-lg text-foreground">Yeşil Toprak Peyzaj</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{dict.footer.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-foreground mb-4">{dict.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-foreground mb-4">{dict.footer.services}</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/${locale}/services/${s.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {s.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-foreground mb-4">{dict.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>+90 312 123 45 67</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>info@yesiltoprak.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>Ankara, Türkiye</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                <span>{dict.contactPage.info.hoursValue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Yeşil Toprak Peyzaj. {dict.footer.rights}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="uppercase font-medium">{locale === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
