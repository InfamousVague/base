import React, { Suspense, lazy, useMemo, useEffect } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { initHero } from '../../components/hero-animation';

// Foundation pages are unique layouts, import each one
const foundationModules: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'colors': () => import('./colors'),
  'spacing': () => import('./spacing'),
  'typography': () => import('./typography'),
  'icon-search': () => import('./icon-search'),
};

const titles: Record<string, string> = {
  'colors': 'Colors',
  'spacing': 'Spacing',
  'typography': 'Typography',
  'icon-search': 'Icon Search',
};

export default function FoundationPage() {
  const { slug } = useParams({ from: '/foundations/$slug' });

  useEffect(() => {
    const frame = requestAnimationFrame(() => initHero());
    return () => cancelAnimationFrame(frame);
  }, [slug]);

  const PageComponent = useMemo(() => {
    const importer = foundationModules[slug];
    if (!importer) return null;
    return lazy(importer);
  }, [slug]);

  if (!PageComponent) {
    return (
      <>
        <h1 className="page-title">{slug}</h1>
        <p className="page-subtitle">Foundation page not found.</p>
        <Link to="/" style={{ color: 'var(--color-text-secondary)' }}>&larr; Back to overview</Link>
      </>
    );
  }

  return (
    <Suspense fallback={<div style={{ padding: 'var(--sp-8)', color: 'var(--color-text-tertiary)' }}>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
}
