var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/card/card.css';
import { Card } from '@primitives/card/Card';

function CardContent({ title, desc }: { title: string; desc: string }) {
  return (
    <>
      <div style={{ fontSize: 'var(--text-base-size)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)', marginBottom: 'var(--sp-1)' }}>
        {title}
      </div>
      <div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-tertiary)' }}>
        {desc}
      </div>
    </>
  );
}

function VariantDemo() {
  return (
    <Section title="Variants" desc="Card visual variants: elevated, outlined, and filled.">
      {(['elevated', 'outlined', 'filled'] as const).map((v) => (
        <DemoRow key={v} label={\`variant="\${v}"\`}>
          <Card variant={v} style={{ maxWidth: '20rem' }}>
            <CardContent title={\`\${v} card\`} desc={\`This card uses the \${v} variant.\`} />
          </Card>
        </DemoRow>
      ))}
    </Section>
  );
}

function PaddingDemo() {
  return (
    <Section title="Padding" desc="Internal padding options from none to lg.">
      {(['none', 'sm', 'md', 'lg'] as const).map((p) => (
        <DemoRow key={p} label={\`padding="\${p}"\`}>
          <Card padding={p} style={{ maxWidth: '20rem' }}>
            <CardContent title={\`padding=\${p}\`} desc="Content inside the card." />
          </Card>
        </DemoRow>
      ))}
    </Section>
  );
}

function InteractiveDemo() {
  return (
    <Section title="Interactive" desc="Cards with hover and focus effects for clickable surfaces.">
      <DemoRow label="interactive">
        <Card interactive style={{ maxWidth: '20rem', cursor: 'pointer' }}>
          <CardContent title="Clickable card" desc="Hover to see the interactive effect." />
        </Card>
      </DemoRow>
      <DemoRow label="elevated + interactive">
        <Card variant="elevated" interactive style={{ maxWidth: '20rem', cursor: 'pointer' }}>
          <CardContent title="Elevated interactive" desc="Combines shadow with hover state." />
        </Card>
      </DemoRow>
    </Section>
  );
}

function ShapeDemo() {
  const shapes = ['square', 'default', 'pill'] as const;
  return (
    <Section title="Shapes" desc="Border-radius shape options: square, default, and pill.">
      {shapes.map(shape => (
        <DemoRow key={shape} label={\`shape="\${shape}"\`}>
          <Card shape={shape} style={{ maxWidth: '20rem' }}>
            <CardContent title={\`\${shape} shape\`} desc={\`This card uses the \${shape} shape.\`} />
          </Card>
        </DemoRow>
      ))}
    </Section>
  );
}

function PropsTable() {
  return (
    <Section title="Props" desc="Card component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td>elevated | outlined | filled</td><td>outlined</td><td>Visual variant</td></tr>
          <tr><td><code>padding</code></td><td>none | sm | md | lg</td><td>md</td><td>Internal padding</td></tr>
          <tr><td><code>shape</code></td><td>square | default | pill</td><td>default</td><td>Border-radius shape</td></tr>
          <tr><td><code>interactive</code></td><td>boolean</td><td>false</td><td>Hover effects for clickable cards</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

function CardDemos() {
  return (
    <>
      <VariantDemo />
      <PaddingDemo />
      <InteractiveDemo />
      <ShapeDemo />
      <PropsTable />
    </>
  );
}

export default CardDemos;

/** Blueprint target — default-props instance for measurement inspection */
export function BlueprintTarget() {
  return (
    <Card style={{ width: 280 }}>
      <div style={{ padding: 'var(--sp-4)' }}>
        <div style={{ fontSize: 'var(--text-base-size)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>Card Title</div>
        <div style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)', marginTop: 'var(--sp-1)' }}>Card content goes here.</div>
      </div>
    </Card>
  );
}
`;export{e as default};