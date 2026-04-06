var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/meter/meter.css';

import { Meter } from '@primitives/meter/Meter';

// ---- Value Demo ----
function ValueDemo() {
  return (
    <Section title="Values" desc="Low (20), medium (50), and high (80) values showing color transitions.">
      <DemoRow label="low (20)">
        <Meter value={20} low={33} high={66} />
      </DemoRow>
      <DemoRow label="medium (50)">
        <Meter value={50} low={33} high={66} />
      </DemoRow>
      <DemoRow label="high (80)">
        <Meter value={80} low={33} high={66} />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Available track sizes.">
      {sizes.map((size) => (
        <DemoRow key={size} label={size}>
          <Meter value={60} size={size} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Label Demo ----
function LabelDemo() {
  return (
    <Section title="Label &amp; Value" desc="Meter with an accessible label and visible percentage.">
      <DemoRow label="with label">
        <Meter value={72} label="Storage used" showValue />
      </DemoRow>
      <DemoRow label="low">
        <Meter value={15} low={33} high={66} label="CPU usage" showValue />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Meter component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>number</td><td>--</td><td>Current value (0-100)</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Track height</td></tr>
          <tr><td><code>low</code></td><td>number</td><td>33</td><td>Threshold below which value is low</td></tr>
          <tr><td><code>high</code></td><td>number</td><td>66</td><td>Threshold above which value is high</td></tr>
          <tr><td><code>optimum</code></td><td>number</td><td>100</td><td>Optimal value</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Accessible label</td></tr>
          <tr><td><code>showValue</code></td><td>boolean</td><td>false</td><td>Show numeric value</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function MeterDemos() {
  return (
    <>
      <ValueDemo />
      <SizeDemo />
      <LabelDemo />
      <PropsTable />
    </>
  );
}

export default MeterDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Meter value={72} style={{ width: 200 }} />;
}
`;export{e as default};