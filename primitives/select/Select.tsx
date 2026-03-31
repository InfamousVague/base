import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { chevronDown } from '../icon/icons/chevron-down.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { Spinner } from '../spinner/Spinner.js';

// ---- Types ----

type SelectSize = 'sm' | 'md' | 'lg';
type SelectVariant = 'outline' | 'filled' | 'ghost';
type SelectShape = 'square' | 'default' | 'pill';
type SelectIntent = 'error' | 'warning' | 'success' | 'info';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'style' | 'size'> {
  /** Size with corresponding padding/radius */
  size?: SelectSize;
  /** Visual variant */
  variant?: SelectVariant;
  /** Border-radius shape */
  shape?: SelectShape;
  /** Status intent */
  intent?: SelectIntent;
  /** Loading state — shows a spinner replacing the chevron */
  loading?: boolean;
  /** Placeholder option text */
  placeholder?: string;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

const ICON_SIZE_MAP = { sm: 'sm', md: 'base', lg: 'lg' } as const;
const SPINNER_SIZE_MAP: Record<SelectSize, 'sm' | 'md' | 'lg'> = { sm: 'sm', md: 'sm', lg: 'md' };

/**
 * Select primitive.
 *
 * Native select with custom visual styling matching Input sizes.
 */
export function Select({
  size = 'md',
  variant = 'outline',
  shape = 'default',
  intent,
  loading = false,
  placeholder,
  skeleton = false,
  className = '',
  style,
  disabled,
  children,
  ...rest
}: SelectProps) {
  if (skeleton) {
    return <Skeleton size={size === 'sm' ? 'button-sm' : size === 'lg' ? 'button-lg' : 'button'} full shape={shape === 'pill' ? 'pill' : 'default'} className={className} style={style} />;
  }

  const wrapperClasses = [
    'select-wrapper',
    `select-wrapper--${size}`,
    `select-wrapper--${variant}`,
    shape !== 'default' ? `select-wrapper--${shape}` : '',
    intent ? `select-wrapper--${intent}` : '',
    disabled ? 'select-wrapper--disabled' : '',
    loading ? 'select-wrapper--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} style={style}>
      <select
        className="select"
        disabled={disabled}
        required={placeholder ? true : undefined}
        defaultValue={placeholder && !rest.value && !rest.defaultValue ? '' : rest.defaultValue}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {children}
      </select>
      <span className="select-wrapper__icon">
        {loading ? (
          <Spinner size={SPINNER_SIZE_MAP[size]} />
        ) : (
          <Icon icon={chevronDown} size={ICON_SIZE_MAP[size]} />
        )}
      </span>
    </div>
  );
}

export default Select;
