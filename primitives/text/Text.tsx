import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'accent' | 'error' | 'warning' | 'success' | 'info';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy';
type TextAlign = 'left' | 'center' | 'right';
type TextFont = 'sans' | 'mono';
type TextElement = 'span' | 'p' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'strong' | 'em';

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'style' | 'color'> {
  /** HTML element to render */
  as?: TextElement;
  /** Typography size scale */
  size?: TextSize;
  /** Font weight override */
  weight?: TextWeight;
  /** Text color */
  color?: TextColor;
  /** Font family */
  font?: TextFont;
  /** Text alignment */
  align?: TextAlign;
  /** Line truncation: 0=none, 1=single-line ellipsis, 2-5=line-clamp */
  truncate?: number;
  /** Display inline */
  inline?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Text primitive.
 *
 * Renders text with consistent typography, color, and truncation support.
 */
export function Text({
  as: Tag = 'span',
  size = 'base',
  weight,
  color = 'primary',
  font,
  align,
  truncate,
  inline,
  skeleton = false,
  className = '',
  style,
  children,
  ...rest
}: TextProps) {
  if (skeleton) {
    return <Skeleton size={`text-${size}` as any} className={className} style={style} />;
  }

  const classes = [
    'text',
    `text--${size}`,
    `text--${color}`,
    weight ? `text--${weight}` : '',
    font === 'mono' ? 'text--mono' : '',
    align ? `text--${align}` : '',
    truncate && truncate >= 1 && truncate <= 5 ? `text--truncate-${truncate}` : '',
    inline ? 'text--inline' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} style={style} {...rest}>
      {children}
    </Tag>
  );
}

export default Text;
