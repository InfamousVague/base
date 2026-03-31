import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { chevronLeft } from '../icon/icons/chevron-left.js';
import { chevronRight } from '../icon/icons/chevron-right.js';

// ---- Types ----

export interface CarouselProps {
  /** Slide elements */
  children: ReactNode;
  /** Auto-advance slides */
  autoPlay?: boolean;
  /** Auto-advance interval in milliseconds */
  interval?: number;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show prev/next arrow buttons */
  showArrows?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Carousel primitive.
 *
 * Renders children as slides in a horizontal container with
 * left/right arrow buttons and dot indicators.
 */
export function Carousel({
  children,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  skeleton: showSkeleton = false,
  className = '',
  style,
}: CarouselProps) {
  if (showSkeleton) {
    return <Skeleton width="100%" height="12rem" shape="default" className={className} style={style} />;
  }

  const slides = React.Children.toArray(children);
  const count = slides.length;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % count) + count) % count);
  }, [count]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    timerRef.current = setInterval(goNext, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, interval, goNext, count]);

  const classes = ['carousel', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      <div
        className="carousel__track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="carousel__slide">
            {slide}
          </div>
        ))}
      </div>

      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev"
            onClick={goPrev}
            aria-label="Previous slide"
          >
            <Icon icon={chevronLeft} size="sm" />
          </button>
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next"
            onClick={goNext}
            aria-label="Next slide"
          >
            <Icon icon={chevronRight} size="sm" />
          </button>
        </>
      )}

      {showDots && count > 1 && (
        <div className="carousel__dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`carousel__dot ${i === current ? 'carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
