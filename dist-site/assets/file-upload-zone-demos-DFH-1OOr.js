var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/file-upload-zone/file-upload-zone.css';
import '@primitives/icon/icon.css';

import { FileUploadZone } from '@primitives/file-upload-zone/FileUploadZone';

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="Drop zone that logs selected files to the console.">
      <DemoRow label="default">
        <FileUploadZone onFiles={(files) => console.log('Files:', files)} />
      </DemoRow>
    </Section>
  );
}

// ---- Accept Demo ----
function AcceptDemo() {
  return (
    <Section title="Accept Images" desc="Only image files are accepted.">
      <DemoRow label="image/*">
        <FileUploadZone accept="image/*" onFiles={(files) => console.log('Images:', files)} />
      </DemoRow>
    </Section>
  );
}

// ---- Disabled Demo ----
function DisabledDemo() {
  return (
    <Section title="Disabled" desc="Upload zone in disabled state.">
      <DemoRow label="disabled">
        <FileUploadZone disabled onFiles={() => {}} />
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="FileUploadZone component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>onFiles</code></td><td>(files: File[]) =&gt; void</td><td>--</td><td>Callback with selected/dropped files</td></tr>
          <tr><td><code>accept</code></td><td>string</td><td>--</td><td>Accepted MIME types</td></tr>
          <tr><td><code>multiple</code></td><td>boolean</td><td>true</td><td>Allow multiple files</td></tr>
          <tr><td><code>maxSize</code></td><td>number</td><td>--</td><td>Maximum file size in bytes</td></tr>
          <tr><td><code>disabled</code></td><td>boolean</td><td>false</td><td>Disable the upload zone</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function FileUploadZoneDemos() {
  return (
    <>
      <BasicDemo />
      <AcceptDemo />
      <DisabledDemo />
      <PropsTable />
    </>
  );
}

export default FileUploadZoneDemos;
`;export{e as default};