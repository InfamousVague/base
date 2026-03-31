import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/table/table.css';

import { Table } from '@primitives/table/Table';
import type { TableColumn } from '@primitives/table/Table';

// ---- Data ----
interface Person {
  id: string;
  name: string;
  role: string;
  status: string;
}

const columns: TableColumn<Person>[] = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'status', header: 'Status' },
];

const data: Person[] = [
  { id: '1', name: 'Alice Johnson', role: 'Engineer', status: 'Active' },
  { id: '2', name: 'Bob Smith', role: 'Designer', status: 'Active' },
  { id: '3', name: 'Carol White', role: 'Manager', status: 'On Leave' },
  { id: '4', name: 'Dan Brown', role: 'Engineer', status: 'Active' },
  { id: '5', name: 'Eve Davis', role: 'Analyst', status: 'Inactive' },
];

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="Standard table with three columns and sample data.">
      <Table columns={columns} data={data} rowKey={(row) => row.id} />
    </Section>
  );
}

// ---- Striped Demo ----
function StripedDemo() {
  return (
    <Section title="Striped" desc="Alternating row backgrounds for readability.">
      <Table columns={columns} data={data} rowKey={(row) => row.id} striped />
    </Section>
  );
}

// ---- Compact Demo ----
function CompactDemo() {
  return (
    <Section title="Compact" desc="Reduced padding for dense data display.">
      <Table columns={columns} data={data} rowKey={(row) => row.id} compact />
    </Section>
  );
}

// ---- Clickable Demo ----
function ClickableDemo() {
  return (
    <Section title="Clickable Rows" desc="Rows respond to click events.">
      <Table
        columns={columns}
        data={data}
        rowKey={(row) => row.id}
        onRowClick={(row) => alert(`Clicked: ${row.name}`)}
      />
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Table component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>columns</code></td><td>TableColumn&lt;T&gt;[]</td><td>--</td><td>Column definitions</td></tr>
          <tr><td><code>data</code></td><td>T[]</td><td>--</td><td>Row data</td></tr>
          <tr><td><code>rowKey</code></td><td>(row: T) =&gt; string</td><td>--</td><td>Unique key extractor per row</td></tr>
          <tr><td><code>striped</code></td><td>boolean</td><td>false</td><td>Alternate row background</td></tr>
          <tr><td><code>compact</code></td><td>boolean</td><td>false</td><td>Reduced padding</td></tr>
          <tr><td><code>stickyHeader</code></td><td>boolean</td><td>false</td><td>Sticky header on scroll</td></tr>
          <tr><td><code>onRowClick</code></td><td>(row: T) =&gt; void</td><td>--</td><td>Row click handler</td></tr>
          <tr><td><code>emptyMessage</code></td><td>string</td><td>No data</td><td>Message when data is empty</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TableDemos() {
  return (
    <>
      <BasicDemo />
      <StripedDemo />
      <CompactDemo />
      <ClickableDemo />
      <PropsTable />
    </>
  );
}

export default TableDemos;
