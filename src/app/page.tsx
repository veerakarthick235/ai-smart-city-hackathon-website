'use client';

import dynamic from 'next/dynamic';
import styles from './page.module.css';

/* Eagerly import lightweight sections */
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

/* Lazy-load heavy sections for performance */
const ParticleBackground = dynamic(() => import('@/components/ui/ParticleBackground'), { ssr: false });
const Hero = dynamic(() => import('@/components/sections/Hero'));
const AboutOrg = dynamic(() => import('@/components/sections/AboutOrg'));
const About = dynamic(() => import('@/components/sections/About'));
const Judges = dynamic(() => import('@/components/sections/Judges'));
const Themes = dynamic(() => import('@/components/sections/Themes'));
const Prizes = dynamic(() => import('@/components/sections/Prizes'));
const JudgingCriteria = dynamic(() => import('@/components/sections/JudgingCriteria'));
const Winners = dynamic(() => import('@/components/sections/Winners'));
const Timeline = dynamic(() => import('@/components/sections/Timeline'));
const Rules = dynamic(() => import('@/components/sections/Rules'));
const Team = dynamic(() => import('@/components/sections/Team'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const Contact = dynamic(() => import('@/components/sections/Contact'));

export default function HomePage() {
  return (
    <div className={styles.page}>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <AboutOrg />
        <About />
        <Themes />
        <Judges />
        <Prizes />
        <JudgingCriteria />
        <Timeline />
        <Winners />
        <Rules />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
