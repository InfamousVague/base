import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/toggle/toggle.css';

import { Toggle } from '@primitives/toggle/Toggle';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three toggle sizes with labels.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Toggle size={size} label={`${size} toggle`} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- State Demo ----
function StateDemo() {
  return (
    <Section title="States" desc="Default, checked, and disabled states.">
      <DemoRow label="default">
        <Toggle label="Off" />
      </DemoRow>
      <DemoRow label="checked">
        <Toggle label="On" defaultChecked />
      </DemoRow>
      <DemoRow label="disabled">
        <Toggle label="Disabled off" disabled />
      </DemoRow>
      <DemoRow label="disabled+on">
        <Toggle label="Disabled on" disabled defaultChecked />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Toggle component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size of the toggle</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Optional label text</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ToggleDemos() {
  return (
    <>
      <SizeDemo />
      <StateDemo />
      <PropsTable />
    </>
  );
}

export default ToggleDemos;

/** Blueprint target — default-props instance for measurement inspection */
export function BlueprintTarget() {
  return <Toggle />;
}
