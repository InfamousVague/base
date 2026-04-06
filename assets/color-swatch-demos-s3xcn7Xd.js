var e=`import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/color-swatch/color-swatch.css';

import { ColorSwatch } from '@primitives/color-swatch/ColorSwatch';

const palette = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'];

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="A row of colored circles.">
      <DemoRow label="swatches">
        {palette.map((color) => (
          <ColorSwatch key={color} color={color} />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Small, medium, and large swatch sizes.">
      {sizes.map((size) => (
        <DemoRow key={size} label={size}>
          {palette.slice(0, 3).map((color) => (
            <ColorSwatch key={color} color={color} size={size} />
          ))}
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Selection Demo ----
function SelectionDemo() {
  const [selected, setSelected] = useState<string>(palette[0]);
  return (
    <Section title="Selection" desc="Click a swatch to select it. Controlled state.">
      <DemoRow label="selected">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm-size)' }}>{selected}</span>
      </DemoRow>
      <DemoRow label="pick">
        {palette.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            selected={selected === color}
            onClick={() => setSelected(color)}
          />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Label Demo ----
function LabelDemo() {
  return (
    <Section title="Labels" desc="Swatches with hex color labels.">
      <DemoRow label="labeled">
        {palette.map((color) => (
          <ColorSwatch key={color} color={color} label={color} />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="ColorSwatch component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>color</code></td><td>string</td><td>--</td><td>Any CSS color value</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Circle size</td></tr>
          <tr><td><code>selected</code></td><td>boolean</td><td>false</td><td>Whether the swatch is selected</td></tr>
          <tr><td><code>onClick</code></td><td>() =&gt; void</td><td>--</td><td>Click handler</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Optional label below the swatch</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ColorSwatchDemos() {
  return (
    <>
      <BasicDemo />
      <SizeDemo />
      <SelectionDemo />
      <LabelDemo />
      <PropsTable />
    </>
  );
}

export default ColorSwatchDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <ColorSwatch color="#5B6BD6" />;
}
`;export{e as default};