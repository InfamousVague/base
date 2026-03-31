import { useCallback, useRef } from 'react';

export type DrawSpeed = 'fast' | 'normal' | 'slow';

export interface UseIconDrawOptions {
  /** Auto-play on mount (default: true) */
  autoPlay?: boolean;
  /** Animation speed preset (default: 'normal') */
  speed?: DrawSpeed;
  /** Per-element stagger in ms (default: 40) */
  stagger?: number;
  /** Callback when all elements finish drawing */
  onComplete?: () => void;
}

export interface UseIconDrawReturn {
  /** Ref callback — attach to the <svg> element */
  ref: (node: SVGSVGElement | null) => void;
  /** Trigger the draw-in (or replay) */
  draw: () => void;
  /** Reset to un-drawn state */
  reset: () => void;
}

const STROKE_ELEMENTS = 'path, circle, rect, line, polyline, polygon';

const SPEED_MS: Record<DrawSpeed, number> = {
  fast: 300,
  normal: 500,
  slow: 900,
};

const EASING = 'cubic-bezier(0, 0, 0.2, 1)';

/**
 * Hook for draw-in animation on SVG icons.
 *
 * Uses SVG presentation attributes (stroke-dasharray, stroke-dashoffset)
 * and CSS transitions to animate strokes from hidden to visible.
 * The icon starts hidden via CSS visibility, becomes visible once
 * JS measures paths, then strokes animate in via dashoffset transition.
 */
export function useIconDraw(opts: UseIconDrawOptions = {}): UseIconDrawReturn {
  const { autoPlay = true, speed = 'normal', stagger = 40, onComplete } = opts;
  const nodeRef = useRef<SVGSVGElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const durationMs = SPEED_MS[speed];

  /** Measure paths, set them to hidden, then animate to visible. */
  function animateIn(svg: SVGSVGElement) {
    const children = svg.querySelectorAll<SVGGeometryElement>(STROKE_ELEMENTS);

    // Step 1: Measure and hide each stroke (no transition yet)
    children.forEach((el) => {
      try {
        const len = el.getTotalLength();
        el.setAttribute('stroke-dasharray', `${len}`);
        el.setAttribute('stroke-dashoffset', `${len}`);
      } catch { /* skip */ }
    });

    // Make the SVG visible (strokes are hidden via dashoffset)
    svg.classList.add('icon--drawing');

    // Step 2: After browser paints the hidden state, transition to visible
    timerRef.current = setTimeout(() => {
      children.forEach((el, i) => {
        try {
          el.style.transition = `stroke-dashoffset ${durationMs}ms ${EASING} ${i * stagger}ms`;
          el.setAttribute('stroke-dashoffset', '0');
        } catch { /* skip */ }
      });

      // Step 3: When last element finishes, clean up
      if (children.length > 0) {
        const last = children[children.length - 1];
        const handler = () => {
          last.removeEventListener('transitionend', handler);
          // Remove all draw-related attributes/styles so the icon
          // survives React re-renders with clean markup
          children.forEach((el) => {
            el.style.transition = '';
            el.removeAttribute('stroke-dasharray');
            el.removeAttribute('stroke-dashoffset');
          });
          svg.classList.remove('icon--draw', 'icon--drawing');
          onCompleteRef.current?.();
        };
        last.addEventListener('transitionend', handler);
      }
    }, 20);
  }

  const ref = useCallback((node: SVGSVGElement | null) => {
    clearTimeout(timerRef.current);
    nodeRef.current = node;
    if (node && autoPlay) {
      animateIn(node);
    }
  }, [autoPlay, durationMs, stagger]);

  const draw = useCallback(() => {
    const svg = nodeRef.current;
    if (!svg) return;
    clearTimeout(timerRef.current);
    // Re-add draw class to hide, then animate
    svg.classList.add('icon--draw');
    svg.classList.remove('icon--drawing');
    // Small delay to let the visibility:hidden take effect
    timerRef.current = setTimeout(() => animateIn(svg), 10);
  }, [durationMs, stagger]);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    const svg = nodeRef.current;
    if (!svg) return;
    svg.classList.add('icon--draw');
    svg.classList.remove('icon--drawing');
    const children = svg.querySelectorAll<SVGGeometryElement>(STROKE_ELEMENTS);
    children.forEach((el) => {
      el.style.transition = '';
      el.removeAttribute('stroke-dasharray');
      el.removeAttribute('stroke-dashoffset');
    });
  }, []);

  return { ref, draw, reset };
}

export default useIconDraw;
