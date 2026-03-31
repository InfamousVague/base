/**
 * ComponentPreview — Renders a tiny live preview of a Base primitive
 * inside the overview page cards.
 *
 * Each component gets a hand-crafted minimal render.
 * Falls back to null for components without a preview.
 */

import React from 'react';

// Import only CSS needed (lightweight — these are shared across the site already)
import '@primitives/button/button.css';
import '@primitives/input/input.css';
import '@primitives/badge/badge.css';
import '@primitives/toggle/toggle.css';
import '@primitives/checkbox/checkbox.css';
import '@primitives/radio/radio.css';
import '@primitives/spinner/spinner.css';
import '@primitives/progress/progress.css';
import '@primitives/avatar/avatar.css';
import '@primitives/separator/separator.css';
import '@primitives/skeleton/skeleton.css';
import '@primitives/chip/chip.css';
import '@primitives/tag/tag.css';
import '@primitives/beacon/beacon.css';
import '@primitives/slider/slider.css';
import '@primitives/tabs/tabs.css';
import '@primitives/icon/icon.css';
import '@primitives/kbd/kbd.css';
import '@primitives/tooltip/tooltip.css';
import '@primitives/card/card.css';
import '@primitives/segmented-control/segmented-control.css';
import '@primitives/indicator/indicator.css';
import '@primitives/meter/meter.css';
import '@primitives/circular-progress/circular-progress.css';

import { Button } from '@primitives/button/Button';
import { Input } from '@primitives/input/Input';
import { Badge } from '@primitives/badge/Badge';
import { Toggle } from '@primitives/toggle/Toggle';
import { Checkbox } from '@primitives/checkbox/Checkbox';
import { Radio } from '@primitives/radio/Radio';
import { Spinner } from '@primitives/spinner/Spinner';
import { Progress } from '@primitives/progress/Progress';
import { Avatar } from '@primitives/avatar/Avatar';
import { Separator } from '@primitives/separator/Separator';
import { Skeleton } from '@primitives/skeleton/Skeleton';
import { Chip } from '@primitives/chip/Chip';
import { Tag } from '@primitives/tag/Tag';
import { Beacon } from '@primitives/beacon/Beacon';
import { Slider } from '@primitives/slider/Slider';
import { Tabs, TabList, Tab } from '@primitives/tabs/Tabs';
import { Icon } from '@primitives/icon/Icon';
import { Kbd } from '@primitives/kbd/Kbd';
import { Card } from '@primitives/card/Card';
import { SegmentedControl } from '@primitives/segmented-control/SegmentedControl';
import { Indicator } from '@primitives/indicator/Indicator';
import { Meter } from '@primitives/meter/Meter';
import { CircularProgress } from '@primitives/circular-progress/CircularProgress';
import { star } from '@primitives/icon/icons/star';
import { heart } from '@primitives/icon/icons/heart';

// Preview styling is handled by .overview-card__preview CSS class

const previews: Record<string, React.ReactNode> = {
  button: <Button size="sm">Button</Button>,
  input: <Input placeholder="Type..." style={{ width: 100, fontSize: 11 }} />,
  badge: <div style={{ display: 'flex', gap: 4 }}><Badge>New</Badge><Badge intent="success">OK</Badge></div>,
  toggle: <Toggle defaultChecked />,
  checkbox: <div style={{ display: 'flex', gap: 6 }}><Checkbox defaultChecked /><Checkbox /></div>,
  radio: <div style={{ display: 'flex', gap: 6 }}><Radio name="prev" defaultChecked /><Radio name="prev" /></div>,
  spinner: <Spinner size="sm" />,
  progress: <Progress value={65} style={{ width: 80 }} />,
  avatar: <Avatar name="AB" size="sm" />,
  separator: <Separator style={{ width: 80 }} />,
  skeleton: <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 80 }}><Skeleton style={{ height: 8, borderRadius: 4 }} /><Skeleton style={{ height: 8, width: '60%', borderRadius: 4 }} /></div>,
  chip: <div style={{ display: 'flex', gap: 4 }}><Chip>Label</Chip><Chip variant="outlined">Tag</Chip></div>,
  tag: <div style={{ display: 'flex', gap: 4 }}><Tag>v1.0</Tag><Tag intent="success">New</Tag></div>,
  beacon: <Beacon />,
  slider: <Slider defaultValue={50} style={{ width: 80 }} />,
  icon: <div style={{ display: 'flex', gap: 6 }}><Icon icon={star} size="sm" /><Icon icon={heart} size="sm" /></div>,
  kbd: <div style={{ display: 'flex', gap: 4 }}><Kbd>⌘</Kbd><Kbd>K</Kbd></div>,
  card: <Card style={{ width: 80, padding: 6, fontSize: 9 }}>Card</Card>,
  'segmented-control': <SegmentedControl options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]} value="a" onChange={() => {}} />,
  indicator: <Indicator status="online" />,
  meter: <Meter value={72} style={{ width: 80 }} />,
  'circular-progress': <CircularProgress value={65} size="sm" />,
  text: <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-primary)' }}>Aa Bb Cc</span>,
  textarea: <div style={{ width: 80, height: 28, border: '1px solid var(--color-border-default)', borderRadius: 4, background: 'var(--color-bg-primary)', fontSize: 9, padding: 4, color: 'var(--color-text-tertiary)' }}>Text...</div>,
  select: <div style={{ width: 80, height: 24, border: '1px solid var(--color-border-default)', borderRadius: 4, background: 'var(--color-bg-primary)', fontSize: 9, padding: '3px 6px', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>Select <span style={{ opacity: 0.4 }}>▾</span></div>,
  tooltip: <div style={{ background: 'var(--color-bg-inverted)', color: 'var(--color-text-inverted)', fontSize: 9, padding: '3px 8px', borderRadius: 4 }}>Tooltip</div>,
  image: <div style={{ width: 48, height: 32, borderRadius: 4, background: 'linear-gradient(135deg, var(--gray-4), var(--gray-6))' }} />,
  tabs: <div style={{ display: 'flex', gap: 8, fontSize: 10, borderBottom: '1px solid var(--color-border-default)', paddingBottom: 2 }}><span style={{ borderBottom: '2px solid var(--accent-6)', paddingBottom: 2, color: 'var(--color-text-primary)' }}>Tab 1</span><span style={{ color: 'var(--color-text-tertiary)' }}>Tab 2</span></div>,
};

interface ComponentPreviewProps {
  slug: string;
}

export function ComponentPreview({ slug }: ComponentPreviewProps) {
  const preview = previews[slug];

  return (
    <div className="overview-card__preview">
      {preview || <span style={{ fontSize: 'var(--text-xs-size)', color: 'var(--color-text-disabled)' }}>{slug}</span>}
    </div>
  );
}
