import React, { useState, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Badge } from '../badge/Badge.js';
import { Skeleton } from '../skeleton/Skeleton.js';

// ---- Types ----

type TagInputSize = 'sm' | 'md';

export interface TagInputProps {
  /** Current tag values */
  value: string[];
  /** Called when tags change */
  onChange: (tags: string[]) => void;
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Maximum number of tags allowed */
  maxTags?: number;
  /** Size */
  size?: TagInputSize;
  /** Disabled state */
  disabled?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * TagInput — multi-value input with removable tag badges.
 *
 * Typing + Enter adds a tag. Backspace on empty input removes last tag.
 * Each tag has an X to remove.
 */
export function TagInput({
  value,
  onChange,
  placeholder = '',
  maxTags,
  size = 'md',
  disabled = false,
  skeleton = false,
  className = '',
  style,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  if (skeleton) {
    return <Skeleton size="button" full className={className} style={style} />;
  }

  const atMax = maxTags !== undefined && value.length >= maxTags;

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    if (atMax) return;
    onChange([...value, trimmed]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const classes = [
    'tag-input',
    `tag-input--${size}`,
    disabled ? 'tag-input--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} onClick={handleContainerClick}>
      {value.map((tag, index) => (
        <Badge
          key={tag}
          size={size}
          removable
          onRemove={() => removeTag(index)}
        >
          {tag}
        </Badge>
      ))}
      {!atMax && (
        <input
          ref={inputRef}
          className="tag-input__input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default TagInput;
