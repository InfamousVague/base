/**
 * Blueprint system data types.
 *
 * Structured representation of component measurements
 * for the interactive blueprint inspector.
 */

export type MeasurementKind = 'padding' | 'dimension' | 'radius' | 'gap';

export interface Measurement {
  /** Stable identifier (e.g., "padding-top", "dim-width", "radius-tl") */
  id: string;
  /** Measurement category */
  kind: MeasurementKind;
  /** CSS property name or label (e.g., "padding-top", "width") */
  label: string;
  /** Formatted value string (e.g., "16px", "4px") */
  value: string;
  /** Raw numeric pixel value */
  rawValue: number;
}

export interface BlueprintData {
  /** Element position relative to the container */
  x: number;
  y: number;
  /** Element dimensions */
  width: number;
  height: number;
  /** Padding values (px) */
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  /** Border radius (px, first corner) */
  borderRadius: number;
  /** Per-corner radii if they differ */
  borderRadiusTL: number;
  borderRadiusTR: number;
  borderRadiusBR: number;
  borderRadiusBL: number;
  /** Optional gap to a sibling */
  gapDirection?: 'horizontal' | 'vertical';
  gapValue?: number;
  /** Optional component label */
  label?: string;
  /** All extracted measurements for panel display */
  measurements: Measurement[];
}
