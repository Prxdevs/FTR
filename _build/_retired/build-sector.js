// Builds the three sector pages. Run: node _build/build-sector.js
//
// SOURCES (Docs/FTR_India_Mission_Critical_Master_Deck.txt = MD):
//   Semiconductor  MD 5, 6, 7, 3     Data Centres  MD 5, 8, 9, 21     Pharma GMP  MD 5, 10, 11
// Plain-language lead lines, glossary definitions, section labels and FAQ
// questions are OURS (written for visitors) and need client sign-off.
// Facts, names, figures and scope are the client's.
const { term, link, faq, faqSchema, next, read, write, organization, plain } = require('./lib');

const P = '../../';

const sectors = [
  {
    slug: 'semiconductors', img: 'sector-semiconductor', cls: 'semi',
    name: 'Semiconductor', label: 'Sectors &middot; 01',
    heroTitle: 'Where a tiny air-conditioning error can cost a whole batch of chips.',
    heroLede: 'We build and commission the cleanrooms, ultra-pure water systems and power behind India&rsquo;s chip plants &mdash; and prove they work before production starts.',
    hardHead: 'One speck of dust can ruin a batch.',
    hardBody: [
      `A chip plant is built to cleanliness standards far beyond any ordinary building. Air, water and gases must hold to specification all the time, because a small fault in the building can wipe out a whole batch of wafers. That is why these plants are accepted on <strong>how they perform, not on whether they look finished</strong>.`,
      `The standards are exact: air filtered through ${term('hepa')} filters, the right pressure held between rooms (${term('diffpressure')}), static control (${term('esd')}) and cleanroom construction graded to ${term('iso14644')}.`,
    ],
    stat: ['&#8377;91,000 cr', 'The Tata&ndash;PSMC fab at Dholera, Gujarat: past the halfway mark of construction, with trial production targeted for December 2026.'],
    benchmark: `Taiwan&rsquo;s PSMC, Tata&rsquo;s own partner at Dholera, treats zero contamination as standard practice. Ireland&rsquo;s Intel Leixlip campus, a &euro;17 billion investment, shows what thirty years of cleanroom know-how looks like. FTR&rsquo;s leadership came up in that Irish cluster.`,
    deliverIntro: 'Five things, delivered by one team to one standard.',
    deliver: [
      ['Clean utilities', `Ultra-pure (${term('diwater')}) water, specialty gases and process piping, built and proven to specification. They touch the product directly.`],
      ['Power', 'Low- and medium-voltage distribution: switchboards, transformers, busbar and earthing. A fab cannot lose power or tolerate poor earthing.'],
      ['Cleanroom discipline', `Gowning, contamination control, static control and pressure control between rooms, kept up by every trade on site.`],
      ['Trade coordination', 'Every trade on a fab floor works in the same tight space. We sequence them so no one undoes anyone else&rsquo;s work.'],
      ['Inspection and commissioning', `Written inspection and sign-off at every stage, to the same rigour as our pharma work, then ${term('commissioning')} through to handover.`],
    ],
    built: [
      ['Tata Electronics &ndash; PSMC Fab', 'Dholera, Gujarat', '&#8377;91,000 cr &middot; 50,000 wafers a month &middot; 28nm &middot; past 50% built', 'Cleanroom systems, precision utilities, and 600&ndash;825 deployment-ready professionals on this project alone'],
      ['Micron ATMP', 'Sanand, Gujarat', 'Operational &mdash; inaugurated 28 Feb 2026', 'Cleanroom systems, precision utilities, quality specialists'],
      ['CG Power + Renesas OSAT', 'Sanand-II, Gujarat', 'Approved and moving to commissioning', 'Cleanroom coordination and commissioning specialists'],
      ['Surat OSAT &amp; Diamond Processing Zone', 'Surat, Gujarat', 'Developing', 'Precision facility systems, cleanroom coordination, commissioning'],
    ],
    builtIntro: `These are the plants rising in Gujarat, where our office sits. ${term('atmp', 'ATMP')} and ${term('osat', 'OSAT')} units finish and test chips; fabs make them. The government&rsquo;s ${term('ism')} backs them all.`,
    faq: [
      ['Why is FTR based in Ahmedabad?', 'Ahmedabad sits between Sanand and Dholera, where India&rsquo;s fabs, ATMP and OSAT units are physically going up. Our office is inside the cluster we deliver for.'],
      ['Can FTR join a project that is already under way?', 'Yes. Our planning, quality and commissioning service works alongside your existing contractors, with no change to contract structure.'],
      ['Do you build the whole plant, or only parts?', 'Either. We can take single-point responsibility as principal contractor, or deliver specialist electrical and civil packages inside someone else&rsquo;s programme.'],
    ],
    nextHref: '../data-centres/', nextTitle: 'Data Centres',
    desc: 'Cleanroom construction, ultra-pure utilities and commissioning for semiconductor fabs, ATMP and OSAT units in India’s Gujarat chip cluster.',
  },
  {
    slug: 'data-centres', img: 'sector-data-centres', cls: 'dc',
    name: 'Data Centres', label: 'Sectors &middot; 02',
    heroTitle: 'Judged on what survives, not what runs.',
    heroLede: 'We build and commission the power and cooling inside hyperscale data centres &mdash; and test them by making them fail, before any customer data goes live.',
    hardHead: 'Uptime is the product.',
    hardBody: [
      `A data centre earns money only while it stays on. It is not accepted because its systems run; it is accepted because they <strong>keep running when things are made to fail</strong>: a power cut, a generator start, a loss of cooling.`,
      `That takes backup power designed so no single failure matters (${term('n1')} or ${term('twoN')}), batteries and generators that hand over in the right order (${term('ups')}), cooling that keeps pace with dense racks, and a full round of ${term('ist')} before any rack goes live.`,
    ],
    stat: ['1.8 GW', 'India&rsquo;s operational data-centre capacity in the first half of 2026.'],
    benchmark: `Ireland hosts 82 operational data centres, with 14 more under construction (2024). Irish-led firms deliver 430+ MW of IT load across seven European countries for AWS, Google, Microsoft and Meta. The testing and quality heritage built there, in firms like Mercury Engineering, is the standard this work is built against.`,
    deliverIntro: 'Five things, from the first cable to the final test.',
    deliver: [
      ['Critical power', `High- and low-voltage distribution, switchgear, busbar, ${term('ups', 'UPS')} systems and standby generators, built as ${term('n1')} or ${term('twoN')} and load-tested.`],
      ['Cooling', `${term('crah')} cooling units sized for rack density, and liquid cooling for AI-density halls.`],
      ['Controls and safety', `${term('bms')} control systems, fire and gas detection, and the controls that tie them into commissioning.`],
      ['Failure testing', `${term('ist')}, with ${term('ce')} proven end to end before a rack goes live.`],
      ['Full commissioning', `All five commissioning levels, through to turnover and operational readiness (see the ladder below).`],
    ],
    ladder: true,
    built: [
      ['Data Centre cluster', 'GIFT City / Ahmedabad, Gujarat', '', 'Critical power, cooling, controls and integrated testing and commissioning'],
      ['AdaniConneX', 'Navi Mumbai + six concurrent campuses', '', 'Schedule discipline to meet hyperscaler deployment timelines'],
      ['Yotta D1', 'Greater Noida, Uttar Pradesh', '', 'Safe working on a live site that keeps expanding'],
      ['NTT / GDC Chennai 2', 'Chennai, Tamil Nadu', '', 'Strict document control and integrated systems testing'],
    ],
    builtIntro: 'Data-centre building is happening in every major Indian metro at once.',
    pipeline: 'Behind these sit a US$100bn Adani Group commitment to AI-ready data centres (Feb 2026), Google&rsquo;s ~US$15bn AI hub at Visakhapatnam (1 GW, 2026&ndash;2030), Microsoft&rsquo;s Hyderabad and Pune campuses and Flipkart&rsquo;s second AI facility. When one campus slips, it pulls senior delivery people off the others &mdash; the layer that scales worst.',
    faq: [
      ['What does &ldquo;commissioning&rdquo; actually mean?', 'It means proving a finished facility works as designed before it is handed over. For a data centre that is five staged levels of testing, from factory checks to a full-load failure test.'],
      ['What is the difference between N+1 and 2N?', 'N+1 adds one spare unit beyond what the load needs. 2N builds a complete second system, so a whole side can fail and the hall stays on.'],
      ['Can FTR handle AI-density cooling?', 'Yes. Our scope includes liquid cooling for AI-density halls, alongside conventional precision air cooling.'],
    ],
    nextHref: '../pharmaceuticals/', nextTitle: 'Pharma GMP',
    desc: 'Critical power, precision cooling and integrated failure testing for hyperscale data centres, built to the standard Ireland’s hyperscale firms set.',
  },
  {
    slug: 'pharmaceuticals', img: 'sector-pharma', cls: 'pharma',
    name: 'Pharma GMP', label: 'Sectors &middot; 03',
    heroTitle: 'Answers to a regulator, not only a client.',
    heroLede: 'We build and commission the cleanrooms and clean utilities of pharmaceutical plants, with the paperwork a regulator will audit already in place.',
    hardHead: 'Proven before it opens.',
    hardBody: [
      `A pharmaceutical plant answers to a regulator, not just a client. Every system must be <strong>provably validated before the facility can operate</strong>, and the records must be good enough to survive an audit.`,
      `That means documented ${term('iqoqpq')} checks, cleanroom behaviour as strict as in a chip fab, and compliance with WHO, USFDA and EU ${term('gmp')} guidelines.`,
    ],
    stat: ['6 shared disciplines', 'Planning, quality, safety, 3D design, commissioning and contamination control run across semiconductor, data-centre and pharma work, so one trained team serves all three.'],
    benchmark: `Europe sets the standard here, and Ireland is the main reference, recognised worldwide for pharmaceutical engineering. The key transfer is validation discipline taught to audit-ready standard before the first live project, not learned under regulatory pressure.`,
    deliverIntro: 'Four things, built to be audited.',
    deliver: [
      ['Clean utilities', `Process piping, ${term('diwater')} systems and valves, shared directly with our semiconductor work.`],
      ['Validation-grade quality', `Written inspection plans (${term('itp')}) and tracking of material and ${term('ncr', 'non-conformances')}, kept to audit standard.`],
      ['Qualification sequencing', `Planning the ${term('iqoqpq')} steps so each one is ready, in order, for the regulator.`],
      ['Cleanroom construction', `Built to ${term('iso14644')} grades, with the finishes, tolerances and floors that classification demands.`],
    ],
    built: [
      ['Pharma &amp; Life Sciences Corridor', 'Ankleshwar &amp; Bharuch, Gujarat', '', 'Clean utilities, process piping and validation-ready quality control'],
      ['Vadodara PCPIR Complex', 'Vadodara, Gujarat', '', 'A chemical and pharma industrial complex; civil and mechanical quality discipline'],
    ],
    builtIntro: 'Gujarat holds two of India&rsquo;s main pharma and chemical clusters.',
    faq: [
      ['What is GMP?', 'Good Manufacturing Practice: the rules that make medicines safe to produce. Facilities must be built and proven to meet them.'],
      ['Why does the same team work on chips and pharma?', 'Both depend on the same disciplines: planning, quality control, safety, 3D design, commissioning and contamination control. Training one team model is more reliable than rebuilding skills sector by sector.'],
      ['Which standards do you build to?', 'Compliance runs to WHO, USFDA and EU GMP guidelines, with European, and particularly Irish, practice as our reference.'],
    ],
    nextHref: '../../academy/', nextTitle: 'FTR Academy',
    desc: 'Clean utilities, validation-grade quality control and IQ/OQ/PQ sequencing for pharma GMP plants, audit-ready before the first live project.',
  },
];

const ladder = [
  ['L1', 'Factory and site acceptance', 'Critical equipment (switchgear, UPS, generators, chillers) is tested and witnessed against specification before it is accepted on site.'],
  ['L2', 'Pre-commissioning', 'Static checks before anything is switched on: continuity, insulation, pressure, cleanliness and calibration.'],
  ['L3', 'System commissioning', 'Each system is started up on its own and proven against the design.'],
  ['L4', 'Integrated systems testing', 'Everything together under full load and deliberate failure: power loss, generator start, UPS transfer, cooling loss. This is the level that decides a data-centre programme.'],
  ['L5', 'Turnover and readiness', 'Indexed records, certification, punch-list closure, operations training and a readiness review.'],
];

for (const s of sectors) {
  const dir = `markets/${s.slug}`;
  const old = read(`${dir}/index.html`);
  const header = old.match(/<header class="header is-stuck">[\s\S]*?<\/header>/)[0];
  const footer = read('contact/index.html').match(/<footer class="footer">[\s\S]*?<\/footer>/)[0]
    .replace(/href="\.\.\//g, 'href="../../').replace(/src="\.\.\/assets\//g, 'src="../../assets/').replace(/srcset="\.\.\/assets\//g, 'srcset="../../assets/');
  if (/ style="/.test(header + footer)) throw new Error('inline style in shell: ' + s.slug);

  const TITLE = `${s.name} Construction &amp; Commissioning in India | FTR`;
  const titleLen = plain(TITLE).length;
  if (titleLen >= 60) throw new Error(`title too long: ${s.slug} ${titleLen}`);
  if (s.desc.length > 160) throw new Error(`description too long: ${s.slug} ${s.desc.length}`);

  const deliverRows = s.deliver.map(([n, t]) => `        <li class="deliver__item reveal">
          <h3 class="h4 deliver__name">${n}</h3>
          <p class="deliver__text">${t}</p>
        </li>`).join('\n');

  const builtRows = s.built.map(([name, loc, scale, need]) => `        <li class="anchor reveal">
          <div class="anchor__head">
            <h3 class="h4 anchor__name">${name}</h3>
            <span class="anchor__loc">${loc}</span>
          </div>${scale ? `
          <p class="anchor__scale">${scale}</p>` : ''}
          <p class="anchor__demand"><strong>What the site needs:</strong> ${need}</p>
        </li>`).join('\n');

  const ladderHtml = s.ladder ? `
      <div class="ladder reveal">
        <div class="ladder__tabs" role="tablist" aria-label="The five commissioning levels">
${ladder.map(([l], i) => `          <button class="ladder__tab" type="button" role="tab" id="lt${i + 1}" aria-controls="lp${i + 1}" aria-selected="${i === 0}">${l}</button>`).join('\n')}
        </div>
${ladder.map(([l, h, t], i) => `        <div class="ladder__panel" role="tabpanel" id="lp${i + 1}" aria-labelledby="lt${i + 1}">
          <h3 class="h3">${l} &middot; ${h}</h3>
          <p>${t}</p>
        </div>`).join('\n')}
        <p class="ladder__note">We plan Level 4 from the first baseline, as a verification event, not a discovery event.</p>
      </div>` : '';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      { '@type': 'Service', name: `${s.name} construction and commissioning`, url: `https://ftright.com/markets/${s.slug}/`, description: s.desc, provider: { '@id': 'https://ftright.com/#organization' }, areaServed: { '@type': 'Country', name: 'India' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ftright.com/' },
        { '@type': 'ListItem', position: 2, name: 'Sectors', item: 'https://ftright.com/markets/' },
        { '@type': 'ListItem', position: 3, name: s.name, item: `https://ftright.com/markets/${s.slug}/` },
      ] },
      faqSchema(s.faq),
    ],
  };

  const html = `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${TITLE}</title>
<meta name="description" content="${s.desc}">
<link rel="canonical" href="https://ftright.com/markets/${s.slug}/">

<meta property="og:type" content="website">
<meta property="og:url" content="https://ftright.com/markets/${s.slug}/">
<meta property="og:title" content="${s.name} Construction &amp; Commissioning | FTR">
<meta property="og:description" content="${s.desc}">
<meta property="og:image" content="https://ftright.com/assets/img/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${P}assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${P}assets/img/favicon-180.png">

<link rel="preload" href="${P}assets/fonts/space-grotesk-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${P}assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>

<link rel="stylesheet" href="${P}assets/css/fonts.css">
<link rel="stylesheet" href="${P}assets/css/tokens.css">
<link rel="stylesheet" href="${P}assets/css/base.css">
<link rel="stylesheet" href="${P}assets/css/sector.css">

<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
</head>

<body>

<a class="skip" href="#main">Skip to content</a>

${header}

<main id="main">

  <!-- ================= HERO =================
       Plain headline and lede (ours), real sector photograph. -->
  <section class="phero phero--${s.cls}" aria-labelledby="sector-h1">
    <div class="phero__photo" aria-hidden="true">
      <img src="${P}assets/img/${s.img}-1200.webp"
           srcset="${P}assets/img/${s.img}-480.webp 480w,
                   ${P}assets/img/${s.img}-800.webp 800w,
                   ${P}assets/img/${s.img}-1200.webp 1200w"
           sizes="100vw" alt="" role="presentation" width="800" height="1200"
           fetchpriority="high" decoding="async">
    </div>

    <div class="shell phero__inner">
      <nav class="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="${P}">Home</a></li>
          <li><a href="../">Sectors</a></li>
          <li><span aria-current="page">${s.name}</span></li>
        </ol>
      </nav>
      <span class="label phero__label reveal">${s.label}</span>
      <h1 class="display phero__title wipe" id="sector-h1">${s.heroTitle}</h1>
      <p class="phero__lede reveal">${s.heroLede}</p>
    </div>
  </section>


  <!-- ================= 01 · WHY IT'S HARD =================
       Source: MD ${s.slug === 'semiconductors' ? '5, 6' : s.slug === 'data-centres' ? '5, 8' : '5, 10'} (argument and benchmark), rewritten plainly. -->
  <section class="section gate" id="hard" aria-labelledby="hard-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">01</span>
        <span class="label">Why it&rsquo;s hard</span>
        <span class="gate__status">The challenge</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="hard-h">${s.hardHead}</h2>
        </div>
        <div class="split__body reveal">
          <div class="prose">
${s.hardBody.map((p) => `            <p>${p}</p>`).join('\n')}
          </div>
        </div>
      </div>

      <dl class="facts facts--one">
        <div class="fact reveal">
          <dt class="fact__label">${s.slug === 'pharmaceuticals' ? 'One team' : 'In figures'}</dt>
          <dd class="fact__value fact__value--text">${s.stat[0]}</dd>
          <p class="fact__note">${s.stat[1]}</p>
        </div>
      </dl>

      <div class="grid note reveal">
        <span class="label note__label">Where the standard comes from</span>
        <div class="note__body prose">
          <p>${s.benchmark}</p>
        </div>
      </div>
    </div>
  </section>


  <!-- ================= 02 · WHAT WE DELIVER =================
       Source: MD ${s.slug === 'semiconductors' ? '6' : s.slug === 'data-centres' ? '8, 21' : '10'} (scope), each item given a plain name and a reason. -->
  <section class="section on-paper gate" id="deliver" aria-labelledby="deliver-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">02</span>
        <span class="label">What we deliver</span>
        <span class="gate__status">Scope</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="deliver-h">What we deliver.</h2>
          <p class="lead split__lede">${s.deliverIntro}</p>
        </div>
        <ul class="split__body deliver">
${deliverRows}
        </ul>
      </div>
${ladderHtml}
    </div>
  </section>


  <!-- ================= 03 · WHERE IT'S BEING BUILT =================
       Source: MD ${s.slug === 'semiconductors' ? '7' : s.slug === 'data-centres' ? '9' : '11'} (named projects). Named projects are the pipeline, not FTR's portfolio. -->
  <section class="section gate" id="built" aria-labelledby="built-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">03</span>
        <span class="label" id="built-h">Where it&rsquo;s being built</span>
        <span class="gate__status">The pipeline</span>
      </div>

      <p class="lead">${s.builtIntro}</p>

      <ul class="anchors">
${builtRows}
      </ul>
${s.pipeline ? `
      <div class="grid note reveal">
        <span class="label note__label">The pipeline behind it</span>
        <div class="note__body prose">
          <p>${s.pipeline}</p>
        </div>
      </div>` : ''}
    </div>
  </section>


  <!-- ================= 04 · QUESTIONS =================
       Questions are ours; answers draw on MD 5&ndash;11, 17, 21. -->
  <section class="section on-paper gate" id="questions" aria-labelledby="questions-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">04</span>
        <span class="label" id="questions-h">Questions</span>
        <span class="gate__status">Answered plainly</span>
      </div>

      ${faq(s.faq)}
    </div>
  </section>


  <!-- ================= NEXT STEP + CTA ================= -->
  <section class="section gate" id="contact-cta" aria-labelledby="cta-h">
    <div class="shell">
      ${next(P, s.nextHref, 'Next', s.nextTitle)}

      <div class="cta cta--after reveal">
        <div class="lockup">
          <span class="lockup__rule" aria-hidden="true"></span>
          <span class="lockup__text">First Time Right</span>
          <span class="lockup__rule" aria-hidden="true"></span>
        </div>

        <h2 class="h1 cta__title wipe" id="cta-h">We start with one working session.</h2>
        <p class="lead cta__text">
          One session on the facility, the programme and the current constraint.
          Nothing beyond it is asked of you until it is worth asking.
        </p>

        <div class="cta__actions">
          <a class="btn btn--primary" href="../../contact/">Arrange a session</a>
          <a class="btn btn--outline" href="tel:+919558062611">+91 95580 62611</a>
        </div>
      </div>
    </div>
  </section>

</main>


${footer}

<script src="${P}assets/js/main.js" defer></script>
</body>
</html>
`;

  write(`${dir}/index.html`, html);
  console.log(s.slug, html.length, 'bytes; title', titleLen, 'chars; description', s.desc.length, 'chars');
}
