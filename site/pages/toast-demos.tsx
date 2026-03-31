import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/toast/toast.css';
import '@primitives/button/button.css';
import '@primitives/icon/icon.css';

import { Toast } from '@primitives/toast/Toast';
import { Toaster } from '@primitives/toast/Toaster';
import { useToast } from '@primitives/toast/useToast';
import { Button } from '@primitives/button/Button';

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['success', 'error', 'warning', 'info', 'neutral'] as const;
  return (
    <Section title="Variants" desc="Floating pill toasts with auto-icon per variant.">
      {variants.map(variant => (
        <DemoRow key={variant} label={variant}>
          <Toast variant={variant} message={`This is a ${variant} message`} onDismiss={() => {}} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- With Action Demo ----
function WithActionDemo() {
  return (
    <Section title="With Action" desc="Toast with an inline action link.">
      <DemoRow label="undo">
        <Toast variant="neutral" message="Item deleted" action={{ label: 'Undo', onClick: () => {} }} onDismiss={() => {}} />
      </DemoRow>
      <DemoRow label="view">
        <Toast variant="success" message="File uploaded" action={{ label: 'View', onClick: () => {} }} />
      </DemoRow>
    </Section>
  );
}

// ---- Interactive Toaster Demo ----
function ToasterDemo() {
  const { toasts, toast, dismiss } = useToast();

  return (
    <Section title="Interactive" desc="Click buttons to trigger floating pill toasts at bottom-center.">
      <DemoRow label="trigger">
        <Button size="sm" onClick={() => toast({ message: 'Changes saved' })}>
          Neutral
        </Button>
        <Button size="sm" onClick={() => toast({ variant: 'success', message: 'Deployment complete' })}>
          Success
        </Button>
        <Button size="sm" onClick={() => toast({ variant: 'error', message: 'Connection failed' })}>
          Error
        </Button>
        <Button size="sm" onClick={() => toast({ variant: 'warning', message: 'Rate limit approaching' })}>
          Warning
        </Button>
        <Button size="sm" onClick={() => toast({ variant: 'info', message: 'New version available' })}>
          Info
        </Button>
        <Button size="sm" variant="secondary" onClick={() => toast({ message: 'Item removed', action: { label: 'Undo', onClick: () => {} } })}>
          With Undo
        </Button>
      </DemoRow>
      <Toaster toasts={toasts} onDismiss={dismiss} />
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Toast component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td>success | error | warning | info | neutral</td><td>neutral</td><td>Visual variant with auto-icon</td></tr>
          <tr><td><code>message</code></td><td>string</td><td>--</td><td>Toast message text (required)</td></tr>
          <tr><td><code>action</code></td><td>{'{ label, onClick }'}</td><td>--</td><td>Optional inline action link</td></tr>
          <tr><td><code>onDismiss</code></td><td>() =&gt; void</td><td>--</td><td>Show close button when provided</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ToastDemos() {
  return (
    <>
      <VariantDemo />
      <WithActionDemo />
      <ToasterDemo />
      <PropsTable />
    </>
  );
}

export default ToastDemos;
