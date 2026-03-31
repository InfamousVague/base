import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/copy-button/copy-button.css';
import '@primitives/button/button.css';
import '@primitives/icon/icon.css';

import { CopyButton } from '@primitives/copy-button/CopyButton';

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="Click to copy sample text to the clipboard.">
      <DemoRow label="copy">
        <CopyButton text="Hello, world!" />
      </DemoRow>
    </Section>
  );
}

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['ghost', 'secondary'] as const;
  return (
    <Section title="Variants" desc="Ghost and secondary button variants.">
      {variants.map(variant => (
        <DemoRow key={variant} label={variant}>
          <CopyButton text="Sample text" variant={variant} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md'] as const;
  return (
    <Section title="Sizes" desc="Small and medium copy button sizes.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <CopyButton text="Copied text" size={size} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="CopyButton component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>text</code></td><td>string</td><td>--</td><td>Text to copy to clipboard</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Button size</td></tr>
          <tr><td><code>variant</code></td><td>ghost | secondary</td><td>ghost</td><td>Button variant</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>Copy</td><td>Label text</td></tr>
          <tr><td><code>copiedLabel</code></td><td>string</td><td>Copied</td><td>Label shown after copy</td></tr>
          <tr><td><code>timeout</code></td><td>number</td><td>2000</td><td>Duration of copied state in ms</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function CopyButtonDemos() {
  return (
    <>
      <BasicDemo />
      <VariantDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default CopyButtonDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <CopyButton text="Copied!" />;
}
