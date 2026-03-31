import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';

// ---- Types ----

export interface ListItemProps {
  /** Leading icon — SVG innerHTML string */
  icon?: string;
  /** Primary label text */
  label: string;
  /** Secondary description text */
  description?: string;
  /** Trailing content (badge, switch, kbd, etc.) */
  trailing?: ReactNode;
  /** Active state (e.g. keyboard-focused) */
  active?: boolean;
  /** Selected state */
  selected?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler — renders as interactive element */
  onClick?: () => void;
  /** Link href — renders as anchor */
  href?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * ListItem primitive.
 *
 * Reusable list item for menus, result lists, and settings.
 * Renders as an anchor when href is provided, otherwise a div.
 */
export function ListItem({
  icon,
  label,
  description,
  trailing,
  active = false,
  selected = false,
  disabled = false,
  onClick,
  href,
  className = '',
  style,
}: ListItemProps) {
  const classes = [
    'list-item',
    active ? 'list-item--active' : '',
    selected ? 'list-item--selected' : '',
    disabled ? 'list-item--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && (
        <span className="list-item__icon">
          <Icon icon={icon} size="sm" />
        </span>
      )}
      <span className="list-item__content">
        <span className="list-item__label">{label}</span>
        {description && <span className="list-item__description">{description}</span>}
      </span>
      {trailing && <span className="list-item__trailing">{trailing}</span>}
    </>
  );

  if (href) {
    return (
      <a className={classes} style={style} href={href}>
        {content}
      </a>
    );
  }

  return (
    <div
      className={classes}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={!disabled ? onClick : undefined}
    >
      {content}
    </div>
  );
}

export default ListItem;
