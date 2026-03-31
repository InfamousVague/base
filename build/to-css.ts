/**
 * Compiles Base tokens into CSS custom properties.
 * Outputs two rule sets: :root (light) and [data-theme="dark"].
 */
import { colorRamps, colorSemantic } from '../tokens/color.js';
import { spacing } from '../tokens/spacing.js';
import { fontFamily, fontWeight, typeScale } from '../tokens/typography.js';
import { glass } from '../tokens/glass.js';
import { radius, shape } from '../tokens/radius.js';
import { elevation } from '../tokens/elevation.js';
import { duration, easing, transition } from '../tokens/animation.js';

function entries<T extends Record<string, unknown>>(obj: T) {
  return Object.entries(obj) as [string, string][];
}

function indent(lines: string[]): string {
  return lines.map((l) => `  ${l}`).join('\n');
}

function buildVars(tokens: Record<string, string>): string[] {
  return entries(tokens).map(([k, v]) => `--${k}: ${v};`);
}

// --- Shared (non-themed) tokens ---
function sharedVars(): string[] {
  const lines: string[] = [];

  // Color ramps — all chromatic palettes
  for (const [name, ramp] of Object.entries(colorRamps)) {
    for (const [step, hex] of Object.entries(ramp)) {
      lines.push(`--${name}-${step}: ${hex};`);
    }
  }

  // Spacing
  lines.push(...buildVars(spacing));

  // Font families
  lines.push(...buildVars(fontFamily));

  // Font weights
  lines.push(...buildVars(fontWeight));

  // Type scale
  for (const [name, val] of Object.entries(typeScale)) {
    lines.push(`--${name}-size: ${val.size};`);
    lines.push(`--${name}-weight: ${val.weight};`);
    lines.push(`--${name}-line-height: ${val.lineHeight};`);
  }

  // Radius
  lines.push(...buildVars(radius));

  // Shapes
  lines.push(...buildVars(shape));

  // Animation — durations, easings, transitions
  lines.push(...buildVars(duration));
  lines.push(...buildVars(easing));
  lines.push(...buildVars(transition));

  return lines;
}

// --- Themed tokens ---
function themedVars(mode: 'light' | 'dark'): string[] {
  const lines: string[] = [];
  lines.push(...buildVars(colorSemantic[mode]));
  lines.push(...buildVars(glass[mode]));
  lines.push(...buildVars(elevation[mode]));
  return lines;
}

export function generateCSS(): string {
  const shared = sharedVars();
  const light = themedVars('light');
  const dark = themedVars('dark');

  return `/* Base Design Tokens — auto-generated, do not edit */

:root {
${indent(shared)}

  /* Light theme (default) */
${indent(light)}
}

[data-theme="dark"] {
  /* Dark theme overrides */
${indent(dark)}
}
`;
}

// When run directly, write to stdout
const css = generateCSS();
console.log(css);
