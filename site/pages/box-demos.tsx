import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/box/box.css';
import { Box } from '@primitives/box/Box';

function PaddingDemo() {
  return (
    <Section title="Padding" desc="Padding tokens applied to Box. Background set to inset so padding is visible.">
      {(['2', '4', '6', '8'] as const).map((p) => (
        <DemoRow key={p} label={`padding="${p}"`}>
          <Box padding={p} bg="inset" radius="md">
            <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>Content</span>
          </Box>
        </DemoRow>
      ))}
    </Section>
  );
}

function RadiusDemo() {
  return (
    <Section title="Border Radius" desc="Radius tokens from none to full, shown with a default border.">
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((r) => (
        <DemoRow key={r} label={`radius="${r}"`}>
          <Box padding="4" radius={r} border="default">
            <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>{r}</span>
          </Box>
        </DemoRow>
      ))}
    </Section>
  );
}

function BackgroundDemo() {
  return (
    <Section title="Background" desc="Background color tokens for surface hierarchy.">
      {(['primary', 'secondary', 'elevated', 'inset'] as const).map((bg) => (
        <DemoRow key={bg} label={`bg="${bg}"`}>
          <Box padding="4" radius="md" bg={bg}>
            <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>{bg}</span>
          </Box>
        </DemoRow>
      ))}
    </Section>
  );
}

function ShadowDemo() {
  return (
    <Section title="Shadow" desc="Box shadow tokens on elevated backgrounds.">
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <DemoRow key={s} label={`shadow="${s}"`}>
          <Box padding="4" radius="md" bg="elevated" shadow={s}>
            <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>{s}</span>
          </Box>
        </DemoRow>
      ))}
    </Section>
  );
}

function ComposedDemo() {
  return (
    <Section title="Composed" desc="Combining padding, radius, background, and border together.">
      <DemoRow label="all props">
        <Box padding="6" radius="lg" bg="elevated" border="default" shadow="md">
          <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)' }}>
            padding=6 + radius=lg + bg=elevated + border=default + shadow=md
          </span>
        </Box>
      </DemoRow>
      <DemoRow label="inset card">
        <Box padding="4" radius="md" bg="inset" border="subtle">
          <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
            padding=4 + radius=md + bg=inset + border=subtle
          </span>
        </Box>
      </DemoRow>
    </Section>
  );
}

function BoxDemos() {
  return (
    <>
      <PaddingDemo />
      <RadiusDemo />
      <BackgroundDemo />
      <ShadowDemo />
      <ComposedDemo />
    </>
  );
}

export default BoxDemos;
