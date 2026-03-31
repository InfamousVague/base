import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type SpacingToken = '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps {
  /** Max-width preset */
  size?: ContainerSize;
  /** Horizontal padding */
  paddingX?: SpacingToken;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Container primitive.
 *
 * Centered max-width container with horizontal padding.
 */
export function Container({
  size = 'lg',
  paddingX = '4',
  className = '',
  style,
  children,
}: ContainerProps) {
  const classes = [
    'container',
    `container--${size}`,
    paddingX ? `container--px-${paddingX}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

export default Container;
