import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/indicator/indicator.css';
import '@primitives/avatar/avatar.css';
import '@primitives/icon/icon.css';

import { Indicator } from '@primitives/indicator/Indicator';
import { Avatar } from '@primitives/avatar/Avatar';
import { Icon } from '@primitives/icon/Icon';
import { bell } from '@primitives/icon/icons/bell';

// ---- Dot Demo ----
function DotDemo() {
  return (
    <Section title="Dot on Avatar" desc="A simple dot indicator on an avatar.">
      <DemoRow label="dot">
        <Indicator color="success">
          <Avatar initials="AB" size="md" />
        </Indicator>
      </DemoRow>
    </Section>
  );
}

// ---- Count Demo ----
function CountDemo() {
  return (
    <Section title="Count Label" desc="Indicator showing a numeric count on an icon.">
      <DemoRow label="label=5">
        <Indicator label={5} color="error">
          <Icon icon={bell} size="lg" />
        </Indicator>
      </DemoRow>
    </Section>
  );
}

// ---- Position Demo ----
function PositionDemo() {
  const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const;
  return (
    <Section title="Positions" desc="Indicator placed in all four corner positions.">
      <DemoRow label="positions">
        {positions.map((pos) => (
          <Indicator key={pos} position={pos} color="accent">
            <Avatar initials={pos.split('-').map(w => w[0].toUpperCase()).join('')} size="md" />
          </Indicator>
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['accent', 'success', 'error', 'warning', 'info', 'neutral'] as const;
  return (
    <Section title="Colors" desc="All available indicator colors.">
      <DemoRow label="colors">
        {colors.map((color) => (
          <Indicator key={color} color={color}>
            <Avatar initials={color.slice(0, 2).toUpperCase()} size="md" />
          </Indicator>
        ))}
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Indicator component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>color</code></td><td>accent | success | error | warning | info | neutral</td><td>accent</td><td>Dot color</td></tr>
          <tr><td><code>position</code></td><td>top-right | top-left | bottom-right | bottom-left</td><td>top-right</td><td>Position of the indicator</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Dot size</td></tr>
          <tr><td><code>label</code></td><td>string | number</td><td>--</td><td>Show count instead of dot</td></tr>
          <tr><td><code>show</code></td><td>boolean</td><td>true</td><td>Whether to show the indicator</td></tr>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Element to attach indicator to</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function IndicatorDemos() {
  return (
    <>
      <DotDemo />
      <CountDemo />
      <PositionDemo />
      <ColorDemo />
      <PropsTable />
    </>
  );
}

export default IndicatorDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Indicator color="success" />;
}
