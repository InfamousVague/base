var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/button-group/button-group.css';
import '@primitives/button/button.css';

import { ButtonGroup } from '@primitives/button-group/ButtonGroup';
import { Button } from '@primitives/button/Button';

// ---- Horizontal Demo ----
function HorizontalDemo() {
  return (
    <Section title="Horizontal" desc="Three secondary buttons grouped horizontally.">
      <DemoRow label="horizontal">
        <ButtonGroup>
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Center</Button>
          <Button variant="secondary">Right</Button>
        </ButtonGroup>
      </DemoRow>
    </Section>
  );
}

// ---- Vertical Demo ----
function VerticalDemo() {
  return (
    <Section title="Vertical" desc="Buttons stacked vertically.">
      <DemoRow label="vertical">
        <ButtonGroup orientation="vertical">
          <Button variant="secondary">Top</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Bottom</Button>
        </ButtonGroup>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="ButtonGroup component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Button elements to group</td></tr>
          <tr><td><code>orientation</code></td><td>horizontal | vertical</td><td>horizontal</td><td>Layout direction</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>--</td><td>Size override for child buttons</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ButtonGroupDemos() {
  return (
    <>
      <HorizontalDemo />
      <VerticalDemo />
      <PropsTable />
    </>
  );
}

export default ButtonGroupDemos;
`;export{e as default};