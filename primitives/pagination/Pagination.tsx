import type { CSSProperties } from 'react';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps {
  /** Current active page (1-indexed) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Optional total item count to display */
  totalItems?: number;
  /** Component size */
  size?: PaginationSize;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  size = 'md',
  className = '',
  style,
}: PaginationProps) {
  const safePage = Math.max(1, Math.min(page, totalPages));
  const disabled = totalPages <= 1;

  const classes = [
    'pagination',
    `pagination--${size}`,
    disabled ? 'pagination--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <nav className={classes} style={style} aria-label="Pagination">
      <button
        className="pagination__btn"
        disabled={disabled || safePage <= 1}
        onClick={() => onPageChange(1)}
        aria-label="First page"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M8.5 3L4.5 7L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.5 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      <button
        className="pagination__btn"
        disabled={disabled || safePage <= 1}
        onClick={() => onPageChange(safePage - 1)}
        aria-label="Previous page"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M8.5 3L4.5 7L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <span className="pagination__info">
        {safePage} / {totalPages}
      </span>

      <button
        className="pagination__btn"
        disabled={disabled || safePage >= totalPages}
        onClick={() => onPageChange(safePage + 1)}
        aria-label="Next page"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className="pagination__btn"
        disabled={disabled || safePage >= totalPages}
        onClick={() => onPageChange(totalPages)}
        aria-label="Last page"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.5 3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {totalItems != null && (
        <span className="pagination__count">{totalItems} items</span>
      )}
    </nav>
  );
}
