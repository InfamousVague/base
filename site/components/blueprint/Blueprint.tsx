/**
 * Blueprint — Interactive component measurement inspector.
 *
 * Wraps a component, extracts its measurements from the DOM,
 * and renders an SVG overlay + visual mini-map panel.
 *
 * Usage:
 *   <Blueprint label="Button">
 *     <Button>Click me</Button>
 *   </Blueprint>
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { BlueprintData } from './types';
import { extractMeasurements } from './extract';
import { BlueprintSvg } from './BlueprintSvg';
import { BlueprintPanel } from './BlueprintPanel';

interface BlueprintProps {
  children: React.ReactNode;
  /** Optional label displayed on the element in the SVG */
  label?: string;
  /** Margin around element for annotations (default: 50) */
  margin?: number;
}

export function Blueprint({ children, label, margin = 50 }: BlueprintProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<BlueprintData | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    // Extract measurements after mount + paint
    const frame = requestAnimationFrame(() => {
      if (!targetRef.current || !containerRef.current) return;

      // Find the first child element to inspect
      const target = targetRef.current.firstElementChild as HTMLElement | null;
      if (!target) return;

      // Measure relative to the target wrapper (not the canvas)
      // so the SVG overlay aligns regardless of flex centering
      const extracted = extractMeasurements(target, targetRef.current, { label });
      setData(extracted);
    });

    return () => cancelAnimationFrame(frame);
  }, [children, label]);

  const handleSelect = useCallback((id: string | null) => {
    setHighlightedId(id);
  }, []);

  const handleHover = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  return (
    <div className="blueprint">
      <div className="blueprint__canvas" ref={containerRef}>
        <div className="blueprint__target" ref={targetRef}>
          {children}
          {data && (
            <BlueprintSvg
              data={data}
              highlightedId={highlightedId}
              hoveredId={hoveredId}
              margin={margin}
            />
          )}
        </div>
      </div>
      {data && data.measurements.length > 0 && (
        <BlueprintPanel
          data={data}
          highlightedId={highlightedId}
          hoveredId={hoveredId}
          onHover={handleHover}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
