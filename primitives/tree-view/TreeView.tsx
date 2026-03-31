import React, { useState, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Icon } from '../icon/Icon.js';
import { Skeleton } from '../skeleton/Skeleton.js';
import { chevronRight } from '../icon/icons/chevron-right.js';

// ---- Types ----

export interface TreeNode {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon — SVG innerHTML string */
  icon?: string;
  /** Child nodes */
  children?: TreeNode[];
}

export interface TreeViewProps {
  /** Tree data */
  data: TreeNode[];
  /** IDs of nodes expanded by default */
  defaultExpanded?: string[];
  /** Callback when a node is selected */
  onSelect?: (node: TreeNode) => void;
  /** Currently selected node ID */
  selectedId?: string;
  /** Show skeleton placeholder instead of content */
  skeleton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

interface TreeNodeRowProps {
  node: TreeNode;
  depth: number;
  expandedIds: Set<string>;
  selectedId?: string;
  onToggle: (id: string) => void;
  onSelect?: (node: TreeNode) => void;
}

function TreeNodeRow({ node, depth, expandedIds, selectedId, onToggle, onSelect }: TreeNodeRowProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = () => {
    if (hasChildren) {
      onToggle(node.id);
    }
    onSelect?.(node);
  };

  const rowClasses = [
    'tree-node__row',
    isSelected ? 'tree-node__row--selected' : '',
  ].filter(Boolean).join(' ');

  const chevronClasses = [
    'tree-node__chevron',
    hasChildren && isExpanded ? 'tree-node__chevron--expanded' : '',
    !hasChildren ? 'tree-node__chevron--hidden' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="tree-node">
      <div
        className={rowClasses}
        onClick={handleClick}
        role="treeitem"
        aria-expanded={hasChildren ? isExpanded : undefined}
        aria-selected={isSelected}
      >
        <span className="tree-node__indent" style={{ width: `${depth * 1.25}rem` }} />
        <span className={chevronClasses}>
          {hasChildren && <Icon icon={chevronRight} size="xs" />}
        </span>
        {node.icon && (
          <span className="tree-node__icon">
            <Icon icon={node.icon} size="sm" />
          </span>
        )}
        <span className="tree-node__label">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="tree-node__children" role="group">
          {node.children!.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * TreeView primitive.
 *
 * Renders a hierarchical expandable tree. Click to select a node,
 * click the chevron or a parent node to expand/collapse its children.
 * Indentation increases per depth level.
 */
export function TreeView({
  data,
  defaultExpanded = [],
  onSelect,
  selectedId,
  skeleton: showSkeleton = false,
  className = '',
  style,
}: TreeViewProps) {
  if (showSkeleton) {
    return (
      <div className={['tree-view', className].filter(Boolean).join(' ')} style={style}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ marginLeft: `${i * 1.25}rem` }}>
            <Skeleton size="text-sm" />
          </div>
        ))}
      </div>
    );
  }

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(defaultExpanded));

  const handleToggle = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const classes = ['tree-view', className].filter(Boolean).join(' ');

  return (
    <div className={classes} style={style} role="tree">
      {data.map((node) => (
        <TreeNodeRow
          key={node.id}
          node={node}
          depth={0}
          expandedIds={expandedIds}
          selectedId={selectedId}
          onToggle={handleToggle}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default TreeView;
