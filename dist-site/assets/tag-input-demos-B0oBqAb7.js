var e=`import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/tag-input/tag-input.css';
import '@primitives/badge/badge.css';
import '@primitives/icon/icon.css';

import { TagInput } from '@primitives/tag-input/TagInput';

// ---- Basic Demo ----
function BasicDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  return (
    <Section title="Basic" desc="Add tags by typing and pressing Enter. Remove with backspace or the X button.">
      <DemoRow label="tags">
        <div style={{ width: '100%', maxWidth: '24rem' }}>
          <TagInput value={tags} onChange={setTags} placeholder="Add a tag..." />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Max Tags Demo ----
function MaxTagsDemo() {
  const [tags, setTags] = useState(['One', 'Two', 'Three']);
  return (
    <Section title="Max Tags" desc="Limited to 3 tags maximum.">
      <DemoRow label="max=3">
        <div style={{ width: '100%', maxWidth: '24rem' }}>
          <TagInput value={tags} onChange={setTags} maxTags={3} placeholder="Max 3 tags" />
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md'] as const;
  return (
    <Section title="Sizes" desc="Small and medium tag input sizes.">
      {sizes.map(size => {
        const [tags, setTags] = useState(['Tag']);
        return (
          <DemoRow key={size} label={size}>
            <div style={{ width: '100%', maxWidth: '24rem' }}>
              <TagInput value={tags} onChange={setTags} size={size} placeholder="Add..." />
            </div>
          </DemoRow>
        );
      })}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="TagInput component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>value</code></td><td>string[]</td><td>--</td><td>Current tag values</td></tr>
          <tr><td><code>onChange</code></td><td>(tags: string[]) =&gt; void</td><td>--</td><td>Called when tags change</td></tr>
          <tr><td><code>placeholder</code></td><td>string</td><td>""</td><td>Placeholder text</td></tr>
          <tr><td><code>maxTags</code></td><td>number</td><td>--</td><td>Maximum number of tags</td></tr>
          <tr><td><code>size</code></td><td>sm | md</td><td>md</td><td>Input size</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disabled state</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function TagInputDemos() {
  return (
    <>
      <BasicDemo />
      <MaxTagsDemo />
      <SizeDemo />
      <PropsTable />
    </>
  );
}

export default TagInputDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <TagInput value={['React', 'Vue']} onChange={() => {}} />;
}
`;export{e as default};