import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/breadcrumb/breadcrumb.css';

import { Breadcrumb } from '@primitives/breadcrumb/Breadcrumb';

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="Standard breadcrumb trail with default separator.">
      <DemoRow label="default">
        <Breadcrumb items={[
          { label: 'Home', href: '#' },
          { label: 'Products', href: '#' },
          { label: 'Item' },
        ]} />
      </DemoRow>
    </Section>
  );
}

// ---- Custom Separator Demo ----
function CustomSeparatorDemo() {
  return (
    <Section title="Custom Separator" desc="Using a custom separator character.">
      <DemoRow label="›">
        <Breadcrumb
          separator="›"
          items={[
            { label: 'Home', href: '#' },
            { label: 'Category', href: '#' },
            { label: 'Current Page' },
          ]}
        />
      </DemoRow>
    </Section>
  );
}

// ---- Skeleton Demo ----
function SkeletonDemo() {
  return (
    <Section title="Skeleton" desc="Loading placeholder state.">
      <DemoRow label="skeleton">
        <Breadcrumb skeleton items={[]} />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Breadcrumb component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>items</code></td><td>BreadcrumbItem[]</td><td>--</td><td>Breadcrumb items; last item is current page</td></tr>
          <tr><td><code>separator</code></td><td>ReactNode</td><td>/</td><td>Custom separator node</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function BreadcrumbDemos() {
  return (
    <>
      <BasicDemo />
      <CustomSeparatorDemo />
      <SkeletonDemo />
      <PropsTable />
    </>
  );
}

export default BreadcrumbDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Page' }]} />;
}
