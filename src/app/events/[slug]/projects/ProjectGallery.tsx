'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECT_CATEGORIES } from '@/lib/constants';
import { Code, ExternalLink } from 'lucide-react';
import styles from './projects.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ProjectGallery({ eventTitle, projects }: { eventTitle: string, projects: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className="container section">
        <div className="section-header">
          <span className="section-label">Gallery</span>
          <h1 className="gradient-text">Project Gallery</h1>
          <p className="section-subtitle">Explore {projects.length} innovative submissions from {eventTitle}</p>
        </div>

        <div className={styles.filterContainer}>
          {PROJECT_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className={styles.emptyState}>
            <Code size={48} className={styles.emptyIcon} />
            <h3>No projects found</h3>
            <p>Try selecting a different category.</p>
          </div>
        ) : (
          <motion.div layout className={styles.projectsGrid}>
            <AnimatePresence>
              {filteredProjects.map((project: any) => {
                const techStack = JSON.parse(project.techStack || '[]');
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`glass-card ${styles.projectCard}`}
                  >
                    <div className={styles.cardHeader}>
                      <span className="badge badge-primary">{project.category}</span>
                    </div>
                    
                    <h3>{project.name}</h3>
                    <p className={styles.teamName}>by {project.team}</p>
                    
                    <p className={styles.description}>{project.description}</p>
                    
                    <div className={styles.techStack}>
                      {techStack.map((tech: string, i: number) => (
                        <span key={i}>{tech}</span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                          <Code size={16} /> Code
                        </a>
                      )}
                      {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                          <ExternalLink size={16} /> Demo
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
