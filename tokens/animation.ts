// ---------------------------------------------------------------------------
// ANIMATION TOKENS
// Duration, easing, and the canonical enum of animation types every
// component can support.
// ---------------------------------------------------------------------------

// ---- Durations (rem-friendly ms values) ----
export const duration = {
  'duration-instant': '0ms',
  'duration-fast': '100ms',
  'duration-normal': '200ms',
  'duration-slow': '400ms',
  'duration-slower': '600ms',
  'duration-slowest': '1000ms',
} as const;

// ---- Easing curves ----
export const easing = {
  'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',     // standard material
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',             // accelerate
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',            // decelerate
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',      // symmetric
  'ease-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)', // overshoot
  'ease-spring': 'cubic-bezier(0.22, 1.25, 0.36, 1)', // subtle spring
  'ease-linear': 'linear',
} as const;

// ---- Composed transition presets ----
export const transition = {
  'transition-fast': 'var(--duration-fast) var(--ease-default)',
  'transition-normal': 'var(--duration-normal) var(--ease-default)',
  'transition-slow': 'var(--duration-slow) var(--ease-default)',
  'transition-bounce': 'var(--duration-normal) var(--ease-bounce)',
  'transition-spring': 'var(--duration-slow) var(--ease-spring)',
} as const;

// ---------------------------------------------------------------------------
// ANIMATION ENUM — the canonical list of animation types.
// Every component (text, button, surface, skeleton, etc.) references
// these by name. Not every component supports every animation, but
// the vocabulary is shared.
// ---------------------------------------------------------------------------

export const AnimationType = {
  // ---- Entrance ----
  FADE_IN: 'fade-in',
  SLIDE_UP: 'slide-up',
  SLIDE_DOWN: 'slide-down',
  SLIDE_LEFT: 'slide-left',
  SLIDE_RIGHT: 'slide-right',
  SCALE_IN: 'scale-in',
  POP: 'pop',                       // scale overshoot (bounce easing)

  // ---- Exit ----
  FADE_OUT: 'fade-out',
  SLIDE_OUT_UP: 'slide-out-up',
  SLIDE_OUT_DOWN: 'slide-out-down',
  SCALE_OUT: 'scale-out',

  // ---- Continuous / Attention ----
  PULSE: 'pulse',
  SHAKE: 'shake',
  SPIN: 'spin',
  PING: 'ping',                     // ripple outward

  // ---- Text-specific ----
  SLOT_MACHINE: 'slot-machine',     // characters roll in vertically
  DECIPHER: 'decipher',             // scrambled chars resolve to final text
  TYPEWRITER: 'typewriter',         // characters appear one at a time
  HIGHLIGHT_MATCH: 'highlight-match', // matched chars get accent treatment

  // ---- Icon-specific ----
  DRAW_IN: 'draw-in',              // SVG stroke draw-in animation

  // ---- Layout ----
  COLLAPSE: 'collapse',             // height to 0
  EXPAND: 'expand',                 // height from 0
} as const;

export type AnimationTypeName = typeof AnimationType[keyof typeof AnimationType];

// ---------------------------------------------------------------------------
// Which components support which animations (documentation map).
// This is purely informational — used by the docs page.
// ---------------------------------------------------------------------------
export const animationSupport: Record<string, AnimationTypeName[]> = {
  text: [
    AnimationType.FADE_IN, AnimationType.SLIDE_UP, AnimationType.TYPEWRITER,
    AnimationType.SLOT_MACHINE, AnimationType.DECIPHER, AnimationType.HIGHLIGHT_MATCH,
  ],
  button: [
    AnimationType.FADE_IN, AnimationType.SCALE_IN, AnimationType.POP,
    AnimationType.PULSE, AnimationType.SHAKE,
  ],
  surface: [
    AnimationType.FADE_IN, AnimationType.SLIDE_UP, AnimationType.SCALE_IN,
    AnimationType.EXPAND, AnimationType.COLLAPSE,
  ],
  skeleton: [
    AnimationType.FADE_IN, AnimationType.FADE_OUT, AnimationType.PULSE,
  ],
  icon: [
    AnimationType.FADE_IN, AnimationType.SCALE_IN, AnimationType.POP,
    AnimationType.SPIN, AnimationType.PULSE, AnimationType.PING,
    AnimationType.DRAW_IN,
  ],
  generic: [
    AnimationType.FADE_IN, AnimationType.FADE_OUT,
    AnimationType.SLIDE_UP, AnimationType.SLIDE_DOWN,
    AnimationType.SLIDE_LEFT, AnimationType.SLIDE_RIGHT,
    AnimationType.SCALE_IN, AnimationType.SCALE_OUT,
    AnimationType.EXPAND, AnimationType.COLLAPSE,
  ],
};
