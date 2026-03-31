import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/number-input/number-input.css';
import '@primitives/icon/icon.css';

import { NumberInput } from '@primitives/number-input/NumberInput';

// ---- Basic Demo ----
function BasicDemo() {
  const [value, setValue] = useState(5);
  return (
    <Section title="Basic" desc="Controlled number input.">
      <DemoRow label={`value: ${value}`}>
        <NumberInput value={value} onChange={setValue} />
      </DemoRow>
    </Section>
  );
}

// ---- Min/Max Demo ----
function MinMaxDemo() {
  const [value, setValue] = useState(5);
  return (
    <Section title="Min / Max" desc="Clamped between 0 and 10.">
      <DemoRow label="0..10">
        <NumberInput value={value} onChange={setValue} min={0} max={10} />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Small, medium, and large number inputs.">
      {sizes.map(size => {
        const [value, setValue] = useState(3);
        return (
          <DemoRow key={size} label={size}>
            <NumberInput value={value} onChange={setValue} size={size} />
          </DemoRow>
        );
      })}
    </Section>
  );
}

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['outline', 'filled', 'ghost'] as const;
  return (
    <Section title="Variants" desc="Outline, filled, and ghost variants.">
      {variants.map(variant => {
        const [value, setValue] = useState(1);
        return (
          <DemoRow key={variant} label={variant}>
            <NumberInput value={value} onChange={setValue} variant={variant} />
          </DemoRow>
        );
      })}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="NumberInput component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>number</td><td>--</td><td>Current value</td></tr>
          <tr><td><code>onChange</code></td><td>(value: number) =&gt; void</td><td>--</td><td>Called when value changes</td></tr>
          <tr><td><code>min</code></td><td>number</td><td>--</td><td>Minimum allowed value</td></tr>
          <tr><td><code>max</code></td><td>number</td><td>--</td><td>Maximum allowed value</td></tr>
          <tr><td><code>step</code></td><td>number</td><td>1</td><td>Step increment</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Input size</td></tr>
          <tr><td><code>variant</code></td><td>outline | filled | ghost</td><td>outline</td><td>Visual variant</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disabled state</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function NumberInputDemos() {
  return (
    <>
      <BasicDemo />
      <MinMaxDemo />
      <SizeDemo />
      <VariantDemo />
      <PropsTable />
    </>
  );
}

export default NumberInputDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <NumberInput value={42} onChange={() => {}} />;
}
