import type { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export function Button({ children, onClick, type = 'button', className }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className || ''}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
