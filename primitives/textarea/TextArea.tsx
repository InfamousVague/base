import React, { useRef, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type TextAreaSize = 'sm' | 'md' | 'lg';
type TextAreaVariant = 'outline' | 'filled' | 'ghost';
type TextAreaIntent = 'error' | 'warning' | 'success' | 'info';
type TextAreaShape = 'square' | 'default';

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'> {
  /** Size with corresponding padding/radius */
  size?: TextAreaSize;
  /** Visual variant */
  variant?: TextAreaVariant;
  /** Border-radius shape */
  shape?: TextAreaShape;
  /** Status intent */
  intent?: TextAreaIntent;
  /** Auto-resize textarea to fit content */
  autoResize?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * TextArea primitive.
 *
 * Multi-line text input with size/variant system matching Input.
 */
export function TextArea({
  size = 'md',
  variant = 'outline',
  shape = 'default',
  intent,
  autoResize = false,
  skeleton = false,
  className = '',
  style,
  disabled,
  readOnly,
  ...rest
}: TextAreaProps) {
  if (skeleton) {
    return <Skeleton width="100%" height="5rem" shape="default" className={className} style={style} />;
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el || !autoResize) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize]);

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, rest.value, rest.defaultValue]);

  useEffect(() => {
    if (!autoResize) return;
    const el = textareaRef.current;
    if (!el) return;
    const handler = () => adjustHeight();
    el.addEventListener('input', handler);
    return () => el.removeEventListener('input', handler);
  }, [autoResize, adjustHeight]);

  const wrapperClasses = [
    'textarea-wrapper',
    `textarea-wrapper--${size}`,
    `textarea-wrapper--${variant}`,
    shape !== 'default' ? `textarea-wrapper--${shape}` : '',
    intent ? `textarea-wrapper--${intent}` : '',
    disabled ? 'textarea-wrapper--disabled' : '',
    readOnly ? 'textarea-wrapper--readonly' : '',
    className,
  ].filter(Boolean).join(' ');

  const textareaClasses = [
    'textarea',
    autoResize ? 'textarea--auto-resize' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} style={style}>
      <textarea
        ref={textareaRef}
        className={textareaClasses}
        disabled={disabled}
        readOnly={readOnly}
        {...rest}
      />
    </div>
  );
}

export default TextArea;
