'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, ArrowRight } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import styles from './Winners.module.css';

const winnersPlaceholder = [
  {
    category: 'Grand Winner',
    icon: Trophy,
    tier: 'Gold' as const,
    label: 'Results Coming Soon',
  },
  {
    category: 'Runner Up',
    icon: Medal,
    tier: 'Silver' as const,
    label: 'Results Coming Soon',
  },
  {
    category: 'Second Runner Up',
    icon: Award,
    tier: 'Bronze' as const,
    label: 'Results Coming Soon',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55 },
  },
};

export default function Winners() {
  const [dbWinners, setDbWinners] = useState<any[]>([]);

  useEffect(() => {
    async function fetchWinners() {
      try {
        const res = await fetch('/api/winners');
        if (res.ok) {
          const data = await res.json();
          setDbWinners(data.slice(0, 3)); // show top 3
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchWinners();
  }, []);

  const displayWinners = dbWinners.length > 0 ? dbWinners.map((w, index) => {
    const tiers = ['Gold', 'Silver', 'Bronze'];
    const icons = [Trophy, Medal, Award];
    return {
      category: w.category || 'Winner',
      icon: icons[index] || Trophy,
      tier: tiers[index] || 'Bronze',
      label: w.projectName || 'TBD',
      teamName: w.teamName || 'Results Coming Soon',
    };
  }) : winnersPlaceholder;

  return (
    <section className={styles.winners} id="winners">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>
            <Trophy size={14} />
            Hall of Fame
          </span>
          <h2 className={styles.title}>
            Winners <span className="gradient-text">Showcase</span>
          </h2>
          <p className={styles.subtitle}>
            Celebrating the brilliant teams who built the most impactful smart
            city solutions.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {displayWinners.map((winner, idx) => {
            const IconComponent = winner.icon;
            const trophyClass =
              styles[`trophy${winner.tier}` as keyof typeof styles];
            const badgeClass =
              styles[`badge${winner.tier}` as keyof typeof styles];

            return (
              <motion.div
                key={winner.category + idx}
                className={styles.card}
                variants={cardVariants}
              >
                <div className={styles.cardContent}>
                  <div className={`${styles.trophyCircle} ${trophyClass}`}>
                    <IconComponent size={36} />
                  </div>
                  <span className={`${styles.categoryBadge} ${badgeClass}`}>
                    {winner.category}
                  </span>
                  <h3 className={styles.cardTitle}>{winner.label}</h3>
                  <p className={styles.comingSoon}>
                   {winner.label}
                 </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className={styles.ctaWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <GradientButton href="/hall-of-fame" variant="secondary">
            View Hall of Fame
            <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
