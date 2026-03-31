import React from 'react';

const typeScale = [
  { name: 'text-xs', size: '0.75rem', weight: 400, lh: 1.5 },
  { name: 'text-sm', size: '0.8125rem', weight: 400, lh: 1.5 },
  { name: 'text-base', size: '0.9375rem', weight: 400, lh: 1.5 },
  { name: 'text-lg', size: '1.125rem', weight: 500, lh: 1.4 },
  { name: 'text-xl', size: '1.25rem', weight: 600, lh: 1.3 },
  { name: 'text-2xl', size: '1.5rem', weight: 600, lh: 1.3 },
  { name: 'text-3xl', size: '1.875rem', weight: 700, lh: 1.2 },
  { name: 'text-4xl', size: '2.25rem', weight: 800, lh: 1.1 },
];

export default function TypographyPage() {
  return (
    <>
      <h1 className="page-title">Typography</h1>
      <p className="page-subtitle">Inter for sans, JetBrains Mono for monospace. 8-step type scale.</p>

      <div className="section">
        <h2 className="section__title">Type Scale</h2>
        {typeScale.map(t => (
          <div key={t.name} style={{
            display: 'flex', alignItems: 'baseline', gap: 'var(--sp-4)',
            padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--color-border-subtle)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', minWidth: '7rem' }}>
              {t.name}
            </span>
            <span style={{ fontSize: `var(--${t.name}-size)`, fontWeight: `var(--${t.name}-weight)`, lineHeight: `var(--${t.name}-line-height)` }}>
              The quick brown fox
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', marginLeft: 'auto' }}>
              {t.size}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
