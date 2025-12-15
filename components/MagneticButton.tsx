'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

const MagneticButton = ({
  children,
  href,
  onClick,
  className = '',
  strength = 0.3
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Disabled magnetic effect - keep only transition on tap
  const content = (
    <motion.div
      ref={ref}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <div onClick={onClick}>{content}</div>;
};

export default MagneticButton;
