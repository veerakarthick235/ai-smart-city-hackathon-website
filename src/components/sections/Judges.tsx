'use client';

import { motion } from 'framer-motion';
import { Link as LinkIcon, ArrowRight } from 'lucide-react';
import { JUDGES_DATA } from '@/lib/constants';
import GradientButton from '../ui/GradientButton';
import styles from './Judges.module.css';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export default function Judges() {
  const visibleJudges = JUDGES_DATA.slice(0, 8);

  return (
    <section className={styles.judges} id="judges">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>Expert Panel</span>
          <h2 className={styles.title}>
            Meet Our <span className="gradient-text">Judges</span>
          </h2>
          <p className={styles.subtitle}>
            Industry leaders from top tech companies evaluating the future of
            smart city innovation.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {visibleJudges.map((judge) => (
            <motion.div
              key={judge.name}
              className={styles.card}
              variants={cardVariants}
            >
              <div className={styles.avatar}>{getInitials(judge.name)}</div>
              <h4 className={styles.name}>{judge.name}</h4>
              <p className={styles.judgeTitle}>{judge.title}</p>
              {judge.company && (
                <span className={styles.company}>{judge.company}</span>
              )}
              <a href={(judge as any).linkedin || '#'} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                <LinkIcon size={20} />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.viewAllWrapper}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <GradientButton
            href="/events/ai-autonomous-smart-city-hackathon-2026/judges"
            variant="secondary"
          >
            View All Judges
            <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
