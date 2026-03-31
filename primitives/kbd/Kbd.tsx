import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type KbdSize = 'sm' | 'md';

export interface KbdProps {
  /** The key text to display (e.g. "Cmd", "K", "Shift") */
  children: ReactNode;
  /** Size variant */
  size?: KbdSize;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Kbd primitive.
 *
 * Renders an inline keyboard key cap indicator.
 */
export function Kbd({
  children,
  size = 'md',
  className = '',
  style,
}: KbdProps) {
  const classes = [
    'kbd',
    `kbd--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <kbd className={classes} style={style}>
      {children}
    </kbd>
  );
}

export default Kbd;
