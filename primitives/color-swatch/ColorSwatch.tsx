import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type ColorSwatchSize = 'sm' | 'md' | 'lg';

export interface ColorSwatchProps {
  /** Any CSS color value */
  color: string;
  /** Circle size */
  size?: ColorSwatchSize;
  /** Whether the swatch is selected */
  selected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Optional label below the swatch */
  label?: string;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * ColorSwatch primitive.
 *
 * Small clickable color display. Optionally shows a label below. Can be selected.
 */
export function ColorSwatch({
  color,
  size = 'md',
  selected = false,
  onClick,
  label,
  skeleton = false,
  className = '',
  style,
}: ColorSwatchProps) {
  if (skeleton) {
    return <Skeleton shape="circle" width="1.75rem" height="1.75rem" className={className} style={style} />;
  }

  const wrapperClasses = [
    'color-swatch',
    className,
  ].filter(Boolean).join(' ');

  const circleClasses = [
    'color-swatch__circle',
    `color-swatch__circle--${size}`,
    selected ? 'color-swatch__circle--selected' : '',
  ].filter(Boolean).join(' ');

  return (
    <span className={wrapperClasses} style={style}>
      <span
        className={circleClasses}
        style={{ backgroundColor: color }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={label || color}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      />
      {label && <span className="color-swatch__label">{label}</span>}
    </span>
  );
}

export default ColorSwatch;
