import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';

// CSS
import '@primitives/icon/icon.css';
import '@primitives/skeleton/skeleton.css';
import '@primitives/animation/keyframes.css';

// Primitives
import { Icon } from '@primitives/icon/Icon';
import { HighlightMatch } from '@primitives/animation/HighlightMatch';
import { Skeleton } from '@primitives/skeleton/Skeleton';
import { Animate } from '@primitives/animation/Animate';
import { AnimatePresence } from '@primitives/animation/AnimatePresence';

// Lightweight name list only — no SVG content in the bundle
import { iconNames } from '@primitives/icon/icons/_names-list';
// Dynamic loader — fetches individual SVGs on demand
import { loadIcon } from '@primitives/icon/icons/_loader';

// ---- Types ----
interface MatchResult {
  name: string;
  indices: number[];
  score: number;
}

// ---- SVG cache ----
const svgCache = new Map<string, string>();

function useIconSvg(name: string): string | null {
  const [svg, setSvg] = useState<string | null>(svgCache.get(name) ?? null);

  useEffect(() => {
    if (svgCache.has(name)) {
      setSvg(svgCache.get(name)!);
      return;
    }
    let cancelled = false;
    loadIcon(name).then(content => {
      if (!cancelled && content) {
        svgCache.set(name, content);
        setSvg(content);
      }
    });
    return () => { cancelled = true; };
  }, [name]);

  return svg;
}

// Batch preloader — loads icons for visible set
function usePreloadIcons(names: string[]) {
  useEffect(() => {
    const toLoad = names.filter(n => !svgCache.has(n));
    // Load in small batches to avoid overwhelming
    const BATCH = 20;
    let i = 0;
    function loadBatch() {
      const batch = toLoad.slice(i, i + BATCH);
      if (batch.length === 0) return;
      batch.forEach(name => {
        loadIcon(name).then(content => {
          if (content) svgCache.set(name, content);
        });
      });
      i += BATCH;
      if (i < toLoad.length) requestAnimationFrame(loadBatch);
    }
    loadBatch();
  }, [names]);
}

// ---- Fuzzy match ----
function fuzzyMatch(query: string, target: string): { indices: number[]; score: number } | null {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  const indices: number[] = [];
  let qi = 0;
  let lastIdx = -1;
  let gapPenalty = 0;

  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) {
      indices.push(i);
      if (lastIdx >= 0 && i - lastIdx > 1) gapPenalty += (i - lastIdx - 1);
      lastIdx = i;
      qi++;
    }
  }

  if (qi !== q.length) return null;

  const startBonus = indices[0] === 0 ? -10 : 0;
  const score = gapPenalty + indices[0] * 2 + target.length * 0.5 + startBonus;
  return { indices, score };
}

// ---- Constants ----
const PAGE_SIZE = 120;

// ---- Copy toast ----
function CopyToast({ name, show }: { name: string; show: boolean }) {
  return (
    <AnimatePresence show={show} enter="slide-up" exit="fade-out" enterDuration="normal" exitDuration="fast">
      <div style={{
        position: 'fixed',
        bottom: 'var(--sp-6)',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 'var(--sp-2) var(--sp-4)',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--shape-pill)',
        fontSize: 'var(--text-sm-size)',
        fontFamily: 'var(--font-mono)',
        boxShadow: 'var(--shadow-lg, 0 4px 24px rgba(0,0,0,0.12))',
        zIndex: 100,
        whiteSpace: 'nowrap',
      }}>
        Copied <strong>{name}</strong>
      </div>
    </AnimatePresence>
  );
}

// ---- Icon detail panel ----
function IconDetail({ name, onClose }: { name: string; onClose: () => void }) {
  const svg = useIconSvg(name);
  const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl'] as const;
  const weights = ['thin', 'light', 'regular', 'medium', 'bold'] as const;
  const [copiedWhat, setCopiedWhat] = useState('');

  const copy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedWhat(label);
    setTimeout(() => setCopiedWhat(''), 1500);
  }, []);

  const camelName = name.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  const importStr = `import { ${camelName} } from '@primitives/icon/icons/${name}';`;

  if (!svg) return null;

  return (
    <Animate animation="scale-in" duration="normal">
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: 'var(--sp-6)',
      }} onClick={onClose}>
        <div style={{
          background: 'var(--color-bg-primary)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--shape-default)',
          padding: 'var(--sp-6)',
          maxWidth: '32rem',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          color: 'var(--color-text-primary)',
        }} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-6)' }}>
            <h3 style={{ fontSize: 'var(--text-lg-size)', fontWeight: 'var(--weight-semibold)', margin: 0 }}>{name}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', fontSize: 'var(--text-lg-size)', padding: 'var(--sp-1)' }}>
              ✕
            </button>
          </div>

          {/* Large preview */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--sp-8)',
            background: 'var(--color-bg-secondary)',
            borderRadius: 'var(--shape-default)',
            marginBottom: 'var(--sp-6)',
          }}>
            <Icon icon={svg} size="2xl" weight="regular" style={{ width: '3.5rem', height: '3.5rem' }} />
          </div>

          {/* Sizes row */}
          <div style={{ marginBottom: 'var(--sp-4)' }}>
            <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 'var(--sp-2)' }}>Sizes</div>
            <div style={{ display: 'flex', alignItems: 'end', gap: 'var(--sp-4)' }}>
              {sizes.map(s => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-1)' }}>
                  <Icon icon={svg} size={s} />
                  <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weights row */}
          <div style={{ marginBottom: 'var(--sp-6)' }}>
            <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 'var(--sp-2)' }}>Weights</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
              {weights.map(w => (
                <div key={w} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--sp-1)' }}>
                  <Icon icon={svg} size="xl" weight={w} />
                  <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>{w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Import snippet */}
          <div style={{ marginBottom: 'var(--sp-4)' }}>
            <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)', marginBottom: 'var(--sp-2)' }}>Import</div>
            <button
              onClick={() => copy(importStr, 'import')}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: 'var(--sp-3)',
                background: 'var(--color-bg-inset)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--shape-default)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs-size)',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                wordBreak: 'break-all',
              }}
            >
              {copiedWhat === 'import' ? '✓ Copied!' : importStr}
            </button>
          </div>

          {/* Copy name button */}
          <button
            onClick={() => copy(name, 'name')}
            style={{
              width: '100%',
              padding: 'var(--sp-2) var(--sp-4)',
              background: 'var(--color-accent)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--shape-default)',
              fontSize: 'var(--text-sm-size)',
              fontFamily: 'var(--font-sans)',
              fontWeight: 'var(--weight-medium)' as string,
              cursor: 'pointer',
            }}
          >
            {copiedWhat === 'name' ? '✓ Copied!' : `Copy "${name}"`}
          </button>
        </div>
      </div>
    </Animate>
  );
}

// ---- Icon Grid Card (lazy loads its own SVG) ----
function IconCard({ name, query, indices, onClick }: { name: string; query: string; indices: number[]; onClick: () => void }) {
  const svg = useIconSvg(name);

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--sp-2)',
        padding: 'var(--sp-4) var(--sp-2)',
        background: 'var(--color-bg-primary)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--shape-default)',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        transition: 'border-color var(--transition-fast), background var(--transition-fast)',
        textAlign: 'center',
        minHeight: '5.5rem',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)';
        e.currentTarget.style.background = 'var(--color-bg-secondary)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
        e.currentTarget.style.background = 'var(--color-bg-primary)';
      }}
    >
      {svg ? (
        <Icon icon={svg} size="lg" />
      ) : (
        <Skeleton size="icon" width={18} height={18} />
      )}
      <span style={{
        fontSize: 'var(--text-xs-size)',
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-tertiary)',
        lineHeight: 1.3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
      }}>
        {query && indices.length > 0 ? (
          <HighlightMatch text={name} indices={indices} variant="accent" />
        ) : (
          name
        )}
      </span>
    </button>
  );
}

// ---- Skeleton Grid ----
function SkeletonGrid({ count = 60 }: { count?: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 1fr))',
      gap: 'var(--sp-3)',
    }}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--sp-2)',
          padding: 'var(--sp-4) var(--sp-2)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--shape-default)',
          minHeight: '5.5rem',
        }}>
          <Skeleton size="icon" width={24} height={24} />
          <Skeleton size="text-xs" width="70%" />
        </div>
      ))}
    </div>
  );
}

// ---- Search icon SVG (inlined to avoid loading the whole registry for one icon) ----
const SEARCH_ICON = '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>';

// ---- Main App ----
function IconSearchApp() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  // Search results with fuzzy matching
  const results = useMemo<MatchResult[]>(() => {
    const q = query.trim();
    if (!q) {
      return iconNames.map(name => ({ name, indices: [], score: 0 }));
    }

    const matches: MatchResult[] = [];
    for (const name of iconNames) {
      const m = fuzzyMatch(q, name);
      if (m) matches.push({ name, indices: m.indices, score: m.score });
    }
    matches.sort((a, b) => a.score - b.score);
    return matches;
  }, [query]);

  // Visible slice
  const visible = useMemo(() => results.slice(0, visibleCount), [results, visibleCount]);
  const hasMore = visibleCount < results.length;

  // Preload visible icons in batches
  const visibleNames = useMemo(() => visible.map(r => r.name), [visible]);
  usePreloadIcons(visibleNames);

  // Reset pagination on search change
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [query]);

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < results.length) {
          setVisibleCount(v => Math.min(v + PAGE_SIZE, results.length));
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [visibleCount, results.length]);

  // Keyboard: Escape to clear/close, / to focus
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (selected) { setSelected(null); return; }
        if (query) { setQuery(''); return; }
      }
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [query, selected]);

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedToast(name);
    setTimeout(() => setCopiedToast(null), 1500);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
      {/* Header */}
      <div>
        <h1 className="page-title">Icon Search</h1>
        <p className="page-subtitle">
          Browse and search {iconNames.length.toLocaleString()} icons. Click to inspect, copy the import path, or preview sizes and weights.
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--color-bg-primary)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div style={{ position: 'relative' }}>
          <Icon
            icon={SEARCH_ICON}
            size="sm"
            color="tertiary"
            style={{ position: 'absolute', left: 'var(--sp-3)', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search icons... (press / to focus)"
            style={{
              width: '100%',
              padding: 'var(--sp-3) var(--sp-3) var(--sp-3) var(--sp-8)',
              borderRadius: 'var(--shape-default)',
              border: '1px solid var(--color-border-default)',
              background: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-base-size)',
              outline: 'none',
              transition: 'border-color var(--transition-fast)',
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border-default)'}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); inputRef.current?.focus(); }}
              style={{
                position: 'absolute',
                right: 'var(--sp-3)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-tertiary)',
                fontSize: 'var(--text-sm-size)',
                padding: 'var(--sp-1)',
              }}
            >
              ✕
            </button>
          )}
        </div>
        <div style={{
          marginTop: 'var(--sp-2)',
          fontSize: 'var(--text-xs-size)',
          color: 'var(--color-text-tertiary)',
          fontFamily: 'var(--font-mono)',
        }}>
          {query
            ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
            : `${iconNames.length.toLocaleString()} icons`
          }
          {hasMore && ` · showing ${visibleCount}`}
        </div>
      </div>

      {/* Grid */}
      {results.length === 0 ? (
        <Animate animation="fade-in">
          <div style={{
            textAlign: 'center',
            padding: 'var(--sp-12) var(--sp-6)',
            color: 'var(--color-text-tertiary)',
          }}>
            <div style={{ fontSize: 'var(--text-lg-size)', fontWeight: 'var(--weight-medium)' }}>No icons found</div>
            <div style={{ fontSize: 'var(--text-sm-size)', marginTop: 'var(--sp-2)' }}>Try a different search term</div>
          </div>
        </Animate>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 1fr))',
            gap: 'var(--sp-3)',
          }}>
            {visible.map(({ name, indices }) => (
              <IconCard
                key={name}
                name={name}
                query={query}
                indices={indices}
                onClick={() => setSelected(name)}
              />
            ))}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={loaderRef} style={{ padding: 'var(--sp-4)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--sp-2)' }}>
                <Skeleton shape="circle" width={8} height={8} />
                <Skeleton shape="circle" width={8} height={8} />
                <Skeleton shape="circle" width={8} height={8} />
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail panel */}
      {selected && (
        <IconDetail name={selected} onClose={() => setSelected(null)} />
      )}

      {/* Copy toast */}
      <CopyToast name={copiedToast || ''} show={!!copiedToast} />
    </div>
  );
}

export default IconSearchApp;
