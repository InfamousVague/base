import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';

// ---- Types ----

export interface ComboboxOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
  /** Group name for grouped display */
  group?: string;
  /** Leading icon — SVG innerHTML string */
  icon?: string;
  /** Secondary description text */
  description?: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface ComboboxProps {
  /** Available options */
  options: ComboboxOption[];
  /** Controlled selected value */
  value?: string;
  /** Selection callback */
  onChange?: (value: string) => void;
  /** Input placeholder */
  placeholder?: string;
  /** Message when no options match */
  emptyMessage?: string;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Combobox primitive.
 *
 * Searchable select with filtered results, grouping, and keyboard navigation.
 */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Search...',
  emptyMessage = 'No results',
  size = 'md',
  className = '',
  style,
}: ComboboxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter options by query
  const filtered = useMemo(() => {
    if (!query) return options;
    const lower = query.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(lower) ||
        opt.value.toLowerCase().includes(lower) ||
        (opt.description && opt.description.toLowerCase().includes(lower)),
    );
  }, [options, query]);

  // Group filtered options
  const grouped = useMemo(() => {
    const groups: { group: string | null; items: ComboboxOption[] }[] = [];
    const map = new Map<string | null, ComboboxOption[]>();

    for (const opt of filtered) {
      const key = opt.group ?? null;
      if (!map.has(key)) {
        const items: ComboboxOption[] = [];
        map.set(key, items);
        groups.push({ group: key, items });
      }
      map.get(key)!.push(opt);
    }

    return groups;
  }, [filtered]);

  // Flat list of non-disabled options for keyboard nav
  const navigable = useMemo(
    () => filtered.filter((opt) => !opt.disabled),
    [filtered],
  );

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset highlight when filtered list changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [filtered]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const highlighted = listRef.current.querySelector('[data-highlighted="true"]');
    if (highlighted) {
      highlighted.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, isOpen]);

  const selectOption = useCallback(
    (opt: ComboboxOption) => {
      if (opt.disabled) return;
      onChange?.(opt.value);
      setQuery(opt.label);
      setIsOpen(false);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          setIsOpen(true);
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < navigable.length - 1 ? prev + 1 : 0,
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : navigable.length - 1,
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (navigable[highlightedIndex]) {
            selectOption(navigable[highlightedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    },
    [isOpen, navigable, highlightedIndex, selectOption],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      if (!isOpen) setIsOpen(true);
    },
    [isOpen],
  );

  const handleFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const classes = [
    'combobox',
    size === 'sm' ? 'combobox--sm' : '',
    className,
  ].filter(Boolean).join(' ');

  const inputClasses = ['combobox__input'].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        className={inputClasses}
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-autocomplete="list"
      />
      {isOpen && (
        <div className="combobox__dropdown" ref={listRef} role="listbox">
          {filtered.length === 0 ? (
            <div className="combobox__empty">{emptyMessage}</div>
          ) : (
            grouped.map(({ group, items }) => (
              <React.Fragment key={group ?? '__ungrouped'}>
                {group && (
                  <div className="combobox__group" role="presentation">
                    {group}
                  </div>
                )}
                {items.map((opt) => {
                  const navIndex = navigable.indexOf(opt);
                  const isHighlighted = navIndex === highlightedIndex;
                  const isSelected = opt.value === value;

                  return (
                    <div
                      key={opt.value}
                      className={[
                        'combobox__option',
                        isHighlighted ? 'combobox__option--highlighted' : '',
                        isSelected ? 'combobox__option--selected' : '',
                        opt.disabled ? 'combobox__option--disabled' : '',
                      ].filter(Boolean).join(' ')}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled}
                      data-highlighted={isHighlighted}
                      onClick={() => selectOption(opt)}
                    >
                      {opt.icon && (
                        <Icon
                          icon={opt.icon}
                          size="sm"
                          className="combobox__option-icon"
                        />
                      )}
                      <div>
                        <div>{opt.label}</div>
                        {opt.description && (
                          <div className="combobox__option-desc">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Combobox;
