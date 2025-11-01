'use client';

import { motion } from 'framer-motion';

const AnimatedGradient = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient layer - very subtle color shifts */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(224, 25, 25, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(250, 235, 215, 0.05) 0%, transparent 50%)',
            'radial-gradient(circle at 60% 60%, rgba(230, 230, 220, 0.04) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(245, 245, 240, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(240, 240, 235, 0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(224, 25, 25, 0.02) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 70%, rgba(250, 245, 235, 0.04) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(235, 235, 230, 0.03) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(224, 25, 25, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(250, 235, 215, 0.05) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Secondary layer - adds depth with slower movement */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, rgba(250, 250, 248, 0.02) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 70%, rgba(245, 245, 243, 0.025) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 30%, rgba(240, 240, 238, 0.03) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 80%, rgba(250, 250, 248, 0.025) 0%, transparent 60%)',
            'radial-gradient(ellipse at 50% 50%, rgba(250, 250, 248, 0.02) 0%, transparent 60%)',
          ],
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Subtle accent - very faint color hint */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.03, 0.05, 0.04, 0.06, 0.03],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-foreground/[0.01]" />
      </motion.div>
    </div>
  );
};

export default AnimatedGradient;
