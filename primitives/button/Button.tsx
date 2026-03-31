import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { Spinner } from '../spinner/Spinner.js';

// ---- Types ----

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonIntent = 'error' | 'warning' | 'success' | 'info';
type ButtonAppearance = 'solid' | 'subtle' | 'outline';
type ButtonShape = 'square' | 'default' | 'pill';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'style'> {
  /** Base visual style */
  variant?: ButtonVariant;
  /** Size with corresponding padding/radius */
  size?: ButtonSize;
  /** Status intent (overrides variant color) */
  intent?: ButtonIntent;
  /** How the intent color is applied */
  appearance?: ButtonAppearance;
  /** Border-radius shape */
  shape?: ButtonShape;
  /** Leading icon — SVG innerHTML string */
  icon?: string;
  /** Icon-only button (square aspect ratio) */
  iconOnly?: boolean;
  /** Show loading spinner in the icon slot, disables the button */
  loading?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

const ICON_SIZE_MAP = { sm: 'sm', md: 'base', lg: 'lg' } as const;

function buildIntentClass(intent: ButtonIntent, appearance: ButtonAppearance): string {
  if (appearance === 'solid') return `btn--${intent}`;
  return `btn--${intent}-${appearance}`;
}

/**
 * Button primitive.
 *
 * Supports structural variants, status intents, and sizes.
 */
const SPINNER_SIZE_MAP = { sm: 'sm', md: 'sm', lg: 'md' } as const;

export function Button({
  variant = 'primary',
  size = 'md',
  intent,
  appearance = 'solid',
  shape = 'default',
  icon,
  iconOnly = false,
  loading = false,
  skeleton = false,
  className = '',
  style,
  children,
  ...rest
}: ButtonProps) {
  if (skeleton) {
    return <Skeleton size={size === 'sm' ? 'button-sm' : size === 'lg' ? 'button-lg' : 'button'} shape={shape === 'pill' ? 'pill' : 'default'} className={className} style={style} />;
  }

  const classes = [
    'btn',
    `btn--${size}`,
    intent ? buildIntentClass(intent, appearance) : `btn--${variant}`,
    shape !== 'default' ? `btn--${shape}` : '',
    iconOnly ? 'btn--icon-only' : '',
    loading ? 'btn--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  const leadingEl = loading
    ? <Spinner size={SPINNER_SIZE_MAP[size]} />
    : icon
      ? <Icon icon={icon} size={ICON_SIZE_MAP[size]} />
      : null;

  return (
    <button className={classes} style={style} disabled={loading || rest.disabled} {...rest}>
      {leadingEl}
      {children}
    </button>
  );
}

export default Button;
