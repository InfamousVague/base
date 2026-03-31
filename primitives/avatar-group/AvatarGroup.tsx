import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type AvatarGroupSize = 'sm' | 'md' | 'lg';

export interface AvatarGroupProps {
  /** Avatar components to render */
  children: ReactNode;
  /** Maximum visible avatars before showing overflow count */
  max?: number;
  /** Size of the overflow indicator (should match avatar sizes) */
  size?: AvatarGroupSize;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const SKELETON_COUNT = 3;

/**
 * AvatarGroup — overlapping avatar stack.
 *
 * Renders Avatar children overlapping with negative margin.
 * Shows a "+N" overflow indicator when children exceed max.
 */
export function AvatarGroup({
  children,
  max = 5,
  size = 'md',
  skeleton = false,
  className = '',
  style,
}: AvatarGroupProps) {
  if (skeleton) {
    const skeletonSize = size === 'sm' ? 'avatar-sm' : size === 'lg' ? 'avatar-lg' : 'avatar';
    return (
      <div className={`avatar-group avatar-group--${size} ${className}`.trim()} style={style}>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <Skeleton key={i} size={skeletonSize} shape="circle" />
        ))}
      </div>
    );
  }

  const childArray = React.Children.toArray(children);
  const visibleCount = Math.min(childArray.length, max);
  const overflowCount = childArray.length - visibleCount;
  const visible = childArray.slice(0, visibleCount);

  const classes = [
    'avatar-group',
    `avatar-group--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {overflowCount > 0 && (
        <span className={`avatar-group__overflow avatar-group__overflow--${size}`}>
          +{overflowCount}
        </span>
      )}
      {[...visible].reverse().map((child, index) => (
        <React.Fragment key={index}>{child}</React.Fragment>
      ))}
    </div>
  );
}

export default AvatarGroup;
