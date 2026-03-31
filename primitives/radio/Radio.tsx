import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';
import { useRadioGroupContext } from './RadioContext.js';

// ---- Types ----

type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'size' | 'type'> {
  /** Size of the radio */
  size?: RadioSize;
  /** Optional label text */
  label?: string;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Radio primitive.
 *
 * Radio button input with optional label. Designed to be used
 * inside a RadioGroup for managed state.
 */
export function Radio({
  size = 'md',
  label,
  skeleton = false,
  className = '',
  style,
  value,
  checked,
  onChange,
  name,
  ...rest
}: RadioProps) {
  if (skeleton) {
    return <Skeleton size="xs" shape="circle" className={className} style={style} />;
  }

  const group = useRadioGroupContext();

  const resolvedSize = group?.size ?? size;
  const resolvedName = group?.name ?? name;
  const resolvedChecked = group ? group.value === value : checked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (group?.onChange && value !== undefined) {
      group.onChange(String(value));
    }
    onChange?.(e);
  };

  const classes = [
    'radio',
    `radio--${resolvedSize}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={classes} style={style}>
      <input
        type="radio"
        className="radio__input"
        name={resolvedName}
        value={value}
        checked={resolvedChecked}
        onChange={handleChange}
        {...rest}
      />
      <span className="radio__control" />
      {label && <span className="radio__label">{label}</span>}
    </label>
  );
}

export default Radio;
