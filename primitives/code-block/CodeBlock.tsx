import React, { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { copy } from '../icon/icons/copy.js';
import { check } from '../icon/icons/check.js';

// ---- Types ----

export interface CodeBlockProps {
  /** Code string to display */
  code: string;
  /** Language label (displayed only, no syntax highlighting) */
  language?: string;
  /** Show line numbers */
  showLineNumbers?: boolean;
  /** Show copy button */
  copyable?: boolean;
  /** Maximum height with overflow scroll */
  maxHeight?: string;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * CodeBlock primitive.
 *
 * Renders a styled code display with optional line numbers and a
 * copy-to-clipboard button. Language is displayed as a label only;
 * no syntax highlighting is applied.
 */
export function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  copyable = true,
  maxHeight,
  skeleton: showSkeleton = false,
  className = '',
  style,
}: CodeBlockProps) {
  if (showSkeleton) {
    return <Skeleton width="100%" height="8rem" shape="default" className={className} style={style} />;
  }

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }, [code]);

  const lines = code.split('\n');
  const showHeader = language || copyable;
  const classes = ['code-block', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style}>
      {showHeader && (
        <div className="code-block__header">
          {language ? <span className="code-block__language">{language}</span> : <span />}
          {copyable && (
            <button
              type="button"
              className={`code-block__copy ${copied ? 'code-block__copy--copied' : ''}`}
              onClick={handleCopy}
              aria-label={copied ? 'Copied' : 'Copy code'}
            >
              <Icon icon={copied ? check : copy} size="sm" />
            </button>
          )}
        </div>
      )}
      <pre className="code-block__pre" style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}>
        {showLineNumbers ? (
          <code className="code-block__lines">
            {lines.map((line, i) => (
              <span key={i} className="code-block__line">
                <span className="code-block__line-number">{i + 1}</span>
                <span className="code-block__line-content">{line}</span>
              </span>
            ))}
          </code>
        ) : (
          <code>{code}</code>
        )}
      </pre>
    </div>
  );
}

export default CodeBlock;
