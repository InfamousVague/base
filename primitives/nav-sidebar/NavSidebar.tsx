import React, { useState, useCallback, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { chevronDown } from '../icon/icons/chevron-down.js';

// ---- Types ----

export interface NavSidebarItem {
  /** Unique identifier */
  slug: string;
  /** Display label */
  label: string;
  /** Navigation path / href */
  path: string;
  /** Optional leading icon (SVG string for Icon primitive) */
  icon?: string;
}

export interface NavSidebarCategory {
  /** Category name (used as group heading) */
  name: string;
  /** Items in this category */
  items: NavSidebarItem[];
}

export interface NavSidebarProps {
  /** Navigation categories with their items */
  categories: NavSidebarCategory[];
  /** Slug or path of the currently active item */
  activeItem?: string;
  /** Whether the sidebar is in collapsed (icon rail) mode */
  collapsed?: boolean;
  /** Callback when collapse toggle is clicked */
  onToggleCollapse?: () => void;
  /** Content rendered above the nav (e.g., search input) */
  header?: ReactNode;
  /** Content rendered below the nav (e.g., collapse toggle) */
  footer?: ReactNode;
  /** Category names that should be open by default */
  defaultOpenCategories?: string[];
  /** Controlled open categories (overrides internal state) */
  openCategories?: Set<string>;
  /** Callback when a category is toggled */
  onCategoryToggle?: (name: string, open: boolean) => void;
  /** Custom item renderer — return an element for each item */
  renderItem?: (item: NavSidebarItem, active: boolean) => ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * NavSidebar primitive.
 *
 * Collapsible category-grouped navigation sidebar with pill-style active state.
 * Supports collapsed (icon rail) mode, controlled/uncontrolled open categories,
 * and custom item rendering for router integration.
 */
export function NavSidebar({
  categories,
  activeItem,
  collapsed = false,
  header,
  footer,
  defaultOpenCategories,
  openCategories: controlledOpen,
  onCategoryToggle,
  renderItem,
  className = '',
  style,
}: NavSidebarProps) {
  // Internal open state (uncontrolled mode)
  const [internalOpen, setInternalOpen] = useState<Set<string>>(() => {
    if (defaultOpenCategories) return new Set(defaultOpenCategories);
    // Default: all open
    return new Set(categories.map(c => c.name));
  });

  const isControlled = controlledOpen !== undefined;
  const openSet = isControlled ? controlledOpen : internalOpen;

  const toggleCategory = useCallback((name: string) => {
    const willBeOpen = !openSet.has(name);
    if (!isControlled) {
      setInternalOpen(prev => {
        const next = new Set(prev);
        if (next.has(name)) next.delete(name);
        else next.add(name);
        return next;
      });
    }
    onCategoryToggle?.(name, willBeOpen);
  }, [openSet, isControlled, onCategoryToggle]);

  const classes = [
    'nav-sidebar',
    collapsed ? 'nav-sidebar--collapsed' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={classes} style={style}>
      {header && <div className="nav-sidebar__header">{header}</div>}

      <div className="nav-sidebar__scroll">
        {categories.map(cat => {
          if (cat.items.length === 0) return null;
          const isOpen = openSet.has(cat.name);

          return (
            <div className="nav-sidebar__group" key={cat.name}>
              {/* Category header */}
              <button
                type="button"
                className={`nav-sidebar__category${isOpen ? ' nav-sidebar__category--open' : ''}`}
                aria-expanded={isOpen}
                onClick={() => toggleCategory(cat.name)}
              >
                <span className="nav-sidebar__category-label">
                  {collapsed ? cat.name.slice(0, 3) : cat.name}
                </span>
                {!collapsed && (
                  <Icon
                    icon={chevronDown}
                    size="xs"
                    className="nav-sidebar__chevron"
                  />
                )}
              </button>

              {/* Collapsible items */}
              <div
                className={`nav-sidebar__items${isOpen ? ' nav-sidebar__items--open' : ''}`}
              >
                {cat.items.map(item => {
                  const isActive =
                    activeItem === item.slug || activeItem === item.path;

                  if (renderItem) {
                    return (
                      <div key={item.slug} className="nav-sidebar__item-wrapper">
                        {renderItem(item, isActive)}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.slug}
                      href={item.path}
                      className={`nav-sidebar__item${isActive ? ' nav-sidebar__item--active' : ''}`}
                      title={collapsed ? item.label : undefined}
                    >
                      {item.icon && !collapsed && (
                        <Icon icon={item.icon} size="sm" className="nav-sidebar__item-icon" />
                      )}
                      <span className="nav-sidebar__item-label">
                        {collapsed ? item.label.slice(0, 2) : item.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {footer && <div className="nav-sidebar__footer">{footer}</div>}
    </nav>
  );
}

export default NavSidebar;
