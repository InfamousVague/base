import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type SpacingToken = '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';
type StackDirection = 'horizontal' | 'vertical';
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps {
  /** Flex direction */
  direction?: StackDirection;
  /** Gap between children */
  gap?: SpacingToken;
  /** Cross-axis alignment */
  align?: StackAlign;
  /** Main-axis justification */
  justify?: StackJustify;
  /** Allow wrapping */
  wrap?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Stack primitive.
 *
 * Flexbox layout with direction, gap, alignment, and justification.
 */
export function Stack({
  direction = 'vertical',
  gap,
  align,
  justify,
  wrap,
  className = '',
  style,
  children,
}: StackProps) {
  const classes = [
    'stack',
    `stack--${direction}`,
    gap ? `stack--gap-${gap}` : '',
    align ? `stack--align-${align}` : '',
    justify ? `stack--justify-${justify}` : '',
    wrap ? 'stack--wrap' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

/** Horizontal stack shorthand. */
export function HStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="horizontal" {...props} />;
}

/** Vertical stack shorthand. */
export function VStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="vertical" {...props} />;
}

export default Stack;
