import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { Lightbulb, Users, TrendingUp, Award, Globe, Code } from 'lucide-react';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'About | Innovation Hacks',
  description: 'Innovation Hacks is a global hackathon platform building the future through competitive innovation events.',
};

export default function AboutPage() {
  const values = [
    { icon: <Lightbulb size={32} />, title: 'Innovation', desc: 'Pushing the boundaries of what is possible with modern technology.' },
    { icon: <Users size={32} />, title: 'Community', desc: 'Connecting diverse talents to build collaborative solutions.' },
    { icon: <TrendingUp size={32} />, title: 'Impact', desc: 'Focusing on projects that create real-world positive change.' },
    { icon: <Award size={32} />, title: 'Excellence', desc: 'Setting the highest standards for technical implementation.' },
  ];

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className={`section ${styles.hero}`}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className="section-label">Our Story</span>
              <h1 className="gradient-text">About Innovation Hacks</h1>
              <p className={styles.heroSubtitle}>
                Empowering the next generation of innovators to build a world where technology solves humanity's greatest challenges.
              </p>
            </div>
          </div>
          <div className={styles.heroBg} />
        </section>

        {/* Mission & Vision */}
        <section className={`section ${styles.missionSection}`}>
          <div className="container">
            <div className={styles.missionGrid}>
              <div className={`glass-card ${styles.missionCard}`}>
                <h3>Our Mission</h3>
                <p>
                  To democratize innovation by providing a world-class platform where developers, designers, and visionaries can collaborate on transformative projects. We believe that the best ideas are born when diverse perspectives unite under the pressure of a hackathon.
                </p>
              </div>
              <div className={`glass-card ${styles.missionCard}`}>
                <h3>Our Vision</h3>
                <p>
                  To become the global nexus for technological problem-solving. We envision a future where Innovation Hacks events are the birthplace of startups and solutions that redefine urban living, healthcare, and environmental sustainability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className={`section ${styles.statsSection}`}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <Globe size={40} className={styles.statIcon} />
                <AnimatedCounter end={12} suffix="+" />
                <span>Countries Reached</span>
              </div>
              <div className={styles.statItem}>
                <Users size={40} className={styles.statIcon} />
                <AnimatedCounter end={8500} suffix="+" />
                <span>Total Participants</span>
              </div>
              <div className={styles.statItem}>
                <Code size={40} className={styles.statIcon} />
                <AnimatedCounter end={1200} suffix="+" />
                <span>Projects Submitted</span>
              </div>
              <div className={styles.statItem}>
                <Award size={40} className={styles.statIcon} />
                <AnimatedCounter end={15} />
                <span>Global Events</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section">
          <div className="container">
            <SectionHeading label="Values" title="What Drives Us" />
            <div className={styles.valuesGrid}>
              {values.map((val, i) => (
                <div key={i} className={`glass-card ${styles.valueCard}`}>
                  <div className={styles.valueIcon}>{val.icon}</div>
                  <h4>{val.title}</h4>
                  <p>{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className={`section ${styles.leadershipSection}`}>
          <div className="container">
            <SectionHeading label="Leadership" title="Meet The Founder" />
            <div className={`glass-card ${styles.leaderCard}`}>
              <div className={styles.leaderAvatar}>
                VK
              </div>
              <div className={styles.leaderInfo}>
                <h3>Veera Karthick</h3>
                <span className="badge badge-primary">Founder & Organizer</span>
                <p>
                  Veera founded Innovation Hacks with a simple premise: the world's most pressing challenges require the brightest minds working together without boundaries. With a background in AI and scalable systems, Veera has grown the platform from a local university event to a global phenomenon, focusing on creating premium, enterprise-grade experiences for hackers and sponsors alike.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: 24 }}>Ready to build the future?</h2>
            <a href="/" className="btn btn-primary btn-lg">Explore Upcoming Events</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
