'use client';

import { useEffect, useState } from 'react';
import { Loader2, FolderGit2, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import styles from '../admin.module.css';

interface Project {
  id: string;
  name: string;
  teamName: string;
  eventName: string;
  submissionDate: string;
  status: 'approved' | 'pending' | 'rejected';
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        } else {
          // Mock data
          setProjects([
            { id: '1', name: 'Smart Traffic Lights', teamName: 'Traffic Optimizers', eventName: 'Smart Mobility Hack', submissionDate: '2026-06-16T18:00:00Z', status: 'approved' },
            { id: '2', name: 'Waste Management System', teamName: 'EcoWarriors', eventName: 'Smart Mobility Hack', submissionDate: '2026-06-17T11:30:00Z', status: 'pending' },
            { id: '3', name: 'Air Quality Monitor', teamName: 'Breathe Easy', eventName: 'Urban Tech 2025', submissionDate: '2025-11-11T14:20:00Z', status: 'rejected' },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    if (status === 'approved') return `${styles.badge} ${styles.completed}`;
    if (status === 'rejected') return `${styles.badge} ${styles.draft}`; // Using draft color for rejected as fallback, or custom inline style
    return `${styles.badge} ${styles.pending}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Submitted Projects</h1>
      </div>

      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loading}>
            <Loader2 className={styles.spinner} size={32} />
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className={styles.empty}>
            <FolderGit2 size={48} opacity={0.5} />
            <p>No projects submitted yet.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Team</th>
                  <th>Event</th>
                  <th>Submission Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td style={{ fontWeight: 500 }}>{project.name}</td>
                    <td>{project.teamName}</td>
                    <td>{project.eventName}</td>
                    <td>{new Date(project.submissionDate).toLocaleString()}</td>
                    <td>
                      <span className={getStatusBadgeClass(project.status)}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="View Details">
                          <Eye size={16} />
                        </button>
                        {project.status === 'pending' && (
                          <>
                            <button className={styles.actionBtn} style={{ color: '#10b981' }} title="Approve">
                              <CheckCircle size={16} />
                            </button>
                            <button className={styles.actionBtn} style={{ color: '#ef4444' }} title="Reject">
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
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
