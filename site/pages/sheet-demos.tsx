import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/sheet/sheet.css';
import '@primitives/button/button.css';

import { Sheet } from '@primitives/sheet/Sheet';
import { Button } from '@primitives/button/Button';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  const [openSheet, setOpenSheet] = useState<string | null>(null);
  return (
    <Section title="Sizes" desc="Small, medium, and large sheets opening from the right.">
      <DemoRow label="sizes">
        {sizes.map(size => (
          <Button key={size} size="sm" onClick={() => setOpenSheet(size)}>
            Open {size}
          </Button>
        ))}
      </DemoRow>
      {sizes.map(size => (
        <Sheet
          key={size}
          open={openSheet === size}
          onClose={() => setOpenSheet(null)}
          size={size}
          side="right"
          title={`${size.toUpperCase()} Sheet`}
        >
          <p>This is a {size} sheet panel.</p>
        </Sheet>
      ))}
    </Section>
  );
}

// ---- Side Demo ----
function SideDemo() {
  const sides = ['left', 'right'] as const;
  const [openSide, setOpenSide] = useState<string | null>(null);
  return (
    <Section title="Sides" desc="Sheets sliding from left or right.">
      <DemoRow label="side">
        {sides.map(side => (
          <Button key={side} size="sm" onClick={() => setOpenSide(side)}>
            Open {side}
          </Button>
        ))}
      </DemoRow>
      {sides.map(side => (
        <Sheet
          key={side}
          open={openSide === side}
          onClose={() => setOpenSide(null)}
          side={side}
          title={`${side} Sheet`}
        >
          <p>This sheet slides from the {side}.</p>
        </Sheet>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Sheet component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>open</code></td><td>boolean</td><td>--</td><td>Whether the sheet is visible</td></tr>
          <tr><td><code>onClose</code></td><td>() =&gt; void</td><td>--</td><td>Called when the sheet should close</td></tr>
          <tr><td><code>side</code></td><td>left | right</td><td>right</td><td>Side the sheet slides from</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Sheet width preset</td></tr>
          <tr><td><code>title</code></td><td>string</td><td>--</td><td>Optional header title</td></tr>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Sheet body content</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function SheetDemos() {
  return (
    <>
      <SizeDemo />
      <SideDemo />
      <PropsTable />
    </>
  );
}

export default SheetDemos;
