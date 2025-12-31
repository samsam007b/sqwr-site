'use client';

import styles from './DemoNote.module.css';

export default function DemoNote() {
  return (
    <section className={styles.demoNote} data-dark-bg>
      <div className={styles.container}>
        <h2 className={styles.title}>Concept Expérimental</h2>
        <p className={styles.text}>
          Cette page démontre une direction artistique radicale pour SQWR Studio.
          Le concept "The Living Square" transforme le curseur carré en élément central
          de l'expérience, avec une typographie monumentale, des grilles brutales apparentes,
          et des effets 3D subtils.
        </p>
        <p className={styles.text}>
          <strong>Composants testés :</strong> Hero avec grain animé et révélation curseur,
          Marquee infini, Split-screen avec parallax inversé, Grid portfolio asymétrique avec effets 3D.
        </p>
      </div>
    </section>
  );
}
