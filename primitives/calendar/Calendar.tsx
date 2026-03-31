import React, { useState, useMemo, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { chevronLeft } from '../icon/icons/chevron-left.js';
import { chevronRight } from '../icon/icons/chevron-right.js';

// ---- Types ----

export interface CalendarProps {
  /** Currently selected date */
  value?: Date;
  /** Callback when a date is selected */
  onChange?: (date: Date) => void;
  /** Earliest selectable date */
  minDate?: Date;
  /** Latest selectable date */
  maxDate?: Date;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Calendar primitive.
 *
 * Renders a month-view calendar grid with prev/next month navigation.
 * Days of the current month are clickable. Days outside the min/max
 * range are disabled. Today is highlighted.
 */
export function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  skeleton: showSkeleton = false,
  className = '',
  style,
}: CalendarProps) {
  if (showSkeleton) {
    return <Skeleton width="18rem" height="16rem" shape="default" className={className} style={style} />;
  }

  const today = new Date();
  const [viewDate, setViewDate] = useState(() => {
    const d = value ?? today;
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  const { year, month } = viewDate;

  const days = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const cells: Array<{ date: Date; outside: boolean }> = [];

    // Leading empty cells from previous month
    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ date: new Date(year, month - 1, prevMonthDays - i), outside: true });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(year, month, d), outside: false });
    }

    // Trailing cells to fill last row
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let d = 1; d <= remaining; d++) {
        cells.push({ date: new Date(year, month + 1, d), outside: true });
      }
    }

    return cells;
  }, [year, month]);

  const handlePrev = useCallback(() => {
    setViewDate((prev) => {
      const m = prev.month - 1;
      return m < 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: m };
    });
  }, []);

  const handleNext = useCallback(() => {
    setViewDate((prev) => {
      const m = prev.month + 1;
      return m > 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: m };
    });
  }, []);

  const handleDayClick = useCallback((date: Date) => {
    onChange?.(date);
  }, [onChange]);

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  const monthLabel = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

  const classes = ['calendar', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <div className="calendar__header">
        <button type="button" className="calendar__nav-btn" onClick={handlePrev} aria-label="Previous month">
          <Icon icon={chevronLeft} size="sm" />
        </button>
        <span className="calendar__title">{monthLabel}</span>
        <button type="button" className="calendar__nav-btn" onClick={handleNext} aria-label="Next month">
          <Icon icon={chevronRight} size="sm" />
        </button>
      </div>
      <div className="calendar__weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar__grid" role="grid">
        {days.map(({ date, outside }, i) => {
          const isToday = isSameDay(date, today);
          const isSelected = value ? isSameDay(date, value) : false;
          const disabled = outside || isDisabled(date);

          const dayClasses = [
            'calendar__day',
            isToday ? 'calendar__day--today' : '',
            isSelected ? 'calendar__day--selected' : '',
            outside ? 'calendar__day--outside' : '',
            disabled ? 'calendar__day--disabled' : '',
          ].filter(Boolean).join(' ');

          return (
            <button
              key={i}
              type="button"
              className={dayClasses}
              onClick={() => !disabled && handleDayClick(date)}
              disabled={disabled}
              aria-label={date.toDateString()}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
