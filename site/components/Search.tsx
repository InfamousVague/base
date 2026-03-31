import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { allNavItems } from '../data/nav-items';

export function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim()
    ? allNavItems.filter(item => {
        const q = query.toLowerCase();
        return item.label.toLowerCase().includes(q) || item.slug.includes(q) || item.category.toLowerCase().includes(q);
      }).slice(0, 12)
    : [];

  const handleSelect = useCallback((path: string) => {
    navigate({ to: path });
    setQuery('');
    setOpen(false);
    inputRef.current?.blur();
  }, [navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setQuery('');
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIdx]) {
      e.preventDefault();
      handleSelect(results[activeIdx].path);
    }
  };

  return (
    <div className="search" style={{ position: 'relative', flex: '0 1 320px' }}>
      <div className="sidebar__search" style={{ marginBottom: 0 }}>
        <svg className="sidebar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          ref={inputRef}
          className="sidebar__search-input"
          type="text"
          placeholder="Search components..."
          autoComplete="off"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); setActiveIdx(0); }}
          onFocus={() => query && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
        />
        {!query && <kbd className="sidebar__search-kbd">/</kbd>}
      </div>
      {open && results.length > 0 && (
        <div className="search__dropdown" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', zIndex: 300,
          maxHeight: 320, overflowY: 'auto', padding: 'var(--sp-1)',
        }}>
          {results.map((item, i) => (
            <button
              key={item.path}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
                padding: 'var(--sp-1) var(--sp-2)', border: 'none', borderRadius: 'var(--radius-sm)',
                background: i === activeIdx ? 'var(--color-overlay)' : 'transparent',
                color: 'var(--color-text-primary)', cursor: 'pointer', fontSize: 'var(--text-sm-size)',
                fontFamily: 'var(--font-sans)', textAlign: 'left',
              }}
              onMouseDown={() => handleSelect(item.path)}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <span>{item.label}</span>
              <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>{item.category}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
