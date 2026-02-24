'use client';

import { useState, FormEvent } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - Replace with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      title: 'Email',
      value: 'studio@sqwr.be',
      link: 'mailto:studio@sqwr.be'
    },
    {
      title: 'Téléphone',
      value: '+32 493 30 27 52',
      link: 'tel:+32493302752'
    },
    {
      title: 'Adresse',
      value: 'Bruxelles, Belgique',
      link: null
    }
  ];

  const services = [
    'Communication visuelle',
    'Design graphique',
    'Création de logos',
    'Création de sites web',
    'Design de flyers',
    'Design réseaux sociaux',
    'Autre'
  ];

  const budgets = [
    'Moins de 5 000€',
    '5 000€ - 10 000€',
    '10 000€ - 25 000€',
    '25 000€ - 50 000€',
    'Plus de 50 000€',
    'À discuter'
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-6">
              Contact
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight text-balance">
              Parlons de votre projet
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-secondary/70 max-w-3xl leading-relaxed">
              Que vous ayez un projet précis en tête ou simplement envie
              d'explorer les possibilités, nous sommes là pour vous écouter.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Form — order-last sur mobile (info de contact passe en premier) */}
            <div className="lg:col-span-7 order-last lg:order-first">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-secondary/70 mb-3">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors rounded-lg bg-paper"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-secondary/70 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors rounded-lg bg-paper"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-secondary/70 mb-3">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors rounded-lg bg-paper"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-xs font-mono uppercase tracking-wider text-secondary/70 mb-3">
                        Service souhaité *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-mono uppercase tracking-wider text-secondary/70 mb-3">
                        Budget estimé
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Sélectionnez un budget</option>
                        {budgets.map(budget => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-secondary/70 mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-secondary/20 focus:border-primary focus:outline-none transition-colors resize-none rounded-lg bg-paper"
                      placeholder="Parlez-nous de votre projet..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-foreground text-paper hover:bg-foreground/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="p-4 glass-surface border border-primary/20 text-foreground rounded-lg">
                      Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 glass-surface border border-primary text-foreground rounded-lg">
                      Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
                    </div>
                  )}
                </form>
              </ScrollReveal>
            </div>

            {/* Contact Info — order-first sur mobile (passe avant le formulaire) */}
            <div className="lg:col-span-5 order-first lg:order-last">
              <div className="lg:sticky lg:top-32 space-y-12">

                {/* Bloc contact rapide — mobile uniquement */}
                <div className="lg:hidden p-6 bg-foreground text-paper">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-paper/40 mb-5">
                    Contact rapide
                  </p>
                  <a
                    href="tel:+32493302752"
                    className="flex items-center justify-between py-3 border-b border-paper/10 text-paper active:text-primary transition-colors duration-200"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-paper/40 block mb-1">
                        T&eacute;l&eacute;phone
                      </span>
                      <span className="text-xl font-light">+32 493 30 27 52</span>
                    </div>
                    <span className="text-paper/30 text-lg flex-shrink-0 ml-4">↗</span>
                  </a>
                  <a
                    href="mailto:studio@sqwr.be"
                    className="flex items-center justify-between pt-3 text-paper active:text-primary transition-colors duration-200"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase tracking-[0.15em] text-paper/40 block mb-1">
                        Email
                      </span>
                      <span className="text-lg font-light">studio@sqwr.be</span>
                    </div>
                    <span className="text-paper/30 text-lg flex-shrink-0 ml-4">↗</span>
                  </a>
                </div>

                <ScrollReveal delay={0.2}>
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-8">
                      Informations de contact
                    </h2>

                    <div className="space-y-8">
                      {contactInfo.map((info) => (
                        <div key={info.title}>
                          <p className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-2">
                            {info.title}
                          </p>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-lg text-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-lg text-foreground whitespace-pre-line">
                              {info.value}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-secondary/60 mb-4">
                      Suivez-nous
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="w-12 h-12 border border-secondary/20 flex items-center justify-center text-sm font-mono hover:bg-primary hover:text-paper hover:border-primary transition-all duration-200 rounded-lg"
                        aria-label="Instagram"
                      >
                        IG
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 border border-secondary/20 flex items-center justify-center text-sm font-mono hover:bg-primary hover:text-paper hover:border-primary transition-all duration-200 rounded-lg"
                        aria-label="LinkedIn"
                      >
                        LI
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 border border-secondary/20 flex items-center justify-center text-sm font-mono hover:bg-primary hover:text-paper hover:border-primary transition-all duration-200 rounded-lg"
                        aria-label="Behance"
                      >
                        BE
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.6}>
                  <div className="glass-surface p-8 rounded-lg">
                    <h3 className="font-display font-bold mb-3">
                      Horaires d'ouverture
                    </h3>
                    <p className="text-secondary/70 text-sm leading-relaxed">
                      Lundi - Vendredi : 9h00 - 18h00<br />
                      Samedi - Dimanche : Fermé
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Placeholder */}
      <section className="pb-24 lg:pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-br from-tertiary/20 to-secondary/30 flex items-center justify-center rounded-lg grain-overlay">
              <p className="text-secondary/60 font-mono text-sm">[ Google Maps Embed Placeholder ]</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
