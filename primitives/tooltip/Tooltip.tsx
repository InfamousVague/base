import { useState, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Text content displayed in the tooltip */
  content: string;
  /** Placement relative to the trigger element */
  placement?: TooltipPlacement;
  /** Delay in ms before showing the tooltip */
  delay?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Tooltip primitive.
 *
 * Floating text shown on hover or focus of the wrapped element.
 */
export function Tooltip({
  content,
  placement = 'top',
  delay = 200,
  className = '',
  style,
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setVisible(false);
  }, []);

  const triggerClasses = [
    'tooltip-trigger',
    className,
  ].filter(Boolean).join(' ');

  const tooltipClasses = [
    'tooltip',
    `tooltip--${placement}`,
    visible ? 'tooltip--visible' : '',
  ].filter(Boolean).join(' ');

  return (
    <span
      className={triggerClasses}
      style={style}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <div className={tooltipClasses} role="tooltip">
        {content}
      </div>
    </span>
  );
}

export default Tooltip;
