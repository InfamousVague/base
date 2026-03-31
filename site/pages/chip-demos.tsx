import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/chip/chip.css';
import '@primitives/icon/icon.css';

import { Chip } from '@primitives/chip/Chip';

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['filled', 'outlined'] as const;
  return (
    <Section title="Variants" desc="Filled and outlined chip variants.">
      {variants.map(variant => (
        <DemoRow key={variant} label={variant}>
          <Chip variant={variant}>Label</Chip>
          <Chip variant={variant}>Tag</Chip>
          <Chip variant={variant}>Category</Chip>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Selectable Demo ----
function SelectableDemo() {
  const labels = ['React', 'Vue', 'Svelte', 'Angular'];
  const [selected, setSelected] = useState<Set<string>>(new Set(['React']));

  const toggle = (label: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <Section title="Selectable" desc="Click chips to toggle selection state.">
      <DemoRow label="click to select">
        {labels.map(label => (
          <Chip
            key={label}
            selected={selected.has(label)}
            onClick={() => toggle(label)}
          >
            {label}
          </Chip>
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Dismiss Demo ----
function DismissDemo() {
  const [chips, setChips] = useState(['Design', 'Code', 'Test']);
  return (
    <Section title="Dismissible" desc="Chips with a dismiss button.">
      <DemoRow label="dismiss">
        {chips.map(chip => (
          <Chip
            key={chip}
            onDismiss={() => setChips(prev => prev.filter(c => c !== chip))}
          >
            {chip}
          </Chip>
        ))}
        {chips.length === 0 && <span style={{ color: 'var(--color-text-tertiary)' }}>All dismissed</span>}
      </DemoRow>
    </Section>
  );
}

// ---- Dot Demo ----
function DotDemo() {
  return (
    <Section title="Color Dot" desc="Leading color dot for status or category indicators. Takes any CSS color value.">
      <DemoRow label="status">
        <Chip dot="var(--color-success)">Online</Chip>
        <Chip dot="var(--color-warning)">Away</Chip>
        <Chip dot="var(--color-error)">Offline</Chip>
        <Chip dot="var(--color-info)">Busy</Chip>
      </DemoRow>
      <DemoRow label="custom colors">
        <Chip dot="#3B82F6">Blue</Chip>
        <Chip dot="#8B5CF6">Purple</Chip>
        <Chip dot="#EC4899">Pink</Chip>
        <Chip dot="#F97316">Orange</Chip>
      </DemoRow>
      <DemoRow label="outlined + dot">
        <Chip variant="outlined" dot="var(--color-success)">Active</Chip>
        <Chip variant="outlined" dot="var(--color-error)">Critical</Chip>
        <Chip variant="outlined" dot="#3B82F6" onDismiss={() => {}}>Removable</Chip>
      </DemoRow>
      <DemoRow label="sizes">
        <Chip size="sm" dot="var(--color-success)">Small</Chip>
        <Chip size="md" dot="var(--color-success)">Medium</Chip>
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md'] as const;
  return (
    <Section title="Sizes" desc="Small and medium chip sizes.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Chip size={size} variant="filled">Filled</Chip>
          <Chip size={size} variant="outlined">Outlined</Chip>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Chip component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td>filled | outlined</td><td>filled</td><td>Visual variant</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Chip size</td></tr>
          <tr><td><code>icon</code></td><td>string</td><td>--</td><td>Leading icon SVG innerHTML</td></tr>
          <tr><td><code>dot</code></td><td>string</td><td>--</td><td>Leading color dot (CSS color value)</td></tr>
          <tr><td><code>onDismiss</code></td><td>() =&gt; void</td><td>--</td><td>Dismiss callback; shows X button</td></tr>
          <tr><td><code>onClick</code></td><td>() =&gt; void</td><td>--</td><td>Click handler; makes chip interactive</td></tr>
          <tr><td><code>selected</code></td><td>boolean</td><td>false</td><td>Selected state</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disabled state</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ChipDemos() {
  return (
    <>
      <VariantDemo />
      <DotDemo />
      <SelectableDemo />
      <DismissDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default ChipDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Chip>Label</Chip>;
}
