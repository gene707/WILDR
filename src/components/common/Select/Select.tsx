import React from 'react';
import styles from './Select.module.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isInvalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', isInvalid, children, ...props }, ref) => {
    return (
      <div className={styles.selectWrapper}>
        <select
          ref={ref}
          className={`${styles.select} ${isInvalid ? styles.invalid : ''} ${className}`}
          {...props}
        >
          {children}
        </select>
        <span className={styles.arrow} aria-hidden="true">
          ▾
        </span>
      </div>
    );
  }
);

Select.displayName = 'Select';
