import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/pin-input/pin-input.css';

import { PinInput } from '@primitives/pin-input/PinInput';

// ---- Basic Demo ----
function BasicDemo() {
  const [value, setValue] = useState('');
  return (
    <Section title="Basic" desc="Six-digit pin input.">
      <DemoRow label="6 digits">
        <PinInput value={value} onChange={setValue} length={6} />
      </DemoRow>
    </Section>
  );
}

// ---- Mask Demo ----
function MaskDemo() {
  const [value, setValue] = useState('');
  return (
    <Section title="Masked" desc="Input masked with dots for sensitive codes.">
      <DemoRow label="masked">
        <PinInput value={value} onChange={setValue} length={6} mask />
      </DemoRow>
    </Section>
  );
}

// ---- Length Demo ----
function LengthDemo() {
  const [value, setValue] = useState('');
  return (
    <Section title="4 Digits" desc="Shorter pin input with 4 fields.">
      <DemoRow label="4 digits">
        <PinInput value={value} onChange={setValue} length={4} />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Small, medium, and large pin inputs.">
      {sizes.map(size => {
        const [value, setValue] = useState('');
        return (
          <DemoRow key={size} label={size}>
            <PinInput value={value} onChange={setValue} length={4} size={size} />
          </DemoRow>
        );
      })}
    </Section>
  );
}

// ---- Error Demo ----
function ErrorDemo() {
  const [value, setValue] = useState('12');
  return (
    <Section title="Error" desc="Pin input in error state.">
      <DemoRow label="error">
        <PinInput value={value} onChange={setValue} length={4} error />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="PinInput component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>length</code></td><td>number</td><td>6</td><td>Number of input boxes</td></tr>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Current value</td></tr>
          <tr><td><code>onChange</code></td><td>(value: string) =&gt; void</td><td>--</td><td>Callback when value changes</td></tr>
          <tr><td><code>type</code></td><td>text | number</td><td>number</td><td>Input type</td></tr>
          <tr><td><code>mask</code></td><td>boolean</td><td>false</td><td>Mask input with dots</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Input size</td></tr>
          <tr><td><code>error</code></td><td>boolean</td><td>false</td><td>Show error state</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disable input</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function PinInputDemos() {
  return (
    <>
      <BasicDemo />
      <MaskDemo />
      <LengthDemo />
      <SizeDemo />
      <ErrorDemo />
      <PropsTable />
    </>
  );
}

export default PinInputDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <PinInput value="" onChange={() => {}} length={4} />;
}
