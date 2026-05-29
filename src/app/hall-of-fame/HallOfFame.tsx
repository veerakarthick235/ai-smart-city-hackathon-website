'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Users, Code, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import styles from './halloffame.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function HallOfFame({ events }: { events: any[] }) {
  const categoryConfig: Record<string, { label: string, icon: any, className: string }> = {
    grand: { label: 'Grand Winner', icon: Trophy, className: styles.cardGrand },
    runner: { label: 'Runner Up', icon: Medal, className: styles.cardRunner },
    second_runner: { label: 'Second Runner Up', icon: Award, className: styles.cardSecondRunner },
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className="container section">
        <div className="section-header">
          <span className="section-label">Champions</span>
          <h1 className="gradient-text">Hall of Fame</h1>
          <p className="section-subtitle">Celebrating innovation across all Innovation Hacks events</p>
        </div>

        {events.length === 0 ? (
          <div className={styles.emptyState}>
            <Trophy size={64} className={styles.emptyIcon} />
            <h2>No winners yet</h2>
            <p>Our first hackathon is still underway. Check back soon!</p>
          </div>
        ) : (
          <div className={styles.eventsContainer}>
            {events.map((event) => (
              <div key={event.id} className={styles.eventSection}>
                <div className={styles.eventHeader}>
                  <h2>{event.title}</h2>
                  <Link href={`/events/${event.slug}`} className="btn btn-ghost btn-sm">
                    View Event Details
                  </Link>
                </div>
                
                <motion.div 
                  className={styles.winnersGrid}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={stagger}
                >
                  {event.winners.map((winner: any) => {
                    const config = categoryConfig[winner.category] || categoryConfig.grand;
                    const Icon = config.icon;
                    const members = JSON.parse(winner.members || '[]');

                    return (
                      <motion.div key={winner.id} className={`glass-card ${styles.winnerCard} ${config.className}`} variants={fadeUp}>
                        <div className={styles.categoryBadge}>
                          <Icon size={20} />
                          <span>{config.label}</span>
                        </div>

                        <h3>{winner.projectName}</h3>
                        
                        <div className={styles.teamInfo}>
                          <div className={styles.teamName}>
                            <Users size={16} />
                            <span>{winner.teamName}</span>
                          </div>
                          <div className={styles.memberPills}>
                            {members.map((member: string, i: number) => (
                              <span key={i} className={styles.memberPill}>{member}</span>
                            ))}
                          </div>
                        </div>

                        <p className={styles.description}>{winner.description}</p>

                        <div className={styles.actionButtons}>
                          {winner.github && (
                            <a href={winner.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                              <Code size={16} /> Code
                            </a>
                          )}
                          {winner.demoVideo && (
                            <a href={winner.demoVideo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                              <ExternalLink size={16} /> Demo
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
