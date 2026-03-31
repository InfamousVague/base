import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/text/text.css';

import { Text } from '@primitives/text/Text';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'] as const;
  return (
    <Section title="Size Scale" desc="Eight size steps from xs to 4xl, mapping to the type scale.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Text size={size}>The quick brown fox jumps over the lazy dog</Text>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['primary', 'secondary', 'tertiary', 'disabled', 'accent', 'error', 'warning', 'success', 'info'] as const;
  return (
    <Section title="Colors" desc="Nine semantic color variants for text.">
      {colors.map(color => (
        <DemoRow key={color} label={color}>
          <Text size="lg" color={color}>Sample text in {color}</Text>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Weight Demo ----
function WeightDemo() {
  const weights = ['regular', 'medium', 'semibold', 'bold', 'heavy'] as const;
  return (
    <Section title="Weights" desc="Five font weight options at lg size.">
      {weights.map(weight => (
        <DemoRow key={weight} label={weight}>
          <Text size="lg" weight={weight}>The quick brown fox</Text>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Font Demo ----
function FontDemo() {
  return (
    <Section title="Font Family" desc="Sans (default) vs mono.">
      <DemoRow label="sans">
        <Text size="lg">The quick brown fox jumps over the lazy dog</Text>
      </DemoRow>
      <DemoRow label="mono">
        <Text size="lg" font="mono">const x = 42; console.log(x);</Text>
      </DemoRow>
    </Section>
  );
}

// ---- Truncate Demo ----
function TruncateDemo() {
  const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.';
  return (
    <Section title="Truncation" desc="Line clamping from 1 to 3 lines.">
      {[1, 2, 3].map(lines => (
        <DemoRow key={lines} label={`truncate-${lines}`}>
          <Text truncate={lines} style={{ maxWidth: '32rem' }}>{longText}</Text>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Align Demo ----
function AlignDemo() {
  const aligns = ['left', 'center', 'right'] as const;
  return (
    <Section title="Alignment" desc="Text alignment options.">
      {aligns.map(align => (
        <DemoRow key={align} label={align}>
          <Text as="div" align={align} style={{ width: '100%' }}>Aligned {align}</Text>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Text component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>as</code></td><td>span | p | label | h1-h6 | div | strong | em</td><td>span</td><td>HTML element to render</td></tr>
          <tr><td><code>size</code></td><td>xs | sm | base | lg | xl | 2xl | 3xl | 4xl</td><td>base</td><td>Typography size scale</td></tr>
          <tr><td><code>weight</code></td><td>regular | medium | semibold | bold | heavy</td><td>--</td><td>Font weight override</td></tr>
          <tr><td><code>color</code></td><td>primary | secondary | tertiary | disabled | accent | error | warning | success | info</td><td>primary</td><td>Text color</td></tr>
          <tr><td><code>font</code></td><td>sans | mono</td><td>sans</td><td>Font family</td></tr>
          <tr><td><code>align</code></td><td>left | center | right</td><td>--</td><td>Text alignment</td></tr>
          <tr><td><code>truncate</code></td><td>number (0-5)</td><td>--</td><td>Line truncation: 1=ellipsis, 2-5=line-clamp</td></tr>
          <tr><td><code>inline</code></td><td>boolean</td><td>--</td><td>Display inline</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TextDemos() {
  return (
    <>
      <SizeDemo />
      <ColorDemo />
      <WeightDemo />
      <FontDemo />
      <TruncateDemo />
      <AlignDemo />
      <PropsTable />
    </>
  );
}

export default TextDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Text>The quick brown fox</Text>;
}
