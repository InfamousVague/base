import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type CircularProgressSize = 'sm' | 'md' | 'lg';
type CircularProgressColor = 'accent' | 'error' | 'warning' | 'success' | 'info';

export interface CircularProgressProps {
  /** Current value (0-100) */
  value?: number;
  /** Ring size */
  size?: CircularProgressSize;
  /** Ring color */
  color?: CircularProgressColor;
  /** Show percentage text in center */
  showValue?: boolean;
  /** Show indeterminate animation instead of value */
  indeterminate?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const SIZE_MAP = { sm: 32, md: 48, lg: 64 } as const;
const STROKE_MAP = { sm: 3, md: 4, lg: 5 } as const;

/**
 * CircularProgress primitive.
 *
 * An SVG circular progress ring with determinate and indeterminate states.
 */
export function CircularProgress({
  value = 0,
  size = 'md',
  color = 'accent',
  showValue = false,
  indeterminate = false,
  skeleton: isSkeleton = false,
  className = '',
  style,
}: CircularProgressProps) {
  if (isSkeleton) {
    return <Skeleton shape="circle" width={SIZE_MAP[size]} height={SIZE_MAP[size]} className={className} style={style} />;
  }

  const clamped = Math.max(0, Math.min(100, value));
  const dim = SIZE_MAP[size];
  const stroke = STROKE_MAP[size];
  const radius = (dim - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = indeterminate ? 0 : circumference - (clamped / 100) * circumference;

  const classes = [
    'circular-progress',
    `circular-progress--${size}`,
    color !== 'accent' ? `circular-progress--${color}` : '',
    indeterminate ? 'circular-progress--indeterminate' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{ width: dim, height: dim, ...style }}
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        fill="none"
        style={{ display: 'block' }}
      >
        <circle
          className="circular-progress__track"
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="circular-progress__bar"
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={indeterminate ? circumference * 0.75 : offset}
          strokeLinecap="round"
        />
      </svg>
      {showValue && !indeterminate && (
        <span className="circular-progress__value">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}

export default CircularProgress;
