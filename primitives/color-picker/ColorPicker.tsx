import React, { useCallback } from 'react';
import type { CSSProperties } from 'react';

// ---- Types ----

type ColorPickerSize = 'sm' | 'md';

export interface ColorPickerProps {
  /** Current hex color value */
  value: string;
  /** Change handler */
  onChange: (color: string) => void;
  /** Array of preset hex colors */
  presets?: string[];
  /** Show hex input field */
  showInput?: boolean;
  /** Size variant */
  size?: ColorPickerSize;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const DEFAULT_PRESETS = [
  '#EF4444', '#F59E0B', '#22C55E', '#3B82F6',
  '#8B5CF6', '#EC4899', '#06B6D4', '#F97316',
  '#14B8A6', '#6366F1', '#A855F7', '#E11D48',
];

/**
 * ColorPicker primitive.
 *
 * Color selection with preset swatches and an optional hex input.
 */
export function ColorPicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  showInput = true,
  size = 'md',
  className = '',
  style,
}: ColorPickerProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const classes = [
    'color-picker',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <div className="color-picker__swatches">
        {presets.map((color) => {
          const isActive = value.toLowerCase() === color.toLowerCase();
          const swatchClasses = [
            'color-picker__swatch',
            isActive ? 'color-picker__swatch--active' : '',
            size === 'sm' ? 'color-picker__swatch--sm' : '',
          ].filter(Boolean).join(' ');

          return (
            <button
              key={color}
              type="button"
              className={swatchClasses}
              style={{
                backgroundColor: color,
                ...(isActive ? { boxShadow: `0 0 0 2px var(--color-bg-primary), 0 0 0 4px ${color}` } : {}),
              }}
              onClick={() => onChange(color)}
              aria-label={color}
              aria-pressed={isActive}
            />
          );
        })}
      </div>

      {showInput && (
        <div className="color-picker__input">
          <div
            className="color-picker__preview"
            style={{ backgroundColor: value }}
          />
          <input
            type="text"
            className="color-picker__hex"
            value={value}
            onChange={handleInputChange}
            spellCheck={false}
            aria-label="Hex color value"
          />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
