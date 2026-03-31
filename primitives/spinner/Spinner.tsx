import React from 'react';
import type { CSSProperties } from 'react';

// ---- Types ----

type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  /** Spinner size */
  size?: SpinnerSize;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Spinner primitive.
 *
 * An animated loading indicator using the CSS border trick.
 */
export function Spinner({
  size = 'md',
  className = '',
  style,
}: SpinnerProps) {
  const classes = [
    'spinner',
    `spinner--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      style={style}
      role="status"
      aria-label="Loading"
    />
  );
}

export default Spinner;
