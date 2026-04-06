var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/beacon/beacon.css';

import { Beacon } from '@primitives/beacon/Beacon';

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['accent', 'success', 'error', 'warning', 'info', 'neutral'] as const;
  return (
    <Section title="Colors" desc="All six beacon color options.">
      <DemoRow label="colors">
        {colors.map(color => (
          <div key={color} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <Beacon color={color} />
            <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>{color}</span>
          </div>
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Small, medium, and large beacons.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Beacon size={size} color="accent" />
          <Beacon size={size} color="success" />
          <Beacon size={size} color="error" />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Beacon component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>color</code></td><td>accent | success | error | warning | info | neutral</td><td>accent</td><td>Dot color</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Dot size</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function BeaconDemos() {
  return (
    <>
      <ColorDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default BeaconDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Beacon />;
}
`;export{e as default};