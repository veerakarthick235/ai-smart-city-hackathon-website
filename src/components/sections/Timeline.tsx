'use client';

import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '@/lib/constants';
import SectionHeading from '../ui/SectionHeading';
import { Clock } from 'lucide-react';
import styles from './Timeline.module.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Timeline() {
  return (
    <section className="section" id="timeline" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading label="Timeline" title="Event Timeline" />
        
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {TIMELINE_DATA.map((item, i) => (
              <motion.div
                key={i}
                className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.timelineDot} />
                <div className={`glass-card ${styles.timelineCard}`}>
                  <span className={`badge ${item.status === 'completed' ? 'badge-success' : (item.status === 'active' ? 'badge-warning' : 'badge-primary')}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <h4>{item.title}</h4>
                  <p>
                    <Clock size={14} />
                    {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
