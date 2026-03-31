import React, { useRef, useEffect, useState } from 'react';
import type { CSSProperties, ReactNode, ElementType } from 'react';

// Animations that play once on entrance
const ENTRANCE_ANIMATIONS = new Set([
  'fade-in', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
  'scale-in', 'pop',
]);

// Animations that play once on exit
const EXIT_ANIMATIONS = new Set([
  'fade-out', 'slide-out-up', 'slide-out-down', 'scale-out',
]);

// Animations that loop
const LOOPING_ANIMATIONS = new Set([
  'pulse', 'spin', 'ping',
]);

// Animations that play a fixed number of times then stop
const ONESHOT_ATTENTION = new Set([
  'shake',
]);

type DurationToken = 'instant' | 'fast' | 'normal' | 'slow' | 'slower' | 'slowest';
type EasingToken = 'default' | 'in' | 'out' | 'in-out' | 'bounce' | 'spring' | 'linear';

export interface AnimateProps {
  /** The animation to apply (from AnimationType enum values) */
  animation: string;
  /** Duration token or raw CSS value (default: 'normal' for entrance, 'slowest' for looping) */
  duration?: DurationToken | string;
  /** Easing token or raw CSS value (default: 'out' for entrance, 'default' for others) */
  easing?: EasingToken | string;
  /** Delay before animation starts — token name or raw value (default: '0ms') */
  delay?: DurationToken | string;
  /** Number of iterations — 'infinite' or a number (default: auto based on type) */
  iterations?: number | 'infinite';
  /** Whether the animation is active (default: true). Toggle to replay. */
  active?: boolean;
  /** Trigger animation when element enters viewport (default: false) */
  onVisible?: boolean;
  /** IntersectionObserver threshold for onVisible (default: 0.1) */
  visibleThreshold?: number;
  /** Keep the final animation state when done (default: true) */
  fillForwards?: boolean;
  /** Stagger delay for direct children — each child delayed by this amount */
  stagger?: string;
  /** The HTML element to render as (default: 'div') */
  as?: ElementType;
  /** Children */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Callback when animation completes */
  onAnimationEnd?: () => void;
}

function resolveDuration(d: DurationToken | string): string {
  const tokens: Record<string, string> = {
    instant: 'var(--duration-instant)',
    fast: 'var(--duration-fast)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
    slower: 'var(--duration-slower)',
    slowest: 'var(--duration-slowest)',
  };
  return tokens[d] || d;
}

function resolveEasing(e: EasingToken | string): string {
  const tokens: Record<string, string> = {
    default: 'var(--ease-default)',
    in: 'var(--ease-in)',
    out: 'var(--ease-out)',
    'in-out': 'var(--ease-in-out)',
    bounce: 'var(--ease-bounce)',
    spring: 'var(--ease-spring)',
    linear: 'var(--ease-linear)',
  };
  return tokens[e] || e;
}

/**
 * Generic animation wrapper.
 *
 * Wraps any content and applies a CSS animation from the canonical
 * keyframe library. Automatically picks sensible defaults for duration,
 * easing, and iteration count based on the animation category.
 *
 * Supports viewport-triggered animations via `onVisible`, staggered
 * children, and programmatic replay via the `active` prop.
 */
export function Animate({
  animation,
  duration,
  easing,
  delay = '0ms',
  iterations,
  active = true,
  onVisible = false,
  visibleThreshold = 0.1,
  fillForwards = true,
  stagger,
  as: Component = 'div',
  children,
  className = '',
  style,
  onAnimationEnd,
}: AnimateProps) {
  const [isVisible, setIsVisible] = useState(!onVisible);
  const [playKey, setPlayKey] = useState(0);
  const elRef = useRef<HTMLElement | null>(null);
  const prevActive = useRef(active);

  // Replay when `active` toggles from false → true
  useEffect(() => {
    if (active && !prevActive.current) {
      setPlayKey(k => k + 1);
    }
    prevActive.current = active;
  }, [active]);

  // IntersectionObserver for onVisible
  useEffect(() => {
    if (!onVisible || !elRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: visibleThreshold }
    );

    observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [onVisible, visibleThreshold]);

  // Resolve defaults based on animation category
  const isEntrance = ENTRANCE_ANIMATIONS.has(animation);
  const isExit = EXIT_ANIMATIONS.has(animation);
  const isLooping = LOOPING_ANIMATIONS.has(animation);
  const isOneshot = ONESHOT_ATTENTION.has(animation);

  const resolvedDuration = resolveDuration(
    duration || (isLooping ? 'slowest' : isOneshot ? 'slow' : 'slow')
  );
  const resolvedEasing = resolveEasing(
    easing || (isEntrance ? 'out' : isLooping ? 'linear' : 'default')
  );
  const resolvedDelay = resolveDuration(delay);
  const resolvedIterations = iterations ?? (isLooping ? 'infinite' : 1);
  const resolvedFill = fillForwards ? 'both' : 'none';

  const shouldAnimate = active && isVisible;

  const animationCSS = shouldAnimate
    ? `${animation} ${resolvedDuration} ${resolvedEasing} ${resolvedDelay} ${resolvedIterations} ${resolvedFill}`
    : 'none';

  const containerStyle: CSSProperties = {
    animation: animationCSS,
    ...style,
  };

  // Stagger: wrap children with incremental delays
  const renderedChildren = stagger
    ? React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return child;
        const childDelay = `calc(${resolvedDelay} + ${stagger} * ${i})`;
        return React.cloneElement(child as React.ReactElement<{ style?: CSSProperties }>, {
          style: {
            ...(child.props as { style?: CSSProperties }).style,
            animation: shouldAnimate
              ? `${animation} ${resolvedDuration} ${resolvedEasing} ${childDelay} ${resolvedIterations} ${resolvedFill}`
              : 'none',
            opacity: isEntrance && shouldAnimate ? 0 : undefined,
          },
        });
      })
    : children;

  return (
    <Component
      key={playKey}
      ref={elRef}
      className={`animate animate--${animation} ${shouldAnimate ? 'animate--active' : ''} ${className}`}
      style={stagger ? { ...style } : containerStyle}
      onAnimationEnd={onAnimationEnd}
    >
      {renderedChildren}
    </Component>
  );
}

export default Animate;
