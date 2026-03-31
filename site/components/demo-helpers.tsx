import React from 'react';

export function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="section">
      <h2 className="section__title">{title}</h2>
      <p className="section__desc">{desc}</p>
      {children}
    </div>
  );
}

export function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', minWidth: '7rem', flexShrink: 0 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flex: 1, flexWrap: 'wrap' }}>
        {children}
      </div>
    </div>
  );
}
