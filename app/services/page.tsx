'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';

const EASE = [0.22, 1, 0.36, 1] as const;

const DISCIPLINES = [
  'Branding', 'Web Design', 'E-commerce', 'Identité Visuelle',
  'Motion Design', 'CRM', 'Analytics', 'UX\u202fUI', 'Print', 'Typographie',
  'Branding', 'Web Design', 'E-commerce', 'Identité Visuelle',
  'Motion Design', 'CRM', 'Analytics', 'UX\u202fUI', 'Print', 'Typographie',
  'Branding', 'Web Design', 'E-commerce', 'Identité Visuelle',
  'Motion Design', 'CRM', 'Analytics', 'UX\u202fUI', 'Print', 'Typographie',
];

const SERVICE_KEYS = ['service1', 'service2', 'service3', 'service4', 'service5'] as const;

/* ── Service List Item ─────────────────────────────────────────────────────── */
function ServiceItem({
  index,
  title,
  price,
  isDevis,
  isActive,
  onSelect,
}: {
  index: number;
  title: string;
  price: string;
  isDevis: boolean;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="group w-full text-left border-b border-secondary/10 relative overflow-hidden"
    >
      {/* Background tint on active */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: 'rgba(224,25,25,0.04)' }}
      />

      {/* Red left indicator bar */}
      {isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary"
          layoutId="serviceBar"
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        />
      )}

      <div className="relative flex items-center gap-5 py-7 pl-6 pr-4">
        {/* Number */}
        <span
          className="text-sm font-mono w-6 shrink-0 transition-colors duration-500"
          style={{ color: isActive ? 'var(--primary)' : 'rgba(102,102,102,0.3)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <span
            className="font-display font-normal text-lg lg:text-xl leading-tight transition-colors duration-300 block truncate"
            style={{ color: isActive ? 'var(--foreground)' : 'var(--secondary)' }}
          >
            {title}
          </span>
        </div>

        {/* Price pill */}
        <span
          className="text-xs font-mono shrink-0 transition-colors duration-300"
          style={{ color: isActive ? 'var(--primary)' : 'rgba(102,102,102,0.4)' }}
        >
          {isDevis ? 'Sur devis' : price}
        </span>

        {/* Arrow */}
        <motion.span
          className="shrink-0 transition-colors duration-300"
          style={{ color: isActive ? 'var(--primary)' : 'rgba(102,102,102,0.2)' }}
          animate={{ x: isActive ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          →
        </motion.span>
      </div>
    </button>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const ctaRef = useRef<HTMLElement>(null);

  /* CTA dark cursor */
  useEffect(() => {
    const section = ctaRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          document.body.classList.add('cursor-on-dark');
        } else {
          document.body.classList.remove('cursor-on-dark');
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove('cursor-on-dark');
    };
  }, []);

  /* Build service data from translations */
  const services = SERVICE_KEYS.map((key) => {
    const featuresRaw = t(`services.${key}.features`);
    const price = t(`services.${key}.price`);
    return {
      key,
      title: t(`services.${key}.title`),
      price,
      description: t(`services.${key}.description`),
      included: t(`services.${key}.included`),
      features: (Array.isArray(featuresRaw) ? featuresRaw : []) as string[],
      isDevis:
        price.toLowerCase().includes('devis') ||
        price.toLowerCase().includes('quote'),
    };
  });

  const active = services[activeIndex];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 lg:pt-44 lg:pb-16 px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Ghost number */}
          <div className="absolute -top-6 -left-3 lg:-top-14 lg:-left-6 select-none pointer-events-none">
            <span
              className="font-display font-normal text-[10rem] lg:text-[16rem] leading-none block"
              style={{ color: 'rgba(17,17,17,0.04)' }}
            >
              05
            </span>
          </div>

          <motion.p
            aria-hidden="true"
            className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/70 mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('services.title')}
          </motion.p>

          <motion.h1
            className="font-display font-normal text-4xl md:text-5xl lg:text-7xl leading-[0.92] text-foreground relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
          >
            Ce que nous<br />créons pour vous
          </motion.h1>

          <motion.p
            className="mt-8 text-lg text-secondary/50 font-light max-w-lg relative z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Chaque discipline est une promesse.<br />Chaque projet, une nouvelle histoire.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ── SERVICES SPLIT ───────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-16 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-12 lg:gap-20 lg:items-start">

            {/* ── Left: sticky service selector ── */}
            <motion.div
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            >
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-secondary/60 mb-6">
                {t('services.subtitle')}
              </p>

              <div className="border-t border-secondary/10">
                {services.map((service, i) => (
                  <ServiceItem
                    key={service.key}
                    index={i}
                    title={service.title}
                    price={service.price}
                    isDevis={service.isDevis}
                    isActive={activeIndex === i}
                    onSelect={() => setActiveIndex(i)}
                  />
                ))}
              </div>

              {/* Small contact nudge */}
              <p className="mt-8 text-xs font-mono text-secondary/60 leading-relaxed">
                Besoin d&apos;une solution sur-mesure ?<br />
                <a
                  href="mailto:studio@sqwr.be"
                  className="text-primary/60 hover:text-primary transition-colors"
                >
                  studio@sqwr.be
                </a>
              </p>
            </motion.div>

            {/* ── Right: detail panel ── */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {/* Ghost number */}
                  <span
                    className="font-display font-normal text-[7rem] lg:text-[11rem] leading-none select-none block -mb-6 lg:-mb-10"
                    style={{ color: 'rgba(17,17,17,0.04)' }}
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>

                  {/* Service title */}
                  <h2 className="font-display font-normal text-3xl lg:text-4xl xl:text-5xl text-foreground leading-[1.05] mb-5">
                    {active.title}
                  </h2>

                  {/* Price */}
                  <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-secondary/10">
                    {!active.isDevis ? (
                      <>
                        <span className="text-xs font-mono uppercase tracking-wider text-secondary/70">
                          {t('services.startingFrom')}
                        </span>
                        <span className="text-4xl font-display font-normal text-primary">
                          {active.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-display font-normal text-primary">
                        {active.price}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-secondary/60 font-light leading-relaxed text-lg mb-10 max-w-xl">
                    {active.description}
                  </p>

                  {/* Features */}
                  <div className="mb-12">
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-secondary/60 mb-6">
                      {active.included}
                    </p>
                    <ul className="space-y-4">
                      {active.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-4 text-secondary/65 font-light text-base"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + idx * 0.05, ease: EASE }}
                        >
                          <span
                            className="flex-shrink-0"
                            style={{
                              display: 'block',
                              width: '20px',
                              height: '1px',
                              backgroundColor: 'var(--primary)',
                              marginTop: '11px',
                            }}
                          />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.12em] hover:bg-primary/85 transition-colors duration-300"
                  >
                    {t('services.getQuote')}
                    <span>&rarr;</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCIPLINES MARQUEE ──────────────────────────────────────────────── */}
      <div aria-hidden="true" className="border-y border-secondary/10 overflow-hidden py-5 select-none">
        <div className="flex animate-marquee-services whitespace-nowrap">
          {DISCIPLINES.map((d, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 text-[11px] font-mono uppercase tracking-[0.28em] text-secondary/28 flex-shrink-0 px-5"
            >
              {d}
              <span className="text-primary/35">&middot;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-48 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-20 lg:mb-28">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/70 mb-6">
              {t('services.processTitle')}
            </p>
            <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-[3.5rem] leading-[0.95] text-foreground max-w-2xl">
              {t('services.processSubtitle')}
            </h2>
          </ScrollReveal>

          <div>
            {[1, 2, 3, 4].map((step, index) => (
              <ScrollReveal key={step} delay={index * 0.08}>
                <div className="border-t border-secondary/10 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                  {/* Number */}
                  <div className="lg:col-span-1 flex items-start pt-1">
                    <span
                      className="font-display font-normal leading-none select-none"
                      style={{
                        fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                        color: 'rgba(17,17,17,0.06)',
                      }}
                    >
                      {String(step).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Step title */}
                  <div className="lg:col-span-4 lg:col-start-2">
                    <div className="w-8 h-[2px] bg-primary mb-5" />
                    <h3 className="font-display font-normal text-2xl lg:text-3xl text-foreground leading-tight">
                      {t(`services.process${step}Title`)}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-5 lg:col-start-7">
                    <p className="text-secondary/55 font-light leading-relaxed text-base">
                      {t(`services.process${step}Description`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t border-secondary/10" />
          </div>
        </div>
      </section>

      {/* ── CTA DARK ─────────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-32 lg:py-40 px-6 lg:px-16 bg-foreground text-paper relative overflow-hidden"
        data-dark-bg
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <ScrollReveal className="lg:col-span-7">
              <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.95] text-paper">
                {t('services.ctaTitle')}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-4 lg:col-start-9 flex flex-col gap-8">
              <p className="text-lg text-paper/40 font-light leading-relaxed">
                {t('services.ctaSubtitle')}
              </p>
              <div className="flex flex-col gap-4">
                <MagneticButton
                  href="/contact"
                  strength={0.15}
                  className="inline-block w-fit px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300"
                >
                  {t('services.ctaButton')}
                </MagneticButton>
                <a
                  href="mailto:studio@sqwr.be"
                  className="text-sm text-paper/30 font-light hover:text-paper/60 transition-colors duration-300 w-fit"
                >
                  studio@sqwr.be
                </a>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-24 lg:mt-32 pt-8 border-t border-paper/10 flex items-center justify-between">
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">SQWR Studio</span>
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">Bruxelles, Belgique</span>
          </div>
        </div>
      </section>
    </>
  );
}
