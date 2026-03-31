import React from 'react';

// ---- Types ----

type SpacingToken = '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';

export interface SpacerProps {
  /** Fixed size. When omitted, spacer grows to fill available space. */
  size?: SpacingToken;
}

/**
 * Spacer primitive.
 *
 * Flexible or fixed-size spacer for flex layouts.
 */
export function Spacer({ size }: SpacerProps) {
  const classes = [
    'spacer',
    size ? `spacer--${size}` : '',
  ].filter(Boolean).join(' ');

  return <div className={classes} aria-hidden="true" />;
}

export default Spacer;
