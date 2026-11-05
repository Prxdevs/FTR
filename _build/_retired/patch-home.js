// Patches index.html (safe to re-run). Run: node _build/patch-home.js
//   1. "What brings you here?" router after the hero (Brief 1.7: two audiences, a visible route each)
//   2. Leadership strip after "The team we field" (Brief: leadership belongs on the homepage; MD 25, Brief 1.3)
//   3. Nav label "Markets" -> "Sectors" on every page (matches the homepage's own section label)
// Router wording, strip lines and glossary are OURS (client sign-off).
const fs = require('fs');
const path = require('path');
const { ROOT, read, write } = require('./lib');

let html = read('index.html');
const strip = (name) => html.replace(new RegExp(`\\n?[ \\t]*<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->\\n?`, 'g'), '\n');
html = strip('router');
html = strip('leaders');

const arrow = `<img class="link__arrow" src="assets/img/ftr-arrow-16.png" srcset="assets/img/ftr-arrow-16.png 1x, assets/img/ftr-arrow-32.png 2x" alt="" width="16" height="11">`;

const doors = [
  ['Building or commissioning a facility', 'We build it, check it, or prove it works &mdash; whichever part you need.', 'services/', 'Our services'],
  ['Government or skills partner', 'A national programme that trains and certifies the people who build these plants.', 'academy/', 'FTR Academy'],
  ['An overseas company entering India', 'Set-up help, and the legal route to bring your own people.', 'services/#entry', 'India entry advisory'],
  ['Exploring a sector', 'Chip plants, data centres and pharma: what each demands and where it is happening.', 'markets/', 'The sectors we serve'],
];

const router = `<!-- router:start -->
  <!-- ================= WHAT BRINGS YOU HERE? =================
       Ours. Audiences from Brief 1.7 and Master Deck 26: each visitor gets a visible route early. -->
  <section class="section section--tight on-paper router" aria-labelledby="router-h">
    <div class="shell">
      <h2 class="h2 router__title" id="router-h">What brings you here?</h2>
      <ul class="router__doors">
${doors.map(([t, d, h, l]) => `        <li class="door">
          <a class="door__link" href="${h}">
            <span class="door__title">${t}</span>
            <span class="door__text">${d}</span>
            <span class="door__cta">${l} ${arrow}</span>
          </a>
        </li>`).join('\n')}
      </ul>
    </div>
  </section>
  <!-- router:end -->

`;

const people = [
  ['paul-colleary', 'PC', 'Paul Colleary', 'Executive Director, Operations', 'Runs delivery: the plan, the quality checks, the sign-off.'],
  ['nd-chaudhari', 'NC', 'ND Chaudhari', 'Co-Founder, Relationships', 'Opens doors with government and institutions.'],
  ['chetan-balar', 'CB', 'Chetan Balar', 'Co-Founder, Innovation and New Business', 'Looks ahead to new markets and partners.'],
];
const card = ([slug, ini, name, role, does]) => {
  const has = fs.existsSync(path.join(ROOT, `assets/img/people/${slug}.webp`));
  const mark = has
    ? `<img class="leader__photo" src="assets/img/people/${slug}.webp" alt="${name}" width="800" height="1000" loading="lazy" decoding="async">`
    : `<span class="leader__mark" data-initials="${ini}" aria-hidden="true"></span>`;
  return `        <li class="leader">
          ${mark}
          <h3 class="h4 leader__name">${name}</h3>
          <p class="leader__role">${role}</p>
          <p class="leader__does">${does}</p>
        </li>`;
};

const leaders = `<!-- leaders:start -->
  <!-- ================= THE PEOPLE =================
       Sources: Brief 1.3, MD 25. Photos: drop assets/img/people/<slug>.webp and re-run this script. -->
  <section class="section on-paper gate" id="people" aria-labelledby="people-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">&nbsp;</span>
        <span class="label" id="people-h">The people</span>
        <span class="gate__status">Who you will deal with</span>
      </div>

      <p class="lead leaders__lede">
        Trust comes from people, not projects. These are the three directors you will meet.
      </p>

      <ul class="leaders">
${people.map(card).join('\n')}
      </ul>

      <a class="link section__link" href="about/#people">
        Meet the team
        ${arrow}
      </a>
    </div>
  </section>
  <!-- leaders:end -->

`;

const heroEnd = '  <!-- ================= 01 · WHAT FTR IS ================= -->';
if (!html.includes(heroEnd)) throw new Error('hero anchor not found');
html = html.replace(heroEnd, router + heroEnd);

const academyAnchor = '  <!-- ================= 07 · FTR ACADEMY =================';
if (!html.includes(academyAnchor)) throw new Error('academy anchor not found');
html = html.replace(academyAnchor, leaders + academyAnchor);

write('index.html', html);

// Nav label across every page.
let n = 0;
for (const f of ['index.html', 'about/index.html', 'services/index.html', 'academy/index.html', 'contact/index.html', 'markets/index.html',
                 'markets/semiconductors/index.html', 'markets/data-centres/index.html', 'markets/pharmaceuticals/index.html']) {
  const s = read(f);
  const t = s.replace('<span class="nav__name">Markets</span>', '<span class="nav__name">Sectors</span>');
  if (t !== s) { write(f, t); n++; }
}
console.log('home patched; nav label updated on', n, 'pages');
