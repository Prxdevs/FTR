const fs = require('fs');
const p = __dirname + '/layout.js';
let s = fs.readFileSync(p, 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing ' + a.slice(0, 50)); s = s.replace(a, b); };
rep("const header = (P, { stuck = true } = {}) =>", "const header = (P, { stuck = true, slug = '' } = {}) =>");
rep('<a class="nav__link" href="${P}${href}">', '<a class="nav__link" href="${P}${href}"${current(slug, href)}>');
rep("const arrow = (P,", "// Mark the page the visitor is on (a service page marks Services as current).\nconst current = (slug, href) => (slug && (slug + '/' === href || slug.startsWith(href)) ? ' aria-current=\"page\"' : '');\n\nconst arrow = (P,");
rep("${header(P, { stuck })}", "${header(P, { stuck, slug })}");
fs.writeFileSync(p, s);
