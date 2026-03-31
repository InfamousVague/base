import React, { useState, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

export interface SlotMachineProps {
  /** The final text to display */
  text: string;
  /** Duration per character in ms (default: 600) */
  charDuration?: number;
  /** Stagger delay between characters in ms (default: 50) */
  stagger?: number;
  /** Whether to trigger the animation (default: true) */
  active?: boolean;
  /** Number of random characters to cycle through before landing (default: 6) */
  cycles?: number;
  /** Character set to pick random chars from */
  charset?: string;
  /** Additional CSS class */
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Slot machine text animation.
 *
 * Each character rolls through random values before landing on its
 * final character. Characters are staggered left-to-right (or
 * right-to-left in RTL) for a cascading effect.
 */
export function SlotMachine({
  text,
  charDuration = 600,
  stagger = 50,
  active = true,
  cycles = 6,
  charset = DEFAULT_CHARSET,
  className = '',
  style,
}: SlotMachineProps) {
  const [displayed, setDisplayed] = useState<string[]>(() => text.split(''));
  const [settled, setSettled] = useState<boolean[]>(() => text.split('').map(() => !active));
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    if (!active) {
      setDisplayed(text.split(''));
      setSettled(text.split('').map(() => true));
      return;
    }

    const chars = text.split('');
    const newDisplayed = [...chars];
    const newSettled = chars.map(() => false);

    // Initialise with random chars (except spaces)
    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === ' ') {
        newDisplayed[i] = ' ';
        newSettled[i] = true;
      } else {
        newDisplayed[i] = charset[Math.floor(Math.random() * charset.length)];
      }
    }

    setDisplayed([...newDisplayed]);
    setSettled([...newSettled]);

    // Clear any previous intervals
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];

    // For each character, cycle through randoms then settle
    chars.forEach((finalChar, i) => {
      if (finalChar === ' ') return;

      const delay = i * stagger;
      const cycleInterval = charDuration / cycles;
      let count = 0;

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          count++;
          if (count >= cycles) {
            clearInterval(interval);
            setDisplayed(prev => {
              const next = [...prev];
              next[i] = finalChar;
              return next;
            });
            setSettled(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          } else {
            setDisplayed(prev => {
              const next = [...prev];
              next[i] = charset[Math.floor(Math.random() * charset.length)];
              return next;
            });
          }
        }, cycleInterval);
        intervalsRef.current.push(interval);
      }, delay);

      intervalsRef.current.push(timer as unknown as ReturnType<typeof setInterval>);
    });

    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, [text, active, charDuration, stagger, cycles, charset]);

  return (
    <span
      className={`slot-machine ${className}`}
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
            opacity: settled[i] ? 1 : 0.5,
            transition: `opacity var(--transition-fast)`,
            animation: !settled[i] ? `slot-roll ${charDuration}ms var(--ease-out) forwards` : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default SlotMachine;
