'use client';

import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/lib/constants';
import SectionHeading from '../ui/SectionHeading';
import GradientButton from '../ui/GradientButton';
import { Mail, Link as LinkIcon, MessageCircle } from 'lucide-react';
import styles from './Contact.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  return (
    <section className="section" id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <SectionHeading label="Contact" title="Get In Touch" subtitle="Have questions? Our team is here to help you." />
        
        <motion.div 
          className={`glass-card ${styles.contactCard}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className={styles.contactInfo}>
            <h3>Reach Out Directly</h3>
            <p className={styles.contactDesc}>
              For sponsorships, partnerships, or general inquiries, drop us an email.
            </p>
            <a href={`mailto:${SITE_CONFIG.email}`} className={styles.emailLink}>
              <Mail size={20} />
              {SITE_CONFIG.email}
            </a>
          </div>

          <div className={styles.socialInfo}>
            <h3>Connect With Us</h3>
            <div className={styles.socialGrid}>
              <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <LinkIcon size={24} />
                <span>LinkedIn</span>
              </a>
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <LinkIcon size={24} />
                <span>Instagram</span>
              </a>
              <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                <LinkIcon size={24} />
                <span>GitHub</span>
              </a>
            </div>
            
            <GradientButton 
              href={SITE_CONFIG.social.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="primary" 
              icon={<MessageCircle size={20} />}
              className={styles.whatsappBtn}
            >
              Join WhatsApp Community
            </GradientButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
