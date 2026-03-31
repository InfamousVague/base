import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type IndicatorColor = 'accent' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type IndicatorPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
type IndicatorSize = 'sm' | 'md';

export interface IndicatorProps {
  /** Dot color */
  color?: IndicatorColor;
  /** Position of the indicator dot */
  position?: IndicatorPosition;
  /** Dot size */
  size?: IndicatorSize;
  /** Show count instead of dot */
  label?: string | number;
  /** Whether to show the indicator */
  show?: boolean;
  /** The element to attach indicator to */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Indicator primitive.
 *
 * Status dot with positioning (like a notification dot on an avatar or icon).
 */
export function Indicator({
  color = 'accent',
  position = 'top-right',
  size = 'md',
  label,
  show = true,
  children,
  className = '',
  style,
}: IndicatorProps) {
  const wrapperClasses = [
    'indicator',
    className,
  ].filter(Boolean).join(' ');

  const dotClasses = [
    'indicator__dot',
    `indicator__dot--${size}`,
    `indicator__dot--${position}`,
    `indicator__dot--${color}`,
    label !== undefined ? 'indicator__dot--label' : '',
    !show ? 'indicator__dot--hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <span className={wrapperClasses} style={style}>
      {children}
      <span className={dotClasses}>
        {label !== undefined ? label : null}
      </span>
    </span>
  );
}

export default Indicator;
