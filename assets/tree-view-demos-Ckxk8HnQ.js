var e=`import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/tree-view/tree-view.css';
import '@primitives/icon/icon.css';

import { TreeView } from '@primitives/tree-view/TreeView';
import type { TreeNode } from '@primitives/tree-view/TreeView';

const fileTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'src/components',
        label: 'components',
        children: [
          { id: 'src/components/App.tsx', label: 'App.tsx' },
          { id: 'src/components/Header.tsx', label: 'Header.tsx' },
          { id: 'src/components/Footer.tsx', label: 'Footer.tsx' },
        ],
      },
      {
        id: 'src/utils',
        label: 'utils',
        children: [
          { id: 'src/utils/helpers.ts', label: 'helpers.ts' },
          { id: 'src/utils/constants.ts', label: 'constants.ts' },
        ],
      },
      { id: 'src/index.ts', label: 'index.ts' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'tsconfig.json', label: 'tsconfig.json' },
];

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="A file system tree with three levels of nesting.">
      <DemoRow label="tree">
        <TreeView data={fileTree} defaultExpanded={['src', 'src/components']} />
      </DemoRow>
    </Section>
  );
}

// ---- Selection Demo ----
function SelectionDemo() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  return (
    <Section title="Selection" desc="Controlled selection state. Click a node to select it.">
      <DemoRow label="selected">
        <span>{selectedId ?? 'None'}</span>
      </DemoRow>
      <DemoRow label="tree">
        <TreeView
          data={fileTree}
          defaultExpanded={['src', 'src/components']}
          selectedId={selectedId}
          onSelect={(node) => setSelectedId(node.id)}
        />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="TreeView component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>data</code></td><td>TreeNode[]</td><td>--</td><td>Tree data</td></tr>
          <tr><td><code>defaultExpanded</code></td><td>string[]</td><td>[]</td><td>IDs of nodes expanded by default</td></tr>
          <tr><td><code>selectedId</code></td><td>string</td><td>--</td><td>Currently selected node ID</td></tr>
          <tr><td><code>onSelect</code></td><td>(node: TreeNode) =&gt; void</td><td>--</td><td>Callback when a node is selected</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TreeViewDemos() {
  return (
    <>
      <BasicDemo />
      <SelectionDemo />
      <PropsTable />
    </>
  );
}

export default TreeViewDemos;
`;export{e as default};