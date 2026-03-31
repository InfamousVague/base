import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Text } from '../text/Text.js';

export interface FormFieldProps {
  /** Label text */
  label?: string;
  /** Hint text shown below the input */
  hint?: string;
  /** Error message (replaces hint when present) */
  error?: string;
  /** Show required indicator */
  required?: boolean;
  /** Associates label with input via htmlFor */
  htmlFor?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * FormField primitive.
 *
 * Wraps form controls with label, hint, and error messaging.
 */
export function FormField({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  className = '',
  style,
  children,
}: FormFieldProps) {
  const classes = ['form-field', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {label && (
        <label className="form-field__label" htmlFor={htmlFor}>
          <Text as="span" size="sm" weight="medium" color="primary">
            {label}
          </Text>
          {required && (
            <span className="form-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children}
      {error ? (
        <Text as="span" size="xs" color="error">
          {error}
        </Text>
      ) : hint ? (
        <Text as="span" size="xs" color="tertiary">
          {hint}
        </Text>
      ) : null}
    </div>
  );
}

export default FormField;
