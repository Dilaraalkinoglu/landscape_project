import { Leaf, Mail, Phone } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { services, type Dict } from '@/lib/dictionary';
import { contactDetails, contactDraft } from '@/lib/contact-details';
import { sectionHref, sections } from '@/lib/site-navigation';

export function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const contact = contactDetails;
  return (
    <footer className="site-footer border-t border-border">
      <div className="site-footer-inner mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,0.85fr)] gap-x-3 gap-y-8 [overflow-wrap:anywhere] sm:grid-cols-3 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-3 md:col-span-1">
            <a href={sectionHref(locale, 'home')} className="mb-3 flex items-center gap-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-white"><Leaf className="h-5 w-5" aria-hidden="true" /></span>
              <span className="font-serif text-lg font-semibold">Yeşil Toprak Peyzaj</span>
            </a>
            <p className="text-sm leading-relaxed text-muted-foreground">{dict.footer.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">{dict.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {sections.map((id) => <li key={id}><a className="hover:underline" href={sectionHref(locale, id)}>{dict.nav[id]}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">{dict.footer.services}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {services.map((service) => <li key={service.id}><a className="hover:underline" href={`/${locale}/services/${service.id}`}>{service.title[locale]}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold">{dict.footer.contact}</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              {contact.phone && <a className="flex items-center gap-2 hover:underline" href={`tel:${contact.phone.number}`}><Phone size={16} className="shrink-0" aria-hidden="true" />{contact.phone.label}</a>}
              {contact.email && <a className="flex items-center gap-2 hover:underline" href={`mailto:${contact.email}`}><Mail size={16} className="shrink-0" aria-hidden="true" />{contact.email}</a>}
              {!contact.phone && !contact.email && <p>{contactDraft[locale]}</p>}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Yeşil Toprak Peyzaj. {dict.footer.rights}</p>
          <span className="uppercase">{locale}</span>
        </div>
      </div>
    </footer>
  );
}
