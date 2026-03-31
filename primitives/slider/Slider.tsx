import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type SliderSize = 'sm' | 'md';

export interface SliderProps {
  /** Current value */
  value: number;
  /** Called when value changes */
  onChange: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Track/thumb size */
  size?: SliderSize;
  /** Disabled state */
  disabled?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Slider — range input primitive.
 *
 * Renders a styled track + thumb over a hidden native range input.
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  disabled = false,
  skeleton = false,
  className = '',
  style,
}: SliderProps) {
  if (skeleton) {
    return <Skeleton width="100%" height="0.5rem" shape="pill" className={className} style={style} />;
  }

  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const classes = [
    'slider',
    `slider--${size}`,
    disabled ? 'slider--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className={classes} style={style}>
      <div className="slider__track">
        <div className="slider__fill" style={{ width: `${percent}%` }} />
        <div className="slider__thumb" style={{ left: `${percent}%` }} />
      </div>
      <input
        className="slider__input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

export default Slider;
