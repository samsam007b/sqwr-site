'use client';

import styles from './ServicesMarquee.module.css';

const services = [
  'BRANDING',
  'WEB DESIGN',
  'E-COMMERCE',
  'STRATÉGIE DIGITALE',
  'SOCIAL MEDIA',
  'IDENTITÉ VISUELLE',
  'AI-DRIVEN',
  'SUR-MESURE',
];

export default function ServicesMarquee() {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        {/* Dupliquer pour créer l'effet de loop infini */}
        {[...services, ...services, ...services].map((service, i) => (
          <span key={i} className={styles.marqueeItem}>
            {service}
            <span className={styles.separator}>■</span>
          </span>
        ))}
      </div>
    </div>
  );
}
