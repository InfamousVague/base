import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';

export interface DecipherProps {
  /** The final text to resolve to */
  text: string;
  /** Total duration of the full resolve animation in ms (default: 1500) */
  duration?: number;
  /** Whether to trigger the animation (default: true) */
  active?: boolean;
  /** Speed of the scramble cycle in ms (default: 40) */
  scrambleSpeed?: number;
  /** Character set for scrambled characters */
  charset?: string;
  /** Resolve pattern: 'left-to-right' | 'right-to-left' | 'random' | 'center-out' */
  pattern?: 'left-to-right' | 'right-to-left' | 'random' | 'center-out';
  /** Additional CSS class */
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

function getResolveOrder(length: number, pattern: DecipherProps['pattern']): number[] {
  const indices = Array.from({ length }, (_, i) => i);

  switch (pattern) {
    case 'right-to-left':
      return indices.reverse();
    case 'random':
      // Fisher-Yates shuffle
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
    case 'center-out': {
      const center = Math.floor(length / 2);
      const ordered: number[] = [center];
      for (let offset = 1; offset < length; offset++) {
        if (center - offset >= 0) ordered.push(center - offset);
        if (center + offset < length) ordered.push(center + offset);
      }
      return ordered;
    }
    case 'left-to-right':
    default:
      return indices;
  }
}

/**
 * Decipher text animation.
 *
 * All characters start scrambled and progressively resolve to the
 * final text. The scramble continues on unresolved characters while
 * resolved ones lock in place.
 */
export function Decipher({
  text,
  duration: totalDuration = 1500,
  active = true,
  scrambleSpeed = 40,
  charset = DEFAULT_CHARSET,
  pattern = 'left-to-right',
  className = '',
  style,
}: DecipherProps) {
  const [displayed, setDisplayed] = useState<string[]>(() => text.split(''));
  const [resolved, setResolved] = useState<boolean[]>(() => text.split('').map(() => !active));
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const randomChar = useCallback(() => charset[Math.floor(Math.random() * charset.length)], [charset]);

  useEffect(() => {
    if (!active) {
      setDisplayed(text.split(''));
      setResolved(text.split('').map(() => true));
      return;
    }

    const chars = text.split('');
    const resolveOrder = getResolveOrder(chars.length, pattern).filter(i => chars[i] !== ' ');
    const resolvedSet = new Set<number>();

    // Mark spaces as immediately resolved
    const initialResolved = chars.map((c) => c === ' ');
    setResolved([...initialResolved]);

    // Start scrambling
    intervalRef.current = setInterval(() => {
      setDisplayed(prev => {
        const next = [...prev];
        for (let i = 0; i < chars.length; i++) {
          if (chars[i] === ' ') {
            next[i] = ' ';
          } else if (!resolvedSet.has(i)) {
            next[i] = randomChar();
          }
        }
        return next;
      });
    }, scrambleSpeed);

    // Progressively resolve characters
    const resolveInterval = totalDuration / resolveOrder.length;
    resolveOrder.forEach((charIndex, step) => {
      setTimeout(() => {
        resolvedSet.add(charIndex);
        setDisplayed(prev => {
          const next = [...prev];
          next[charIndex] = chars[charIndex];
          return next;
        });
        setResolved(prev => {
          const next = [...prev];
          next[charIndex] = true;
          return next;
        });

        // Clear scramble when all resolved
        if (resolvedSet.size === resolveOrder.length && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }, step * resolveInterval);
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, active, totalDuration, scrambleSpeed, charset, pattern, randomChar]);

  return (
    <span
      className={`decipher ${className}`}
      style={{ display: 'inline-flex', fontFamily: 'var(--font-mono)', ...style }}
      aria-label={text}
      role="status"
    >
      {displayed.map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            minWidth: char === ' ' ? '0.3em' : undefined,
            opacity: resolved[i] ? 1 : 0.4,
            color: resolved[i] ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
            transition: `opacity var(--transition-fast), color var(--transition-fast)`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default Decipher;
