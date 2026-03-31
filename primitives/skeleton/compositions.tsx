import React from 'react';
import type { CSSProperties } from 'react';
import { Skeleton } from './Skeleton.js';
import type { SkeletonProps } from './Skeleton.js';

// ---- SkeletonText ----

export interface SkeletonTextProps {
  /** Text size preset (default: 'text-base') */
  size?: SkeletonProps['size'];
  /** Override width */
  width?: string | number;
  /** Additional CSS class */
  className?: string;
  style?: CSSProperties;
}

/** Single line of skeleton text matching a type scale size. */
export function SkeletonText({ size = 'text-base', width, className, style }: SkeletonTextProps) {
  return (
    <Skeleton
      size={size}
      shape="default"
      width={width}
      className={className}
      style={style}
      aria-label="Loading text"
    />
  );
}

// ---- SkeletonAvatar ----

export interface SkeletonAvatarProps {
  /** 'avatar-sm' (24px), 'avatar' (40px), 'avatar-lg' (56px). Default: 'avatar' */
  size?: 'avatar-sm' | 'avatar' | 'avatar-lg';
  className?: string;
  style?: CSSProperties;
}

/** Circular avatar placeholder. */
export function SkeletonAvatar({ size = 'avatar', className, style }: SkeletonAvatarProps) {
  return (
    <Skeleton
      size={size}
      shape="circle"
      className={className}
      style={style}
      aria-label="Loading avatar"
    />
  );
}

// ---- SkeletonCard ----

export interface SkeletonCardProps {
  /** Number of text lines inside the card (default: 3) */
  lines?: number;
  /** Show avatar in the card header (default: false) */
  avatar?: boolean;
  /** Card width (default: 100%) */
  width?: string | number;
  className?: string;
  style?: CSSProperties;
}

/** Card skeleton with optional avatar header and text lines. */
export function SkeletonCard({
  lines = 3,
  avatar = false,
  width,
  className = '',
  style,
}: SkeletonCardProps) {
  const cardStyle: CSSProperties = {
    padding: 'var(--sp-4)',
    borderRadius: 'var(--shape-default)',
    background: 'var(--color-bg-elevated)',
    border: '1px solid var(--color-border-default)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--sp-3)',
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    ...style,
  };

  return (
    <div className={`skeleton-card ${className}`} style={cardStyle} role="status" aria-label="Loading card" aria-busy="true">
      {avatar && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <SkeletonAvatar size="avatar" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            <Skeleton size="text-sm" width="60%" />
            <Skeleton size="text-xs" width="40%" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          size="text-sm"
          width={i === lines - 1 ? '65%' : '100%'}
          full={i !== lines - 1}
        />
      ))}
    </div>
  );
}

// ---- SkeletonListItem ----

export interface SkeletonListItemProps {
  /** Show avatar (default: true) */
  avatar?: boolean;
  /** Show secondary text line (default: true) */
  subtitle?: boolean;
  /** Show trailing action placeholder (default: false) */
  trailing?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** List item skeleton — avatar + text + optional trailing action. */
export function SkeletonListItem({
  avatar = true,
  subtitle = true,
  trailing = false,
  className = '',
  style,
}: SkeletonListItemProps) {
  const itemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--sp-3)',
    padding: 'var(--sp-3) 0',
    ...style,
  };

  return (
    <div className={`skeleton-list-item ${className}`} style={itemStyle} role="status" aria-label="Loading list item" aria-busy="true">
      {avatar && <SkeletonAvatar size="avatar" />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
        <Skeleton size="text-sm" width="55%" />
        {subtitle && <Skeleton size="text-xs" width="35%" />}
      </div>
      {trailing && <Skeleton size="icon" />}
    </div>
  );
}
