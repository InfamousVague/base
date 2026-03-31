import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/circular-progress/circular-progress.css';

import { CircularProgress } from '@primitives/circular-progress/CircularProgress';

// ---- Value Demo ----
function ValueDemo() {
  const values = [25, 50, 75, 100];
  return (
    <Section title="Values" desc="Progress at 25%, 50%, 75%, and 100%.">
      <DemoRow label="values">
        {values.map(v => (
          <CircularProgress key={v} value={v} />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Small, medium, and large progress rings.">
      <DemoRow label="sizes">
        {sizes.map(size => (
          <CircularProgress key={size} value={65} size={size} />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['accent', 'error', 'warning', 'success', 'info'] as const;
  return (
    <Section title="Colors" desc="All available progress ring colors.">
      <DemoRow label="colors">
        {colors.map(color => (
          <CircularProgress key={color} value={70} color={color} />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Show Value Demo ----
function ShowValueDemo() {
  return (
    <Section title="Show Value" desc="Percentage text displayed in the center.">
      <DemoRow label="showValue">
        <CircularProgress value={42} showValue size="lg" />
        <CircularProgress value={88} showValue size="lg" color="success" />
      </DemoRow>
    </Section>
  );
}

// ---- Indeterminate Demo ----
function IndeterminateDemo() {
  return (
    <Section title="Indeterminate" desc="Spinning animation for unknown progress.">
      <DemoRow label="indeterminate">
        <CircularProgress indeterminate size="sm" />
        <CircularProgress indeterminate size="md" />
        <CircularProgress indeterminate size="lg" />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="CircularProgress component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>number</td><td>0</td><td>Current value (0-100)</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Ring size</td></tr>
          <tr><td><code>color</code></td><td>accent | error | warning | success | info</td><td>accent</td><td>Ring color</td></tr>
          <tr><td><code>showValue</code></td><td>boolean</td><td>false</td><td>Show percentage text in center</td></tr>
          <tr><td><code>indeterminate</code></td><td>boolean</td><td>false</td><td>Show indeterminate animation</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function CircularProgressDemos() {
  return (
    <>
      <ValueDemo />
      <SizeDemo />
      <ColorDemo />
      <ShowValueDemo />
      <IndeterminateDemo />
      <PropsTable />
    </>
  );
}

export default CircularProgressDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <CircularProgress value={65} />;
}
