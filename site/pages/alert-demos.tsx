import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/alert/alert.css';
import '@primitives/icon/icon.css';

import { Alert } from '@primitives/alert/Alert';

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['info', 'success', 'warning', 'error', 'neutral'] as const;
  return (
    <Section title="Variants" desc="All five alert variants with titles and descriptions.">
      {variants.map(variant => (
        <DemoRow key={variant} label={variant}>
          <Alert variant={variant} title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Alert`}>
            This is a {variant} alert with a description providing additional context.
          </Alert>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Dismissible Demo ----
function DismissibleDemo() {
  const [visible, setVisible] = useState({ info: true, warning: true, error: true });

  return (
    <Section title="Dismissible" desc="Alerts with dismiss buttons that hide on click.">
      {visible.info && (
        <DemoRow label="info">
          <Alert variant="info" title="Dismissible Info" dismissible onDismiss={() => setVisible(v => ({ ...v, info: false }))}>
            Click the dismiss button to hide this alert.
          </Alert>
        </DemoRow>
      )}
      {visible.warning && (
        <DemoRow label="warning">
          <Alert variant="warning" title="Dismissible Warning" dismissible onDismiss={() => setVisible(v => ({ ...v, warning: false }))}>
            This warning can be dismissed by the user.
          </Alert>
        </DemoRow>
      )}
      {visible.error && (
        <DemoRow label="error">
          <Alert variant="error" title="Dismissible Error" dismissible onDismiss={() => setVisible(v => ({ ...v, error: false }))}>
            This error alert is dismissible.
          </Alert>
        </DemoRow>
      )}
      {!visible.info && !visible.warning && !visible.error && (
        <DemoRow label="reset">
          <button
            onClick={() => setVisible({ info: true, warning: true, error: true })}
            style={{ padding: 'var(--sp-1) var(--sp-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)', cursor: 'pointer' }}
          >
            Reset All
          </button>
        </DemoRow>
      )}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Alert component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td>info | success | warning | error | neutral</td><td>--</td><td>Status variant (required)</td></tr>
          <tr><td><code>title</code></td><td>string</td><td>--</td><td>Optional title</td></tr>
          <tr><td><code>icon</code></td><td>string</td><td>--</td><td>Optional icon SVG innerHTML</td></tr>
          <tr><td><code>dismissible</code></td><td>boolean</td><td>false</td><td>Whether the alert can be dismissed</td></tr>
          <tr><td><code>onDismiss</code></td><td>() =&gt; void</td><td>--</td><td>Called when dismiss button is clicked</td></tr>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Description content (required)</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function AlertDemos() {
  return (
    <>
      <VariantDemo />
      <DismissibleDemo />
      <PropsTable />
    </>
  );
}


export default AlertDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Alert>This is an alert message.</Alert>;
}
