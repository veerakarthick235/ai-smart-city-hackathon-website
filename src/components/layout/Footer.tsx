import Link from 'next/link';
import { Link as LinkIcon, Mail } from 'lucide-react';
import styles from './Footer.module.css';

const PLATFORM_LINKS = [
  { label: 'How It Works', href: '/about' },
  { label: 'Register', href: '/events' },
  { label: 'Verify Certificate', href: '/verify' },
  { label: 'Leaderboard', href: '/hall-of-fame' },
];

const EVENT_LINKS = [
  { label: 'Upcoming Events', href: '/events' },
  { label: 'Past Events', href: '/events' },
  { label: 'Smart City Challenge', href: '/events' },
  { label: 'AI Innovation Sprint', href: '/events' },
];

const RESOURCE_LINKS = [
  { label: 'Documentation', href: '/about' },
  { label: 'API Reference', href: '/about' },
  { label: 'Guidelines', href: '/about' },
  { label: 'FAQ', href: '/about' },
];

const SOCIAL_LINKS = [
  { icon: LinkIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: LinkIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: LinkIcon, href: 'https://github.com', label: 'GitHub' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <span className={styles.logo}>Innovation Hacks</span>
            <p className={styles.tagline}>
              Empowering the next generation of innovators through world-class
              hackathons and collaborative challenges.
            </p>
            <div className={styles.socials}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              ))}

              <a
                href="mailto:hello@innovationhacks.dev"
                className={styles.socialLink}
                aria-label="Email"
              >
                <Mail />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Platform</h4>
            <div className={styles.columnLinks}>
              {PLATFORM_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className={styles.columnLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Events</h4>
            <div className={styles.columnLinks}>
              {EVENT_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className={styles.columnLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources + Connect */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Resources</h4>
            <div className={styles.columnLinks}>
              {RESOURCE_LINKS.map((link) => (
                <Link key={link.label} href={link.href} className={styles.columnLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Innovation Hacks. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/about" className={styles.bottomLink}>
              Privacy Policy
            </Link>
            <Link href="/about" className={styles.bottomLink}>
              Terms of Service
            </Link>
            <a
              href="mailto:hello@innovationhacks.dev"
              className={styles.bottomLink}
            >
              hello@innovationhacks.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
