import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/code-block/code-block.css';
import '@primitives/icon/icon.css';

import { CodeBlock } from '@primitives/code-block/CodeBlock';

const jsSnippet = `function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("world"));`;

const tsSnippet = `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return { id, name: "Alice", email: "alice@example.com" };
}`;

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="A simple JavaScript code snippet.">
      <DemoRow label="default">
        <CodeBlock code={jsSnippet} />
      </DemoRow>
    </Section>
  );
}

// ---- Line Numbers Demo ----
function LineNumbersDemo() {
  return (
    <Section title="Line Numbers" desc="Code block with line numbers enabled.">
      <DemoRow label="showLineNumbers">
        <CodeBlock code={jsSnippet} showLineNumbers />
      </DemoRow>
    </Section>
  );
}

// ---- Language Label Demo ----
function LanguageLabelDemo() {
  return (
    <Section title="Language Label" desc="Displays the language in the header.">
      <DemoRow label="typescript">
        <CodeBlock code={tsSnippet} language="typescript" />
      </DemoRow>
    </Section>
  );
}

// ---- Copy Demo ----
function CopyDemo() {
  return (
    <Section title="Copyable" desc="Code block with a copy-to-clipboard button.">
      <DemoRow label="copyable">
        <CodeBlock code={jsSnippet} copyable language="javascript" />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="CodeBlock component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>code</code></td><td>string</td><td>--</td><td>Code string to display</td></tr>
          <tr><td><code>language</code></td><td>string</td><td>--</td><td>Language label in header</td></tr>
          <tr><td><code>showLineNumbers</code></td><td>boolean</td><td>false</td><td>Show line numbers</td></tr>
          <tr><td><code>copyable</code></td><td>boolean</td><td>true</td><td>Show copy button</td></tr>
          <tr><td><code>maxHeight</code></td><td>string</td><td>--</td><td>Maximum height with scroll</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function CodeBlockDemos() {
  return (
    <>
      <BasicDemo />
      <LineNumbersDemo />
      <LanguageLabelDemo />
      <CopyDemo />
      <PropsTable />
    </>
  );
}

export default CodeBlockDemos;
