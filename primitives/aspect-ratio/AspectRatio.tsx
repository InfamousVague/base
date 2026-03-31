import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

export interface AspectRatioProps {
  /** Aspect ratio as CSS aspect-ratio value (e.g. "16/9", "1/1") */
  ratio?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * AspectRatio primitive.
 *
 * Constrains children to a given aspect ratio.
 */
export function AspectRatio({
  ratio = '1/1',
  className = '',
  style,
  children,
}: AspectRatioProps) {
  const classes = ['aspect-ratio', className].filter(Boolean).join(' ');

  const ratioStyle: CSSProperties = {
    ...style,
    aspectRatio: ratio,
  };

  return (
    <div className={classes} style={ratioStyle}>
      {children}
    </div>
  );
}

export default AspectRatio;
