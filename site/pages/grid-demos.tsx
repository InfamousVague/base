import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/grid/grid.css';
import '@primitives/box/box.css';
import { Grid, GridItem } from '@primitives/grid/Grid';
import { Box } from '@primitives/box/Box';

function GridCell({ children }: { children: React.ReactNode }) {
  return (
    <Box bg="inset" padding="3" radius="md" style={{ textAlign: 'center' }}>
      <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>{children}</span>
    </Box>
  );
}

function ColumnsDemo() {
  return (
    <Section title="Columns" desc="Grid with 2, 3, and 4 column layouts.">
      {([2, 3, 4] as const).map((cols) => (
        <DemoRow key={cols} label={`columns={${cols}}`}>
          <Grid columns={cols} gap="3" style={{ width: '100%' }}>
            {Array.from({ length: cols * 2 }, (_, i) => (
              <GridCell key={i}>{i + 1}</GridCell>
            ))}
          </Grid>
        </DemoRow>
      ))}
    </Section>
  );
}

function SpanDemo() {
  return (
    <Section title="Span" desc="GridItem spanning multiple columns in a 4-column grid.">
      <DemoRow label="span=2">
        <Grid columns={4} gap="3" style={{ width: '100%' }}>
          <GridItem span={2}>
            <Box bg="inset" padding="3" radius="md" border="default" style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)' }}>span 2</span>
            </Box>
          </GridItem>
          <GridCell>3</GridCell>
          <GridCell>4</GridCell>
          <GridCell>5</GridCell>
          <GridItem span={3}>
            <Box bg="inset" padding="3" radius="md" border="default" style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-primary)' }}>span 3</span>
            </Box>
          </GridItem>
        </Grid>
      </DemoRow>
    </Section>
  );
}

function GapDemo() {
  return (
    <Section title="Gap" desc="Different gap values in a 3-column grid.">
      {(['2', '4', '8'] as const).map((g) => (
        <DemoRow key={g} label={`gap="${g}"`}>
          <Grid columns={3} gap={g} style={{ width: '100%' }}>
            {Array.from({ length: 6 }, (_, i) => (
              <GridCell key={i}>{i + 1}</GridCell>
            ))}
          </Grid>
        </DemoRow>
      ))}
    </Section>
  );
}

function GridDemos() {
  return (
    <>
      <ColumnsDemo />
      <SpanDemo />
      <GapDemo />
    </>
  );
}

export default GridDemos;
