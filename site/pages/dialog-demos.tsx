import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/dialog/dialog.css';
import '@primitives/button/button.css';

import { Dialog } from '@primitives/dialog/Dialog';
import { Button } from '@primitives/button/Button';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  const [openSize, setOpenSize] = useState<'sm' | 'md' | 'lg' | null>(null);

  return (
    <Section title="Sizes" desc="Three dialog width presets: sm, md, and lg.">
      <DemoRow label="open">
        {sizes.map(size => (
          <Button key={size} variant="secondary" size="sm" onClick={() => setOpenSize(size)}>
            {size}
          </Button>
        ))}
      </DemoRow>
      {sizes.map(size => (
        <Dialog
          key={size}
          open={openSize === size}
          onClose={() => setOpenSize(null)}
          title={`${size.toUpperCase()} Dialog`}
          description={`This is a ${size} size dialog.`}
          size={size}
        >
          <div className="dialog__body">
            <p>Dialog body content goes here. This dialog uses the <strong>{size}</strong> size preset.</p>
          </div>
          <div className="dialog__footer">
            <Button variant="secondary" size="sm" onClick={() => setOpenSize(null)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => setOpenSize(null)}>Confirm</Button>
          </div>
        </Dialog>
      ))}
    </Section>
  );
}

// ---- Content Demo ----
function ContentDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Section title="Form Content" desc="Dialog with form inputs and footer buttons.">
      <DemoRow label="form">
        <Button size="sm" onClick={() => setOpen(true)}>Open Form Dialog</Button>
      </DemoRow>
      <Dialog open={open} onClose={() => setOpen(false)} title="Create Project" description="Fill in the details below.">
        <div className="dialog__body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
              <span style={{ fontSize: 'var(--text-sm-size)', fontWeight: 500 }}>Project Name</span>
              <input type="text" placeholder="My project" style={{ padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
              <span style={{ fontSize: 'var(--text-sm-size)', fontWeight: 500 }}>Description</span>
              <textarea placeholder="Describe your project..." rows={3} style={{ padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)', resize: 'vertical' }} />
            </label>
          </div>
        </div>
        <div className="dialog__footer">
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Create</Button>
        </div>
      </Dialog>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Dialog component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>open</code></td><td>boolean</td><td>--</td><td>Whether the dialog is visible (required)</td></tr>
          <tr><td><code>onClose</code></td><td>() =&gt; void</td><td>--</td><td>Called when the dialog should close (required)</td></tr>
          <tr><td><code>title</code></td><td>string</td><td>--</td><td>Optional header title</td></tr>
          <tr><td><code>description</code></td><td>string</td><td>--</td><td>Optional header description</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Dialog width preset</td></tr>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Dialog body content</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function DialogDemos() {
  return (
    <>
      <SizeDemo />
      <ContentDemo />
      <PropsTable />
    </>
  );
}

export default DialogDemos;
