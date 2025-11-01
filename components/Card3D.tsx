'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsTouchDevice } from '@/hooks/useIsMobile';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const Card3D = ({
  children,
  className = '',
  intensity = 10
}: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const isTouch = useIsTouchDevice();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !ref.current) return; // Disable on touch devices

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -intensity;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * intensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // On touch devices, just render without 3D effects
  if (isTouch) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
      style={{
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Card3D;
