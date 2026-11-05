const fs = require('fs');
const f = __dirname + '/pages-a.js';
let s = fs.readFileSync(f, 'utf8');
const cut = (a, b) => { const i = s.indexOf(a); if (i < 0) throw new Error('missing ' + a.slice(0, 50)); s = s.slice(0, i) + b + s.slice(i + a.length); };

// remove kv rows now shown graphically
for (const row of [
  "    ['Trades covered', 'Process and utility piping, electrical, HVAC, cleanroom fit-out, commissioning.'],\n",
  "    ['Mandatory foundation for every entrant', 'Cleanroom Construction Fundamentals (6 weeks) + EHS Safe-Site Pass (3 weeks).'],\n",
  "    ['Three certification tiers', 'Foundation &middot; Trade Specialist &middot; Deployment-Ready Diploma.'],\n",
  "    ['Nine programmes', 'Core trade pathways ~16 weeks, commissioning ~8 weeks (360&ndash;1,120 hours per pathway).'],\n",
  "    ['Train-the-trainer model', 'Master trainers certify Indian instructors so capability stays in India.'],\n",
]) cut(row, '');

// move the remaining kv into its own section after the bars
const kvStart = s.indexOf("${kv([\n    ['AI Infrastructure layer'");
const kvEnd = s.indexOf("])}", kvStart) + 3;
const kvBlock = s.slice(kvStart, kvEnd);
s = s.slice(0, kvStart).replace(/\n$/, '') + s.slice(kvEnd);
cut("${band(P, { id: 'trainer-h'", "${sec({ id: 'detail', num: '05', label: 'Who and how', body: `${head('Who teaches, who can enrol.')}\n" + kvBlock + "` })}\n\n${band(P, { id: 'trainer-h'");
s = s.replace("img: 'panel-technician', label: 'Train-the-trainer'", "img: 'panel-technician', dim: true, label: 'Train-the-trainer'");
fs.writeFileSync(f, s);
console.log('ok');
