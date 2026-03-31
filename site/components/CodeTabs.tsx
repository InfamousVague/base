import React, { useState, useCallback } from 'react';

interface CodeTabsProps {
  preview: React.ReactNode;
  code?: string;
  language?: string;
}

export function CodeTabs({ preview, code, language = 'tsx' }: CodeTabsProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showCode = useCallback(async () => {
    setTab('code');
    if (code && !highlighted) {
      try {
        const { createHighlighter } = await import('shiki');
        const highlighter = await createHighlighter({
          themes: ['github-dark-default'],
          langs: ['tsx', 'css', 'typescript', 'html'],
        });
        const html = highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-dark-default',
        });
        setHighlighted(html);
      } catch {
        // Fallback to plain text
        setHighlighted(`<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`);
      }
    }
  }, [code, language, highlighted]);

  const handleCopy = useCallback(() => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className="code-tabs">
      <div className="code-tabs__header">
        <button
          className={`code-tabs__tab${tab === 'preview' ? ' code-tabs__tab--active' : ''}`}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        {code && (
          <button
            className={`code-tabs__tab${tab === 'code' ? ' code-tabs__tab--active' : ''}`}
            onClick={showCode}
          >
            Code
          </button>
        )}
        <div className="code-tabs__spacer" />
        {tab === 'code' && code && (
          <button className="code-tabs__copy" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
      {tab === 'preview' ? (
        <div className="code-tabs__preview">{preview}</div>
      ) : (
        <div
          className="code-tabs__code"
          dangerouslySetInnerHTML={{ __html: highlighted || '<pre>Loading...</pre>' }}
        />
      )}
    </div>
  );
}
