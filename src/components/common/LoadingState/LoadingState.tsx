import React from 'react';
import styles from './LoadingState.module.css';

export interface LoadingStateProps {
  label?: string;
  variant?: 'spinner' | 'skeleton' | 'inline';
  count?: number;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Loading...',
  variant = 'spinner',
  count = 3,
  className = '',
}) => {
  if (variant === 'skeleton') {
    return (
      <div
        className={`${styles.skeletonContainer} ${className}`}
        role="status"
        aria-label={label}
        aria-busy="true"
      >
        <span className="sr-only">{label}</span>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonText}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonShort}`} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`${styles.inlineContainer} ${className}`}
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className={styles.spinner} aria-hidden="true" />
        <span className={styles.label}>{label}</span>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinnerWrapper}>
        <div className={styles.spinner} aria-hidden="true" />
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  );
};
