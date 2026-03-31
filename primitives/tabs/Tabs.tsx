import React from 'react';
import type { CSSProperties } from 'react';

// ---- Types ----

type TabSize = 'sm' | 'md';
type TabVariant = 'underline' | 'pill';

export interface Tab {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab definitions */
  tabs: Tab[];
  /** Currently active tab value */
  value: string;
  /** Called when active tab changes */
  onChange: (value: string) => void;
  /** Size variant */
  size?: TabSize;
  /** Visual variant */
  variant?: TabVariant;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Tabs primitive.
 *
 * Tabbed navigation with underline and pill variants.
 */
export function Tabs({
  tabs,
  value,
  onChange,
  size = 'md',
  variant = 'underline',
  className = '',
  style,
}: TabsProps) {
  const classes = [
    'tabs',
    `tabs--${variant}`,
    `tabs--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        const tabClasses = [
          'tabs__tab',
          isActive ? 'tabs__tab--active' : '',
        ].filter(Boolean).join(' ');

        return (
          <button
            key={tab.value}
            className={tabClasses}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
