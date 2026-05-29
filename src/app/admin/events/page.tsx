'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Loader2, Calendar } from 'lucide-react';
import styles from '../admin.module.css';

interface HackathonEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'published' | 'completed';
  participantsCount?: number;
}

export default function EventsManagement() {
  const [events, setEvents] = useState<HackathonEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        } else {
          // Fallback mock data if API fails or isn't ready
          setEvents([
            { id: '1', title: 'Smart Mobility Hack', startDate: '2026-06-15', endDate: '2026-06-17', status: 'published', participantsCount: 150 },
            { id: '2', title: 'Green Energy Challenge', startDate: '2026-07-20', endDate: '2026-07-22', status: 'draft', participantsCount: 0 },
            { id: '3', title: 'Urban Tech 2025', startDate: '2025-11-10', endDate: '2025-11-12', status: 'completed', participantsCount: 320 },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    return `${styles.badge} ${styles[status] || ''}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Events Management</h1>
        <button className={styles.button}>
          <Plus size={18} />
          <span>Create Event</span>
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={32} />
            <p>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className={styles.empty}>
            <Calendar size={48} opacity={0.5} />
            <p>No events found. Create your first hackathon event!</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Participants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td style={{ fontWeight: 500 }}>{event.title}</td>
                    <td>{new Date(event.startDate).toLocaleDateString()}</td>
                    <td>{new Date(event.endDate).toLocaleDateString()}</td>
                    <td>
                      <span className={getStatusBadgeClass(event.status)}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </td>
                    <td>{event.participantsCount || 0}</td>
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
