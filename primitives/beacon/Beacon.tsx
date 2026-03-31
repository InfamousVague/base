import React from 'react';
import type { CSSProperties } from 'react';

// ---- Types ----

type BeaconColor = 'accent' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type BeaconSize = 'sm' | 'md' | 'lg';

export interface BeaconProps {
  /** Dot color */
  color?: BeaconColor;
  /** Dot size */
  size?: BeaconSize;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Beacon primitive.
 *
 * A pulsing animated dot indicator. No skeleton needed.
 */
export function Beacon({
  color = 'accent',
  size = 'md',
  className = '',
  style,
}: BeaconProps) {
  const classes = [
    'beacon',
    `beacon--${size}`,
    `beacon--${color}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span
      className={classes}
      style={style}
      role="status"
      aria-label="Active indicator"
    />
  );
}

export default Beacon;
