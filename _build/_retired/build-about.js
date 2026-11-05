// Builds /about/. Run: node _build/build-about.js
//
// SOURCES: Our story = MD 2, 13, 26 (rewritten plainly, ours); people = Brief 1.3, MD 25,
// Academy deck 10; What we bring = Brief 3.2 + MD 19, 20, 22, 24, 26, 27; precedents = MD 13;
// governance = Brief 1.1 + MD 19, 26, 27, 28; band 1 = MD 15; band 2 = MD 26.
// Plain lead lines, section labels, "what they do for you" lines and glossary = OURS (sign-off).
// Trushti Raval (MD 25) is deliberately not shown: the client removed her name (Brief 1.2).
const fs = require('fs');
const path = require('path');
const { ROOT, term, link: link0, faq, next, read, write, organization, arrowImg } = require('./lib');

const P = '../';
const link = (href, text) => link0(P, href, text);

const header = read('about/index.html').match(/<header class="header is-stuck">[\s\S]*?<\/header>/)[0];
const footer = read('contact/index.html').match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];
if (/ style="/.test(header + footer)) throw new Error('inline style in shared shell');

const TITLE = 'About FTR | Irish-Standard M&amp;E Delivery Company in India';
const DESC = 'FTR is an India-registered company bringing Irish-standard delivery to fabs, data centres and pharma GMP. Meet the leadership and read how it is governed.';
if (TITLE.replace(/&amp;/g, '&').length >= 60) throw new Error('title too long');
if (DESC.length > 160) throw new Error('description too long');

const story = [
  'India is building its first chip plants, data centres and pharma campuses. The money and the sites are in place. What it still needs, at scale, is people who have done this before.',
  'FTR was started by people who spent their careers building exactly these facilities in Ireland and across Europe. We are an India-registered company in Ahmedabad, working under Indian law, with Irish and European specialists working alongside our Indian teams.',
  'The aim is not to fly a team in for one project. It is to <strong>leave a permanent capability behind in India</strong>, the same path Ireland, Taiwan, Singapore and Arizona each followed.',
];

const directors = [
  ['paul-colleary', 'PC', 'Paul Colleary', 'Executive Director, Operations, and Co-Founder',
    'Runs delivery: the plan, the quality checks and the sign-off on every system.',
    'Thirty years delivering mission-critical M&amp;E projects across Europe, inception to final handover. Career built at Suir Engineering, Jones Engineering and AM Technical Solutions. Holds full and independent authority over FTR execution: programme, quality gates, commissioning release. Author of FTR&rsquo;s quality, planning and commissioning standards.'],
  ['nd-chaudhari', 'NC', 'ND Chaudhari', 'Co-Founder and Director of Relationships',
    'Opens doors: builds our relationships with government and institutions.',
    'Government and institutional stakeholder engagement; strategic partnership facilitation.'],
  ['chetan-balar', 'CB', 'Chetan Balar', 'Co-Founder and Director of Innovation and New Business',
    'Looks ahead: new markets and international partners.',
    'Business model innovation, international partnership development, new market entry.'],
];

const brings = [
  ['European delivery culture', 'Experienced European specialists work inside our Indian teams, not above them.',
    'Vetted Irish and European specialist contractors are brought in against defined scope, with performance tracked against FTR standards. <strong>Method, supervision and commissioning discipline are transferred into the Indian delivery team &mdash; not held offshore.</strong>', ''],
  ['People who have already done it', 'The people leading the work have built these facilities before.',
    '<strong>Our leadership built that capability inside the Irish specialist cluster.</strong> FTR fields the senior mission-critical roles a fast-moving programme cannot buy locally at speed, drawn from three talent pools and working to one standard.',
    `${link('#people', 'Meet the people')}${link('../#team', 'The team we field')}`],
  ['Quality contracted to', 'We publish what we promise, and report on it every week.',
    `<strong>Work advances through defined checkpoints &mdash; it does not advance because the programme says it should.</strong> Standing targets are offered as contractual reporting measures, not aspirations &mdash; reported weekly at project level, monthly to the Board. Every ${term('holdpoint')} is released in writing.`,
    `${link('../#standard', 'The published standard')}${link('../#system', 'The six delivery gates')}`],
  ['Schedule certainty, planned', 'A plan with the checkpoints built in, not hoped for.',
    `<strong>Schedule certainty is a planning product, not a promise.</strong> A ${term('p6')} baseline is set at the start &mdash; critical path, float ownership and resource loading agreed before works commence. Quality checkpoints and commissioning sit inside the programme as linked activities, not an allowance at the end.`, ''],
  ['Execution authority that cannot be overruled', 'The person responsible for delivery cannot be overruled by the sales side.',
    '<strong>Execution authority sits with the Operations Director, structurally separate from commercial authority, and is not delegable.</strong> Independent quality authority, with power to stop work.',
    link('#governance', 'How decisions are governed')],
];

const precedents = [
  ['Ireland', 'Anchor: Intel Leixlip, from 1989', 'Semiconductor and hyperscale data-centre execution became a national export capability. Irish M&amp;E contractors now deliver across Europe from a domestic base of 5.4 million people.'],
  ['Taiwan', 'Anchor: TSMC / Hsinchu cluster', 'Fab construction, cleanroom fit-out and precision utility execution matured alongside the fabs themselves, creating a resident specialist supply chain.'],
  ['Singapore', 'Anchor: national wafer-fab park policy', 'A deliberate state-backed strategy pairing facility investment with vocational and technical workforce formation for regulated, cleanroom environments.'],
  ['Arizona, USA', 'Anchor: Intel and TSMC Arizona', 'A conventional construction market rebuilt around fab-grade execution through concentrated investment, specialist inflow and workforce programmes.'],
];

const row = (k, v) => `            <div class="spec__row"><dt>${k}</dt><dd>${v}</dd></div>`;

const faqItems = [
  ['Is FTR an Indian or a foreign company?', 'FTR is an India-registered private limited company, headquartered in Ahmedabad and contracting under Indian law. Irish and European specialists work inside our delivery teams.'],
  ['Does FTR have completed projects of its own?', 'No, and we say so plainly. FTR is newly incorporated. What it has is experienced delivery leadership, a network of specialist partners and a controlled delivery system, set out on this page.'],
  ['Who makes the decisions?', 'Execution decisions sit with the Operations Director and cannot be overruled by the commercial side. Larger commercial commitments need more directors, and any government contract needs full Board approval.'],
];

const personHtml = ([slug, ini, name, role, does, bio]) => {
  const photoRel = `assets/img/people/${slug}.webp`;
  const hasPhoto = fs.existsSync(path.join(ROOT, photoRel));
  const mark = hasPhoto
    ? `<img class="director__photo" src="${P}${photoRel}" alt="${name}" width="800" height="1000" loading="lazy" decoding="async">`
    : `<span class="director__mark" data-initials="${ini}" aria-hidden="true"></span>`;
  return `        <article class="director reveal">
          ${mark}
          <h3 class="h3 director__name">${name}</h3>
          <p class="director__role">${role}</p>
          <p class="director__does">${does}</p>
          <p class="director__text">${bio}</p>
        </article>`;
};

const band = (id, img, label, title, text, href, linkText) => `  <section class="band" aria-labelledby="${id}">
    <div class="band__media">
      <img src="${P}assets/img/${img}-1600.webp"
           srcset="${P}assets/img/${img}-640.webp   640w,
                   ${P}assets/img/${img}-1024.webp 1024w,
                   ${P}assets/img/${img}-1600.webp 1600w"
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
          ${arrowImg(P)}
        </a>
      </div>
    </div>
  </section>
`;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    { '@type': 'AboutPage', '@id': 'https://ftright.com/about/#page', url: 'https://ftright.com/about/', name: 'About FTR', about: { '@id': 'https://ftright.com/#organization' } },
    ...directors.map(([, , name, role]) => ({ '@type': 'Person', name, jobTitle: role.replace(/&amp;/g, '&'), worksFor: { '@id': 'https://ftright.com/#organization' } })),
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ftright.com/' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://ftright.com/about/' },
    ] },
    require('./lib').faqSchema(faqItems),
  ],
};

const html = `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="https://ftright.com/about/">

<meta property="og:type" content="website">
<meta property="og:url" content="https://ftright.com/about/">
<meta property="og:title" content="About FTR | Irish-Standard M&amp;E Delivery Company in India">
<meta property="og:description" content="An Indian company built to a European standard: the method, the leadership and the governance behind FTR.">
<meta property="og:image" content="https://ftright.com/assets/img/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${P}assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${P}assets/img/favicon-180.png">

<link rel="preload" href="${P}assets/fonts/space-grotesk-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${P}assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>

<link rel="stylesheet" href="${P}assets/css/fonts.css">
<link rel="stylesheet" href="${P}assets/css/tokens.css">
<link rel="stylesheet" href="${P}assets/css/base.css">
<link rel="stylesheet" href="${P}assets/css/about.css">

<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
</head>

<body>

<a class="skip" href="#main">Skip to content</a>

${header}

<main id="main">

  <section class="phero" aria-labelledby="about-h1">
    <div class="phero__mark" aria-hidden="true">
      <img src="${P}assets/img/ftr-mark.webp" alt="" width="1200" height="423">
    </div>

    <div class="shell phero__inner">
      <span class="label phero__label reveal">About FTR</span>
      <h1 class="display phero__title wipe" id="about-h1">Indian entity, Irish method, resident capability.</h1>
      <p class="phero__lede reveal">
        We build and prove the facilities India&rsquo;s chip plants, data centres
        and drug makers run on &mdash; and we leave the know-how in India
        when we are done.
      </p>
    </div>

    <nav class="phero__strip reveal" aria-label="On this page">
      <div class="shell astrip">
        <a class="astrip__item" href="#story"><span class="astrip__num">01</span><span class="astrip__name">Our story</span></a>
        <a class="astrip__item" href="#people"><span class="astrip__num">02</span><span class="astrip__name">The people</span></a>
        <a class="astrip__item" href="#bring"><span class="astrip__num">03</span><span class="astrip__name">What we bring</span></a>
        <a class="astrip__item" href="#why"><span class="astrip__num">04</span><span class="astrip__name">Why it works</span></a>
        <a class="astrip__item" href="#governance"><span class="astrip__num">05</span><span class="astrip__name">How we&rsquo;re governed</span></a>
      </div>
    </nav>
  </section>


  <!-- ================= 01 &middot; OUR STORY =================
       Sources: MD 2, 13, 26, rewritten plainly (ours). -->
  <section class="section gate" id="story" aria-labelledby="story-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">01</span>
        <span class="label">Our story</span>
        <span class="gate__status">Who we are</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="story-h">An Indian company, built to a European standard.</h2>
        </div>
        <div class="split__body reveal">
          <div class="prose">
${story.map((p) => `            <p>${p}</p>`).join('\n')}
          </div>
        </div>
      </div>

      <dl class="facts">
        <div class="fact reveal">
          <dt class="fact__label">Leadership experience</dt>
          <dd class="fact__value"><span class="count" data-to="30" data-pad="2">30</span><span class="fact__unit">yrs</span></dd>
          <p class="fact__note">Mission-critical M&amp;E across Ireland and Europe, inception to handover</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Quality commitments</dt>
          <dd class="fact__value"><span class="count" data-to="5" data-pad="2">05</span></dd>
          <p class="fact__note">Published, and reported on every week</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Talent pools</dt>
          <dd class="fact__value"><span class="count" data-to="3" data-pad="2">03</span></dd>
          <p class="fact__note">Ireland and Europe, the UK, and India</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Delivery gates</dt>
          <dd class="fact__value"><span class="count" data-to="6" data-pad="2">06</span></dd>
          <p class="fact__note">Every project passes the same six checkpoints</p>
        </div>
      </dl>
    </div>
  </section>


${band('position-h', 'pipe-runs', 'The FTR position', 'Fixing it later costs far more than getting it right the first time.', 'Approved information, verified materials, competent supervision, and inspection at the right stage. FTR contracts to that regime rather than describing it.', '#bring', 'What we bring')}

  <!-- ================= 02 &middot; THE PEOPLE =================
       Sources: Brief 1.3; MD 25; Academy deck 10. Photo slots: drop an 800x1000 WebP at
       assets/img/people/&lt;slug&gt;.webp and rerun the builder to replace the initials. -->
  <section class="section on-paper gate" id="people" aria-labelledby="people-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">02</span>
        <span class="label">The people</span>
        <span class="gate__status">Named</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="people-h">The people behind it.</h2>
        </div>
        <div class="split__body reveal">
          <p class="lead">
            Each has a clear job. The person who runs delivery is kept
            separate from the people who sell it, by design.
          </p>
        </div>
      </div>

      <div class="directors">
${directors.map(personHtml).join('\n')}
      </div>

      <p class="cv-note reveal">
        Full curricula vitae and named project references for key personnel are
        provided in the Key Personnel and Experience Pack at prequalification
        stage. ${link('../contact/', 'Arrange a session')}
      </p>
    </div>
  </section>


  <!-- ================= 03 &middot; WHAT WE BRING =================
       Sources: Brief 3.2 structure; MD 19, 20, 22, 24, 26, 27. Bold line under each title is ours. -->
  <section class="section gate" id="bring" aria-labelledby="bring-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">03</span>
        <span class="label">What we bring</span>
        <span class="gate__status">Five parts</span>
      </div>

      <div class="grid">
        <div class="split__head split__head--wide reveal">
          <h2 class="h1 wipe" id="bring-h">What we bring to a programme.</h2>
        </div>
      </div>

      <div class="brings">
${brings.map(([t, plain, p, l], i) => `        <article class="bring reveal">
          <div class="bring__head">
            <span class="bring__num" aria-hidden="true">0${i + 1}</span>
            <h3 class="h3 bring__title">${t}</h3>
          </div>
          <div class="bring__body">
            <p class="bring__plain">${plain}</p>
            <p>${p}</p>${l ? `
            <div class="bring__links">${l}</div>` : ''}
          </div>
        </article>`).join('\n')}
      </div>
    </div>
  </section>


${band('transfer-h', 'panel-technician', 'How it transfers', 'Method, supervision and commissioning discipline &mdash; transferred, not held offshore.', 'Vetted Irish and European specialist contractors are brought in against defined scope, with performance tracked against FTR standards. What they know moves into the Indian delivery team.', '#governance', 'How it&rsquo;s governed')}

  <!-- ================= 04 &middot; WHY IT WORKS =================
       Source: MD 13 (precedent). The 5.4 million figure is the client's; sign-off before launch. -->
  <section class="section on-navy gate" id="why" aria-labelledby="why-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">04</span>
        <span class="label">Why it works</span>
        <span class="gate__status">The precedent</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="why-h">No country got here by accident.</h2>
        </div>
        <div class="split__body reveal">
          <p class="lead">
            Each built this capability deliberately, around one big
            investment, then exported it. India is at the same starting
            point Ireland held in the early 1990s.
          </p>
        </div>
      </div>

      <div class="precedents precedents--full">
${precedents.map(([n, a, t]) => `        <article class="precedent reveal">
          <h3 class="h3 precedent__name">${n}</h3>
          <span class="precedent__anchor">${a}</span>
          <p class="precedent__text">${t}</p>
        </article>`).join('\n')}
      </div>

      <div class="grid note reveal">
        <span class="label note__label">FTR&rsquo;s purpose</span>
        <div class="note__body prose">
          <p>India now has the anchor investments. <strong>FTR&rsquo;s purpose is to make the execution capability resident &mdash; not imported project by project.</strong></p>
        </div>
      </div>
    </div>
  </section>


  <!-- ================= 05 &middot; HOW WE'RE GOVERNED =================
       Sources: Brief 1.1; MD 19, 26, 27, 28. The detail sits behind a toggle: it is for procurement
       teams. The decision thresholds come from a confidential deck: client to confirm publication. -->
  <section class="section gate" id="governance" aria-labelledby="governance-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">05</span>
        <span class="label">How we&rsquo;re governed</span>
        <span class="gate__status">Plainly stated</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="governance-h">Built to withstand public-sector scrutiny.</h2>
        </div>
        <div class="split__body reveal">
          <div class="prose">
            <p><strong>FTR is a newly incorporated Indian company. It has no completed project references of its own.</strong> What it has is experienced delivery leadership, a network of specialist partners and a controlled delivery system &mdash; and it says so before being asked.</p>
            <p>How decisions are made, which documents govern the work and what is checked are set out below.</p>
          </div>
        </div>
      </div>

      <div class="faq reveal">
        <details class="faq__item">
          <summary>For procurement teams: the full governance specification</summary>
          <div class="faq__body">
          <div class="spec">
            <h3 class="label spec__title">The entity</h3>
            <dl class="spec__list">
${row('Legal name', 'FTRight Tech-Infra and Solutions Private Limited')}
${row('Trading name', 'FTR &mdash; First Time Right')}
${row('Incorporation', 'Private limited company, registered in India, contracting under Indian law')}
${row('Registered office', 'B-1303, 13th Floor, Mondeal Heights, near Novotel Hotel, S.G. Highway, Ahmedabad, Gujarat 380015, India')}
            </dl>
          </div>

          <div class="spec">
            <h3 class="label spec__title">Delivery structure</h3>
            <dl class="spec__list">
${row('Contracting entity', 'FTR holds the client contract, the programme, the commercial interface and the assurance regime, and owns the FTR Project Delivery System and the quality authority on every project.')}
${row('Specialist partners', 'Irish and European specialist contractors, brought in against defined scope. Named partner firms are disclosed at prequalification stage, under confidentiality.')}
${row('Skills vertical', 'FTR Skills Development &mdash; the workforce training vertical, built around the same execution standards used on live projects. <a class="link" href="../academy/">FTR Academy</a>')}
            </dl>
          </div>

          <div class="spec">
            <h3 class="label spec__title">Controlled documents</h3>
            <dl class="spec__list">
${row('FPDS-001', 'Project Delivery Framework')}
${row('FPDS-003', 'QA/QC Management Standard, Revision A')}
${row('Issued for review', 'In the prequalification pack: capability statement, technical annexures, key personnel pack, corporate policy set and the FTR QA/QC Management Standard.')}
            </dl>
          </div>

          <div class="spec">
            <h3 class="label spec__title">Decision authority</h3>
            <dl class="spec__list">
${row('Up to &#8377;2 crore', 'CEO, sole authority')}
${row('&#8377;2&ndash;5 crore', 'CEO and Executive Director (Operations)')}
${row('&#8377;5&ndash;25 crore', 'CEO, Executive Director and one further director')}
${row('Above &#8377;25 crore', 'Full Board approval')}
${row('Government contracts', 'Full Board approval at any value')}
            </dl>
          </div>

          <div class="spec">
            <h3 class="label spec__title">Assurance commitments</h3>
            <ul class="spec__items">
              <li>Independent quality authority with power to stop work</li>
              <li>Corporate policy set approved at Board level &mdash; HSE, Quality, Environmental, Ethics and Labour</li>
              <li>Conflict of interest and related-party policy</li>
              <li>Full document traceability, every record referenced</li>
              <li>Audit and Risk Committee at sustained revenue operations</li>
            </ul>
          </div>
          </div>
        </details>
      </div>
    </div>
  </section>


  <!-- ================= QUESTIONS ================= -->
  <section class="section on-paper gate" id="questions" aria-labelledby="questions-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">06</span>
        <span class="label" id="questions-h">Questions</span>
        <span class="gate__status">Answered plainly</span>
      </div>

      ${faq(faqItems)}
    </div>
  </section>


  <!-- ================= NEXT STEP + CTA ================= -->
  <section class="section gate" id="contact-cta" aria-labelledby="cta-h">
    <div class="shell">
      ${next(P, '../services/', 'Next', 'What we do: our four services')}

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

write('about/index.html', html);
console.log('about', html.length, 'bytes');
