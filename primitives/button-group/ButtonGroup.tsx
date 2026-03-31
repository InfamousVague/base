import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type ButtonGroupOrientation = 'horizontal' | 'vertical';
type ButtonGroupSize = 'sm' | 'md' | 'lg';

export interface ButtonGroupProps {
  /** Button elements to group */
  children: ReactNode;
  /** Layout direction */
  orientation?: ButtonGroupOrientation;
  /** Size override for child buttons */
  size?: ButtonGroupSize;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * ButtonGroup primitive.
 *
 * Wraps Button children, connecting their borders so they form a continuous group.
 * Middle buttons lose their intermediate border-radii.
 */
export function ButtonGroup({
  children,
  orientation = 'horizontal',
  size,
  className = '',
  style,
}: ButtonGroupProps) {
  const classes = [
    'button-group',
    orientation === 'vertical' ? 'button-group--vertical' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} role="group">
      {children}
    </div>
  );
}

export default ButtonGroup;
