var e=`import React, { useState, useCallback } from 'react';

// Import CSS
import '@primitives/animation/keyframes.css';
import '@primitives/animation/utilities.css';
import '@primitives/segmented-control/segmented-control.css';

// Import components
import { SlotMachine } from '@primitives/animation/SlotMachine';
import { Decipher } from '@primitives/animation/Decipher';
import { HighlightMatch } from '@primitives/animation/HighlightMatch';
import { Animate } from '@primitives/animation/Animate';
import { AnimatePresence } from '@primitives/animation/AnimatePresence';
import { useAnimation } from '@primitives/animation/useAnimation';
import { SegmentedControl } from '@primitives/segmented-control/SegmentedControl';

// Import token data for reference tables
import { duration, easing, transition, AnimationType, animationSupport } from '@tokens/animation';
import type { AnimationTypeName } from '@tokens/animation';

// ---- Helpers ----
function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="section">
      <h2 className="section__title">{title}</h2>
      <p className="section__desc">{desc}</p>
      {children}
    </div>
  );
}

function DemoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', padding: 'var(--sp-3) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', minWidth: '8rem', flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

function ReplayButton({ onReplay }: { onReplay: () => void }) {
  return (
    <button
      onClick={onReplay}
      style={{
        padding: 'var(--sp-2) var(--sp-4)',
        borderRadius: 'var(--shape-default)',
        border: '1px solid var(--color-border-default)',
        background: 'var(--color-bg-elevated)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm-size)',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      Replay
    </button>
  );
}

// ---- Entrance Animation Demos ----
function EntranceDemo({ name, label }: { name: string; label: string }) {
  const [key, setKey] = useState(0);
  return (
    <DemoRow label={label}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
        <div
          key={key}
          style={{
            padding: 'var(--sp-3) var(--sp-6)',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--shape-default)',
            fontSize: 'var(--text-sm-size)',
            animation: \`\${name} var(--duration-slow) var(--ease-out) both\`,
          }}
        >
          Animated element
        </div>
        <ReplayButton onReplay={() => setKey(k => k + 1)} />
      </div>
    </DemoRow>
  );
}

// ---- Attention Animation Demos ----
function AttentionDemo({ name, label, iterationCount = 'infinite', dur }: { name: string; label: string; iterationCount?: string; dur?: string }) {
  const [active, setActive] = useState(true);
  return (
    <DemoRow label={label}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
        <div
          style={{
            padding: 'var(--sp-3) var(--sp-6)',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--shape-default)',
            fontSize: 'var(--text-sm-size)',
            animation: active ? \`\${name} \${dur || 'var(--duration-slowest)'} var(--ease-default) \${iterationCount}\` : 'none',
          }}
        >
          Animated element
        </div>
        <button
          onClick={() => setActive(!active)}
          style={{
            padding: 'var(--sp-2) var(--sp-4)',
            borderRadius: 'var(--shape-default)',
            border: '1px solid var(--color-border-default)',
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-sm-size)',
            cursor: 'pointer',
          }}
        >
          {active ? 'Stop' : 'Start'}
        </button>
      </div>
    </DemoRow>
  );
}

// ---- SlotMachine Demo ----
function SlotMachineDemo() {
  const [key, setKey] = useState(0);
  const phrases = ['Hello, World!', 'Base Toolkit', 'Slot Machine', 'Design System'];
  const [phraseIdx, setPhraseIdx] = useState(0);

  const replay = useCallback(() => {
    setPhraseIdx(i => (i + 1) % phrases.length);
    setKey(k => k + 1);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
        <div style={{
          fontSize: 'var(--text-2xl-size)',
          fontWeight: 'var(--weight-bold)',
          padding: 'var(--sp-4)',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--shape-default)',
          minHeight: '3.5rem',
          display: 'flex',
          alignItems: 'center',
        }}>
          <SlotMachine key={key} text={phrases[phraseIdx]} charDuration={500} stagger={40} />
        </div>
        <ReplayButton onReplay={replay} />
      </div>
    </div>
  );
}

// ---- Decipher Demo ----
function DecipherDemo() {
  const [key, setKey] = useState(0);
  const [pattern, setPattern] = useState<'left-to-right' | 'right-to-left' | 'random' | 'center-out'>('left-to-right');
  const patterns: typeof pattern[] = ['left-to-right', 'right-to-left', 'random', 'center-out'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <SegmentedControl
        options={patterns.map(p => ({ value: p, label: p }))}
        value={pattern}
        onChange={(v) => { setPattern(v as typeof pattern); setKey(k => k + 1); }}
        mono
      />
      <div style={{
        fontSize: 'var(--text-2xl-size)',
        fontWeight: 'var(--weight-bold)',
        padding: 'var(--sp-4)',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--shape-default)',
        minHeight: '3.5rem',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Decipher key={key} text="Decrypting message..." duration={1800} pattern={pattern} scrambleSpeed={35} />
      </div>
    </div>
  );
}

// ---- HighlightMatch Demo ----
function HighlightMatchDemo() {
  const [query, setQuery] = useState('des');
  const text = 'Universal Design System Toolkit';

  // Simple fuzzy match: find indices where query chars appear in text
  const indices = React.useMemo(() => {
    const result: number[] = [];
    const lower = text.toLowerCase();
    const q = query.toLowerCase();
    let qi = 0;
    for (let i = 0; i < lower.length && qi < q.length; i++) {
      if (lower[i] === q[qi]) {
        result.push(i);
        qi++;
      }
    }
    return qi === q.length ? result : [];
  }, [query, text]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Type to search..."
        style={{
          padding: 'var(--sp-2) var(--sp-3)',
          borderRadius: 'var(--shape-default)',
          border: '1px solid var(--color-border-default)',
          background: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm-size)',
          outline: 'none',
          maxWidth: '16rem',
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', minWidth: '4rem' }}>accent</span>
          <span style={{ fontSize: 'var(--text-lg-size)' }}>
            <HighlightMatch text={text} indices={indices} variant="accent" />
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', minWidth: '4rem' }}>gradient</span>
          <span style={{ fontSize: 'var(--text-lg-size)' }}>
            <HighlightMatch text={text} indices={indices} variant="gradient" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ---- <Animate> Wrapper Demo ----
function AnimateWrapperDemo() {
  const animations = ['fade-in', 'slide-up', 'slide-down', 'scale-in', 'pop', 'pulse', 'shake', 'spin'];
  const [selected, setSelected] = useState('slide-up');
  const [key, setKey] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <SegmentedControl
        options={animations.map(a => ({ value: a, label: a }))}
        value={selected}
        onChange={(v) => { setSelected(v); setKey(k => k + 1); }}
        mono
      />
      <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
        <Animate key={key} animation={selected} duration="slow">
          <div style={{
            padding: 'var(--sp-4) var(--sp-6)',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--shape-default)',
            fontSize: 'var(--text-sm-size)',
          }}>
            Wrapped in {'<Animate>'}
          </div>
        </Animate>
        <ReplayButton onReplay={() => setKey(k => k + 1)} />
      </div>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', background: 'var(--color-bg-inset)', padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--shape-default)' }}>
        {'<Animate animation="' + selected + '" duration="slow">...</Animate>'}
      </code>
    </div>
  );
}

// ---- <AnimatePresence> Demo ----
function AnimatePresenceDemo() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <button
        onClick={() => setShow(s => !s)}
        style={{
          alignSelf: 'flex-start',
          padding: 'var(--sp-2) var(--sp-4)',
          borderRadius: 'var(--shape-default)',
          border: '1px solid var(--color-border-default)',
          background: show ? 'var(--color-error)' : 'var(--color-success)',
          color: '#fff',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm-size)',
          cursor: 'pointer',
        }}
      >
        {show ? 'Unmount (exit)' : 'Mount (enter)'}
      </button>
      <div style={{ minHeight: '4rem' }}>
        <AnimatePresence
          show={show}
          enter="slide-up"
          exit="fade-out"
          enterDuration="slow"
          exitDuration="normal"
        >
          <div style={{
            padding: 'var(--sp-4) var(--sp-6)',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-default)',
            borderRadius: 'var(--shape-default)',
            fontSize: 'var(--text-sm-size)',
          }}>
            I mount with slide-up and unmount with fade-out
          </div>
        </AnimatePresence>
      </div>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', background: 'var(--color-bg-inset)', padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--shape-default)' }}>
        {'<AnimatePresence show={show} enter="slide-up" exit="fade-out">...</AnimatePresence>'}
      </code>
    </div>
  );
}

// ---- Stagger Demo ----
function StaggerDemo() {
  const [key, setKey] = useState(0);

  const itemStyle: React.CSSProperties = {
    padding: 'var(--sp-3) var(--sp-4)',
    background: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border-default)',
    borderRadius: 'var(--shape-default)',
    fontSize: 'var(--text-sm-size)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--sp-2)' }}>React (stagger prop)</div>
          <Animate key={\`react-\${key}\`} animation="slide-up" stagger="80ms" as="div" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <div style={itemStyle}>Item 1</div>
            <div style={itemStyle}>Item 2</div>
            <div style={itemStyle}>Item 3</div>
            <div style={itemStyle}>Item 4</div>
            <div style={itemStyle}>Item 5</div>
          </Animate>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--sp-2)' }}>CSS (.anim-stagger + .anim-slide-up)</div>
          <div key={\`css-\${key}\`} className="anim-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <div className="anim-slide-up" style={itemStyle}>Item 1</div>
            <div className="anim-slide-up" style={itemStyle}>Item 2</div>
            <div className="anim-slide-up" style={itemStyle}>Item 3</div>
            <div className="anim-slide-up" style={itemStyle}>Item 4</div>
            <div className="anim-slide-up" style={itemStyle}>Item 5</div>
          </div>
        </div>
      </div>
      <ReplayButton onReplay={() => setKey(k => k + 1)} />
    </div>
  );
}

// ---- Viewport Trigger Demo ----
function ViewportDemo() {
  const [key, setKey] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <p style={{ fontSize: 'var(--text-sm-size)', color: 'var(--color-text-secondary)' }}>
        The element below uses <code>onVisible</code> — it animates when scrolled into view. Reset and scroll to see it again.
      </p>
      <Animate key={key} animation="slide-up" duration="slower" onVisible>
        <div style={{
          padding: 'var(--sp-6)',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--shape-default)',
          textAlign: 'center',
          fontSize: 'var(--text-lg-size)',
          fontWeight: 'var(--weight-semibold)',
        }}>
          I animated when you scrolled here
        </div>
      </Animate>
      <ReplayButton onReplay={() => setKey(k => k + 1)} />
    </div>
  );
}

// ---- useAnimation Hook Demo ----
function UseAnimationDemo() {
  const { state, play, reset, playKey, ref } = useAnimation({ autoPlay: false });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
        <button onClick={play} style={{ padding: 'var(--sp-2) var(--sp-4)', borderRadius: 'var(--shape-default)', border: '1px solid var(--color-border-default)', background: 'var(--color-text-primary)', color: 'var(--color-bg-primary)', cursor: 'pointer', fontSize: 'var(--text-sm-size)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-medium)' }}>
          play()
        </button>
        <button onClick={reset} style={{ padding: 'var(--sp-2) var(--sp-4)', borderRadius: 'var(--shape-default)', border: '1px solid var(--color-border-default)', background: 'var(--color-bg-elevated)', color: 'var(--color-text-primary)', cursor: 'pointer', fontSize: 'var(--text-sm-size)', fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-medium)' }}>
          reset()
        </button>
        <span style={{ padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--shape-pill)', background: 'var(--color-bg-inset)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', display: 'flex', alignItems: 'center' }}>
          state: {state}
        </span>
      </div>
      <div
        key={playKey}
        ref={ref}
        style={{
          padding: 'var(--sp-4) var(--sp-6)',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border-default)',
          borderRadius: 'var(--shape-default)',
          fontSize: 'var(--text-sm-size)',
          animation: state === 'running' ? 'pop var(--duration-slow) var(--ease-bounce) both' : 'none',
          opacity: state === 'idle' ? 0.4 : 1,
          transition: 'opacity var(--transition-normal)',
        }}
      >
        Controlled by useAnimation hook
      </div>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', background: 'var(--color-bg-inset)', padding: 'var(--sp-2) var(--sp-3)', borderRadius: 'var(--shape-default)', whiteSpace: 'pre' }}>
{\`const { state, play, reset, playKey, ref } = useAnimation({ autoPlay: false });
<div key={playKey} ref={ref} style={{ animation: state === 'running' ? '...' : 'none' }} />\`}
      </code>
    </div>
  );
}

// ---- CSS Utilities Demo ----
function CSSUtilitiesDemo() {
  const [key, setKey] = useState(0);
  const examples = [
    { classes: 'anim-fade-in', label: '.anim-fade-in' },
    { classes: 'anim-slide-up', label: '.anim-slide-up' },
    { classes: 'anim-pop', label: '.anim-pop' },
    { classes: 'anim-scale-in anim-slower', label: '.anim-scale-in .anim-slower' },
    { classes: 'anim-slide-up anim-ease-bounce', label: '.anim-slide-up .anim-ease-bounce' },
    { classes: 'anim-pulse', label: '.anim-pulse (loops)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
      {examples.map(({ classes, label }) => (
        <div key={\`\${label}-\${key}\`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', padding: 'var(--sp-2) 0', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-tertiary)', minWidth: '16rem', flexShrink: 0 }}>{label}</code>
          <div
            className={classes}
            style={{
              padding: 'var(--sp-2) var(--sp-4)',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--shape-default)',
              fontSize: 'var(--text-sm-size)',
            }}
          >
            Element
          </div>
        </div>
      ))}
      <ReplayButton onReplay={() => setKey(k => k + 1)} />
    </div>
  );
}

// ---- Main App ----
function AnimationDemos() {
  return (
    <>
      {/* ---- Tokens ---- */}
      <Section title="Duration" desc="Timing tokens for all animations and transitions. Reference via CSS custom properties.">
        {Object.entries(duration).map(([key, val]) => (
          <DemoRow key={key} label={key.replace('duration-', '')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>{val}</code>
              <div style={{ height: '0.25rem', background: 'var(--color-accent)', borderRadius: 'var(--shape-pill)', width: \`\${Math.max(parseInt(val) / 5, 4)}px\` }} />
            </div>
          </DemoRow>
        ))}
      </Section>

      <Section title="Easing" desc="Cubic-bezier curves for natural motion. Use bounce and spring for playful interactions.">
        {Object.entries(easing).map(([key, val]) => (
          <DemoRow key={key} label={key.replace('ease-', '')}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>{val}</code>
          </DemoRow>
        ))}
      </Section>

      <Section title="Transition Presets" desc="Composed duration + easing pairs. Drop into any transition property.">
        {Object.entries(transition).map(([key, val]) => (
          <DemoRow key={key} label={key.replace('transition-', '')}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs-size)', color: 'var(--color-text-secondary)' }}>{val}</code>
          </DemoRow>
        ))}
      </Section>

      {/* ---- Entrance Animations ---- */}
      <Section title="Entrance" desc="One-shot animations for elements entering the viewport or appearing.">
        <EntranceDemo name="fade-in" label="fade-in" />
        <EntranceDemo name="slide-up" label="slide-up" />
        <EntranceDemo name="slide-down" label="slide-down" />
        <EntranceDemo name="slide-left" label="slide-left" />
        <EntranceDemo name="slide-right" label="slide-right" />
        <EntranceDemo name="scale-in" label="scale-in" />
        <EntranceDemo name="pop" label="pop" />
      </Section>

      {/* ---- Attention ---- */}
      <Section title="Continuous / Attention" desc="Looping animations to draw the eye or indicate state.">
        <AttentionDemo name="pulse" label="pulse" dur="1500ms" />
        <AttentionDemo name="shake" label="shake" iterationCount="1" dur="400ms" />
        <AttentionDemo name="spin" label="spin" dur="1000ms" />
      </Section>

      {/* ---- Text Animations ---- */}
      <Section title="Slot Machine" desc="Characters roll through random values before settling on their final character. Staggered left-to-right.">
        <SlotMachineDemo />
      </Section>

      <Section title="Decipher" desc="Text starts fully scrambled, then progressively resolves character by character. Choose a resolve pattern.">
        <DecipherDemo />
      </Section>

      <Section title="Highlight Match" desc="Matched characters are highlighted with accent color or animated gradient. Type in the input to see fuzzy matching.">
        <HighlightMatchDemo />
      </Section>

      {/* ---- <Animate> Wrapper ---- */}
      <Section title="<Animate> Wrapper" desc="Generic wrapper that applies any animation to its children. Picks sensible defaults for duration, easing, and iteration based on animation category.">
        <AnimateWrapperDemo />
      </Section>

      {/* ---- <AnimatePresence> ---- */}
      <Section title="<AnimatePresence>" desc="Mount/unmount lifecycle with enter and exit animations. When show becomes false, the exit animation plays before the element is removed from the DOM.">
        <AnimatePresenceDemo />
      </Section>

      {/* ---- Stagger ---- */}
      <Section title="Stagger" desc="Animate children with incremental delays for a cascading entrance. Works with both the React wrapper and CSS utility classes.">
        <StaggerDemo />
      </Section>

      {/* ---- Viewport Trigger ---- */}
      <Section title="Viewport Trigger" desc="Set onVisible to animate when the element scrolls into view. Uses IntersectionObserver — fires once.">
        <ViewportDemo />
      </Section>

      {/* ---- useAnimation Hook ---- */}
      <Section title="useAnimation Hook" desc="Programmatic control: play(), reset(), state tracking, and animationend detection.">
        <UseAnimationDemo />
      </Section>

      {/* ---- CSS Utilities ---- */}
      <Section title="CSS Utility Classes" desc="For non-React usage. Apply classes directly to any HTML element. Combine animation + duration + easing modifiers.">
        <CSSUtilitiesDemo />
      </Section>

      {/* ---- Animation Enum ---- */}
      <Section title="Animation Enum" desc="The canonical list of animation types. Every component references these by name — not every component supports every animation.">
        <table className="token-table">
          <thead><tr><th>Name</th><th>Value</th><th>Category</th></tr></thead>
          <tbody>
            {Object.entries(AnimationType).map(([key, val]) => {
              let cat = 'generic';
              if (key.includes('FADE') || key.includes('SLIDE') || key.includes('SCALE') || key === 'POP') cat = key.includes('OUT') ? 'exit' : 'entrance';
              else if (['PULSE', 'SHAKE', 'SPIN', 'PING'].includes(key)) cat = 'attention';
              else if (['SLOT_MACHINE', 'DECIPHER', 'TYPEWRITER', 'HIGHLIGHT_MATCH'].includes(key)) cat = 'text';
              else if (['COLLAPSE', 'EXPAND'].includes(key)) cat = 'layout';
              return (
                <tr key={key}>
                  <td><code>{key}</code></td>
                  <td><code>{val}</code></td>
                  <td style={{ color: 'var(--color-text-tertiary)' }}>{cat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Section>

      {/* ---- Component Support ---- */}
      <Section title="Component Support Matrix" desc="Which animations each component type supports.">
        <table className="token-table">
          <thead>
            <tr>
              <th>Animation</th>
              {Object.keys(animationSupport).map(comp => <th key={comp}>{comp}</th>)}
            </tr>
          </thead>
          <tbody>
            {(Object.values(AnimationType) as AnimationTypeName[]).map(anim => (
              <tr key={anim}>
                <td><code>{anim}</code></td>
                {Object.entries(animationSupport).map(([comp, supported]) => (
                  <td key={comp} style={{ textAlign: 'center', color: supported.includes(anim) ? 'var(--color-success)' : 'var(--color-text-disabled)' }}>
                    {supported.includes(anim) ? '●' : '–'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
}

// ---- Mount ----

export default AnimationDemos;
`;export{e as default};