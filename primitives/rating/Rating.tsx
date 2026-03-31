import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { star } from '../icon/icons/star.js';

// ---- Types ----

type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /** Current rating value (0 to max) */
  value: number;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Maximum number of stars */
  max?: number;
  /** Star size */
  size?: RatingSize;
  /** Display only, no interaction */
  readOnly?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const ICON_SIZE_MAP = { sm: 'sm', md: 'lg', lg: 'xl' } as const;

/**
 * Rating primitive.
 *
 * A star rating component with interactive and read-only modes.
 */
export function Rating({
  value,
  onChange,
  max = 5,
  size = 'md',
  readOnly = false,
  skeleton: isSkeleton = false,
  className = '',
  style,
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  if (isSkeleton) {
    return (
      <div className={`rating rating--${size} ${className}`.trim()} style={style}>
        {Array.from({ length: max }, (_, i) => (
          <Skeleton key={i} shape="circle" width="1rem" height="1rem" />
        ))}
      </div>
    );
  }

  const isInteractive = !readOnly && !!onChange;
  const displayValue = hoverValue ?? value;

  const classes = [
    'rating',
    `rating--${size}`,
    readOnly ? 'rating--readonly' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={style}
      onMouseLeave={isInteractive ? () => setHoverValue(null) : undefined}
    >
      {Array.from({ length: max }, (_, i) => {
        const starIndex = i + 1;
        const filled = starIndex <= displayValue;
        const isHover = hoverValue !== null && starIndex <= hoverValue;

        const starClasses = [
          'rating__star',
          filled ? 'rating__star--filled' : '',
          isHover ? 'rating__star--hover' : '',
        ].filter(Boolean).join(' ');

        return (
          <span
            key={i}
            className={starClasses}
            onClick={isInteractive ? () => onChange(starIndex) : undefined}
            onMouseEnter={isInteractive ? () => setHoverValue(starIndex) : undefined}
            role={isInteractive ? 'button' : undefined}
            aria-label={isInteractive ? `Rate ${starIndex} of ${max}` : undefined}
          >
            <Icon icon={star} size={ICON_SIZE_MAP[size]} />
          </span>
        );
      })}
    </div>
  );
}

export default Rating;
