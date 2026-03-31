import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/combobox/combobox.css';

import { Combobox } from '@primitives/combobox/Combobox';
import type { ComboboxOption } from '@primitives/combobox/Combobox';

// ---- Data ----
const fruits: ComboboxOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const groupedOptions: ComboboxOption[] = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'potato', label: 'Potato', group: 'Vegetables' },
];

// ---- Basic Demo ----
function BasicDemo() {
  const [value, setValue] = useState('');
  return (
    <Section title="Basic" desc="Simple combobox with a list of fruits.">
      <DemoRow label="default">
        <Combobox
          options={fruits}
          value={value}
          onChange={setValue}
          placeholder="Select a fruit..."
        />
      </DemoRow>
    </Section>
  );
}

// ---- Grouped Demo ----
function GroupedDemo() {
  const [value, setValue] = useState('');
  return (
    <Section title="Grouped" desc="Options organized into groups.">
      <DemoRow label="groups">
        <Combobox
          options={groupedOptions}
          value={value}
          onChange={setValue}
          placeholder="Search produce..."
        />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const [smValue, setSmValue] = useState('');
  const [mdValue, setMdValue] = useState('');
  return (
    <Section title="Sizes" desc="Small and medium size variants.">
      <DemoRow label="sm">
        <Combobox
          options={fruits}
          value={smValue}
          onChange={setSmValue}
          size="sm"
          placeholder="Small..."
        />
      </DemoRow>
      <DemoRow label="md">
        <Combobox
          options={fruits}
          value={mdValue}
          onChange={setMdValue}
          size="md"
          placeholder="Medium..."
        />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Combobox component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>options</code></td><td>ComboboxOption[]</td><td>--</td><td>Available options</td></tr>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Controlled selected value</td></tr>
          <tr><td><code>onChange</code></td><td>(value: string) =&gt; void</td><td>--</td><td>Selection callback</td></tr>
          <tr><td><code>placeholder</code></td><td>string</td><td>Search...</td><td>Input placeholder</td></tr>
          <tr><td><code>emptyMessage</code></td><td>string</td><td>No results</td><td>Message when no options match</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Size variant</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ComboboxDemos() {
  return (
    <>
      <BasicDemo />
      <GroupedDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default ComboboxDemos;
