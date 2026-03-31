import React, { useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { x } from '../icon/icons/x.js';

// ---- Types ----

type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps {
  /** Whether the dialog is visible */
  open: boolean;
  /** Called when the dialog should close */
  onClose: () => void;
  /** Optional header title */
  title?: string;
  /** Optional header description */
  description?: string;
  /** Dialog width preset */
  size?: DialogSize;
  /** Dialog body content */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Dialog — modal dialog overlay.
 *
 * Renders a backdrop + centered panel when open. Supports backdrop click,
 * Escape key to close, and auto-focuses the first focusable element.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  className = '',
  style,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  // Focus trap: auto-focus first focusable element on open
  useEffect(() => {
    if (!open || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const classes = [
    'dialog',
    `dialog--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        className={classes}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        aria-describedby={description ? 'dialog-description' : undefined}
      >
        {(title || description) && (
          <div className="dialog__header">
            <div>
              {title && (
                <h2 className="dialog__title" id="dialog-title">
                  {title}
                </h2>
              )}
              {description && (
                <p className="dialog__description" id="dialog-description">
                  {description}
                </p>
              )}
            </div>
            <button
              className="dialog__close"
              onClick={onClose}
              type="button"
              aria-label="Close"
            >
              <Icon icon={x} size="base" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default Dialog;
