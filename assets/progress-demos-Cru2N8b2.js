var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/progress/progress.css';

import { Progress } from '@primitives/progress/Progress';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three bar thicknesses at 60% value.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <div style={{ width: '100%' }}>
            <Progress size={size} value={60} />
          </div>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['accent', 'error', 'warning', 'success', 'info'] as const;
  return (
    <Section title="Colors" desc="Five semantic color options at 60% value.">
      {colors.map(color => (
        <DemoRow key={color} label={color}>
          <div style={{ width: '100%' }}>
            <Progress color={color} value={60} />
          </div>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Value Demo ----
function ValueDemo() {
  const values = [0, 25, 50, 75, 100];
  return (
    <Section title="Values" desc="Progress at 0%, 25%, 50%, 75%, and 100%.">
      {values.map(v => (
        <DemoRow key={v} label={\`\${v}%\`}>
          <div style={{ width: '100%' }}>
            <Progress value={v} />
          </div>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Indeterminate Demo ----
function IndeterminateDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Indeterminate" desc="Animated indeterminate state at each size.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <div style={{ width: '100%' }}>
            <Progress size={size} indeterminate />
          </div>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Progress component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>number (0-100)</td><td>0</td><td>Current progress value</td></tr>
          <tr><td><code>indeterminate</code></td><td>boolean</td><td>false</td><td>Show indeterminate animation instead of value</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Bar thickness</td></tr>
          <tr><td><code>color</code></td><td>accent | error | warning | success | info</td><td>accent</td><td>Bar color</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ProgressDemos() {
  return (
    <>
      <SizeDemo />
      <ColorDemo />
      <ValueDemo />
      <IndeterminateDemo />
      <PropsTable />
    </>
  );
}

export default ProgressDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Progress value={65} style={{ width: 200 }} />;
}
`;export{e as default};