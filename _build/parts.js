// Section-level building blocks for the 12-page build (on top of ui.js).
const fs = require('fs');
const path = require('path');
const { ROOT, arrowImg, alt } = require('./lib');
const icons = require('./icons');

// A gated section: number + label on a ruled head, then `body`.
const sec = ({ id, tone = '', num = '', label, status = '', body }) => `  <section class="section${tone ? ' ' + tone : ''} gate" id="${id}" aria-labelledby="${id}-h">
    <div class="shell">
      <div class="gate__head">
        ${num ? `<span class="gate__num">${num}</span>` : ''}
        <span class="label">${label}</span>${status ? `
        <span class="gate__status">${status}</span>` : ''}
      </div>
${body.replace(/__H__/g, id + '-h')}
    </div>
  </section>`;

// Heading + lead pair used at the top of most sections.
const head = (title, lead = '') => `      <div class="grid">
        <div class="split__head${lead ? '' : ' split__head--wide'}">
          <h2 class="h2 wipe" id="__H__">${title}</h2>
        </div>${lead ? `
        <div class="split__body">
          <p class="lead">${lead}</p>
        </div>` : ''}
      </div>`;

const more = (P, href, text) => `<a class="link section__link" href="${href}">${text} ${arrowImg(P)}</a>`;

// A responsive photograph from assets/img/<name>-<width>.webp.
const photo = (P, name, { widths = [640, 1024, 1600], sizes = '(max-width: 900px) 100vw, 33vw', ratio = 1066 / 1600 } = {}) => {
  const f = (n) => `${P}assets/img/${name}-${n}.webp`;
  const mid = widths[1];
  return `<img src="${f(mid)}" srcset="${widths.map((n) => `${f(n)} ${n}w`).join(', ')}" sizes="${sizes}" alt="${alt(name)}" width="${mid}" height="${Math.round(mid * ratio)}" loading="lazy" decoding="async">`;
};

// Three equal-weight cards (Home, Services). Identical size and weight by construction:
// same photo ratio, same title block height, same link. No card can dominate.
const cards3 = (P, items) => `      <ul class="cards3">
${items.map((c) => `        <li class="card3 reveal">
          <a class="card3__link card3__link--photo" href="${P}${c.href}">
            <span class="card3__photo">${photo(P, c.img)}</span>
            <span class="card3__body">
              ${icons[c.icon]}
              <h3 class="card3__title">${c.title}</h3>
              <p class="card3__text">${c.text}</p>
              <p class="card3__for">${c.audience}</p>
              <span class="card3__cta">Learn more ${arrowImg(P)}</span>
            </span>
          </a>
        </li>`).join('\n')}
      </ul>`;

// Team member: a card (photo, or initials until the headshot is supplied) whose name opens
// a profile dialog with the full biography. main.js wires [data-person] to its <dialog>.
const pic = (P, { slug, name, initials }, cls) => (fs.existsSync(path.join(ROOT, 'assets/img/people', slug + '.webp'))
  ? `<span class="${cls} ${cls}--img"><img src="${P}assets/img/people/${slug}.webp" alt="${name}" width="360" height="450" loading="lazy"></span>`
  : `<span class="${cls}" data-initials="${initials}" aria-hidden="true"></span>`);
const member = (P, person) => {
  const { slug, name, role, bio = [] } = person;
  const id = 'person-' + slug;
  return `        <li class="member reveal">
          ${pic(P, person, 'member__photo')}
          <div class="member__text">
            <h3 class="member__name"><button class="member__open" type="button" aria-haspopup="dialog" aria-controls="${id}" data-person="${id}">${name}</button></h3>
            <p class="member__role">${role}</p>${bio.length ? `
            <span class="member__more" aria-hidden="true">View profile <svg viewBox="0 0 16 11" width="14" height="10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M1 5.5h13.5M10 1l4.5 4.5L10 10"/></svg></span>` : ''}
          </div>${bio.length ? `
          <dialog class="profile" id="${id}" aria-labelledby="${id}-h">
            <div class="profile__inner">
              <button class="profile__close" type="button"><span class="u-visually-hidden">Close profile</span><span aria-hidden="true">&times;</span></button>
              ${pic(P, person, 'profile__photo')}
              <div class="profile__body">
                <h3 class="profile__name" id="${id}-h">${name}</h3>
                <p class="profile__role">${role}</p>
${bio.map((x) => `                <p class="profile__bio">${x}</p>`).join('\n')}
              </div>
            </div>
          </dialog>` : ''}
        </li>`;
};

const kv = (rows) => `      <dl class="kv">
${rows.map(([k, v]) => `        <div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
      </dl>`;

// Stat triple. The fourth field (source) is kept for fact-checking only and is never printed.
const stats = (items) => `      <dl class="facts facts--3">
${items.map(([label, value, note, src]) => `        <div class="fact reveal">
          <dt class="fact__label">${label}</dt>
          <dd class="fact__value fact__value--text">${value}</dd>
          <dd class="fact__note">${note}</dd>
        </div>`).join('\n')}
      </dl>`;

// Leadership, in the client's order (26 Oct 2026): ND Chaudhari, Paul Colleary, Trushti Raval.
const PEOPLE = {
  vishnubhai: { slug: 'vishnubhai-chaudhari', name: 'Vishnubhai (ND) Chaudhari', initials: 'VC', role: 'Executive Director, Corporate Affairs' },
  paul: { slug: 'paul-colleary', name: 'Paul Colleary', initials: 'PC', role: 'Executive Director, Operations' },
  trushti: { slug: 'trushti-raval', name: 'Trushti Raval', initials: 'TR', role: 'CEO &amp; Managing Director' },
};
const BIO = {
  vishnubhai: [
    'ND (Vishnubhai) Chaudhari is Executive Director, Corporate Affairs at FTR. He brings more than 35 years of experience across Indian industry, real estate development and enterprise leadership. He has developed and built his own commercial centres, giving him first-hand command of project planning, approvals and construction delivery in the Indian market.',
    'Over three decades, he has built long-standing, trusted relationships with senior leaders across the public sector and Indian industry. These relationships let FTR align its programmes with national and state priorities, and engage partners with credibility from the outset.',
    'At FTR, he guides market strategy, institutional engagement and the company&rsquo;s long-term vision as India expands its semiconductor, data centre and critical infrastructure base.',
  ],
  paul: ['30+ years in mission-critical M&amp;E delivery across Ireland, Germany and wider Europe, rising from the trades to Manager of the Planning department. Experience with Suir Engineering, Jones Engineering and AM Technical Solutions. Has spent the last couple of years on a semiconductor project in India, so knows the industry from both European and Indian sides. Keen eye for quality; special interest in cleanroom fundamentals for semiconductor fabs.'],
  trushti: [
    'Electrical Engineering (India); Business Management, Finance (England).',
    'Five years dedicated to European, Irish and British critical-infrastructure talent &mdash; data centres, semiconductors, battery manufacturing &mdash; across every CSA and MEP discipline.',
  ],
};

// Every card opens its profile; `withBio` is kept for call compatibility.
const ORDER = ['vishnubhai', 'paul', 'trushti'];
const team = (P, withBio) => `      <ul class="team${withBio ? ' team--about' : ''}">
${ORDER.map((k) => member(P, { ...PEOPLE[k], bio: BIO[k] })).join('\n')}
      </ul>`;

// Photographic sector panels (the section the client liked), six of them.
// Licensed stock stands in until FTR supplies its own photography.
// Every photograph appears once on the whole site, so the Home panels and the Sectors page
// cards draw from two different sets.
const W3 = [640, 1024, 1600];
const SECTOR_IMG = {
  semiconductor: ['sector-semiconductor', [480, 800, 1200]],
  'atmp-osat': ['chip-tray', W3],
  'data-centres': ['sector-data-centres', [480, 800, 1200]],
  pharma: ['blister-packs', W3],
  medical: ['operating-room', W3],
  'ev-battery': ['battery-cells', W3],
  renewables: ['wind-solar', W3],
  transmission: ['pylon-lines', W3],
  'defence-aerospace': ['jet-hangar', W3],
  electronics: ['boards-line', W3],
};
const SECTOR_PAGE_IMG = {
  semiconductor: ['circuit-board', W3],
  'atmp-osat': ['bench-technician', W3],
  'data-centres': ['server-closeup', W3],
  pharma: ['lab-gowned', W3],
  medical: ['surgery-suite', W3],
  'ev-battery': ['conveyor-line', W3],
  renewables: ['process-tanks', W3],
  transmission: ['towers-field', W3],
  'defence-aerospace': ['rocket-assembly', W3],
  electronics: ['display-panel', W3],
};
const sectorImg = (P, id, attrs = '', set = SECTOR_IMG) => {
  const [name, w] = set[id];
  const f = (n) => `${P}assets/img/${name}-${n}.webp`;
  return `<img src="${f(w[1])}" srcset="${w.map((n) => `${f(n)} ${n}w`).join(', ')}" sizes="(max-width: 760px) 100vw, (max-width: 1100px) 34vw, 30vw" alt="${alt(name)}" width="${w[1]}" height="${Math.round(w[1] * 1.5)}" loading="lazy" decoding="async"${attrs}>`;
};

// `num` is the section number on the page that carries the panels; `title` and `text`
// can be re-worded per page. The panels themselves carry an icon, not a second number.
const sectorPanels = (P, sectors, { num = '02', title = 'Sectors we serve.', text = 'Ten industries, each linking to the relevant services.' } = {}) => `  <section class="section sectors-section gate" id="sectors" aria-labelledby="sectors-h">
    <div class="shell">
      <div class="sectors sectors--ten">
        <div class="sectors__intro">
          <div class="sectors__head">
            <span class="gate__num">${num}</span>
            <span class="sectors__rule" aria-hidden="true"></span>
            <span class="label">Sectors</span>
          </div>
          <h2 class="h1 sectors__title wipe" id="sectors-h">${title}</h2>
          <p class="sectors__text">${text}</p>
          <a class="sectors__all" href="${P}sectors/"><span class="circle" aria-hidden="true">${arrowImg(P)}</span>All sectors</a>
          <p class="sectors__disciplines">Construction<br>Commissioning<br>Skills<br>India market entry</p>
        </div>
        <ul class="sectors__panels">
${sectors.map(([id, ic, name, role]) => `          <li class="sector">
            <a class="sector__link" href="${P}sectors/#${id}">
              <div class="figure sector__media">${sectorImg(P, id)}</div>
              <div class="sector__top">
                <span class="sector__num">${icons[ic]}</span>
                <h3 class="sector__title wipe">${name}</h3>
              </div>
              <div class="sector__foot">
                ${role ? `<p class="sector__desc">${role}</p>` : ''}
                <span class="circle" aria-hidden="true">${arrowImg(P)}</span>
              </div>
            </a>
          </li>`).join('\n')}
        </ul>
      </div>
    </div>
  </section>`;

// A row of photographic tiles: picture, icon, title and (optionally) a line of text.
// Same visual language as the sector panels, for content that is not a link.
// items: [imageName, iconKey, title, text?]
const ptiles = (P, items) => `      <ul class="ptiles ptiles--${items.length}">
${items.map(([img, ic, title, text]) => `        <li class="ptile reveal">
          <div class="ptile__media">${photo(P, img, { sizes: '(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw' })}</div>
          <div class="ptile__body">
            ${icons[ic]}
            <h3 class="ptile__title">${title}</h3>${text ? `
            <p class="ptile__text">${text}</p>` : ''}
          </div>
        </li>`).join('\n')}
      </ul>`;

const crumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: 'https://ftright.com/' + url })),
});

// ---- graphics built only from the brief's own content ----------------------
const tiers = (list) => `      <ol class="tiers">
${list.map((t, i) => `        <li class="tier tier--${i + 1} reveal"><span class="tier__num">Tier ${i + 1}</span><h3 class="tier__title">${t}</h3></li>`).join('\n')}
      </ol>`;

// Programme-length bars. Both rows share one scale (25 weeks), so a week is the same
// width in each; the shorter pathway ends with an empty spacer.
const seg = (w, title, sub, accent) => `<span class="seg seg--${w}${accent ? ' seg--accent' : ''}"><strong>${title}</strong>${sub}</span>`;
const bars = () => `      <div class="bars reveal" role="group" aria-label="Programme length in weeks">
        <div class="bars__row"><span class="bars__label">Core trade pathway</span><div class="bars__track">${seg(6, 'Cleanroom Construction Fundamentals', '6 weeks')}${seg(3, 'EHS Safe-Site Pass', '3 weeks')}${seg(16, 'Trade pathway', '~16 weeks', true)}</div></div>
        <div class="bars__row"><span class="bars__label">Commissioning pathway</span><div class="bars__track">${seg(6, 'Cleanroom Construction Fundamentals', '6 weeks')}${seg(3, 'EHS Safe-Site Pass', '3 weeks')}${seg(8, 'Commissioning', '~8 weeks', true)}<span class="seg seg--8 seg--gap" aria-hidden="true"></span></div></div>
        <p class="bars__note">Mandatory foundation for every entrant, then the pathway. 360&ndash;1,120 hours per pathway.</p>
      </div>`;

const trades = (list) => `      <ul class="trades">
${list.map(([ic, t]) => `        <li class="reveal">${icons[ic]}<span>${t}</span></li>`).join('\n')}
      </ul>`;

const flow = (P, nodes) => `      <ol class="flow">
${nodes.map(([ic, t, x, href]) => `        <li class="flow__node reveal"><a href="${P}${href}"><span class="flow__icon">${icons[ic]}</span><div><h3 class="flow__title">${t}</h3><p class="flow__text">${x}</p></div></a></li>`).join('\n')}
      </ol>`;

const route = (countries) => `      <div class="route reveal">
        <ul class="route__from" aria-label="Markets served">
${countries.map((c, i) => `          <li${i === countries.length - 1 ? ' class="is-wide"' : ''}>${c}</li>`).join('\n')}
        </ul>
        <span class="route__line" aria-hidden="true"></span>
        <div class="route__to"><span>Destination</span><strong>India</strong></div>
      </div>`;

const meter = (n, cap) => `<span class="meter" role="img" aria-label="Scope ${n} of 3">${[1, 2, 3].map((i) => `<i${i <= n ? ' class="on"' : ''}></i>`).join('')}<span class="meter__cap">${cap}</span></span>`;

module.exports = { tiers, bars, trades, flow, route, meter, sec, head, more, cards3, member, kv, stats, team, PEOPLE, BIO, crumbSchema, icons, sectorPanels, sectorImg, SECTOR_PAGE_IMG, ptiles, photo };
