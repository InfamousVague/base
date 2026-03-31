import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/container/container.css';
import { Container } from '@primitives/container/Container';

function SizeDemo() {
  return (
    <Section title="Container Sizes" desc="Max-width presets from sm to full. Each container is centered with an inset background to visualize width.">
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((s) => (
        <DemoRow key={s} label={`size="${s}"`}>
          <div style={{ width: '100%', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <Container size={s}>
              <div style={{
                background: 'var(--color-bg-inset)',
                padding: 'var(--sp-3)',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'center',
              }}>
                <span style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  {s}
                </span>
              </div>
            </Container>
          </div>
        </DemoRow>
      ))}
    </Section>
  );
}

function ContainerDemos() {
  return (
    <>
      <SizeDemo />
    </>
  );
}

export default ContainerDemos;
