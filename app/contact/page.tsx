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
      value: 'contact@creative-design.com',
      link: 'mailto:contact@creative-design.com'
    },
    {
      title: 'Téléphone',
      value: '+33 1 23 45 67 89',
      link: 'tel:+33123456789'
    },
    {
      title: 'Adresse',
      value: '12 Rue du Design\n75001 Paris, France',
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
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-6">
              Contact
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight text-balance">
              Parlons de votre projet
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
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
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-700 mb-3">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-700 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm uppercase tracking-wider text-gray-700 mb-3">
                      Entreprise
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-sm uppercase tracking-wider text-gray-700 mb-3">
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
                      <label htmlFor="budget" className="block text-sm uppercase tracking-wider text-gray-700 mb-3">
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
                    <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Parlez-nous de votre projet..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-10 py-4 bg-primary text-secondary hover:bg-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-800">
                      Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-800">
                      Une erreur s'est produite. Veuillez réessayer ou nous contacter directement par email.
                    </div>
                  )}
                </form>
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-12">
                <ScrollReveal delay={0.2}>
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-8">
                      Informations de contact
                    </h2>

                    <div className="space-y-8">
                      {contactInfo.map((info) => (
                        <div key={info.title}>
                          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
                            {info.title}
                          </p>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-lg text-gray-900 hover:opacity-70 transition-opacity"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-lg text-gray-900 whitespace-pre-line">
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
                    <h3 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
                      Suivez-nous
                    </h3>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="w-12 h-12 border border-gray-300 flex items-center justify-center text-sm hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-200"
                        aria-label="Instagram"
                      >
                        IG
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 border border-gray-300 flex items-center justify-center text-sm hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-200"
                        aria-label="LinkedIn"
                      >
                        LI
                      </a>
                      <a
                        href="#"
                        className="w-12 h-12 border border-gray-300 flex items-center justify-center text-sm hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-200"
                        aria-label="Behance"
                      >
                        BE
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.6}>
                  <div className="bg-gray-50 p-8">
                    <h3 className="font-display font-bold mb-3">
                      Horaires d'ouverture
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
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
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <p className="text-gray-500">[ Google Maps Embed Placeholder ]</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
