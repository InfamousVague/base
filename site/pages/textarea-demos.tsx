import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/textarea/textarea.css';

import { TextArea } from '@primitives/textarea/TextArea';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three textarea sizes.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <TextArea size={size} placeholder={`${size} textarea`} rows={3} />
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
          <TextArea variant={variant} placeholder={`${variant} variant`} rows={3} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- State Demo ----
function StateDemo() {
  return (
    <Section title="States" desc="Intent-driven and disabled states.">
      <DemoRow label="error">
        <TextArea intent="error" placeholder="Error state" rows={3} />
      </DemoRow>
      <DemoRow label="disabled">
        <TextArea disabled placeholder="Disabled textarea" rows={3} />
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
          <TextArea intent={intent} placeholder={`${intent} intent`} rows={2} />
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
          <TextArea shape={shape} placeholder={`${shape} shape`} rows={2} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Readonly Demo ----
function ReadonlyDemo() {
  return (
    <Section title="Readonly" desc="Read-only textareas are focusable but not editable.">
      <DemoRow label="readonly">
        <TextArea readOnly defaultValue="This content is read-only." rows={2} />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="TextArea component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size with corresponding padding/radius</td></tr>
          <tr><td><code>variant</code></td><td>outline | filled | ghost</td><td>outline</td><td>Visual variant</td></tr>
          <tr><td><code>shape</code></td><td>square | default | pill</td><td>default</td><td>Border-radius shape</td></tr>
          <tr><td><code>intent</code></td><td>error | warning | success | info</td><td>--</td><td>Status intent for validation</td></tr>
          <tr><td><code>autoResize</code></td><td>boolean</td><td>false</td><td>Auto-resize textarea to fit content</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TextAreaDemos() {
  return (
    <>
      <SizeDemo />
      <VariantDemo />
      <StateDemo />
      <IntentDemo />
      <ShapeDemo />
      <ReadonlyDemo />
      <PropsTable />
    </>
  );
}

export default TextAreaDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <TextArea placeholder="Enter text..." />;
}
