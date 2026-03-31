/** Shadow / depth tokens — adaptive light/dark. Uses rem. */
export const elevation = {
  light: {
    'shadow-sm': '0 0.0625rem 0.125rem rgba(0,0,0,0.05)',
    'shadow-md': '0 0.25rem 0.75rem rgba(0,0,0,0.08)',
    'shadow-lg': '0 0.5rem 1.5rem rgba(0,0,0,0.12)',
  },
  dark: {
    'shadow-sm': '0 0.0625rem 0.125rem rgba(0,0,0,0.3)',
    'shadow-md': '0 0.25rem 0.75rem rgba(0,0,0,0.4)',
    'shadow-lg': '0 0.5rem 1.5rem rgba(0,0,0,0.5)',
  },
} as const;

export type ElevationToken = keyof typeof elevation.light;
