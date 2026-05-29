'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, XCircle, Loader2 } from 'lucide-react';
import styles from './verify.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function VerifyPage() {
  const [certId, setCertId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/certificates/verify?certId=${encodeURIComponent(certId)}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        const data = await res.json();
        setError(data.error || 'Certificate not found');
      }
    } catch (err) {
      setError('An error occurred while verifying the certificate.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className="container section">
        <div className="section-header">
          <span className="section-label">Verification</span>
          <h1 className="gradient-text">Certificate Verification</h1>
          <p className="section-subtitle">Verify the authenticity of Innovation Hacks certificates</p>
        </div>

        <div className={styles.verifyContainer}>
          <form onSubmit={handleVerify} className={`glass-card ${styles.searchForm}`}>
            <div className={styles.inputWrapper}>
              <Search className={styles.inputIcon} size={20} />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g., IH-2026-0001)"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button 
              type="submit" 
              className={`btn btn-primary ${styles.verifyBtn}`}
              disabled={isLoading || !certId.trim()}
            >
              {isLoading ? <Loader2 size={20} className={styles.spinner} /> : 'Verify'}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`glass-card ${styles.resultCard} ${styles.successCard}`}
              >
                <div className={styles.resultHeader}>
                  <ShieldCheck size={48} className={styles.successIcon} />
                  <h2>Verified Certificate</h2>
                  <span className={`badge ${result.status === 'valid' ? 'badge-success' : 'badge-warning'}`}>
                    {result.status.toUpperCase()}
                  </span>
                </div>

                <div className={styles.resultDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Certificate ID</span>
                    <span className={styles.detailValue}>{result.certId}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Recipient Name</span>
                    <span className={styles.detailValue}>{result.name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Role / Achievement</span>
                    <span className={styles.detailValue}>{result.role}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Event</span>
                    <span className={styles.detailValue}>{result.event.title}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Issue Date</span>
                    <span className={styles.detailValue}>
                      {new Date(result.issueDate).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`glass-card ${styles.resultCard} ${styles.errorCard}`}
              >
                <XCircle size={48} className={styles.errorIcon} />
                <h2>Verification Failed</h2>
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
