'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PortfolioGridBrutal.module.css';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  gridSize: 'small' | 'medium' | 'large';
}

interface PortfolioGridBrutalProps {
  projects: Project[];
}

export default function PortfolioGridBrutal({ projects }: PortfolioGridBrutalProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.portfolio} data-dark-bg>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Projets Sélectionnés</h2>
        <p className={styles.sectionSubtitle}>Portfolio 2024—2025</p>
      </div>

      <div className={styles.grid}>
        {projects.map((project, index) => (
          <PortfolioCard
            key={project.id}
            project={project}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}

interface PortfolioCardProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function PortfolioCard({ project, index, isHovered, onHover, onLeave }: PortfolioCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    onLeave();
  };

  return (
    <Link
      href={`/portfolio/${project.id}`}
      ref={cardRef}
      className={`${styles.card} ${styles[`card--${project.gridSize}`]}`}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-reveal
    >
      <motion.div
        className={styles.cardInner}
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Image */}
        <div className={styles.imageContainer}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={styles.image}
          />
          <div className={styles.overlay} />
        </div>

        {/* Meta Info */}
        <div className={styles.meta}>
          <span className={styles.year}>[{project.year}]</span>
          <span className={styles.category}>{project.category}</span>
        </div>

        {/* Title */}
        <h3 className={styles.title}>{project.title}</h3>

        {/* Index Number */}
        <div className={styles.indexNumber}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>
    </Link>
  );
}
