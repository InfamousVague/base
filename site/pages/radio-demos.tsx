import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/radio/radio.css';

import { Radio, RadioGroup } from '@primitives/radio';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three radio sizes, each in a group of three options.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <RadioGroup name={`size-${size}`} size={size} defaultValue="a" direction="horizontal">
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" />
          </RadioGroup>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Direction Demo ----
function DirectionDemo() {
  return (
    <Section title="Direction" desc="Vertical vs horizontal layout.">
      <DemoRow label="vertical">
        <RadioGroup name="dir-v" defaultValue="1" direction="vertical">
          <Radio value="1" label="First" />
          <Radio value="2" label="Second" />
          <Radio value="3" label="Third" />
        </RadioGroup>
      </DemoRow>
      <DemoRow label="horizontal">
        <RadioGroup name="dir-h" defaultValue="1" direction="horizontal">
          <Radio value="1" label="First" />
          <Radio value="2" label="Second" />
          <Radio value="3" label="Third" />
        </RadioGroup>
      </DemoRow>
    </Section>
  );
}

// ---- Disabled Demo ----
function DisabledDemo() {
  return (
    <Section title="Disabled" desc="Disabled radio within a group.">
      <DemoRow label="disabled">
        <RadioGroup name="dis" defaultValue="a" direction="horizontal">
          <Radio value="a" label="Enabled" />
          <Radio value="b" label="Disabled" disabled />
          <Radio value="c" label="Enabled" />
        </RadioGroup>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Radio and RadioGroup component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td colSpan={4}><strong>Radio</strong></td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size of the radio</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Optional label text</td></tr>
          <tr><td colSpan={4}><strong>RadioGroup</strong></td></tr>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Controlled value</td></tr>
          <tr><td><code>defaultValue</code></td><td>string</td><td>--</td><td>Default value for uncontrolled mode</td></tr>
          <tr><td><code>onChange</code></td><td>(value: string) =&gt; void</td><td>--</td><td>Change handler</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size of all radios in the group</td></tr>
          <tr><td><code>direction</code></td><td>horizontal | vertical</td><td>vertical</td><td>Layout direction</td></tr>
          <tr><td><code>name</code></td><td>string</td><td>--</td><td>HTML name attribute for the group</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function RadioDemos() {
  return (
    <>
      <SizeDemo />
      <DirectionDemo />
      <DisabledDemo />
      <PropsTable />
    </>
  );
}

export default RadioDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Radio name="bp" defaultChecked />;
}
