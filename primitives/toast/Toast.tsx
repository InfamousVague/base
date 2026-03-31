import React from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { check } from '../icon/icons/check.js';
import { alertTriangle } from '../icon/icons/alert-triangle.js';
import { info } from '../icon/icons/info.js';
import { x as xIcon } from '../icon/icons/x.js';

// ---- Types ----

type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export interface ToastProps {
  /** Visual variant */
  variant?: ToastVariant;
  /** Toast message */
  message: string;
  /** Optional action */
  action?: { label: string; onClick: () => void };
  /** Called when the toast is dismissed */
  onDismiss?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const VARIANT_ICON: Record<ToastVariant, string> = {
  success: check,
  error: xIcon,
  warning: alertTriangle,
  info: info,
  neutral: '',
};

/**
 * Toast — floating pill notification.
 *
 * Compact, single-line pill with icon + message + optional action.
 * Designed to float at the bottom of the screen.
 */
export function Toast({
  variant = 'neutral',
  message,
  action,
  onDismiss,
  className = '',
  style,
}: ToastProps) {
  const classes = [
    'toast',
    `toast--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  const iconSvg = VARIANT_ICON[variant];

  return (
    <div className={classes} style={style} role="status" aria-live="polite">
      {iconSvg && (
        <span className="toast__icon">
          <Icon icon={iconSvg} size="sm" />
        </span>
      )}
      <span className="toast__message">{message}</span>
      {action && (
        <button className="toast__action" onClick={action.onClick} type="button">
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button className="toast__close" onClick={onDismiss} type="button" aria-label="Dismiss">
          <Icon icon={xIcon} size="xs" />
        </button>
      )}
    </div>
  );
}

export default Toast;
