'use client';

import { motion } from 'framer-motion';
import { Car, Leaf, Zap, Heart, Shield, Building } from 'lucide-react';
import { THEMES_DATA } from '@/lib/constants';
import styles from './About.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Car,
  Leaf,
  Zap,
  Heart,
  Shield,
  Building,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function About() {
  const focusAreas = THEMES_DATA.slice(0, 6);

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>About The Event</span>
          <h2 className={styles.title}>
            Reimagining Urban Living with{' '}
            <span className="gradient-text">Artificial Intelligence</span>
          </h2>
          <p className={styles.description}>
            The AI Autonomous Smart City Hackathon 2026 brings together{' '}
            <span className={styles.descriptionHighlight}>developers, designers, and innovators</span>{' '}
            from around the world to build next-generation AI systems that make
            cities smarter, safer, and more sustainable. From autonomous traffic
            management to intelligent energy grids, participants tackle
            real-world urban challenges using cutting-edge artificial
            intelligence and IoT technologies.
          </p>
        </motion.div>

        <motion.div
          className={styles.focusGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {focusAreas.map((area) => {
            const IconComponent = iconMap[area.icon] || Car;
            return (
              <motion.div
                key={area.title}
                className={styles.focusCard}
                variants={cardVariants}
              >
                <div className={styles.iconCircle}>
                  <IconComponent size={24} />
                </div>
                <h4 className={styles.focusTitle}>{area.title}</h4>
                <p className={styles.focusDescription}>{area.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
