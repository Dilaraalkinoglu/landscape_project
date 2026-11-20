'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Armchair, Flower2, Lamp, Sprout } from 'lucide-react';
import { PRODUCT_CATEGORIES, PRODUCTS_LIST, type ProductCategory } from '@/lib/products-data';
import type { Locale } from '@/lib/i18n';

const categoryIcons = { turf: Sprout, plants: Flower2, lighting: Lamp, furniture: Armchair };
const categories = PRODUCT_CATEGORIES.map((category) => ({
  ...category,
  Icon: categoryIcons[category.id],
  products: PRODUCTS_LIST.filter((product) => product.category === category.id),
}));
const initialCategory = categories[0]?.id ?? null;

export function ProductCatalogue({ locale, label }: { locale: Locale; label: string }) {
  const [category, setCategory] = useState<ProductCategory | null>(initialCategory);
  const selected = categories.find(({ id }) => id === category);
  const productLabel = locale === 'tr' ? 'ürün' : 'products';
  const prompt = locale === 'tr'
    ? 'Ürünleri görmek için bir kategori seçin.'
    : 'Choose a category to see its products.';

  return (
    <>
      <div className="catalogue-filters mt-8 grid grid-cols-2 gap-3 md:grid-cols-4" role="group" aria-label={label}>
        {categories.map(({ id, name, Icon, products }) => (
          <button
            key={id}
            className="product-filter"
            type="button"
            aria-pressed={category === id}
            aria-controls="product-results"
            onClick={() => setCategory(id)}
          >
            <span className="flex items-start gap-2">
              <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block font-serif text-sm leading-snug sm:text-lg">{name[locale]}</span>
                <span className="mt-1 block font-normal">{products.length} {productLabel}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <div id="product-results" className="catalogue-filters mt-5">
        <p className="text-sm text-muted-foreground" role="status">
          {selected ? `${selected.name[locale]} · ${selected.products.length} ${productLabel}` : prompt}
        </p>
        {selected && (
          <ul className="mt-4 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label={selected.name[locale]}>
            {selected.products.map((item) => (
              <li key={item.id} className="surface-card overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[16/10] bg-muted">
                  <Image src={item.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" className="object-cover" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-xl font-semibold">{item.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.subtitle[locale]}</p>
                  {item.specs && <p className="mt-3 text-sm font-medium text-primary-accent">{item.specs[locale]}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <noscript>
        <div className="mt-8 space-y-3">
          {categories.map(({ id, name, products }) => (
            <details key={id} className="more-panel" open={id === initialCategory}>
              <summary>{name[locale]}</summary>
              <ul className="mt-2 space-y-3">
                {products.map((item) => (
                  <li key={item.id}>
                    <h3 className="font-semibold">{item.title[locale]}</h3>
                    <p className="text-sm text-muted-foreground">{item.subtitle[locale]}</p>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </noscript>
    </>
  );
}
