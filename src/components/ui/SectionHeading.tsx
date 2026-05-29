'use client';

import { motion } from 'framer-motion';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  gradient?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  gradient = true,
}: SectionHeadingProps) {
  const wrapperClass = align === 'center' ? styles.wrapperCenter : styles.wrapperLeft;
  const titleClass = gradient ? styles.titleGradient : styles.title;

  return (
    <motion.div
      className={wrapperClass}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <span className={styles.label}>{label}</span>
      <h2 className={titleClass}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
}
