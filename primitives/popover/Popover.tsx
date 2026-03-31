import React, { useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps {
  /** The trigger element */
  trigger: ReactNode;
  /** The popover content */
  content: ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Placement relative to trigger */
  placement?: PopoverPlacement;
  /** Alignment along the placement axis */
  align?: PopoverAlign;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Popover primitive.
 *
 * Floating content panel anchored to a trigger element.
 */
export function Popover({
  trigger,
  content,
  open,
  onOpenChange,
  placement = 'bottom',
  align = 'start',
  className = '',
  style,
}: PopoverProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [internalOpen, setInternalOpen] = React.useState(false);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const handleTriggerClick = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setOpen]);

  const wrapperClasses = ['popover', className].filter(Boolean).join(' ');

  const contentClasses = [
    'popover__content',
    `popover__content--${placement}`,
    `popover__content--${align}`,
    isOpen ? 'popover__content--open' : '',
  ].filter(Boolean).join(' ');

  return (
    <span ref={wrapperRef} className={wrapperClasses} style={style}>
      <span className="popover__trigger" onClick={handleTriggerClick}>
        {trigger}
      </span>
      {isOpen && (
        <div className={contentClasses}>
          {content}
        </div>
      )}
    </span>
  );
}

export default Popover;
