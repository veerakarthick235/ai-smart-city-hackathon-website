'use client';

import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '@/lib/constants';
import SectionHeading from '../ui/SectionHeading';
import { Quote } from 'lucide-react';
import styles from './Testimonials.module.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <SectionHeading label="Testimonials" title="What People Say" />
        
        <motion.div 
          className={styles.testimonialsGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {TESTIMONIALS_DATA.map((item, i) => (
            <motion.div key={i} className={`glass-card ${styles.testimonialCard}`} variants={fadeUp}>
              <div className={styles.quoteIcon}>
                <Quote size={32} />
              </div>
              <p className={styles.quoteText}>"{item.quote}"</p>
              <div className={styles.authorInfo}>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
