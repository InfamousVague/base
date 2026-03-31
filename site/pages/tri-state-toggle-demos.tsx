import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/tri-state-toggle/tri-state-toggle.css';

import { TriStateToggle } from '@primitives/tri-state-toggle/TriStateToggle';
import type { TriStateValue } from '@primitives/tri-state-toggle/TriStateToggle';

// ---- Interactive Demo ----
function InteractiveDemo() {
  const [value, setValue] = useState<TriStateValue>('unspecified');
  return (
    <Section title="Interactive" desc="Click segments to change state. Current value is shown below.">
      <DemoRow label="interactive">
        <TriStateToggle value={value} onChange={setValue} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
          {value}
        </span>
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three sizes for different contexts.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <TriStateToggle value="allow" onChange={() => {}} size={size} />
          <TriStateToggle value="unspecified" onChange={() => {}} size={size} />
          <TriStateToggle value="deny" onChange={() => {}} size={size} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- States Demo ----
function StatesDemo() {
  return (
    <Section title="States" desc="Each of the three possible values.">
      <DemoRow label="allow">
        <TriStateToggle value="allow" onChange={() => {}} />
      </DemoRow>
      <DemoRow label="unspecified">
        <TriStateToggle value="unspecified" onChange={() => {}} />
      </DemoRow>
      <DemoRow label="deny">
        <TriStateToggle value="deny" onChange={() => {}} />
      </DemoRow>
      <DemoRow label="disabled">
        <TriStateToggle value="allow" onChange={() => {}} disabled />
        <TriStateToggle value="unspecified" onChange={() => {}} disabled />
        <TriStateToggle value="deny" onChange={() => {}} disabled />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="TriStateToggle component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>"allow" | "unspecified" | "deny"</td><td>--</td><td>Current selected state</td></tr>
          <tr><td><code>onChange</code></td><td>(value) =&gt; void</td><td>--</td><td>Callback when state changes</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size variant</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disable all interactions</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

function TriStateToggleDemos() {
  return (
    <>
      <InteractiveDemo />
      <SizeDemo />
      <StatesDemo />
      <PropsTable />
    </>
  );
}

export default TriStateToggleDemos;

export function BlueprintTarget() {
  return <TriStateToggle value="unspecified" onChange={() => {}} />;
}
