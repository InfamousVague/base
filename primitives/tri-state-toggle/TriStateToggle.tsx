import type { CSSProperties } from 'react';

export type TriStateValue = 'allow' | 'unspecified' | 'deny';
export type TriStateSize = 'sm' | 'md' | 'lg';

export interface TriStateToggleProps {
  /** Current value */
  value: TriStateValue;
  /** Callback when value changes */
  onChange: (value: TriStateValue) => void;
  /** Component size */
  size?: TriStateSize;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

const STATES: TriStateValue[] = ['allow', 'unspecified', 'deny'];

export function TriStateToggle({
  value,
  onChange,
  size = 'md',
  disabled = false,
  className = '',
  style,
}: TriStateToggleProps) {
  const classes = [
    'tri-state',
    `tri-state--${size}`,
    disabled ? 'tri-state--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} role="radiogroup" aria-label="Connection rule">
      {STATES.map((state) => (
        <button
          key={state}
          className={`tri-state__btn tri-state__btn--${state}${value === state ? ' tri-state__btn--active' : ''}`}
          onClick={() => !disabled && onChange(state)}
          disabled={disabled}
          role="radio"
          aria-checked={value === state}
          aria-label={state}
          title={state.charAt(0).toUpperCase() + state.slice(1)}
        >
          {state === 'allow' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {state === 'unspecified' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 6H9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          )}
          {state === 'deny' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      ))}
    </div>
  );
}
