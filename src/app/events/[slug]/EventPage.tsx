'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import ProgressBar from '@/components/ui/ProgressBar';
import { motion } from 'framer-motion';
import {
  Trophy, Medal, Award, CheckCircle, Calendar, MapPin,
  Code, ExternalLink, Link as LinkIcon, Car, Leaf, Zap, Heart,
  Shield, Building, Wifi, Eye, Sparkles, Bot, Users, Clock
} from 'lucide-react';
import Link from 'next/link';
import styles from './event.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

const iconMap: Record<string, React.ComponentType<any>> = {
  Car, Leaf, Zap, Heart, Shield, Building, Wifi, Eye, Sparkles, Bot,
};

const categoryLabels: Record<string, string> = {
  grand: 'Grand Winner',
  runner: 'Runner Up',
  second_runner: 'Second Runner Up',
};

const categoryIcons: Record<string, React.ComponentType<any>> = {
  grand: Trophy,
  runner: Medal,
  second_runner: Award,
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function EventPage({ event }: { event: any }) {
  const stats = [
    { label: 'Participants', value: 87, icon: 'Users' },
    { label: 'Expert Judges', value: event.judges?.length || 21, icon: 'Award' },
    { label: 'Projects', value: event.projects?.length || 0, icon: 'Code' },
    { label: 'Winners', value: event.winners?.length || 0, icon: 'Trophy' },
  ];

  const criteria = [
    { name: 'Innovation', percentage: 25, color: '#00D4FF' },
    { name: 'Technical Implementation', percentage: 25, color: '#8B5CF6' },
    { name: 'Impact', percentage: 20, color: '#06FFA5' },
    { name: 'Feasibility', percentage: 15, color: '#FFB800' },
    { name: 'Presentation', percentage: 15, color: '#EC4899' },
  ];

  return (
    <div className={styles.page}>
      <Navbar />

      {/* ---- HERO ---- */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroContent}`}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="section-label">
              <Calendar size={14} /> {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.div>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="gradient-text">{event.title}</span>
          </motion.h1>
          <motion.p className={styles.heroSubtitle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {event.tagline}
          </motion.p>
          <motion.div className={styles.heroMeta} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <span className={styles.metaItem}><MapPin size={16} /> {event.location}</span>
            <span className={`badge badge-success`}>{event.status === 'completed' ? 'Completed' : event.status}</span>
          </motion.div>
          <motion.div className={styles.statsRow} initial="hidden" animate="visible" variants={stagger}>
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <AnimatedCounter end={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className={styles.heroCtas} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Link href={`/events/${event.slug}/winners`} className="btn btn-primary btn-lg">
              <Trophy size={18} /> View Winners
            </Link>
            <Link href={`/events/${event.slug}/projects`} className="btn btn-secondary btn-lg">
              Explore Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ---- ABOUT ---- */}
      <section className="section" id="about">
        <div className="container">
          <SectionHeading label="About" title="About This Event" subtitle={event.description || ''} />
        </div>
      </section>

      {/* ---- THEMES ---- */}
      {event.themes?.length > 0 && (
        <section className="section" id="themes" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <SectionHeading label="Themes" title="Hackathon Themes" subtitle="Explore the focus areas of this hackathon" />
            <motion.div className={styles.themesGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {event.themes.map((theme: any) => {
                const IconComp = iconMap[theme.icon || ''] || Sparkles;
                return (
                  <motion.div key={theme.id} className={`glass-card ${styles.themeCard}`} variants={fadeUp}>
                    <div className={styles.themeIcon}><IconComp size={24} /></div>
                    <h4>{theme.title}</h4>
                    <p>{theme.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ---- JUDGES ---- */}
      {event.judges?.length > 0 && (
        <section className="section" id="judges">
          <div className="container">
            <SectionHeading label="Judges" title="Expert Judges" subtitle={`${event.judges.length} industry leaders evaluating innovation`} />
            <motion.div className={styles.judgesGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {event.judges.slice(0, 8).map((judge: any) => (
                <motion.div key={judge.id} className={`glass-card ${styles.judgeCard}`} variants={fadeUp}>
                  <div className={styles.judgeAvatar}>
                    {judge.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <h4 className={styles.judgeName}>{judge.name}</h4>
                  <p className={styles.judgeTitle}>{judge.title}</p>
                  {judge.company && <span className="badge badge-primary">{judge.company}</span>}
                  {judge.linkedin && (
                    <a href={judge.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkedinLink}>
                      <LinkIcon size={16} /> LinkedIn
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
            {event.judges.length > 8 && (
              <div style={{ textAlign: 'center', marginTop: 40 }}>
                <Link href={`/events/${event.slug}/judges`} className="btn btn-secondary">
                  View All {event.judges.length} Judges
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---- PRIZES ---- */}
      {event.prizes?.length > 0 && (
        <section className="section" id="prizes" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <SectionHeading label="Prizes" title="Prizes & Rewards" />
            <div className={styles.prizesRow}>
              {event.prizes.map((prize: any, i: number) => {
                const icons = [Trophy, Medal, Award];
                const gradients = [
                  'linear-gradient(135deg, #FFD700, #FFA500)',
                  'linear-gradient(135deg, #C0C0C0, #A0A0A0)',
                  'linear-gradient(135deg, #CD7F32, #B8860B)',
                ];
                const PIcon = icons[i] || Award;
                return (
                  <motion.div key={prize.id} className={`glass-card ${styles.prizeCard} ${i === 0 ? styles.prizeGrand : ''}`}
                    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                    <div className={styles.prizeIcon} style={{ background: gradients[i] }}>
                      <PIcon size={32} color="#fff" />
                    </div>
                    <h3>{prize.title}</h3>
                    <ul className={styles.prizeRewards}>
                      {JSON.parse(prize.rewards).map((r: string, ri: number) => (
                        <li key={ri}><CheckCircle size={14} /> {r}</li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ---- JUDGING CRITERIA ---- */}
      <section className="section" id="criteria">
        <div className="container">
          <SectionHeading label="Evaluation" title="Judging Criteria" />
          <div className={styles.criteriaList}>
            {criteria.map((c) => (
              <ProgressBar key={c.name} label={c.name} percentage={c.percentage} color={c.color} />
            ))}
          </div>
        </div>
      </section>

      {/* ---- TIMELINE ---- */}
      {event.timelineItems?.length > 0 && (
        <section className="section" id="timeline" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <SectionHeading label="Timeline" title="Event Timeline" />
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
              {event.timelineItems.map((item: any, i: number) => (
                <motion.div key={item.id} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}>
                  <div className={styles.timelineDot} />
                  <div className={`glass-card ${styles.timelineCard}`}>
                    <span className={`badge ${item.status === 'completed' ? 'badge-success' : 'badge-primary'}`}>
                      {item.status}
                    </span>
                    <h4>{item.title}</h4>
                    {item.date && <p><Clock size={14} /> {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- WINNERS PREVIEW ---- */}
      {event.winners?.length > 0 && (
        <section className="section" id="winners">
          <div className="container">
            <SectionHeading label="Hall of Fame" title="Winners Showcase" />
            <motion.div className={styles.winnersGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {event.winners.map((winner: any) => {
                const WIcon = categoryIcons[winner.category] || Trophy;
                return (
                  <motion.div key={winner.id} className={`glass-card ${styles.winnerCard}`} variants={fadeUp}>
                    <div className={styles.winnerBadge}>
                      <WIcon size={24} />
                      <span>{categoryLabels[winner.category] || winner.category}</span>
                    </div>
                    <h3>{winner.projectName}</h3>
                    <p className={styles.winnerTeam}><Users size={14} /> {winner.teamName}</p>
                    <p>{winner.description}</p>
                    <div className={styles.winnerLinks}>
                      {winner.github && <a href={winner.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm"><Code size={16} /> Code</a>}
                      {winner.demoVideo && <a href={winner.demoVideo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm"><ExternalLink size={16} /> Demo</a>}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href={`/events/${event.slug}/winners`} className="btn btn-primary">View Full Hall of Fame</Link>
            </div>
          </div>
        </section>
      )}

      {/* ---- RULES ---- */}
      {event.rules?.length > 0 && (
        <section className="section" id="rules" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <SectionHeading label="Rules" title="Rules & Eligibility" />
            <motion.div className={styles.rulesList} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {event.rules.map((rule: any) => (
                <motion.div key={rule.id} className={styles.ruleItem} variants={fadeUp}>
                  <CheckCircle size={20} className={styles.ruleIcon} />
                  <span>{rule.content}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ---- TEAM ---- */}
      {event.teamMembers?.length > 0 && (
        <section className="section" id="team">
          <div className="container">
            <SectionHeading label="Team" title="Organizing Team" />
            <motion.div className={styles.teamGrid} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {event.teamMembers.map((member: any) => (
                <motion.div key={member.id} className={`glass-card ${styles.teamCard}`} variants={fadeUp}>
                  <div className={styles.teamAvatar}>
                    {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <h4>{member.name}</h4>
                  <span className="badge badge-secondary">{member.role}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
