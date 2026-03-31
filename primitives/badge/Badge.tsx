import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type BadgeVariant = 'solid' | 'subtle' | 'outline';
type BadgeSize = 'sm' | 'md';
type BadgeColor = 'neutral' | 'accent' | 'error' | 'warning' | 'success' | 'info';
type BadgeShape = 'square' | 'default' | 'pill';

export interface BadgeProps {
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size */
  size?: BadgeSize;
  /** Color */
  color?: BadgeColor;
  /** Border-radius shape (default is pill) */
  shape?: BadgeShape;
  /** Optional leading icon — SVG innerHTML string */
  icon?: string;
  /** Render as a dot only (no text content) */
  dot?: boolean;
  /** Show a remove/close button */
  removable?: boolean;
  /** Called when the remove button is clicked */
  onRemove?: () => void;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

const ICON_SIZE_MAP = { sm: 'xs', md: 'sm' } as const;

/**
 * Badge primitive.
 *
 * Small label with color variants for status and categorization.
 */
export function Badge({
  variant = 'subtle',
  size = 'sm',
  color = 'neutral',
  shape = 'pill',
  icon,
  dot = false,
  removable = false,
  onRemove,
  skeleton = false,
  className = '',
  style,
  children,
}: BadgeProps) {
  if (skeleton) {
    return <Skeleton size="xs" shape={shape === 'square' ? 'square' : 'pill'} className={className} style={style} />;
  }

  const classes = [
    'badge',
    `badge--${size}`,
    `badge--${color}-${variant}`,
    shape !== 'pill' ? `badge--${shape}` : '',
    dot ? 'badge--dot' : '',
    className,
  ].filter(Boolean).join(' ');

  if (dot) {
    return <span className={classes} style={style} aria-label={typeof children === 'string' ? children : undefined} />;
  }

  const iconEl = icon ? <Icon icon={icon} size={ICON_SIZE_MAP[size]} /> : null;

  return (
    <span className={classes} style={style}>
      {iconEl}
      {children}
      {removable && (
        <button className="badge__remove" onClick={onRemove} aria-label="Remove" type="button">
          <Icon icon='<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' size="xs" />
        </button>
      )}
    </span>
  );
}

export default Badge;
