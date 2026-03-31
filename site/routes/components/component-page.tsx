import React, { Suspense, lazy, useMemo, useState, useEffect } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { allNavItems } from '../../data/nav-items';
import { CodeTabs } from '../../components/CodeTabs';
import { Blueprint } from '../../components/blueprint';
import { initHero } from '../../components/hero-animation';

// Dynamically import all demo modules from pages/
const demoModules = import.meta.glob('../../pages/*-demos.tsx') as Record<string, () => Promise<{ default: React.ComponentType }>>;

// Also grab raw source strings for code tabs
const demoSources = import.meta.glob('../../pages/*-demos.tsx', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

// Blueprint targets — optional named export from each demo page
const blueprintModules = import.meta.glob('../../pages/*-demos.tsx', { import: 'BlueprintTarget' }) as Record<string, () => Promise<React.ComponentType | undefined>>;

// Build lookup maps: slug -> dynamic import / source / blueprint
const demoMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {};
const sourceMap: Record<string, () => Promise<string>> = {};
const blueprintMap: Record<string, () => Promise<React.ComponentType | undefined>> = {};

for (const [path, importer] of Object.entries(demoModules)) {
  const match = path.match(/\/([^/]+)-demos\.tsx$/);
  if (match) {
    demoMap[match[1]] = importer;
  }
}

for (const [path, importer] of Object.entries(demoSources)) {
  const match = path.match(/\/([^/]+)-demos\.tsx$/);
  if (match) {
    sourceMap[match[1]] = importer;
  }
}

for (const [path, importer] of Object.entries(blueprintModules)) {
  const match = path.match(/\/([^/]+)-demos\.tsx$/);
  if (match) {
    blueprintMap[match[1]] = importer;
  }
}

function BlueprintSection({ slug }: { slug: string }) {
  const [Target, setTarget] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    setTarget(null); // Reset when slug changes
    const loader = blueprintMap[slug];
    if (loader) {
      loader().then(comp => {
        if (comp) setTarget(() => comp);
      });
    }
  }, [slug]);

  if (!Target) return null;

  return (
    <Blueprint>
      <Target />
    </Blueprint>
  );
}

function DemoWithCode({ slug, DemoComponent }: { slug: string; DemoComponent: React.ComponentType }) {
  const [source, setSource] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loader = sourceMap[slug];
    if (loader) {
      loader().then(src => setSource(src));
    }
  }, [slug]);

  return (
    <CodeTabs
      preview={<DemoComponent />}
      code={source}
    />
  );
}

export default function ComponentPage() {
  const { slug } = useParams({ from: '/components/$slug' });

  const navItem = allNavItems.find(i => i.slug === slug);
  const title = navItem?.label ?? slug;

  // Trigger decrypting text animation on route change
  useEffect(() => {
    // Run on next frame so the DOM has the new title text
    const frame = requestAnimationFrame(() => initHero());
    return () => cancelAnimationFrame(frame);
  }, [slug]);

  const DemoComponent = useMemo(() => {
    const importer = demoMap[slug];
    if (!importer) return null;
    return lazy(importer);
  }, [slug]);

  if (!DemoComponent) {
    return (
      <>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">No demo available for this component yet.</p>
        <Link to="/" style={{ color: 'var(--color-text-secondary)' }}>&larr; Back to overview</Link>
      </>
    );
  }

  return (
    <>
      <h1 className="page-title">{title}</h1>
      {/* Blueprint section — renders above demos if the page exports a BlueprintTarget */}
      <BlueprintSection slug={slug} />
      <Suspense fallback={<div style={{ padding: 'var(--sp-8)', color: 'var(--color-text-tertiary)' }}>Loading...</div>}>
        <DemoWithCode slug={slug} DemoComponent={DemoComponent} />
      </Suspense>
    </>
  );
}
