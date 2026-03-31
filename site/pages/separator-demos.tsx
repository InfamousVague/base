import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/separator/separator.css';

import { Separator } from '@primitives/separator/Separator';

// ---- Horizontal Demo ----
function HorizontalDemo() {
  return (
    <Section title="Horizontal" desc="Default horizontal separator spanning full width.">
      <DemoRow label="default">
        <div style={{ width: '100%' }}>
          <p style={{ margin: 'var(--sp-2) 0' }}>Content above</p>
          <Separator />
          <p style={{ margin: 'var(--sp-2) 0' }}>Content below</p>
        </div>
      </DemoRow>
      <DemoRow label="decorative">
        <div style={{ width: '100%' }}>
          <p style={{ margin: 'var(--sp-2) 0' }}>Content above</p>
          <Separator decorative />
          <p style={{ margin: 'var(--sp-2) 0' }}>Content below</p>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Vertical Demo ----
function VerticalDemo() {
  return (
    <Section title="Vertical" desc="Vertical separator inside a flex row.">
      <DemoRow label="vertical">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', height: '3rem' }}>
          <span>Left</span>
          <Separator orientation="vertical" />
          <span>Center</span>
          <Separator orientation="vertical" />
          <span>Right</span>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Main ----
function SeparatorDemos() {
  return (
    <>
      <HorizontalDemo />
      <VerticalDemo />
    </>
  );
}

export default SeparatorDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Separator style={{ width: 200 }} />;
}
