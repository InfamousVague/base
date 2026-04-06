var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/timeline/timeline.css';
import '@primitives/icon/icon.css';

import { Timeline } from '@primitives/timeline/Timeline';

// ---- Basic Demo ----
function BasicDemo() {
  const items = [
    { title: 'Order placed', description: 'Your order has been confirmed.', timestamp: 'Mar 20, 9:00 AM' },
    { title: 'Payment processed', description: 'Payment of $49.99 received.', timestamp: 'Mar 20, 9:05 AM' },
    { title: 'Shipped', description: 'Package handed to carrier.', timestamp: 'Mar 21, 2:30 PM' },
    { title: 'Delivered', description: 'Package delivered to front door.', timestamp: 'Mar 22, 11:15 AM' },
  ];
  return (
    <Section title="Basic" desc="A vertical timeline with four events showing titles, descriptions, and timestamps.">
      <DemoRow label="timeline">
        <Timeline items={items} />
      </DemoRow>
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const items = [
    { title: 'Started', description: 'Pipeline initiated.', timestamp: '10:00 AM', color: 'info' as const },
    { title: 'Build passed', description: 'All checks green.', timestamp: '10:05 AM', color: 'success' as const },
    { title: 'Warning raised', description: 'Deprecation notice detected.', timestamp: '10:06 AM', color: 'warning' as const },
    { title: 'Deploy failed', description: 'Rollback triggered.', timestamp: '10:12 AM', color: 'error' as const },
  ];
  return (
    <Section title="Colors" desc="Timeline events with different indicator colors.">
      <DemoRow label="colors">
        <Timeline items={items} />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Timeline component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>items</code></td><td>TimelineItem[]</td><td>--</td><td>Array of timeline events</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
      <h3 style={{ marginTop: 'var(--sp-4)' }}>TimelineItem</h3>
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>title</code></td><td>string</td><td>--</td><td>Event title</td></tr>
          <tr><td><code>description</code></td><td>string</td><td>--</td><td>Optional description text</td></tr>
          <tr><td><code>timestamp</code></td><td>string</td><td>--</td><td>Optional timestamp label</td></tr>
          <tr><td><code>icon</code></td><td>string</td><td>--</td><td>Optional icon SVG innerHTML</td></tr>
          <tr><td><code>color</code></td><td>accent | success | error | warning | info | neutral</td><td>--</td><td>Indicator color</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TimelineDemos() {
  return (
    <>
      <BasicDemo />
      <ColorDemo />
      <PropsTable />
    </>
  );
}

export default TimelineDemos;
`;export{e as default};