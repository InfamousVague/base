import React from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { Spinner } from '../spinner/Spinner.js';
import { check } from '../icon/icons/check.js';
import { alertTriangle } from '../icon/icons/alert-triangle.js';
import { info } from '../icon/icons/info.js';
import { circleX } from '../icon/icons/circle-x.js';

// ---- Types ----

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'outline' | 'filled' | 'ghost';
type InputIntent = 'error' | 'warning' | 'success' | 'info';
type InputShape = 'square' | 'default' | 'pill';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'size'> {
  /** Size with corresponding padding/radius */
  size?: InputSize;
  /** Visual variant */
  variant?: InputVariant;
  /** Border-radius shape */
  shape?: InputShape;
  /** Status intent */
  intent?: InputIntent;
  /** Loading state — shows a spinner replacing the right icon */
  loading?: boolean;
  /** Leading icon — SVG innerHTML string */
  iconLeft?: string;
  /** Trailing icon — SVG innerHTML string */
  iconRight?: string;
  /** Callback to clear the input — shows a clear button when value is non-empty */
  onClear?: () => void;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const ICON_SIZE_MAP = { sm: 'sm', md: 'base', lg: 'lg' } as const;
const SPINNER_SIZE_MAP: Record<InputSize, 'sm' | 'md' | 'lg'> = { sm: 'sm', md: 'sm', lg: 'md' };

/**
 * Input primitive.
 *
 * Styled text input with size/variant system matching Button sizes.
 */
export function Input({
  size = 'md',
  variant = 'outline',
  shape = 'default',
  intent,
  loading = false,
  iconLeft,
  iconRight,
  onClear,
  skeleton = false,
  className = '',
  style,
  disabled,
  readOnly,
  value,
  ...rest
}: InputProps) {
  if (skeleton) {
    return <Skeleton size={size === 'sm' ? 'button-sm' : size === 'lg' ? 'button-lg' : 'button'} full shape={shape === 'pill' ? 'pill' : 'default'} className={className} style={style} />;
  }

  const wrapperClasses = [
    'input-wrapper',
    `input-wrapper--${size}`,
    `input-wrapper--${variant}`,
    shape !== 'default' ? `input-wrapper--${shape}` : '',
    intent ? `input-wrapper--${intent}` : '',
    disabled ? 'input-wrapper--disabled' : '',
    readOnly ? 'input-wrapper--readonly' : '',
    loading ? 'input-wrapper--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  // Determine if clear button should show
  const hasValue = value !== undefined && value !== null && String(value).length > 0;
  const showClear = onClear && hasValue && !disabled && !readOnly && !loading;

  // Determine right-side content priority: loading > clear > iconRight > intent
  const rightContent = loading ? (
    <span className="input-wrapper__icon">
      <Spinner size={SPINNER_SIZE_MAP[size]} />
    </span>
  ) : showClear ? (
    <button
      type="button"
      className="input-wrapper__clear"
      onClick={onClear}
      aria-label="Clear"
      tabIndex={-1}
    >
      <Icon icon={circleX} size={ICON_SIZE_MAP[size]} />
    </button>
  ) : iconRight ? (
    <span className="input-wrapper__icon">
      <Icon icon={iconRight} size={ICON_SIZE_MAP[size]} />
    </span>
  ) : intent && !iconRight ? (
    <span className={`input-wrapper__icon input-wrapper__icon--${intent}`}>
      <Icon icon={intent === 'success' ? check : intent === 'error' || intent === 'warning' ? alertTriangle : info} size={ICON_SIZE_MAP[size]} />
    </span>
  ) : null;

  return (
    <div className={wrapperClasses} style={style}>
      {iconLeft && (
        <span className="input-wrapper__icon">
          <Icon icon={iconLeft} size={ICON_SIZE_MAP[size]} />
        </span>
      )}
      <input className="input" disabled={disabled} readOnly={readOnly} value={value} {...rest} />
      {rightContent}
    </div>
  );
}

export default Input;
