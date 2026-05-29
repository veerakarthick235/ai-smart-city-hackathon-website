'use client';

import { useEffect, useState } from 'react';
import { Loader2, Gavel, Plus, Edit2, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

interface Judge {
  id: string;
  name: string;
  email: string;
  expertise: string;
  status: 'active' | 'pending' | 'inactive';
  eventsAssigned: number;
}

export default function JudgesManagement() {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJudges() {
      try {
        const res = await fetch('/api/judges');
        if (res.ok) {
          const data = await res.json();
          setJudges(data);
        } else {
          // Mock data
          setJudges([
            { id: '1', name: 'Dr. Emily Chen', email: 'emily.chen@example.com', expertise: 'Urban Planning', status: 'active', eventsAssigned: 2 },
            { id: '2', name: 'Michael Rodriguez', email: 'm.rodriguez@example.com', expertise: 'Software Engineering', status: 'active', eventsAssigned: 1 },
            { id: '3', name: 'Sarah Jenkins', email: 's.jenkins@example.com', expertise: 'Environmental Science', status: 'pending', eventsAssigned: 0 },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch judges:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJudges();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    return `${styles.badge} ${styles[status] || ''}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Judges Management</h1>
        <button className={styles.button}>
          <Plus size={18} />
          <span>Invite Judge</span>
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={32} />
            <p>Loading judges...</p>
          </div>
        ) : judges.length === 0 ? (
          <div className={styles.empty}>
            <Gavel size={48} opacity={0.5} />
            <p>No judges invited yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Area of Expertise</th>
                  <th>Events Assigned</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {judges.map((judge) => (
                  <tr key={judge.id}>
                    <td style={{ fontWeight: 500 }}>{judge.name}</td>
                    <td>{judge.email}</td>
                    <td>{judge.expertise}</td>
                    <td>{judge.eventsAssigned}</td>
                    <td>
                      <span className={getStatusBadgeClass(judge.status)}>
                        {judge.status.charAt(0).toUpperCase() + judge.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.delete}`} title="Remove">
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
