import React from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { minus } from '../icon/icons/minus.js';
import { plus } from '../icon/icons/plus.js';

// ---- Types ----

type NumberInputSize = 'sm' | 'md' | 'lg';
type NumberInputVariant = 'outline' | 'filled' | 'ghost';

export interface NumberInputProps {
  /** Current value */
  value: number;
  /** Called when value changes */
  onChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Size with corresponding padding */
  size?: NumberInputSize;
  /** Visual variant */
  variant?: NumberInputVariant;
  /** Disabled state */
  disabled?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const ICON_SIZE_MAP = { sm: 'sm', md: 'base', lg: 'lg' } as const;

/**
 * NumberInput — numeric input with increment/decrement buttons.
 *
 * Layout: [-] input [+] with min/max clamping.
 */
export function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  size = 'md',
  variant = 'outline',
  disabled = false,
  skeleton = false,
  className = '',
  style,
}: NumberInputProps) {
  if (skeleton) {
    return <Skeleton size={size === 'sm' ? 'button-sm' : size === 'lg' ? 'button-lg' : 'button'} full className={className} style={style} />;
  }

  const atMin = min !== undefined && value <= min;
  const atMax = max !== undefined && value >= max;

  const handleDecrement = () => {
    const next = value - step;
    onChange(min !== undefined ? Math.max(min, next) : next);
  };

  const handleIncrement = () => {
    const next = value + step;
    onChange(max !== undefined ? Math.min(max, next) : next);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') return;
    let num = Number(raw);
    if (isNaN(num)) return;
    if (min !== undefined) num = Math.max(min, num);
    if (max !== undefined) num = Math.min(max, num);
    onChange(num);
  };

  const classes = [
    'number-input',
    `number-input--${size}`,
    variant !== 'outline' ? `number-input--${variant}` : '',
    disabled ? 'number-input--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <button
        className="number-input__btn"
        onClick={handleDecrement}
        disabled={disabled || atMin}
        type="button"
        aria-label="Decrement"
      >
        <Icon icon={minus} size={ICON_SIZE_MAP[size]} />
      </button>
      <input
        className="number-input__value"
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        aria-label="Number value"
      />
      <button
        className="number-input__btn"
        onClick={handleIncrement}
        disabled={disabled || atMax}
        type="button"
        aria-label="Increment"
      >
        <Icon icon={plus} size={ICON_SIZE_MAP[size]} />
      </button>
    </div>
  );
}

export default NumberInput;
