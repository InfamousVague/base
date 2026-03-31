/**
 * extract.ts — Extract structured measurement data from a DOM element.
 *
 * Reads computed styles and bounding rects, returning a BlueprintData
 * object that can be rendered by BlueprintSvg and BlueprintPanel.
 */

import type { BlueprintData, Measurement } from './types';

export interface ExtractOptions {
  /** Show padding measurements (default: true) */
  padding?: boolean;
  /** Show border-radius (default: true) */
  radius?: boolean;
  /** Show width/height dimensions (default: true) */
  dimensions?: boolean;
  /** Sibling element for gap measurement */
  gapSibling?: HTMLElement;
  /** Label for the element */
  label?: string;
}

/**
 * Extract measurements from a DOM element relative to a container.
 */
export function extractMeasurements(
  target: HTMLElement,
  container: HTMLElement,
  opts: ExtractOptions = {},
): BlueprintData {
  const {
    padding: showPadding = true,
    radius: showRadius = true,
    dimensions: showDimensions = true,
    gapSibling,
    label,
  } = opts;

  const cs = getComputedStyle(target);
  const tRect = target.getBoundingClientRect();
  const cRect = container.getBoundingClientRect();

  const x = tRect.left - cRect.left;
  const y = tRect.top - cRect.top;
  const w = tRect.width;
  const h = tRect.height;

  const pT = parseFloat(cs.paddingTop) || 0;
  const pR = parseFloat(cs.paddingRight) || 0;
  const pB = parseFloat(cs.paddingBottom) || 0;
  const pL = parseFloat(cs.paddingLeft) || 0;

  const brTL = parseFloat(cs.borderTopLeftRadius) || 0;
  const brTR = parseFloat(cs.borderTopRightRadius) || 0;
  const brBR = parseFloat(cs.borderBottomRightRadius) || 0;
  const brBL = parseFloat(cs.borderBottomLeftRadius) || 0;
  const br = parseFloat(cs.borderRadius) || brTL;

  const measurements: Measurement[] = [];

  // Dimensions
  if (showDimensions) {
    measurements.push({
      id: 'dim-width',
      kind: 'dimension',
      label: 'width',
      value: `${Math.round(w)}px`,
      rawValue: w,
    });
    measurements.push({
      id: 'dim-height',
      kind: 'dimension',
      label: 'height',
      value: `${Math.round(h)}px`,
      rawValue: h,
    });
  }

  // Padding
  if (showPadding) {
    if (pT > 0) measurements.push({ id: 'padding-top', kind: 'padding', label: 'padding-top', value: `${Math.round(pT)}px`, rawValue: pT });
    if (pR > 0) measurements.push({ id: 'padding-right', kind: 'padding', label: 'padding-right', value: `${Math.round(pR)}px`, rawValue: pR });
    if (pB > 0) measurements.push({ id: 'padding-bottom', kind: 'padding', label: 'padding-bottom', value: `${Math.round(pB)}px`, rawValue: pB });
    if (pL > 0) measurements.push({ id: 'padding-left', kind: 'padding', label: 'padding-left', value: `${Math.round(pL)}px`, rawValue: pL });
  }

  // Border radius (clamp to half smallest dimension, matching CSS behavior)
  const maxR = Math.min(w / 2, h / 2);
  if (showRadius && br >= 2) {
    const effectiveTL = Math.min(brTL, maxR);
    measurements.push({ id: 'radius-tl', kind: 'radius', label: 'border-radius', value: `${Math.round(effectiveTL)}px`, rawValue: effectiveTL });
    if (brTR !== brTL) {
      const effectiveTR = Math.min(brTR, maxR);
      measurements.push({ id: 'radius-tr', kind: 'radius', label: 'border-top-right-radius', value: `${Math.round(effectiveTR)}px`, rawValue: effectiveTR });
    }
    if (brBR !== brTL) {
      const effectiveBR = Math.min(brBR, maxR);
      measurements.push({ id: 'radius-br', kind: 'radius', label: 'border-bottom-right-radius', value: `${Math.round(effectiveBR)}px`, rawValue: effectiveBR });
    }
    if (brBL !== brTL) {
      const effectiveBL = Math.min(brBL, maxR);
      measurements.push({ id: 'radius-bl', kind: 'radius', label: 'border-bottom-left-radius', value: `${Math.round(effectiveBL)}px`, rawValue: effectiveBL });
    }
  }

  // Gap
  let gapDirection: 'horizontal' | 'vertical' | undefined;
  let gapValue: number | undefined;

  if (gapSibling) {
    const sRect = gapSibling.getBoundingClientRect();
    const sx = sRect.left - cRect.left;
    const sy = sRect.top - cRect.top;

    if (sx > x + w - 1) {
      gapDirection = 'horizontal';
      gapValue = sx - (x + w);
    } else if (sy > y + h - 1) {
      gapDirection = 'vertical';
      gapValue = sy - (y + h);
    }

    if (gapValue !== undefined && gapValue > 0) {
      measurements.push({
        id: 'gap',
        kind: 'gap',
        label: 'gap',
        value: `${Math.round(gapValue)}px`,
        rawValue: gapValue,
      });
    }
  }

  return {
    x,
    y,
    width: w,
    height: h,
    paddingTop: pT,
    paddingRight: pR,
    paddingBottom: pB,
    paddingLeft: pL,
    borderRadius: br,
    borderRadiusTL: brTL,
    borderRadiusTR: brTR,
    borderRadiusBR: brBR,
    borderRadiusBL: brBL,
    gapDirection,
    gapValue,
    label,
    measurements,
  };
}
