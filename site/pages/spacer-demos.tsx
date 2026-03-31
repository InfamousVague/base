import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/spacer/spacer.css';
import '@primitives/stack/stack.css';
import '@primitives/box/box.css';
import { Spacer } from '@primitives/spacer/Spacer';
import { HStack } from '@primitives/stack/Stack';
import { Box } from '@primitives/box/Box';

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="inset" padding="3" radius="md" style={{ textAlign: 'center' }}>
      <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>{children}</span>
    </Box>
  );
}

function FlexibleDemo() {
  return (
    <Section title="Flexible Spacer" desc="Spacer without a size fills all available space, pushing items apart.">
      <DemoRow label="flex grow">
        <HStack gap="3" style={{ width: '100%', border: '1px dashed var(--color-border-subtle)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-md)' }}>
          <Label>Left</Label>
          <Spacer />
          <Label>Right</Label>
        </HStack>
      </DemoRow>
      <DemoRow label="three items">
        <HStack gap="3" style={{ width: '100%', border: '1px dashed var(--color-border-subtle)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-md)' }}>
          <Label>A</Label>
          <Spacer />
          <Label>B</Label>
          <Spacer />
          <Label>C</Label>
        </HStack>
      </DemoRow>
    </Section>
  );
}

function FixedDemo() {
  return (
    <Section title="Fixed Spacer" desc="Spacer with a size token creates a fixed gap.">
      {(['4', '8', '16'] as const).map((s) => (
        <DemoRow key={s} label={`size="${s}"`}>
          <HStack style={{ border: '1px dashed var(--color-border-subtle)', padding: 'var(--sp-3)', borderRadius: 'var(--radius-md)' }}>
            <Label>A</Label>
            <Spacer size={s} />
            <Label>B</Label>
          </HStack>
        </DemoRow>
      ))}
    </Section>
  );
}

function SpacerDemos() {
  return (
    <>
      <FlexibleDemo />
      <FixedDemo />
    </>
  );
}

export default SpacerDemos;
