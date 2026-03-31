import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode, ElementType } from 'react';

type DurationToken = 'instant' | 'fast' | 'normal' | 'slow' | 'slower' | 'slowest';

export interface AnimatePresenceProps {
  /** Whether the content is mounted / shown */
  show: boolean;
  /** Entrance animation name (default: 'fade-in') */
  enter?: string;
  /** Exit animation name (default: 'fade-out') */
  exit?: string;
  /** Duration token or raw CSS value for enter (default: 'slow') */
  enterDuration?: DurationToken | string;
  /** Duration token or raw CSS value for exit (default: 'normal') */
  exitDuration?: DurationToken | string;
  /** The HTML element to render as (default: 'div') */
  as?: ElementType;
  /** Children to show/hide */
  children: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Callback after exit animation completes and element unmounts */
  onExited?: () => void;
}

function resolveDuration(d: DurationToken | string): string {
  const map: Record<string, number> = {
    instant: 0, fast: 100, normal: 200, slow: 400, slower: 600, slowest: 1000,
  };
  return map[d] !== undefined ? `${map[d]}ms` : d;
}

function parseDurationMs(d: string): number {
  const n = parseFloat(d);
  if (d.endsWith('s') && !d.endsWith('ms')) return n * 1000;
  return n;
}

/**
 * Mount/unmount lifecycle wrapper with enter and exit animations.
 *
 * When `show` is true, mounts children and plays the enter animation.
 * When `show` becomes false, plays the exit animation and then unmounts
 * children from the DOM — no leftover hidden elements.
 */
export function AnimatePresence({
  show,
  enter = 'fade-in',
  exit = 'fade-out',
  enterDuration = 'slow',
  exitDuration = 'normal',
  as: Component = 'div',
  children,
  className = '',
  style,
  onExited,
}: AnimatePresenceProps) {
  const [mounted, setMounted] = useState(show);
  const [phase, setPhase] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(
    show ? 'entering' : 'exited'
  );
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const onExitedRef = useRef(onExited);
  onExitedRef.current = onExited;

  const resolvedEnterDur = resolveDuration(enterDuration);
  const resolvedExitDur = resolveDuration(exitDuration);

  useEffect(() => {
    if (show) {
      // Mount and enter
      setMounted(true);
      setPhase('entering');
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setPhase('entered');
      }, parseDurationMs(resolvedEnterDur) + 50);
    } else if (mounted) {
      // Exit then unmount
      setPhase('exiting');
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setMounted(false);
        setPhase('exited');
        onExitedRef.current?.();
      }, parseDurationMs(resolvedExitDur) + 50);
    }

    return () => clearTimeout(timerRef.current);
  }, [show]);

  if (!mounted) return null;

  const isEntering = phase === 'entering';
  const isExiting = phase === 'exiting';

  const animName = isEntering ? enter : isExiting ? exit : 'none';
  const animDur = isEntering ? resolvedEnterDur : resolvedExitDur;

  const animStyle: CSSProperties = {
    animation: (isEntering || isExiting)
      ? `${animName} ${animDur} var(--ease-out) both`
      : undefined,
    ...style,
  };

  return (
    <Component
      className={`animate-presence animate-presence--${phase} ${className}`}
      style={animStyle}
    >
      {children}
    </Component>
  );
}

export default AnimatePresence;
