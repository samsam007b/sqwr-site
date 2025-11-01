'use client';

import { motion } from 'framer-motion';

const OrigamiSquare = () => {
  // Animation sequence for the origami folding effect
  const foldAnimation = {
    initial: {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    },
    animate: {
      rotateX: [0, 0, 90, 90, 0, 0, 0, 0],
      rotateY: [0, 0, 0, 0, 90, 0, 0, 0],
      rotateZ: [0, 0, 0, 0, 0, 0, 360, 0],
      transition: {
        duration: 10,
        times: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.75, 1],
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const innerSquareAnimation = {
    animate: {
      scale: [1, 0.95, 0.5, 0.5, 0.95, 1, 1, 1],
      opacity: [1, 1, 0.8, 0.8, 1, 1, 1, 1],
      transition: {
        duration: 10,
        times: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.75, 1],
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* 3D Container with perspective */}
      <div
        className="relative w-[200px] h-[200px]"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main origami square */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
          }}
          variants={foldAnimation}
          initial="initial"
          animate="animate"
        >
          {/* Front face - Black */}
          <motion.div
            className="absolute inset-0 bg-foreground"
            style={{
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
            }}
            variants={innerSquareAnimation}
            animate="animate"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-40" />
          </motion.div>

          {/* Back face - White */}
          <motion.div
            className="absolute inset-0 bg-paper border-2 border-foreground/10"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d',
            }}
            variants={innerSquareAnimation}
            animate="animate"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-20" />
          </motion.div>

          {/* Top face - Red (primary) */}
          <motion.div
            className="absolute inset-0 bg-primary"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateX(90deg)',
              transformOrigin: 'top',
              transformStyle: 'preserve-3d',
            }}
            variants={innerSquareAnimation}
            animate="animate"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-30" />
          </motion.div>

          {/* Bottom face - Gray */}
          <motion.div
            className="absolute inset-0 bg-secondary"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateX(-90deg)',
              transformOrigin: 'bottom',
              transformStyle: 'preserve-3d',
            }}
            variants={innerSquareAnimation}
            animate="animate"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-25" />
          </motion.div>

          {/* Right face - Black variant */}
          <motion.div
            className="absolute inset-0 bg-foreground/90"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(90deg)',
              transformOrigin: 'right',
              transformStyle: 'preserve-3d',
            }}
            variants={innerSquareAnimation}
            animate="animate"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-40" />
          </motion.div>

          {/* Left face - Red variant */}
          <motion.div
            className="absolute inset-0 bg-primary/80"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(-90deg)',
              transformOrigin: 'left',
              transformStyle: 'preserve-3d',
            }}
            variants={innerSquareAnimation}
            animate="animate"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 grain-overlay opacity-30" />
          </motion.div>
        </motion.div>

        {/* Subtle shadow */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[180px] h-8 bg-foreground/5 blur-xl rounded-full"
          animate={{
            scale: [1, 0.8, 0.6, 0.6, 0.8, 1, 1, 1],
            opacity: [0.3, 0.2, 0.1, 0.1, 0.2, 0.3, 0.3, 0.3],
          }}
          transition={{
            duration: 10,
            times: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.75, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Decorative text */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-[0.3em] text-secondary/40"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Origami Design
      </motion.div>
    </div>
  );
};

export default OrigamiSquare;
