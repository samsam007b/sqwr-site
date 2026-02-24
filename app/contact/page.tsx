'use client';

import { useState, FormEvent } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

export default function ContactPage() {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
        setTimeout(() => setSubmitStatus('idle'), 6000);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { title: 'Email', value: 'studio@sqwr.be', link: 'mailto:studio@sqwr.be' },
    { title: 'Téléphone', value: '+32 493 30 27 52', link: 'tel:+32493302752' },
    { title: 'Adresse', value: 'Bruxelles, Belgique', link: null },
  ];

  const services = [
    'Communication visuelle',
    'Design graphique',
    'Création de logos',
    'Création de sites web',
    'Design de flyers',
    'Design réseaux sociaux',
    'Autre',
  ];

  const budgets = [
    'Moins de 5 000€',
    '5 000€ - 10 000€',
    '10 000€ - 25 000€',
    '25 000€ - 50 000€',
    'Plus de 50 000€',
    'À discuter',
  ];

  const inputClass =
    'w-full px-0 py-4 border-b border-secondary/20 focus:border-primary focus:outline-none transition-colors bg-transparent text-foreground font-light placeholder:text-secondary/30';

  const selectClass =
    'w-full px-0 py-4 border-b border-secondary/20 focus:border-primary focus:outline-none transition-colors bg-transparent text-foreground font-light appearance-none';

  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-16 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-8"
              >
                Contact
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-normal leading-[0.95] text-foreground mb-12"
              >
                Parlons de<br />votre projet
              </motion.h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <motion.div
              className="lg:col-start-5 lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xl text-secondary/60 leading-relaxed font-light">
                Que vous ayez un projet précis en tête ou simplement envie d'explorer les
                possibilités, nous sommes là pour vous écouter.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-6 right-6 lg:left-16 lg:right-16 h-[1px] bg-secondary/10" />
      </section>

      {/* ─── FORM + INFO ─────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

            {/* Contact Form */}
            <div className="lg:col-span-7 order-last lg:order-first">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Votre nom"
                      />
                    </div>
                    <div className="mt-8 md:mt-0">
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="mt-10">
                    <label htmlFor="company" className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-1">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 mt-10">
                    <div>
                      <label htmlFor="service" className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-1">
                        Service souhaité *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className={selectClass}
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-8 md:mt-0">
                      <label htmlFor="budget" className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-1">
                        Budget estimé
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={selectClass}
                      >
                        <option value="">Sélectionnez un budget</option>
                        {budgets.map((budget) => (
                          <option key={budget} value={budget}>
                            {budget}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-10">
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`${inputClass} resize-none`}
                      placeholder="Parlez-nous de votre projet..."
                    />
                  </div>

                  <div className="mt-12">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-10 py-4 bg-primary text-white text-sm font-mono uppercase tracking-[0.15em] hover:bg-primary/85 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="mt-6 p-6 border border-primary/20 text-sm text-foreground font-light">
                      Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les
                      plus brefs délais.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mt-6 p-6 border border-primary text-sm text-foreground font-light">
                      Une erreur s'est produite. Veuillez réessayer ou nous contacter directement
                      par email.
                    </div>
                  )}
                </form>
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-4 lg:col-start-9 order-first lg:order-last">
              <div className="lg:sticky lg:top-32 space-y-16">

                {/* Mobile quick contact */}
                <div className="lg:hidden border-t border-secondary/10 pt-8">
                  <p className="text-xs font-mono uppercase tracking-[0.3em] text-secondary/40 mb-6">
                    Contact rapide
                  </p>
                  <a
                    href="tel:+32493302752"
                    className="flex items-center justify-between py-4 border-b border-secondary/10 text-foreground active:text-primary transition-colors duration-200"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-secondary/40 block mb-1">
                        Téléphone
                      </span>
                      <span className="text-xl font-light">+32 493 30 27 52</span>
                    </div>
                    <span className="text-secondary/30 text-lg flex-shrink-0 ml-4">↗</span>
                  </a>
                  <a
                    href="mailto:studio@sqwr.be"
                    className="flex items-center justify-between pt-4 text-foreground active:text-primary transition-colors duration-200"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-secondary/40 block mb-1">
                        Email
                      </span>
                      <span className="text-lg font-light">studio@sqwr.be</span>
                    </div>
                    <span className="text-secondary/30 text-lg flex-shrink-0 ml-4">↗</span>
                  </a>
                </div>

                <ScrollReveal delay={0.2}>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-8">
                    Informations de contact
                  </p>
                  <div className="space-y-8">
                    {contactInfo.map((info) => (
                      <div key={info.title} className="pb-6 border-b border-secondary/10 last:border-0">
                        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-2">
                          {info.title}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-lg font-light text-foreground hover:text-primary transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-lg font-light text-foreground">{info.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-6">
                    Suivez-nous
                  </p>
                  <div className="flex gap-4">
                    {[
                      { label: 'IG', aria: 'Instagram' },
                      { label: 'LI', aria: 'LinkedIn' },
                      { label: 'BE', aria: 'Behance' },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        className="w-12 h-12 border border-secondary/20 flex items-center justify-center text-xs font-mono hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                        aria-label={social.aria}
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary/40 mb-4">
                    Horaires
                  </p>
                  <p className="text-secondary/60 text-sm leading-relaxed font-light">
                    Lundi – Vendredi : 9h00 – 18h00<br />
                    Samedi – Dimanche : Fermé
                  </p>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
