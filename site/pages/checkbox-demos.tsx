import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/checkbox/checkbox.css';
import '@primitives/icon/icon.css';

import { Checkbox } from '@primitives/checkbox/Checkbox';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three checkbox sizes with labels.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Checkbox size={size} label={`${size} checkbox`} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- State Demo ----
function StateDemo() {
  return (
    <Section title="States" desc="Default, checked, indeterminate, and disabled states.">
      <DemoRow label="default">
        <Checkbox label="Unchecked" />
      </DemoRow>
      <DemoRow label="checked">
        <Checkbox label="Checked" defaultChecked />
      </DemoRow>
      <DemoRow label="indeterminate">
        <Checkbox label="Indeterminate" indeterminate />
      </DemoRow>
      <DemoRow label="disabled">
        <Checkbox label="Disabled" disabled />
      </DemoRow>
      <DemoRow label="disabled+checked">
        <Checkbox label="Disabled checked" disabled defaultChecked />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Checkbox component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size of the checkbox</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Optional label text</td></tr>
          <tr><td><code>indeterminate</code></td><td>boolean</td><td>false</td><td>Indeterminate (mixed) state</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function CheckboxDemos() {
  return (
    <>
      <SizeDemo />
      <StateDemo />
      <PropsTable />
    </>
  );
}

export default CheckboxDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Checkbox defaultChecked />;
}
