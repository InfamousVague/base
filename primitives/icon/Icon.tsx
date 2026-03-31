import React from 'react';
import type { CSSProperties } from 'react';
import { useIconDraw } from './useIconDraw.js';
import type { DrawSpeed } from './useIconDraw.js';

// ---- Types ----

type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';

type IconColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'currentColor';

type IconWeight = 'thin' | 'light' | 'regular' | 'medium' | 'bold';

export interface IconProps {
  /** SVG inner content — import from primitives/icon/icons/ */
  icon: string;
  /** Size maps to type scale: xs=11, sm=13, base=15, lg=18, xl=22, 2xl=28 */
  size?: IconSize;
  /** Semantic color. 'currentColor' inherits from parent (default) */
  color?: IconColor;
  /** Stroke weight: thin=1, light=1.5, regular=2, medium=2.5, bold=3 */
  weight?: IconWeight;
  /** Enable draw-in animation */
  draw?: boolean;
  /** Draw-in speed: fast (300ms), normal (500ms), slow (900ms) */
  drawSpeed?: DrawSpeed;
  /** Draw-in stagger between elements in ms (default: 40) */
  drawStagger?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** When set, role="img" with this label; otherwise aria-hidden="true" */
  'aria-label'?: string;
}

const WEIGHT_MAP: Record<IconWeight, number> = {
  thin: 1,
  light: 1.5,
  regular: 2,
  medium: 2.5,
  bold: 3,
};

/**
 * Icon primitive.
 *
 * Renders a Lucide SVG icon sized to the type scale. Stroke width
 * acts as font weight, and color inherits from the parent via
 * currentColor. Supports a draw-in animation where strokes
 * animate from hidden to visible.
 */
export function Icon({
  icon,
  size = 'base',
  color = 'currentColor',
  weight = 'regular',
  draw = false,
  drawSpeed = 'normal',
  drawStagger = 40,
  className = '',
  style,
  'aria-label': ariaLabel,
}: IconProps) {
  const { ref } = useIconDraw({
    autoPlay: draw,
    speed: drawSpeed,
    stagger: drawStagger,
  });

  const classes = [
    'icon',
    `icon--${size}`,
    color !== 'currentColor' ? `icon--${color}` : '',
    draw ? 'icon--draw' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <svg
      ref={draw ? ref : undefined}
      className={classes}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={WEIGHT_MAP[weight]}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
}

export default Icon;
