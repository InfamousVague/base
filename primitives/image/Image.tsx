import React from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type ImageFit = 'cover' | 'contain' | 'fill' | 'none';
type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className' | 'style'> {
  /** Object-fit behavior */
  fit?: ImageFit;
  /** Border radius */
  radius?: ImageRadius;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Image primitive.
 *
 * Renders an image with object-fit and border-radius variants.
 */
export function Image({
  fit,
  radius = 'none',
  skeleton = false,
  className = '',
  style,
  ...rest
}: ImageProps) {
  if (skeleton) {
    return <Skeleton width="100%" height="100%" shape={radius === 'full' ? 'circle' : radius === 'none' ? 'square' : 'default'} className={className} style={style} />;
  }

  const classes = [
    'image',
    fit ? `image--${fit}` : '',
    radius !== 'none' ? `image--radius-${radius}` : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <img className={classes} style={style} {...rest} />
  );
}

export default Image;
