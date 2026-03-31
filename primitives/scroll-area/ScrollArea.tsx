import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type ScrollDirection = 'vertical' | 'horizontal' | 'both';

export interface ScrollAreaProps {
  /** Maximum height (CSS value) */
  maxHeight?: string | number;
  /** Scroll direction */
  direction?: ScrollDirection;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * ScrollArea primitive.
 *
 * Scrollable container with styled scrollbars.
 */
export function ScrollArea({
  maxHeight,
  direction = 'vertical',
  className = '',
  style,
  children,
}: ScrollAreaProps) {
  const classes = [
    'scroll-area',
    `scroll-area--${direction}`,
    className,
  ].filter(Boolean).join(' ');

  const scrollStyle: CSSProperties = { ...style };
  if (maxHeight !== undefined) {
    scrollStyle.maxHeight = maxHeight;
  }

  return (
    <div className={classes} style={scrollStyle}>
      {children}
    </div>
  );
}

export default ScrollArea;
