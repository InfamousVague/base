import React, { useState, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { uploadCloud } from '../icon/icons/upload-cloud.js';

// ---- Types ----

export interface FileUploadZoneProps {
  /** Callback with selected/dropped files */
  onFiles: (files: File[]) => void;
  /** Accepted MIME types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Disable the upload zone */
  disabled?: boolean;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

/**
 * FileUploadZone primitive.
 *
 * Renders a dashed-border drop zone. Click to open the file picker.
 * Drag over highlights the zone. Shows an upload icon and helper text.
 */
export function FileUploadZone({
  onFiles,
  accept,
  multiple = true,
  maxSize,
  disabled = false,
  skeleton: showSkeleton = false,
  className = '',
  style,
}: FileUploadZoneProps) {
  if (showSkeleton) {
    return <Skeleton width="100%" height="8rem" shape="default" className={className} style={style} />;
  }

  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterFiles = useCallback((files: File[]): File[] => {
    if (!maxSize) return files;
    return files.filter((f) => f.size <= maxSize);
  }, [maxSize]);

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    const files = filterFiles(Array.from(fileList));
    if (files.length > 0) {
      onFiles(files);
    }
  }, [onFiles, filterFiles]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const classes = [
    'file-upload-zone',
    active ? 'file-upload-zone--active' : '',
    disabled ? 'file-upload-zone--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={style}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
    >
      <span className="file-upload-zone__icon">
        <Icon icon={uploadCloud} size="lg" />
      </span>
      <span className="file-upload-zone__text">
        Drop files here or click to browse
      </span>
      <span className="file-upload-zone__hint">
        {accept ? `Accepted: ${accept}` : 'Any file type'}
        {maxSize ? ` (max ${(maxSize / 1024 / 1024).toFixed(0)}MB)` : ''}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: 'none' }}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}

export default FileUploadZone;
