import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

type SpacingToken = '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';
type GridAlign = 'start' | 'center' | 'end' | 'stretch';

export interface GridProps {
  /** Number of columns (number uses repeat(N, 1fr)) or CSS string */
  columns?: number | string;
  /** Gap between all cells */
  gap?: SpacingToken;
  /** Row gap override */
  rowGap?: SpacingToken;
  /** Column gap override */
  columnGap?: SpacingToken;
  /** Cross-axis alignment */
  align?: GridAlign;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

export interface GridItemProps {
  /** Number of columns to span */
  span?: number;
  /** Column start position */
  start?: number;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Grid primitive.
 *
 * CSS Grid layout with token-mapped gap and alignment props.
 */
export function Grid({
  columns,
  gap,
  rowGap,
  columnGap,
  align,
  className = '',
  style,
  children,
}: GridProps) {
  const classes = [
    'grid',
    gap ? `grid--gap-${gap}` : '',
    rowGap ? `grid--row-gap-${rowGap}` : '',
    columnGap ? `grid--col-gap-${columnGap}` : '',
    align ? `grid--align-${align}` : '',
    className,
  ].filter(Boolean).join(' ');

  const gridStyle: CSSProperties = { ...style };
  if (columns !== undefined) {
    gridStyle.gridTemplateColumns =
      typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns;
  }

  return (
    <div className={classes} style={gridStyle}>
      {children}
    </div>
  );
}

/**
 * GridItem primitive.
 *
 * Child of Grid with span and start positioning.
 */
export function GridItem({
  span,
  start,
  className = '',
  style,
  children,
}: GridItemProps) {
  const itemStyle: CSSProperties = { ...style };
  if (span !== undefined) {
    itemStyle.gridColumn = `span ${span}`;
  }
  if (start !== undefined) {
    itemStyle.gridColumnStart = start;
  }

  const classes = ['grid-item', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={itemStyle}>
      {children}
    </div>
  );
}

export default Grid;
