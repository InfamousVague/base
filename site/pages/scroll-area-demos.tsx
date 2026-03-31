import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/scroll-area/scroll-area.css';
import { ScrollArea } from '@primitives/scroll-area/ScrollArea';

function VerticalDemo() {
  return (
    <Section title="Vertical Scroll" desc="A list of items inside a 200px max-height scroll area.">
      <DemoRow label="maxHeight 200px">
        <ScrollArea maxHeight="200px" style={{ width: '100%', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ padding: 'var(--sp-2)' }}>
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: 'var(--sp-2) var(--sp-3)',
                  borderBottom: i < 24 ? '1px solid var(--color-border-subtle)' : 'none',
                  fontSize: 'var(--text-sm-size)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Item {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DemoRow>
    </Section>
  );
}

function HorizontalDemo() {
  return (
    <Section title="Horizontal Scroll" desc="Wide content inside a fixed-width container scrolls horizontally.">
      <DemoRow label="horizontal">
        <ScrollArea direction="horizontal" style={{ width: '100%', maxWidth: '20rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', padding: 'var(--sp-3)', width: 'max-content' }}>
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                style={{
                  minWidth: '6rem',
                  height: '4rem',
                  background: 'var(--color-bg-inset)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-sm-size)',
                  color: 'var(--color-text-secondary)',
                  flexShrink: 0,
                }}
              >
                Card {i + 1}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DemoRow>
    </Section>
  );
}

function ScrollAreaDemos() {
  return (
    <>
      <VerticalDemo />
      <HorizontalDemo />
    </>
  );
}

export default ScrollAreaDemos;
