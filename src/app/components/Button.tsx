import clsx from "clsx";
import styles from "./Button.module.css";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

export function Button({ 
  children, 
  className, 
  variant = "primary", 
  isLoading, 
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.btn, styles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className={styles.spinner} size={16} />}
      {children}
    </button>
  );
}
