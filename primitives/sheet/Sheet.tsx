import React, { useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { x } from '../icon/icons/x.js';

// ---- Types ----

type SheetSide = 'left' | 'right';
type SheetSize = 'sm' | 'md' | 'lg';

export interface SheetProps {
  /** Whether the sheet is visible */
  open: boolean;
  /** Called when the sheet should close */
  onClose: () => void;
  /** Side the sheet slides from */
  side?: SheetSide;
  /** Sheet width preset */
  size?: SheetSize;
  /** Optional header title */
  title?: string;
  /** Sheet body content */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Sheet — slide-out side panel.
 *
 * Renders a backdrop + panel sliding from left or right edge when open.
 * Supports backdrop click, Escape key to close.
 */
export function Sheet({
  open,
  onClose,
  side = 'right',
  size = 'md',
  title,
  children,
  className = '',
  style,
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

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
    if (!open || !sheetRef.current) return;

    const focusable = sheetRef.current.querySelector<HTMLElement>(
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
    'sheet',
    `sheet--${side}`,
    `sheet--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="sheet-backdrop" onClick={handleBackdropClick}>
      <div
        ref={sheetRef}
        className={classes}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'sheet-title' : undefined}
      >
        <div className="sheet__header">
          {title && (
            <h2 className="sheet__title" id="sheet-title">
              {title}
            </h2>
          )}
          {!title && <div />}
          <button
            className="sheet__close"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <Icon icon={x} size="base" />
          </button>
        </div>
        <div className="sheet__body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Sheet;
