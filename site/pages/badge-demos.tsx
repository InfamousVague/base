import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/badge/badge.css';
import '@primitives/icon/icon.css';

import { Badge } from '@primitives/badge/Badge';
import { star } from '@primitives/icon/icons/star';

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['solid', 'subtle', 'outline'] as const;
  const colors = ['neutral', 'accent', 'error', 'warning', 'success', 'info'] as const;
  return (
    <Section title="Variants x Colors" desc="Three variants across six colors at sm size.">
      {variants.map(variant => (
        <DemoRow key={variant} label={variant}>
          {colors.map(color => (
            <Badge key={color} variant={variant} color={color} size="sm">{color}</Badge>
          ))}
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md'] as const;
  return (
    <Section title="Sizes" desc="Small and medium badge sizes.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Badge size={size} color="accent" variant="solid">Label</Badge>
          <Badge size={size} color="success" variant="subtle">Status</Badge>
          <Badge size={size} color="error" variant="outline">Alert</Badge>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Icon Demo ----
function IconDemo() {
  return (
    <Section title="With Icon" desc="Badges with a leading icon.">
      <DemoRow label="sm + icon">
        <Badge size="sm" color="accent" variant="solid" icon={star}>Featured</Badge>
        <Badge size="sm" color="success" variant="subtle" icon={star}>Starred</Badge>
        <Badge size="sm" color="warning" variant="outline" icon={star}>Important</Badge>
      </DemoRow>
      <DemoRow label="md + icon">
        <Badge size="md" color="accent" variant="solid" icon={star}>Featured</Badge>
        <Badge size="md" color="success" variant="subtle" icon={star}>Starred</Badge>
      </DemoRow>
    </Section>
  );
}

// ---- Shape Demo ----
function ShapeDemo() {
  const shapes = ['square', 'default', 'pill'] as const;
  return (
    <Section title="Shapes" desc="Border-radius shape options: square, default (pill), and pill.">
      {shapes.map(shape => (
        <DemoRow key={shape} label={shape}>
          <Badge shape={shape} color="accent" variant="solid">Label</Badge>
          <Badge shape={shape} color="success" variant="subtle">Status</Badge>
          <Badge shape={shape} color="error" variant="outline">Alert</Badge>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Dot Demo ----
function DotDemo() {
  const colors = ['neutral', 'accent', 'error', 'warning', 'success', 'info'] as const;
  return (
    <Section title="Dot" desc="Dot-only badges for minimal status indicators in each color.">
      <DemoRow label="dots">
        {colors.map(color => (
          <Badge key={color} dot color={color} variant="solid">{color}</Badge>
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Removable Demo ----
function RemovableDemo() {
  return (
    <Section title="Removable" desc="Badges with a close/remove button.">
      <DemoRow label="removable">
        <Badge color="accent" variant="solid" removable onRemove={() => {}}>Accent</Badge>
        <Badge color="success" variant="subtle" removable onRemove={() => {}}>Success</Badge>
        <Badge color="error" variant="outline" removable onRemove={() => {}}>Error</Badge>
        <Badge color="warning" variant="solid" removable onRemove={() => {}}>Warning</Badge>
      </DemoRow>
      <DemoRow label="md removable">
        <Badge size="md" color="accent" variant="solid" removable onRemove={() => {}}>Accent</Badge>
        <Badge size="md" color="info" variant="subtle" removable onRemove={() => {}}>Info</Badge>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Badge component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td>solid | subtle | outline</td><td>subtle</td><td>Visual variant</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>sm</td><td>Badge size</td></tr>
          <tr><td><code>color</code></td><td>neutral | accent | error | warning | success | info</td><td>neutral</td><td>Badge color</td></tr>
          <tr><td><code>shape</code></td><td>square | default | pill</td><td>pill</td><td>Border-radius shape</td></tr>
          <tr><td><code>icon</code></td><td>string</td><td>--</td><td>Optional leading icon SVG innerHTML</td></tr>
          <tr><td><code>dot</code></td><td>boolean</td><td>false</td><td>Render as a dot only (no text content)</td></tr>
          <tr><td><code>removable</code></td><td>boolean</td><td>false</td><td>Show a remove/close button</td></tr>
          <tr><td><code>onRemove</code></td><td>() =&gt; void</td><td>--</td><td>Called when the remove button is clicked</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function BadgeDemos() {
  return (
    <>
      <VariantDemo />
      <SizeDemo />
      <IconDemo />
      <ShapeDemo />
      <DotDemo />
      <RemovableDemo />
      <PropsTable />
    </>
  );
}

export default BadgeDemos;

/** Blueprint target — default-props instance for measurement inspection */
export function BlueprintTarget() {
  return <Badge>Badge</Badge>;
}
