'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Users,
  Gavel,
  FolderKanban,
  Trophy,
  Award,
  Handshake,
  Megaphone,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import styles from './admin-layout.module.css';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/participants', label: 'Participants', icon: Users },
  { href: '/admin/judges', label: 'Judges', icon: Gavel },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/winners', label: 'Winners', icon: Trophy },
  { href: '/admin/certificates', label: 'Certificates', icon: Award },
  { href: '/admin/sponsors', label: 'Sponsors', icon: Handshake },
  { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthenticated(true);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch {
        setAuthenticated(false);
      }
    }

    const checkCookie = () => {
      return document.cookie.includes('admin_token');
    };

    if (!checkCookie()) {
      router.push('/admin/login');
      return;
    }

    setAuthenticated(true);
    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (authenticated === false) {
    return null;
  }

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <span className={styles.logo}>
            Smart<span className={styles.logoAccent}>City</span> Admin
          </span>
          <button className={styles.closeBtn} onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive(item.href) ? styles.navItemActive : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className={styles.navIcon} size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className={styles.topBarTitle}>SmartCity Admin</span>
          <div style={{ width: 24 }} />
        </div>

        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
