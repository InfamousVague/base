/**
 * Unified spec diagram primitives.
 * All measurement annotations use the same blue color scheme.
 * These are SVG string builders — no DOM measurement, fully deterministic.
 */

export const SPEC_BLUE = '#648CFF';
export const SPEC_BLUE_LIGHT = '#B8CCFF';

/** Measurement label chip (blue rounded rect with white text) */
export function chip(x: number, y: number, val: number | string): string {
  const text = String(val);
  const w = Math.max(28, text.length * 8 + 12);
  return `<rect x="${x - w/2}" y="${y - 9}" width="${w}" height="18" rx="3" fill="${SPEC_BLUE}"/>
          <text x="${x}" y="${y + 4}" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="11" font-weight="500">${text}</text>`;
}

/** Dashed vertical line */
export function vLine(x: number, y1: number, y2: number): string {
  return `<line x1="${x}" x2="${x}" y1="${y1}" y2="${y2}" stroke="${SPEC_BLUE}" stroke-width="1" stroke-dasharray="4 3" opacity="0.45"/>`;
}

/** Dashed horizontal line */
export function hLine(x1: number, x2: number, y: number): string {
  return `<line x1="${x1}" x2="${x2}" y1="${y}" y2="${y}" stroke="${SPEC_BLUE}" stroke-width="1" stroke-dasharray="4 3" opacity="0.45"/>`;
}

/** Vertical end-cap (small horizontal tick) */
export function vCap(x: number, y: number): string {
  return `<line x1="${x - 4}" x2="${x + 4}" y1="${y}" y2="${y}" stroke="${SPEC_BLUE}" stroke-width="1" opacity="0.6"/>`;
}

/** Horizontal end-cap (small vertical tick) */
export function hCap(x: number, y: number): string {
  return `<line x1="${x}" x2="${x}" y1="${y - 4}" y2="${y + 4}" stroke="${SPEC_BLUE}" stroke-width="1" opacity="0.6"/>`;
}

/** Padding fill region (translucent blue rect) */
export function padFill(x: number, y: number, w: number, h: number, opacity = 0.2): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${SPEC_BLUE_LIGHT}" opacity="${opacity}"/>`;
}

/** Corner radius arc with label */
export function radiusArc(cx: number, cy: number, r: number): string {
  const arcR = Math.min(r, 24);
  return `<path d="M ${cx} ${cy + arcR} A ${arcR} ${arcR} 0 0 1 ${cx + arcR} ${cy}" fill="none" stroke="${SPEC_BLUE}" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.5"/>
          <text x="${cx + arcR + 6}" y="${cy + arcR + 10}" fill="${SPEC_BLUE}" font-family="Inter,sans-serif" font-size="10" opacity="0.6">r: ${r}</text>`;
}

/**
 * Draw a complete horizontal measurement bracket below two vertical guide lines.
 * x1, x2: the two x positions to measure between
 * guideTop: where vertical guides start
 * bracketY: y position of the horizontal bracket
 * chipY: y position of the label chip
 * value: the measurement value to display
 */
export function hMeasure(x1: number, x2: number, guideTop: number, bracketY: number, chipY: number, value: number | string): string {
  return `${vLine(x1, guideTop, bracketY + 4)}
          ${vLine(x2, guideTop, bracketY + 4)}
          ${hLine(x1, x2, bracketY)}
          ${hCap(x1, bracketY)}
          ${hCap(x2, bracketY)}
          ${chip((x1 + x2) / 2, chipY, value)}`;
}

/**
 * Draw a complete vertical measurement bracket to the right of the element.
 * y1, y2: the two y positions to measure between
 * lineLeft: where horizontal guide lines start (usually element right edge)
 * bracketX: x position of the vertical bracket line
 * chipX: x position of the label chip
 * value: the measurement value to display
 */
export function vMeasure(y1: number, y2: number, lineLeft: number, bracketX: number, chipX: number, value: number | string): string {
  return `${hLine(lineLeft, bracketX + 6, y1)}
          ${hLine(lineLeft, bracketX + 6, y2)}
          ${vLine(bracketX, y1, y2)}
          ${vCap(bracketX, y1)}
          ${vCap(bracketX, y2)}
          ${chip(chipX, (y1 + y2) / 2, value)}`;
}
