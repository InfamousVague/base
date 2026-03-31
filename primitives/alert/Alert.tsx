import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export interface AlertProps {
  /** Status variant */
  variant: AlertVariant;
  /** Optional title */
  title?: string;
  /** Optional icon — SVG innerHTML string */
  icon?: string;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Called when dismiss button is clicked */
  onDismiss?: () => void;
  /** Description content */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const ROLE_MAP: Record<AlertVariant, 'alert' | 'status'> = {
  error: 'alert',
  warning: 'alert',
  info: 'status',
  success: 'status',
  neutral: 'status',
};

/**
 * Alert primitive.
 *
 * Inline alert/banner for contextual messages.
 */
export function Alert({
  variant,
  title,
  icon,
  dismissible = false,
  onDismiss,
  children,
  className = '',
  style,
}: AlertProps) {
  const classes = [
    'alert',
    `alert--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} role={ROLE_MAP[variant]}>
      {icon && (
        <span
          className="alert__icon"
          dangerouslySetInnerHTML={{ __html: icon }}
          aria-hidden="true"
        />
      )}
      <div className="alert__content">
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__description">{children}</div>
      </div>
      {dismissible && (
        <button
          className="alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
          type="button"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Alert;
