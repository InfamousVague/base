import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'size' | 'type'> {
  /** Size of the toggle */
  size?: ToggleSize;
  /** Optional label text */
  label?: string;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Toggle primitive.
 *
 * Switch control for boolean on/off states with optional label.
 */
export function Toggle({
  size = 'md',
  label,
  skeleton = false,
  className = '',
  style,
  ...rest
}: ToggleProps) {
  if (skeleton) {
    return <Skeleton width="2.75rem" height="1.5rem" shape="pill" className={className} style={style} />;
  }

  const classes = [
    'toggle',
    `toggle--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={classes} style={style}>
      <input type="checkbox" className="toggle__input" {...rest} />
      <span className="toggle__track">
        <span className="toggle__thumb" />
      </span>
      {label && <span className="toggle__label">{label}</span>}
    </label>
  );
}

export default Toggle;
