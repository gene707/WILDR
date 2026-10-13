import React from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  icon,
}) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleArea}>
        <div className={styles.titleRow}>
          {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
          <h1 className={styles.title}>{title}</h1>
          {badge && <div className={styles.badgeWrapper}>{badge}</div>}
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};
