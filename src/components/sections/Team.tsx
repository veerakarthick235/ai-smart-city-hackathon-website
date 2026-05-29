'use client';

import { motion } from 'framer-motion';
import { TEAM_DATA } from '@/lib/constants';
import SectionHeading from '../ui/SectionHeading';
import styles from './Team.module.css';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Team() {
  return (
    <section className="section" id="team">
      <div className="container">
        <SectionHeading label="Team" title="Organizing Team" />
        
        <motion.div 
          className={styles.teamGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {TEAM_DATA.map((member, i) => (
            <motion.div key={i} className={`glass-card ${styles.teamCard}`} variants={fadeUp}>
              <div className={styles.teamAvatar}>
                {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <h4>{member.name}</h4>
              <span className="badge badge-secondary">{member.role}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
