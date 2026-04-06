var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/center/center.css';
import { Center } from '@primitives/center/Center';

function BasicDemo() {
  return (
    <Section title="Basic Center" desc="Content centered both horizontally and vertically inside a fixed-height container.">
      <DemoRow label="200px height">
        <Center style={{ height: '200px', width: '100%', border: '1px dashed var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>Centered content</span>
        </Center>
      </DemoRow>
      <DemoRow label="100px height">
        <Center style={{ height: '100px', width: '100%', border: '1px dashed var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-lg-size)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>Title</div>
            <div style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)' }}>Subtitle text</div>
          </div>
        </Center>
      </DemoRow>
    </Section>
  );
}

function InlineDemo() {
  return (
    <Section title="Inline Center" desc="Center with inline mode behaves as inline-flex, sitting alongside text.">
      <DemoRow label="inline">
        <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>Before </span>
        <Center inline style={{ width: '6rem', height: '2rem', border: '1px dashed var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>inline</span>
        </Center>
        <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}> After</span>
      </DemoRow>
    </Section>
  );
}

function CenterDemos() {
  return (
    <>
      <BasicDemo />
      <InlineDemo />
    </>
  );
}

export default CenterDemos;
`;export{e as default};