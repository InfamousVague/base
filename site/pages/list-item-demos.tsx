import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/list-item/list-item.css';
import '@primitives/icon/icon.css';

import { ListItem } from '@primitives/list-item/ListItem';
import { home } from '@primitives/icon/icons/home';
import { settings } from '@primitives/icon/icons/settings';
import { user } from '@primitives/icon/icons/user';
import { mail } from '@primitives/icon/icons/mail';

import { Badge } from '@primitives/badge/Badge';
import { Kbd } from '@primitives/kbd/Kbd';

import '@primitives/badge/badge.css';
import '@primitives/kbd/kbd.css';

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="List items with icons, labels, and descriptions.">
      <DemoRow label="default">
        <div style={{ width: '100%', maxWidth: '24rem' }}>
          <ListItem icon={home} label="Home" description="Return to the dashboard" />
          <ListItem icon={user} label="Profile" description="View your account details" />
          <ListItem icon={mail} label="Messages" description="Check your inbox" />
          <ListItem icon={settings} label="Settings" description="Manage preferences" />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Trailing Demo ----
function TrailingDemo() {
  return (
    <Section title="Trailing Content" desc="List items with trailing badges, keyboard shortcuts, or custom content.">
      <DemoRow label="trailing">
        <div style={{ width: '100%', maxWidth: '24rem' }}>
          <ListItem
            icon={mail}
            label="Inbox"
            description="Unread messages"
            trailing={<Badge size="sm" color="accent" variant="solid">12</Badge>}
          />
          <ListItem
            icon={settings}
            label="Settings"
            trailing={<Kbd size="sm">,</Kbd>}
          />
          <ListItem
            icon={user}
            label="Profile"
            trailing={<Kbd size="sm">P</Kbd>}
          />
          <ListItem
            icon={home}
            label="Dashboard"
            trailing={<Kbd size="sm">D</Kbd>}
          />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- State Demo ----
function StateDemo() {
  return (
    <Section title="States" desc="Active, selected, and disabled states.">
      <DemoRow label="states">
        <div style={{ width: '100%', maxWidth: '24rem' }}>
          <ListItem icon={home} label="Default" description="Normal state" />
          <ListItem icon={user} label="Active" description="Keyboard focused" active />
          <ListItem icon={mail} label="Selected" description="Currently selected" selected />
          <ListItem icon={settings} label="Disabled" description="Cannot interact" disabled />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="ListItem component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>icon</code></td><td>string</td><td>--</td><td>Leading icon SVG innerHTML</td></tr>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Primary label text</td></tr>
          <tr><td><code>description</code></td><td>string</td><td>--</td><td>Secondary description text</td></tr>
          <tr><td><code>trailing</code></td><td>ReactNode</td><td>--</td><td>Trailing content (badge, kbd, etc.)</td></tr>
          <tr><td><code>active</code></td><td>boolean</td><td>false</td><td>Active state (keyboard-focused)</td></tr>
          <tr><td><code>selected</code></td><td>boolean</td><td>false</td><td>Selected state</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disabled state</td></tr>
          <tr><td><code>onClick</code></td><td>() =&gt; void</td><td>--</td><td>Click handler</td></tr>
          <tr><td><code>href</code></td><td>string</td><td>--</td><td>Link href (renders as anchor)</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ListItemDemos() {
  return (
    <>
      <BasicDemo />
      <TrailingDemo />
      <StateDemo />
      <PropsTable />
    </>
  );
}

export default ListItemDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <ListItem label="List Item" />;
}
