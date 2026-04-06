var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/select/select.css';
import '@primitives/icon/icon.css';
import '@primitives/spinner/spinner.css';

import { Select } from '@primitives/select/Select';

const SampleOptions = () => (
  <>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="cherry">Cherry</option>
    <option value="date">Date</option>
  </>
);

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three select sizes matching input scale.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Select size={size} placeholder="Choose fruit..." defaultValue="">
            <SampleOptions />
          </Select>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['outline', 'filled', 'ghost'] as const;
  return (
    <Section title="Variants" desc="Outline, filled, and ghost visual styles.">
      {variants.map(variant => (
        <DemoRow key={variant} label={variant}>
          <Select variant={variant} placeholder="Choose fruit..." defaultValue="">
            <SampleOptions />
          </Select>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- State Demo ----
function StateDemo() {
  return (
    <Section title="States" desc="Intent-driven, disabled, and placeholder states.">
      <DemoRow label="placeholder">
        <Select placeholder="Select an option..." defaultValue="">
          <SampleOptions />
        </Select>
      </DemoRow>
      <DemoRow label="error">
        <Select intent="error" placeholder="Error state" defaultValue="">
          <SampleOptions />
        </Select>
      </DemoRow>
      <DemoRow label="disabled">
        <Select disabled placeholder="Disabled select" defaultValue="">
          <SampleOptions />
        </Select>
      </DemoRow>
    </Section>
  );
}

// ---- Intent Demo ----
function IntentDemo() {
  const intents = ['error', 'warning', 'success', 'info'] as const;
  return (
    <Section title="Intent" desc="Status intents for validation and feedback.">
      {intents.map(intent => (
        <DemoRow key={intent} label={intent}>
          <Select intent={intent} placeholder="Choose fruit..." defaultValue="">
            <SampleOptions />
          </Select>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Shape Demo ----
function ShapeDemo() {
  const shapes = ['square', 'default', 'pill'] as const;
  return (
    <Section title="Shapes" desc="Border-radius shape options: square, default, and pill.">
      {shapes.map(shape => (
        <DemoRow key={shape} label={shape}>
          <Select shape={shape} placeholder="Choose fruit..." defaultValue="">
            <SampleOptions />
          </Select>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Loading Demo ----
function LoadingDemo() {
  return (
    <Section title="Loading" desc="Loading state shows a spinner replacing the chevron.">
      <DemoRow label="loading">
        <Select loading placeholder="Loading..." defaultValue="">
          <SampleOptions />
        </Select>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Select component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size with corresponding padding/radius</td></tr>
          <tr><td><code>variant</code></td><td>outline | filled | ghost</td><td>outline</td><td>Visual variant</td></tr>
          <tr><td><code>shape</code></td><td>square | default | pill</td><td>default</td><td>Border-radius shape</td></tr>
          <tr><td><code>intent</code></td><td>error | warning | success | info</td><td>--</td><td>Status intent for validation</td></tr>
          <tr><td><code>loading</code></td><td>boolean</td><td>false</td><td>Show spinner replacing the chevron</td></tr>
          <tr><td><code>placeholder</code></td><td>string</td><td>--</td><td>Placeholder option text</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function SelectDemos() {
  return (
    <>
      <SizeDemo />
      <VariantDemo />
      <StateDemo />
      <IntentDemo />
      <ShapeDemo />
      <LoadingDemo />
      <PropsTable />
    </>
  );
}

export default SelectDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Select><option>Option 1</option><option>Option 2</option></Select>;
}
`;export{e as default};