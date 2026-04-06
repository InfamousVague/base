var e=`import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/pagination/pagination.css';

import { Pagination } from '@primitives/pagination/Pagination';

// ---- Interactive Demo ----
function InteractiveDemo() {
  const [page, setPage] = useState(1);
  return (
    <Section title="Interactive" desc="Click navigation buttons to change page.">
      <DemoRow label="20 pages">
        <Pagination page={page} totalPages={20} totalItems={587} onPageChange={setPage} />
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  return (
    <Section title="Sizes" desc="Three sizes for different layouts.">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <DemoRow key={size} label={size}>
          <Pagination page={3} totalPages={10} totalItems={295} onPageChange={() => {}} size={size} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Edge Cases ----
function EdgeCaseDemo() {
  return (
    <Section title="Edge cases" desc="Single page, first page, last page.">
      <DemoRow label="single page">
        <Pagination page={1} totalPages={1} totalItems={12} onPageChange={() => {}} />
      </DemoRow>
      <DemoRow label="first page">
        <Pagination page={1} totalPages={5} totalItems={142} onPageChange={() => {}} />
      </DemoRow>
      <DemoRow label="last page">
        <Pagination page={5} totalPages={5} totalItems={142} onPageChange={() => {}} />
      </DemoRow>
      <DemoRow label="no items">
        <Pagination page={1} totalPages={1} onPageChange={() => {}} />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Pagination component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>page</code></td><td>number</td><td>--</td><td>Current page (1-indexed)</td></tr>
          <tr><td><code>totalPages</code></td><td>number</td><td>--</td><td>Total number of pages</td></tr>
          <tr><td><code>onPageChange</code></td><td>(page) =&gt; void</td><td>--</td><td>Callback when page changes</td></tr>
          <tr><td><code>totalItems</code></td><td>number</td><td>--</td><td>Optional item count to display</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size variant</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

function PaginationDemos() {
  return (
    <>
      <InteractiveDemo />
      <SizeDemo />
      <EdgeCaseDemo />
      <PropsTable />
    </>
  );
}

export default PaginationDemos;

export function BlueprintTarget() {
  return <Pagination page={3} totalPages={10} totalItems={295} onPageChange={() => {}} />;
}
`;export{e as default};