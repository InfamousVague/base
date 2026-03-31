import React from 'react';
import { Section, DemoRow } from '../components/demo-helpers';

import '@primitives/button/button.css';
import '@primitives/icon/icon.css';
import '@primitives/spinner/spinner.css';

import { Button } from '@primitives/button/Button';
import { heart } from '@primitives/icon/icons/heart';
import { star } from '@primitives/icon/icons/star';
import { plus } from '@primitives/icon/icons/plus';
import { settings } from '@primitives/icon/icons/settings';

// ---- Variant Demo ----
function VariantDemo() {
  const variants = ['primary', 'secondary', 'ghost'] as const;
  return (
    <Section title="Variants" desc="Three base button variants: primary, secondary, and ghost.">
      {variants.map(variant => (
        <DemoRow key={variant} label={variant}>
          <Button variant={variant}>Button</Button>
          <Button variant={variant} size="sm">Small</Button>
          <Button variant={variant} size="lg">Large</Button>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Size Demo ----
function SizeDemo() {
  const sizes = ['sm', 'md', 'lg'] as const;
  return (
    <Section title="Sizes" desc="Three button sizes matching the input scale.">
      {sizes.map(size => (
        <DemoRow key={size} label={size}>
          <Button size={size}>Button</Button>
          <Button size={size} variant="secondary">Secondary</Button>
          <Button size={size} variant="ghost">Ghost</Button>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Intent Demo ----
function IntentDemo() {
  const intents = ['error', 'warning', 'success', 'info'] as const;
  const appearances = ['solid', 'subtle', 'outline'] as const;
  return (
    <Section title="Intents" desc="Status intents with solid, subtle, and outline appearances.">
      {intents.map(intent => (
        <DemoRow key={intent} label={intent}>
          {appearances.map(appearance => (
            <Button key={appearance} intent={intent} appearance={appearance}>
              {appearance}
            </Button>
          ))}
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Shape Demo ----
function ShapeDemo() {
  const shapes = ['square', 'default', 'pill'] as const;
  return (
    <Section title="Shapes" desc="Border-radius shape options: square, default, and pill.">
      {shapes.map(shape => (
        <DemoRow key={shape} label={shape}>
          <Button shape={shape}>Button</Button>
          <Button shape={shape} variant="secondary">Secondary</Button>
          <Button shape={shape} variant="ghost">Ghost</Button>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Icon Demo ----
function IconDemo() {
  return (
    <Section title="With Icon" desc="Buttons with a leading icon alongside text.">
      <DemoRow label="sm">
        <Button size="sm" icon={heart}>Favorite</Button>
        <Button size="sm" icon={star} variant="secondary">Star</Button>
      </DemoRow>
      <DemoRow label="md">
        <Button icon={heart}>Favorite</Button>
        <Button icon={settings} variant="secondary">Settings</Button>
      </DemoRow>
      <DemoRow label="lg">
        <Button size="lg" icon={plus}>Create</Button>
        <Button size="lg" icon={star} variant="secondary">Star</Button>
      </DemoRow>
    </Section>
  );
}

// ---- Icon Only Demo ----
function IconOnlyDemo() {
  return (
    <Section title="Icon Only" desc="Square icon-only buttons at each size.">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <DemoRow key={size} label={size}>
          <Button size={size} icon={heart} iconOnly aria-label="Favorite" />
          <Button size={size} icon={plus} iconOnly variant="secondary" aria-label="Add" />
          <Button size={size} icon={settings} iconOnly variant="ghost" aria-label="Settings" />
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Loading Demo ----
function LoadingDemo() {
  return (
    <Section title="Loading" desc="Loading state replaces content with a spinner and disables the button.">
      {(['sm', 'md', 'lg'] as const).map(size => (
        <DemoRow key={size} label={size}>
          <Button size={size} loading>Loading</Button>
          <Button size={size} loading variant="secondary">Loading</Button>
          <Button size={size} loading variant="ghost">Loading</Button>
        </DemoRow>
      ))}
    </Section>
  );
}

// ---- Props Table ----
function PropsTable() {
  return (
    <Section title="Props" desc="Button component API.">
      <table className="token-table">
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>variant</code></td><td>primary | secondary | ghost</td><td>primary</td><td>Base visual style</td></tr>
          <tr><td><code>size</code></td><td>sm | md | lg</td><td>md</td><td>Size with corresponding padding/radius</td></tr>
          <tr><td><code>intent</code></td><td>error | warning | success | info</td><td>--</td><td>Status intent (overrides variant color)</td></tr>
          <tr><td><code>appearance</code></td><td>solid | subtle | outline</td><td>solid</td><td>How the intent color is applied</td></tr>
          <tr><td><code>shape</code></td><td>square | default | pill</td><td>default</td><td>Border-radius shape</td></tr>
          <tr><td><code>icon</code></td><td>string</td><td>--</td><td>Leading icon SVG innerHTML string</td></tr>
          <tr><td><code>iconOnly</code></td><td>boolean</td><td>false</td><td>Icon-only button (square aspect ratio)</td></tr>
          <tr><td><code>loading</code></td><td>boolean</td><td>false</td><td>Show loading spinner (replaces content, maintains width)</td></tr>
        </tbody>
      </table>
    </Section>
  );
}

// ---- Main ----
function ButtonDemos() {
  return (
    <>
      <VariantDemo />
      <SizeDemo />
      <IntentDemo />
      <ShapeDemo />
      <IconDemo />
      <IconOnlyDemo />
      <LoadingDemo />
      <PropsTable />
    </>
  );
}

export default ButtonDemos;

/** Blueprint target — default-props instance for measurement inspection */
export function BlueprintTarget() {
  return <Button>Button</Button>;
}
