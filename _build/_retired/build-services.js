// Builds /services/. Run: node _build/build-services.js
//
// SOURCES: services 01-04 = FTR_Project_Brief.md 1.5 and homepage engage copy;
// "Good for" lines and the chooser = Master Deck slide 18 (best point of entry,
// client resource); "Issued on request" = MD 12, 25, 28 and Academy deck 12.
// "In short" lines, chooser wording, FAQ questions, glossary = OURS (client sign-off).
const { term, link: link0, faq, faqSchema, next, read, write, organization, plain } = require('./lib');

const P = '../';
const link = (href, text) => link0(P, href, text);

const header = read('services/index.html').match(/<header class="header is-stuck">[\s\S]*?<\/header>/)[0];
const footer = read('contact/index.html').match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];
if (/ style="/.test(header + footer)) throw new Error('inline style in shared shell');

const TITLE = 'EPC, Commissioning &amp; Skills Services in India | FTR';
const DESC = 'Four services, one delivery system: skills development, planning, quality and commissioning, EPC and principal contractor, and India entry advisory.';
if (plain(TITLE).length >= 60) throw new Error('title too long');
if (DESC.length > 160) throw new Error('description too long');

const services = [
  {
    id: 'skills', num: '01', name: 'Skills Development', status: 'National programme',
    lede: 'National programme certifying India&rsquo;s mission-critical construction workforce, delivered inside the Government ITI network.',
    short: 'We train and certify the people who build fabs and data centres, working through existing government training institutes.',
    fit: ['Government and institutional partners', 'A programme, not a project: the skills stay with the State.'],
    prose: [
      '<strong>Existing government institutions, upgraded to a single specification.</strong> Resident Irish and European master trainers certify serving Government instructors in parallel with trainee delivery.',
      `<strong>Certification measured on physical evidence</strong> &mdash; inspection plans (${term('itp', 'ITPs')}), weld logs, pressure-test packs, termination records, ${term('ncr', 'non-conformance')} management, ${term('commissioning')} through to integrated systems testing. Cleanroom discipline and safety are certified in their own right.`,
      '<strong>Nine specialist programmes</strong>, from cleanroom fundamentals and orbital welding to testing and commissioning through L1&ndash;L5, each mapped to a live project role and delivered 70% practical. An explicit pathway for women into the sector runs across all of them.',
    ],
    issued: 'The Detailed Project Report, presented together with our senior Irish faculty at the Government&rsquo;s direction.',
    links: link('../academy/', 'FTR Academy'),
  },
  {
    id: 'assurance', num: '02', name: 'Planning, Quality and Commissioning', status: 'Fastest to deploy',
    lede: 'Independent assurance on a project already moving.',
    short: 'An independent team that checks quality, schedule and testing on a project that is already under way, without replacing anyone.',
    fit: ['Any stage, including mid-construction', 'Low to moderate effort from your side.'],
    prose: [
      `<strong>Alongside your existing contractors.</strong> FTR acts as ${term('commissioning', 'commissioning authority')}, quality authority and planning function, with no change to contract structure. Nothing is re-procured and nobody is replaced.`,
      `<strong>Quality authority with power to prevent progression.</strong> Commissioning management, ${term('p6')} planning and project controls, design and interface management, and turnover and operational readiness sit inside the same appointment. Work that fails a ${term('holdpoint')} does not move on.`,
      '<strong>The fastest service to deploy.</strong> Deployable at any stage, including mid-construction.',
    ],
    issued: 'The FTR QA/QC Management Standard and the corporate policy set, issued for review in the prequalification pack.',
    links: `${link('../#system', 'The six delivery gates')}${link('../#standard', 'The published standard')}`,
  },
  {
    id: 'epc', num: '03', name: 'EPC and Principal Contractor', status: 'One accountable party',
    lede: 'Single contract, single programme, single accountable party.',
    short: `One company, responsible for building the whole facility from start to finish (${term('epc')}).`,
    fit: ['Before construction starts', 'Lowest effort from your side: one contract and one point of contact.'],
    prose: [
      '<strong>Principal contractor role.</strong> Engineering coordination, procurement, construction, testing, commissioning and turnover under one programme, one interface and one accountable contract &mdash; with Irish and European specialist partners integrated into delivery rather than bolted on.',
      '<strong>Best entered pre-construction</strong>, at strategy or procurement stage, where the sequencing decisions that govern schedule are still open.',
      `<strong>Where a principal contractor already exists,</strong> FTR self-delivers specialist electrical, mechanical and civil, structural and architectural packages instead &mdash; the same standard, a narrower scope. Best entered at package award or long-lead procurement, where material approval and traceability still decide the outcome.`,
    ],
    issued: 'The Key Personnel and Experience Pack: full curricula vitae and named project references for key personnel, at prequalification stage.',
    links: `${link('../about/#bring', 'What we bring')}${link('../about/#governance', 'Governance')}`,
  },
  {
    // The client's own note flags this as the least evidenced service: parts were
    // written from what FTR demonstrably does, not from a supplied description.
    id: 'entry', num: '04', name: 'India Entry Advisory', status: 'Overseas companies',
    lede: 'For overseas companies establishing operations in India.',
    short: 'Practical help for overseas companies setting up in India, including legally bringing in your own people.',
    fit: ['Overseas companies setting up in India', 'Resident delivery capability from day one.'],
    prose: [
      '<strong>Lawful deployment of personnel.</strong> FTR sponsors Employment visas directly as an India-registered entity; business visas do not permit paid work.',
      '<strong>What the advisory covers.</strong> Entity and governance structuring, market and corridor selection, and resident delivery capability from day one.',
    ],
    issued: '',
    links: link('../about/', 'About FTR'),
  },
];

// Chooser: stage -> best-fit service. Source: MD 18 "Best point of entry".
const choices = [
  ['We haven&rsquo;t started building yet', 'epc', 'Full EPC and Principal Contractor', 'Best entered before construction, while the decisions that shape the schedule are still open. One contract, one programme, one accountable party.'],
  ['Building is already under way', 'assurance', 'Planning, Quality and Commissioning', 'Deployable at any stage, including mid-construction. It works alongside your existing contractors with no change to contract structure.'],
  ['We&rsquo;re awarding a package or ordering long-lead items', 'epc', 'Electrical &amp; specialist packages', 'FTR self-delivers specialist electrical, mechanical and civil packages inside your principal contractor&rsquo;s programme, to the same standard.'],
  ['We&rsquo;re an overseas company entering India', 'entry', 'India Entry Advisory', 'Entity set-up, market selection and, because FTR is India-registered, direct visa sponsorship for your people.'],
  ['We&rsquo;re a government or training partner', 'skills', 'Skills Development', 'A national certification programme delivered through the existing ITI network, so the capability stays with the State.'],
];

const faqItems = [
  ['Can you work alongside our existing contractor?', 'Yes. The planning, quality and commissioning service sits alongside your contractors with no change to contract structure. Nothing is re-procured and nobody is replaced.'],
  ['We are already mid-construction. Is it too late?', 'No. The assurance service can be deployed at any stage, including mid-construction, and is the fastest of our services to put in place.'],
  ['Can you bring our overseas staff to India legally?', 'FTR sponsors Employment visas directly as an India-registered entity. Business visas do not permit paid work, so this is the route that does.'],
  ['What happens first if we get in touch?', 'One working session on the facility, the programme and the current constraint. It ends with the engagement model that fits and a clear scope boundary, and nothing beyond it is asked of you until it is worth asking.'],
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    ...services.map((s) => ({ '@type': 'Service', name: s.name, url: `https://ftright.com/services/#${s.id}`, description: plain(s.lede), provider: { '@id': 'https://ftright.com/#organization' }, areaServed: { '@type': 'Country', name: 'India' } })),
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ftright.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://ftright.com/services/' },
    ] },
    faqSchema(faqItems),
  ],
};

const block = (s, i) => `  <!-- ================= ${s.num} &middot; ${s.name.toUpperCase()} ================= -->
  <section class="section${i % 2 ? ' on-paper' : ''} gate svc" id="${s.id}" aria-labelledby="${s.id}-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">${s.num}</span>
        <span class="label">Service</span>
        <span class="gate__status">${s.status}</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="${s.id}-h">${s.name}</h2>
          <p class="lead split__lede">${s.lede}</p>
        </div>

        <div class="split__body svc__body reveal">
          <p class="svc__short"><span class="label">In short</span>${s.short}</p>

          <div class="prose">
${s.prose.map((p) => `            <p>${p}</p>`).join('\n')}
          </div>

          <div class="svc__fit">
            <span class="label">Good for</span>
            <p><strong>${s.fit[0]}.</strong> ${s.fit[1]}</p>
          </div>${s.issued ? `

          <div class="svc__meta">
            <span class="label">Issued on request</span>
            <p>${s.issued}</p>
          </div>` : ''}

          <div class="svc__links">${s.links}</div>
        </div>
      </div>
    </div>
  </section>
`;

const band = (id, imgName, label, title, text, href, linkText, dim) => `  <section class="band" aria-labelledby="${id}">
    <div class="band__media${dim ? ' band__media--dim' : ''}">
      <img src="${P}assets/img/${imgName}-1600.webp"
           srcset="${P}assets/img/${imgName}-640.webp   640w,
                   ${P}assets/img/${imgName}-1024.webp 1024w,
                   ${P}assets/img/${imgName}-1600.webp 1600w"
           sizes="100vw" alt="" role="presentation"
           width="1600" height="1066" loading="lazy" decoding="async">
    </div>
    <div class="shell band__inner">
      <div class="band__copy">
        <span class="label band__label">${label}</span>
        <h2 class="h2 band__title wipe" id="${id}">${title}</h2>
        <p class="band__text">${text}</p>
        <a class="link band__link" href="${href}">
          ${linkText}
          ${require('./lib').arrowImg(P)}
        </a>
      </div>
    </div>
  </section>
`;

const html = `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="https://ftright.com/services/">

<meta property="og:type" content="website">
<meta property="og:url" content="https://ftright.com/services/">
<meta property="og:title" content="EPC, Commissioning &amp; Skills Services in India | FTR">
<meta property="og:description" content="Skills development, commissioning and quality authority, EPC and principal contractor, and India entry advisory: one delivery system, one standard.">
<meta property="og:image" content="https://ftright.com/assets/img/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${P}assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${P}assets/img/favicon-180.png">

<link rel="preload" href="${P}assets/fonts/space-grotesk-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${P}assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>

<link rel="stylesheet" href="${P}assets/css/fonts.css">
<link rel="stylesheet" href="${P}assets/css/tokens.css">
<link rel="stylesheet" href="${P}assets/css/base.css">
<link rel="stylesheet" href="${P}assets/css/services.css">

<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
</head>

<body>

<a class="skip" href="#main">Skip to content</a>

${header}

<main id="main">

  <section class="phero phero--short" aria-labelledby="services-h1">
    <div class="phero__mark" aria-hidden="true">
      <img src="${P}assets/img/ftr-mark.webp" alt="" width="1200" height="423">
    </div>

    <div class="shell phero__inner">
      <span class="label phero__label reveal">Services</span>
      <h1 class="display phero__title wipe" id="services-h1">Four services, one delivery system, one standard.</h1>
      <p class="phero__lede reveal">
        Whether you are building, checking, training or arriving, the way we
        work is the same: planned right first time, stopped at every checkpoint
        until it is signed off, and proven before it is handed over.
      </p>
    </div>
  </section>

  <nav class="snav" aria-label="The four services">
    <div class="shell">
      <ol class="snav__list">
${services.map((s) => `        <li class="snav__item"><a class="snav__link" href="#${s.id}"><span class="snav__num">${s.num}</span><span class="snav__name">${s.name}</span></a></li>`).join('\n')}
      </ol>
    </div>
  </nav>

  <!-- ================= WHERE ARE YOU TODAY? =================
       Source: MD 18 (best point of entry, client effort); wording ours.
       Without JS every answer is simply listed. -->
  <section class="section section--tight gate" id="start" aria-labelledby="start-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">00</span>
        <span class="label" id="start-h">Start here</span>
        <span class="gate__status">Which service fits?</span>
      </div>

      <div class="chooser reveal">
        <h2 class="h2 chooser__title">Where is your project today?</h2>
        <div class="chooser__opts" role="group" aria-label="Where is your project today?">
${choices.map(([q], i) => `          <button class="chooser__opt" type="button" aria-pressed="false" aria-controls="ch${i}">${q}</button>`).join('\n')}
        </div>
        <p class="chooser__hint">Choose the line that fits best and we will point you to the right service.</p>
${choices.map(([, id, name, why], i) => `        <div class="chooser__result" id="ch${i}">
          <span class="label">Best fit</span>
          <h3 class="h3 chooser__name">${name}</h3>
          <p>${why}</p>
          ${link('#' + id, 'Read about this service')}
        </div>`).join('\n')}
      </div>

      <dl class="facts">
        <div class="fact reveal">
          <dt class="fact__label">Services</dt>
          <dd class="fact__value"><span class="count" data-to="4" data-pad="2">04</span></dd>
          <p class="fact__note">One delivery system behind all four</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Ways to engage</dt>
          <dd class="fact__value"><span class="count" data-to="3" data-pad="2">03</span></dd>
          <p class="fact__note">Build it all, check it, or supply specialist packages</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Delivery gates</dt>
          <dd class="fact__value"><span class="count" data-to="6" data-pad="2">06</span></dd>
          <p class="fact__note">Every appointment advances through the same six checkpoints</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Specialist programmes</dt>
          <dd class="fact__value"><span class="count" data-to="9" data-pad="2">09</span></dd>
          <p class="fact__note">Taught inside Skills Development alone</p>
        </div>
      </dl>
    </div>
  </section>


${block(services[0], 0)}
${block(services[1], 1)}
${band('epc-band-h', 'plant-exterior', '03 &middot; EPC and Principal Contractor', 'Single contract, single programme, single accountable party.', 'Engineering, procurement, construction, commissioning and turnover under one interface &mdash; with Irish and European specialist partners integrated into delivery, not bolted on.', '#epc', 'Full EPC and Principal Contractor', true)}
${block(services[2], 2)}
${band('system-band-h', 'switchgear-hall', 'Common to all four', 'Right-first-time planning. Mandatory checkpoints. Contracted, not aspirational.', 'The FTR Project Delivery System is the same whichever service carries it &mdash; the assurance regime never changes size with the contract.', '../#system', 'The six delivery gates', false)}
${block(services[3], 3)}
  <!-- ================= QUESTIONS ================= -->
  <section class="section gate" id="questions" aria-labelledby="questions-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">05</span>
        <span class="label" id="questions-h">Questions</span>
        <span class="gate__status">Answered plainly</span>
      </div>

      ${faq(faqItems)}
    </div>
  </section>


  <!-- ================= NEXT STEP + CTA ================= -->
  <section class="section on-paper gate" id="contact-cta" aria-labelledby="cta-h">
    <div class="shell">
      ${next(P, '../markets/', 'Next', 'The sectors we deliver in')}

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
          <a class="btn btn--primary" href="../contact/">Arrange a session</a>
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

write('services/index.html', html);
console.log('services', html.length, 'bytes');
