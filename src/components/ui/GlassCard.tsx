'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './GlassCard.module.css';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  gradient = false,
}: GlassCardProps) {
  const classes = [
    styles.card,
    gradient ? styles.gradient : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!hover) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      className={classes}
      whileHover={{
        y: -6,
        boxShadow: '0 12px 40px rgba(0, 212, 255, 0.15), 0 0 30px rgba(139, 92, 246, 0.08)',
        borderColor: 'rgba(255, 255, 255, 0.15)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
