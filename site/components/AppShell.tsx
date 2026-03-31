import React, { useState, useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';

export function AppShell() {
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem('base-sidebar-collapsed') === 'true');

  useEffect(() => {
    localStorage.setItem('base-sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  return (
    <div className="app-shell">
      <TopNav />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className="content-area site-main" style={{ marginLeft: collapsed ? 60 : 220 }}>
        <Outlet />
      </main>
    </div>
  );
}
