/**
 * BlueprintPanel — Visual mini-map with clickable measurement regions.
 *
 * Renders a schematic box diagram representing the component's box model.
 * Padding regions, dimension edges, and radius corners are clickable.
 * Hover = temporary highlight, Click = locked highlight (isolation).
 */

import React from 'react';
import type { BlueprintData, Measurement, MeasurementKind } from './types';

interface BlueprintPanelProps {
  data: BlueprintData;
  highlightedId: string | null;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string | null) => void;
}

/** Group measurements by kind */
function groupByKind(measurements: Measurement[]): Record<MeasurementKind, Measurement[]> {
  const groups: Record<MeasurementKind, Measurement[]> = {
    dimension: [],
    padding: [],
    radius: [],
    gap: [],
  };
  for (const m of measurements) {
    groups[m.kind].push(m);
  }
  return groups;
}

const kindLabels: Record<MeasurementKind, string> = {
  dimension: 'Dimensions',
  padding: 'Padding',
  radius: 'Radius',
  gap: 'Gap',
};

export function BlueprintPanel({
  data,
  highlightedId,
  hoveredId,
  onHover,
  onSelect,
}: BlueprintPanelProps) {
  const activeId = highlightedId ?? hoveredId;
  const groups = groupByKind(data.measurements);

  const handleClick = (id: string) => {
    onSelect(highlightedId === id ? null : id);
  };

  // Mini-map dimensions (fixed viewport)
  const mapW = 160;
  const mapH = 100;
  const pad = 20; // visual padding in the mini-map

  // Scale factor to fit element into mini-map
  const scaleX = (mapW - pad * 2) / Math.max(data.width, 1);
  const scaleY = (mapH - pad * 2) / Math.max(data.height, 1);
  const scale = Math.min(scaleX, scaleY, 1);

  const elW = data.width * scale;
  const elH = data.height * scale;
  const elX = (mapW - elW) / 2;
  const elY = (mapH - elH) / 2;

  const pT = data.paddingTop * scale;
  const pR = data.paddingRight * scale;
  const pB = data.paddingBottom * scale;
  const pL = data.paddingLeft * scale;

  const isActive = (id: string) => activeId === id;

  return (
    <div className="blueprint__panel">
      {/* Visual mini-map */}
      <div className="blueprint__minimap">
        <svg width={mapW} height={mapH} viewBox={`0 0 ${mapW} ${mapH}`}>
          {/* Element box */}
          <rect
            x={elX} y={elY} width={elW} height={elH}
            rx={Math.min(data.borderRadius * scale, 8)}
            fill="var(--color-bg-inset)"
            stroke="var(--accent-6, #5B6BD6)"
            strokeWidth={1.5}
            opacity={0.5}
          />

          {/* Padding regions — clickable */}
          {data.paddingTop > 0 && (
            <rect
              x={elX + pL} y={elY} width={elW - pL - pR} height={pT}
              fill={isActive('padding-top') ? 'var(--accent-6, #5B6BD6)' : 'var(--accent-8, #9BA6ED)'}
              opacity={isActive('padding-top') ? 0.5 : 0.15}
              rx={1}
              className="blueprint__minimap-region"
              onMouseEnter={() => onHover('padding-top')}
              onMouseLeave={() => onHover(null)}
              onClick={() => handleClick('padding-top')}
            />
          )}
          {data.paddingBottom > 0 && (
            <rect
              x={elX + pL} y={elY + elH - pB} width={elW - pL - pR} height={pB}
              fill={isActive('padding-bottom') ? 'var(--accent-6, #5B6BD6)' : 'var(--accent-8, #9BA6ED)'}
              opacity={isActive('padding-bottom') ? 0.5 : 0.15}
              rx={1}
              className="blueprint__minimap-region"
              onMouseEnter={() => onHover('padding-bottom')}
              onMouseLeave={() => onHover(null)}
              onClick={() => handleClick('padding-bottom')}
            />
          )}
          {data.paddingLeft > 0 && (
            <rect
              x={elX} y={elY} width={pL} height={elH}
              fill={isActive('padding-left') ? 'var(--accent-6, #5B6BD6)' : 'var(--accent-8, #9BA6ED)'}
              opacity={isActive('padding-left') ? 0.5 : 0.15}
              rx={1}
              className="blueprint__minimap-region"
              onMouseEnter={() => onHover('padding-left')}
              onMouseLeave={() => onHover(null)}
              onClick={() => handleClick('padding-left')}
            />
          )}
          {data.paddingRight > 0 && (
            <rect
              x={elX + elW - pR} y={elY} width={pR} height={elH}
              fill={isActive('padding-right') ? 'var(--accent-6, #5B6BD6)' : 'var(--accent-8, #9BA6ED)'}
              opacity={isActive('padding-right') ? 0.5 : 0.15}
              rx={1}
              className="blueprint__minimap-region"
              onMouseEnter={() => onHover('padding-right')}
              onMouseLeave={() => onHover(null)}
              onClick={() => handleClick('padding-right')}
            />
          )}

          {/* Content area (inner box) */}
          <rect
            x={elX + pL} y={elY + pT}
            width={Math.max(elW - pL - pR, 0)}
            height={Math.max(elH - pT - pB, 0)}
            fill="none"
            stroke="var(--accent-6, #5B6BD6)"
            strokeWidth={0.75}
            strokeDasharray="2 2"
            opacity={0.25}
          />

          {/* Radius indicator (top-left corner dot) */}
          {data.borderRadius >= 2 && (
            <circle
              cx={elX + Math.min(data.borderRadius * scale, 8)}
              cy={elY + Math.min(data.borderRadius * scale, 8)}
              r={3}
              fill={isActive('radius-tl') ? 'var(--accent-6, #5B6BD6)' : 'var(--accent-8, #9BA6ED)'}
              opacity={isActive('radius-tl') ? 0.8 : 0.4}
              className="blueprint__minimap-region"
              onMouseEnter={() => onHover('radius-tl')}
              onMouseLeave={() => onHover(null)}
              onClick={() => handleClick('radius-tl')}
            />
          )}

          {/* Dimension edge indicators */}
          {/* Width — top edge */}
          <line
            x1={elX} y1={elY - 4} x2={elX + elW} y2={elY - 4}
            stroke={isActive('dim-width') ? 'var(--accent-6, #5B6BD6)' : 'var(--accent-8, #9BA6ED)'}
            strokeWidth={isActive('dim-width') ? 2.5 : 1.5}
            opacity={isActive('dim-width') ? 0.8 : 0.3}
            className="blueprint__minimap-region"
            onMouseEnter={() => onHover('dim-width')}
            onMouseLeave={() => onHover(null)}
            onClick={() => handleClick('dim-width')}
            style={{ cursor: 'pointer' }}
          />
          {/* Height — left edge */}
          <line
            x1={elX - 4} y1={elY} x2={elX - 4} y2={elY + elH}
            stroke={isActive('dim-height') ? 'var(--accent-6, #5B6BD6)' : 'var(--accent-8, #9BA6ED)'}
            strokeWidth={isActive('dim-height') ? 2.5 : 1.5}
            opacity={isActive('dim-height') ? 0.8 : 0.3}
            className="blueprint__minimap-region"
            onMouseEnter={() => onHover('dim-height')}
            onMouseLeave={() => onHover(null)}
            onClick={() => handleClick('dim-height')}
            style={{ cursor: 'pointer' }}
          />
        </svg>
      </div>

      {/* Measurement list grouped by kind */}
      <div className="blueprint__measurements">
        {(Object.keys(kindLabels) as MeasurementKind[]).map(kind => {
          const items = groups[kind];
          if (items.length === 0) return null;

          return (
            <div className="blueprint__measure-group" key={kind}>
              <div className="blueprint__measure-kind">{kindLabels[kind]}</div>
              {items.map(m => (
                <button
                  key={m.id}
                  type="button"
                  className={`blueprint__measure-row${activeId === m.id ? ' blueprint__measure-row--active' : ''}`}
                  onMouseEnter={() => onHover(m.id)}
                  onMouseLeave={() => onHover(null)}
                  onClick={() => handleClick(m.id)}
                >
                  <span className="blueprint__measure-label">{m.label}</span>
                  <span className="blueprint__measure-value">{m.value}</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
