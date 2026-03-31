import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type SparklineColor = 'accent' | 'success' | 'error' | 'warning' | 'info';

export interface SparklineProps {
  /** Data points to plot */
  data: number[];
  /** SVG width in pixels */
  width?: number;
  /** SVG height in pixels */
  height?: number;
  /** Line/area color */
  color?: SparklineColor;
  /** Fill area under the line */
  filled?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

function buildPoints(data: number[], width: number, height: number, padding: number = 1): string {
  if (data.length === 0) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (width - padding * 2) / Math.max(data.length - 1, 1);

  return data
    .map((val, i) => {
      const x = padding + i * stepX;
      const y = padding + (1 - (val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');
}

function buildAreaPoints(data: number[], width: number, height: number, padding: number = 1): string {
  if (data.length === 0) return '';
  const linePoints = buildPoints(data, width, height, padding);
  const lastX = padding + (data.length - 1) * ((width - padding * 2) / Math.max(data.length - 1, 1));
  const firstX = padding;
  return `${firstX},${height - padding} ${linePoints} ${lastX},${height - padding}`;
}

/**
 * Sparkline primitive.
 *
 * Tiny inline SVG chart for trend visualization.
 */
export function Sparkline({
  data,
  width = 80,
  height = 24,
  color,
  filled = false,
  skeleton = false,
  className = '',
  style,
}: SparklineProps) {
  if (skeleton) {
    return <Skeleton width={width} height={height} shape="default" className={className} style={style} />;
  }

  const classes = [
    'sparkline',
    color ? `sparkline--${color}` : '',
    className,
  ].filter(Boolean).join(' ');

  const points = buildPoints(data, width, height);
  const areaPoints = filled ? buildAreaPoints(data, width, height) : '';

  return (
    <svg className={classes} style={style} width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {filled && areaPoints && (
        <polygon className="sparkline__area" points={areaPoints} />
      )}
      {points && (
        <polyline className="sparkline__line" points={points} />
      )}
    </svg>
  );
}

export default Sparkline;
