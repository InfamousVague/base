var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/tag/tag.css';
import '@primitives/icon/icon.css';

import { Tag } from '@primitives/tag/Tag';

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['neutral', 'accent', 'error', 'warning', 'success', 'info'] as const;
  return (
    <Section title="Colors" desc="All six tag colors.">
      <DemoRow label="colors">
        {colors.map((color) => (
          <Tag key={color} color={color}>{color}</Tag>
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md'] as const;
  return (
    <Section title="Sizes" desc="Small and medium tag sizes.">
      {sizes.map((size) => (
        <DemoRow key={size} label={size}>
          <Tag size={size} color="accent">Label</Tag>
          <Tag size={size} color="success">Status</Tag>
          <Tag size={size} color="error">Alert</Tag>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Removable Demo ----
function RemovableDemo() {
  return (
    <Section title="Removable" desc="Tags with a remove button.">
      <DemoRow label="removable">
        <Tag color="accent" removable onRemove={() => {}}>React</Tag>
        <Tag color="success" removable onRemove={() => {}}>TypeScript</Tag>
        <Tag color="warning" removable onRemove={() => {}}>Node.js</Tag>
        <Tag color="error" removable onRemove={() => {}}>CSS</Tag>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Tag component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Tag content</td></tr>
          <tr><td><code>color</code></td><td>neutral | accent | error | warning | success | info</td><td>neutral</td><td>Color</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>sm</td><td>Size</td></tr>
          <tr><td><code>removable</code></td><td>boolean</td><td>false</td><td>Show remove button</td></tr>
          <tr><td><code>onRemove</code></td><td>() =&gt; void</td><td>--</td><td>Called when remove button is clicked</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TagDemos() {
  return (
    <>
      <ColorDemo />
      <SizeDemo />
      <RemovableDemo />
      <PropsTable />
    </>
  );
}

export default TagDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Tag>v1.0</Tag>;
}
`;export{e as default};