// Builds /academy/. Run: node _build/build-academy.js
//
// SOURCES (Docs/FTR_Academy_AllIndia_Presentation.txt = AD): gap AD 2, 3, 5; model AD 6;
// programmes AD 9; output AD 7; faculty AD 8; government enablements AD 11; pathway for women
// Brief 1.5. The Madhya Pradesh video's figures (12 -> 64 -> ~3,450) are state-specific and
// deliberately NOT used on this national page. Plain lead lines, FAQ, glossary = OURS (sign-off).
const { term, link: link0, faq, faqSchema, next, read, write, organization, arrowImg } = require('./lib');

const P = '../';
const link = (href, text) => link0(P, href, text);

const header = read('academy/index.html').match(/<header class="header is-stuck">[\s\S]*?<\/header>/)[0];
const footer = read('contact/index.html').match(/<footer class="footer">[\s\S]*?<\/footer>/)[0];
if (/ style="/.test(header + footer)) throw new Error('inline style in shared shell');

const TITLE = 'FTR Academy | Skills Certification for India’s Chip Plants';
const DESC = 'A national training network that certifies the skilled trades who build chip plants and data centres, taught by Irish master trainers inside India’s ITIs.';
if (TITLE.length >= 60) throw new Error('title too long ' + TITLE.length);
if (DESC.length > 160) throw new Error('description too long ' + DESC.length);

const model = [
  ['The hub', 'International Skills Academy', 'About 1,50,000 sq ft, with India&rsquo;s first full-scale cleanroom construction practice bay and 24 practical training bays, replicating live fab and data-hall conditions.'],
  ['The spokes', 'Government ITI Centres of Excellence', 'Existing Government training institutes upgraded to one uniform specification: orbital welding, high- and low-voltage rigs, cooling rigs and data-hall assemblies.'],
  ['The cascade', 'Certified local trainers', 'Serving ITI instructors are certified by resident Irish master trainers over an 8-week programme, so the capability stays with the State permanently.'],
];

const programmes = [
  ['Cleanroom Construction Fundamentals', '4 weeks', 'All entrants: the foundation gateway'],
  ['EHS &mdash; Safe-Site Pass', '2 weeks', 'All trades: mandatory'],
  ['High-Purity Piping &amp; Orbital Welding', '10 weeks', 'ITI Fitter / Welder'],
  ['Data Centre &amp; Fab Electrical (HV/LV)', '10 weeks', 'ITI Electrician / Diploma EE'],
  ['Cleanroom HVAC &amp; Environmental Control', '10 weeks', 'ITI / Diploma Mechanical'],
  ['Data Centre White Space Fit-Out', '10 weeks', 'ITI / fresh graduates'],
  ['Testing &amp; Commissioning, L1&ndash;L5', '4 weeks', 'Diploma / BE: deployment tier'],
  ['QA/QC &amp; Documentation Control', '6 weeks', 'Diploma / BE: specialist stream'],
  ['Supervisor &amp; Chargehand Development', '8 weeks', 'Experienced tradespeople'],
];

const enable = [
  ['Certification recognition', 'NSQF / NCVET alignment, so a trainee is certified for deployment in India and abroad.'],
  ['Designation within the mission', 'Recognition as a designated M&amp;E construction and commissioning skilling partner.'],
  ['Access to the training network', 'Government training institutions designated as Centres of Excellence and upgraded to one specification.'],
  ['Industry linkage', 'On-the-job training and offtake discussions with anchor fab, ATMP and data-centre projects.'],
  ['Support under existing schemes', 'Per-candidate support routed through established State and Central skilling schemes, so no cost falls on the trainee.'],
  ['Administrative help', 'Single-window support for approvals, utilities, faculty visas, hostel and stipend provision.'],
];

const faqItems = [
  ['Who pays for the training?', 'Per-candidate support is routed through established State and Central skilling schemes, so no cost falls on the trainee.'],
  ['Is the certificate recognised?', 'The certification is aligned to NSQF and NCVET, so a certificate earned at any centre is valid on a live project anywhere in India, and abroad.'],
  ['Who actually teaches?', 'Irish and European master trainers with 30+ years constructing fabs and data centres. They work in the State in person, not by video link, and audit every centre so a trainee in a district ITI meets the same standard as one at the hub.'],
  ['What stays behind when you leave?', 'The capability stays with the State: it is built into Government institutions, delivered by Government-employed instructors, and reusable on every future project the State attracts.'],
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    { '@type': 'EducationalOccupationalProgram', name: 'FTR Academy: M&E construction and commissioning certification', url: 'https://ftright.com/academy/', provider: { '@id': 'https://ftright.com/#organization' }, educationalProgramMode: 'in person', occupationalCategoryCode: 'Mission-critical M&E construction and commissioning' },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ftright.com/' },
      { '@type': 'ListItem', position: 2, name: 'Academy', item: 'https://ftright.com/academy/' },
    ] },
    faqSchema(faqItems),
  ],
};

const html = `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="https://ftright.com/academy/">

<meta property="og:type" content="website">
<meta property="og:url" content="https://ftright.com/academy/">
<meta property="og:title" content="FTR Academy | Skills Certification for India’s Chip Plants">
<meta property="og:description" content="${DESC}">
<meta property="og:image" content="https://ftright.com/assets/img/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${P}assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${P}assets/img/favicon-180.png">

<link rel="preload" href="${P}assets/fonts/space-grotesk-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${P}assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>

<link rel="stylesheet" href="${P}assets/css/fonts.css">
<link rel="stylesheet" href="${P}assets/css/tokens.css">
<link rel="stylesheet" href="${P}assets/css/base.css">
<link rel="stylesheet" href="${P}assets/css/academy.css">

<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
</head>

<body>

<a class="skip" href="#main">Skip to content</a>

${header}

<main id="main">

  <section class="phero phero--short" aria-labelledby="academy-h1">
    <div class="phero__mark" aria-hidden="true">
      <img src="${P}assets/img/ftr-mark.webp" alt="" width="1200" height="423">
    </div>

    <div class="shell phero__inner">
      <nav class="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="${P}">Home</a></li>
          <li><span aria-current="page">Academy</span></li>
        </ol>
      </nav>
      <span class="label phero__label reveal">FTR Academy</span>
      <h1 class="display phero__title wipe" id="academy-h1">India is building the fabs. We build the workforce that builds them.</h1>
      <p class="phero__lede reveal">
        A national training network that certifies the skilled trades who build
        chip plants and data centres, taught by Irish and European master
        trainers inside India&rsquo;s existing government training institutes.
      </p>
    </div>
  </section>


  <!-- ================= 01 &middot; THE GAP =================
       Sources: AD 2, 3, 5. Plain lead is ours; every figure is the client's. -->
  <section class="section gate" id="gap" aria-labelledby="gap-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">01</span>
        <span class="label">The gap</span>
        <span class="gate__status">Why this exists</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="gap-h">Nobody is training the people who build them.</h2>
        </div>
        <div class="split__body reveal">
          <div class="prose">
            <p>Every chip plant and data centre is a construction project before it is a factory. National skilling programmes aim at <strong>chip design and running fabs</strong>. Almost nothing is aimed at the specialist trades who physically build, install and ${term('commissioning', 'commission')} the facility.</p>
            <p>FTR Academy fills that gap: a training network taught by Irish and European master trainers, with certification aligned to national standards, delivered through the ITIs that already exist in every state.</p>
          </div>
        </div>
      </div>

      <dl class="facts">
        <div class="fact reveal">
          <dt class="fact__label">Chip projects sanctioned</dt>
          <dd class="fact__value"><span class="count" data-to="12" data-pad="2">12</span></dd>
          <p class="fact__note">Under the ${term('ism', 'India Semiconductor Mission')}, across six states</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Sanctioned investment</dt>
          <dd class="fact__value fact__value--text">&#8377;1.64 L cr</dd>
          <p class="fact__note">Cumulative, all-India</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Skilled M&amp;E shortfall</dt>
          <dd class="fact__value fact__value--text">2.5&ndash;3 lakh</dd>
          <p class="fact__note">Professionals short by 2027 (TeamLease)</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Projects in Gujarat</dt>
          <dd class="fact__value"><span class="count" data-to="4" data-pad="2">04</span></dd>
          <p class="fact__note">Four of the twelve: Sanand, Dholera and Surat</p>
        </div>
      </dl>
    </div>
  </section>


  <!-- ================= 02 &middot; THE MODEL =================
       Source: AD 6. A hub, many spokes, and a cascade of trainers. -->
  <section class="section on-paper gate" id="model" aria-labelledby="model-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">02</span>
        <span class="label">The model</span>
        <span class="gate__status">One hub, many spokes</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="model-h">One hub. Many spokes. One standard.</h2>
        </div>
        <div class="split__body reveal">
          <p class="lead">Training is delivered through institutes that already exist, upgraded to one specification, so there is no wait for new buildings.</p>
        </div>
      </div>

      <ol class="model">
${model.map(([k, h, t], i) => `        <li class="model__step reveal">
          <span class="model__num" aria-hidden="true">0${i + 1}</span>
          <span class="label model__kind">${k}</span>
          <h3 class="h3 model__name">${h}</h3>
          <p class="model__text">${t}</p>
        </li>`).join('\n')}
      </ol>

      <div class="grid note reveal">
        <span class="label note__label">Recognised everywhere</span>
        <div class="note__body prose">
          <p>Certification is aligned to NSQF and NCVET, <strong>so a certificate earned at any centre is valid on a live project anywhere in India, and abroad.</strong></p>
        </div>
      </div>
    </div>
  </section>


  <!-- ================= IMAGE BREAK ================= -->
  <section class="band" aria-labelledby="practice-h">
    <div class="band__media">
      <img src="${P}assets/img/welding-training-1600.webp"
           srcset="${P}assets/img/welding-training-640.webp   640w,
                   ${P}assets/img/welding-training-1024.webp 1024w,
                   ${P}assets/img/welding-training-1600.webp 1600w"
           sizes="100vw" alt="" role="presentation"
           width="1600" height="1066" loading="lazy" decoding="async">
    </div>
    <div class="shell band__inner">
      <div class="band__copy">
        <span class="label band__label">Learning by doing</span>
        <h2 class="h2 band__title wipe" id="practice-h">Seventy per cent practical, in bays that replicate live conditions.</h2>
        <p class="band__text">Skill is proven on physical evidence: weld logs, pressure-test packs and termination records, the same records a live project runs on.</p>
        <a class="link band__link" href="#taught">The nine programmes ${arrowImg(P)}</a>
      </div>
    </div>
  </section>


  <!-- ================= 03 &middot; WHAT IS TAUGHT =================
       Source: AD 9 (nine programmes, durations, who each is for, 70/30 ratio). -->
  <section class="section gate" id="taught" aria-labelledby="taught-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">03</span>
        <span class="label">What is taught</span>
        <span class="gate__status">Nine programmes</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="taught-h">Nine programmes, each tied to a real job.</h2>
        </div>
        <div class="split__body reveal">
          <p class="lead">From first-day safety to commissioning a data hall. Every programme maps to a role on a live project, and an explicit pathway for women into the sector runs across all of them.</p>
        </div>
      </div>

      <ul class="progs">
${programmes.map(([n, d, f], i) => `        <li class="prog reveal">
          <span class="prog__num" aria-hidden="true">0${i + 1}</span>
          <h3 class="h4 prog__name">${n}</h3>
          <p class="prog__dur">${d}</p>
          <p class="prog__for">${f}</p>
        </li>`).join('\n')}
      </ul>
    </div>
  </section>


  <!-- ================= 04 &middot; WHAT ONE STATE DELIVERS =================
       Source: AD 7. Figures are the client's proposal numbers: sign-off before launch.
       Plain text values (not counters) so the thousands separator survives. -->
  <section class="section on-navy gate" id="output" aria-labelledby="output-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">04</span>
        <span class="label">What one state delivers</span>
        <span class="gate__status">The output</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="output-h">17,700 certified specialists in 24 months.</h2>
        </div>
        <div class="split__body reveal">
          <p class="lead">That is the planned output of one state network. Trained cleanroom and mission-critical workers command materially higher wages than conventional construction trades, in India and on international deployment.</p>
        </div>
      </div>

      <dl class="facts facts--navy">
        <div class="fact reveal">
          <dt class="fact__label">Trade-qualified</dt>
          <dd class="fact__value fact__value--text">6,700</dd>
          <p class="fact__note">Fully qualified and ready to deploy</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Steady-state capacity</dt>
          <dd class="fact__value fact__value--text">15,000+</dd>
          <p class="fact__note">People a year, per network</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Instructors certified</dt>
          <dd class="fact__value fact__value--text">400</dd>
          <p class="fact__note">Local ITI instructors, per state</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Programmes</dt>
          <dd class="fact__value"><span class="count" data-to="9" data-pad="2">09</span></dd>
          <p class="fact__note">Specialist trade and commissioning courses</p>
        </div>
      </dl>
    </div>
  </section>


  <!-- ================= 05 &middot; THE FACULTY =================
       Source: AD 8. -->
  <section class="section gate" id="faculty" aria-labelledby="faculty-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">05</span>
        <span class="label">The faculty</span>
        <span class="gate__status">Taught, not bought</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="faculty-h">This capability can&rsquo;t be bought. It has to be taught.</h2>
        </div>
        <div class="split__body reveal">
          <div class="prose">
            <p>Subsidy can pay for the building and the tools. It cannot conjure experienced fab operators or cleanroom contractors. Those take decades to build, or they are <strong>transferred deliberately</strong>.</p>
            <p>Intel has invested over &euro;30 billion in Ireland since 1989, and a further &euro;5 billion Leixlip expansion needs roughly 2,000 specialist tradespeople on its own. That is the heritage our trainers come from.</p>
          </div>
          <ul class="spec__items reveal">
            <li>Irish and European master trainers with 30+ years constructing fabs and data centres across Ireland, Europe, the USA and Asia</li>
            <li>Resident in the State, leading the advanced programmes in person, not by video link</li>
            <li>Auditing every centre, so a trainee in a district ITI meets the same standard as one at the hub</li>
          </ul>
        </div>
      </div>
    </div>
  </section>


  <!-- ================= 06 &middot; FOR GOVERNMENT PARTNERS =================
       Source: AD 11 (the ask), reworded plainly. -->
  <section class="section on-paper gate" id="partners" aria-labelledby="partners-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">06</span>
        <span class="label">For government partners</span>
        <span class="gate__status">A partnership</span>
      </div>

      <div class="grid">
        <div class="split__head reveal">
          <h2 class="h1 wipe" id="partners-h">What we bring, and what we ask.</h2>
        </div>
        <div class="split__body reveal">
          <p class="lead">FTR brings the faculty, the curriculum, the international standard and the delivery discipline. We ask the State to bring the institutional platform, the recognition and the mission support that only it can provide.</p>
        </div>
      </div>

      <ol class="enable">
${enable.map(([h, t], i) => `        <li class="enable__item reveal">
          <span class="enable__num" aria-hidden="true">0${i + 1}</span>
          <h3 class="h4 enable__name">${h}</h3>
          <p class="enable__text">${t}</p>
        </li>`).join('\n')}
      </ol>

      <div class="grid note reveal">
        <span class="label note__label">What stays</span>
        <div class="note__body prose">
          <p><strong>The capability stays permanently with the State</strong> &mdash; built into Government institutions, delivered by Government-employed instructors, and reusable on every future project the State attracts.</p>
        </div>
      </div>
    </div>
  </section>


  <!-- ================= QUESTIONS ================= -->
  <section class="section gate" id="questions" aria-labelledby="questions-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">07</span>
        <span class="label" id="questions-h">Questions</span>
        <span class="gate__status">Answered plainly</span>
      </div>

      ${faq(faqItems)}
    </div>
  </section>


  <!-- ================= NEXT STEP + CTA ================= -->
  <section class="section on-paper gate" id="contact-cta" aria-labelledby="cta-h">
    <div class="shell">
      ${next(P, '../services/', 'Next', 'See all four services')}

      <div class="cta cta--after reveal">
        <div class="lockup">
          <span class="lockup__rule" aria-hidden="true"></span>
          <span class="lockup__text">First Time Right</span>
          <span class="lockup__rule" aria-hidden="true"></span>
        </div>

        <h2 class="h1 cta__title wipe" id="cta-h">We start with one working session.</h2>
        <p class="lead cta__text">
          We would welcome the chance to present the Detailed Project Report,
          together with our senior Irish faculty, at the Government&rsquo;s direction.
        </p>

        <div class="cta__actions">
          <a class="btn btn--primary" href="../contact/">Arrange a session</a>
          <a class="btn btn--outline" href="tel:+917567120564">+91 75671 20564</a>
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

write('academy/index.html', html);
console.log('academy', html.length, 'bytes; title', TITLE.length, 'chars; description', DESC.length);
