export interface NavItem {
  label: string;
  slug: string;
  path: string;
}

export interface NavCategory {
  name: string;
  items: NavItem[];
}

export const navCategories: NavCategory[] = [
  {
    name: 'Foundations',
    items: [
      { label: 'Overview', slug: 'overview', path: '/' },
      { label: 'Colors', slug: 'colors', path: '/foundations/colors' },
      { label: 'Spacing', slug: 'spacing', path: '/foundations/spacing' },
      { label: 'Typography', slug: 'typography', path: '/foundations/typography' },
      { label: 'Icon Search', slug: 'icon-search', path: '/foundations/icon-search' },
    ],
  },
  {
    name: 'Primitives',
    items: [
      { label: 'Text', slug: 'text', path: '/components/text' },
      { label: 'Icon', slug: 'icon', path: '/components/icon' },
      { label: 'Button', slug: 'button', path: '/components/button' },
      { label: 'Input', slug: 'input', path: '/components/input' },
      { label: 'Textarea', slug: 'textarea', path: '/components/textarea' },
      { label: 'Select', slug: 'select', path: '/components/select' },
      { label: 'Checkbox', slug: 'checkbox', path: '/components/checkbox' },
      { label: 'Radio', slug: 'radio', path: '/components/radio' },
      { label: 'Toggle', slug: 'toggle', path: '/components/toggle' },
      { label: 'Badge', slug: 'badge', path: '/components/badge' },
      { label: 'Avatar', slug: 'avatar', path: '/components/avatar' },
      { label: 'Tooltip', slug: 'tooltip', path: '/components/tooltip' },
      { label: 'Spinner', slug: 'spinner', path: '/components/spinner' },
      { label: 'Progress', slug: 'progress', path: '/components/progress' },
      { label: 'CircularProgress', slug: 'circular-progress', path: '/components/circular-progress' },
      { label: 'Separator', slug: 'separator', path: '/components/separator' },
      { label: 'Image', slug: 'image', path: '/components/image' },
      { label: 'Skeleton', slug: 'skeleton', path: '/components/skeleton' },
      { label: 'SegmentedControl', slug: 'segmented-control', path: '/components/segmented-control' },
      { label: 'NumberRoll', slug: 'number-roll', path: '/components/number-roll' },
      { label: 'Pagination', slug: 'pagination', path: '/components/pagination' },
      { label: 'TriStateToggle', slug: 'tri-state-toggle', path: '/components/tri-state-toggle' },
      { label: 'Chip', slug: 'chip', path: '/components/chip' },
      { label: 'Tag', slug: 'tag', path: '/components/tag' },
      { label: 'Beacon', slug: 'beacon', path: '/components/beacon' },
      { label: 'Animation', slug: 'animation', path: '/components/animation' },
    ],
  },
  {
    name: 'Inputs',
    items: [
      { label: 'NumberInput', slug: 'number-input', path: '/components/number-input' },
      { label: 'TagInput', slug: 'tag-input', path: '/components/tag-input' },
      { label: 'PinInput', slug: 'pin-input', path: '/components/pin-input' },
      { label: 'Slider', slug: 'slider', path: '/components/slider' },
      { label: 'Rating', slug: 'rating', path: '/components/rating' },
      { label: 'ColorPicker', slug: 'color-picker', path: '/components/color-picker' },
      { label: 'ColorSwatch', slug: 'color-swatch', path: '/components/color-swatch' },
      { label: 'Calendar', slug: 'calendar', path: '/components/calendar' },
      { label: 'FileUpload', slug: 'file-upload-zone', path: '/components/file-upload-zone' },
    ],
  },
  {
    name: 'Feedback',
    items: [
      { label: 'Toast', slug: 'toast', path: '/components/toast' },
      { label: 'Dialog', slug: 'dialog', path: '/components/dialog' },
      { label: 'Sheet', slug: 'sheet', path: '/components/sheet' },
      { label: 'Alert', slug: 'alert', path: '/components/alert' },
      { label: 'Meter', slug: 'meter', path: '/components/meter' },
    ],
  },
  {
    name: 'Navigation',
    items: [
      { label: 'Tabs', slug: 'tabs', path: '/components/tabs' },
      { label: 'Stepper', slug: 'stepper', path: '/components/stepper' },
      { label: 'Breadcrumb', slug: 'breadcrumb', path: '/components/breadcrumb' },
      { label: 'NavSidebar', slug: 'nav-sidebar', path: '/components/nav-sidebar' },
    ],
  },
  {
    name: 'Overlay',
    items: [
      { label: 'Popover', slug: 'popover', path: '/components/popover' },
      { label: 'Combobox', slug: 'combobox', path: '/components/combobox' },
    ],
  },
  {
    name: 'Data',
    items: [
      { label: 'Table', slug: 'table', path: '/components/table' },
      { label: 'Collapsible', slug: 'collapsible', path: '/components/collapsible' },
      { label: 'ListItem', slug: 'list-item', path: '/components/list-item' },
      { label: 'Timeline', slug: 'timeline', path: '/components/timeline' },
      { label: 'TreeView', slug: 'tree-view', path: '/components/tree-view' },
      { label: 'Sparkline', slug: 'sparkline', path: '/components/sparkline' },
      { label: 'Carousel', slug: 'carousel', path: '/components/carousel' },
    ],
  },
  {
    name: 'Misc',
    items: [
      { label: 'Kbd', slug: 'kbd', path: '/components/kbd' },
      { label: 'CopyButton', slug: 'copy-button', path: '/components/copy-button' },
      { label: 'ButtonGroup', slug: 'button-group', path: '/components/button-group' },
      { label: 'Indicator', slug: 'indicator', path: '/components/indicator' },
      { label: 'AvatarGroup', slug: 'avatar-group', path: '/components/avatar-group' },
      { label: 'CodeBlock', slug: 'code-block', path: '/components/code-block' },
    ],
  },
  {
    name: 'Layout',
    items: [
      { label: 'Box', slug: 'box', path: '/components/box' },
      { label: 'Stack', slug: 'stack', path: '/components/stack' },
      { label: 'Grid', slug: 'grid', path: '/components/grid' },
      { label: 'Center', slug: 'center', path: '/components/center' },
      { label: 'Spacer', slug: 'spacer', path: '/components/spacer' },
      { label: 'Container', slug: 'container', path: '/components/container' },
      { label: 'ScrollArea', slug: 'scroll-area', path: '/components/scroll-area' },
      { label: 'AspectRatio', slug: 'aspect-ratio', path: '/components/aspect-ratio' },
      { label: 'Card', slug: 'card', path: '/components/card' },
      { label: 'FormField', slug: 'form-field', path: '/components/form-field' },
    ],
  },
];

/** Flat list of all nav items for search */
export const allNavItems: (NavItem & { category: string })[] = navCategories.flatMap(
  cat => cat.items.map(item => ({ ...item, category: cat.name }))
);
