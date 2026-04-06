var e=`import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/rating/rating.css';
import '@primitives/icon/icon.css';

import { Rating } from '@primitives/rating/Rating';

// ---- Interactive Demo ----
function InteractiveDemo() {
  const [value, setValue] = useState(3);
  return (
    <Section title="Interactive" desc="Click a star to set the rating.">
      <DemoRow label={\`rating: \${value}\`}>
        <Rating value={value} onChange={setValue} />
      </DemoRow>
    </Section>
  );
}

// ---- Read-Only Demo ----
function ReadOnlyDemo() {
  return (
    <Section title="Read-Only" desc="Display-only rating at 3.5 stars.">
      <DemoRow label="3.5 stars">
        <Rating value={3.5} readOnly />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Small, medium, and large rating sizes.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Rating value={4} readOnly size={size} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Rating component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>number</td><td>--</td><td>Current rating value</td></tr>
          <tr><td><code>onChange</code></td><td>(value: number) =&gt; void</td><td>--</td><td>Callback when rating changes</td></tr>
          <tr><td><code>max</code></td><td>number</td><td>5</td><td>Maximum number of stars</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Star size</td></tr>
          <tr><td><code>readOnly</code></td><td>boolean</td><td>false</td><td>Display only, no interaction</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function RatingDemos() {
  return (
    <>
      <InteractiveDemo />
      <ReadOnlyDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default RatingDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Rating value={3} />;
}
`;export{e as default};