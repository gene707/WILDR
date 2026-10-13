import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', isInvalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${isInvalid ? styles.invalid : ''} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
