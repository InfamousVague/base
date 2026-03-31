import React from 'react';

export default function ColorsPage() {
  const graySteps = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <h1 className="page-title">Colors</h1>
      <p className="page-subtitle">12-step monochrome ramp with semantic tokens. Chromatic color is reserved for status intents only.</p>

      <div className="section">
        <h2 className="section__title">Gray Ramp</h2>
        <p className="section__desc">12 steps from near-black to white. Every surface, text, and border color maps to this ramp.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--sp-2)', marginBottom: 'var(--sp-6)' }}>
          {graySteps.map(n => (
            <div key={n} style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%', aspectRatio: '1', borderRadius: 'var(--radius-md)',
                background: `var(--gray-${n})`, border: '1px solid var(--color-border-subtle)',
              }} />
              <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', marginTop: 'var(--sp-1)', fontFamily: 'var(--font-mono)' }}>
                {n}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section__title">Status Colors</h2>
        <p className="section__desc">5 intents. Each has subtle (bg), base (fill/icon), bold (text).</p>
        <table className="token-table">
          <thead><tr><th>Intent</th><th>Subtle (bg)</th><th>Base (fill)</th><th>Bold (text)</th></tr></thead>
          <tbody>
            <tr><td><strong>Error</strong></td><td><code>--color-error-subtle</code></td><td><code>--color-error</code></td><td><code>--color-error-bold</code></td></tr>
            <tr><td><strong>Warning</strong></td><td><code>--color-warning-subtle</code></td><td><code>--color-warning</code></td><td><code>--color-warning-bold</code></td></tr>
            <tr><td><strong>Success</strong></td><td><code>--color-success-subtle</code></td><td><code>--color-success</code></td><td><code>--color-success-bold</code></td></tr>
            <tr><td><strong>Info</strong></td><td><code>--color-info-subtle</code></td><td><code>--color-info</code></td><td><code>--color-info-bold</code></td></tr>
            <tr><td><strong>Neutral</strong></td><td><code>--color-neutral-subtle</code></td><td><code>--gray-7</code></td><td><code>--gray-9</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section__title">Color Rules</h2>
        <table className="token-table">
          <tbody>
            <tr><td><strong>Gray is default</strong></td><td style={{ color: 'var(--color-text-secondary)' }}>If you're reaching for a color, stop. Can this be gray? Usually yes.</td></tr>
            <tr><td><strong>One accent only</strong></td><td style={{ color: 'var(--color-text-secondary)' }}>Primary buttons, focus rings, active states, links. Nothing else.</td></tr>
            <tr><td><strong>Status = chromatic</strong></td><td style={{ color: 'var(--color-text-secondary)' }}>Error, warning, success, info. The only time color carries meaning.</td></tr>
            <tr><td><strong>Dark mode = elevation</strong></td><td style={{ color: 'var(--color-text-secondary)' }}>Higher surfaces are lighter. Use gray-1 → gray-4 for layers.</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
