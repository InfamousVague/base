import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/avatar/avatar.css';

import { Avatar } from '@primitives/avatar/Avatar';

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  return (
    <Section title="Sizes" desc="Five avatar sizes with initials fallback.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Avatar size={size} initials="AB" />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Image Demo ----
function ImageDemo() {
  return (
    <Section title="With Image" desc="Avatar with an image source, and initials fallback side by side.">
      <DemoRow label="image">
        <Avatar size="lg" src="https://picsum.photos/80/80" alt="User photo" />
      </DemoRow>
      <DemoRow label="initials">
        <Avatar size="lg" initials="JD" />
      </DemoRow>
    </Section>
  );
}

// ---- Status Demo ----
function StatusDemo() {
  const statuses = ['online', 'offline', 'busy', 'away'] as const;
  return (
    <Section title="Status Indicator" desc="Online, offline, busy, and away status dots at md size.">
      {statuses.map(status => (
        <DemoRow key={status} label={status}>
          <Avatar size="md" initials="AB" status={status} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Shape Demo ----
function ShapeDemo() {
  const shapes = ['square', 'rounded', 'circle'] as const;
  return (
    <Section title="Shapes" desc="Border-radius shape options: square, rounded, and circle (default).">
      {shapes.map(shape => (
        <DemoRow key={shape} label={shape}>
          <Avatar size="md" initials="AB" shape={shape} />
          <Avatar size="lg" initials="CD" shape={shape} />
          <Avatar size="xl" initials="EF" shape={shape} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Ring Demo ----
function RingDemo() {
  const rings = ['accent', 'error', 'success', 'warning'] as const;
  return (
    <Section title="Ring" desc="Colored ring around avatar for active/highlight states.">
      {rings.map(ring => (
        <DemoRow key={ring} label={ring}>
          <Avatar size="md" initials="AB" ring={ring} />
          <Avatar size="lg" initials="CD" ring={ring} />
          <Avatar size="xl" initials="EF" ring={ring} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Avatar component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>src</code></td><td>string</td><td>--</td><td>Image source URL</td></tr>
          <tr><td><code>alt</code></td><td>string</td><td>""</td><td>Alt text for the image</td></tr>
          <tr><td><code>initials</code></td><td>string</td><td>--</td><td>Fallback initials (1-2 characters)</td></tr>
          <tr><td><code>size</code></td><td>xs | sm | md | lg | xl</td><td>md</td><td>Avatar size</td></tr>
          <tr><td><code>shape</code></td><td>square | rounded | circle</td><td>circle</td><td>Border-radius shape</td></tr>
          <tr><td><code>status</code></td><td>online | offline | busy | away</td><td>--</td><td>Online status indicator</td></tr>
          <tr><td><code>ring</code></td><td>none | accent | error | success | warning</td><td>none</td><td>Colored ring around avatar</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function AvatarDemos() {
  return (
    <>
      <SizeDemo />
      <ImageDemo />
      <StatusDemo />
      <ShapeDemo />
      <RingDemo />
      <PropsTable />
    </>
  );
}

export default AvatarDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Avatar initials="AB" />;
}
