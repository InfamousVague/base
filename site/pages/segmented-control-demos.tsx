import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/segmented-control/segmented-control.css';

import { SegmentedControl } from '@primitives/segmented-control/SegmentedControl';

const basicOptions = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'board', label: 'Board' },
];

// ---- Basic Demo ----
function BasicDemo() {
  const [value, setValue] = useState('list');
  return (
    <Section title="Basic" desc="Simple three-option segmented control.">
      <DemoRow label="default">
        <SegmentedControl options={basicOptions} value={value} onChange={setValue} />
      </DemoRow>
      <DemoRow label="selected">
        <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
          Current: <strong>{value}</strong>
        </span>
      </DemoRow>
    </Section>
  );
}

// ---- Mono Demo ----
function MonoDemo() {
  const [value, setValue] = useState('list');
  const monoOptions = [
    { value: 'sm', label: '640px' },
    { value: 'md', label: '768px' },
    { value: 'lg', label: '1024px' },
  ];
  return (
    <Section title="Mono Font" desc="Segmented control with monospace font for numeric values.">
      <DemoRow label="mono">
        <SegmentedControl options={monoOptions} value={value} onChange={setValue} mono />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const [smValue, setSmValue] = useState('list');
  const [mdValue, setMdValue] = useState('list');
  return (
    <Section title="Sizes" desc="Small and medium sizes.">
      <DemoRow label="sm">
        <SegmentedControl options={basicOptions} value={smValue} onChange={setSmValue} size="sm" />
      </DemoRow>
      <DemoRow label="md">
        <SegmentedControl options={basicOptions} value={mdValue} onChange={setMdValue} size="md" />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="SegmentedControl component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>options</code></td><td>{'SegmentedControlOption[]'}</td><td>--</td><td>Options to display (required)</td></tr>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Currently selected value (required)</td></tr>
          <tr><td><code>onChange</code></td><td>(value: string) =&gt; void</td><td>--</td><td>Called when selection changes (required)</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>sm</td><td>Size preset</td></tr>
          <tr><td><code>mono</code></td><td>boolean</td><td>false</td><td>Use monospace font for labels</td></tr>
        </tbody>
      </table>
      <table className="token-table" style={{ marginTop: 'var(--sp-4)' }}>
        <thead><tr><th colSpan={4}>SegmentedControlOption</th></tr><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Unique option value (required)</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Display label (required)</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Whether the option is disabled</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function SegmentedControlDemos() {
  return (
    <>
      <BasicDemo />
      <MonoDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default SegmentedControlDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <SegmentedControl options={[{ value: 'a', label: 'One' }, { value: 'b', label: 'Two' }]} value="a" onChange={() => {}} />;
}
