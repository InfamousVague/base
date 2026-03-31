import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/carousel/carousel.css';
import '@primitives/icon/icon.css';

import { Carousel } from '@primitives/carousel/Carousel';

const slideStyle = (bg: string): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '10rem',
  borderRadius: 'var(--radius-md)',
  color: '#fff',
  fontWeight: 600,
  fontSize: 'var(--text-lg-size)',
  backgroundColor: bg,
});

// ---- Basic Demo ----
function BasicDemo() {
  return (
    <Section title="Basic" desc="Three colored slides with arrows and dots.">
      <DemoRow label="carousel">
        <div style={{ width: '100%', maxWidth: '28rem' }}>
          <Carousel>
            <div style={slideStyle('var(--color-accent-solid)')}>Slide 1</div>
            <div style={slideStyle('var(--color-success-solid)')}>Slide 2</div>
            <div style={slideStyle('var(--color-warning-solid)')}>Slide 3</div>
          </Carousel>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- AutoPlay Demo ----
function AutoPlayDemo() {
  return (
    <Section title="Auto Play" desc="Automatically advances every 2 seconds.">
      <DemoRow label="autoPlay">
        <div style={{ width: '100%', maxWidth: '28rem' }}>
          <Carousel autoPlay interval={2000}>
            <div style={slideStyle('var(--color-error-solid)')}>Auto 1</div>
            <div style={slideStyle('var(--color-info-solid)')}>Auto 2</div>
            <div style={slideStyle('var(--color-accent-solid)')}>Auto 3</div>
          </Carousel>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- No Dots Demo ----
function NoDotsDemo() {
  return (
    <Section title="No Dots" desc="Dot indicators hidden, arrows only.">
      <DemoRow label="showDots=false">
        <div style={{ width: '100%', maxWidth: '28rem' }}>
          <Carousel showDots={false}>
            <div style={slideStyle('var(--color-warning-solid)')}>A</div>
            <div style={slideStyle('var(--color-success-solid)')}>B</div>
            <div style={slideStyle('var(--color-error-solid)')}>C</div>
          </Carousel>
        </div>
      </DemoRow>
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Carousel component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>children</code></td><td>ReactNode</td><td>--</td><td>Slide elements</td></tr>
          <tr><td><code>autoPlay</code></td><td>boolean</td><td>false</td><td>Auto-advance slides</td></tr>
          <tr><td><code>interval</code></td><td>number</td><td>5000</td><td>Auto-advance interval in ms</td></tr>
          <tr><td><code>showDots</code></td><td>boolean</td><td>true</td><td>Show dot indicators</td></tr>
          <tr><td><code>showArrows</code></td><td>boolean</td><td>true</td><td>Show prev/next arrow buttons</td></tr>
          <tr><td><code>skeleton</code></td><td>boolean</td><td>false</td><td>Show skeleton placeholder</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function CarouselDemos() {
  return (
    <>
      <BasicDemo />
      <AutoPlayDemo />
      <NoDotsDemo />
      <PropsTable />
    </>
  );
}

export default CarouselDemos;
