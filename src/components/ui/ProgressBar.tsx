'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
}

export default function ProgressBar({
  label,
  percentage,
  color,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            requestAnimationFrame(() => {
              setWidth(percentage);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [percentage, hasAnimated]);

  const fillStyle: React.CSSProperties = {
    width: `${width}%`,
    ...(color ? { background: color } : {}),
  };

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        <span className={styles.percentage}>{Math.round(width)}%</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={fillStyle} />
      </div>
    </div>
  );
}
