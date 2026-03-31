/** Glassmorphism tokens — adaptive light/dark. Uses rem where applicable. */
export const glass = {
  light: {
    'glass-bg': 'rgba(255,255,255,0.72)',
    'glass-bg-elevated': 'rgba(255,255,255,0.85)',
    'glass-bg-subtle': 'rgba(255,255,255,0.45)',
    'glass-blur': '1rem',
    'glass-border': 'rgba(255,255,255,0.18)',
    'glass-border-strong': 'rgba(255,255,255,0.35)',
    'glass-border-width': '0.0625rem',
    'glass-shadow': '0 0.25rem 1.5rem rgba(0,0,0,0.06)',
    'glass-highlight': 'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.25) 0deg, rgba(255,255,255,0.08) 60deg, rgba(255,255,255,0.35) 120deg, rgba(255,255,255,0.08) 180deg, rgba(255,255,255,0.25) 240deg, rgba(255,255,255,0.08) 300deg, rgba(255,255,255,0.25) 360deg)',
  },
  dark: {
    'glass-bg': 'rgba(10,10,10,0.65)',
    'glass-bg-elevated': 'rgba(26,26,26,0.75)',
    'glass-bg-subtle': 'rgba(10,10,10,0.40)',
    'glass-blur': '1.25rem',
    'glass-border': 'rgba(255,255,255,0.08)',
    'glass-border-strong': 'rgba(255,255,255,0.15)',
    'glass-border-width': '0.0625rem',
    'glass-shadow': '0 0.25rem 1.5rem rgba(0,0,0,0.4)',
    'glass-highlight': 'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.12) 0deg, rgba(255,255,255,0.04) 60deg, rgba(255,255,255,0.18) 120deg, rgba(255,255,255,0.04) 180deg, rgba(255,255,255,0.14) 240deg, rgba(255,255,255,0.04) 300deg, rgba(255,255,255,0.12) 360deg)',
  },
} as const;
