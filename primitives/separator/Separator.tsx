import React from 'react';
import type { CSSProperties } from 'react';

// ---- Types ----

type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps {
  /** Direction of the divider line */
  orientation?: SeparatorOrientation;
  /** When true, removes semantic role (purely visual) */
  decorative?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Separator primitive.
 *
 * A simple divider line, horizontal or vertical.
 */
export function Separator({
  orientation = 'horizontal',
  decorative = false,
  className = '',
  style,
}: SeparatorProps) {
  const classes = [
    'separator',
    `separator--${orientation}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={style}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
    />
  );
}

export default Separator;
