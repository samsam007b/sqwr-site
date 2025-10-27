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
    <footer className="bg-primary text-secondary py-16 lg:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">
              Créative Design
            </h3>
            <p className="text-secondary/70 text-sm leading-relaxed">
              Agence de communication visuelle et design graphique.
              Créons ensemble des expériences visuelles marquantes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 opacity-70">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-secondary/70 hover:text-secondary text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-4 opacity-70">
              Contact
            </h4>
            <p className="text-secondary/70 text-sm mb-2">
              contact@creative-design.com
            </p>
            <p className="text-secondary/70 text-sm mb-6">
              +33 1 23 45 67 89
            </p>
            <div className="flex space-x-4">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-secondary/30 flex items-center justify-center text-xs hover:bg-secondary hover:text-primary transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center text-sm text-secondary/50">
          <p>© {currentYear} Créative Design. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-secondary transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
