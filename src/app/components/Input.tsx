import clsx from "clsx";
import styles from "./Input.module.css";
import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>
          {label}
        </label>
        <input
          ref={ref}
          className={clsx(styles.input, error && styles.hasError, className)}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
