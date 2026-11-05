const fs = require('fs');
let u = fs.readFileSync(__dirname + '/ui.js', 'utf8');
u = u.replace('<div class="band__media${dim ? \' band__media--dim\' : \'\'}">', '<div class="figure band__media${dim ? \' band__media--dim\' : \'\'}">').replace('linkText, dim = false }', 'linkText, dim = true }');
fs.writeFileSync(__dirname + '/ui.js', u);

let s = fs.readFileSync(__dirname + '/pages-a.js', 'utf8');
const rep = (a, b) => { if (!s.includes(a)) throw new Error('missing ' + a.slice(0, 60)); s = s.replace(a, b); };
rep("    ['Markets served', 'Ireland, Finland, Netherlands, Sweden, Denmark, Germany, Belgium and wider Europe.'],\n    ['Gujarat first', 'Wider state network in development.'],\n", '');
// construction: lead belongs in the head
rep("${head('Leadership and workforce track record.')}\n      <div class=\"grid\"><div class=\"split__body\"><p class=\"lead\">Paul Colleary brings 30+ years of mission-critical M&amp;E delivery across Europe (Suir Engineering, Jones Engineering, AM Technical Solutions). The team is Irish, European and Indian, with projects delivered across Europe.</p></div></div>",
    "${head('Leadership and workforce track record.', 'Paul Colleary brings 30+ years of mission-critical M&amp;E delivery across Europe (Suir Engineering, Jones Engineering, AM Technical Solutions). The team is Irish, European and Indian, with projects delivered across Europe.')}");
fs.writeFileSync(__dirname + '/pages-a.js', s);

let b = fs.readFileSync(__dirname + '/pages-b.js', 'utf8');
const a1 = "${head('Proof is in the people.')}\n      <div class=\"grid\"><div class=\"split__body\"><p class=\"lead\">Paul Colleary brings 30+ years of mission-critical M&amp;E delivery across Europe. The team is Irish, European and Indian, with projects delivered across Europe.</p></div></div>";
if (!b.includes(a1)) throw new Error('why proof');
b = b.replace(a1, "${head('Proof is in the people.', 'Paul Colleary brings 30+ years of mission-critical M&amp;E delivery across Europe. The team is Irish, European and Indian, with projects delivered across Europe.')}");
fs.writeFileSync(__dirname + '/pages-b.js', b);
console.log('ok');
