// Home, About, Services overview and the three service pages.
// Copy is the client's (Developer Brief, 5 Oct 2026), used verbatim; layout serves it.
const { page } = require('./layout');
const { hero, band, ctaSection } = require('./ui');
const { arrowImg } = require('./lib');
const { sec, head, more, cards3, kv, stats, team, crumbSchema, icons, sectorPanels, tiers, bars, flow, route, meter, ptiles, photo } = require('./parts');
const { alt } = require('./lib');

const SERVICES = [
  { href: 'services/skills-development/', img: 'welding-training', icon: 'skills', title: 'Skills Development', text: 'India&rsquo;s first structured M&amp;E construction and commissioning certification programme, taught by Irish and European master trainers.', audience: 'Government skilling bodies, contractors, trainees' },
  { href: 'services/critical-construction/', img: 'plan-discussion', icon: 'construction', title: 'Critical Construction &amp; Consultancy', text: 'Mission-critical M&amp;E delivery, right first time &mdash; as specialist consultants or as the delivery contractor.', audience: 'Fab, data centre and cleanroom owners; Tier 1/2 MEP contractors' },
  { href: 'services/india-market-entry/', img: 'ahmedabad-dusk', icon: 'entry', title: 'India Market Entry', text: 'Your base in India &mdash; from inception to completion and beyond. You keep every decision.', audience: 'European companies setting up in India' },
];

// The Services page shows the same three cards with their own photographs.
const SERVICES_PAGE_IMG = ['shaft-inspection', 'factory-floor', 'ahmedabad-towers'];
const SERVICES_PAGE = () => SERVICES.map((c, i) => ({ ...c, img: SERVICES_PAGE_IMG[i] }));

// Ten industries, names only (client, 23 Oct 2026). No descriptions are published for them.
const SECTORS = [
  ['semiconductor', 'semiconductor', 'Semiconductor fabs', ''],
  ['atmp-osat', 'atmp', 'ATMP / OSAT', ''],
  ['data-centres', 'datacentre', 'Hyperscale &amp; AI data centres', ''],
  ['pharma', 'pharma', 'Pharma &amp; biotech', ''],
  ['medical', 'medical', 'Medical devices &amp; hospitals', ''],
  ['ev-battery', 'battery', 'EV &amp; battery gigafactories', ''],
  ['renewables', 'hydrogen', 'Renewables &amp; green hydrogen', ''],
  ['transmission', 'transmission', 'Transmission &amp; substations', ''],
  ['defence-aerospace', 'defence', 'Defence &amp; aerospace', ''],
  ['electronics', 'electronics', 'Electronics &amp; display', ''],
];

const WHY = [
  ['Right first time', 'Quality and commissioning planned from day one, so facilities hand over on time and to specification.'],
  ['Irish and European standards', 'Leadership and master trainers drawn from Ireland&rsquo;s semiconductor construction heritage and live European mission-critical projects.'],
  ['Workforce built in', 'Our Skills Development programme supplies certified M&amp;E trades, so projects are not held back by skills gaps.'],
  ['One partner, end to end', 'From market entry and permissions to construction, commissioning and a trained workforce.'],
];

const WHY_ICONS = ['check', 'globe', 'people', 'link'];
// Each photo shows its point: testing (right first time), a senior engineer guiding a colleague
// (Irish and European standards), trainees at work (workforce built in), a team planning together (one partner).
// Home avoids the photos already used by its service cards.
const WHY_IMG = ['panel-test', 'drawing-review', 'workshop-trainees', 'laptop-review'];
const whyRows = (P = '', imgs = WHY_IMG) => `      <ol class="zig">
${WHY.map(([t, x], i) => `        <li class="zig__row reveal">
          <div class="zig__media">${photo(P, imgs[i], { sizes: '(max-width: 900px) 100vw, 50vw' })}</div>
          <div class="zig__copy"><span class="zig__num">0${i + 1}</span>${icons[WHY_ICONS[i]]}<h3 class="zig__title">${t}</h3><p class="zig__text">${x}</p></div>
        </li>`).join('\n')}
      </ol>`;
const whyTiles = (P = '', imgs = WHY_IMG) => ptiles(P, WHY.map(([t, x], i) => [imgs[i], WHY_ICONS[i], t, x]));

const sectorIcons = (P) => `      <ul class="icons6">
${SECTORS.map(([id, ic, name]) => `        <li class="icons6__item reveal"><a href="${P}sectors/#${id}">${icons[ic]}<span>${name}</span></a></li>`).join('\n')}
      </ul>`;

// "The pattern": four places each built capability alongside their programmes; India is
// next. A rising staircase (no figures, so nothing is claimed beyond the brief's sentence).
// The India step is solid where it is under way and dashed where FTR helps it rise.
const PATTERN = ['Ireland', 'Arizona', 'Singapore', 'Taiwan', 'India'];
const patternChart = (P) => `        <div class="pchart reveal">
          <ol class="pchart__steps" aria-label="Ireland, Arizona, Singapore and Taiwan have each built capability; India is next">
${PATTERN.map((n, i) => (i < 4
    ? `            <li class="pstep"><span class="pstep__bar" aria-hidden="true"><span class="pstep__num">0${i + 1}</span></span><span class="pstep__name">${n}</span></li>`
    : `            <li class="pstep pstep--next"><span class="pstep__bar" aria-hidden="true"><span class="pstep__num">0${i + 1}</span>${arrowImg(P, 'pstep__arrow')}<span class="pstep__tag">FTR is built to help</span></span><span class="pstep__name">${n}</span></li>`)).join('\n')}
          </ol>
        </div>`;

const patternSection = (P) => `  <section class="section on-navy gate pattern" id="pattern" aria-labelledby="pattern-h">
    <div class="pattern__bg">
      <img src="${P}assets/img/hero-cranes-1024.webp" srcset="${P}assets/img/hero-cranes-640.webp 640w, ${P}assets/img/hero-cranes-1024.webp 1024w, ${P}assets/img/hero-cranes-1600.webp 1600w" sizes="100vw" alt="" width="1024" height="682" loading="lazy" decoding="async">
    </div>
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">03</span>
        <span class="label">The pattern</span>
      </div>
      <div class="pattern__grid">
        <div class="pattern__copy">
          <h2 class="h2 wipe" id="pattern-h">Every programme has built the capability alongside it.</h2>
          <p class="lead">Ireland, Arizona, Singapore and Taiwan each built mission-critical execution capability alongside their programmes. India is now doing the same &mdash; FTR is built to help.</p>
        </div>
${patternChart(P)}
      </div>
    </div>
  </section>`;

// Hero: the facility word and the photograph change together.
const HERO_FACILITIES = [
  ['cleanroom-corridor', 'semiconductor fabs'],
  ['data-hall', 'data centres'],
  ['gmp-isolator', 'cleanrooms'],
];

const MARKET_STATS = [
  ['Foreign direct investment into India', '$58.85bn', 'FY2025-26', 'DPIIT'],
  ['Data centre capacity operational', '1.8 GW', 'In H1 2026; 7+ GW by 2030', 'Savills'],
  ['EU&ndash;India free trade agreement', '27 Jan 2026', 'Concluded', 'European Commission'],
];

// ---------------------------------------------------------------- Home
function home() {
  page({
    slug: '',
    title: 'FTR &mdash; Mission-Critical Construction, Skills &amp; India Entry',
    desc: 'FTR builds, commissions and staffs mission-critical facilities in India: semiconductor fabs, data centres and cleanrooms, to Irish and European standards.',
    css: ['home'],
    stuck: false,
    schema: [{ '@type': 'WebSite', '@id': 'https://ftright.com/#website', url: 'https://ftright.com/', name: 'FTR', publisher: { '@id': 'https://ftright.com/#organization' } }],
    body: (P) => `
  <section class="hero hero--rotor" aria-labelledby="h1">
    <div class="hero__media">
${HERO_FACILITIES.map(([img], i) => `      <img class="hero__shot${i ? '' : ' is-on'}" src="${P}assets/img/${img}-1600.webp"
           srcset="${P}assets/img/${img}-640.webp 640w, ${P}assets/img/${img}-1024.webp 1024w, ${P}assets/img/${img}-1600.webp 1600w"
           sizes="100vw" alt="" width="1600" height="1066"${i ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`).join('\n')}
    </div>
    <div class="shell hero__inner">
      <span class="label hero__label reveal">Irish &amp; European standards &middot; Built in India</span>
      <h1 class="display hero__title" id="h1">
        <span class="u-visually-hidden">We build India&rsquo;s semiconductor fabs, data centres and cleanrooms &mdash; right first time.</span>
        <span aria-hidden="true">We build India&rsquo;s <span class="rotor" data-rotor>${HERO_FACILITIES.map(([, w], i) => `<span class="rotor__word${i ? '' : ' is-on'}">${w}</span>`).join('')}</span> right first time.</span>
      </h1>
      <p class="hero__desc reveal">Construction, commissioning, skills and India market entry for semiconductor fabs, data centres and cleanrooms.</p>
      <div class="hero__actions reveal">
        <a class="btn btn--primary" href="${P}contact/">Discuss your project</a>
        <a class="btn btn--ghost" href="${P}services/">Explore services</a>
      </div>
    </div>
    <nav class="hero__strip reveal" aria-label="Our services">
      <div class="shell strip strip--3">
${SERVICES.map((s, i) => `        <a class="strip__item" href="${P}${s.href}"><span class="strip__num">0${i + 1}</span><span class="strip__name">${s.title}</span></a>`).join('\n')}
      </div>
    </nav>
  </section>

${sec({ id: 'intro', tone: 'on-paper', label: 'Why now', body: `      <p class="statement" id="__H__">India is building its semiconductor and data centre future. FTR brings Irish and European mission-critical execution standards to build it <strong>right first time</strong>.</p>` })}

${sec({ id: 'services', num: '01', label: 'Services', status: 'Three ways we work', body: `${head('Three services. One standard.')}
${cards3(P, SERVICES)}` })}

${sectorPanels(P, SECTORS)}

${patternSection(P)}

${sec({ id: 'why', num: '04', label: 'Why FTR', body: `${head('Four reasons to choose FTR.')}
${whyTiles(P)}
      ${more(P, P + 'why-ftr/', 'More on why FTR')}` })}

${band(P, { id: 'mission-h', img: 'cable-containment', label: 'Our mission', title: 'Right first time. Skills that stay.', text: 'Build India&rsquo;s mission-critical facilities right first time &mdash; and leave the skills behind so the capability stays in India.', href: P + 'about/', linkText: 'About FTR' })}

${sec({ id: 'leadership', tone: 'on-paper', num: '05', label: 'Leadership', status: 'Who you will deal with', body: `${head('Led by people with real European careers.')}
${team(P, false)}
      ${more(P, P + 'about/#leadership', 'Meet the leadership')}` })}

${sec({ id: 'market', num: '06', label: 'Market context', body: `${head('The market FTR is built for.')}
${stats(MARKET_STATS)}` })}

${ctaSection(P, { title: 'Building in India? Talk to us.', text: 'Tell us about the facility, the programme and the constraint. A member of the FTR team will reply.' }, '', ' on-navy')}
`,
  });
}

// ---------------------------------------------------------------- About
function about() {
  page({
    slug: 'about',
    title: 'About FTR &mdash; Mission-Critical Construction in India',
    desc: 'FTR is an India-based mission-critical M&amp;E construction, consultancy and skills company, led by people with 30+ years of European delivery experience.',
    schema: [crumbSchema([['Home', ''], ['About', 'about/']]),
      { '@type': 'Person', name: 'Vishnubhai (ND) Chaudhari', jobTitle: 'Executive Director, Corporate Affairs', worksFor: { '@id': 'https://ftright.com/#organization' } },
      { '@type': 'Person', name: 'Paul Colleary', jobTitle: 'Executive Director, Operations', worksFor: { '@id': 'https://ftright.com/#organization' } },
      { '@type': 'Person', name: 'Trushti Raval', jobTitle: 'CEO & Managing Director', worksFor: { '@id': 'https://ftright.com/#organization' } }],
    body: (P) => `
${hero({ P, label: 'About FTR', title: 'Irish and European mission-critical know-how, skilled and built into India&rsquo;s next generation of facilities.', lede: 'FTR (First Time Right) is an India-based mission-critical M&amp;E construction, consultancy and skills company.', photo: 'fire-main' })}

${sec({ id: 'who', num: '01', label: 'Who we are', body: `      <div class="who">
        <div class="who__copy">
          <h2 class="h2 wipe" id="__H__">What FTR does.</h2>
          <p class="lead reveal">FTR (First Time Right) is an <span class="hl">India-based</span> mission-critical <span class="hl">M&amp;E construction, consultancy and skills</span> company. We work on semiconductor fabs, ATMP/OSAT units, hyperscale data centres and cleanroom facilities, and help <span class="hl">European companies</span> establish their base in India.</p>
          <ul class="chips reveal" aria-label="Facility classes">
            <li class="chip">${icons.semiconductor}Semiconductor fabs</li>
            <li class="chip">${icons.atmp}ATMP/OSAT units</li>
            <li class="chip">${icons.datacentre}Hyperscale data centres</li>
            <li class="chip">${icons.cleanroom}Cleanroom facilities</li>
          </ul>
        </div>
        <div class="who__media">
          <figure class="who__photo reveal">${photo(P, 'crew-vests', { sizes: '(max-width: 900px) 50vw, 22vw' })}</figure>
          <figure class="who__photo who__photo--low reveal">${photo(P, 'crew-orange', { sizes: '(max-width: 900px) 50vw, 22vw' })}</figure>
        </div>
        <aside class="who__mission on-navy reveal" aria-label="Our mission">
          <span class="label">Our mission</span>
          <p class="who__quote">Build India&rsquo;s mission-critical facilities <span class="hl">right first time</span> &mdash; and leave the <span class="hl">skills</span> behind so the capability stays in India.</p>
        </aside>
      </div>` })}

${sec({ id: 'approach', tone: 'on-paper', num: '02', label: 'Our approach', body: `${head('Three commitments in how we work.')}
${ptiles(P, [
    ['laptop-review', 'globe', 'Irish and European execution standards, applied to the Indian programme'],
    ['qc-microscope', 'check', 'Commissioning and quality planned from day one, not bolted on at the end'],
    ['drawing-review', 'people', 'Train-the-trainer model: every project and programme builds Indian capability'],
  ])}
      <p class="stat__src">Our observations relate to the mission-critical facility class, not to Indian construction generally.</p>` })}

${sec({ id: 'leadership', num: '03', label: 'Leadership', status: 'Who you will deal with', body: `${head('The people behind FTR.')}
${team(P, true)}` })}

${ctaSection(P, {}, '', ' on-navy')}
`,
  });
}

// ---------------------------------------------------------------- Services overview
function services() {
  page({
    slug: 'services',
    title: 'Services &mdash; Skills, Construction &amp; India Entry | FTR',
    desc: 'Three services from FTR: MEP and cleanroom skills development, critical construction and consultancy, and India market entry for foreign companies.',
    schema: [crumbSchema([['Home', ''], ['Services', 'services/']])],
    body: (P) => `
${hero({ P, label: 'Services', title: 'Build it, commission it, staff it.', lede: 'FTR (First Time Right) builds, commissions and staffs mission-critical facilities in India &mdash; semiconductor fabs, ATMP/OSAT units, hyperscale data centres and cleanrooms &mdash; and helps European companies establish their base here.', photo: 'pipe-runs' })}

${sec({ id: 'three', num: '01', label: 'Three services', body: `${head('Choose the one that fits.')}
${cards3(P, SERVICES_PAGE())}` })}

${sec({ id: 'together', tone: 'on-navy', num: '02', label: 'How they fit together', body: `${head('One partner, end to end.', 'From market entry and permissions to construction, commissioning and a trained workforce.')}
${flow(P, [
    ['entry', 'India Market Entry', 'Market entry and permissions', 'services/india-market-entry/'],
    ['construction', 'Critical Construction', 'Construction and commissioning', 'services/critical-construction/'],
    ['skills', 'Skills Development', 'A trained workforce', 'services/skills-development/'],
  ])}` })}

${ctaSection(P, {}, '', '')}
`,
  });
}

// ---------------------------------------------------------------- Skills Development
function skills() {
  page({
    slug: 'services/skills-development',
    title: 'Cleanroom &amp; MEP Skills Certification &mdash; FTR',
    desc: 'Structured M&amp;E construction and commissioning certification for India: nine programmes taught by Irish and European master trainers. Partner, upskill or enrol.',
    schema: [crumbSchema([['Home', ''], ['Services', 'services/'], ['Skills Development', 'services/skills-development/']]),
      { '@type': 'Service', name: 'MEP & Cleanroom Skills Development', provider: { '@id': 'https://ftright.com/#organization' }, areaServed: 'India' }],
    body: (P) => `
${hero({ P, label: 'MEP &amp; Cleanroom Skills Development', title: 'India&rsquo;s first structured M&amp;E construction and commissioning certification programme.', lede: 'India is building chip designers and fab operators. FTR trains the specialist M&amp;E trades who physically build those facilities &mdash; piping, electrical, HVAC, cleanroom fit-out and commissioning &mdash; to the standard semiconductor and data centre projects demand.', photo: 'electrician-panel',
  crumbs: [['Services', 'services/'], ['Skills Development', null]],
  actions: `<a class="btn btn--primary" href="${P}careers/#skills">Partner with FTR</a><a class="btn btn--ghost" href="${P}careers/#skills">Upskill your workforce</a><a class="btn btn--ghost" href="${P}careers/#skills">Register interest</a>` })}

${sec({ id: 'programme', num: '01', label: 'The programme', body: `${head('How the certification works')}
      <dl class="facts">
        <div class="fact reveal"><dt class="fact__label">Programmes</dt><dd class="fact__value"><span class="count" data-to="9" data-pad="2">09</span></dd><dd class="fact__note">Across the trades</dd></div>
        <div class="fact reveal"><dt class="fact__label">Certification tiers</dt><dd class="fact__value"><span class="count" data-to="3" data-pad="2">03</span></dd><dd class="fact__note">Foundation, Trade Specialist, Deployment-Ready Diploma</dd></div>
        <div class="fact reveal"><dt class="fact__label">Foundation for all</dt><dd class="fact__value"><span class="count" data-to="9" data-pad="2">09</span><span class="fact__unit">weeks</span></dd><dd class="fact__note">Cleanroom Construction Fundamentals (6) + EHS Safe-Site Pass (3)</dd></div>
        <div class="fact reveal"><dt class="fact__label">Core trade pathway</dt><dd class="fact__value">~16<span class="fact__unit">weeks</span></dd><dd class="fact__note">Commissioning ~8 weeks. 360&ndash;1,120 hours per pathway</dd></div>
      </dl>` })}

${sec({ id: 'trades', tone: 'on-paper', num: '02', label: 'Trades covered', body: `${head('Five trades, one standard.')}
${ptiles(P, [['pipe-welder', 'piping', 'Process and utility piping'], ['breaker-wiring', 'electrical', 'Electrical'], ['roof-ventilation', 'hvac', 'HVAC'], ['cleanroom-corridor', 'cleanroom', 'Cleanroom fit-out'], ['control-room', 'commissioning', 'Commissioning']])}` })}

${sec({ id: 'tiers', num: '03', label: 'Certification tiers', body: `${head('Three certification tiers.')}
${tiers(['Foundation', 'Trade Specialist', 'Deployment-Ready Diploma'])}` })}

${sec({ id: 'length', tone: 'on-paper', num: '04', label: 'Programme length', body: `${head('Nine programmes, measured in weeks.')}
${bars()}` })}

${sec({ id: 'detail', num: '05', label: 'Who and how', body: `${head('Who teaches, who can enrol.')}
${kv([
    ['AI Infrastructure layer', 'Across programmes, plus DCE-AI (AI Infrastructure Engineering) at Tier 3.'],
    ['Taught by', 'Resident Irish and European master trainers with live semiconductor project heritage (Ireland&rsquo;s Intel Leixlip / Fab 34 track record).'],
    ['Who can enrol', 'ITI pass-outs, diploma holders, B.E./B.Tech graduates, experienced site workers.'],
    ['Lead contact', 'Vishnubhai (ND) Chaudhari.'],
    ['Sectors served', 'Semiconductor fabs, ATMP/OSAT, hyperscale and AI data centres, pharma and biotech, medical devices and hospitals, EV and battery gigafactories, renewables and green hydrogen, transmission and substations, defence and aerospace, electronics and display.'],
  ])}` })}

${band(P, { id: 'trainer-h', img: 'robotics-lab', dim: true, label: 'Train-the-trainer', title: 'Capability that stays in India.', text: 'Master trainers certify Indian instructors so capability stays in India.', href: P + 'careers/#trainer', linkText: 'Become a trainer' })}

${ctaSection(P, { title: 'Questions about skills development?', text: 'Government and institutions, contractors, and trainees each have their own route.', primary: 'Register interest', href: 'careers/#skills', secondary: 'Partner with FTR', secondaryHref: P + 'careers/#skills' }, '', ' on-navy')}
`,
  });
}

// ---------------------------------------------------------------- Critical Construction
function construction() {
  page({
    slug: 'services/critical-construction',
    title: 'Critical M&amp;E Construction &amp; Commissioning &mdash; FTR',
    desc: 'Specialist consultancy, package delivery or full EPC for fabs, data centres and cleanrooms in India, to Irish and European mission-critical standards.',
    schema: [crumbSchema([['Home', ''], ['Services', 'services/'], ['Critical Construction', 'services/critical-construction/']]),
      { '@type': 'Service', name: 'Critical Construction & Consultancy', provider: { '@id': 'https://ftright.com/#organization' }, areaServed: 'India' }],
    body: (P) => `
${hero({ P, label: 'Critical Construction &amp; Consultancy', title: 'Mission-critical M&amp;E delivery, right first time.', lede: 'Semiconductor fabs, data centres and cleanrooms are a different facility class &mdash; general M&amp;E practice does not transfer. FTR brings Irish and European mission-critical execution standards to Indian projects, as specialist consultants or as the delivery contractor.', photo: 'switchgear-hall',
  crumbs: [['Services', 'services/'], ['Critical Construction', null]],
  actions: `<a class="btn btn--primary" href="${P}contact/?type=critical-construction">Discuss your project</a>` })}

${sec({ id: 'models', num: '01', label: 'Engagement models', body: `${head('Three ways to engage FTR.')}
      <ul class="cards3">
${[
    ['site-engineer', 1, 'Advice', 'Specialist consultancy', 'Planning, quality assurance/control and commissioning consultancy on client or contractor teams.'],
    ['pipe-fitting', 2, 'Packages', 'Package delivery', 'Defined M&amp;E packages &mdash; e.g. process piping, cleanroom fit-out, HVAC, electrical, commissioning.'],
    ['data-hall', 3, 'Full scope', 'Full EPC', 'Complete critical-construction delivery for semiconductor and data centre projects.'],
  ].map(([img, n, cap, t, x]) => `        <li class="card3 card3--static card3--photo reveal"><div class="card3__box"><div class="card3__photo">${photo(P, img)}</div><div class="card3__body"><span class="card3__num">0${n}</span>${meter(n, cap)}<h3 class="card3__title">${t}</h3><p class="card3__text">${x}</p></div></div></li>`).join('\n')}
      </ul>` })}

${band(P, { id: 'class-h', img: 'transformers', dim: true, label: 'A different facility class', title: 'General M&amp;E practice does not transfer.', text: 'Quality and commissioning are planned from day one, not bolted on at the end.', href: P + 'why-ftr/', linkText: 'Why FTR' })}

${sec({ id: 'people', tone: 'on-paper', num: '02', label: 'Who delivers', body: `${head('Leadership and workforce track record.', 'The team is Irish, European and Indian, with projects delivered across Europe.')}
${team(P, false)}
${kv([['Lead contacts', 'Trushti Raval and Paul Colleary.']])}` })}

${sec({ id: 'points', tone: 'on-navy', num: '03', label: 'What you get', body: `      <div class="pointsplit">
        <p class="statement" id="__H__">Quality. On-time delivery. Commissioning-led planning. Irish-standard governance. And a skilled workforce pipeline from <strong>Skills Development</strong>.</p>
        <div class="pointsplit__photo reveal">${photo(P, 'substation', { sizes: '(max-width: 900px) 100vw, 40vw' })}</div>
      </div>` })}

${ctaSection(P, { primary: 'Discuss your project', type: 'critical-construction' }, '', '')}
`,
  });
}

// ---------------------------------------------------------------- India Market Entry
function entry() {
  const steps = [
    ['Qualify', 'Fit and scope check'],
    ['Paid validation', 'Site, incentives and feasibility'],
    ['Entry plan', 'Location, structure, timeline'],
    ['Establishment', 'Land, permissions, licences, utilities, build'],
    ['Readiness and handover', 'Construction-ready facility'],
    ['Beyond', 'Skilled workforce from FTR Skills Development'],
  ];
  page({
    slug: 'services/india-market-entry',
    title: 'Set Up in India &mdash; European Company Entry &mdash; FTR',
    desc: 'FTR helps European companies set up in India: site, permissions, licences, utilities and construction readiness. Book an India entry call.',
    schema: [crumbSchema([['Home', ''], ['Services', 'services/'], ['India Market Entry', 'services/india-market-entry/']]),
      { '@type': 'Service', name: 'India Market Entry for Foreign Companies', provider: { '@id': 'https://ftright.com/#organization' }, areaServed: 'India' }],
    body: (P) => `
${hero({ P, label: 'India Market Entry for Foreign Companies', title: 'Your base in India &mdash; from inception to completion and beyond.', lede: 'FTR helps European companies in semiconductors, data centres and advanced manufacturing establish operations in India. We handle site, permissions, licences, utilities and construction readiness, while you keep every decision.', photo: 'ahmedabad-bridge',
  crumbs: [['Services', 'services/'], ['India Market Entry', null]],
  actions: `<a class="btn btn--primary" href="${P}contact/?type=india-market-entry">Book an India entry call</a>` })}

${sec({ id: 'stages', num: '01', label: 'Engagement stages', body: `${head('Six stages, from first call to a working workforce.')}
      <ol class="hsteps">
${steps.map(([t, x], i) => `        <li class="hstep reveal"><span class="hstep__num">0${i + 1}</span><h3 class="hstep__title">${t}</h3><p class="hstep__text">${x}</p></li>`).join('\n')}
      </ol>` })}

${sec({ id: 'detail', tone: 'on-paper', num: '02', label: 'What to expect', body: `${head('Where, who and how fast.')}
${route(['Ireland', 'Finland', 'Netherlands', 'Sweden', 'Denmark', 'Germany', 'Belgium', 'and wider Europe'])}
${kv([
    ['Permissions and licences', 'Driven through proven channels.'],
    ['Lead contact', 'Paul Colleary.'],
  ])}` })}

${band(P, { id: 'pilot-h', img: 'steel-structure', dim: true, label: 'Pilot offer', title: '180-day target to construction readiness.', text: 'You keep every decision while FTR drives the work.', href: P + 'contact/?type=india-market-entry', linkText: 'Book an India entry call' })}

${sec({ id: 'context', num: '03', label: 'Market context', body: `${head('Why now.')}
${stats([
    ['Foreign direct investment into India', '$58.85bn', 'FY2025-26, up 18%', 'DPIIT'],
    ['EU&ndash;India free trade agreement', '27 Jan 2026', 'Concluded', 'European Commission'],
    ['EU firms in India planning expansion', '95%', 'Survey, January 2026', 'FEBI survey, Jan 2026'],
  ])}` })}

${ctaSection(P, { title: 'Book an India entry call.', text: 'Tell us about your company and what you want to establish in India.', primary: 'Book an India entry call', type: 'india-market-entry' }, '', ' on-navy')}
`,
  });
}

module.exports = { home, about, services, skills, construction, entry, SECTORS, WHY, whyTiles, whyRows, band };
