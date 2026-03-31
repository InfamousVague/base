import React from 'react';
import type { ReactNode, CSSProperties } from 'react';

export interface SkeletonRevealProps {
  /** When true, crossfades from skeleton to content */
  loaded: boolean;
  /** The skeleton placeholder(s) */
  skeleton: ReactNode;
  /** The real content to reveal */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Crossfade wrapper that transitions from skeleton → content.
 *
 * Renders both layers simultaneously. When `loaded` flips to true,
 * the skeleton fades out and the content fades in via CSS transitions.
 * Once the transition completes, the skeleton is removed from the DOM.
 */
export function SkeletonReveal({
  loaded,
  skeleton,
  children,
  className = '',
  style,
}: SkeletonRevealProps) {
  const [showSkeleton, setShowSkeleton] = React.useState(true);

  React.useEffect(() => {
    if (loaded) {
      // Keep skeleton in DOM during fade-out, then remove
      const timer = setTimeout(() => setShowSkeleton(false), 350);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
    }
  }, [loaded]);

  return (
    <div
      className={`skeleton-reveal ${loaded ? 'skeleton-reveal--loaded' : ''} ${className}`}
      style={style}
    >
      {showSkeleton && (
        <div className="skeleton-reveal__skeleton" aria-hidden={loaded}>
          {skeleton}
        </div>
      )}
      <div className="skeleton-reveal__content">
        {children}
      </div>
    </div>
  );
}

export default SkeletonReveal;
