import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { navCategories } from '../data/nav-items';
import { NavSidebar } from '@primitives/nav-sidebar/NavSidebar';
import type { NavSidebarItem } from '@primitives/nav-sidebar/NavSidebar';

import '@primitives/nav-sidebar/nav-sidebar.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const STORAGE_KEY = 'base-sidebar-open-cats';

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [filter, setFilter] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Persist open categories
  const [openCategories, setOpenCategories] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return new Set(JSON.parse(stored));
    } catch { /* ignore */ }
    return new Set(navCategories.map(c => c.name));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...openCategories]));
  }, [openCategories]);

  const handleCategoryToggle = useCallback((name: string, open: boolean) => {
    setOpenCategories(prev => {
      const next = new Set(prev);
      if (open) next.add(name);
      else next.delete(name);
      return next;
    });
  }, []);

  // Filter categories by search query
  const q = filter.toLowerCase().trim();
  const filteredCategories = useMemo(() => {
    if (!q) return navCategories;
    return navCategories
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.label.toLowerCase().includes(q)),
      }))
      .filter(cat => cat.items.length > 0);
  }, [q]);

  // When filtering, force all matching categories open
  const effectiveOpen = useMemo(() => {
    if (q) return new Set(filteredCategories.map(c => c.name));
    return openCategories;
  }, [q, filteredCategories, openCategories]);

  // Keyboard shortcut: "/" focuses search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const renderItem = useCallback((item: NavSidebarItem, isActive: boolean) => (
    <Link
      to={item.path}
      className={`nav-sidebar__item${isActive ? ' nav-sidebar__item--active' : ''}`}
      title={collapsed ? item.label : undefined}
    >
      <span className="nav-sidebar__item-label">
        {collapsed ? item.label.slice(0, 2) : item.label}
      </span>
    </Link>
  ), [collapsed]);

  return (
    <NavSidebar
      className="sidebar"
      categories={filteredCategories}
      activeItem={currentPath}
      collapsed={collapsed}
      openCategories={effectiveOpen}
      onCategoryToggle={handleCategoryToggle}
      renderItem={renderItem}
      header={
        <div className="sidebar__search">
          <svg className="sidebar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={searchRef}
            className="sidebar__search-input"
            type="text"
            placeholder="Filter..."
            autoComplete="off"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          {!filter && <kbd className="sidebar__search-kbd">/</kbd>}
        </div>
      }
    />
  );
}
