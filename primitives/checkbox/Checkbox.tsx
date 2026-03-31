import React, { useRef, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'size' | 'type'> {
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Optional label text */
  label?: string;
  /** Indeterminate (mixed) state */
  indeterminate?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

// Inline SVG paths from the Lucide icon set for consistency
const CHECK_PATH = 'M6 12l4 4 8-8';
const MINUS_PATH = 'M6 12h12';

const ICON_VIEWBOX = '0 0 24 24';
const ICON_SIZE_MAP: Record<CheckboxSize, string> = { sm: '10', md: '12', lg: '14' };

/**
 * Checkbox primitive.
 *
 * Checkbox input with optional label. The check icon animates in
 * via stroke-dashoffset when toggled on, and the control box
 * bounces with a scale transform.
 */
export function Checkbox({
  size = 'md',
  label,
  indeterminate = false,
  skeleton = false,
  className = '',
  style,
  onChange,
  ...rest
}: CheckboxProps) {
  if (skeleton) {
    return <Skeleton size="xs" shape="default" className={className} style={style} />;
  }

  const inputRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Animate the check/minus stroke on change
  const animateCheck = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const path = svg.querySelector('path');
    if (!path) return;
    try {
      const len = path.getTotalLength();
      // Reset to hidden
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = 'none';
      // Force reflow
      path.getBoundingClientRect();
      // Animate in
      path.style.transition = 'stroke-dashoffset 250ms cubic-bezier(0, 0, 0.2, 1)';
      path.style.strokeDashoffset = '0';
    } catch { /* skip */ }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      animateCheck();
    }
    onChange?.(e);
  }, [onChange, animateCheck]);

  const iconSize = ICON_SIZE_MAP[size];

  const classes = [
    'checkbox',
    `checkbox--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={classes} style={style}>
      <input
        ref={inputRef}
        type="checkbox"
        className="checkbox__input"
        onChange={handleChange}
        {...rest}
      />
      <span className="checkbox__control">
        <svg
          ref={svgRef}
          className="checkbox__icon"
          width={iconSize}
          height={iconSize}
          viewBox={ICON_VIEWBOX}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={indeterminate ? MINUS_PATH : CHECK_PATH} />
        </svg>
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
}

export default Checkbox;
