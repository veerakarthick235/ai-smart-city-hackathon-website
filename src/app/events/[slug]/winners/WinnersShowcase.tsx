'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Users, Code, ExternalLink } from 'lucide-react';
import styles from './winners.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function WinnersShowcase({ eventTitle, winners }: { eventTitle: string, winners: any[] }) {
  const categoryConfig: Record<string, { label: string, icon: any, className: string }> = {
    grand: { label: 'Grand Winner', icon: Trophy, className: styles.cardGrand },
    runner: { label: 'Runner Up', icon: Medal, className: styles.cardRunner },
    second_runner: { label: 'Second Runner Up', icon: Award, className: styles.cardSecondRunner },
  };

  const getWinner = (category: string) => winners.find(w => w.category === category);

  const displayWinners = [
    getWinner('grand'),
    getWinner('runner'),
    getWinner('second_runner')
  ].filter(Boolean);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className="container section">
        <div className="section-header">
          <span className="section-label">Hall of Fame</span>
          <h1 className="gradient-text">Winners Showcase</h1>
          <p className="section-subtitle">The most innovative solutions from the {eventTitle}</p>
        </div>

        {displayWinners.length === 0 ? (
          <div className={styles.emptyState}>
            <Trophy size={64} className={styles.emptyIcon} />
            <h2>Winners will be announced soon!</h2>
            <p>Judging is currently in progress. Check back after the hackathon concludes.</p>
          </div>
        ) : (
          <motion.div 
            className={styles.winnersContainer}
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {displayWinners.map((winner: any) => {
              const config = categoryConfig[winner.category] || categoryConfig.grand;
              const Icon = config.icon;
              const members = JSON.parse(winner.members || '[]');

              return (
                <motion.div key={winner.id} className={`glass-card ${styles.winnerCard} ${config.className}`} variants={fadeUp}>
                  <div className={styles.badgeContainer}>
                    <div className={styles.categoryBadge}>
                      <Icon size={24} />
                      <span>{config.label}</span>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.mainInfo}>
                      <h2>{winner.projectName}</h2>
                      
                      <div className={styles.teamInfo}>
                        <div className={styles.teamName}>
                          <Users size={18} />
                          <span>{winner.teamName}</span>
                        </div>
                        <div className={styles.memberPills}>
                          {members.map((member: string, i: number) => (
                            <span key={i} className={styles.memberPill}>{member}</span>
                          ))}
                        </div>
                      </div>

                      <p className={styles.description}>{winner.description}</p>
                    </div>

                    <div className={styles.sideInfo}>
                      {winner.feedback && (
                        <div className={styles.feedbackQuote}>
                          <p>"{winner.feedback}"</p>
                          <span>— Judges</span>
                        </div>
                      )}

                      <div className={styles.actionButtons}>
                        {winner.github && (
                          <a href={winner.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                            <Code size={18} /> View Repository
                          </a>
                        )}
                        {winner.demoVideo && (
                          <a href={winner.demoVideo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <ExternalLink size={18} /> Watch Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
