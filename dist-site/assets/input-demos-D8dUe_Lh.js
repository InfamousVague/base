var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/input/input.css';
import '@primitives/icon/icon.css';
import '@primitives/spinner/spinner.css';

import { Input } from '@primitives/input/Input';
import { search } from '@primitives/icon/icons/search';
import { mail } from '@primitives/icon/icons/mail';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three input sizes matching button scale.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Input size={size} placeholder={\`\${size} input\`} />
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
          <Input variant={variant} placeholder={\`\${variant} variant\`} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Icon Demo ----
function IconDemo() {
  return (
    <Section title="With Icons" desc="Leading, trailing, and both icons.">
      <DemoRow label="left icon">
        <Input iconLeft={search} placeholder="Search..." />
      </DemoRow>
      <DemoRow label="right icon">
        <Input iconRight={mail} placeholder="Email address" />
      </DemoRow>
      <DemoRow label="both icons">
        <Input iconLeft={search} iconRight={mail} placeholder="Search email..." />
      </DemoRow>
    </Section>
  );
}

// ---- State Demo ----
function StateDemo() {
  return (
    <Section title="States" desc="Placeholder, disabled, and intent-driven states.">
      <DemoRow label="placeholder">
        <Input placeholder="Placeholder text" />
      </DemoRow>
      <DemoRow label="error">
        <Input intent="error" placeholder="Error state" />
      </DemoRow>
      <DemoRow label="disabled">
        <Input disabled placeholder="Disabled input" />
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
          <Input intent={intent} placeholder={\`\${intent} intent\`} />
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
          <Input shape={shape} placeholder={\`\${shape} shape\`} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Loading Demo ----
function LoadingDemo() {
  return (
    <Section title="Loading" desc="Loading state shows a spinner in the trailing icon position.">
      <DemoRow label="loading">
        <Input loading placeholder="Loading..." />
      </DemoRow>
      <DemoRow label="loading + icon">
        <Input loading iconLeft={search} placeholder="Searching..." />
      </DemoRow>
    </Section>
  );
}

// ---- Readonly Demo ----
function ReadonlyDemo() {
  return (
    <Section title="Readonly" desc="Read-only inputs are focusable but not editable.">
      <DemoRow label="readonly">
        <Input readOnly defaultValue="Read-only value" />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Input component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size with corresponding padding/radius</td></tr>
          <tr><td><code>variant</code></td><td>outline | filled | ghost</td><td>outline</td><td>Visual variant</td></tr>
          <tr><td><code>shape</code></td><td>square | default | pill</td><td>default</td><td>Border-radius shape</td></tr>
          <tr><td><code>intent</code></td><td>error | warning | success | info</td><td>--</td><td>Status intent for validation</td></tr>
          <tr><td><code>loading</code></td><td>boolean</td><td>false</td><td>Show spinner replacing the right icon</td></tr>
          <tr><td><code>iconLeft</code></td><td>string</td><td>--</td><td>Leading icon SVG innerHTML string</td></tr>
          <tr><td><code>iconRight</code></td><td>string</td><td>--</td><td>Trailing icon SVG innerHTML string</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function InputDemos() {
  return (
    <>
      <SizeDemo />
      <VariantDemo />
      <IconDemo />
      <StateDemo />
      <IntentDemo />
      <ShapeDemo />
      <LoadingDemo />
      <ReadonlyDemo />
      <PropsTable />
    </>
  );
}

export default InputDemos;

/** Blueprint target — default-props instance for measurement inspection */
export function BlueprintTarget() {
  return <Input placeholder="Enter text..." />;
}
`;export{e as default};