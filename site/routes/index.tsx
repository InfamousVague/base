import React, { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { navCategories } from '../data/nav-items';
import { initHero } from '../components/hero-animation';
import { ComponentPreview } from '../components/ComponentPreview';

export default function OverviewPage() {
  useEffect(() => {
    const frame = requestAnimationFrame(() => initHero());
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <h1 className="page-title">Base</h1>
      <p className="page-subtitle">A universal design toolkit. Monochrome. Utilitarian. Minimal.</p>

      <div className="section">
        <h2 className="section__title">Philosophy</h2>
        <p className="section__desc">
          Base is a constraint-driven design system. It enforces visual uniformity through
          very few spacing values, a monochrome color ramp, and status intents shared across
          all primitives. Every codebase built on Base looks cohesive because there are so few
          choices to make.
        </p>
      </div>

      <div className="section">
        <h2 className="section__title">Constraints</h2>
        <table className="token-table">
          <tbody>
            <tr>
              <td><strong>8 spacing values</strong></td>
              <td style={{ color: 'var(--color-text-secondary)' }}>4, 8, 12, 16, 24, 32, 48, 64. No arbitrary values. Every margin and padding uses one of these tokens.</td>
            </tr>
            <tr>
              <td><strong>12-step monochrome</strong></td>
              <td style={{ color: 'var(--color-text-secondary)' }}>White to near-black in 12 steps. Semantic tokens swap for dark mode. No chromatic hues.</td>
            </tr>
            <tr>
              <td><strong>5 status intents</strong></td>
              <td style={{ color: 'var(--color-text-secondary)' }}>Error, warning, success, info, neutral. Each with solid, subtle, and outline appearances.</td>
            </tr>
            <tr>
              <td><strong>Platform agnostic</strong></td>
              <td style={{ color: 'var(--color-text-secondary)' }}>Tokens compile to CSS custom properties and React Native StyleSheet values.</td>
            </tr>
            <tr>
              <td><strong>Rem-based</strong></td>
              <td style={{ color: 'var(--color-text-secondary)' }}>All values in rem. Scales with user font size preferences.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2 className="section__title">Components</h2>
        <p className="section__desc">
          {navCategories.reduce((sum, cat) => sum + cat.items.length, 0)} components organized into {navCategories.length} categories.
        </p>
        {navCategories.filter(c => c.name !== 'Foundations').map(cat => (
          <div key={cat.name} style={{ marginBottom: 'var(--sp-6)' }}>
            <h3 style={{
              fontSize: 'var(--text-base-size)', fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--sp-3)', color: 'var(--color-text-secondary)',
            }}>{cat.name}</h3>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--sp-3)',
            }}>
              {cat.items.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="overview-card"
                >
                  <ComponentPreview slug={item.slug} />
                  <span className="overview-card__label">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
