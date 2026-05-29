'use client';

import { useEffect, useState } from 'react';
import { Loader2, Award, Plus, Download, Mail, Trash2 } from 'lucide-react';
import styles from '../admin.module.css';

interface Certificate {
  id: string;
  recipientName: string;
  eventName: string;
  type: 'Participation' | 'Winner' | 'Judge' | 'Mentor';
  issueDate: string;
  status: 'issued' | 'pending';
}

export default function CertificatesManagement() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await fetch('/api/certificates');
        if (res.ok) {
          const data = await res.json();
          setCertificates(data);
        } else {
          // Mock data
          setCertificates([
            { id: '1', recipientName: 'Alice Smith', eventName: 'Smart Mobility Hack', type: 'Winner', issueDate: '2026-06-18T10:00:00Z', status: 'issued' },
            { id: '2', recipientName: 'Bob Johnson', eventName: 'Smart Mobility Hack', type: 'Participation', issueDate: '2026-06-18T10:00:00Z', status: 'issued' },
            { id: '3', recipientName: 'Dr. Emily Chen', eventName: 'Urban Tech 2025', type: 'Judge', issueDate: '2025-11-13T09:00:00Z', status: 'issued' },
            { id: '4', recipientName: 'Charlie Lee', eventName: 'Green Energy Challenge', type: 'Participation', issueDate: '', status: 'pending' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    if (status === 'issued') return `${styles.badge} ${styles.completed}`;
    return `${styles.badge} ${styles.pending}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Certificates Management</h1>
        <button className={styles.button}>
          <Plus size={18} />
          <span>Generate Certificates</span>
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={32} />
            <p>Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className={styles.empty}>
            <Award size={48} opacity={0.5} />
            <p>No certificates generated yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Event</th>
                  <th>Type</th>
                  <th>Issue Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id}>
                    <td style={{ fontWeight: 500 }}>{cert.recipientName}</td>
                    <td>{cert.eventName}</td>
                    <td>{cert.type}</td>
                    <td>{cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : '-'}</td>
                    <td>
                      <span className={getStatusBadgeClass(cert.status)}>
                        {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Download PDF">
                          <Download size={16} />
                        </button>
                        <button className={styles.actionBtn} title="Email Certificate">
                          <Mail size={16} />
                        </button>
                        <button className={`${styles.actionBtn} ${styles.delete}`} title="Revoke">
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
