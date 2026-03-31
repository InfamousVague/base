/**
 * Pulls Lucide SVG icons and generates TypeScript files for the Icon primitive.
 *
 * Reads raw SVGs from lucide-static, extracts inner content, and outputs:
 *   - primitives/icon/icons/{name}.ts   — one file per icon (tree-shakeable)
 *   - primitives/icon/icon-names.ts     — union type of all icon names
 *   - primitives/icon/icons/_registry.ts — full import map for demo site
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const ICONS_SRC = resolve(ROOT, 'node_modules/lucide-static/icons');
const ICONS_OUT = resolve(ROOT, 'primitives/icon/icons');
const NAMES_OUT = resolve(ROOT, 'primitives/icon/icon-names.ts');

const RESERVED = new Set([
  'abstract','arguments','await','boolean','break','byte','case','catch','char','class',
  'const','continue','debugger','default','delete','do','double','else','enum','eval',
  'export','extends','false','final','finally','float','for','function','goto','if',
  'implements','import','in','instanceof','int','interface','let','long','native','new',
  'null','package','private','protected','public','return','short','static','super',
  'switch','synchronized','this','throw','throws','transient','true','try','typeof',
  'undefined','var','void','volatile','while','with','yield',
]);

function kebabToCamel(s: string): string {
  const camel = s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  return RESERVED.has(camel) ? `icon${camel.charAt(0).toUpperCase()}${camel.slice(1)}` : camel;
}

function extractInnerSVG(svgContent: string): string {
  // Strip the outer <svg ...> and </svg>, keep only child elements
  return svgContent
    .replace(/<!--[^]*?-->/g, '')          // strip comments
    .replace(/<svg[^>]*>\s*/s, '')         // strip opening <svg>
    .replace(/\s*<\/svg>\s*$/s, '')        // strip closing </svg>
    .replace(/\n  /g, '\n')               // de-indent one level
    .trim();
}

// Ensure output dir exists
if (!existsSync(ICONS_OUT)) {
  mkdirSync(ICONS_OUT, { recursive: true });
}

const svgFiles = readdirSync(ICONS_SRC).filter(f => f.endsWith('.svg')).sort();

const icons: { kebab: string; camel: string }[] = [];
const seenCamels = new Map<string, number>();

for (const file of svgFiles) {
  const kebab = basename(file, '.svg');
  let camel = kebabToCamel(kebab);

  // Handle collisions (e.g. arrow-down-0-1 and arrow-down-01 both → arrowDown01)
  const count = seenCamels.get(camel) ?? 0;
  seenCamels.set(camel, count + 1);
  if (count > 0) camel = `${camel}_${count}`;
  const raw = readFileSync(resolve(ICONS_SRC, file), 'utf-8');
  const inner = extractInnerSVG(raw);

  // Write individual icon file
  const escaped = inner.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  writeFileSync(
    resolve(ICONS_OUT, `${kebab}.ts`),
    `// Auto-generated from lucide-static — do not edit\nexport const ${camel} = \`${escaped}\`;\n`,
  );

  icons.push({ kebab, camel });
}

// Write icon-names.ts union type
const unionMembers = icons.map(i => `  | '${i.kebab}'`).join('\n');
writeFileSync(
  NAMES_OUT,
  `// Auto-generated from lucide-static — do not edit\nexport type IconName =\n${unionMembers};\n`,
);

// Write _registry.ts (imports all icons — demo site only)
const imports = icons.map(i => `import { ${i.camel} } from './${i.kebab}.js';`).join('\n');
const entries = icons.map(i => `  '${i.kebab}': ${i.camel},`).join('\n');
writeFileSync(
  resolve(ICONS_OUT, '_registry.ts'),
  `// Auto-generated — full icon registry for demo site. NOT for production use.\nimport type { IconName } from '../icon-names.js';\n${imports}\n\nexport const iconRegistry: Record<IconName, string> = {\n${entries}\n};\n`,
);

// Write _names-list.ts (lightweight — just the string array, no SVG content)
const namesList = icons.map(i => `  '${i.kebab}',`).join('\n');
writeFileSync(
  resolve(ICONS_OUT, '_names-list.ts'),
  `// Auto-generated — icon names only. Lightweight, no SVG content.\nexport const iconNames: string[] = [\n${namesList}\n];\n`,
);

// Write _loader.ts (dynamic import helper for lazy loading)
const loaderCases = icons.map(i =>
  `    case '${i.kebab}': return (await import('./${i.kebab}.js')).${i.camel};`
).join('\n');
writeFileSync(
  resolve(ICONS_OUT, '_loader.ts'),
  `// Auto-generated — lazy icon loader. Loads one icon at a time via dynamic import.\nexport async function loadIcon(name: string): Promise<string> {\n  switch (name) {\n${loaderCases}\n    default: return '';\n  }\n}\n`,
);

console.log(`Generated ${icons.length} icons in ${ICONS_OUT}`);
