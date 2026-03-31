import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/color-picker/color-picker.css';

import { ColorPicker } from '@primitives/color-picker/ColorPicker';

// ---- Basic Demo ----
function BasicDemo() {
  const [color, setColor] = useState('#3B82F6');
  return (
    <Section title="Basic" desc="Color picker with default presets and hex input.">
      <DemoRow label="default">
        <ColorPicker value={color} onChange={setColor} />
      </DemoRow>
      <DemoRow label="selected">
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)' }}>
          Current value: <strong>{color}</strong>
        </span>
      </DemoRow>
    </Section>
  );
}

// ---- Custom Presets Demo ----
function CustomPresetsDemo() {
  const brandColors = ['#1E40AF', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];
  const [color, setColor] = useState('#2563EB');
  return (
    <Section title="Custom Presets" desc="Brand color palette as preset swatches.">
      <DemoRow label="brand">
        <ColorPicker value={color} onChange={setColor} presets={brandColors} />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const [smColor, setSmColor] = useState('#EF4444');
  const [mdColor, setMdColor] = useState('#22C55E');
  return (
    <Section title="Sizes" desc="Small and medium size variants.">
      <DemoRow label="sm">
        <ColorPicker value={smColor} onChange={setSmColor} size="sm" />
      </DemoRow>
      <DemoRow label="md">
        <ColorPicker value={mdColor} onChange={setMdColor} size="md" />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="ColorPicker component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Current hex color value</td></tr>
          <tr><td><code>onChange</code></td><td>(color: string) =&gt; void</td><td>--</td><td>Change handler</td></tr>
          <tr><td><code>presets</code></td><td>string[]</td><td>12 default colors</td><td>Array of preset hex colors</td></tr>
          <tr><td><code>showInput</code></td><td>boolean</td><td>true</td><td>Show hex input field</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Size variant</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ColorPickerDemos() {
  return (
    <>
      <BasicDemo />
      <CustomPresetsDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default ColorPickerDemos;
