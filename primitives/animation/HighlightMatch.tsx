import React, { useMemo } from 'react';
import type { CSSProperties } from 'react';

export interface HighlightMatchProps {
  /** The full text to render */
  text: string;
  /** Character indices that are matched (highlighted) */
  indices: number[];
  /** Highlight style: 'accent' uses accent color, 'gradient' uses animated gradient */
  variant?: 'accent' | 'gradient';
  /** Gradient colors (only used when variant='gradient') */
  gradientColors?: string[];
  /** Animation speed for gradient in ms (default: 3000) */
  gradientSpeed?: number;
  /** Additional CSS class */
  className?: string;
  style?: CSSProperties;
}

interface Segment {
  text: string;
  matched: boolean;
}

/**
 * Text with matched characters highlighted.
 *
 * Consecutive matched characters are grouped into spans with an accent
 * or animated gradient treatment. Useful for fuzzy search results.
 */
export function HighlightMatch({
  text,
  indices,
  variant = 'accent',
  gradientColors = ['var(--color-accent)', 'var(--purple-6)', 'var(--pink-6)', 'var(--color-accent)'],
  gradientSpeed = 3000,
  className = '',
  style,
}: HighlightMatchProps) {
  const segments = useMemo<Segment[]>(() => {
    if (indices.length === 0) return [{ text, matched: false }];

    const matchSet = new Set(indices);
    const segs: Segment[] = [];
    let current = '';
    let currentMatched = false;

    for (let i = 0; i < text.length; i++) {
      const isMatch = matchSet.has(i);
      if (i === 0) {
        currentMatched = isMatch;
        current = text[i];
      } else if (isMatch === currentMatched) {
        current += text[i];
      } else {
        segs.push({ text: current, matched: currentMatched });
        current = text[i];
        currentMatched = isMatch;
      }
    }
    if (current) segs.push({ text: current, matched: currentMatched });
    return segs;
  }, [text, indices]);

  const gradientStyle: CSSProperties = variant === 'gradient' ? {
    backgroundImage: `linear-gradient(90deg, ${gradientColors.join(', ')})`,
    backgroundSize: '300% 300%',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `highlight-gradient ${gradientSpeed}ms ease infinite`,
  } : {};

  const accentStyle: CSSProperties = variant === 'accent' ? {
    color: 'var(--color-accent)',
    fontWeight: 'var(--weight-semibold)' as string,
  } : {};

  const matchStyle = variant === 'gradient' ? gradientStyle : accentStyle;

  return (
    <span className={`highlight-match ${className}`} style={style}>
      {segments.map((seg, i) =>
        seg.matched ? (
          <span key={i} className="highlight-match__hit" style={matchStyle}>
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </span>
  );
}

export default HighlightMatch;
