import React, { useState, useEffect } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/number-roll/number-roll.css';

import { NumberRoll } from '@primitives/number-roll/NumberRoll';

// ---- Interactive Demo ----
function InteractiveDemo() {
  const [value, setValue] = useState(1234);
  return (
    <Section title="Interactive" desc="Click buttons to change the value and watch the animation.">
      <DemoRow label="animated">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <button onClick={() => setValue(v => Math.max(0, v - 100))} style={{ padding: '4px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-default)', background: 'transparent', color: 'var(--color-text-primary)', cursor: 'pointer' }}>-100</button>
          <NumberRoll value={value} minDigits={4} fontSize="var(--text-2xl-size)" commas />
          <button onClick={() => setValue(v => v + 100)} style={{ padding: '4px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-default)', background: 'transparent', color: 'var(--color-text-primary)', cursor: 'pointer' }}>+100</button>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Live Counter Demo ----
function LiveCounterDemo() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => c + Math.floor(Math.random() * 5) + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <Section title="Live counter" desc="Auto-incrementing counter simulating real-time data.">
      <DemoRow label="auto">
        <NumberRoll value={count} minDigits={5} fontSize="var(--text-2xl-size)" commas />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  return (
    <Section title="Font sizes" desc="NumberRoll adapts to any font size.">
      <DemoRow label="xs">
        <NumberRoll value={42} minDigits={3} fontSize="var(--text-xs-size)" />
      </DemoRow>
      <DemoRow label="sm">
        <NumberRoll value={42} minDigits={3} fontSize="var(--text-sm-size)" />
      </DemoRow>
      <DemoRow label="2xl">
        <NumberRoll value={42} minDigits={3} fontSize="var(--text-2xl-size)" />
      </DemoRow>
      <DemoRow label="4xl">
        <NumberRoll value={42} minDigits={3} fontSize="var(--text-4xl-size)" />
      </DemoRow>
    </Section>
  );
}

// ---- Options Demo ----
function OptionsDemo() {
  return (
    <Section title="Options" desc="Commas, minimum digits, and duration.">
      <DemoRow label="commas">
        <NumberRoll value={1234567} minDigits={1} fontSize="var(--text-lg-size)" commas />
      </DemoRow>
      <DemoRow label="min 6 digits">
        <NumberRoll value={42} minDigits={6} fontSize="var(--text-lg-size)" />
      </DemoRow>
      <DemoRow label="slow (800ms)">
        <NumberRoll value={999} minDigits={3} fontSize="var(--text-lg-size)" duration={800} />
      </DemoRow>
      <DemoRow label="fast (150ms)">
        <NumberRoll value={999} minDigits={3} fontSize="var(--text-lg-size)" duration={150} />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="NumberRoll component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>number</td><td>--</td><td>The number to display</td></tr>
          <tr><td><code>minDigits</code></td><td>number</td><td>1</td><td>Minimum digit columns to show</td></tr>
          <tr><td><code>fontSize</code></td><td>string</td><td>inherit</td><td>CSS font-size value</td></tr>
          <tr><td><code>commas</code></td><td>boolean</td><td>false</td><td>Show thousands separators</td></tr>
          <tr><td><code>duration</code></td><td>number</td><td>400</td><td>Animation duration in ms</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

function NumberRollDemos() {
  return (
    <>
      <InteractiveDemo />
      <LiveCounterDemo />
      <SizeDemo />
      <OptionsDemo />
      <PropsTable />
    </>
  );
}

export default NumberRollDemos;

export function BlueprintTarget() {
  return <NumberRoll value={1234} minDigits={4} fontSize="var(--text-2xl-size)" commas />;
}
