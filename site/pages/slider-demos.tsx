import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/slider/slider.css';

import { Slider } from '@primitives/slider/Slider';

// ---- Basic Demo ----
function BasicDemo() {
  const [value, setValue] = useState(40);
  return (
    <Section title="Basic" desc="Controlled slider with live value display.">
      <DemoRow label={`value: ${value}`}>
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <Slider value={value} onChange={setValue} />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md'] as const;
  return (
    <Section title="Sizes" desc="Small and medium slider sizes.">
      {sizes.map(size => {
        const [value, setValue] = useState(50);
        return (
          <DemoRow key={size} label={size}>
            <div style={{ width: '100%', maxWidth: '20rem' }}>
              <Slider value={value} onChange={setValue} size={size} />
            </div>
          </DemoRow>
        );
      })}
    </Section>
  );
}

// ---- Disabled Demo ----
function DisabledDemo() {
  return (
    <Section title="Disabled" desc="Slider in disabled state.">
      <DemoRow label="disabled">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <Slider value={60} onChange={() => {}} disabled />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Slider component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>number</td><td>--</td><td>Current value</td></tr>
          <tr><td><code>onChange</code></td><td>(value: number) =&gt; void</td><td>--</td><td>Called when value changes</td></tr>
          <tr><td><code>min</code></td><td>number</td><td>0</td><td>Minimum value</td></tr>
          <tr><td><code>max</code></td><td>number</td><td>100</td><td>Maximum value</td></tr>
          <tr><td><code>step</code></td><td>number</td><td>1</td><td>Step increment</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Track/thumb size</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disabled state</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function SliderDemos() {
  return (
    <>
      <BasicDemo />
      <SizeDemo />
      <DisabledDemo />
      <PropsTable />
    </>
  );
}

export default SliderDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Slider value={50} onChange={() => {}} style={{ width: 200 }} />;
}
