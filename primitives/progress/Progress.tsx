import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type ProgressSize = 'sm' | 'md' | 'lg';
type ProgressColor = 'accent' | 'error' | 'warning' | 'success' | 'info';

export interface ProgressProps {
  /** Current value (0-100) */
  value?: number;
  /** Show indeterminate animation instead of value */
  indeterminate?: boolean;
  /** Bar thickness */
  size?: ProgressSize;
  /** Bar color */
  color?: ProgressColor;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Progress primitive.
 *
 * A linear progress bar with determinate and indeterminate states.
 */
export function Progress({
  value = 0,
  indeterminate = false,
  size = 'md',
  color = 'accent',
  skeleton = false,
  className = '',
  style,
}: ProgressProps) {
  if (skeleton) {
    return <Skeleton width="100%" height={size === 'sm' ? '0.25rem' : size === 'lg' ? '0.75rem' : '0.5rem'} shape="pill" className={className} style={style} />;
  }

  const clamped = Math.max(0, Math.min(100, value));

  const classes = [
    'progress',
    `progress--${size}`,
    color !== 'accent' ? `progress--${color}` : '',
    indeterminate ? 'progress--indeterminate' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={style}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="progress__bar"
        style={indeterminate ? undefined : { width: `${clamped}%` }}
      />
    </div>
  );
}

export default Progress;
