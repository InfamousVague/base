/**
 * Base Color System
 *
 * Philosophy: Monochrome-first, colors-when-needed.
 * Inspired by shadcn/ui (pure neutral dark theme) and Linear (single accent).
 *
 * The gray ramp is the backbone — 12 steps tuned for dark-mode elevation.
 * Chromatic ramps exist for status/intent and occasional accent use,
 * but the core UI should be almost entirely gray + one accent.
 *
 * Steps: 1 (lightest) → 12 (darkest)
 */

// ---------------------------------------------------------------------------
// GRAY — Pure neutral, no warm/cool tint. The entire UI lives here.
// Tuned for dark-mode elevation: steps 1–4 are tightly spaced darks,
// steps 9–12 are tightly spaced lights. This gives maximum nuance
// at both extremes where you need it most.
// ---------------------------------------------------------------------------
export const gray = {
  1: '#09090B',   // deepest bg  (≈ shadcn background)
  2: '#111113',   // raised surface
  3: '#19191D',   // card / panel
  4: '#222225',   // elevated / popover
  5: '#2E2E32',   // subtle border, active bg
  6: '#3E3E44',   // stronger border, muted interactive
  7: '#54545C',   // placeholder, disabled text
  8: '#70707C',   // secondary text (dark mode)
  9: '#9B9BA7',   // body text (dark mode)
  10: '#B4B4BE',  // secondary text (light mode)
  11: '#ECECEF',  // primary text (dark mode), borders (light mode)
  12: '#FAFAFA',  // headings, high-emphasis text
} as const;

// ---------------------------------------------------------------------------
// ACCENT — Default indigo. Used for focus rings, primary buttons, links.
// One accent, used sparingly.
// ---------------------------------------------------------------------------
export const accent = {
  1: '#0D0F1A',   // deepest dark tint
  2: '#141726',   // subtle dark bg
  3: '#1C2240',   // dark active state
  4: '#253066',   // dark hover
  5: '#3B4EAB',   // muted
  6: '#5B6BD6',   // base accent (≈ Linear indigo)
  7: '#7B8AE4',   // hover (light mode)
  8: '#9BA6ED',   // lighter
  9: '#BCC3F4',   // subtle fill (light mode)
  10: '#DDE0FA',  // light tint bg
  11: '#EDEEFB',  // lightest tint
  12: '#F6F6FD',  // near-white tint
} as const;

// ---------------------------------------------------------------------------
// CHROMATIC RAMPS — For status colors and intentional pops of color.
// Each has 12 steps: 1 (deepest dark) → 12 (lightest tint).
// Designed to work on both dark and light backgrounds.
// ---------------------------------------------------------------------------

/** Blue — calmer than accent, used for info intent */
export const blue = {
  1: '#0B1120',
  2: '#0F1A33',
  3: '#142752',
  4: '#1A3A7A',
  5: '#2558B5',
  6: '#3B82F6',   // base
  7: '#60A5FA',
  8: '#93C5FD',
  9: '#BFDBFE',
  10: '#DBEAFE',
  11: '#EFF6FF',
  12: '#F8FAFF',
} as const;

/** Red — for error/destructive intent */
export const red = {
  1: '#1A0B0B',
  2: '#2D1010',
  3: '#4C1717',
  4: '#7A2020',
  5: '#B52525',
  6: '#EF4444',   // base
  7: '#F87171',
  8: '#FCA5A5',
  9: '#FECACA',
  10: '#FEE2E2',
  11: '#FEF2F2',
  12: '#FFFBFB',
} as const;

/** Amber — for warning intent */
export const amber = {
  1: '#1A150B',
  2: '#2D2210',
  3: '#4C3A17',
  4: '#7A5F20',
  5: '#B58B25',
  6: '#F59E0B',   // base
  7: '#FBBF24',
  8: '#FCD34D',
  9: '#FDE68A',
  10: '#FEF3C7',
  11: '#FFFBEB',
  12: '#FFFDF5',
} as const;

/** Green — for success intent */
export const green = {
  1: '#0B1A10',
  2: '#102D17',
  3: '#174C25',
  4: '#1E7A36',
  5: '#22B54A',
  6: '#22C55E',   // base
  7: '#4ADE80',
  8: '#86EFAC',
  9: '#BBF7D0',
  10: '#DCFCE7',
  11: '#F0FDF4',
  12: '#F8FEF9',
} as const;

/** Teal — for neutral-positive, informational variety */
export const teal = {
  1: '#0B1A18',
  2: '#0F2D28',
  3: '#144C43',
  4: '#1A7A6A',
  5: '#20B59E',
  6: '#14B8A6',   // base
  7: '#2DD4BF',
  8: '#5EEAD4',
  9: '#99F6E4',
  10: '#CCFBF1',
  11: '#F0FDFA',
  12: '#F8FEFD',
} as const;

/** Purple — for premium/brand accent variety */
export const purple = {
  1: '#13091A',
  2: '#1E0F2D',
  3: '#31174C',
  4: '#4E207A',
  5: '#7425B5',
  6: '#A855F7',   // base
  7: '#C084FC',
  8: '#D8B4FE',
  9: '#E9D5FF',
  10: '#F3E8FF',
  11: '#FAF5FF',
  12: '#FDFBFF',
} as const;

/** Pink — for highlights, playful accents */
export const pink = {
  1: '#1A0B13',
  2: '#2D0F1E',
  3: '#4C1731',
  4: '#7A204E',
  5: '#B52574',
  6: '#EC4899',   // base
  7: '#F472B6',
  8: '#F9A8D4',
  9: '#FBCFE8',
  10: '#FCE7F3',
  11: '#FDF2F8',
  12: '#FEFBFD',
} as const;

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------

export const colorRamps = {
  gray, accent, blue, red, amber, green, teal, purple, pink,
} as const;

export type ColorRampName = keyof typeof colorRamps;
export type ColorStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// ---------------------------------------------------------------------------
// STATUS COLORS — mapped from chromatic ramps
// Each intent: subtle (bg tint), base (fill/icon/border), bold (text)
// ---------------------------------------------------------------------------
export const statusColors = {
  error: {
    subtle: red[11],
    base: red[6],
    bold: red[5],
  },
  warning: {
    subtle: amber[11],
    base: amber[6],
    bold: amber[5],
  },
  success: {
    subtle: green[11],
    base: green[6],
    bold: green[5],
  },
  info: {
    subtle: blue[11],
    base: blue[6],
    bold: blue[5],
  },
  neutral: {
    subtle: gray[3],
    base: gray[7],
    bold: gray[9],
  },
} as const;

export type StatusIntent = keyof typeof statusColors;

// ---------------------------------------------------------------------------
// SEMANTIC TOKENS — the tokens your components actually use
// ---------------------------------------------------------------------------
export const colorSemantic = {
  light: {
    // Surfaces — almost no color, pure clean white/off-white
    'color-bg-primary': '#FFFFFF',
    'color-bg-secondary': '#FAFAFA',
    'color-bg-elevated': '#FFFFFF',
    'color-bg-inset': gray[11],

    // Text — high contrast
    'color-text-primary': gray[1],
    'color-text-secondary': gray[7],
    'color-text-tertiary': gray[8],
    'color-text-disabled': gray[10],

    // Borders — subtle
    'color-border-default': gray[11],
    'color-border-subtle': '#F0F0F2',
    'color-border-strong': gray[10],

    // Interactive
    'color-accent': accent[6],
    'color-accent-hover': accent[5],
    'color-accent-subtle': accent[11],
    'color-accent-text': accent[5],

    // Overlay
    'color-overlay': 'rgba(0,0,0,0.04)',
    'color-overlay-heavy': 'rgba(0,0,0,0.08)',

    // Skeleton
    'color-skeleton': gray[11],
    'color-skeleton-shimmer': '#FFFFFF',

    // Status — subtle backgrounds
    'color-error-subtle': statusColors.error.subtle,
    'color-warning-subtle': statusColors.warning.subtle,
    'color-success-subtle': statusColors.success.subtle,
    'color-info-subtle': statusColors.info.subtle,
    'color-neutral-subtle': gray[11],

    // Status — base (icons, borders, fills)
    'color-error': statusColors.error.base,
    'color-warning': statusColors.warning.base,
    'color-success': statusColors.success.base,
    'color-info': statusColors.info.base,

    // Status — bold text
    'color-error-bold': statusColors.error.bold,
    'color-warning-bold': statusColors.warning.bold,
    'color-success-bold': statusColors.success.bold,
    'color-info-bold': statusColors.info.bold,
  },

  dark: {
    // Surfaces — layered elevation via gray ramp
    'color-bg-primary': gray[1],        // #09090B  deepest
    'color-bg-secondary': gray[2],      // #111113  raised
    'color-bg-elevated': gray[3],       // #19191D  card/panel
    'color-bg-inset': gray[1],          // inset wells

    // Text — light on dark
    'color-text-primary': gray[12],     // #FAFAFA
    'color-text-secondary': gray[9],    // #9B9BA7
    'color-text-tertiary': gray[8],     // #70707C
    'color-text-disabled': gray[6],     // #3E3E44

    // Borders — white with opacity for layering
    'color-border-default': 'rgba(255,255,255,0.08)',
    'color-border-subtle': 'rgba(255,255,255,0.05)',
    'color-border-strong': 'rgba(255,255,255,0.14)',

    // Interactive
    'color-accent': accent[6],
    'color-accent-hover': accent[7],
    'color-accent-subtle': accent[2],
    'color-accent-text': accent[8],

    // Overlay
    'color-overlay': 'rgba(255,255,255,0.03)',
    'color-overlay-heavy': 'rgba(255,255,255,0.06)',

    // Skeleton
    'color-skeleton': gray[4],
    'color-skeleton-shimmer': gray[5],

    // Status — subtle backgrounds (translucent on dark)
    'color-error-subtle': red[2],
    'color-warning-subtle': amber[2],
    'color-success-subtle': green[2],
    'color-info-subtle': blue[2],
    'color-neutral-subtle': gray[3],

    // Status — base (brighter for dark mode legibility)
    'color-error': red[7],
    'color-warning': amber[7],
    'color-success': green[7],
    'color-info': blue[7],

    // Status — bold text (even brighter)
    'color-error-bold': red[8],
    'color-warning-bold': amber[8],
    'color-success-bold': green[8],
    'color-info-bold': blue[8],
  },
} as const;
