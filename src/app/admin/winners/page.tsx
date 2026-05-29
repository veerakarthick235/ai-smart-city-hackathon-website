'use client';

import { useEffect, useState } from 'react';
import { Loader2, Trophy, Plus, Edit2, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

interface Winner {
  id: string;
  projectName: string;
  teamName: string;
  eventName: string;
  awardCategory: string;
  prizeAmount: string;
}

export default function WinnersManagement() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWinners() {
      try {
        const res = await fetch('/api/winners');
        if (res.ok) {
          const data = await res.json();
          setWinners(data);
        } else {
          // Mock data
          setWinners([
            { id: '1', projectName: 'EcoTransit', teamName: 'Green Movers', eventName: 'Smart Mobility Hack', awardCategory: '1st Place', prizeAmount: '$5,000' },
            { id: '2', projectName: 'CitySense AI', teamName: 'Data Crafters', eventName: 'Smart Mobility Hack', awardCategory: 'Best Use of AI', prizeAmount: '$2,000' },
            { id: '3', projectName: 'WaterGuard', teamName: 'AquaTech', eventName: 'Urban Tech 2025', awardCategory: 'Sustainability Award', prizeAmount: '$1,500' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch winners:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchWinners();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Winners Management</h1>
        <button className={styles.button}>
          <Plus size={18} />
          <span>Announce Winner</span>
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={32} />
            <p>Loading winners...</p>
          </div>
        ) : winners.length === 0 ? (
          <div className={styles.empty}>
            <Trophy size={48} opacity={0.5} />
            <p>No winners announced yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Team / Participant</th>
                  <th>Event</th>
                  <th>Award Category</th>
                  <th>Prize</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {winners.map((winner) => (
                  <tr key={winner.id}>
                    <td style={{ fontWeight: 500 }}>{winner.projectName}</td>
                    <td>{winner.teamName}</td>
                    <td>{winner.eventName}</td>
                    <td>
                      <span className={`${styles.badge} ${styles.published}`}>
                        {winner.awardCategory}
                      </span>
                    </td>
                    <td>{winner.prizeAmount}</td>
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
