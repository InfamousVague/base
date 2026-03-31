import React, { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

export interface NumberRollProps {
  /** The numeric value to display */
  value: number;
  /** Minimum number of digits (pads with leading zeros). Default: 2 */
  minDigits?: number;
  /** Duration of roll animation in ms. Default: 500 */
  duration?: number;
  /** CSS class applied to the root element */
  className?: string;
  /** Additional inline styles on the root element */
  style?: CSSProperties;
  /** Font size — inherits from parent if not set */
  fontSize?: string;
  /** Whether leading zeros are semi-transparent. Default: true */
  dimLeadingZeros?: boolean;
  /** Add comma separators for thousands. Default: false */
  commas?: boolean;
}

/** Single digit column that rolls vertically through 0-9 */
function DigitColumn({
  digit,
  duration,
  isLeadingZero,
  dimLeadingZeros,
}: {
  digit: number;
  duration: number;
  isLeadingZero: boolean;
  dimLeadingZeros: boolean;
}) {
  const stripRef = useRef<HTMLSpanElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!stripRef.current) return;
    const el = stripRef.current;

    if (isFirstRender.current) {
      // First render — snap to position instantly
      isFirstRender.current = false;
      el.style.transition = 'none';
      el.style.transform = `translateY(calc(${-digit} * var(--nr-digit-h)))`;
      // Force reflow so the snap applies before any future transitions
      el.offsetHeight;
    } else {
      // Subsequent changes — animate in both directions (up and down)
      el.style.transition = `transform ${duration}ms cubic-bezier(0.22, 1.25, 0.36, 1)`;
      el.style.transform = `translateY(calc(${-digit} * var(--nr-digit-h)))`;
    }
  }, [digit, duration]);

  return (
    <span
      className="number-roll__col"
      style={{
        opacity: isLeadingZero && dimLeadingZeros ? 0.3 : 1,
        transition: `opacity ${duration}ms ease-out`,
      }}
    >
      <span ref={stripRef} className="number-roll__strip">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span key={d} className="number-roll__digit" aria-hidden={d !== digit}>
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

/** Comma separator — static, no animation */
function CommaSep() {
  return <span className="number-roll__comma">,</span>;
}

/**
 * Animated number display with slot-machine rolling effect.
 *
 * Each digit rolls vertically through 0-9. Leading zeros are
 * displayed with reduced opacity. Optional comma separators.
 *
 * @example
 * ```tsx
 * <NumberRoll value={1234} minDigits={5} commas />
 * // Renders "01,234" with the leading 0 semi-transparent
 * ```
 */
export function NumberRoll({
  value,
  minDigits = 2,
  duration = 500,
  className = '',
  style,
  fontSize,
  dimLeadingZeros = true,
  commas = false,
}: NumberRollProps) {
  const num = Math.max(0, Math.floor(value));
  const str = num.toString();
  // Track the highest digit count we've ever needed so columns never disappear
  const maxDigitsRef = useRef(Math.max(minDigits, str.length));
  if (str.length > maxDigitsRef.current) {
    maxDigitsRef.current = str.length;
  }
  const effectiveMin = Math.max(minDigits, maxDigitsRef.current);
  const padded = str.padStart(effectiveMin, '0');
  const digits = padded.split('').map(Number);

  // Find index of first non-zero digit
  const firstNonZero = digits.findIndex((d) => d !== 0);
  const dimUpTo = firstNonZero === -1 ? digits.length - 1 : firstNonZero;

  // Build elements with optional commas
  const elements: React.ReactNode[] = [];
  const len = digits.length;
  for (let i = 0; i < len; i++) {
    // Insert comma before this digit if needed
    if (commas && i > 0 && (len - i) % 3 === 0) {
      elements.push(<CommaSep key={`comma-${i}`} />);
    }
    elements.push(
      <DigitColumn
        key={`d-${len}-${i}`}
        digit={digits[i]}
        duration={duration}
        isLeadingZero={i < dimUpTo}
        dimLeadingZeros={dimLeadingZeros}
      />
    );
  }

  return (
    <span
      className={`number-roll ${className}`}
      style={{ fontSize, ...style }}
      aria-label={commas ? num.toLocaleString() : padded}
      role="status"
    >
      {elements}
    </span>
  );
}

export default NumberRoll;
