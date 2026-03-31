import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface CenterProps {
  /** Use inline-flex instead of flex */
  inline?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Center primitive.
 *
 * Centers children both horizontally and vertically.
 */
export function Center({
  inline = false,
  className = '',
  style,
  children,
}: CenterProps) {
  const classes = [
    'center',
    inline ? 'center--inline' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

export default Center;
