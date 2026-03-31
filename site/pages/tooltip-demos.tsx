import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/tooltip/tooltip.css';

import { Tooltip } from '@primitives/tooltip/Tooltip';

const triggerStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--sp-2) var(--sp-4)',
  background: 'var(--color-bg-tertiary)',
  border: '1px solid var(--color-border-subtle)',
  borderRadius: 'var(--radius-md)',
  fontSize: 'var(--text-sm-size)',
  color: 'var(--color-text-primary)',
  cursor: 'default',
};

// ---- Placement Demo ----
function PlacementDemo() {
  const placements = ['top', 'bottom', 'left', 'right'] as const;
  return (
    <Section title="Placement" desc="Four placement options. Hover each button to see the tooltip.">
      {placements.map(placement => (
        <DemoRow key={placement} label={placement}>
          <Tooltip content={`Tooltip on ${placement}`} placement={placement}>
            <span style={triggerStyle} tabIndex={0}>Hover me ({placement})</span>
          </Tooltip>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Main ----
function TooltipDemos() {
  return (
    <>
      <PlacementDemo />
    </>
  );
}

export default TooltipDemos;
