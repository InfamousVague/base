import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { x } from '../icon/icons/x.js';

// ---- Types ----

type ChipVariant = 'filled' | 'outlined';
type ChipSize = 'sm' | 'md';

export interface ChipProps {
  /** Chip content */
  children: ReactNode;
  /** Visual variant */
  variant?: ChipVariant;
  /** Chip size */
  size?: ChipSize;
  /** Leading icon — SVG innerHTML string */
  icon?: string;
  /** Leading color dot — CSS color value (e.g. '#ff0000' or 'var(--color-error)') */
  dot?: string;
  /** Callback to dismiss — shows X button when provided */
  onDismiss?: () => void;
  /** Click handler — makes chip interactive */
  onClick?: () => void;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const ICON_SIZE_MAP = { sm: 'xs', md: 'sm' } as const;

/**
 * Chip primitive.
 *
 * A dismissible, interactive tag/chip component.
 */
export function Chip({
  children,
  variant = 'filled',
  size = 'md',
  icon,
  dot,
  onDismiss,
  onClick,
  selected = false,
  disabled = false,
  skeleton: isSkeleton = false,
  className = '',
  style,
}: ChipProps) {
  if (isSkeleton) {
    return <Skeleton size="xs" shape="pill" className={className} style={style} />;
  }

  const isClickable = !!onClick;

  const classes = [
    'chip',
    `chip--${variant}`,
    `chip--${size}`,
    isClickable ? 'chip--clickable' : '',
    selected ? 'chip--selected' : '',
    disabled ? 'chip--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const Tag = isClickable ? 'button' : 'span';

  return (
    <Tag
      className={classes}
      style={style}
      onClick={isClickable ? onClick : undefined}
      disabled={isClickable ? disabled : undefined}
      type={isClickable ? 'button' : undefined}
    >
      {dot && <span className="chip__dot" style={{ backgroundColor: dot }} />}
      {!dot && icon && <Icon icon={icon} size={ICON_SIZE_MAP[size]} />}
      {children}
      {onDismiss && (
        <button
          className="chip__dismiss"
          type="button"
          onClick={(e) => { e.stopPropagation(); onDismiss(); }}
          aria-label="Dismiss"
          disabled={disabled}
        >
          <Icon icon={x} size="xs" />
        </button>
      )}
    </Tag>
  );
}

export default Chip;
