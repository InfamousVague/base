import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type TagColor = 'neutral' | 'accent' | 'error' | 'warning' | 'success' | 'info';
type TagSize = 'sm' | 'md';

export interface TagProps {
  /** Tag content */
  children: ReactNode;
  /** Color */
  color?: TagColor;
  /** Size */
  size?: TagSize;
  /** Show remove button */
  removable?: boolean;
  /** Called when the remove button is clicked */
  onRemove?: () => void;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Show a colored dot before the label */
  dot?: boolean;
  /** Custom dot color (CSS color value) */
  dotColor?: string;
}

/**
 * Tag primitive.
 *
 * Simple styled keyword label. More minimal than Badge — uses radius-sm,
 * no variants (solid only with subtle bg).
 */
export function Tag({
  children,
  color = 'neutral',
  size = 'sm',
  removable = false,
  onRemove,
  skeleton = false,
  className = '',
  style,
  dot = false,
  dotColor,
}: TagProps) {
  if (skeleton) {
    return <Skeleton size="xs" shape="default" className={className} style={style} />;
  }

  const classes = [
    'tag',
    `tag--${size}`,
    `tag--${color}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} style={style}>
      {dot && <span className="tag__dot" style={dotColor ? { background: dotColor } : undefined} />}
      {children}
      {removable && (
        <button className="tag__remove" onClick={onRemove} aria-label="Remove" type="button">
          <Icon icon='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size="xs" />
        </button>
      )}
    </span>
  );
}

export default Tag;
