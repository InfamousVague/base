import { createContext, useContext } from 'react';

type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  size: RadioSize;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  return useContext(RadioGroupContext);
}
