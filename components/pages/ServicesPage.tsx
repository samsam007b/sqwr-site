'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import MagneticButton from '@/components/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICE_KEYS = ['service1', 'service2', 'service3', 'service4'] as const;

const DISCIPLINES = [
  'Branding', 'Web Design', 'Application Web', 'Identité Visuelle',
  'Motion Design', 'Supabase', 'Next.js', 'UX\u202fUI', 'React', 'Typographie',
  'Branding', 'Web Design', 'Application Web', 'Identité Visuelle',
  'Motion Design', 'Supabase', 'Next.js', 'UX\u202fUI', 'React', 'Typographie',
  'Branding', 'Web Design', 'Application Web', 'Identité Visuelle',
  'Motion Design', 'Supabase', 'Next.js', 'UX\u202fUI', 'React', 'Typographie',
];

/* ── Trust Bar ──────────────────────────────────────────────────────────────── */
function TrustBar({ signals }: { signals: Array<{ label: string; sub: string }> }) {
  return (
    <div className="border-y border-secondary/10 px-6 lg:px-16 py-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
        {signals.map((signal, i) => (
          <motion.div
            key={i}
            className="flex flex-col gap-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: EASE }}
          >
            <span className="font-display font-normal text-base lg:text-lg text-foreground leading-tight">
              {signal.label}
            </span>
            <span className="text-[10px] font-mono text-secondary/40 uppercase tracking-[0.18em]">
              {signal.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Custom vs Template ─────────────────────────────────────────────────────── */
function CustomVsTemplate({ t }: { t: (key: string) => string }) {
  const points = [
    { title: t('services.cvtPoint1Title'), text: t('services.cvtPoint1Text') },
    { title: t('services.cvtPoint2Title'), text: t('services.cvtPoint2Text') },
    { title: t('services.cvtPoint3Title'), text: t('services.cvtPoint3Text') },
  ];
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-16 border-t border-secondary/10">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/50 mb-4">
            {t('services.cvtTitle')}
          </p>
          <h2 className="font-display font-normal text-3xl lg:text-4xl text-foreground leading-[0.95]">
            {t('services.cvtSubtitle')}
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {points.map((pt, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="border-l-[2px] border-primary pl-5">
                <h3 className="font-display font-normal text-xl text-foreground mb-3 leading-tight">
                  {pt.title}
                </h3>
                <p className="text-secondary/55 font-light text-sm leading-relaxed">
                  {pt.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Maintenance Section ────────────────────────────────────────────────────── */
function MaintenanceSection({ t }: { t: (key: string) => string }) {
  const features = [1, 2, 3, 4, 5].map(n => t(`services.maintenanceFeature${n}`));
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16 border-t border-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-20 lg:items-start">
          {/* Left */}
          <ScrollReveal className="lg:col-span-5 mb-14 lg:mb-0">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/50 mb-6">
              {t('services.maintenanceTitle')}
            </p>
            <h2 className="font-display font-normal text-4xl lg:text-5xl text-foreground leading-[0.95] mb-6">
              {t('services.maintenanceSubtitle')}
            </h2>
            <p className="text-secondary/55 font-light leading-relaxed text-base max-w-md">
              {t('services.maintenanceDescription')}
            </p>
          </ScrollReveal>
          {/* Right */}
          <ScrollReveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <ul className="space-y-0 mb-10 border-t border-secondary/10">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-secondary/65 font-light text-base border-b border-secondary/8 py-5"
                >
                  <span
                    style={{
                      display: 'block',
                      width: '20px',
                      height: '1px',
                      backgroundColor: 'var(--primary)',
                      marginTop: '11px',
                      flexShrink: 0,
                    }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/contact?intent=maintenance"
                className="inline-flex items-center gap-3 px-8 py-4 border border-foreground text-foreground text-sm font-mono uppercase tracking-[0.12em] hover:bg-foreground hover:text-paper transition-all duration-300"
              >
                {t('services.maintenanceCta')}
              </Link>
              <Link
                href="/tarifs#maintenance"
                className="text-xs font-mono uppercase tracking-[0.15em] text-secondary/50 hover:text-secondary transition-colors duration-300"
              >
                Voir les 3 formules →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ── Entry Point — Audit ────────────────────────────────────────────────────── */
function EntryPoint({ t }: { t: (key: string) => string }) {
  const auditFeatures = [1, 2, 3, 4, 5, 6].map(n => t(`services.auditFeature${n}`));
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-16 border-t border-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-20 lg:items-start">
          {/* Left */}
          <ScrollReveal className="lg:col-span-5 mb-14 lg:mb-0">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/50 mb-6">
              {t('services.auditTitle')}
            </p>
            <h2 className="font-display font-normal text-4xl lg:text-5xl text-foreground leading-[0.95] mb-6">
              {t('services.auditSubtitle')}
            </h2>
            <p className="text-xs font-mono text-primary/70 mb-8 uppercase tracking-[0.2em]">
              ↳ {t('services.auditCredit')}
            </p>
            <p className="text-secondary/55 font-light leading-relaxed text-base max-w-md">
              {t('services.auditDescription')}
            </p>
          </ScrollReveal>
          {/* Right */}
          <ScrollReveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <ul className="space-y-0 mb-10 border-t border-secondary/10">
              {auditFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 text-secondary/65 font-light text-base border-b border-secondary/8 py-5"
                >
                  <span
                    style={{
                      display: 'block',
                      width: '20px',
                      height: '1px',
                      backgroundColor: 'var(--primary)',
                      marginTop: '11px',
                      flexShrink: 0,
                    }}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/contact?intent=audit"
              className="inline-flex items-center gap-3 px-8 py-4 border border-foreground text-foreground text-sm font-mono uppercase tracking-[0.12em] hover:bg-foreground hover:text-paper transition-all duration-300"
            >
              {t('services.auditCta')}
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ── Service List Item ─────────────────────────────────────────────────────── */
function ServiceItem({
  index,
  title,
  tagline,
  priceSignature,
  priceFlagship,
  labelSignature,
  labelFlagship,
  isActive,
  onSelect,
}: {
  index: number;
  title: string;
  tagline: string;
  priceSignature: string;
  priceFlagship: string;
  labelSignature: string;
  labelFlagship: string;
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

      <div className="relative flex items-center gap-5 py-6 pl-6 pr-4">
        {/* Number */}
        <span
          className="text-sm font-mono w-6 shrink-0 transition-colors duration-500"
          style={{ color: isActive ? 'var(--primary)' : 'rgba(102,102,102,0.3)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Title + tagline */}
        <div className="flex-1 min-w-0">
          <span
            className="font-display font-normal text-lg lg:text-xl leading-tight transition-colors duration-300 block truncate"
            style={{ color: isActive ? 'var(--foreground)' : 'var(--secondary)' }}
          >
            {title}
          </span>
          <AnimatePresence>
            {isActive && (
              <motion.span
                className="text-xs font-mono text-secondary/40 block mt-0.5 truncate"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                {tagline}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Dual price — visible when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="flex flex-col items-end gap-0.5 shrink-0"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-[10px] font-mono text-secondary/35 whitespace-nowrap">
                {labelSignature} {priceSignature}
              </span>
              <span className="text-[10px] font-mono text-primary whitespace-nowrap">
                {labelFlagship} {priceFlagship}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

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
  const [activeTier, setActiveTier] = useState<'signature' | 'flagship'>('signature');
  const ctaRef = useRef<HTMLElement>(null);

  /* Reset tier when switching service */
  const handleSelectService = (i: number) => {
    setActiveIndex(i);
    setActiveTier('signature');
  };

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
  const services = SERVICE_KEYS.map((key) => ({
    key,
    title: t(`services.${key}.title`),
    tagline: t(`services.${key}.tagline`),
    priceSignature: t(`services.${key}.priceSignature`),
    priceFlagship: t(`services.${key}.priceFlagship`),
    labelSignature: t(`services.${key}.labelSignature`),
    labelFlagship: t(`services.${key}.labelFlagship`),
    description: t(`services.${key}.description`),
    included: t(`services.${key}.included`),
    featuresSignature: [1, 2, 3, 4, 5, 6].map(n => t(`services.${key}.featuresSignature${n}`)),
    featuresFlagship: [1, 2, 3, 4, 5, 6].map(n => t(`services.${key}.featuresFlagship${n}`)),
  }));

  const active = services[activeIndex];

  /* Trust signals */
  const trustSignals = [
    { label: t('services.trust1'), sub: t('services.trust1Sub') },
    { label: t('services.trust2'), sub: t('services.trust2Sub') },
    { label: t('services.trust3'), sub: t('services.trust3Sub') },
    { label: t('services.trust4'), sub: t('services.trust4Sub') },
  ];

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
            dangerouslySetInnerHTML={{ __html: t('services.heroHeadline').replace('\n', '<br />') }}
          />

          <motion.p
            className="mt-8 text-lg text-secondary/50 font-light max-w-lg relative z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
            dangerouslySetInnerHTML={{ __html: t('services.heroSub').replace('\n', '<br />') }}
          />
        </div>

        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────────── */}
      <TrustBar signals={trustSignals} />

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
                    tagline={service.tagline}
                    priceSignature={service.priceSignature}
                    priceFlagship={service.priceFlagship}
                    labelSignature={service.labelSignature}
                    labelFlagship={service.labelFlagship}
                    isActive={activeIndex === i}
                    onSelect={() => handleSelectService(i)}
                  />
                ))}
              </div>

              <p className="mt-8 text-xs font-mono text-secondary/60 leading-relaxed">
                {t('services.customProject')}<br />
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

                  {/* Description */}
                  <p className="text-secondary/60 font-light leading-relaxed text-base mb-8 max-w-xl">
                    {active.description}
                  </p>

                  {/* Dual pricing cards — clickable */}
                  <div className="grid grid-cols-2 gap-4 mb-10 pb-10 border-b border-secondary/10">
                    {/* Signature card */}
                    <motion.button
                      onClick={() => setActiveTier('signature')}
                      className="text-left p-5 relative cursor-pointer transition-all duration-300 focus:outline-none"
                      animate={{
                        borderColor: activeTier === 'signature' ? 'rgba(17,17,17,0.35)' : 'rgba(17,17,17,0.08)',
                        backgroundColor: activeTier === 'signature' ? 'rgba(17,17,17,0.04)' : 'transparent',
                      }}
                      style={{ border: '1px solid' }}
                      transition={{ duration: 0.25 }}
                    >
                      <p
                        className="text-[10px] font-mono uppercase tracking-[0.2em] mb-3 transition-colors duration-300"
                        style={{ color: activeTier === 'signature' ? 'var(--foreground)' : 'rgba(102,102,102,0.45)' }}
                      >
                        {active.labelSignature}
                      </p>
                      <p
                        className="text-2xl lg:text-3xl font-display font-normal mb-4 transition-colors duration-300"
                        style={{ color: activeTier === 'signature' ? 'var(--foreground)' : 'rgba(17,17,17,0.35)' }}
                      >
                        {active.priceSignature}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 text-xs font-mono transition-colors duration-300"
                        style={{ color: activeTier === 'signature' ? 'var(--foreground)' : 'rgba(102,102,102,0.4)' }}
                      >
                        {t('services.selectTier')}
                      </span>
                    </motion.button>

                    {/* Flagship card */}
                    <motion.button
                      onClick={() => setActiveTier('flagship')}
                      className="text-left p-5 relative cursor-pointer focus:outline-none"
                      animate={{
                        borderColor: activeTier === 'flagship' ? 'var(--primary)' : 'rgba(224,25,25,0.2)',
                        backgroundColor: activeTier === 'flagship' ? 'rgba(224,25,25,0.06)' : 'rgba(224,25,25,0.015)',
                      }}
                      style={{ border: '1px solid' }}
                      transition={{ duration: 0.25 }}
                    >
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        animate={{ backgroundColor: activeTier === 'flagship' ? 'var(--primary)' : 'rgba(224,25,25,0.3)' }}
                        transition={{ duration: 0.25 }}
                      />
                      <p
                        className="text-[10px] font-mono uppercase tracking-[0.2em] mb-3 transition-colors duration-300"
                        style={{ color: activeTier === 'flagship' ? 'var(--primary)' : 'rgba(224,25,25,0.45)' }}
                      >
                        {active.labelFlagship}
                      </p>
                      <p
                        className="text-2xl lg:text-3xl font-display font-normal mb-4 transition-colors duration-300"
                        style={{ color: 'var(--primary)', opacity: activeTier === 'flagship' ? 1 : 0.45 }}
                      >
                        {active.priceFlagship}
                      </p>
                      <span
                        className="inline-flex items-center gap-2 text-xs font-mono transition-colors duration-300"
                        style={{ color: activeTier === 'flagship' ? 'var(--primary)' : 'rgba(224,25,25,0.4)' }}
                      >
                        {t('services.selectTier')}
                      </span>
                    </motion.button>
                  </div>

                  {/* Features — filtered by active tier */}
                  <div className="mb-12">
                    <p
                      className="text-[10px] font-mono uppercase tracking-[0.25em] mb-5 transition-colors duration-300"
                      style={{ color: activeTier === 'flagship' ? 'var(--primary)' : 'rgba(102,102,102,0.45)' }}
                    >
                      {activeTier === 'signature' ? active.labelSignature : active.labelFlagship}
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.ul
                        key={`${activeIndex}-${activeTier}`}
                        className="space-y-3"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        {(activeTier === 'signature' ? active.featuresSignature : active.featuresFlagship).map((feature, idx) => (
                          <motion.li
                            key={idx}
                            className="flex items-start gap-3 font-light text-sm"
                            style={{ color: activeTier === 'flagship' ? 'rgba(102,102,102,0.75)' : 'rgba(102,102,102,0.65)' }}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.04, ease: EASE }}
                          >
                            <span
                              style={{
                                display: 'block',
                                width: '16px',
                                height: '1px',
                                backgroundColor: activeTier === 'flagship' ? 'var(--primary)' : 'var(--secondary)',
                                opacity: activeTier === 'flagship' ? 0.55 : 0.3,
                                marginTop: '9px',
                                flexShrink: 0,
                              }}
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </AnimatePresence>
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

      {/* ── CUSTOM VS TEMPLATE ───────────────────────────────────────────────── */}
      <CustomVsTemplate t={t} />

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

      {/* ── ENTRY POINT — Audit ──────────────────────────────────────────────── */}
      <EntryPoint t={t} />

      {/* ── MAINTENANCE ──────────────────────────────────────────────────────── */}
      <MaintenanceSection t={t} />

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
              <h2 className="font-display font-normal text-4xl md:text-5xl lg:text-6xl leading-[0.92] text-paper whitespace-pre-line">
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
                <Link
                  href="/tarifs"
                  className="text-sm font-mono uppercase tracking-[0.15em] text-paper/30 hover:text-paper/60 transition-colors duration-300 w-fit"
                >
                  Tarifs & FAQ →
                </Link>
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
            <span className="text-xs font-mono text-paper/15 uppercase tracking-[0.2em]">{t('footer.location')}</span>
          </div>
        </div>
      </section>
    </>
  );
}
