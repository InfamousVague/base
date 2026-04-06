var e=`import React, { useState, useEffect } from 'react';

// Import skeleton CSS
import '@primitives/skeleton/skeleton.css';

// Import components
import { Skeleton } from '@primitives/skeleton/Skeleton';
import { SkeletonReveal } from '@primitives/skeleton/SkeletonReveal';
import { SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonListItem } from '@primitives/skeleton/compositions';

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

// ---- Crossfade Demo ----
function CrossfadeDemo() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      const t = setTimeout(() => setLoaded(false), 3000);
      return () => clearTimeout(t);
    }
  }, [loaded]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <button
        onClick={() => setLoaded(!loaded)}
        style={{
          alignSelf: 'flex-start',
          padding: 'var(--sp-2) var(--sp-4)',
          borderRadius: 'var(--shape-default)',
          border: '1px solid var(--color-border-default)',
          background: 'var(--color-bg-elevated)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm-size)',
          cursor: 'pointer',
        }}
      >
        {loaded ? 'Reset' : 'Simulate load'}
      </button>
      <SkeletonReveal
        loaded={loaded}
        skeleton={
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <SkeletonAvatar />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <Skeleton size="text-sm" width="10rem" />
              <Skeleton size="text-xs" width="6rem" />
            </div>
          </div>
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 'var(--text-sm-size)', fontWeight: 600 }}>JD</div>
          <div>
            <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--weight-medium)' }}>Jane Doe</div>
            <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>jane@example.com</div>
          </div>
        </div>
      </SkeletonReveal>
    </div>
  );
}

// ---- Main App ----
function SkeletonDemos() {
  return (
    <>
      {/* ---- Shapes ---- */}
      <Section title="Shapes" desc="Skeletons use shape tokens directly. Each shape matches the component it replaces.">
        <DemoRow label="square">
          <Skeleton size="md" shape="square" />
        </DemoRow>
        <DemoRow label="default">
          <Skeleton size="md" shape="default" />
        </DemoRow>
        <DemoRow label="pill">
          <Skeleton size="md" shape="pill" />
        </DemoRow>
        <DemoRow label="circle">
          <Skeleton width={40} height={40} shape="circle" />
        </DemoRow>
      </Section>

      {/* ---- Text Sizes ---- */}
      <Section title="Text Sizes" desc="Match any type scale token exactly. Height includes line-height, width uses sensible defaults.">
        <DemoRow label="text-xs"><Skeleton size="text-xs" /></DemoRow>
        <DemoRow label="text-sm"><Skeleton size="text-sm" /></DemoRow>
        <DemoRow label="text-base"><Skeleton size="text-base" /></DemoRow>
        <DemoRow label="text-lg"><Skeleton size="text-lg" /></DemoRow>
        <DemoRow label="text-xl"><Skeleton size="text-xl" /></DemoRow>
        <DemoRow label="text-2xl"><Skeleton size="text-2xl" /></DemoRow>
        <DemoRow label="text-3xl"><Skeleton size="text-3xl" /></DemoRow>
        <DemoRow label="text-4xl"><Skeleton size="text-4xl" /></DemoRow>
      </Section>

      {/* ---- Generic Sizes ---- */}
      <Section title="Generic Sizes" desc="Preset heights for non-text components: inputs, chips, cards.">
        <DemoRow label="xs"><Skeleton size="xs" /></DemoRow>
        <DemoRow label="sm"><Skeleton size="sm" /></DemoRow>
        <DemoRow label="md"><Skeleton size="md" /></DemoRow>
        <DemoRow label="lg"><Skeleton size="lg" /></DemoRow>
        <DemoRow label="xl"><Skeleton size="xl" /></DemoRow>
      </Section>

      {/* ---- Component Sizes ---- */}
      <Section title="Component Sizes" desc="Match specific components: buttons, avatars, icons.">
        <DemoRow label="button-sm"><Skeleton size="button-sm" /></DemoRow>
        <DemoRow label="button"><Skeleton size="button" /></DemoRow>
        <DemoRow label="button-lg"><Skeleton size="button-lg" /></DemoRow>
        <DemoRow label="avatar-sm"><Skeleton size="avatar-sm" /></DemoRow>
        <DemoRow label="avatar"><Skeleton size="avatar" /></DemoRow>
        <DemoRow label="avatar-lg"><Skeleton size="avatar-lg" /></DemoRow>
        <DemoRow label="icon"><Skeleton size="icon" /></DemoRow>
      </Section>

      {/* ---- Compositions ---- */}
      <Section title="Compositions" desc="Pre-built skeleton patterns for common layouts.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)', marginBottom: 'var(--sp-6)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--sp-3)' }}>Card</div>
            <SkeletonCard lines={3} />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--sp-3)' }}>Card with avatar</div>
            <SkeletonCard lines={2} avatar />
          </div>
        </div>
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <div style={{ fontSize: 'var(--text-sm-size)', fontWeight: 'var(--weight-semibold)', marginBottom: 'var(--sp-3)' }}>List items</div>
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonListItem trailing />
        </div>
      </Section>

      {/* ---- Crossfade ---- */}
      <Section title="Crossfade Reveal" desc="SkeletonReveal wraps skeleton + content and crossfades between them when loaded flips to true.">
        <CrossfadeDemo />
      </Section>

      {/* ---- RTL Demo ---- */}
      <Section title="RTL Support" desc="Shimmer direction follows the document's dir attribute automatically.">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--sp-2)', fontFamily: 'var(--font-mono)' }}>dir="ltr"</div>
            <div dir="ltr" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <Skeleton size="text-base" full />
              <Skeleton size="text-sm" width="75%" />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--sp-2)', fontFamily: 'var(--font-mono)' }}>dir="rtl"</div>
            <div dir="rtl" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              <Skeleton size="text-base" full />
              <Skeleton size="text-sm" width="75%" />
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Props ---- */}
      <Section title="Props" desc="Base Skeleton component API.">
        <table className="token-table">
          <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>size</code></td><td>text-xs…text-4xl | xs…xl | button | avatar | icon</td><td>—</td><td>Size preset with sensible default width</td></tr>
            <tr><td><code>shape</code></td><td>square | default | pill | circle</td><td>default</td><td>Border radius via shape tokens</td></tr>
            <tr><td><code>width</code></td><td>string | number</td><td>per size</td><td>Override width</td></tr>
            <tr><td><code>height</code></td><td>string | number</td><td>per size</td><td>Override height</td></tr>
            <tr><td><code>full</code></td><td>boolean</td><td>false</td><td>Stretch to 100% parent width</td></tr>
          </tbody>
        </table>
      </Section>

      {/* ---- Tokens ---- */}
      <Section title="Token Reference" desc="Skeleton-specific color tokens that adapt to light/dark mode.">
        <table className="token-table">
          <thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Usage</th></tr></thead>
          <tbody>
            <tr><td><code>--color-skeleton</code></td><td>gray-11</td><td>gray-4</td><td>Base fill color</td></tr>
            <tr><td><code>--color-skeleton-shimmer</code></td><td>#FFFFFF</td><td>gray-5</td><td>Shimmer highlight gradient</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}

export default SkeletonDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Skeleton style={{ width: 200, height: 20 }} />;
}
`;export{e as default};