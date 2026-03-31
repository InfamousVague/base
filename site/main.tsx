import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from './components/ThemeProvider';
import { router } from './router';

import './styles/base.css';
import './styles/topnav.css';
import './styles/sidebar.css';
import './styles/code-tabs.css';
import './styles/transitions.css';
import './styles/blueprint.css';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
