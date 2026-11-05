// Builds all 12 pages of the site: node _build/build-all.js
const a = require('./pages-a');
const b = require('./pages-b');
const fs = require('fs');
const path = require('path');

// One stylesheet per page type, so the first paint waits on a single request.
// Sources stay separate for editing; site*.css files are generated. Edit the sources.
const CSS = path.join(__dirname, '..', 'assets', 'css');
const SHARED = ['fonts', 'tokens', 'base', 'brief'];
const bundle = (extra) => {
  const out = [...SHARED, ...extra].map((n) => `/* ---- ${n}.css ---- */\n` + fs.readFileSync(path.join(CSS, n + '.css'), 'utf8')).join('\n');
  fs.writeFileSync(path.join(CSS, `site${extra.length ? '-' + extra.join('-') : ''}.css`), out);
};
[[], ['home'], ['contact']].forEach(bundle);

[a.home, a.about, a.services, a.skills, a.construction, a.entry,
 b.sectors, b.why, b.careers, b.contact, b.privacy, b.terms, b.notFound].forEach((fn) => fn());
console.log('Built 12 pages + 404');
