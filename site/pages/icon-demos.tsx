import React, { useState, useCallback } from 'react';

// CSS
import '@primitives/icon/icon.css';

// Component
import { Icon } from '@primitives/icon/Icon';
import { useIconDraw } from '@primitives/icon/useIconDraw';

// Sample icons for demos
import { arrowLeft } from '@primitives/icon/icons/arrow-left';
import { arrowRight } from '@primitives/icon/icons/arrow-right';
import { check } from '@primitives/icon/icons/check';
import { heart } from '@primitives/icon/icons/heart';
import { star } from '@primitives/icon/icons/star';
import { search } from '@primitives/icon/icons/search';
import { settings } from '@primitives/icon/icons/settings';
import { home } from '@primitives/icon/icons/home';
import { mail } from '@primitives/icon/icons/mail';
import { bell } from '@primitives/icon/icons/bell';
import { user } from '@primitives/icon/icons/user';
import { plus } from '@primitives/icon/icons/plus';
import { x } from '@primitives/icon/icons/x';
import { chevronDown } from '@primitives/icon/icons/chevron-down';
import { globe } from '@primitives/icon/icons/globe';
import { zap } from '@primitives/icon/icons/zap';

// ---- Helpers ----

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="section">
      <h2 className="section__title">{title}</h2>
      <p className="section__desc">{desc}</p>
      {children}
    </div>
  );
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', minWidth: '7rem', flexShrink: 0 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flex: 1, flexWrap: 'wrap' }}>
        {children}
      </div>
    </div>
  );
}

const SAMPLE_ICONS = [heart, star, search, settings, home, mail, bell, user, plus, globe, zap];

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'] as const;
  return (
    <Section title="Size Scale" desc="Icon sizes map to the type scale. Each icon renders in a square bounding box matching the font size.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Icon icon={heart} size={size} />
          <Icon icon={star} size={size} />
          <Icon icon={settings} size={size} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Color Demo ----
function ColorDemo() {
  const colors = ['primary', 'secondary', 'tertiary', 'disabled'] as const;
  return (
    <Section title="Colors" desc="Semantic color variants. 'currentColor' (default) inherits from the parent text color.">
      {colors.map(color => (
        <DemoRow key={color} label={color}>
          <Icon icon={heart} size="lg" color={color} />
          <Icon icon={star} size="lg" color={color} />
          <Icon icon={bell} size="lg" color={color} />
        </DemoRow>
      ))}
      <DemoRow label="inherited">
        <span style={{ color: 'var(--indigo-9)' }}>
          <Icon icon={heart} size="lg" />
          <span style={{ marginLeft: 'var(--sp-2)', fontSize: 'var(--text-lg-size)' }}>Inherits indigo</span>
        </span>
      </DemoRow>
    </Section>
  );
}

// ---- Weight Demo ----
function WeightDemo() {
  const weights = ['thin', 'light', 'regular', 'medium', 'bold'] as const;
  return (
    <Section title="Weight" desc="Stroke width acts as font weight — thin (1), light (1.5), regular (2), medium (2.5), bold (3).">
      {weights.map(weight => (
        <DemoRow key={weight} label={weight}>
          {SAMPLE_ICONS.slice(0, 6).map((icon, i) => (
            <Icon key={i} icon={icon} size="xl" weight={weight} />
          ))}
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Draw-in Demo ----
function DrawInDemo() {
  const [key, setKey] = useState(0);
  const replay = useCallback(() => setKey(k => k + 1), []);

  const btnStyle = {
    background: 'var(--color-bg-tertiary)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--sp-2) var(--sp-4)',
    color: 'var(--color-text-primary)',
    cursor: 'pointer',
    fontSize: 'var(--text-sm-size)',
  };

  return (
    <Section title="Draw-in Animation" desc="Strokes animate from hidden to visible using stroke-dashoffset. Three speed presets: fast (300ms), normal (500ms), slow (900ms).">
      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <button onClick={replay} style={btnStyle}>Replay</button>
      </div>
      <div key={key}>
        <DemoRow label="fast">
          {SAMPLE_ICONS.slice(0, 6).map((icon, i) => (
            <Icon key={i} icon={icon} size="2xl" draw drawSpeed="fast" />
          ))}
        </DemoRow>
        <DemoRow label="normal">
          {SAMPLE_ICONS.slice(0, 6).map((icon, i) => (
            <Icon key={i} icon={icon} size="2xl" draw drawSpeed="normal" drawStagger={60} />
          ))}
        </DemoRow>
        <DemoRow label="slow">
          {SAMPLE_ICONS.slice(0, 6).map((icon, i) => (
            <Icon key={i} icon={icon} size="2xl" draw drawSpeed="slow" drawStagger={80} />
          ))}
        </DemoRow>
      </div>
    </Section>
  );
}

// ---- Text Pairing Demo ----
function TextPairingDemo() {
  const pairs = [
    { size: 'sm', gap: 'var(--sp-1)' },
    { size: 'base', gap: 'var(--sp-2)' },
    { size: 'lg', gap: 'var(--sp-2)' },
    { size: 'xl', gap: 'var(--sp-2)' },
  ] as const;

  return (
    <Section title="Icon + Text Pairing" desc="Icons vertically center with text at the same scale step.">
      {pairs.map(({ size, gap }) => (
        <DemoRow key={size} label={size}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap, fontSize: `var(--text-${size}-size)`, lineHeight: `var(--text-${size}-line-height)` }}>
            <Icon icon={arrowLeft} size={size} />
            <span>Back</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap, fontSize: `var(--text-${size}-size)`, lineHeight: `var(--text-${size}-line-height)` }}>
            <Icon icon={search} size={size} />
            <span>Search</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap, fontSize: `var(--text-${size}-size)`, lineHeight: `var(--text-${size}-line-height)` }}>
            <span>Next</span>
            <Icon icon={arrowRight} size={size} />
          </span>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Icon component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>icon</code></td><td>string</td><td>—</td><td>SVG inner content (import from icons/)</td></tr>
          <tr><td><code>size</code></td><td>xs | sm | base | lg | xl | 2xl</td><td>base</td><td>Maps to type scale font size</td></tr>
          <tr><td><code>color</code></td><td>primary | secondary | tertiary | disabled | currentColor</td><td>currentColor</td><td>Semantic color or inherited</td></tr>
          <tr><td><code>weight</code></td><td>thin | light | regular | medium | bold</td><td>regular</td><td>Stroke width (1 / 1.5 / 2 / 2.5 / 3)</td></tr>
          <tr><td><code>draw</code></td><td>boolean</td><td>false</td><td>Enable draw-in animation</td></tr>
          <tr><td><code>drawSpeed</code></td><td>fast | normal | slow</td><td>normal</td><td>300ms / 500ms / 900ms</td></tr>
          <tr><td><code>drawStagger</code></td><td>number</td><td>40</td><td>Stagger between elements (ms)</td></tr>
          <tr><td><code>aria-label</code></td><td>string</td><td>—</td><td>Accessible label (sets role=img)</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function IconDemos() {
  return (
    <>
      <SizeDemo />
      <ColorDemo />
      <WeightDemo />
      <DrawInDemo />
      <TextPairingDemo />
      <PropsTable />
    </>
  );
}

export default IconDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Icon icon={star} size="lg" />;
}
