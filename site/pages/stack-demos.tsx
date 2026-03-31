import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/stack/stack.css';
import '@primitives/box/box.css';
import { Stack, HStack, VStack } from '@primitives/stack/Stack';
import { Box } from '@primitives/box/Box';

function ColorBox({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="inset" padding="3" radius="md" style={{ minWidth: '4rem', textAlign: 'center' }}>
      <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>{children}</span>
    </Box>
  );
}

function DirectionDemo() {
  return (
    <Section title="Direction" desc="HStack lays out horizontally, VStack vertically.">
      <DemoRow label="HStack">
        <HStack gap="3">
          <ColorBox>A</ColorBox>
          <ColorBox>B</ColorBox>
          <ColorBox>C</ColorBox>
        </HStack>
      </DemoRow>
      <DemoRow label="VStack">
        <VStack gap="3">
          <ColorBox>A</ColorBox>
          <ColorBox>B</ColorBox>
          <ColorBox>C</ColorBox>
        </VStack>
      </DemoRow>
    </Section>
  );
}

function GapDemo() {
  return (
    <Section title="Gap" desc="Different gap token values between children.">
      {(['1', '2', '4', '6', '8'] as const).map((g) => (
        <DemoRow key={g} label={`gap="${g}"`}>
          <HStack gap={g}>
            <ColorBox>1</ColorBox>
            <ColorBox>2</ColorBox>
            <ColorBox>3</ColorBox>
          </HStack>
        </DemoRow>
      ))}
    </Section>
  );
}

function AlignDemo() {
  return (
    <Section title="Align" desc="Cross-axis alignment in a VStack with different-width children.">
      {(['start', 'center', 'end', 'stretch'] as const).map((a) => (
        <DemoRow key={a} label={`align="${a}"`}>
          <VStack gap="2" align={a} style={{ border: '1px dashed var(--color-border-subtle)', padding: 'var(--sp-3)', minWidth: '12rem' }}>
            <Box bg="inset" padding="2" radius="sm" style={{ width: a === 'stretch' ? undefined : '4rem', textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>4rem</span>
            </Box>
            <Box bg="inset" padding="2" radius="sm" style={{ width: a === 'stretch' ? undefined : '7rem', textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>7rem</span>
            </Box>
            <Box bg="inset" padding="2" radius="sm" style={{ width: a === 'stretch' ? undefined : '5rem', textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>5rem</span>
            </Box>
          </VStack>
        </DemoRow>
      ))}
    </Section>
  );
}

function JustifyDemo() {
  return (
    <Section title="Justify" desc="Main-axis justification in an HStack.">
      {(['start', 'center', 'end', 'between'] as const).map((j) => (
        <DemoRow key={j} label={`justify="${j}"`}>
          <HStack gap="3" justify={j} style={{ border: '1px dashed var(--color-border-subtle)', padding: 'var(--sp-3)', width: '100%' }}>
            <ColorBox>A</ColorBox>
            <ColorBox>B</ColorBox>
            <ColorBox>C</ColorBox>
          </HStack>
        </DemoRow>
      ))}
    </Section>
  );
}

function WrapDemo() {
  return (
    <Section title="Wrap" desc="HStack with wrap enabled and many children.">
      <DemoRow label="wrap">
        <HStack gap="3" wrap style={{ maxWidth: '20rem', border: '1px dashed var(--color-border-subtle)', padding: 'var(--sp-3)' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <ColorBox key={i}>{i + 1}</ColorBox>
          ))}
        </HStack>
      </DemoRow>
    </Section>
  );
}

function StackDemos() {
  return (
    <>
      <DirectionDemo />
      <GapDemo />
      <AlignDemo />
      <JustifyDemo />
      <WrapDemo />
    </>
  );
}

export default StackDemos;
