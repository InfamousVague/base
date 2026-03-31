import React, { useState, useCallback, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { RadioGroupContext } from './RadioContext.js';

// ---- Types ----

type RadioGroupSize = 'sm' | 'md' | 'lg';
type RadioGroupDirection = 'horizontal' | 'vertical';

export interface RadioGroupProps {
  /** Controlled value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Size of all radios in the group */
  size?: RadioGroupSize;
  /** Layout direction */
  direction?: RadioGroupDirection;
  /** HTML name attribute for the radio group */
  name?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * RadioGroup primitive.
 *
 * Manages state and provides context for a group of Radio buttons.
 */
export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'md',
  direction = 'vertical',
  name,
  className = '',
  style,
  children,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback((val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  }, [isControlled, onChange]);

  const ctx = useMemo(() => ({
    name,
    value: currentValue,
    onChange: handleChange,
    size,
  }), [name, currentValue, handleChange, size]);

  const classes = [
    'radio-group',
    `radio-group--${direction}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <RadioGroupContext.Provider value={ctx}>
      <div className={classes} style={style} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export default RadioGroup;
