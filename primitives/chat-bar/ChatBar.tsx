import { useEffect, useRef, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '../icon/Icon.js';
import { arrowUp } from '../icon/icons/arrow-up.js';
import { Spinner } from '../spinner/Spinner.js';

// ---- Types ----

type ChatBarSize = 'sm' | 'md' | 'lg';
type ChatBarVariant = 'outline' | 'filled' | 'ghost';
type ChatBarShape = 'square' | 'default' | 'pill';

export interface ChatBarProps {
  /** Current input value (controlled). */
  value: string;
  /** Called on every keystroke. */
  onChange: (value: string) => void;
  /** Called when the user submits (Enter without shift, OR clicks send). */
  onSubmit: (value: string) => void;
  /** Placeholder text for the empty input. */
  placeholder?: string;
  /** Size with corresponding padding / radius / font-size. */
  size?: ChatBarSize;
  /** Visual variant. */
  variant?: ChatBarVariant;
  /** Border-radius shape. `default` rounds the corners; `pill`
   *  fully rounds the bar; `square` keeps it flat. */
  shape?: ChatBarShape;
  /** Maximum height the input grows to before scrolling internally.
   *  Defaults to 200px. */
  maxHeight?: number;
  /** Disable input + send. Use during connection loss / setup. */
  disabled?: boolean;
  /** True while the LLM is generating — disables submit and
   *  swaps the send button for a spinner so the user knows
   *  the request is in flight. */
  sending?: boolean;
  /** Optional content slot on the LEFT side of the bar — useful
   *  for attach / mention triggers / tool toggles. */
  startSlot?: ReactNode;
  /** Optional content slot to the LEFT of the send button — useful
   *  for stop / cancel actions when `sending` is true. */
  endSlot?: ReactNode;
  /** Auto-focus the input on mount. */
  autoFocus?: boolean;
  /** Optional aria-label for the textarea. Defaults to the
   *  placeholder when omitted. */
  ariaLabel?: string;
  /** Additional CSS class names — applied to the outer wrapper. */
  className?: string;
  /** Additional inline styles on the outer wrapper. */
  style?: CSSProperties;
}

/**
 * ChatBar primitive.
 *
 * Single-row chat input with auto-resizing textarea, send button,
 * and optional left/right slots. Composes Textarea-style growth
 * behaviour with a button-attached send affordance so AI / agent
 * surfaces don't have to rebuild this pattern per consumer.
 *
 * Keyboard: Enter submits, Shift+Enter inserts a newline. Empty
 * submissions are ignored; the parent doesn't need to gate.
 */
export function ChatBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Ask anything…',
  size = 'md',
  variant = 'outline',
  shape = 'default',
  maxHeight = 200,
  disabled = false,
  sending = false,
  startSlot,
  endSlot,
  autoFocus = false,
  ariaLabel,
  className = '',
  style,
}: ChatBarProps) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow the textarea to fit content, capped at `maxHeight`.
  const resize = useCallback(() => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    // Toggle overflow visibility so the scrollbar only appears
    // when we've actually hit the cap — otherwise the bar would
    // paint a hairline scrollbar even at one line on some browsers.
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [maxHeight]);

  // Resize on every value change so the bar tracks the controlled
  // input. `defaultValue` is unsupported on purpose — chat inputs
  // are inherently controlled (value flows from the conversation
  // state).
  useEffect(() => {
    resize();
  }, [value, resize]);

  // Resize on first paint to catch a non-empty `value` provided on
  // mount (e.g. a chip suggestion that pre-fills the bar).
  useEffect(() => {
    resize();
    if (autoFocus) taRef.current?.focus();
  }, [autoFocus, resize]);

  const canSubmit = !disabled && !sending && value.trim().length > 0;

  const submit = useCallback(() => {
    if (!canSubmit) return;
    onSubmit(value.trim());
  }, [canSubmit, onSubmit, value]);

  const wrapperClasses = [
    'chat-bar',
    `chat-bar--${size}`,
    `chat-bar--${variant}`,
    `chat-bar--${shape}`,
    disabled ? 'chat-bar--disabled' : '',
    sending ? 'chat-bar--sending' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses} style={style}>
      {startSlot && <div className="chat-bar__start">{startSlot}</div>}
      <textarea
        ref={taRef}
        className="chat-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel ?? placeholder}
        rows={1}
      />
      {endSlot && <div className="chat-bar__end">{endSlot}</div>}
      <button
        type="button"
        className="chat-bar__send"
        onClick={submit}
        disabled={!canSubmit}
        aria-label={sending ? 'Generating…' : 'Send'}
      >
        {sending ? (
          <Spinner size="sm" />
        ) : (
          <Icon icon={arrowUp} size="sm" color="currentColor" />
        )}
      </button>
    </div>
  );
}
