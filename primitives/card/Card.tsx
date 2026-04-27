import type { CSSProperties, ReactNode } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type CardVariant = 'elevated' | 'outlined' | 'filled';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardShape = 'square' | 'default';

export interface CardProps {
  /** Visual variant */
  variant?: CardVariant;
  /** Internal padding */
  padding?: CardPadding;
  /** Border-radius shape */
  shape?: CardShape;
  /** Hover effects for clickable cards */
  interactive?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Card primitive.
 *
 * Surface container with variant, padding, and interactive states.
 */
export function Card({
  variant = 'outlined',
  padding = 'md',
  shape = 'default',
  interactive = false,
  skeleton = false,
  className = '',
  style,
  children,
}: CardProps) {
  if (skeleton) {
    return <Skeleton width="100%" height="12rem" shape={shape === 'square' ? 'square' : 'default'} className={className} style={style} />;
  }

  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    shape !== 'default' ? `card--${shape}` : '',
    interactive ? 'card--interactive' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}

export default Card;
