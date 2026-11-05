// One-off refactor: make tokens.css the single source of truth.
//  - honest names (copper accent, graphite ground) instead of cyan/navy
//  - every rgba()/hex literal outside tokens.css becomes a token or a color-mix() of one
//  - every one-off font-size clamp becomes a named type role
// Safe to re-run.
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'assets', 'css');
const files = ['tokens.css', 'base.css', 'home.css', 'contact.css', 'brief.css', 'fonts.css'];

const renames = [
  [/--c-cyan-bright(?![\w-])/g, '--c-accent-bright'],
  [/--c-cyan-deep(?![\w-])/g, '--c-accent-deep'],
  [/--c-cyan-ink(?![\w-])/g, '--c-accent-ink'],
  [/--c-cyan(?![\w-])/g, '--c-accent'],
  [/--c-navy-deep(?![\w-])/g, '--c-graphite-deep'],
  [/--c-navy-soft(?![\w-])/g, '--c-graphite-soft'],
  [/--c-navy-line(?![\w-])/g, '--c-graphite-line'],
  [/--c-navy(?![\w-])/g, '--c-graphite'],
  [/--veil-navy-strong(?![\w-])/g, '--veil-graphite-strong'],
  [/--veil-navy(?![\w-])/g, '--veil-graphite'],
];

// rgba(r,g,b,a) -> color-mix of a token
const colourFor = (r, g, b) => {
  const k = [r, g, b].join(',');
  return ({
    '20,22,27': '--c-graphite-deep', '14,15,19': '--c-graphite-deep', '18,20,24': '--c-graphite-deep',
    '27,30,36': '--c-graphite', '13,27,42': '--c-graphite',
    '255,255,255': '--c-white', '217,143,78': '--c-accent-bright', '184,115,51': '--c-accent', '0,0,0': '--c-black',
  })[k];
};
const mix = (m, r, g, b, a) => {
  const t = colourFor(+r, +g, +b);
  if (!t) return m;
  const pct = +(parseFloat(a) * 100).toFixed(1);
  return `color-mix(in srgb, var(${t}) ${pct}%, transparent)`;
};

const fonts = [
  ['clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)', 'var(--fs-card)'],
  ['clamp(2.5rem, 1.7rem + 3.4vw, 4rem)', 'var(--fs-stat)'],
  ['clamp(1.5rem, 1.1rem + 1.6vw, 2.25rem)', 'var(--fs-stat-sm)'],
  ['clamp(2.25rem, 1.5rem + 2vw, 3.5rem)', 'var(--fs-title)'],
  ['clamp(2.5rem, 1.8rem + 2.6vw, 3.75rem)', 'var(--fs-title-lg)'],
  ['clamp(1.5rem, 1.1rem + 1.6vw, 2.5rem)', 'var(--fs-statement)'],
];

for (const f of files) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  const before = s;
  for (const [re, to] of renames) s = s.replace(re, to);
  if (f !== 'tokens.css') {
    s = s.replace(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/g, mix);
    s = s.replace(/#B3261E/gi, 'var(--c-error)');
    for (const [from, to] of fonts) s = s.split(from).join(to);
    s = s.replace('font-size: 0.75rem; }', 'font-size: var(--fs-label); }').replace('font-size: 0.625rem; letter-spacing: 0.1em;', 'font-size: var(--fs-micro); letter-spacing: var(--ls-caps);');
  }
  if (s !== before) { fs.writeFileSync(p, s); console.log('updated', f); }
}
