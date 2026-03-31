import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/tabs/tabs.css';

import { Tabs } from '@primitives/tabs/Tabs';

const sampleTabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'features', label: 'Features' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'docs', label: 'Documentation' },
];

const tabContent: Record<string, string> = {
  overview: 'This is the overview panel. It provides a high-level summary of the product.',
  features: 'Features panel listing all the key capabilities and functionality.',
  pricing: 'Pricing panel with plan comparison and billing information.',
  docs: 'Documentation panel with guides, API reference, and tutorials.',
};

// ---- Underline Demo ----
function UnderlineDemo() {
  const [value, setValue] = useState('overview');
  return (
    <Section title="Underline Variant" desc="Default underline tabs with content panel switching.">
      <DemoRow label="underline">
        <div style={{ width: '100%' }}>
          <Tabs tabs={sampleTabs} value={value} onChange={setValue} variant="underline" />
          <div style={{ padding: 'var(--sp-4)', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
            {tabContent[value]}
          </div>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Pill Demo ----
function PillDemo() {
  const [value, setValue] = useState('overview');
  return (
    <Section title="Pill Variant" desc="Pill-style tabs with background highlight.">
      <DemoRow label="pill">
        <div style={{ width: '100%' }}>
          <Tabs tabs={sampleTabs} value={value} onChange={setValue} variant="pill" />
          <div style={{ padding: 'var(--sp-4)', fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
            {tabContent[value]}
          </div>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const [smValue, setSmValue] = useState('overview');
  const [mdValue, setMdValue] = useState('overview');
  return (
    <Section title="Sizes" desc="Small and medium tab sizes.">
      <DemoRow label="sm">
        <Tabs tabs={sampleTabs} value={smValue} onChange={setSmValue} size="sm" />
      </DemoRow>
      <DemoRow label="md">
        <Tabs tabs={sampleTabs} value={mdValue} onChange={setMdValue} size="md" />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Tabs component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>tabs</code></td><td>{'Tab[]'}</td><td>--</td><td>Tab definitions (required)</td></tr>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Currently active tab value (required)</td></tr>
          <tr><td><code>onChange</code></td><td>(value: string) =&gt; void</td><td>--</td><td>Called when active tab changes (required)</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Size variant</td></tr>
          <tr><td><code>variant</code></td><td>underline | pill</td><td>underline</td><td>Visual variant</td></tr>
        </tbody>
      </table>
      <table className="token-table" style={{ marginTop: 'var(--sp-4)' }}>
        <thead><tr><th colSpan={4}>Tab</th></tr><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Unique tab identifier (required)</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Tab display label (required)</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Whether the tab is disabled</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TabsDemos() {
  return (
    <>
      <UnderlineDemo />
      <PillDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default TabsDemos;
