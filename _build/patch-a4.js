const fs = require('fs');
const rw = (f, fn) => { const p = __dirname + '/' + f; fs.writeFileSync(p, fn(fs.readFileSync(p, 'utf8'))); };
rw('parts.js', (s) => s.replace("<span class=\"gate__num\">${num || '&nbsp;'}</span>", "${num ? `<span class=\"gate__num\">${num}</span>` : ''}"));
rw('ui.js', (s) => s.replace('linkText, dim = true }', 'linkText, dim = false }'));
rw('pages-a.js', (s) => s
  .replace("img: 'panel-technician', dim: true,", "img: 'panel-technician', dim: true,")
  .replace("img: 'data-hall', label", "img: 'data-hall', dim: true, label")
  .replace("img: 'distribution-board', label", "img: 'distribution-board', dim: true, label"));
console.log('ok');
