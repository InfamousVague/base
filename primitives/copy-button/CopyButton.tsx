import React, { useState, useCallback, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { copy } from '../icon/icons/copy.js';
import { check } from '../icon/icons/check.js';

// ---- Types ----

type CopyButtonSize = 'sm' | 'md';
type CopyButtonVariant = 'ghost' | 'secondary';

export interface CopyButtonProps {
  /** Text to copy to clipboard */
  text: string;
  /** Button size */
  size?: CopyButtonSize;
  /** Button variant */
  variant?: CopyButtonVariant;
  /** Label text */
  label?: string;
  /** Label shown after copy */
  copiedLabel?: string;
  /** Duration of "copied" state in ms */
  timeout?: number;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const ICON_SIZE_MAP = { sm: 'sm', md: 'base' } as const;

/**
 * CopyButton primitive.
 *
 * Click-to-copy with visual feedback.
 */
export function CopyButton({
  text,
  size = 'md',
  variant = 'ghost',
  label = 'Copy',
  copiedLabel = 'Copied',
  timeout = 2000,
  skeleton: isSkeleton = false,
  className = '',
  style,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  if (isSkeleton) {
    return <Skeleton size={size === 'sm' ? 'button-sm' : 'button'} className={className} style={style} />;
  }

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), timeout);
    } catch {
      // Clipboard API not available
    }
  }, [text, timeout]);

  const classes = [
    'btn',
    `btn--${size}`,
    `btn--${variant}`,
    'copy-btn',
    copied ? 'copy-btn--copied' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      style={style}
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
    >
      <Icon icon={copied ? check : copy} size={ICON_SIZE_MAP[size]} />
      {copied ? copiedLabel : label}
    </button>
  );
}

export default CopyButton;
