import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/sparkline/sparkline.css';

import { Sparkline } from '@primitives/sparkline/Sparkline';

const sampleData = [4, 8, 3, 12, 7, 10, 5, 15, 9, 11, 6, 14];

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="A simple sparkline with sample data.">
      <DemoRow label="default">
        <Sparkline data={sampleData} />
      </DemoRow>
    </Section>
  );
}

// ---- Filled Demo ----
function FilledDemo() {
  return (
    <Section title="Filled" desc="Sparkline with the area under the line filled.">
      <DemoRow label="filled">
        <Sparkline data={sampleData} filled />
      </DemoRow>
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['accent', 'success', 'error', 'warning', 'info'] as const;
  return (
    <Section title="Colors" desc="Sparklines in each available color.">
      {colors.map((color) => (
        <DemoRow key={color} label={color}>
          <Sparkline data={sampleData} color={color} filled />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  return (
    <Section title="Sizes" desc="Different width and height combinations.">
      <DemoRow label="60x16">
        <Sparkline data={sampleData} width={60} height={16} />
      </DemoRow>
      <DemoRow label="120x32">
        <Sparkline data={sampleData} width={120} height={32} />
      </DemoRow>
      <DemoRow label="200x48">
        <Sparkline data={sampleData} width={200} height={48} filled />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Sparkline component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td>number[]</td><td>--</td><td>Data points to plot</td></tr>
          <tr><td><code>width</code></td><td>number</td><td>80</td><td>SVG width in pixels</td></tr>
          <tr><td><code>height</code></td><td>number</td><td>24</td><td>SVG height in pixels</td></tr>
          <tr><td><code>color</code></td><td>accent | success | error | warning | info</td><td>--</td><td>Line/area color</td></tr>
          <tr><td><code>filled</code></td><td>boolean</td><td>false</td><td>Fill area under the line</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function SparklineDemos() {
  return (
    <>
      <BasicDemo />
      <FilledDemo />
      <ColorDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default SparklineDemos;
