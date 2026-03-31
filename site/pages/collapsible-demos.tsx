import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/collapsible/collapsible.css';
import '@primitives/icon/icon.css';

import { Collapsible } from '@primitives/collapsible/Collapsible';
import { Accordion } from '@primitives/collapsible/Accordion';

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic Collapsible" desc="A single expandable section with text content.">
      <DemoRow label="default">
        <Collapsible trigger="What is a collapsible?">
          <p style={{ margin: 0 }}>
            A collapsible is a UI component that lets users toggle the visibility
            of a content section by clicking a trigger header.
          </p>
        </Collapsible>
      </DemoRow>
    </Section>
  );
}

// ---- Accordion Demo (single) ----
function AccordionDemo() {
  return (
    <Section title="Accordion (single)" desc="Only one item can be open at a time.">
      <DemoRow label="single">
        <Accordion type="single" defaultValue={['item-1']}>
          <Accordion.Item value="item-1" trigger="First Section">
            <p style={{ margin: 0 }}>Content for the first accordion section.</p>
          </Accordion.Item>
          <Accordion.Item value="item-2" trigger="Second Section">
            <p style={{ margin: 0 }}>Content for the second accordion section.</p>
          </Accordion.Item>
          <Accordion.Item value="item-3" trigger="Third Section">
            <p style={{ margin: 0 }}>Content for the third accordion section.</p>
          </Accordion.Item>
        </Accordion>
      </DemoRow>
    </Section>
  );
}

// ---- Multiple Demo ----
function MultipleDemo() {
  return (
    <Section title="Accordion (multiple)" desc="Multiple items can be open simultaneously.">
      <DemoRow label="multiple">
        <Accordion type="multiple" defaultValue={['m-1', 'm-2']}>
          <Accordion.Item value="m-1" trigger="Getting Started">
            <p style={{ margin: 0 }}>Installation and setup instructions.</p>
          </Accordion.Item>
          <Accordion.Item value="m-2" trigger="Configuration">
            <p style={{ margin: 0 }}>How to configure your environment.</p>
          </Accordion.Item>
          <Accordion.Item value="m-3" trigger="Deployment">
            <p style={{ margin: 0 }}>Steps to deploy your application.</p>
          </Accordion.Item>
        </Accordion>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Collapsible and Accordion component APIs.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td colSpan={4}><strong>Collapsible</strong></td></tr>
          <tr><td><code>open</code></td><td>boolean</td><td>--</td><td>Controlled open state</td></tr>
          <tr><td><code>defaultOpen</code></td><td>boolean</td><td>false</td><td>Default open state (uncontrolled)</td></tr>
          <tr><td><code>onOpenChange</code></td><td>(open: boolean) =&gt; void</td><td>--</td><td>Callback when open state changes</td></tr>
          <tr><td><code>trigger</code></td><td>ReactNode</td><td>--</td><td>Clickable header content</td></tr>
          <tr><td colSpan={4}><strong>Accordion</strong></td></tr>
          <tr><td><code>type</code></td><td>single | multiple</td><td>multiple</td><td>Whether only one item can be open</td></tr>
          <tr><td><code>defaultValue</code></td><td>string[]</td><td>[]</td><td>Initially open item values</td></tr>
          <tr><td colSpan={4}><strong>Accordion.Item</strong></td></tr>
          <tr><td><code>value</code></td><td>string</td><td>--</td><td>Unique identifier for this item</td></tr>
          <tr><td><code>trigger</code></td><td>ReactNode</td><td>--</td><td>Clickable header content</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function CollapsibleDemos() {
  return (
    <>
      <BasicDemo />
      <AccordionDemo />
      <MultipleDemo />
      <PropsTable />
    </>
  );
}

export default CollapsibleDemos;
