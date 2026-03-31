/** Font families */
export const fontFamily = {
  'font-sans': "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  'font-mono': "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
} as const;

/** Font weights */
export const fontWeight = {
  'weight-regular': '400',
  'weight-medium': '500',
  'weight-semibold': '600',
  'weight-bold': '700',
  'weight-heavy': '800',
} as const;

/** Type scale — size in rem, default weight, and line-height. Base: 1rem = 16px. */
export const typeScale = {
  'text-xs': { size: '0.6875rem', weight: '400', lineHeight: '1.45', sizeNumeric: 11 },
  'text-sm': { size: '0.8125rem', weight: '400', lineHeight: '1.45', sizeNumeric: 13 },
  'text-base': { size: '0.9375rem', weight: '400', lineHeight: '1.5', sizeNumeric: 15 },
  'text-lg': { size: '1.125rem', weight: '500', lineHeight: '1.4', sizeNumeric: 18 },
  'text-xl': { size: '1.375rem', weight: '600', lineHeight: '1.3', sizeNumeric: 22 },
  'text-2xl': { size: '1.75rem', weight: '700', lineHeight: '1.25', sizeNumeric: 28 },
  'text-3xl': { size: '2.25rem', weight: '700', lineHeight: '1.2', sizeNumeric: 36 },
  'text-4xl': { size: '3rem', weight: '800', lineHeight: '1.1', sizeNumeric: 48 },
} as const;

export type TypeScaleToken = keyof typeof typeScale;
