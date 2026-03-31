import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/nav-sidebar/nav-sidebar.css';

import { NavSidebar } from '@primitives/nav-sidebar/NavSidebar';
import type { NavSidebarCategory } from '@primitives/nav-sidebar/NavSidebar';

// ---- Sample data ----
const sampleCategories: NavSidebarCategory[] = [
  {
    name: 'Getting Started',
    items: [
      { slug: 'overview', label: 'Overview', path: '#overview' },
      { slug: 'installation', label: 'Installation', path: '#installation' },
      { slug: 'theming', label: 'Theming', path: '#theming' },
    ],
  },
  {
    name: 'Components',
    items: [
      { slug: 'button', label: 'Button', path: '#button' },
      { slug: 'input', label: 'Input', path: '#input' },
      { slug: 'select', label: 'Select', path: '#select' },
      { slug: 'checkbox', label: 'Checkbox', path: '#checkbox' },
      { slug: 'toggle', label: 'Toggle', path: '#toggle' },
    ],
  },
  {
    name: 'Layout',
    items: [
      { slug: 'stack', label: 'Stack', path: '#stack' },
      { slug: 'grid', label: 'Grid', path: '#grid' },
      { slug: 'container', label: 'Container', path: '#container' },
    ],
  },
  {
    name: 'Feedback',
    items: [
      { slug: 'toast', label: 'Toast', path: '#toast' },
      { slug: 'dialog', label: 'Dialog', path: '#dialog' },
      { slug: 'alert', label: 'Alert', path: '#alert' },
    ],
  },
];

// ---- Default Demo ----
function DefaultDemo() {
  const [active, setActive] = useState('button');
  return (
    <Section title="Default" desc="All categories expanded by default with pill-style active indicator.">
      <DemoRow label="expanded">
        <div style={{ height: 400, border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <NavSidebar
            categories={sampleCategories}
            activeItem={active}
            renderItem={(item, isActive) => (
              <button
                type="button"
                className={`nav-sidebar__item${isActive ? ' nav-sidebar__item--active' : ''}`}
                onClick={() => setActive(item.slug)}
                style={{ width: '100%', textAlign: 'left', border: 0, cursor: 'pointer', font: 'inherit' }}
              >
                <span className="nav-sidebar__item-label">{item.label}</span>
              </button>
            )}
          />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Collapsed Demo ----
function CollapsedDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Section title="Collapsed Mode" desc="Toggle between expanded and icon-rail mode.">
      <DemoRow label={collapsed ? 'collapsed' : 'expanded'}>
        <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
          <div style={{ height: 360, border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <NavSidebar
              categories={sampleCategories}
              activeItem="button"
              collapsed={collapsed}
              footer={
                <button
                  type="button"
                  onClick={() => setCollapsed(c => !c)}
                  style={{
                    width: '100%',
                    padding: 'var(--sp-2)',
                    background: 'transparent',
                    border: '1px solid var(--color-border-default)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    color: 'var(--color-text-secondary)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm-size)',
                  }}
                >
                  {collapsed ? '→' : '← Collapse'}
                </button>
              }
            />
          </div>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Controlled Categories Demo ----
function ControlledDemo() {
  const [openCats, setOpenCats] = useState<Set<string>>(new Set(['Components']));
  return (
    <Section title="Controlled Categories" desc="Only selected categories are expanded. Click headers to toggle.">
      <DemoRow label="controlled">
        <div style={{ height: 360, border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <NavSidebar
            categories={sampleCategories}
            activeItem="button"
            openCategories={openCats}
            onCategoryToggle={(name, open) => {
              setOpenCats(prev => {
                const next = new Set(prev);
                if (open) next.add(name);
                else next.delete(name);
                return next;
              });
            }}
          />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- With Header Demo ----
function HeaderDemo() {
  return (
    <Section title="With Header" desc="Search input rendered via the header slot.">
      <DemoRow label="header slot">
        <div style={{ height: 360, border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <NavSidebar
            categories={sampleCategories}
            activeItem="input"
            header={
              <input
                type="text"
                placeholder="Filter..."
                style={{
                  width: '100%',
                  padding: 'var(--sp-1) var(--sp-2)',
                  fontSize: 'var(--text-xs-size)',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-primary)',
                  background: 'var(--color-bg-inset)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none',
                }}
              />
            }
          />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="">
      <table className="token-table" style={{ width: '100%' }}>
        <thead>
          <tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr>
        </thead>
        <tbody>
          <tr><td>categories</td><td>NavSidebarCategory[]</td><td>—</td><td>Navigation categories with their items</td></tr>
          <tr><td>activeItem</td><td>string</td><td>—</td><td>Slug or path of the currently active item</td></tr>
          <tr><td>collapsed</td><td>boolean</td><td>false</td><td>Whether sidebar is in collapsed icon-rail mode</td></tr>
          <tr><td>header</td><td>ReactNode</td><td>—</td><td>Content above the nav (e.g., search input)</td></tr>
          <tr><td>footer</td><td>ReactNode</td><td>—</td><td>Content below the nav (e.g., collapse toggle)</td></tr>
          <tr><td>defaultOpenCategories</td><td>string[]</td><td>all</td><td>Category names open by default (uncontrolled)</td></tr>
          <tr><td>openCategories</td><td>Set&lt;string&gt;</td><td>—</td><td>Controlled open categories</td></tr>
          <tr><td>onCategoryToggle</td><td>(name, open) =&gt; void</td><td>—</td><td>Callback when a category is toggled</td></tr>
          <tr><td>renderItem</td><td>(item, active) =&gt; ReactNode</td><td>—</td><td>Custom item renderer for router integration</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
export default function NavSidebarDemos() {
  return (
    <>
      <DefaultDemo />
      <CollapsedDemo />
      <ControlledDemo />
      <HeaderDemo />
      <PropsTable />
    </>
  );
}
