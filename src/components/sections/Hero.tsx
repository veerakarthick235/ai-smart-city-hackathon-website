'use client';

import { motion } from 'framer-motion';
import { Calendar, Globe, Users, Award, Trophy, Sparkles } from 'lucide-react';
import { STATS_DATA } from '@/lib/constants';
import AnimatedCounter from '../ui/AnimatedCounter';
import SmartCitySkyline from '../ui/SmartCitySkyline';
import GradientButton from '../ui/GradientButton';
import styles from './Hero.module.css';

const statIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users,
  Award,
  Trophy,
  Globe,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBackground} />

      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.badge} variants={itemVariants}>
          <span className={styles.badgeDot} />
          <Sparkles size={14} />
          Organized by Innovation Hacks
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          AI Autonomous Smart City Hackathon 2026
        </motion.h1>

        <motion.p className={styles.subtitle} variants={itemVariants}>
          Build AI systems that enable cities to think, adapt, and operate
          autonomously in real time.
        </motion.p>

        <motion.div className={styles.eventMeta} variants={itemVariants}>
          <span className={styles.metaItem}>
            <Calendar size={16} className={styles.metaIcon} />
            April 30 – May 4, 2026
          </span>
          <span className={styles.metaDivider} />
          <span className={styles.metaItem}>
            <Globe size={16} className={styles.metaIcon} />
            Global Online Event
          </span>
        </motion.div>

        <motion.div
          className={styles.statsGrid}
          variants={containerVariants}
        >
          {STATS_DATA.map((stat) => {
            const IconComponent = statIconMap[stat.icon] || Users;
            return (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                variants={statVariants}
              >
                <IconComponent size={20} className={styles.statIcon} />
                <span className={styles.statValue}>
                  <AnimatedCounter end={stat.value as number} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className={styles.ctaGroup} variants={itemVariants}>
          <GradientButton href="#winners" variant="primary" size="lg" icon={<Trophy size={18} />}>
            View Winners
          </GradientButton>
          <GradientButton href="#themes" variant="secondary" size="lg">
            Explore Projects
          </GradientButton>
          <GradientButton href="#contact" variant="ghost" size="lg">
            Join Community
          </GradientButton>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        Scroll
        <span className={styles.scrollLine} />
      </motion.div>

      <div className={styles.skylineWrapper}>
        <SmartCitySkyline />
      </div>
    </section>
  );
}
