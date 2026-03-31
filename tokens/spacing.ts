/** 8-step spacing scale on a 0.25rem (4px) grid. Base: 1rem = 16px. */
export const spacing = {
  'sp-1': '0.25rem',
  'sp-2': '0.5rem',
  'sp-3': '0.75rem',
  'sp-4': '1rem',
  'sp-6': '1.5rem',
  'sp-8': '2rem',
  'sp-12': '3rem',
  'sp-16': '4rem',
} as const;

/** Numeric values for React Native (density-independent pixels) */
export const spacingNumeric = {
  'sp-1': 4,
  'sp-2': 8,
  'sp-3': 12,
  'sp-4': 16,
  'sp-6': 24,
  'sp-8': 32,
  'sp-12': 48,
  'sp-16': 64,
} as const;

export type SpacingToken = keyof typeof spacing;
