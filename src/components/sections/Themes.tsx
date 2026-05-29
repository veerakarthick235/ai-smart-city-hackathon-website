'use client';

import { motion } from 'framer-motion';
import { Car, Leaf, Zap, Heart, Shield, Building, Wifi, Eye, Sparkles, Bot } from 'lucide-react';
import { THEMES_DATA } from '@/lib/constants';
import styles from './Themes.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Car,
  Leaf,
  Zap,
  Heart,
  Shield,
  Building,
  Wifi,
  Eye,
  Sparkles,
  Bot,
};

const colorCycle = ['Cyan', 'Purple', 'Green', 'Pink', 'Yellow'] as const;

function getColorClass(index: number) {
  return colorCycle[index % colorCycle.length];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export default function Themes() {
  return (
    <section className={styles.themes} id="themes">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Challenge Tracks</span>
          <h2 className={styles.title}>
            Hackathon <span className="gradient-text">Themes</span>
          </h2>
          <p className={styles.subtitle}>
            Explore 10 cutting-edge challenge tracks spanning AI, IoT, and
            autonomous systems for smarter cities.
          </p>
        </motion.div>

        <motion.div
          className={styles.bentoGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {THEMES_DATA.map((theme, index) => {
            const IconComponent = iconMap[theme.icon] || Sparkles;
            const color = getColorClass(index);
            const glowClass = styles[`cardGlow${color}` as keyof typeof styles];
            const iconColorClass = styles[`icon${color}` as keyof typeof styles];

            return (
              <motion.div
                key={theme.title}
                className={`${styles.card} ${glowClass}`}
                variants={cardVariants}
              >
                <div className={styles.cardContent}>
                  <div className={`${styles.iconCircle} ${iconColorClass}`}>
                    <IconComponent size={22} />
                  </div>
                  <h4 className={styles.cardTitle}>{theme.title}</h4>
                  <p className={styles.cardDescription}>{theme.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
