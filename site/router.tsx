import { createRouter, createRoute, createRootRoute, lazyRouteComponent } from '@tanstack/react-router';
import { AppShell } from './components/AppShell';

// Root layout
const rootRoute = createRootRoute({
  component: AppShell,
});

// Index / Overview
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('./routes/index')),
});

// Foundation pages
const foundationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/foundations/$slug',
  component: lazyRouteComponent(() => import('./routes/foundations/foundation-page')),
});

// Component pages
const componentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/components/$slug',
  component: lazyRouteComponent(() => import('./routes/components/component-page')),
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  foundationRoute,
  componentRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Type registration
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
