import React, { useState } from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/stepper/stepper.css';
import '@primitives/icon/icon.css';

import { Stepper } from '@primitives/stepper/Stepper';

const steps = [
  { label: 'Account', description: 'Create your account' },
  { label: 'Profile', description: 'Set up your profile' },
  { label: 'Settings', description: 'Configure preferences' },
  { label: 'Complete', description: 'Review and finish' },
];

// ---- Horizontal Demo ----
function HorizontalDemo() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Section title="Horizontal" desc="Horizontal stepper with interactive step control.">
      <DemoRow label="stepper">
        <div style={{ width: '100%' }}>
          <Stepper steps={steps} activeStep={activeStep} orientation="horizontal" />
          <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)' }}>
            <button
              onClick={() => setActiveStep(s => Math.max(0, s - 1))}
              disabled={activeStep === 0}
              style={{ padding: 'var(--sp-1) var(--sp-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)', cursor: 'pointer' }}
            >
              Back
            </button>
            <button
              onClick={() => setActiveStep(s => Math.min(steps.length, s + 1))}
              disabled={activeStep === steps.length}
              style={{ padding: 'var(--sp-1) var(--sp-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)', cursor: 'pointer' }}
            >
              Next
            </button>
            <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-tertiary)', alignSelf: 'center' }}>
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Vertical Demo ----
function VerticalDemo() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <Section title="Vertical" desc="Vertical orientation stepper.">
      <DemoRow label="stepper">
        <div style={{ width: '100%' }}>
          <Stepper steps={steps} activeStep={activeStep} orientation="vertical" />
          <div style={{ display: 'flex', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)' }}>
            <button
              onClick={() => setActiveStep(s => Math.max(0, s - 1))}
              disabled={activeStep === 0}
              style={{ padding: 'var(--sp-1) var(--sp-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)', cursor: 'pointer' }}
            >
              Back
            </button>
            <button
              onClick={() => setActiveStep(s => Math.min(steps.length, s + 1))}
              disabled={activeStep === steps.length}
              style={{ padding: 'var(--sp-1) var(--sp-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-default)', cursor: 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Stepper component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>steps</code></td><td>{'StepItem[]'}</td><td>--</td><td>Array of step definitions (required)</td></tr>
          <tr><td><code>activeStep</code></td><td>number</td><td>--</td><td>Currently active step, 0-indexed (required)</td></tr>
          <tr><td><code>orientation</code></td><td>horizontal | vertical</td><td>horizontal</td><td>Layout direction</td></tr>
        </tbody>
      </table>
      <table className="token-table" style={{ marginTop: 'var(--sp-4)' }}>
        <thead><tr><th colSpan={4}>StepItem</th></tr><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>label</code></td><td>string</td><td>--</td><td>Step label (required)</td></tr>
          <tr><td><code>description</code></td><td>string</td><td>--</td><td>Optional step description</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function StepperDemos() {
  return (
    <>
      <HorizontalDemo />
      <VerticalDemo />
      <PropsTable />
    </>
  );
}

export default StepperDemos;

/** Blueprint target */
export function BlueprintTarget() {
  return <Stepper steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]} activeStep={1} />;
}
