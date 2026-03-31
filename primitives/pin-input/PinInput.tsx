import React, { useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type PinInputSize = 'sm' | 'md' | 'lg';

export interface PinInputProps {
  /** Number of input boxes */
  length?: number;
  /** Current value */
  value: string;
  /** Callback when value changes */
  onChange: (value: string) => void;
  /** Input type */
  type?: 'text' | 'number';
  /** Mask input with dots */
  mask?: boolean;
  /** Input size */
  size?: PinInputSize;
  /** Show error state */
  error?: boolean;
  /** Disable input */
  disabled?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const SIZE_WIDTH_MAP = { sm: '2rem', md: '2.5rem', lg: '3rem' } as const;

/**
 * PinInput primitive.
 *
 * Multi-digit code entry with auto-focus and paste support.
 */
export function PinInput({
  length = 6,
  value,
  onChange,
  type = 'number',
  mask = false,
  size = 'md',
  error = false,
  disabled = false,
  skeleton: isSkeleton = false,
  className = '',
  style,
}: PinInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (isSkeleton) {
    return (
      <div className={`pin-input pin-input--${size} ${className}`.trim()} style={style}>
        {Array.from({ length }, (_, i) => (
          <Skeleton key={i} shape="default" width={SIZE_WIDTH_MAP[size]} height={SIZE_WIDTH_MAP[size]} />
        ))}
      </div>
    );
  }

  const chars = value.split('');

  const classes = [
    'pin-input',
    `pin-input--${size}`,
    error ? 'pin-input--error' : '',
    disabled ? 'pin-input--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleChange = useCallback((index: number, inputValue: string) => {
    if (type === 'number' && inputValue && !/^\d$/.test(inputValue)) return;

    const newChars = value.split('');
    newChars[index] = inputValue;
    const newValue = newChars.join('').slice(0, length);
    onChange(newValue);

    if (inputValue && index < length - 1) {
      focusInput(index + 1);
    }
  }, [value, onChange, length, type]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!chars[index] && index > 0) {
        focusInput(index - 1);
        const newChars = value.split('');
        newChars[index - 1] = '';
        onChange(newChars.join(''));
      } else {
        const newChars = value.split('');
        newChars[index] = '';
        onChange(newChars.join(''));
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      focusInput(index + 1);
    }
  }, [chars, value, onChange, length]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').slice(0, length);
    if (type === 'number' && !/^\d*$/.test(pasted)) return;
    onChange(pasted);
    const targetIndex = Math.min(pasted.length, length - 1);
    focusInput(targetIndex);
  }, [onChange, length, type]);

  return (
    <div className={classes} style={style}>
      {Array.from({ length }, (_, i) => {
        const filled = !!chars[i];
        const fieldClasses = [
          'pin-input__field',
          filled ? 'pin-input__field--filled' : '',
        ].filter(Boolean).join(' ');

        return (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            className={fieldClasses}
            type={mask ? 'password' : type === 'number' ? 'text' : type}
            inputMode={type === 'number' ? 'numeric' : 'text'}
            pattern={type === 'number' ? '[0-9]*' : undefined}
            maxLength={1}
            value={chars[i] || ''}
            disabled={disabled}
            autoComplete="one-time-code"
            aria-label={`Pin digit ${i + 1} of ${length}`}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            onFocus={(e) => e.target.select()}
          />
        );
      })}
    </div>
  );
}

export default PinInput;
