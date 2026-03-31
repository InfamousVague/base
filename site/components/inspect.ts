/**
 * inspect.ts — Lightweight DOM inspection overlays for the Base kit site.
 *
 * Reads computed styles from real elements and renders measurement
 * annotations as an absolutely-positioned SVG overlay.
 *
 * Usage:
 *   import { inspect } from '/components/inspect.ts';
 *   inspect(targetEl, containerEl, { padding: true, radius: true, dimensions: true });
 *
 * The container should be `position: relative` — the overlay is appended inside it.
 */

// ---- Colors (matches our accent ramp) ----
const C = '#5B6BD6';       // accent-6, main annotation color
const C_LIGHT = '#9BA6ED'; // accent-8, fill tint
const C_BG = 'rgba(91,107,214,0.08)';  // translucent fill
const C_PAD = 'rgba(91,107,214,0.14)'; // padding fill

export interface InspectOptions {
  /** Show padding regions and values (default: true) */
  padding?: boolean;
  /** Show border-radius arcs (default: true) */
  radius?: boolean;
  /** Show overall width × height (default: true) */
  dimensions?: boolean;
  /** Show gap between this element and a sibling (default: false) */
  gap?: HTMLElement;
  /** Label to display on the element (default: none) */
  label?: string;
}

// ---- SVG primitive builders ----

function line(x1: number, y1: number, x2: number, y2: number): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C}" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>`;
}

function cap(x: number, y: number, vertical: boolean): string {
  if (vertical) {
    return `<line x1="${x}" y1="${y - 4}" x2="${x}" y2="${y + 4}" stroke="${C}" stroke-width="1" opacity="0.65"/>`;
  }
  return `<line x1="${x - 4}" y1="${y}" x2="${x + 4}" y2="${y}" stroke="${C}" stroke-width="1" opacity="0.65"/>`;
}

function chip(x: number, y: number, text: string): string {
  const w = Math.max(24, text.length * 7 + 10);
  return `<rect x="${x - w / 2}" y="${y - 8}" width="${w}" height="16" rx="3" fill="${C}"/>
          <text x="${x}" y="${y + 3.5}" text-anchor="middle" fill="#fff" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="500">${text}</text>`;
}

function rect(x: number, y: number, w: number, h: number, fill: string): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
}

function outline(x: number, y: number, w: number, h: number, r: number): string {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="none" stroke="${C}" stroke-width="1.5" opacity="0.4"/>`;
}

function hBracket(x1: number, x2: number, y: number, chipY: number, val: string): string {
  return `${line(x1, y, x2, y)}${cap(x1, y, true)}${cap(x2, y, true)}${chip((x1 + x2) / 2, chipY, val)}`;
}

function vBracket(y1: number, y2: number, x: number, chipX: number, val: string): string {
  return `${line(x, y1, x, y2)}${cap(x, y1, false)}${cap(x, y2, false)}${chip(chipX, (y1 + y2) / 2, val)}`;
}

function radiusArc(cx: number, cy: number, r: number, corner: 'tl' | 'tr' | 'bl' | 'br'): string {
  if (r < 2) return '';
  const arcR = Math.min(r, 20);
  let path = '';
  let labelX = cx, labelY = cy;

  switch (corner) {
    case 'tl':
      path = `M ${cx} ${cy + arcR} A ${arcR} ${arcR} 0 0 1 ${cx + arcR} ${cy}`;
      labelX = cx + arcR + 4; labelY = cy + arcR + 10;
      break;
    case 'tr':
      path = `M ${cx - arcR} ${cy} A ${arcR} ${arcR} 0 0 1 ${cx} ${cy + arcR}`;
      labelX = cx - arcR - 4; labelY = cy + arcR + 10;
      break;
    case 'bl':
      path = `M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 1 ${cx} ${cy - arcR}`;
      labelX = cx + arcR + 4; labelY = cy - arcR;
      break;
    case 'br':
      path = `M ${cx} ${cy - arcR} A ${arcR} ${arcR} 0 0 1 ${cx - arcR} ${cy}`;
      labelX = cx - arcR - 4; labelY = cy - arcR;
      break;
  }

  return `<path d="${path}" fill="none" stroke="${C}" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.5"/>
          <text x="${labelX}" y="${labelY}" fill="${C}" font-family="Inter,system-ui,sans-serif" font-size="9" opacity="0.7" text-anchor="${corner.includes('r') ? 'end' : 'start'}">r${arcR}</text>`;
}

// ---- Main inspect function ----

export function inspect(
  target: HTMLElement,
  container: HTMLElement,
  opts: InspectOptions = {},
): HTMLElement {
  const {
    padding: showPadding = true,
    radius: showRadius = true,
    dimensions: showDimensions = true,
    gap: gapSibling,
    label,
  } = opts;

  const cs = getComputedStyle(target);
  const tRect = target.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();

  // Position relative to container
  const x = tRect.left - cRect.left;
  const y = tRect.top - cRect.top;
  const w = tRect.width;
  const h = tRect.height;

  // Parsed values
  const pT = parseFloat(cs.paddingTop) || 0;
  const pR = parseFloat(cs.paddingRight) || 0;
  const pB = parseFloat(cs.paddingBottom) || 0;
  const pL = parseFloat(cs.paddingLeft) || 0;
  const br = parseFloat(cs.borderRadius) || 0;

  // SVG needs extra space for annotations
  const margin = 50;
  const svgW = w + margin * 2;
  const svgH = h + margin * 2;
  const ox = margin; // offset x within SVG
  const oy = margin; // offset y within SVG

  let svg = '';

  // --- Outer outline ---
  svg += outline(ox, oy, w, h, br);

  // --- Padding fills ---
  if (showPadding) {
    if (pL > 0) svg += rect(ox, oy, pL, h, C_PAD);
    if (pR > 0) svg += rect(ox + w - pR, oy, pR, h, C_PAD);
    if (pT > 0) svg += rect(ox + pL, oy, w - pL - pR, pT, C_BG);
    if (pB > 0) svg += rect(ox + pL, oy + h - pB, w - pL - pR, pB, C_BG);

    // Content area dashed outline
    if (pL > 0 || pT > 0) {
      svg += `<rect x="${ox + pL}" y="${oy + pT}" width="${w - pL - pR}" height="${h - pT - pB}" rx="2" fill="none" stroke="${C}" stroke-width="0.75" stroke-dasharray="3 3" opacity="0.2"/>`;
    }

    // Horizontal padding brackets (below element)
    const bracketY = oy + h + 14;
    const chipBY = bracketY + 12;

    if (pL > 0) {
      svg += hBracket(ox, ox + pL, bracketY, chipBY, String(Math.round(pL)));
      // Guide lines from element to bracket
      svg += line(ox, oy + h, ox, bracketY + 4);
      svg += line(ox + pL, oy + h, ox + pL, bracketY + 4);
    }
    if (pR > 0) {
      svg += hBracket(ox + w - pR, ox + w, bracketY, chipBY, String(Math.round(pR)));
      svg += line(ox + w - pR, oy + h, ox + w - pR, bracketY + 4);
      svg += line(ox + w, oy + h, ox + w, bracketY + 4);
    }

    // Vertical padding brackets (right of element)
    const bracketX = ox + w + 14;
    const chipRX = bracketX + 16;

    if (pT > 0) {
      svg += vBracket(oy, oy + pT, bracketX, chipRX, String(Math.round(pT)));
      svg += line(ox + w, oy, bracketX + 4, oy);
      svg += line(ox + w, oy + pT, bracketX + 4, oy + pT);
    }
    if (pB > 0) {
      svg += vBracket(oy + h - pB, oy + h, bracketX, chipRX, String(Math.round(pB)));
      svg += line(ox + w, oy + h - pB, bracketX + 4, oy + h - pB);
      svg += line(ox + w, oy + h, bracketX + 4, oy + h);
    }
  }

  // --- Border radius ---
  if (showRadius && br >= 2) {
    svg += radiusArc(ox, oy, br, 'tl');
  }

  // --- Dimensions ---
  if (showDimensions) {
    const dimY = oy - 14;
    svg += hBracket(ox, ox + w, dimY, dimY - 12, `${Math.round(w)}px`);
    svg += line(ox, oy, ox, dimY);
    svg += line(ox + w, oy, ox + w, dimY);

    const dimX = ox - 14;
    svg += vBracket(oy, oy + h, dimX, dimX - 18, `${Math.round(h)}px`);
    svg += line(ox, oy, dimX, oy);
    svg += line(ox, oy + h, dimX, oy + h);
  }

  // --- Gap measurement ---
  if (gapSibling) {
    const sRect = gapSibling.getBoundingClientRect();
    const sx = sRect.left - cRect.left;
    const sy = sRect.top - cRect.top;

    // Determine if sibling is to the right or below
    if (sx > x + w - 1) {
      // Sibling is to the right — horizontal gap
      const gapPx = sx - (x + w);
      const midY = oy + h / 2;
      svg += hBracket(ox + w, ox + w + gapPx, midY, midY + 14, `${Math.round(gapPx)}px`);
    } else if (sy > y + h - 1) {
      // Sibling is below — vertical gap
      const gapPx = sy - (y + h);
      const midX = ox + w / 2;
      svg += vBracket(oy + h, oy + h + gapPx, midX, midX + 18, `${Math.round(gapPx)}px`);
    }
  }

  // --- Label ---
  if (label) {
    svg += `<text x="${ox + w / 2}" y="${oy + h / 2 + 4}" text-anchor="middle" fill="${C}" font-family="Inter,system-ui,sans-serif" font-size="11" font-weight="500" opacity="0.5">${label}</text>`;
  }

  // --- Create overlay ---
  const overlay = document.createElement('div');
  overlay.className = 'inspect-overlay';
  overlay.style.cssText = `position:absolute;top:${y - margin}px;left:${x - margin}px;width:${svgW}px;height:${svgH}px;pointer-events:none;z-index:10;`;
  overlay.innerHTML = `<svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" style="display:block;">${svg}</svg>`;

  container.appendChild(overlay);
  return overlay;
}

/**
 * Convenience: inspect all elements matching a selector within a container.
 */
export function inspectAll(
  selector: string,
  container: HTMLElement,
  opts: InspectOptions = {},
): HTMLElement[] {
  const els = container.querySelectorAll<HTMLElement>(selector);
  return Array.from(els).map(el => inspect(el, container, opts));
}
