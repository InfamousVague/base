import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type MeterSize = 'sm' | 'md' | 'lg';

export interface MeterProps {
  /** Current value (0–100) */
  value: number;
  /** Track height */
  size?: MeterSize;
  /** Threshold below which value is "low" */
  low?: number;
  /** Threshold above which value is "high" */
  high?: number;
  /** Optimal value (determines color logic) */
  optimum?: number;
  /** Accessible label */
  label?: string;
  /** Show numeric value */
  showValue?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

function getBarModifier(value: number, low: number, high: number): string {
  if (value < low) return 'meter__bar--low';
  if (value > high) return 'meter__bar--high';
  return 'meter__bar--medium';
}

/**
 * Meter primitive.
 *
 * Visual meter/gauge that changes color based on value ranges.
 */
export function Meter({
  value,
  size = 'md',
  low = 33,
  high = 66,
  optimum = 100,
  label,
  showValue = false,
  skeleton = false,
  className = '',
  style,
}: MeterProps) {
  if (skeleton) {
    return <Skeleton width="100%" height="0.5rem" shape="pill" className={className} style={style} />;
  }

  const clamped = Math.max(0, Math.min(100, value));

  const classes = [
    'meter',
    className,
  ].filter(Boolean).join(' ');

  const trackClasses = [
    'meter__track',
    `meter__track--${size}`,
  ].join(' ');

  const barClasses = [
    'meter__bar',
    getBarModifier(clamped, low, high),
  ].join(' ');

  const hasHeader = label || showValue;

  return (
    <div className={classes} style={style} role="meter" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      {hasHeader && (
        <div className="meter__header">
          {label && <span className="meter__label">{label}</span>}
          {showValue && <span className="meter__value">{clamped}%</span>}
        </div>
      )}
      <div className={trackClasses}>
        <div className={barClasses} style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

export default Meter;
