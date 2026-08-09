import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { getDict } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { SectionReveal } from '@/components/section-reveal';
import { ContactForm } from '@/components/contact-form';
import { notFound } from 'next/navigation';

export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);

  return (
    <div>
      <section className="relative min-h-[32vh] flex items-end bg-primary px-4 pb-8 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl text-left">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{dict.contactPage.hero.badge}</p>
            <h1 className="mt-2.5 max-w-3xl text-3xl font-semibold sm:text-5xl">{dict.contactPage.hero.title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{dict.contactPage.hero.subtitle}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-background pt-6 pb-16 sm:pt-8 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <SectionReveal>
              <h2 className="text-3xl font-semibold">{dict.contactPage.form.formTitle}</h2>
              <div className="mt-6 rounded-2xl border border-border bg-card p-6">
                <ContactForm dict={dict} />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="text-3xl font-semibold">{dict.contactPage.info.title}</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cta/15 text-accent-cta"><Phone className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.contactPage.info.phone}</p>
                    <a href="tel:+903121234567" className="font-semibold hover:text-accent-cta">+90 312 123 45 67</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cta/15 text-accent-cta"><Mail className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.contactPage.info.email}</p>
                    <a href="mailto:info@yesiltoprak.com" className="font-semibold hover:text-accent-cta">info@yesiltoprak.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cta/15 text-accent-cta"><Clock className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.contactPage.info.hours}</p>
                    <p className="font-semibold">{dict.contactPage.info.hoursValue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cta/15 text-accent-cta"><MapPin className="h-5 w-5" /></div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.contactPage.info.area}</p>
                    <p className="font-semibold">{dict.contactPage.info.areaValue}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <iframe
                  title="Yeşil Toprak Peyzaj Konum Haritası"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.28014522956!2d32.62268157774972!3d39.90355571167727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sAnkara!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
