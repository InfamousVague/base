import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type SpacingToken = '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';
type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type BgToken = 'primary' | 'secondary' | 'elevated' | 'inset';
type BorderToken = 'none' | 'default' | 'subtle' | 'strong';
type ShadowToken = 'none' | 'sm' | 'md' | 'lg';

export interface BoxProps {
  /** HTML element to render */
  as?: React.ElementType;
  /** Padding on all sides */
  padding?: SpacingToken;
  /** Horizontal padding */
  paddingX?: SpacingToken;
  /** Vertical padding */
  paddingY?: SpacingToken;
  /** Border radius */
  radius?: RadiusToken;
  /** Background color */
  bg?: BgToken;
  /** Border style */
  border?: BorderToken;
  /** Box shadow */
  shadow?: ShadowToken;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Box primitive.
 *
 * Generic container with token-mapped props for spacing, radius,
 * background, border, and shadow.
 */
export function Box({
  as: Tag = 'div',
  padding,
  paddingX,
  paddingY,
  radius,
  bg,
  border,
  shadow,
  className = '',
  style,
  children,
  ...rest
}: BoxProps) {
  const classes = [
    'box',
    padding ? `box--p-${padding}` : '',
    paddingX ? `box--px-${paddingX}` : '',
    paddingY ? `box--py-${paddingY}` : '',
    radius ? `box--radius-${radius}` : '',
    bg ? `box--bg-${bg}` : '',
    border ? `box--border-${border}` : '',
    shadow ? `box--shadow-${shadow}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes} style={style} {...rest}>
      {children}
    </Tag>
  );
}

export default Box;
