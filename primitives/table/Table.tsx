import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

// ---- Types ----

export interface TableColumn<T> {
  /** Object key to access the cell value */
  key: string;
  /** Header label */
  header: string;
  /** CSS width value */
  width?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom cell renderer */
  render?: (value: any, row: T, index: number) => ReactNode;
}

export interface TableProps<T> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Row data */
  data: T[];
  /** Unique key extractor per row */
  rowKey: (row: T) => string;
  /** Alternate row background */
  striped?: boolean;
  /** Reduced padding */
  compact?: boolean;
  /** Sticky header on scroll */
  stickyHeader?: boolean;
  /** Row click handler */
  onRowClick?: (row: T) => void;
  /** Message when data is empty */
  emptyMessage?: string;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Table primitive.
 *
 * Data table with typed columns, optional striping, compact mode, and sticky header.
 */
export function Table<T>({
  columns,
  data,
  rowKey,
  striped = false,
  compact = false,
  stickyHeader = false,
  onRowClick,
  emptyMessage = 'No data',
  className = '',
  style,
}: TableProps<T>) {
  const wrapperClasses = ['table-wrapper', className].filter(Boolean).join(' ');

  const tableClasses = [
    'table',
    striped ? 'table--striped' : '',
    compact ? 'table--compact' : '',
    stickyHeader ? 'table--sticky' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} style={style}>
      <table className={tableClasses}>
        <thead className="table__head">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={[
                  'table__th',
                  col.align === 'center' ? 'table__th--center' : '',
                  col.align === 'right' ? 'table__th--right' : '',
                ].filter(Boolean).join(' ')}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="table__empty" colSpan={columns.length}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={rowKey(row)}
                className={[
                  'table__tr',
                  onRowClick ? 'table__tr--clickable' : '',
                ].filter(Boolean).join(' ')}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => {
                  const value = (row as any)[col.key];
                  return (
                    <td
                      key={col.key}
                      className={[
                        'table__td',
                        col.align === 'center' ? 'table__td--center' : '',
                        col.align === 'right' ? 'table__td--right' : '',
                      ].filter(Boolean).join(' ')}
                    >
                      {col.render ? col.render(value, row, index) : value}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
