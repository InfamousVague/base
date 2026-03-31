import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Navigation URL */
  href?: string;
  /** Click handler */
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** Breadcrumb items — last item is treated as current page */
  items: BreadcrumbItem[];
  /** Custom separator node (default '/') */
  separator?: ReactNode;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Breadcrumb — navigation breadcrumb trail.
 *
 * Renders a list of links with separators. Last item is the current page.
 */
export function Breadcrumb({
  items,
  separator = '/',
  skeleton = false,
  className = '',
  style,
}: BreadcrumbProps) {
  if (skeleton) {
    return (
      <nav className={`breadcrumb ${className}`.trim()} style={style} aria-label="Breadcrumb">
        <Skeleton size="text-sm" width="4rem" />
        <span className="breadcrumb__separator">{separator}</span>
        <Skeleton size="text-sm" width="4rem" />
        <span className="breadcrumb__separator">{separator}</span>
        <Skeleton size="text-sm" width="4rem" />
      </nav>
    );
  }

  const classes = [
    'breadcrumb',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={classes} style={style} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="breadcrumb__separator" aria-hidden="true">
                {separator}
              </span>
            )}
            {isLast ? (
              <span className="breadcrumb__item breadcrumb__item--current" aria-current="page">
                {item.label}
              </span>
            ) : item.href ? (
              <a
                className="breadcrumb__item"
                href={item.href}
                onClick={item.onClick}
              >
                {item.label}
              </a>
            ) : (
              <button
                className="breadcrumb__item"
                onClick={item.onClick}
                type="button"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
