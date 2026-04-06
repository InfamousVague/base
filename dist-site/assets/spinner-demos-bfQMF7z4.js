var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/spinner/spinner.css';

import { Spinner } from '@primitives/spinner/Spinner';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three spinner sizes: sm, md, lg.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Spinner size={size} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const colors = [
    { label: 'default', color: undefined },
    { label: 'accent', color: 'var(--color-accent)' },
    { label: 'error', color: 'var(--color-error)' },
    { label: 'success', color: 'var(--color-success)' },
  ];
  return (
    <Section title="Color Inheritance" desc="Spinner inherits currentColor from its parent.">
      {colors.map(({ label, color }) => (
        <DemoRow key={label} label={label}>
          <span style={color ? { color } : undefined}>
            <Spinner size="md" />
          </span>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Spinner component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Spinner size</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function SpinnerDemos() {
  return (
    <>
      <SizeDemo />
      <ColorDemo />
      <PropsTable />
    </>
  );
}

export default SpinnerDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Spinner />;
}
`;export{e as default};