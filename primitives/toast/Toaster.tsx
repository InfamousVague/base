import React from 'react';
import type { CSSProperties } from 'react';
import { Toast } from './Toast.js';
import type { ToastItem } from './useToast.js';

// ---- Types ----

type ToasterPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToasterProps {
  /** Position of the toast container (default: bottom-center) */
  position?: ToasterPosition;
  /** Active toasts from useToast */
  toasts: ToastItem[];
  /** Dismiss handler from useToast */
  onDismiss: (id: string) => void;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Toaster — fixed-position container for floating pill toasts.
 */
export function Toaster({
  position = 'bottom-center',
  toasts,
  onDismiss,
  className = '',
  style,
}: ToasterProps) {
  const classes = [
    'toaster',
    position !== 'bottom-center' ? `toaster--${position}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          variant={t.variant}
          message={t.message}
          action={t.action}
          onDismiss={() => onDismiss(t.id)}
        />
      ))}
    </div>
  );
}

export default Toaster;
