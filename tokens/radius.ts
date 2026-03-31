/** Border radius scale in rem. Base: 1rem = 16px. */
export const radius = {
  'radius-sm': '0.375rem',
  'radius-md': '0.625rem',
  'radius-lg': '1rem',
  'radius-xl': '1.5rem',
  'radius-full': '9999px',
} as const;

/** Numeric values for React Native */
export const radiusNumeric = {
  'radius-sm': 6,
  'radius-md': 10,
  'radius-lg': 16,
  'radius-xl': 24,
  'radius-full': 9999,
} as const;

export type RadiusToken = keyof typeof radius;

/**
 * Shape tokens — semantic aliases that describe *intent* rather than raw size.
 * Every component picks a shape; the shape resolves to a radius value.
 *
 *   square  → 0          Hard corners. Data tables, toolbars, full-bleed panels.
 *   default → radius-md  The standard. Cards, inputs, buttons, dropdowns.
 *   pill    → 9999px     Fully rounded. Tags, badges, avatars, toggle tracks.
 */
export const shape = {
  'shape-square': '0',
  'shape-default': '0.625rem',   // = radius-md
  'shape-pill': '9999px',        // = radius-full
} as const;

/** Numeric values for React Native */
export const shapeNumeric = {
  'shape-square': 0,
  'shape-default': 10,
  'shape-pill': 9999,
} as const;

export type ShapeToken = keyof typeof shape;
