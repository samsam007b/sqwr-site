import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { href: '/services', label: 'Services' },
      { href: '/portfolio', label: 'Portfolio' },
      { href: '/about', label: 'À propos' },
      { href: '/contact', label: 'Contact' },
    ],
    social: [
      { href: '#', label: 'Instagram', icon: 'IG' },
      { href: '#', label: 'LinkedIn', icon: 'LI' },
      { href: '#', label: 'Behance', icon: 'BE' },
    ],
  };

  return (
    <footer className="bg-foreground text-paper py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-3xl font-display font-normal mb-6 text-paper">
              Créative Design
            </h3>
            <p className="text-paper/60 text-base leading-relaxed font-light mb-8">
              Depuis 2016, nous créons des identités visuelles
              qui connectent et transforment.
            </p>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-paper/40">
              Paris, France
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] mb-6 text-paper/40">
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/60 hover:text-primary text-sm font-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] mb-6 text-paper/40">
              Contactez-nous
            </h4>
            <a
              href="mailto:contact@creative-design.com"
              className="text-paper/60 hover:text-primary text-sm mb-2 block font-light transition-colors duration-300"
            >
              contact@creative-design.com
            </a>
            <a
              href="tel:+33123456789"
              className="text-paper/60 hover:text-primary text-sm mb-8 block font-light transition-colors duration-300"
            >
              +33 1 23 45 67 89
            </a>
            <div className="flex space-x-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-paper/20 rounded-lg flex items-center justify-center text-xs font-mono hover:bg-paper hover:border-paper hover:text-foreground transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-paper/10 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-paper/40 font-mono">
          <p className="tracking-wide">© {currentYear} Créative Design</p>
          <div className="flex flex-col md:flex-row md:space-x-8 mt-6 md:mt-0 space-y-3 md:space-y-0">
            <Link href="#" className="hover:text-paper/60 transition-colors duration-300 tracking-wide">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-paper/60 transition-colors duration-300 tracking-wide">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
