import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { chevronDown } from '../icon/icons/chevron-down.js';

// ---- Types ----

type AccordionType = 'single' | 'multiple';

export interface AccordionProps {
  /** Whether only one item can be open at a time */
  type?: AccordionType;
  /** Initially open item values */
  defaultValue?: string[];
  /** Accordion items */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
}

export interface AccordionItemProps {
  /** Unique identifier for this item */
  value: string;
  /** Clickable header content */
  trigger: ReactNode;
  /** Collapsible body content */
  children: ReactNode;
}

// ---- Context ----

interface AccordionContextValue {
  openItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  openItems: [],
  toggle: () => {},
});

// ---- AccordionItem ----

function AccordionItem({ value, trigger, children }: AccordionItemProps) {
  const { openItems, toggle } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <div className="collapsible">
      <button
        type="button"
        className="collapsible__trigger"
        aria-expanded={isOpen}
        onClick={() => toggle(value)}
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

// ---- Accordion ----

/**
 * Accordion primitive.
 *
 * Multiple collapsible sections with optional single-open behavior.
 */
export function Accordion({
  type = 'multiple',
  defaultValue = [],
  children,
  className = '',
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);

  const toggle = useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        }
        if (type === 'single') {
          return [value];
        }
        return [...prev, value];
      });
    },
    [type],
  );

  const classes = ['accordion', className].filter(Boolean).join(' ');

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={classes}>{children}</div>
    </AccordionContext.Provider>
  );
}

Accordion.Item = AccordionItem;

export default Accordion;
