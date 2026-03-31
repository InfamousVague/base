import { useState, useCallback, useRef, useEffect } from 'react';

export type AnimationState = 'idle' | 'running' | 'finished';

export interface UseAnimationOptions {
  /** Auto-play on mount (default: true) */
  autoPlay?: boolean;
  /** Callback when animation completes */
  onComplete?: () => void;
}

export interface UseAnimationReturn {
  /** Current state */
  state: AnimationState;
  /** Trigger the animation (resets and replays) */
  play: () => void;
  /** Reset to idle (no animation) */
  reset: () => void;
  /** Unique key that increments on each play — use as React key to remount */
  playKey: number;
  /** Ref callback — attach to the animated element to listen for animationend */
  ref: (node: HTMLElement | null) => void;
}

/**
 * Hook for programmatic animation control.
 *
 * Returns a `playKey` you can spread as a React `key` to force remount
 * (which retriggers CSS animations), plus `play()` / `reset()` controls
 * and a `ref` that auto-detects when the CSS animation finishes.
 */
export function useAnimation(opts: UseAnimationOptions = {}): UseAnimationReturn {
  const { autoPlay = true, onComplete } = opts;
  const [state, setState] = useState<AnimationState>(autoPlay ? 'running' : 'idle');
  const [playKey, setPlayKey] = useState(0);
  const nodeRef = useRef<HTMLElement | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const play = useCallback(() => {
    setPlayKey(k => k + 1);
    setState('running');
  }, []);

  const reset = useCallback(() => {
    setState('idle');
  }, []);

  const ref = useCallback((node: HTMLElement | null) => {
    // Cleanup old listener
    if (nodeRef.current) {
      nodeRef.current.removeEventListener('animationend', handleEnd);
    }
    nodeRef.current = node;
    if (node) {
      node.addEventListener('animationend', handleEnd);
    }
  }, []);

  function handleEnd() {
    setState('finished');
    onCompleteRef.current?.();
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener('animationend', handleEnd);
      }
    };
  }, []);

  return { state, play, reset, playKey, ref };
}

export default useAnimation;
