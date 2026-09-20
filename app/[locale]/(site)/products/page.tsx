import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { getDict } from '@/lib/dictionary';
import { isLocale, type Locale } from '@/lib/i18n';
import { SectionReveal } from '@/components/section-reveal';
import { ProductsShowcase } from '@/components/products-showcase';
import { PRODUCT_CATEGORIES, PRODUCTS_LIST } from '@/lib/products-data';

export default function ProductsPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDict(locale);

  return (
    <div className="w-full">
      {/* Hero Banner (Proje Yeşil Renk Paleti ve Serif Tipografi ile Uyumlu) */}
      <section className="relative min-h-[34vh] flex items-end bg-[#2D4A2B] dark:bg-[#1A2018] px-4 pb-10 pt-32 text-white sm:px-6 lg:px-8 border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl text-left">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70 flex items-center gap-2">
              <span className="h-px w-6 bg-[#E0854B]" />
              {dict.productsPage.hero.badge}
            </p>
            <h1 className="mt-3 max-w-3xl font-serif text-3xl font-semibold sm:text-5xl lg:text-6xl text-white">
              {dict.productsPage.hero.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base font-light">
              {dict.productsPage.hero.subtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* 3D Diagonal Planes İnteraktif Vitrin Alanı */}
      <section className="relative z-10 bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductsShowcase
            locale={locale}
            initialCategory={null}
            showViewAllLink={false}
            showHeading={false}
          />
        </div>
      </section>

      {/* Katalog Detayları ve Ürün Özellikleri Bölümü */}
      <section className="relative z-10 bg-background-secondary/60 py-16 sm:py-24 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal className="mb-12 text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-cta">
              {locale === 'tr' ? 'TÜM ÜRÜN LİSTESİ' : 'FULL CATALOG'}
            </p>
            <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl font-semibold text-foreground">
              {locale === 'tr' ? 'Öne Çıkan Ürün Detayları' : 'Featured Product Details'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              {locale === 'tr'
                ? 'Tüm ürünlerimiz profesyonel peyzaj uygulamalarında test edilmiş, 1. sınıf dayanıklılık standartlarına sahiptir.'
                : 'All our products are rigorously tested for professional outdoor landscaping and built to last.'}
            </p>
          </SectionReveal>

          {/* 4 Kategoriye Göre Ürün Özeti Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.map((cat) => {
              const categoryProducts = PRODUCTS_LIST.filter((p) => p.category === cat.id);
              return (
                <SectionReveal key={cat.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2.5 text-lg font-serif font-semibold text-foreground">
                    <span className="text-xl">{cat.icon}</span>
                    <span>{cat.name[locale]}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground mt-1">
                    {categoryProducts.length} {locale === 'tr' ? 'Seçkin Ürün' : 'Selected Items'}
                  </span>

                  <ul className="mt-6 flex flex-col gap-3.5 divide-y divide-border/40 text-xs">
                    {categoryProducts.map((prod) => (
                      <li key={prod.id} className="pt-3 flex flex-col">
                        <span className="font-semibold text-foreground">{prod.title[locale]}</span>
                        <span className="text-muted-foreground text-[11px] line-clamp-1 mt-0.5">{prod.specs?.[locale]}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent-cta transition-colors"
                    >
                      <span>{locale === 'tr' ? 'Teklif & Bilgi Al' : 'Request Info'}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* İletişim & Danışmanlık Çağrısı */}
      <section className="relative z-10 bg-[#2D4A2B] dark:bg-[#1A2018] py-16 sm:py-20 text-white border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              {locale === 'tr'
                ? 'Bahçeniz için doğru ürünleri seçmekte yardıma mı ihtiyacınız var?'
                : 'Need assistance choosing the right materials for your garden?'}
            </h3>
            <p className="mt-2 text-sm text-white/80 max-w-xl font-light">
              {locale === 'tr'
                ? 'Peyzaj mimarlarımız alanınızın iklimine, zeminine ve tarzına en uygun ürünleri belirlemek için hazır.'
                : 'Our landscape architects are ready to help you select products tailored to your space.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#E0854B] px-6 py-3 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{locale === 'tr' ? 'Ücretsiz Danışmanlık' : 'Free Consultation'}</span>
            </Link>
            <a
              href="tel:+903121234567"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+90 312 123 45 67</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
