import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getDict, heroSeasonalImages, aboutHeroImage, contactGardenImage, projects, services, team, testimonials } from '@/lib/dictionary';
import { contactDetails, contactDraft } from '@/lib/contact-details';
import { isLocale, type Locale } from '@/lib/i18n';
import { SectionReveal } from '@/components/section-reveal';
import { HeroSeasonalView } from '@/components/hero-seasonal-view';
import { ServiceCard } from '@/components/service-card';
import { FeaturedProjectCard } from '@/components/featured-project-card';
import { GardenSection } from '@/components/garden-section';
import { GrowthLineChart } from '@/components/growth-line-chart';
import { Icon } from '@/components/icon';
import { ProductCatalogue } from '@/components/product-catalogue';

type Review = typeof testimonials[number];

function ReviewCard({ item, locale }: { item: Review; locale: Locale }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-6 text-card-foreground">
      <Quote className="h-7 w-7 text-[#85431e] dark:text-[#e2a174]" aria-hidden="true" />
      <span className="mt-4 block text-[#85431e] dark:text-[#e2a174]" aria-label={locale === 'tr' ? `5 üzerinden ${item.rating} yıldız` : `${item.rating} out of 5 stars`}>
        <span aria-hidden="true">{'★'.repeat(item.rating)}</span>
      </span>
      <blockquote className="mt-4 text-sm leading-7 text-muted-foreground">“{item.text[locale]}”</blockquote>
      <p className="mt-5 border-t border-border pt-4 font-semibold">{item.name}</p>
      <p className="mt-1 text-xs text-muted-foreground">{item.location[locale]} · {item.project[locale]}</p>
    </article>
  );
}

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;
  const dict = getDict(locale);
  const english = locale === 'en';
  const contact = contactDetails;

  return (
    <>
      <section id="home" className="home-hero" tabIndex={-1} aria-labelledby="home-title">
        <HeroSeasonalView seasonalImages={heroSeasonalImages} locale={locale}>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent-cta" aria-hidden="true" />{dict.hero.badge}
          </p>
          <h1 id="home-title" className="home-hero-title font-semibold">{dict.hero.title}</h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">{dict.hero.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="hero-cta rounded-lg bg-[#944c22] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#753918]">{dict.hero.primaryCta}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
            <a href="#portfolio" className="hero-cta hero-cta-secondary font-semibold transition-colors">{dict.hero.secondaryCta}<ArrowUpRight className="h-4 w-4" aria-hidden="true" /></a>
          </div>
        </HeroSeasonalView>
      </section>

      <GardenSection id="about" tabIndex={-1} className="py-16 sm:py-24" aria-labelledby="about-title">
        <SectionReveal className="max-w-2xl">
          <p className="eyebrow">01 — {dict.nav.about}</p>
          <h2 id="about-title" className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.whyUs.title}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{dict.whyUs.subtitle}</p>
        </SectionReveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.whyUs.items.map((item) => (
            <article key={item.title} className="surface-card rounded-2xl border border-border bg-card p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background-secondary text-primary-accent"><Icon name={item.icon} /></div>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-10 sm:mt-16 sm:pt-12">
          <section className="grid items-start gap-6 lg:grid-cols-2" aria-labelledby="about-story-title">
            <div className="space-y-4 leading-7 text-muted-foreground">
              <h3 id="about-story-title" className="text-3xl font-semibold text-foreground">{dict.about.story.title}</h3>
              <p>{dict.about.story.p1}</p><p>{dict.about.story.p2}</p><p>{dict.about.story.p3}</p>
            </div>
            <div className="relative aspect-[5/3] overflow-hidden rounded-xl bg-muted">
              <Image src={aboutHeroImage} alt={english ? 'Olive tree beside a stone garden wall' : 'Taş bahçe duvarının yanında bir zeytin ağacı'} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover object-[50%_55%]" />
            </div>
          </section>
          <section className="mt-10 sm:mt-12" aria-labelledby="about-team-title">
            <h3 id="about-team-title" className="text-3xl font-semibold">{dict.about.team.title}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {team.map((member) => (
                <li key={member.name} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role[locale]}</p>
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div><h3 className="text-2xl font-semibold">{dict.about.values.title}</h3><p className="mt-2 text-muted-foreground">{dict.about.values.subtitle}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{dict.about.values.items.map((item) => <li key={item.title}><strong className="text-foreground">{item.title}</strong> · {item.desc}</li>)}</ul>
            </div>
            <div><h3 className="text-2xl font-semibold">{dict.about.certifications.title}</h3><p className="mt-2 text-muted-foreground">{dict.about.certifications.subtitle}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">{dict.about.certifications.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </GardenSection>

      <GardenSection id="services" tone="sage" tabIndex={-1} className="border-t border-border py-16 sm:py-24" aria-labelledby="services-title">
        <SectionReveal>
          <p className="eyebrow">02 — {dict.nav.services}</p>
          <h2 id="services-title" className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.servicesPreview.title}</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">{dict.servicesPreview.subtitle}</p>
        </SectionReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.id} service={service} locale={locale} />)}
        </div>
      </GardenSection>

      <GardenSection id="portfolio" tabIndex={-1} className="border-t border-border py-16 sm:py-24" aria-labelledby="portfolio-title">
        <SectionReveal>
          <p className="eyebrow">03 — {dict.nav.portfolio}</p>
          <h2 id="portfolio-title" className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.featuredProjects.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{dict.featuredProjects.subtitle}</p>
          <p className="mt-2 text-sm text-muted-foreground">{english ? 'Illustrative landscape photos' : 'Temsili peyzaj fotoğrafları'}</p>
        </SectionReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.slice(0, 4).map((project, index) => <FeaturedProjectCard key={project.id} project={project} locale={locale} index={index} />)}
        </div>
        <details className="more-panel mt-6">
          <summary>{dict.featuredProjects.viewAll}</summary>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {projects.slice(4).map((project) => <FeaturedProjectCard key={project.id} project={project} locale={locale} index={1} />)}
          </div>
        </details>
      </GardenSection>

      <GardenSection id="products" tone="sage" tabIndex={-1} className="border-t border-border py-16 sm:py-24" aria-labelledby="products-title">
        <SectionReveal>
          <p className="eyebrow">04 — {dict.nav.products}</p>
          <h2 id="products-title" className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.productsPreview.title}</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">{dict.productsPreview.subtitle}</p>
        </SectionReveal>
        <ProductCatalogue locale={locale} label={dict.productsPreview.selectCategory} />
      </GardenSection>

      <section id="testimonials" tabIndex={-1} aria-labelledby="testimonials-title">
        <GardenSection className="border-t border-border py-16 sm:py-24">
          <SectionReveal className="max-w-2xl">
            <p className="eyebrow">05 — {dict.nav.testimonials}</p>
            <h2 id="testimonials-title" className="mt-3 text-4xl font-semibold sm:text-5xl">{dict.testimonials.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{dict.testimonials.subtitle}</p>
          </SectionReveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => <ReviewCard key={item.id} item={item} locale={locale} />)}
          </div>
        </GardenSection>
        <GardenSection tone="sage" className="border-t border-border py-14 sm:py-20">
          <GrowthLineChart />
          <div className="relative text-center">
            <p className="eyebrow">06 — {dict.stats.title}</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{dict.stats.subtitle}</h2>
            <div className="mt-9 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {dict.stats.items.map((stat) => (
                <div key={stat.id}>
                  <p className="font-serif text-5xl font-semibold text-primary-accent sm:text-6xl">{stat.value}{stat.suffix}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label[locale]}</p>
                </div>
              ))}
            </div>
          </div>
        </GardenSection>
      </section>

      <section id="contact" tabIndex={-1} className="contact-section" aria-labelledby="contact-title">
        <div className="contact-layout">
          <div className="contact-photo">
            <Image
              src={contactGardenImage}
              alt={english ? 'Limestone path through a garden of olive trees, lavender and grasses' : 'Zeytin ağacı, lavanta ve süs otları arasından geçen doğal taş patika'}
              fill
              className="object-cover"
              sizes="(min-width: 1440px) 755px, (min-width: 1024px) 55vw, 100vw"
            />
          </div>
          <div className="contact-copy">
            <p className="contact-label">{dict.nav.contact}</p>
            <h2 id="contact-title" className="contact-title font-semibold">{dict.ctaSection.title}</h2>
            <p className="contact-description">{dict.ctaSection.subtitle}</p>
            <div className="contact-details">
              {contact.phone && <a href={`tel:${contact.phone.number}`} className="mr-5 inline-block underline">{contact.phone.label}</a>}
              {contact.email && <a href={`mailto:${contact.email}`} className="inline-block underline">{contact.email}</a>}
              {!contact.phone && !contact.email && <p className="font-medium">{contactDraft[locale]}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
