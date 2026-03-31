import React from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type TimelineColor = 'accent' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface TimelineItem {
  /** Event title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional timestamp label */
  timestamp?: string;
  /** Optional icon — SVG innerHTML string */
  icon?: string;
  /** Indicator color */
  color?: TimelineColor;
}

export interface TimelineProps {
  /** Array of timeline events */
  items: TimelineItem[];
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Timeline primitive.
 *
 * Renders a vertical event timeline with dots/icons at each event,
 * connected by a vertical line.
 */
export function Timeline({
  items,
  skeleton: showSkeleton = false,
  className = '',
  style,
}: TimelineProps) {
  if (showSkeleton) {
    return (
      <div className={['timeline', className].filter(Boolean).join(' ')} style={style}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="timeline__item" style={{ display: 'flex', gap: 'var(--sp-3)' }}>
            <Skeleton shape="circle" width="2rem" height="2rem" />
            <div style={{ flex: 1, paddingTop: 'var(--sp-1)' }}>
              <Skeleton size="text-sm" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const classes = ['timeline', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {items.map((item, i) => {
        const indicatorClasses = [
          'timeline__indicator',
          item.color ? `timeline__indicator--${item.color}` : '',
        ].filter(Boolean).join(' ');

        return (
          <div key={i} className="timeline__item">
            <div className={indicatorClasses}>
              {item.icon && <Icon icon={item.icon} size="xs" />}
            </div>
            <div className="timeline__line" />
            <div className="timeline__content">
              <div className="timeline__title">{item.title}</div>
              {item.description && <div className="timeline__description">{item.description}</div>}
              {item.timestamp && <div className="timeline__timestamp">{item.timestamp}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Timeline;
