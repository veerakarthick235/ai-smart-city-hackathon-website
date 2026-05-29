'use client';

import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import { JUDGING_CRITERIA } from '@/lib/constants';
import ProgressBar from '../ui/ProgressBar';
import styles from './JudgingCriteria.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

export default function JudgingCriteria() {
  return (
    <section className={styles.criteria} id="judging">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>
            <Scale size={14} />
            Evaluation
          </span>
          <h2 className={styles.title}>
            Judging <span className="gradient-text">Criteria</span>
          </h2>
          <p className={styles.subtitle}>
            Projects are evaluated across five key dimensions by our expert
            panel of judges.
          </p>
        </motion.div>

        <motion.div
          className={styles.list}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {JUDGING_CRITERIA.map((criteria) => (
            <motion.div
              key={criteria.name}
              className={styles.criteriaCard}
              variants={itemVariants}
            >
              <div className={styles.criteriaHeader}>
                <span className={styles.criteriaName}>{criteria.name}</span>
                <span
                  className={styles.criteriaPercent}
                  style={{ color: criteria.color }}
                >
                  {criteria.percentage}%
                </span>
              </div>
              <ProgressBar
                percentage={criteria.percentage}
                color={criteria.color}
                label={criteria.name}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.totalRow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className={styles.totalLabel}>Total Score</span>
          <span className={styles.totalValue}>100%</span>
        </motion.div>
      </div>
    </section>
  );
}
