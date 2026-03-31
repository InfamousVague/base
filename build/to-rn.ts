/**
 * Compiles Base tokens into React Native-compatible JS objects.
 * Outputs a module with numeric spacing, colors, and type scale.
 */
import { colorRamp, colorSemantic } from '../tokens/color.js';
import { spacingNumeric } from '../tokens/spacing.js';
import { fontWeight, typeScale } from '../tokens/typography.js';
import { glass } from '../tokens/glass.js';
import { radiusNumeric } from '../tokens/radius.js';

export function generateRN(): string {
  return `// Base Design Tokens for React Native — auto-generated, do not edit

export const colorRamp = ${JSON.stringify(colorRamp, null, 2)} as const;

export const color = {
  light: ${JSON.stringify(colorSemantic.light, null, 2)},
  dark: ${JSON.stringify(colorSemantic.dark, null, 2)},
} as const;

export const spacing = ${JSON.stringify(spacingNumeric, null, 2)} as const;

export const fontWeight = ${JSON.stringify(fontWeight, null, 2)} as const;

export const fontFamily = {
  sans: { ios: 'System', android: 'Roboto' },
  mono: { ios: 'Menlo', android: 'monospace' },
} as const;

export const typeScale = {
${Object.entries(typeScale)
  .map(
    ([name, val]) =>
      `  '${name}': { fontSize: ${val.sizeNumeric}, fontWeight: '${val.weight}' as const, lineHeight: ${Math.round(val.sizeNumeric * parseFloat(val.lineHeight))} },`
  )
  .join('\n')}
} as const;

export const glass = ${JSON.stringify(glass, null, 2)} as const;

export const radius = ${JSON.stringify(radiusNumeric, null, 2)} as const;
`;
}

const output = generateRN();
console.log(output);
