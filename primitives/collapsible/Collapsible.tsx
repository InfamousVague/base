import React, { useState, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { chevronDown } from '../icon/icons/chevron-down.js';

// ---- Types ----

export interface CollapsibleProps {
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Clickable header content */
  trigger: ReactNode;
  /** Collapsible body content */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Collapsible primitive.
 *
 * Single expandable/collapsible section with trigger and content.
 */
export function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  className = '',
  style,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  }, [isOpen, isControlled, onOpenChange]);

  const classes = ['collapsible', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <button
        type="button"
        className="collapsible__trigger"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <span>{trigger}</span>
        <Icon icon={chevronDown} size="sm" className="collapsible__chevron" />
      </button>
      <div
        className={`collapsible__content ${isOpen ? 'collapsible__content--open' : 'collapsible__content--closed'}`}
      >
        <div className="collapsible__body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Collapsible;
