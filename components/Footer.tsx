'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const social = [
    { href: '#', label: 'Instagram', icon: 'IG' },
    { href: '#', label: 'LinkedIn', icon: 'LI' },
    { href: '#', label: 'Behance', icon: 'BE' },
  ];

  return (
    <footer className="bg-black text-white py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="mb-6">
              <Image
                src="/Logo SQWR/sqwr-logo-white.png"
                alt="sqwr"
                width={501}
                height={243}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-white/60 text-base leading-relaxed font-light mb-8 whitespace-pre-line">
              {t('footer.tagline')}
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40">
              {t('footer.location')}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] mb-6 text-white/40">
              {t('footer.navigationTitle')}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/services"
                  className="text-white/60 hover:text-primary text-sm font-light transition-colors duration-300"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-white/60 hover:text-primary text-sm font-light transition-colors duration-300"
                >
                  {t('nav.portfolio')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/60 hover:text-primary text-sm font-light transition-colors duration-300"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/60 hover:text-primary text-sm font-light transition-colors duration-300"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] mb-6 text-white/40">
              {t('footer.contactTitle')}
            </h4>
            <a
              href="mailto:samuelbaudon@sqwr.be"
              className="text-white/60 hover:text-primary text-sm mb-2 block font-light transition-colors duration-300"
            >
              samuelbaudon@sqwr.be
            </a>
            <a
              href="tel:+32493302752"
              className="text-white/60 hover:text-primary text-sm mb-8 block font-light transition-colors duration-300"
            >
              +32 493 30 27 52
            </a>
            <div className="flex space-x-3">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="w-10 h-10 border border-white/20 rounded-lg flex items-center justify-center text-xs font-mono hover:bg-white hover:border-white hover:text-black transition-all duration-300"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-white/40 font-mono">
          <p className="tracking-wide">© {currentYear} {t('footer.copyright')}</p>
          <div className="flex flex-col md:flex-row md:space-x-8 mt-6 md:mt-0 space-y-3 md:space-y-0">
            <Link href="#" className="hover:text-white/60 transition-colors duration-300 tracking-wide">
              {t('footer.legal')}
            </Link>
            <Link href="#" className="hover:text-white/60 transition-colors duration-300 tracking-wide">
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
