'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const NAV = [
    { href: '/services',  label: t('nav.services'),  num: '01' },
    { href: '/portfolio', label: t('nav.portfolio'), num: '02' },
    { href: '/about',     label: t('nav.about'),     num: '03' },
    { href: '/contact',   label: t('nav.contact'),   num: '04' },
  ];

  return (
    <footer className="bg-foreground text-paper relative z-10 overflow-hidden" data-dark-bg>

      {/* ── Red accent — mirrors about dark section ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/60" />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* ── Nav + contact sur une ligne ── */}
        <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-8 py-12 lg:py-16 border-b border-paper/10">

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-x-8 md:gap-x-12 gap-y-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-baseline gap-2 text-paper/40 hover:text-paper transition-colors duration-300"
              >
                <span className="text-[10px] font-mono tracking-[0.15em] text-paper/20 group-hover:text-primary transition-colors duration-300">
                  {item.num}
                </span>
                <span className="text-sm font-light">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Contact — desktop inline, mobile en dessous */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <a
              href="mailto:studio@sqwr.be"
              className="text-paper/35 hover:text-paper text-sm font-light transition-colors duration-300"
            >
              studio@sqwr.be
            </a>
            <span className="hidden sm:block text-paper/15 text-xs select-none">&mdash;</span>
            <a
              href="tel:+32493302752"
              className="text-paper/35 hover:text-paper text-sm font-light transition-colors duration-300"
            >
              +32 493 30 27 52
            </a>
          </div>
        </div>

      </div>

      {/* ── Logo géant — décoratif ── */}
      <div
        className="w-full select-none pointer-events-none px-4 lg:px-10 pt-6 pb-0"
        aria-hidden="true"
        style={{ opacity: 0.055 }}
      >
        <div
          className="relative w-full"
          style={{ height: 'clamp(4rem, 23.5vw, 22rem)' }}
        >
          <Image
            src="/Logo SQWR/sqwr-logo-white.png"
            alt=""
            fill
            className="object-contain object-left"
            sizes="100vw"
          />
        </div>
      </div>

      {/* ── Strip copyright ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pb-7 flex flex-wrap items-center justify-between gap-4">
        <span className="text-[11px] font-mono text-paper/20 tracking-[0.08em]">
          &copy; {year} sqwr.
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/mentions-legales"
            className="text-[11px] font-mono text-paper/15 hover:text-paper/35 uppercase tracking-[0.15em] transition-colors duration-300"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-confidentialite"
            className="text-[11px] font-mono text-paper/15 hover:text-paper/35 uppercase tracking-[0.15em] transition-colors duration-300"
          >
            Confidentialité
          </Link>
          <span className="text-[11px] font-mono text-paper/15 uppercase tracking-[0.2em]">
            Bruxelles &middot; Belgique
          </span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
