var e=`import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/image/image.css';

import { Image } from '@primitives/image/Image';

const PLACEHOLDER = 'https://picsum.photos/400/300';

const containerStyle: React.CSSProperties = {
  width: '200px',
  height: '150px',
  border: '1px solid var(--color-border-subtle)',
  borderRadius: 'var(--radius-sm)',
  overflow: 'hidden',
};

// ---- Fit Demo ----
function FitDemo() {
  const fits = ['cover', 'contain', 'fill'] as const;
  return (
    <Section title="Object Fit" desc="Cover, contain, and fill modes in a 200x150 container.">
      {fits.map(fit => (
        <DemoRow key={fit} label={fit}>
          <div style={containerStyle}>
            <Image src={PLACEHOLDER} alt={\`\${fit} example\`} fit={fit} style={{ width: '100%', height: '100%' }} />
          </div>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Radius Demo ----
function RadiusDemo() {
  const radii = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;
  return (
    <Section title="Border Radius" desc="Six radius options from none to full circle.">
      {radii.map(radius => (
        <DemoRow key={radius} label={radius}>
          <Image src={PLACEHOLDER} alt={\`\${radius} radius\`} radius={radius} style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Main ----
function ImageDemos() {
  return (
    <>
      <FitDemo />
      <RadiusDemo />
    </>
  );
}

export default ImageDemos;
`;export{e as default};