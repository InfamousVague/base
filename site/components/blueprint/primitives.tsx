/**
 * React SVG subcomponents for blueprint measurement annotations.
 * Uses CSS custom properties for theme-adaptive colors.
 */

import React from 'react';

// Color references (resolved via CSS vars at runtime)
const ACCENT = 'var(--accent-6, #5B6BD6)';
const ACCENT_LIGHT = 'var(--accent-8, #9BA6ED)';
const ACCENT_PAD = 'var(--blueprint-pad-fill, rgba(91,107,214,0.14))';
const ACCENT_BG = 'var(--blueprint-bg-fill, rgba(91,107,214,0.08))';

interface MeasurementGroupProps {
  id: string;
  visible: boolean;
  children: React.ReactNode;
}

/** Wrapper group that supports isolation animation */
export function MeasurementGroup({ id, visible, children }: MeasurementGroupProps) {
  return (
    <g
      data-measurement-id={id}
      className={`blueprint-annotation${visible ? '' : ' blueprint-annotation--hidden'}`}
    >
      {children}
    </g>
  );
}

/** Measurement label chip (accent rounded rect with white text) */
export function Chip({ x, y, text }: { x: number; y: number; text: string }) {
  const w = Math.max(28, text.length * 7.5 + 12);
  return (
    <>
      <rect x={x - w / 2} y={y - 9} width={w} height={18} rx={4} fill={ACCENT} />
      <text
        x={x}
        y={y + 3.5}
        textAnchor="middle"
        fill="#fff"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize={10}
        fontWeight={500}
      >
        {text}
      </text>
    </>
  );
}

/** Dashed line */
export function DashedLine({
  x1, y1, x2, y2, opacity = 0.5,
}: {
  x1: number; y1: number; x2: number; y2: number; opacity?: number;
}) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={ACCENT}
      strokeWidth={1}
      strokeDasharray="4 3"
      opacity={opacity}
    />
  );
}

/** End-cap tick mark */
export function Cap({ x, y, vertical }: { x: number; y: number; vertical: boolean }) {
  if (vertical) {
    return <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke={ACCENT} strokeWidth={1} opacity={0.65} />;
  }
  return <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke={ACCENT} strokeWidth={1} opacity={0.65} />;
}

/** Horizontal measurement bracket with chip label */
export function HBracket({
  x1, x2, y, chipY, label,
}: {
  x1: number; x2: number; y: number; chipY: number; label: string;
}) {
  return (
    <>
      <DashedLine x1={x1} y1={y} x2={x2} y2={y} />
      <Cap x={x1} y={y} vertical />
      <Cap x={x2} y={y} vertical />
      <Chip x={(x1 + x2) / 2} y={chipY} text={label} />
    </>
  );
}

/** Vertical measurement bracket with chip label */
export function VBracket({
  y1, y2, x, chipX, label,
}: {
  y1: number; y2: number; x: number; chipX: number; label: string;
}) {
  return (
    <>
      <DashedLine x1={x} y1={y1} x2={x} y2={y2} />
      <Cap x={x} y={y1} vertical={false} />
      <Cap x={x} y={y2} vertical={false} />
      <Chip x={chipX} y={(y1 + y2) / 2} text={label} />
    </>
  );
}

/** Padding fill region */
export function PadFill({
  x, y, w, h, type = 'side',
}: {
  x: number; y: number; w: number; h: number; type?: 'side' | 'top';
}) {
  return <rect x={x} y={y} width={w} height={h} fill={type === 'side' ? ACCENT_PAD : ACCENT_BG} />;
}

/** Border radius arc indicator */
export function RadiusArc({
  cx, cy, r, corner, elementWidth, elementHeight,
}: {
  cx: number; cy: number; r: number; corner: 'tl' | 'tr' | 'bl' | 'br';
  elementWidth?: number; elementHeight?: number;
}) {
  if (r < 2) return null;
  // Clamp to half smallest dimension (CSS behavior) then to max visual size
  const effectiveR = elementWidth && elementHeight
    ? Math.min(r, elementWidth / 2, elementHeight / 2)
    : r;
  const arcR = Math.min(effectiveR, 20);
  let d = '';
  let labelX = cx;
  let labelY = cy;
  let anchor: 'start' | 'end' = 'start';

  switch (corner) {
    case 'tl':
      d = `M ${cx} ${cy + arcR} A ${arcR} ${arcR} 0 0 1 ${cx + arcR} ${cy}`;
      labelX = cx + arcR + 4;
      labelY = cy + arcR + 10;
      break;
    case 'tr':
      d = `M ${cx - arcR} ${cy} A ${arcR} ${arcR} 0 0 1 ${cx} ${cy + arcR}`;
      labelX = cx - arcR - 4;
      labelY = cy + arcR + 10;
      anchor = 'end';
      break;
    case 'bl':
      d = `M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 1 ${cx} ${cy - arcR}`;
      labelX = cx + arcR + 4;
      labelY = cy - arcR;
      break;
    case 'br':
      d = `M ${cx} ${cy - arcR} A ${arcR} ${arcR} 0 0 1 ${cx - arcR} ${cy}`;
      labelX = cx - arcR - 4;
      labelY = cy - arcR;
      anchor = 'end';
      break;
  }

  return (
    <>
      <path
        d={d}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1.5}
        strokeDasharray="3 2"
        opacity={0.5}
      />
      <text
        x={labelX}
        y={labelY}
        fill={ACCENT}
        fontFamily="Inter, system-ui, sans-serif"
        fontSize={9}
        opacity={0.7}
        textAnchor={anchor}
      >
        r{Math.round(effectiveR)}
      </text>
    </>
  );
}

/** Element outline */
export function Outline({
  x, y, w, h, r,
}: {
  x: number; y: number; w: number; h: number; r: number;
}) {
  // Clamp radius to half the smallest dimension (matches CSS behavior)
  const effectiveR = Math.min(r, w / 2, h / 2);
  return (
    <rect
      x={x} y={y} width={w} height={h}
      rx={effectiveR}
      fill="none"
      stroke={ACCENT}
      strokeWidth={1.5}
      opacity={0.4}
    />
  );
}
