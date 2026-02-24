'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-paper py-20 lg:py-28 relative z-10" data-dark-bg>
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        {/* Top — Large brand statement */}
        <div className="mb-20 lg:mb-28">
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-paper/90 max-w-3xl">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Middle — Two columns: nav + contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* Navigation */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-paper/30 mb-6">
              {t('footer.navigationTitle')}
            </p>
            <nav className="flex flex-col space-y-3">
              {[
                { href: '/services', label: t('nav.services') },
                { href: '/portfolio', label: t('nav.portfolio') },
                { href: '/about', label: t('nav.about') },
                { href: '/contact', label: t('nav.contact') },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-paper/50 hover:text-paper text-sm font-light transition-colors duration-500 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-paper/30 mb-6">
              {t('footer.contactTitle')}
            </p>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:studio@sqwr.be"
                className="text-paper/50 hover:text-paper text-sm font-light transition-colors duration-500 w-fit"
              >
                studio@sqwr.be
              </a>
              <a
                href="tel:+32493302752"
                className="text-paper/50 hover:text-paper text-sm font-light transition-colors duration-500 w-fit"
              >
                +32 493 30 27 52
              </a>
              <p className="text-paper/30 text-xs font-mono uppercase tracking-[0.15em] mt-4">
                {t('footer.location')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom — Copyright + Logo */}
        <div className="pt-10 border-t border-paper/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-xs font-mono text-paper/25 tracking-wide">
            &copy; {currentYear} {t('footer.copyright')}
          </p>
          <Image
            src="/Logo SQWR/sqwr-logo-white.png"
            alt="sqwr"
            width={501}
            height={243}
            className="h-6 w-auto opacity-20"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
