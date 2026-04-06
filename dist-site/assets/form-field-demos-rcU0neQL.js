var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/form-field/form-field.css';
import '@primitives/input/input.css';
import '@primitives/textarea/textarea.css';
import '@primitives/select/select.css';
import '@primitives/text/text.css';
import '@primitives/checkbox/checkbox.css';
import '@primitives/toggle/toggle.css';

import { FormField } from '@primitives/form-field/FormField';
import { Input } from '@primitives/input/Input';
import { TextArea } from '@primitives/textarea/TextArea';
import { Select } from '@primitives/select/Select';
import { Checkbox } from '@primitives/checkbox/Checkbox';
import { Toggle } from '@primitives/toggle/Toggle';

function BasicDemo() {
  return (
    <Section title="Basic" desc="FormField wrapping an Input with a label.">
      <DemoRow label="label + input">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Email address" htmlFor="basic-email">
            <Input id="basic-email" placeholder="you@example.com" />
          </FormField>
        </div>
      </DemoRow>
    </Section>
  );
}

function HintDemo() {
  return (
    <Section title="Hint" desc="FormField with a descriptive hint below the input.">
      <DemoRow label="label + hint">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Password" hint="Must be at least 8 characters." htmlFor="hint-pw">
            <Input id="hint-pw" type="password" placeholder="Enter password" />
          </FormField>
        </div>
      </DemoRow>
    </Section>
  );
}

function ErrorDemo() {
  return (
    <Section title="Error" desc="FormField displaying an error message with error-state input.">
      <DemoRow label="error state">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Username" error="This username is already taken." htmlFor="err-user">
            <Input id="err-user" intent="error" defaultValue="johndoe" />
          </FormField>
        </div>
      </DemoRow>
    </Section>
  );
}

function RequiredDemo() {
  return (
    <Section title="Required" desc="FormField with required indicator on the label.">
      <DemoRow label="required">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Full name" required htmlFor="req-name">
            <Input id="req-name" placeholder="Jane Doe" />
          </FormField>
        </div>
      </DemoRow>
    </Section>
  );
}

function ComposedDemo() {
  return (
    <Section title="Composed" desc="FormField wrapping different form controls: TextArea, Select, Checkbox, and Toggle.">
      <DemoRow label="TextArea">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Bio" hint="Write a short bio." htmlFor="comp-bio">
            <TextArea id="comp-bio" placeholder="Tell us about yourself..." rows={3} />
          </FormField>
        </div>
      </DemoRow>
      <DemoRow label="Select">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Country" htmlFor="comp-country">
            <Select id="comp-country" placeholder="Select a country">
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="de">Germany</option>
              <option value="jp">Japan</option>
            </Select>
          </FormField>
        </div>
      </DemoRow>
      <DemoRow label="Checkbox">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Preferences">
            <Checkbox label="Receive email updates" />
          </FormField>
        </div>
      </DemoRow>
      <DemoRow label="Toggle">
        <div style={{ width: '100%', maxWidth: '20rem' }}>
          <FormField label="Notifications">
            <Toggle label="Enable push notifications" />
          </FormField>
        </div>
      </DemoRow>
    </Section>
  );
}

function PropsTable() {
  return (
    <Section title="Props" desc="FormField component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Label text</td></tr>
          <tr><td><code>hint</code></td><td>string</td><td>--</td><td>Hint text shown below the input</td></tr>
          <tr><td><code>error</code></td><td>string</td><td>--</td><td>Error message (replaces hint when present)</td></tr>
          <tr><td><code>required</code></td><td>boolean</td><td>false</td><td>Show required indicator</td></tr>
          <tr><td><code>htmlFor</code></td><td>string</td><td>--</td><td>Associates label with input via htmlFor</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

function FormFieldDemos() {
  return (
    <>
      <BasicDemo />
      <HintDemo />
      <ErrorDemo />
      <RequiredDemo />
      <ComposedDemo />
      <PropsTable />
    </>
  );
}

export default FormFieldDemos;
`;export{e as default};