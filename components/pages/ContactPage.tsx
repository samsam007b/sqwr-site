'use client';

import { useState, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useLanguage } from '@/context/LanguageContext';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactPage() {
  const { t } = useLanguage();

  const SERVICES = [
    t('contact.service1'),
    t('contact.service2'),
    t('contact.service3'),
    t('contact.service4'),
    t('contact.service5'),
    t('contact.service6'),
  ];

  const BUDGETS = [
    t('contact.budget1'),
    t('contact.budget2'),
    t('contact.budget3'),
    t('contact.budget4'),
    t('contact.budget5'),
    t('contact.budget6'),
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const errors: Record<string, boolean> = {};
    if (!formData.name.trim()) errors.name = true;
    if (!formData.email.trim()) errors.email = true;
    if (!formData.service) errors.service = true;
    if (!formData.message.trim()) errors.message = true;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Focus first error field
      if (errors.name) nameRef.current?.focus();
      else if (errors.email) emailRef.current?.focus();
      else if (errors.message) messageRef.current?.focus();
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', service: '', budget: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 7000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 6000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setPill = (field: 'service' | 'budget', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === value ? '' : value,
    }));
  };

  const inputClass =
    'w-full px-0 py-3.5 border-b border-secondary/20 focus:border-primary focus:outline-none transition-colors duration-300 bg-transparent text-foreground font-light placeholder:text-secondary/25 text-base';

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-8 lg:pt-44 lg:pb-16 px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          {/* Ghost number */}
          <div className="absolute -top-6 -left-3 lg:-top-14 lg:-left-6 select-none pointer-events-none">
            <span
              className="font-display font-normal text-[10rem] lg:text-[16rem] leading-none block"
              style={{ color: 'rgba(17,17,17,0.04)' }}
            >
              →
            </span>
          </div>

          <motion.p
            aria-hidden="true"
            className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {t('contact.heroLabel')}
          </motion.p>

          <motion.h1
            className="font-display font-normal text-4xl md:text-5xl lg:text-7xl leading-[0.92] text-foreground relative z-10 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            dangerouslySetInnerHTML={{ __html: t('contact.heroTitle').replace(/\n/g, '<br />') }}
          />

          <motion.p
            className="mt-8 text-lg text-secondary/50 font-light max-w-md relative z-10"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            {t('contact.heroSub')}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-32 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">

          {/* ── Contacts rapides — mobile uniquement ─────────────────────── */}
          <div className="lg:hidden mb-8 border-t border-secondary/10">
            <a
              href="tel:+32493302752"
              className="flex items-center justify-between py-4 border-b border-secondary/10 active:bg-foreground/5 transition-colors duration-200"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-secondary/60 block mb-0.5">{t('contact.phone')}</span>
                <span className="font-light text-base">+32 493 30 27 52</span>
              </div>
              <span className="text-secondary/40">↗</span>
            </a>
            <a
              href="mailto:studio@sqwr.be"
              className="flex items-center justify-between py-4 border-b border-secondary/10 active:bg-foreground/5 transition-colors duration-200"
            >
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-secondary/60 block mb-0.5">Email</span>
                <span className="font-light text-base">studio@sqwr.be</span>
              </div>
              <span className="text-secondary/40">↗</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24">

            {/* ── Form ── */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    key="success"
                    role="alert"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="py-20 lg:py-28"
                  >
                    <div className="w-8 h-[2px] bg-primary mb-8" />
                    <h2
                      className="font-display font-normal text-3xl lg:text-4xl text-foreground mb-6 leading-tight"
                      dangerouslySetInnerHTML={{ __html: t('contact.successTitle').replace(/\n/g, '<br />') }}
                    />
                    <p className="text-secondary/55 font-light text-lg max-w-md">
                      {t('contact.successMessage')}
                    </p>
                    <p className="mt-6 text-sm font-mono text-secondary/70">
                      studio@sqwr.be &mdash; +32 493 30 27 52
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >

                    {/* Step 01 */}
                    <div className="mb-8 lg:mb-14">
                      <div className="flex items-center gap-4 mb-6 lg:mb-8">
                        <span className="text-xs font-mono text-primary tracking-[0.2em]">01</span>
                        <div className="flex-1 h-[1px] bg-secondary/10" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60">{t('contact.stepYou')}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                        <div>
                          <label htmlFor="name" className="block text-[11px] font-mono uppercase tracking-[0.2em] text-secondary mb-1">
                            {t('contact.nameLabel')} *
                          </label>
                          <input
                            ref={nameRef}
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => { handleChange(e); if (fieldErrors.name) setFieldErrors(p => ({ ...p, name: false })); }}
                            required
                            aria-required="true"
                            aria-invalid={fieldErrors.name ? 'true' : undefined}
                            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                            className={inputClass}
                            placeholder={t('contact.namePlaceholder')}
                          />
                          {fieldErrors.name && (
                            <span id="name-error" role="alert" className="text-xs text-primary mt-1 block">
                              {t('contact.fieldRequired')}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-[11px] font-mono uppercase tracking-[0.2em] text-secondary mb-1">
                            {t('contact.emailLabel')} *
                          </label>
                          <input
                            ref={emailRef}
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => { handleChange(e); if (fieldErrors.email) setFieldErrors(p => ({ ...p, email: false })); }}
                            required
                            aria-required="true"
                            aria-invalid={fieldErrors.email ? 'true' : undefined}
                            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                            className={inputClass}
                            placeholder="votre@email.com"
                          />
                          {fieldErrors.email && (
                            <span id="email-error" role="alert" className="text-xs text-primary mt-1 block">
                              {t('contact.emailInvalid')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="mt-10">
                        <label htmlFor="company" className="block text-[11px] font-mono uppercase tracking-[0.2em] text-secondary mb-1">
                          {t('contact.companyLabel')} <span className="text-secondary/60 normal-case tracking-normal">{t('contact.optional')}</span>
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={inputClass}
                          placeholder={t('contact.companyPlaceholder')}
                        />
                      </div>
                    </div>

                    {/* Step 02 */}
                    <div className="mb-8 lg:mb-14">
                      <div className="flex items-center gap-4 mb-6 lg:mb-8">
                        <span className="text-xs font-mono text-primary tracking-[0.2em]">02</span>
                        <div className="flex-1 h-[1px] bg-secondary/10" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60">{t('contact.stepProject')}</span>
                      </div>

                      {/* Service pills */}
                      <div className="mb-8 lg:mb-10">
                        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-secondary mb-3 lg:mb-4">
                          {t('contact.serviceType')} *
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {SERVICES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setPill('service', s)}
                              aria-pressed={formData.service === s}
                              className="px-4 py-3 min-h-[44px] text-xs font-mono uppercase tracking-[0.1em] border transition-all duration-200"
                              style={{
                                borderColor: formData.service === s ? 'var(--primary)' : 'rgba(102,102,102,0.2)',
                                backgroundColor: formData.service === s ? 'var(--primary)' : 'transparent',
                                color: formData.service === s ? '#fff' : 'rgba(102,102,102,0.6)',
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        {/* Hidden input to make the form value available */}
                        <input type="hidden" name="service" value={formData.service} />
                      </div>

                      {/* Budget pills */}
                      <div>
                        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-secondary mb-3 lg:mb-4">
                          {t('contact.budgetLabel')}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {BUDGETS.map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setPill('budget', b)}
                              aria-pressed={formData.budget === b}
                              className="px-4 py-3 min-h-[44px] text-xs font-mono tracking-[0.05em] border transition-all duration-200"
                              style={{
                                borderColor: formData.budget === b ? 'var(--primary)' : 'rgba(102,102,102,0.2)',
                                backgroundColor: formData.budget === b ? 'var(--primary)' : 'transparent',
                                color: formData.budget === b ? '#fff' : 'rgba(102,102,102,0.6)',
                              }}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="budget" value={formData.budget} />
                      </div>
                    </div>

                    {/* Step 03 */}
                    <div className="mb-8 lg:mb-12">
                      <div className="flex items-center gap-4 mb-6 lg:mb-8">
                        <span className="text-xs font-mono text-primary tracking-[0.2em]">03</span>
                        <div className="flex-1 h-[1px] bg-secondary/10" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/60">{t('contact.stepMessage')}</span>
                      </div>

                      <label htmlFor="message" className="block text-[11px] font-mono uppercase tracking-[0.2em] text-secondary mb-1">
                        {t('contact.messageLabel')} *
                      </label>
                      <textarea
                        ref={messageRef}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => { handleChange(e); if (fieldErrors.message) setFieldErrors(p => ({ ...p, message: false })); }}
                        required
                        aria-required="true"
                        aria-invalid={fieldErrors.message ? 'true' : undefined}
                        aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                        rows={6}
                        className={`${inputClass} resize-none`}
                        placeholder={t('contact.messagePlaceholder')}
                      />
                      {fieldErrors.message && (
                        <span id="message-error" role="alert" className="text-xs text-primary mt-1 block">
                          {t('contact.fieldRequired')}
                        </span>
                      )}
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6">
                      <button
                        type="submit"
                        disabled={isSubmitting || !formData.service}
                        className="w-full md:w-auto px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? t('contact.sending') : t('contact.sendButton')}
                      </button>
                      {!formData.service && (
                        <span className="text-xs font-mono text-secondary/60">
                          {t('contact.selectService')}
                        </span>
                      )}
                    </div>

                    {submitStatus === 'error' && (
                      <motion.p
                        role="alert"
                        aria-live="polite"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-sm font-light text-foreground border-l-2 border-primary pl-4"
                      >
                        {t('contact.errorMessage')}{' '}
                        <a href="mailto:studio@sqwr.be" className="text-primary">
                          studio@sqwr.be
                        </a>
                      </motion.p>
                    )}

                    {/* RGPD notice */}
                    <p className="text-[10px] font-mono text-secondary/60 mt-5 leading-relaxed">
                      {t('contact.rgpd')}{' '}
                      <Link href="/politique-confidentialite" className="underline hover:text-primary transition-colors">
                        {t('contact.rgpdLink')}
                      </Link>
                      {t('contact.rgpdSuffix')}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* ── Info sidebar ── */}
            <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
              <div className="lg:sticky lg:top-32 space-y-12">
                <ScrollReveal delay={0.2}>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-secondary/60 mb-8">
                    {t('contact.contactUsLabel')}
                  </p>

                  <div className="space-y-0 border-t border-secondary/10">
                    <a
                      href="mailto:studio@sqwr.be"
                      className="group flex items-center justify-between py-5 border-b border-secondary/10 hover:text-primary transition-colors duration-300"
                    >
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-secondary/70 block mb-1">Email</span>
                        <span className="font-light text-base text-foreground group-hover:text-primary transition-colors duration-300">
                          studio@sqwr.be
                        </span>
                      </div>
                      <span aria-hidden="true" className="text-secondary/40 group-hover:text-primary transition-colors duration-300 ml-4">↗</span>
                    </a>

                    <a
                      href="tel:+32493302752"
                      className="group flex items-center justify-between py-5 border-b border-secondary/10 hover:text-primary transition-colors duration-300"
                    >
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-secondary/70 block mb-1">{t('contact.phone')}</span>
                        <span className="font-light text-base text-foreground group-hover:text-primary transition-colors duration-300">
                          +32 493 30 27 52
                        </span>
                      </div>
                      <span aria-hidden="true" className="text-secondary/40 group-hover:text-primary transition-colors duration-300 ml-4">↗</span>
                    </a>

                    <div className="py-5 border-b border-secondary/10">
                      <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-secondary/70 block mb-1">{t('contact.locationLabel')}</span>
                      <span className="font-light text-base text-foreground">{t('footer.location')}</span>
                    </div>

                    <div className="py-5">
                      <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-secondary/70 block mb-1">{t('contact.responseLabel')}</span>
                      <span className="font-light text-base text-foreground">{t('contact.responseTime')}</span>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Note */}
                <ScrollReveal delay={0.35}>
                  <div className="border-l-2 border-primary/30 pl-5">
                    <p className="text-sm text-secondary/45 font-light leading-relaxed">
                      {t('contact.sidebarNote')}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
