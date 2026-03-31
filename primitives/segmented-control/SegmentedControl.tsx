import React, { useRef, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

// ---- Types ----

type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Options to display */
  options: SegmentedControlOption[];
  /** Currently selected value */
  value: string;
  /** Called when selection changes */
  onChange: (value: string) => void;
  /** Size preset */
  size?: SegmentedControlSize;
  /** Use monospace font for labels */
  mono?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * SegmentedControl primitive.
 *
 * A pill-shaped group of options with an animated sliding indicator
 * that moves to the selected option. Commonly used for view toggles,
 * filter selectors, and mode switchers.
 */
export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'sm',
  mono = false,
  className = '',
  style,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({});

  // Measure the active button and position the sliding indicator
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = options.findIndex(o => o.value === value);
    if (activeIndex === -1) return;

    const buttons = container.querySelectorAll<HTMLButtonElement>('.seg__option');
    const activeBtn = buttons[activeIndex];
    if (!activeBtn) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    setIndicatorStyle({
      width: btnRect.width,
      left: btnRect.left - containerRect.left,
    });
  }, [value, options]);

  const classes = [
    'seg',
    `seg--${size}`,
    mono ? 'seg--mono' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={classes} style={style} role="radiogroup">
      <div className="seg__indicator" style={indicatorStyle} />
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={opt.disabled}
            className={`seg__option ${isActive ? 'seg__option--active' : ''}`}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
