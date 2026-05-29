'use client';

import { useEffect, useState } from 'react';
import { Loader2, Users, Search, Download, Trash2, Edit2 } from 'lucide-react';
import styles from '../admin.module.css';

interface Participant {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'banned';
  registrationDate: string;
}

export default function ParticipantsManagement() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const res = await fetch('/api/participants');
        if (res.ok) {
          const data = await res.json();
          setParticipants(data);
        } else {
          // Mock data
          setParticipants([
            { id: '1', name: 'Alice Smith', email: 'alice@example.com', role: 'Developer', status: 'active', registrationDate: '2026-05-10T10:00:00Z' },
            { id: '2', name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'active', registrationDate: '2026-05-12T14:30:00Z' },
            { id: '3', name: 'Charlie Lee', email: 'charlie@example.com', role: 'Project Manager', status: 'pending', registrationDate: '2026-05-28T09:15:00Z' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch participants:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchParticipants();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    return `${styles.badge} ${styles[status] || ''}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Participants Management</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className={styles.button} style={{ background: 'var(--card-bg)', color: 'var(--foreground)', border: '1px solid var(--border)' }}>
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        {/* Search bar inside table container */}
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search participants by name or email..." 
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--foreground)' }}
            />
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={32} />
            <p>Loading participants...</p>
          </div>
        ) : participants.length === 0 ? (
          <div className={styles.empty}>
            <Users size={48} opacity={0.5} />
            <p>No participants registered yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((user) => (
                  <tr key={user.id}>
                    <td style={{ fontWeight: 500 }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.registrationDate).toLocaleDateString()}</td>
                    <td>
                      <span className={getStatusBadgeClass(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.delete}`} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
