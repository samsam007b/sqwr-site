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
    <footer className="bg-foreground text-paper py-16 lg:py-20 relative z-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-normal mb-4 text-paper">
              Créative Design
            </h3>
            <p className="text-paper/60 text-sm leading-relaxed font-sans font-light">
              Agence de communication visuelle et design graphique.
              Créons ensemble des expériences visuelles marquantes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider mb-4 text-paper/50">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-paper/60 hover:text-primary text-sm font-sans transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider mb-4 text-paper/50">
              Contact
            </h4>
            <p className="text-paper/60 text-sm mb-2 font-sans">
              contact@creative-design.com
            </p>
            <p className="text-paper/60 text-sm mb-6 font-sans">
              +33 1 23 45 67 89
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-paper/20 flex items-center justify-center text-xs font-mono hover:bg-primary hover:border-primary hover:text-paper transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center text-sm text-paper/40 font-sans">
          <p>© {currentYear} Créative Design. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-paper/60 transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-paper/60 transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
