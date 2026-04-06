var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/avatar-group/avatar-group.css';
import '@primitives/avatar/avatar.css';

import { AvatarGroup } from '@primitives/avatar-group/AvatarGroup';
import { Avatar } from '@primitives/avatar/Avatar';

// ---- Basic Demo ----
function BasicDemo() {
  const initials = ['AB', 'CD', 'EF', 'GH', 'IJ'];
  return (
    <Section title="Basic" desc="Five avatars with initials in a group.">
      <DemoRow label="5 avatars">
        <AvatarGroup>
          {initials.map(i => <Avatar key={i} initials={i} />)}
        </AvatarGroup>
      </DemoRow>
    </Section>
  );
}

// ---- Overflow Demo ----
function OverflowDemo() {
  const initials = ['AB', 'CD', 'EF', 'GH', 'IJ', 'KL', 'MN', 'OP'];
  return (
    <Section title="Overflow" desc="Eight avatars with max=5, showing +3 overflow.">
      <DemoRow label="max=5">
        <AvatarGroup max={5}>
          {initials.map(i => <Avatar key={i} initials={i} />)}
        </AvatarGroup>
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  const initials = ['AB', 'CD', 'EF'];
  return (
    <Section title="Sizes" desc="Small, medium, and large avatar groups.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <AvatarGroup size={size}>
            {initials.map(i => <Avatar key={i} initials={i} size={size} />)}
          </AvatarGroup>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="AvatarGroup component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Avatar components to render</td></tr>
          <tr><td><code>max</code></td><td>number</td><td>5</td><td>Maximum visible avatars before overflow</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size of the overflow indicator</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function AvatarGroupDemos() {
  return (
    <>
      <BasicDemo />
      <OverflowDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default AvatarGroupDemos;
`;export{e as default};