import React from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  children: (inputProps: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    required?: boolean;
  }) => React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  helperText,
  error,
  required = false,
  children,
  className = '',
}) => {
  const helperId = helperText ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`${styles.fieldGroup} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        <span>{label}</span>
        {required && <span className={styles.requiredAsterisk} aria-hidden="true">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>

      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': Boolean(error),
        required,
      })}

      {error && (
        <p id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
};
