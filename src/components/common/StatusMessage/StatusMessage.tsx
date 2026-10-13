import React from 'react';
import styles from './StatusMessage.module.css';

export interface StatusMessageProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  type = 'info',
  title,
  children,
  onDismiss,
  icon,
  className = '',
}) => {
  const role = type === 'error' || type === 'warning' ? 'alert' : 'status';

  return (
    <div className={`${styles.statusContainer} ${styles[type]} ${className}`} role={role}>
      <div className={styles.iconWrapper} aria-hidden="true">
        {icon || (
          <span className={styles.defaultIcon}>
            {type === 'success' && '✓'}
            {type === 'error' && '!'}
            {type === 'warning' && '▲'}
            {type === 'info' && 'ℹ'}
          </span>
        )}
      </div>
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.message}>{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={styles.dismissButton}
          aria-label="Dismiss notice"
        >
          ×
        </button>
      )}
    </div>
  );
};
