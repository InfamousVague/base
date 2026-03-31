import { useState, useCallback, useRef } from 'react';

// ---- Types ----

type ToastVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  message: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

export interface ToastOptions {
  variant?: ToastVariant;
  message: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

export interface UseToastReturn {
  toasts: ToastItem[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

let counter = 0;

/**
 * useToast — hook for managing toast state.
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
    setToasts([]);
  }, []);

  const toast = useCallback((options: ToastOptions): string => {
    const id = `toast-${++counter}`;
    const duration = options.duration ?? 4000;

    const item: ToastItem = {
      id,
      variant: options.variant ?? 'neutral',
      message: options.message,
      action: options.action,
      duration,
    };
    setToasts((prev) => [item, ...prev]);

    if (duration > 0) {
      const timer = setTimeout(() => dismiss(id), duration);
      timers.current.set(id, timer);
    }

    return id;
  }, [dismiss]);

  return { toasts, toast, dismiss, dismissAll };
}
