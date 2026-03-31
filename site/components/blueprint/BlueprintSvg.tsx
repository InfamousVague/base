/**
 * BlueprintSvg — Renders measurement annotations as an SVG overlay.
 *
 * Supports isolation animation: when a measurement is highlighted,
 * all other annotations are hidden.
 */

import React from 'react';
import type { BlueprintData } from './types';
import {
  MeasurementGroup,
  Outline,
  PadFill,
  DashedLine,
  HBracket,
  VBracket,
  RadiusArc,
} from './primitives';

interface BlueprintSvgProps {
  data: BlueprintData;
  /** ID of the currently highlighted measurement (click-locked) */
  highlightedId: string | null;
  /** ID of the currently hovered measurement (temporary) */
  hoveredId: string | null;
  /** Margin around the element for annotation space */
  margin?: number;
}

export function BlueprintSvg({
  data,
  highlightedId,
  hoveredId,
  margin = 50,
}: BlueprintSvgProps) {
  const { width: w, height: h, paddingTop: pT, paddingRight: pR, paddingBottom: pB, paddingLeft: pL } = data;
  const br = data.borderRadius;

  const svgW = w + margin * 2;
  const svgH = h + margin * 2;
  const ox = margin;
  const oy = margin;

  // Determine which measurement is "active" (highlighted or hovered)
  const activeId = highlightedId ?? hoveredId;

  // If any measurement is active, only that one is visible (isolation mode)
  const isVisible = (id: string) => !activeId || activeId === id;

  return (
    <svg
      className="blueprint__svg"
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ top: data.y - margin, left: data.x - margin }}
    >
      {/* Outer element outline — always visible */}
      <Outline x={ox} y={oy} w={w} h={h} r={br} />

      {/* Padding fills */}
      {pL > 0 && (
        <MeasurementGroup id="padding-left" visible={isVisible('padding-left')}>
          <PadFill x={ox} y={oy} w={pL} h={h} type="side" />
          <HBracket
            x1={ox} x2={ox + pL}
            y={oy + h + 14} chipY={oy + h + 26}
            label={`${Math.round(pL)}`}
          />
          <DashedLine x1={ox} y1={oy + h} x2={ox} y2={oy + h + 18} opacity={0.3} />
          <DashedLine x1={ox + pL} y1={oy + h} x2={ox + pL} y2={oy + h + 18} opacity={0.3} />
        </MeasurementGroup>
      )}

      {pR > 0 && (
        <MeasurementGroup id="padding-right" visible={isVisible('padding-right')}>
          <PadFill x={ox + w - pR} y={oy} w={pR} h={h} type="side" />
          <HBracket
            x1={ox + w - pR} x2={ox + w}
            y={oy + h + 14} chipY={oy + h + 26}
            label={`${Math.round(pR)}`}
          />
          <DashedLine x1={ox + w - pR} y1={oy + h} x2={ox + w - pR} y2={oy + h + 18} opacity={0.3} />
          <DashedLine x1={ox + w} y1={oy + h} x2={ox + w} y2={oy + h + 18} opacity={0.3} />
        </MeasurementGroup>
      )}

      {pT > 0 && (
        <MeasurementGroup id="padding-top" visible={isVisible('padding-top')}>
          <PadFill x={ox + pL} y={oy} w={w - pL - pR} h={pT} type="top" />
          <VBracket
            y1={oy} y2={oy + pT}
            x={ox + w + 14} chipX={ox + w + 28}
            label={`${Math.round(pT)}`}
          />
          <DashedLine x1={ox + w} y1={oy} x2={ox + w + 18} y2={oy} opacity={0.3} />
          <DashedLine x1={ox + w} y1={oy + pT} x2={ox + w + 18} y2={oy + pT} opacity={0.3} />
        </MeasurementGroup>
      )}

      {pB > 0 && (
        <MeasurementGroup id="padding-bottom" visible={isVisible('padding-bottom')}>
          <PadFill x={ox + pL} y={oy + h - pB} w={w - pL - pR} h={pB} type="top" />
          <VBracket
            y1={oy + h - pB} y2={oy + h}
            x={ox + w + 14} chipX={ox + w + 28}
            label={`${Math.round(pB)}`}
          />
          <DashedLine x1={ox + w} y1={oy + h - pB} x2={ox + w + 18} y2={oy + h - pB} opacity={0.3} />
          <DashedLine x1={ox + w} y1={oy + h} x2={ox + w + 18} y2={oy + h} opacity={0.3} />
        </MeasurementGroup>
      )}

      {/* Content area dashed outline */}
      {(pL > 0 || pT > 0) && (
        <rect
          x={ox + pL} y={oy + pT}
          width={w - pL - pR} height={h - pT - pB}
          rx={2}
          fill="none"
          stroke="var(--accent-6, #5B6BD6)"
          strokeWidth={0.75}
          strokeDasharray="3 3"
          opacity={0.2}
        />
      )}

      {/* Dimensions — width */}
      <MeasurementGroup id="dim-width" visible={isVisible('dim-width')}>
        <HBracket
          x1={ox} x2={ox + w}
          y={oy - 14} chipY={oy - 26}
          label={`${Math.round(w)}px`}
        />
        <DashedLine x1={ox} y1={oy} x2={ox} y2={oy - 18} opacity={0.3} />
        <DashedLine x1={ox + w} y1={oy} x2={ox + w} y2={oy - 18} opacity={0.3} />
      </MeasurementGroup>

      {/* Dimensions — height */}
      <MeasurementGroup id="dim-height" visible={isVisible('dim-height')}>
        <VBracket
          y1={oy} y2={oy + h}
          x={ox - 14} chipX={ox - 28}
          label={`${Math.round(h)}px`}
        />
        <DashedLine x1={ox} y1={oy} x2={ox - 18} y2={oy} opacity={0.3} />
        <DashedLine x1={ox} y1={oy + h} x2={ox - 18} y2={oy + h} opacity={0.3} />
      </MeasurementGroup>

      {/* Border radius — top-left */}
      {data.borderRadiusTL >= 2 && (
        <MeasurementGroup id="radius-tl" visible={isVisible('radius-tl')}>
          <RadiusArc cx={ox} cy={oy} r={data.borderRadiusTL} corner="tl" elementWidth={w} elementHeight={h} />
        </MeasurementGroup>
      )}

      {/* Gap measurement */}
      {data.gapValue && data.gapDirection === 'horizontal' && (
        <MeasurementGroup id="gap" visible={isVisible('gap')}>
          <HBracket
            x1={ox + w} x2={ox + w + data.gapValue}
            y={oy + h / 2} chipY={oy + h / 2 + 14}
            label={`${Math.round(data.gapValue)}px`}
          />
        </MeasurementGroup>
      )}

      {data.gapValue && data.gapDirection === 'vertical' && (
        <MeasurementGroup id="gap" visible={isVisible('gap')}>
          <VBracket
            y1={oy + h} y2={oy + h + data.gapValue}
            x={ox + w / 2} chipX={ox + w / 2 + 18}
            label={`${Math.round(data.gapValue)}px`}
          />
        </MeasurementGroup>
      )}

      {/* Element label */}
      {data.label && (
        <text
          x={ox + w / 2}
          y={oy + h / 2 + 4}
          textAnchor="middle"
          fill="var(--accent-6, #5B6BD6)"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize={11}
          fontWeight={500}
          opacity={0.5}
        >
          {data.label}
        </text>
      )}
    </svg>
  );
}
