# SQWR Studio — Refonte Premium Radicale
## Direction Artistique Expérimentale 2025

> **Vision**: Transformer SQWR en une expérience digitale brutaliste-luxe qui fait du curseur carré le héros de la navigation, avec une grille vivante et une typographie monumentale.

---

## 🎯 Concept Core : "The Living Square"

Le carré n'est plus seulement un curseur — c'est l'ADN de SQWR. Tout le site est construit autour de la géométrie carrée vivante, réactive, expérimentale.

### Principes Radicaux

1. **Brutalisme Numérique Luxe** — Grilles apparentes, typographie massive, asymétrie contrôlée
2. **Cursor-First Design** — Le curseur carré comme outil d'interaction principal, pas décoration
3. **Typographie Monumentale** — Textes géants qui cassent la grille, overlap intentionnels
4. **3D Subtil mais Présent** — Depth via parallax, perspective, et layering
5. **Grain Vivant** — La texture papier devient animée et réactive
6. **Split-Screen Narratif** — Écrans divisés pour créer des tensions visuelles
7. **Scroll Horizontal + Vertical** — Navigation multi-directionnelle sur certaines sections

---

## 🎨 Système Visuel

### Palette Radicale

```css
:root {
  /* Core SQWR */
  --sqwr-black: #0A0A0A;
  --sqwr-white: #FAFAF8;
  --sqwr-red: #E01919;

  /* Nouveaux ajouts premium */
  --sqwr-gray-brutal: #2A2A2A;
  --sqwr-gray-ghost: #F5F5F5;
  --sqwr-shadow-deep: rgba(10, 10, 10, 0.95);

  /* Overlay effects */
  --overlay-glass: rgba(250, 250, 248, 0.05);
  --overlay-dark-glass: rgba(10, 10, 10, 0.8);
}
```

### Typographie Monumentale

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

:root {
  /* Typographie principale */
  --font-display: 'Space Grotesk', sans-serif; /* Géométrique, moderne, audacieux */
  --font-mono: 'JetBrains Mono', monospace; /* Code-like pour labels */
  --font-sans: -apple-system, BlinkMacSystemFont, sans-serif; /* Body */

  /* Scale radicale */
  --text-xs: 0.625rem;      /* 10px - micro labels */
  --text-sm: 0.875rem;      /* 14px - body small */
  --text-base: 1.125rem;    /* 18px - body */
  --text-lg: 1.5rem;        /* 24px - intro */
  --text-xl: 2rem;          /* 32px - subtitle */
  --text-2xl: 3rem;         /* 48px - title */
  --text-3xl: 4.5rem;       /* 72px - hero */
  --text-4xl: 6rem;         /* 96px - statement */
  --text-brutal: clamp(4rem, 15vw, 12rem); /* 64-192px - BRUTAL */
}
```

### Grid System Brutal

```css
/* Grid visible, agressive */
.brutal-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.03;

  background-image:
    repeating-linear-gradient(0deg, var(--sqwr-black) 0px, var(--sqwr-black) 1px, transparent 1px, transparent 40px),
    repeating-linear-gradient(90deg, var(--sqwr-black) 0px, var(--sqwr-black) 1px, transparent 1px, transparent 40px);

  transition: opacity 0.4s ease;
}

/* Grid devient visible au hover sur certaines zones */
.brutal-grid.active {
  opacity: 0.08;
}
```

---

## 🔥 Composants Innovants

### 1. Hero Full-Bleed Brutal

**Concept**: Texte géant qui casse la grille + vidéo en background avec grain animé + curseur qui révèle des zones

```typescript
// components/HeroBrutal.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroBrutalProps {
  title: string;
  videoSrc: string;
  subtitle?: string;
}

export default function HeroBrutal({ title, videoSrc, subtitle }: HeroBrutalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Parallax sur le titre
  const titleY = useTransform(scrollY, [0, 500], [0, 150]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Grain animé
  const [grainOffset, setGrainOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGrainOffset(Math.random() * 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero-brutal" ref={containerRef}>
      {/* Video Background avec overlay */}
      <div className="hero-brutal__video-container">
        <video autoPlay muted loop playsInline className="hero-brutal__video">
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Overlay avec grain animé */}
        <div
          className="hero-brutal__grain"
          style={{
            backgroundPosition: `${grainOffset}% ${grainOffset}%`
          }}
        />

        {/* Dark overlay qui s'éclaircit autour du curseur */}
        <div
          className="hero-brutal__cursor-reveal"
          style={{
            background: `radial-gradient(circle 200px at ${cursorPos.x}px ${cursorPos.y}px, rgba(10,10,10,0.3), rgba(10,10,10,0.85))`
          }}
        />
      </div>

      {/* Titre BRUTAL qui casse tout */}
      <motion.div
        className="hero-brutal__content"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <h1 className="hero-brutal__title">
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h1>

        {subtitle && (
          <motion.p
            className="hero-brutal__subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Grid indicator */}
        <div className="hero-brutal__grid-indicator">
          <span className="hero-brutal__coords">
            [{Math.floor(cursorPos.x)}, {Math.floor(cursorPos.y)}]
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator géométrique */}
      <div className="hero-brutal__scroll">
        <div className="hero-brutal__scroll-square" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
```

```css
/* components/HeroBrutal.module.css */
.hero-brutal {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--sqwr-black);
}

.hero-brutal__video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-brutal__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.6;
}

.hero-brutal__grain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.15;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.hero-brutal__cursor-reveal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: background 0.1s ease-out;
}

.hero-brutal__content {
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 8vw;
  color: var(--sqwr-white);
}

.hero-brutal__title {
  font-family: var(--font-display);
  font-size: var(--text-brutal);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  margin: 0;

  /* Text avec outline */
  -webkit-text-stroke: 2px var(--sqwr-white);
  -webkit-text-fill-color: transparent;

  /* Break la grille intentionnellement */
  margin-left: -0.05em;
}

.hero-brutal__subtitle {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-top: 2rem;
  opacity: 0.7;
}

.hero-brutal__grid-indicator {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  opacity: 0.5;
}

.hero-brutal__scroll {
  position: absolute;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.2em;
  opacity: 0.6;
  animation: bounce-brutal 2s infinite;
}

.hero-brutal__scroll-square {
  width: 16px;
  height: 16px;
  background: var(--sqwr-white);
  animation: rotate-square 3s linear infinite;
}

@keyframes bounce-brutal {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-15px); }
}

@keyframes rotate-square {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

---

### 2. Cursor System Advanced

**Concept**: Le curseur carré devient un vrai outil — il peut agrandir, révéler du contenu, créer des zones interactives

```typescript
// components/CursorAdvanced.tsx
'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

type CursorMode = 'default' | 'reveal' | 'magnify' | 'drag' | 'text';

export default function CursorAdvanced() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<CursorMode>('default');
  const [isPressed, setIsPressed] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Détecte le type d'élément sous le curseur
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (!element) return;

      if (element.hasAttribute('data-cursor-reveal')) setMode('reveal');
      else if (element.hasAttribute('data-cursor-magnify')) setMode('magnify');
      else if (element.hasAttribute('data-cursor-drag')) setMode('drag');
      else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') setMode('text');
      else setMode('default');
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const getCursorSize = () => {
    switch (mode) {
      case 'reveal': return 120;
      case 'magnify': return 80;
      case 'drag': return 24;
      case 'text': return 2;
      default: return 16;
    }
  };

  const size = getCursorSize();

  return (
    <motion.div
      ref={cursorRef}
      className={`cursor-advanced cursor-advanced--${mode}`}
      animate={{
        x: position.x - size / 2,
        y: position.y - size / 2,
        width: size,
        height: size,
        scale: isPressed ? 0.8 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      {mode === 'reveal' && (
        <div className="cursor-advanced__reveal-circle" />
      )}
      {mode === 'magnify' && (
        <div className="cursor-advanced__magnify-ring" />
      )}
    </motion.div>
  );
}
```

```css
/* components/CursorAdvanced.module.css */
.cursor-advanced {
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
}

.cursor-advanced--default,
.cursor-advanced--drag {
  background: var(--sqwr-white);
}

.cursor-advanced--reveal {
  background: transparent;
  border: 2px solid var(--sqwr-white);
  backdrop-filter: blur(0px);
}

.cursor-advanced--magnify {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--sqwr-white);
  backdrop-filter: blur(2px);
}

.cursor-advanced--text {
  background: var(--sqwr-red);
}

.cursor-advanced__reveal-circle {
  position: absolute;
  inset: -50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  animation: pulse-reveal 2s infinite;
}

@keyframes pulse-reveal {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.2; }
}
```

---

### 3. Split Screen Narratif

**Concept**: Sections divisées qui créent des tensions visuelles — texte vs image, noir vs blanc

```typescript
// components/SplitScreenNarrative.tsx
'use client';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface SplitScreenProps {
  leftContent: {
    title: string;
    description: string;
    image?: string;
    background?: 'black' | 'white';
  };
  rightContent: {
    title: string;
    description: string;
    image?: string;
    background?: 'black' | 'white';
  };
}

export default function SplitScreenNarrative({ leftContent, rightContent }: SplitScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section className="split-narrative" ref={containerRef}>
      {/* Left Side */}
      <motion.div
        className={`split-narrative__side split-narrative__side--${leftContent.background || 'black'}`}
        style={{ y: leftY }}
      >
        {leftContent.image && (
          <div className="split-narrative__image-container">
            <img src={leftContent.image} alt={leftContent.title} />
          </div>
        )}
        <div className="split-narrative__content">
          <h2 className="split-narrative__title">{leftContent.title}</h2>
          <p className="split-narrative__description">{leftContent.description}</p>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className={`split-narrative__side split-narrative__side--${rightContent.background || 'white'}`}
        style={{ y: rightY }}
      >
        {rightContent.image && (
          <div className="split-narrative__image-container">
            <img src={rightContent.image} alt={rightContent.title} />
          </div>
        )}
        <div className="split-narrative__content">
          <h2 className="split-narrative__title">{rightContent.title}</h2>
          <p className="split-narrative__description">{rightContent.description}</p>
        </div>
      </motion.div>

      {/* Divider Line */}
      <div className="split-narrative__divider" />
    </section>
  );
}
```

```css
/* components/SplitScreenNarrative.module.css */
.split-narrative {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
}

.split-narrative__side {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8vw;
}

.split-narrative__side--black {
  background: var(--sqwr-black);
  color: var(--sqwr-white);
}

.split-narrative__side--white {
  background: var(--sqwr-white);
  color: var(--sqwr-black);
}

.split-narrative__image-container {
  position: absolute;
  inset: 0;
  opacity: 0.2;
  mix-blend-mode: overlay;
}

.split-narrative__image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.split-narrative__content {
  position: relative;
  z-index: 1;
}

.split-narrative__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
}

.split-narrative__description {
  font-size: var(--text-lg);
  line-height: 1.6;
  max-width: 500px;
}

.split-narrative__divider {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--sqwr-red);
  transform: translateX(-50%);
}

@media (max-width: 1024px) {
  .split-narrative {
    grid-template-columns: 1fr;
  }

  .split-narrative__divider {
    left: 0;
    right: 0;
    top: 50%;
    bottom: auto;
    width: 100%;
    height: 2px;
  }
}
```

---

### 4. Portfolio Grid Brutal 3D

**Concept**: Grid asymétrique avec vraie perspective 3D au hover + magnétisme du curseur

```typescript
// components/PortfolioGridBrutal.tsx
'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  gridSize: 'small' | 'medium' | 'large'; // Asymétrie
}

interface PortfolioGridProps {
  projects: Project[];
}

export default function PortfolioGridBrutal({ projects }: PortfolioGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="portfolio-brutal">
      <div className="portfolio-brutal__grid">
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

function PortfolioCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
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
      className={`portfolio-card portfolio-card--${project.gridSize}`}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-reveal
    >
      <motion.div
        className="portfolio-card__inner"
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Image */}
        <div className="portfolio-card__image-container">
          <img src={project.image} alt={project.title} className="portfolio-card__image" />
          <div className="portfolio-card__overlay" />
        </div>

        {/* Meta Info */}
        <div className="portfolio-card__meta">
          <span className="portfolio-card__year">[{project.year}]</span>
          <span className="portfolio-card__category">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="portfolio-card__title">{project.title}</h3>

        {/* Index Number */}
        <div className="portfolio-card__index">
          {String(index + 1).padStart(2, '0')}
        </div>
      </motion.div>
    </Link>
  );
}
```

```css
/* components/PortfolioGridBrutal.module.css */
.portfolio-brutal {
  padding: 8vw;
  background: var(--sqwr-black);
}

.portfolio-brutal__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.portfolio-card {
  position: relative;
  perspective: 1000px;
  cursor: none; /* On utilise le custom cursor */
}

.portfolio-card--small {
  grid-column: span 4;
  aspect-ratio: 1/1;
}

.portfolio-card--medium {
  grid-column: span 6;
  aspect-ratio: 4/3;
}

.portfolio-card--large {
  grid-column: span 8;
  aspect-ratio: 16/9;
}

.portfolio-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: box-shadow 0.4s ease;
}

.portfolio-card:hover .portfolio-card__inner {
  box-shadow:
    0 20px 60px rgba(233, 25, 25, 0.3),
    0 0 0 2px var(--sqwr-red);
}

.portfolio-card__image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--sqwr-gray-brutal);
}

.portfolio-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-card:hover .portfolio-card__image {
  transform: scale(1.1);
}

.portfolio-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.9), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.portfolio-card:hover .portfolio-card__overlay {
  opacity: 1;
}

.portfolio-card__meta {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  color: var(--sqwr-white);
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.4s ease;
}

.portfolio-card:hover .portfolio-card__meta {
  opacity: 1;
  transform: translateY(0);
}

.portfolio-card__title {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--sqwr-white);
  line-height: 1.2;
  transform: translateY(10px);
  opacity: 0;
  transition: all 0.4s ease 0.1s;
}

.portfolio-card:hover .portfolio-card__title {
  opacity: 1;
  transform: translateY(0);
}

.portfolio-card__index {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--sqwr-red);
  opacity: 0.1;
  line-height: 1;
}

@media (max-width: 1024px) {
  .portfolio-card--small,
  .portfolio-card--medium,
  .portfolio-card--large {
    grid-column: span 12;
  }
}
```

---

## 📐 Architecture de Page Exemple

### Homepage Radical

```typescript
// app/page.tsx
import HeroBrutal from '@/components/HeroBrutal';
import SplitScreenNarrative from '@/components/SplitScreenNarrative';
import PortfolioGridBrutal from '@/components/PortfolioGridBrutal';
import ServicesMarquee from '@/components/ServicesMarquee';
import ContactBrutal from '@/components/ContactBrutal';

export default function HomePage() {
  return (
    <>
      {/* Hero Full Screen Brutal */}
      <HeroBrutal
        title="SQWR"
        subtitle="Studio Bruxellois · AI-Driven Design"
        videoSrc="/videos/hero-grain.mp4"
      />

      {/* Marquee de services en scroll infini */}
      <ServicesMarquee />

      {/* Split Screen : Philosophie vs Approche */}
      <SplitScreenNarrative
        leftContent={{
          title: "Démocratiser le Design Premium",
          description: "L'AI nous libère des tâches répétitives pour se concentrer sur l'essentiel : la Création pure.",
          background: "black"
        }}
        rightContent={{
          title: "Studio Familial, Qualité Agence",
          description: "Samuel (Stratégie), Jean-Pierre (Design), Joakim (Direction Artistique). Trois générations, une vision.",
          background: "white"
        }}
      />

      {/* Portfolio Grid Asymétrique */}
      <PortfolioGridBrutal projects={featuredProjects} />

      {/* Contact avec effet révélation au curseur */}
      <ContactBrutal />
    </>
  );
}
```

---

## 🎬 Animations Premium

### Marquee Infinie

```typescript
// components/ServicesMarquee.tsx
'use client';

const services = [
  'BRANDING',
  'WEB DESIGN',
  'E-COMMERCE',
  'STRATÉGIE DIGITALE',
  'SOCIAL MEDIA',
  'IDENTITÉ VISUELLE',
];

export default function ServicesMarquee() {
  return (
    <div className="services-marquee">
      <div className="services-marquee__track">
        {[...services, ...services].map((service, i) => (
          <span key={i} className="services-marquee__item">
            {service}
            <span className="services-marquee__separator">■</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

```css
.services-marquee {
  background: var(--sqwr-red);
  color: var(--sqwr-white);
  padding: 2rem 0;
  overflow: hidden;
  border-top: 2px solid var(--sqwr-black);
  border-bottom: 2px solid var(--sqwr-black);
}

.services-marquee__track {
  display: flex;
  gap: 4rem;
  animation: marquee 30s linear infinite;
  width: fit-content;
}

.services-marquee__item {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: 0.05em;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.services-marquee__separator {
  font-size: var(--text-sm);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 🔧 Intégration avec SQWR Existant

### Migration Progressive

**Phase 1 : Setup**
1. Installer les nouvelles dépendances
2. Ajouter le nouveau système de variables CSS
3. Intégrer `CursorAdvanced` en parallèle du curseur existant

**Phase 2 : Composants**
1. Créer la page `/experimental` avec les nouveaux composants
2. Test A/B sur une section (ex: nouveau Hero sur la homepage)
3. Garder l'ancien design accessible via toggle

**Phase 3 : Rollout**
1. Migrer progressivement les pages
2. Conserver les couleurs SQWR (noir/blanc/rouge)
3. Garder le grain papier comme signature

### Compatibilité

```typescript
// Wrapper pour garder l'ancien et le nouveau
export default function LayoutWrapper({ children, useExperimental = false }) {
  if (useExperimental) {
    return (
      <>
        <CursorAdvanced />
        <div className="brutal-grid" />
        {children}
      </>
    );
  }

  return (
    <>
      <CursorManager />
      <CustomCursorTrail />
      {children}
    </>
  );
}
```

---

## 📊 Comparatif Avant/Après

| Aspect | Actuel | Nouveau Brutal |
|--------|--------|----------------|
| **Hero** | Texte centré, fond uni | Vidéo + texte outline géant + grain animé |
| **Navigation** | Classique hover | Fixed avec glassmorphism |
| **Portfolio** | Grid régulière | Grid asymétrique + 3D hover |
| **Curseur** | Carré simple | Multi-modes (reveal, magnify, drag) |
| **Typographie** | Moderne épurée | Monumentale brutale (Space Grotesk) |
| **Animations** | Subtiles | Agressives mais contrôlées |
| **Layout** | Traditionnel | Split-screen + scroll multi-directionnel |
| **Grain** | Statique | Animé et réactif |

---

## 🚀 Prochaines Étapes

1. **Créer page `/experimental`** avec Hero Brutal
2. **Implémenter CursorAdvanced** en test
3. **Designer 2-3 projets portfolio** avec le nouveau grid
4. **Prototype vidéo** du hero avec grain animé
5. **User testing** avec 5-10 personnes pour valider la radicalité

---

**Cette direction n'est pas un simple redesign — c'est une refonte conceptuelle qui transforme SQWR en manifeste visuel du design numérique contemporain.**

Le risque est assumé, l'audace est contrôlée, l'identité SQWR est amplifiée.
