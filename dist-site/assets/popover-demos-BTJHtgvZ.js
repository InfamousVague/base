var e=`import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/popover/popover.css';
import '@primitives/button/button.css';

import { Popover } from '@primitives/popover/Popover';
import { Button } from '@primitives/button/Button';

// ---- Placement Demo ----
function PlacementDemo() {
  const placements = ['top', 'bottom', 'left', 'right'] as const;
  return (
    <Section title="Placement" desc="Popover positioned on each side of the trigger.">
      <DemoRow label="placement">
        {placements.map(placement => (
          <Popover
            key={placement}
            placement={placement}
            trigger={<Button variant="secondary" size="sm">{placement}</Button>}
            content={<div style={{ padding: 'var(--sp-3)' }}>Content on {placement}</div>}
          />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Align Demo ----
function AlignDemo() {
  const aligns = ['start', 'center', 'end'] as const;
  return (
    <Section title="Alignment" desc="Alignment along the placement axis (bottom placement shown).">
      <DemoRow label="align">
        {aligns.map(align => (
          <Popover
            key={align}
            placement="bottom"
            align={align}
            trigger={<Button variant="secondary" size="sm">{align}</Button>}
            content={<div style={{ padding: 'var(--sp-3)' }}>Aligned {align}</div>}
          />
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Popover component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>trigger</code></td><td>ReactNode</td><td>--</td><td>The trigger element</td></tr>
          <tr><td><code>content</code></td><td>ReactNode</td><td>--</td><td>The popover content</td></tr>
          <tr><td><code>open</code></td><td>boolean</td><td>--</td><td>Controlled open state</td></tr>
          <tr><td><code>onOpenChange</code></td><td>(open: boolean) =&gt; void</td><td>--</td><td>Called when open state changes</td></tr>
          <tr><td><code>placement</code></td><td>top | bottom | left | right</td><td>bottom</td><td>Placement relative to trigger</td></tr>
          <tr><td><code>align</code></td><td>start | center | end</td><td>start</td><td>Alignment along the placement axis</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function PopoverDemos() {
  return (
    <>
      <PlacementDemo />
      <AlignDemo />
      <PropsTable />
    </>
  );
}

export default PopoverDemos;
`;export{e as default};