import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';
type AvatarShape = 'square' | 'rounded' | 'circle';

type AvatarRing = 'none' | 'accent' | 'error' | 'success' | 'warning';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Fallback initials (1-2 characters) */
  initials?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Border-radius shape (default is circle) */
  shape?: AvatarShape;
  /** Online status indicator */
  status?: AvatarStatus;
  /** Colored ring around avatar for active/highlight states */
  ring?: AvatarRing;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Avatar primitive.
 *
 * Circular avatar displaying an image or initials, with optional status dot.
 */
export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  shape = 'circle',
  status,
  ring = 'none',
  skeleton = false,
  className = '',
  style,
}: AvatarProps) {
  if (skeleton) {
    return <Skeleton size={size === 'sm' ? 'avatar-sm' : size === 'lg' || size === 'xl' ? 'avatar-lg' : 'avatar'} shape="circle" className={className} style={style} />;
  }

  const classes = [
    'avatar',
    `avatar--${size}`,
    shape !== 'circle' ? `avatar--${shape}` : '',
    ring !== 'none' ? `avatar--ring-${ring}` : '',
    className,
  ].filter(Boolean).join(' ');

  const displayInitials = initials ? initials.slice(0, 2).toUpperCase() : '';

  return (
    <div className={classes} style={style}>
      {src ? (
        <img className="avatar__image" src={src} alt={alt} />
      ) : (
        <span className="avatar__initials" aria-label={alt || displayInitials}>
          {displayInitials}
        </span>
      )}
      {status && (
        <span className={`avatar__status avatar__status--${status}`} />
      )}
    </div>
  );
}

export default Avatar;
