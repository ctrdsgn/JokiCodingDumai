'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
}

const directionOffsets = {
  up: { y: 1 },
  down: { y: -1 },
  left: { x: 1 },
  right: { x: -1 },
  none: { y: 0, x: 0 },
};

export function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  threshold = 0.1,
  className = '',
}: FadeInProps) {
  const offset = directionOffsets[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 'x' in offset ? (offset as { x: number }).x * distance : 0,
        y: 'y' in offset ? (offset as { y: number }).y * distance : 0,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: threshold,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
