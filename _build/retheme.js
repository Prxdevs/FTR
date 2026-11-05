// One-off: applies the "Copper Precision" design system (client brief, 5 Oct 2026) to the stylesheets.
// Safe to re-run: every substitution is a no-op once applied.
const fs = require('fs');
const path = require('path');
const CSS = path.join(__dirname, '..', 'assets', 'css');

let t = fs.readFileSync(path.join(CSS, 'tokens.css'), 'utf8');
const sub = (a, b) => { t = t.split(a).join(b); };

sub('Navy is structure. White is reading. Cyan is accent only and\n     never sets body text. Two cyans exist for a reason: the bright\n     one is legible on navy, the deep one on white. They are not\n     interchangeable. */',
    'Design system "Copper Precision" (client brief, 5 Oct 2026):\n     graphite #1B1E24, copper #B87333, steel #6B7684, light #F2F3F5.\n     Token NAMES (--c-navy, --c-cyan...) are kept from the first\n     build to avoid touching every rule: --c-navy IS graphite and\n     --c-cyan IS copper. Copper is accent only and never sets body\n     text. Two coppers exist for a reason: the bright one is legible\n     on graphite, the ink one on white. They are not interchangeable. */');

const pairs = [
  ['--c-navy:            #0D1B2A;', '--c-navy:            #1B1E24;'],
  ['--c-navy-deep:       #081420;', '--c-navy-deep:       #121418;'],
  ['--c-navy-soft:       #14263A;', '--c-navy-soft:       #252932;'],
  ['--c-navy-line:       #22384E;', '--c-navy-line:       #383D47;'],
  ['--c-paper:           #F7F9FA;', '--c-paper:           #F2F3F5;'],
  ['--c-rule:            #E2E8ED;', '--c-rule:            #DFE2E6;'],
  ['--c-ink:             #0D1B2A;', '--c-ink:             #1B1E24;'],
  ['--c-ink-mute:        #55697C;', '--c-ink-mute:        #5A626E;'],
  ['--c-ink-faint:       #8A9AA8;', '--c-ink-faint:       #6B7684;'],
  ['--c-on-navy:         #E9EFF4;', '--c-on-navy:         #ECEEF1;'],
  ['--c-on-navy-mute:    #93A7B8;', '--c-on-navy-mute:    #A3AAB5;'],
  ['--c-cyan:            #00B4E6;', '--c-cyan:            #B87333;'],
  ['--c-cyan-bright:     #2ED8FF;', '--c-cyan-bright:     #D98F4E;'],
  ['--c-cyan-deep:       #0A6FD0;', '--c-cyan-deep:       #8F5826;'],
  ['--c-cyan-ink:        #006C99;', '--c-cyan-ink:        #8A5223;'],
  ['rgba(46, 216, 255, 0.045)', 'rgba(217, 143, 78, 0.045)'],
  ['rgba(13, 27, 42, 0.72)', 'rgba(27, 30, 36, 0.72)'],
  ['rgba(13, 27, 42, 0.86)', 'rgba(27, 30, 36, 0.86)'],
  ['--f-display: "Space Grotesk", "Space Grotesk Fallback", "Segoe UI", system-ui, sans-serif;',
   '--f-display: "Inter", "Inter Fallback", "Segoe UI", system-ui, -apple-system, sans-serif;   /* one family across the site (brief) */'],
  ['--c-ink-mute:      #3C4E5E;', '--c-ink-mute:      #3F4650;'],
  ['--c-ink-faint:     #55697C;', '--c-ink-faint:     #5A626E;'],
  ['--c-on-navy-mute:  #BCCCD9;', '--c-on-navy-mute:  #C4CAD3;'],
  ['--c-rule:          #B8C4CE;', '--c-rule:          #B7BDC6;'],
  ['--c-navy-line:     #3E566E;', '--c-navy-line:     #555B67;'],
];
for (const [a, b] of pairs) sub(a, b);
fs.writeFileSync(path.join(CSS, 'tokens.css'), t);

const map = [
  [/rgba\(8, 20, 32, /g, 'rgba(20, 22, 27, '],
  [/rgba\(13, 27, 42, /g, 'rgba(27, 30, 36, '],
  [/rgba\(5, 12, 20, /g, 'rgba(14, 15, 19, '],
  [/rgba\(46, 216, 255, /g, 'rgba(217, 143, 78, '],
  [/rgba\(0, 180, 230, /g, 'rgba(184, 115, 51, '],
];
let n = 0;
for (const f of fs.readdirSync(CSS).filter((f) => f.endsWith('.css') && f !== 'tokens.css')) {
  let s = fs.readFileSync(path.join(CSS, f), 'utf8');
  const o = s;
  for (const [a, b] of map) s = s.replace(a, b);
  if (s !== o) { fs.writeFileSync(path.join(CSS, f), s); n++; }
}

// Drop the second typeface (one sans-serif family, brief).
let fonts = fs.readFileSync(path.join(CSS, 'fonts.css'), 'utf8');
const blocks = fonts.split(/(?=@font-face)/);
fonts = blocks.filter((b) => !/Space Grotesk/.test(b) || !b.startsWith('@font-face')).join('');
fs.writeFileSync(path.join(CSS, 'fonts.css'), fonts);

console.log('tokens updated; recoloured', n, 'stylesheets; fonts.css now', (fonts.match(/@font-face/g) || []).length, '@font-face blocks');
