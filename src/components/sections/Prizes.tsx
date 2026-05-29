'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Check } from 'lucide-react';
import { PRIZES_DATA } from '@/lib/constants';
import styles from './Prizes.module.css';

const prizeIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Trophy,
  Medal,
  Award,
};

const tierStyles = ['Gold', 'Silver', 'Bronze'] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
    },
  }),
};

export default function Prizes() {
  /* Reorder for podium: Runner Up (index 1), Grand Winner (0), Second Runner Up (2) */
  const podiumOrder = [1, 0, 2];

  return (
    <section className={styles.prizes} id="prizes">
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
            Rewards
          </span>
          <h2 className={styles.title}>
            Prizes & <span className="gradient-text">Rewards</span>
          </h2>
          <p className={styles.subtitle}>
            Compete for exclusive prizes, certificates, and domains awarded to
            the top three teams.
          </p>
        </motion.div>

        <div className={styles.podium}>
          {podiumOrder.map((dataIndex, visualIndex) => {
            const prize = PRIZES_DATA[dataIndex];
            const tier = tierStyles[dataIndex];
            const IconComponent = prizeIconMap[prize.icon] || Trophy;
            const cardClass = styles[`card${tier}` as keyof typeof styles];
            const iconClass = styles[`icon${tier}` as keyof typeof styles];
            const rankClass = styles[`rank${tier}` as keyof typeof styles];

            return (
              <motion.div
                key={prize.title}
                className={`${styles.card} ${cardClass}`}
                custom={visualIndex}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className={`${styles.rankBadge} ${rankClass}`}>
                  {dataIndex === 0
                    ? '1st Place'
                    : dataIndex === 1
                    ? '2nd Place'
                    : '3rd Place'}
                </span>
                <div className={`${styles.iconWrapper} ${iconClass}`}>
                  <IconComponent size={32} />
                </div>
                <h3 className={styles.cardTitle}>{prize.title}</h3>
                <ul className={styles.rewardsList}>
                  {prize.rewards.map((reward) => (
                    <li key={reward} className={styles.rewardItem}>
                      <Check size={16} className={styles.rewardIcon} />
                      {reward}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
