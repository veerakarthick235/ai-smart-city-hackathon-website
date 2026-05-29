'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ScrollText } from 'lucide-react';
import { RULES_DATA } from '@/lib/constants';
import styles from './Rules.module.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const ruleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

export default function Rules() {
  return (
    <section className={styles.rules} id="rules">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>
            <ScrollText size={14} />
            Guidelines
          </span>
          <h2 className={styles.title}>
            Rules & <span className="gradient-text">Eligibility</span>
          </h2>
          <p className={styles.subtitle}>
            Please review all rules before participating to ensure your project
            qualifies for evaluation.
          </p>
        </motion.div>

        <div className={styles.card}>
          <motion.div
            className={styles.rulesList}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {RULES_DATA.map((rule, index) => (
              <motion.div
                key={index}
                className={styles.ruleItem}
                variants={ruleVariants}
              >
                <CheckCircle size={20} className={styles.checkIcon} />
                <span className={styles.ruleText}>{rule}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
