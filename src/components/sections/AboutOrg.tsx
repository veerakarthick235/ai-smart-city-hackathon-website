'use client';

import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { Lightbulb, Users, TrendingUp } from 'lucide-react';
import styles from './AboutOrg.module.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutOrg() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We believe in pushing boundaries and solving complex problems with cutting-edge technology.'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connecting brilliant minds across borders to foster collaboration and shared learning.'
    },
    {
      icon: TrendingUp,
      title: 'Real-World Impact',
      description: 'Focusing on actionable solutions that can be implemented to improve urban living.'
    }
  ];

  return (
    <section className="section" id="about-org">
      <div className="container">
        <SectionHeading label="The Organization" title="About Innovation Hacks" />
        
        <div className={styles.aboutOrgContent}>
          <motion.div 
            className={`glass-card ${styles.missionCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Our Mission</h3>
            <p>
              Empowering the next generation of innovators through competitive hackathons. 
              We build a world where technology solves humanity's greatest challenges.
            </p>
          </motion.div>

          <motion.div 
            className={styles.valuesGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {values.map((val, i) => (
              <motion.div key={i} className={`glass-card ${styles.valueCard}`} variants={fadeUp}>
                <div className={styles.valueIcon}>
                  <val.icon size={28} />
                </div>
                <h4>{val.title}</h4>
                <p>{val.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
