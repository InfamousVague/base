import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/aspect-ratio/aspect-ratio.css';
import { AspectRatio } from '@primitives/aspect-ratio/AspectRatio';

const RATIOS = ['1/1', '16/9', '4/3', '21/9'] as const;

const COLORS = [
  'var(--color-accent)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-error)',
];

function RatioDemo() {
  return (
    <Section title="Aspect Ratios" desc="Common aspect ratios with colored backgrounds to visualize proportions.">
      {RATIOS.map((ratio, idx) => (
        <DemoRow key={ratio} label={`ratio="${ratio}"`}>
          <div style={{ width: '10rem' }}>
            <AspectRatio ratio={ratio}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: COLORS[idx],
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.8,
                }}
              >
                <span style={{ fontSize: 'var(--text-sm-size)', color: '#fff', fontWeight: 'var(--weight-semibold)' }}>
                  {ratio}
                </span>
              </div>
            </AspectRatio>
          </div>
        </DemoRow>
      ))}
    </Section>
  );
}

function AspectRatioDemos() {
  return (
    <>
      <RatioDemo />
    </>
  );
}

export default AspectRatioDemos;
