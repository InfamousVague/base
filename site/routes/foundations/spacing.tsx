import React from 'react';

const spacingTokens = [
  { name: 'sp-1', value: '0.25rem', px: '4px' },
  { name: 'sp-2', value: '0.5rem', px: '8px' },
  { name: 'sp-3', value: '0.75rem', px: '12px' },
  { name: 'sp-4', value: '1rem', px: '16px' },
  { name: 'sp-6', value: '1.5rem', px: '24px' },
  { name: 'sp-8', value: '2rem', px: '32px' },
  { name: 'sp-12', value: '3rem', px: '48px' },
  { name: 'sp-16', value: '4rem', px: '64px' },
];

export default function SpacingPage() {
  return (
    <>
      <h1 className="page-title">Spacing</h1>
      <p className="page-subtitle">8 values. No arbitrary spacing. Every margin and padding uses one of these tokens.</p>

      <div className="section">
        <h2 className="section__title">Scale</h2>
        <table className="token-table">
          <thead><tr><th>Token</th><th>Value</th><th>Pixels</th><th>Preview</th></tr></thead>
          <tbody>
            {spacingTokens.map(t => (
              <tr key={t.name}>
                <td><code>--{t.name}</code></td>
                <td>{t.value}</td>
                <td>{t.px}</td>
                <td>
                  <div style={{
                    width: `var(--${t.name})`, height: 'var(--sp-4)',
                    background: 'var(--color-text-tertiary)', borderRadius: 'var(--radius-sm)',
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
