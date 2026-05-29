'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Link as LinkIcon, Award } from 'lucide-react';
import styles from './judges.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function JudgeRecognition({ eventTitle, judges }: { eventTitle: string, judges: any[] }) {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className="container section">
        <div className="section-header">
          <span className="section-label">Judges</span>
          <h1 className="gradient-text">Judge Recognition</h1>
          <p className="section-subtitle">Honoring the industry experts who evaluated the incredible submissions at the {eventTitle}</p>
        </div>

        <motion.div 
          className={styles.judgesGrid}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {judges.map((judge: any) => (
            <motion.div key={judge.id} className={`glass-card ${styles.judgeCard}`} variants={fadeUp}>
              <div className={styles.avatarContainer}>
                <div className={styles.judgeAvatar}>
                  {judge.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </div>
                <div className={styles.appreciationBadge} title="Certificate of Appreciation">
                  <Award size={16} />
                </div>
              </div>
              
              <h3 className={styles.judgeName}>{judge.name}</h3>
              <p className={styles.judgeTitle}>{judge.title}</p>
              
              {judge.company && (
                <div className={styles.companyBadge}>
                  {judge.company}
                </div>
              )}
              
              {judge.bio && (
                <p className={styles.judgeBio}>{judge.bio}</p>
              )}

              {judge.linkedin && (
                <a href={judge.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinBtn}>
                  <LinkIcon size={18} /> Connect on LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
