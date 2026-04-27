import type { CSSProperties } from 'react';

// ---- Types ----

type ShapeToken = 'square' | 'default' | 'pill' | 'circle';

type TextSize = 'text-xs' | 'text-sm' | 'text-base' | 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl' | 'text-4xl';
type GenericSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ComponentSize = 'button' | 'button-sm' | 'button-lg' | 'avatar-sm' | 'avatar' | 'avatar-lg' | 'icon';

type SkeletonSize = TextSize | GenericSize | ComponentSize;

export interface SkeletonProps {
  /** Size preset — text scale, generic, or component-specific */
  size?: SkeletonSize;
  /** Shape: square (0), default (radius-md), pill (9999px), circle (50%) */
  shape?: ShapeToken;
  /** Override width (CSS value, e.g. '100%', '12rem', 200) */
  width?: string | number;
  /** Override height (CSS value) */
  height?: string | number;
  /** Stretch to 100% of parent width */
  full?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Accessible label for screen readers */
  'aria-label'?: string;
}

/**
 * Base skeleton primitive.
 *
 * Renders a shimmer-animated placeholder that matches the exact size
 * and shape of the content it replaces. Uses CSS tokens for colors
 * and shapes, supports RTL shimmer direction, and degrades to a
 * gentle pulse under prefers-reduced-motion.
 */
export function Skeleton({
  size,
  shape,
  width,
  height,
  full = false,
  className = '',
  style,
  'aria-label': ariaLabel = 'Loading...',
  ...rest
}: SkeletonProps) {
  const classes = [
    'skeleton',
    size ? `skeleton--${size}` : '',
    shape ? `skeleton--${shape}` : '',
    full ? 'skeleton--full' : '',
    className,
  ].filter(Boolean).join(' ');

  const inlineStyle: CSSProperties = { ...style };
  if (width !== undefined) inlineStyle.width = typeof width === 'number' ? `${width}px` : width;
  if (height !== undefined) inlineStyle.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={classes}
      style={Object.keys(inlineStyle).length > 0 ? inlineStyle : undefined}
      role="status"
      aria-label={ariaLabel}
      aria-busy="true"
      {...rest}
    />
  );
}

export default Skeleton;
