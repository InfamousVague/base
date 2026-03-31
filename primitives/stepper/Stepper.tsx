import React from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { check } from '../icon/icons/check.js';

// ---- Types ----

type StepperOrientation = 'horizontal' | 'vertical';

export interface StepItem {
  /** Step label */
  label: string;
  /** Optional step description */
  description?: string;
}

export interface StepperProps {
  /** Array of step definitions */
  steps: StepItem[];
  /** Currently active step (0-indexed) */
  activeStep: number;
  /** Layout direction */
  orientation?: StepperOrientation;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * Stepper — step indicator showing progress through a multi-step flow.
 *
 * Steps before activeStep are completed (accent bg + check icon),
 * the activeStep is active (accent border), and steps after are upcoming.
 */
export function Stepper({
  steps,
  activeStep,
  orientation = 'horizontal',
  className = '',
  style,
}: StepperProps) {
  const classes = [
    'stepper',
    orientation === 'vertical' ? 'stepper--vertical' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} aria-label="Progress">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        const indicatorClass = [
          'stepper__indicator',
          isCompleted ? 'stepper__indicator--completed' : '',
          isActive ? 'stepper__indicator--active' : '',
          !isCompleted && !isActive ? 'stepper__indicator--upcoming' : '',
        ].filter(Boolean).join(' ');

        const connectorClass = [
          'stepper__connector',
          isCompleted ? 'stepper__connector--completed' : '',
        ].filter(Boolean).join(' ');

        return (
          <div className="stepper__step" key={index}>
            <span className={indicatorClass} aria-current={isActive ? 'step' : undefined}>
              {isCompleted ? <Icon icon={check} size="sm" /> : index + 1}
            </span>
            <div className="stepper__content">
              <span className="stepper__label">{step.label}</span>
              {step.description && (
                <span className="stepper__description">{step.description}</span>
              )}
            </div>
            {index < steps.length - 1 && <div className={connectorClass} />}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
