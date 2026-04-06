var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/kbd/kbd.css';

import { Kbd } from '@primitives/kbd/Kbd';

// ---- Size Demo ----
function SizeDemo() {
  return (
    <Section title="Sizes" desc="Small and medium keyboard key indicators.">
      <DemoRow label="sm">
        <Kbd size="sm">Cmd</Kbd>
        <Kbd size="sm">Shift</Kbd>
        <Kbd size="sm">K</Kbd>
        <Kbd size="sm">Enter</Kbd>
      </DemoRow>
      <DemoRow label="md">
        <Kbd size="md">Cmd</Kbd>
        <Kbd size="md">Shift</Kbd>
        <Kbd size="md">K</Kbd>
        <Kbd size="md">Enter</Kbd>
      </DemoRow>
    </Section>
  );
}

// ---- Combination Demo ----
function CombinationDemo() {
  return (
    <Section title="Combinations" desc="Key combinations using multiple Kbd components.">
      <DemoRow label="Cmd + K">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
          <Kbd>Cmd</Kbd>
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)' }}>+</span>
          <Kbd>K</Kbd>
        </span>
      </DemoRow>
      <DemoRow label="Ctrl + Shift + P">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
          <Kbd>Ctrl</Kbd>
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)' }}>+</span>
          <Kbd>Shift</Kbd>
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)' }}>+</span>
          <Kbd>P</Kbd>
        </span>
      </DemoRow>
      <DemoRow label="Cmd + Shift + S">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-1)' }}>
          <Kbd>Cmd</Kbd>
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)' }}>+</span>
          <Kbd>Shift</Kbd>
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-xs-size)' }}>+</span>
          <Kbd>S</Kbd>
        </span>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Kbd component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>The key text to display</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Size variant</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function KbdDemos() {
  return (
    <>
      <SizeDemo />
      <CombinationDemo />
      <PropsTable />
    </>
  );
}

export default KbdDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Kbd>⌘K</Kbd>;
}
`;export{e as default};