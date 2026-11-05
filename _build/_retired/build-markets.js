const fs = require('fs');
const ROOT = 'C:/Users/Purvesh/AData/Coding/A_Github/FTR';

const old = fs.readFileSync(`${ROOT}/markets/index.html`, 'utf8');
const contact = fs.readFileSync(`${ROOT}/contact/index.html`, 'utf8');
const header = old.match(/<header class="header is-stuck">[\s\S]*?<\/header>/)[0];
const footer = contact.match(/<footer class="footer">[\s\S]*?<\/footer>/)[0]
  .replace(/\.\.\/assets\//g, '../assets/')   // contact is 1 level deep too, so no path change needed
  .replace(/href="\.\.\//g, 'href="../');
if (/ style="/.test(header + footer)) throw new Error('inline style in shared shell');
if (!footer.includes('markets/#next')) throw new Error('footer missing new sector links');

const TITLE = 'Sectors We Deliver In | Semiconductors &amp; Data Centres';
const DESC = 'Semiconductor fabs, data centres and pharma GMP, delivered to one standard and one delivery system. Batteries and specialty chemicals are next.';
const titleLen = TITLE.replace(/&amp;/g, '&').length;
if (titleLen >= 60) throw new Error('title too long: ' + titleLen);
if (DESC.length > 160) throw new Error('description too long: ' + DESC.length);

const arrow = `<img class="link__arrow" src="../assets/img/ftr-arrow-16.png" srcset="../assets/img/ftr-arrow-16.png 1x, ../assets/img/ftr-arrow-32.png 2x" alt="" width="16" height="11">`;
const link = (href, text) => `<a class="link" href="${href}">${text} ${arrow}</a>`;
const circleArrow = `<img src="../assets/img/ftr-arrow-16.png" srcset="../assets/img/ftr-arrow-16.png 1x, ../assets/img/ftr-arrow-32.png 2x" alt="" width="16" height="11">`;

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://ftright.com/#organization',
      name: 'FTRight Tech-Infra and Solutions Private Limited',
      alternateName: 'FTR',
      url: 'https://ftright.com/',
      logo: 'https://ftright.com/assets/img/ftr-logo-64.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B-1303, 13th Floor, Mondeal Heights, near Novotel Hotel, S.G. Highway',
        addressLocality: 'Ahmedabad', addressRegion: 'Gujarat', postalCode: '380015', addressCountry: 'IN',
      },
      contactPoint: [
        { '@type': 'ContactPoint', contactType: 'sales', telephone: '+91-95580-62611', email: 'info@ftright.com' },
        { '@type': 'ContactPoint', contactType: 'customer service', telephone: '+91-75671-20564', email: 'info@ftright.com' },
      ],
      sameAs: ['https://www.linkedin.com/company/ftright/'],
    },
    {
      '@type': 'ItemList',
      name: 'Sectors FTR delivers in',
      itemListElement: [
        ['Semiconductor', 'https://ftright.com/markets/semiconductors/'],
        ['Data Centres', 'https://ftright.com/markets/data-centres/'],
        ['Pharma GMP', 'https://ftright.com/markets/pharmaceuticals/'],
        ['Batteries', 'https://ftright.com/markets/#next'],
        ['Specialty Chemicals', 'https://ftright.com/markets/#next'],
      ].map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, url })),
    },
  ],
};

const html = `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${TITLE}</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="https://ftright.com/markets/">

<meta property="og:type" content="website">
<meta property="og:url" content="https://ftright.com/markets/">
<meta property="og:title" content="Sectors We Deliver In | FTR">
<meta property="og:description" content="Semiconductor, data centre and pharma GMP delivery, to one standard. Batteries and specialty chemicals are next.">
<meta property="og:image" content="https://ftright.com/assets/img/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="../assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="../assets/img/favicon-180.png">

<link rel="preload" href="../assets/fonts/space-grotesk-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="../assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>

<link rel="stylesheet" href="../assets/css/fonts.css">
<link rel="stylesheet" href="../assets/css/tokens.css">
<link rel="stylesheet" href="../assets/css/base.css">
<link rel="stylesheet" href="../assets/css/markets.css">

<script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
</script>
</head>

<body>

<a class="skip" href="#main">Skip to content</a>

${header}

<main id="main">

  <!-- ================= HERO =================
       Page-level framing (five sectors, three live). The "one delivery
       system" argument itself belongs to the section below, verbatim
       from the homepage — kept out of the hero so the two don't repeat
       the same sentence back to back. -->
  <section class="phero phero--short" aria-labelledby="markets-h1">
    <div class="phero__mark" aria-hidden="true">
      <img src="../assets/img/ftr-mark.webp" alt="" width="1200" height="423">
    </div>

    <div class="shell phero__inner">
      <span class="label phero__label reveal">Sectors</span>
      <h1 class="display phero__title wipe" id="markets-h1">Where FTR delivers, and what&rsquo;s next.</h1>
      <p class="phero__lede reveal">
        Five mission-critical sectors sit inside FTR&rsquo;s scope. Three carry
        the full delivery model today &mdash; semiconductor, data centres and
        pharma GMP. Batteries and specialty chemicals are next.
      </p>
    </div>
  </section>


  <!-- Numbers, not adjectives. The first two are the client's own
       market-context figures (Master Deck slide 3, sourced from ISM
       and SEMI) — client to reconfirm before launch, per that slide's
       own sourcing note. -->
  <section class="section section--tight gate" aria-label="The market, in figures">
    <div class="shell">
      <dl class="facts">
        <div class="fact reveal">
          <dt class="fact__label">Government-backed chip projects</dt>
          <dd class="fact__value"><span class="count" data-to="12" data-pad="2">12</span></dd>
          <p class="fact__note">Approved under the India Semiconductor Mission; 3 already in commercial production (Sept 2026)</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Investment pipeline</dt>
          <dd class="fact__value fact__value--text">&#8377;1,64,000 cr</dd>
          <p class="fact__note">Total approved investment across those 12 chip projects</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Data-centre IT capacity</dt>
          <dd class="fact__value fact__value--text">1.8 GW</dd>
          <p class="fact__note">India’s operational data-centre capacity, first half of 2026</p>
        </div>
        <div class="fact reveal">
          <dt class="fact__label">Sectors identified</dt>
          <dd class="fact__value"><span class="count" data-to="5" data-pad="2">05</span></dd>
          <p class="fact__note">Three delivered to today, two in preparation</p>
        </div>
      </dl>
    </div>
  </section>


  <!-- ================= THE THREE SECTORS =================
       Byte-identical panel structure and copy to the homepage's own
       "03 Sectors" section — this page is what that section's "All
       sectors" link points to, so the promise and the destination
       should read as the same argument, not a different one. -->
  <section class="section sectors-section gate" id="delivered" aria-labelledby="delivered-h">
    <div class="shell">
      <div class="sectors">

        <div class="sectors__intro">
          <div class="sectors__head">
            <span class="gate__num">01</span>
            <span class="sectors__rule" aria-hidden="true"></span>
            <span class="label">Delivered to today</span>
          </div>

          <h2 class="h1 sectors__title wipe" id="delivered-h">Three sectors. One delivery system.</h2>

          <p class="sectors__text sectors__text--page">
            All three share the same underlying disciplines. That is why FTR
            trains and deploys one team model across them, rather than
            rebuilding capability sector by sector.
          </p>

          <ul class="sectors__disciplines" aria-label="Shared disciplines">
            <li>Planning</li>
            <li>QA/QC</li>
            <li>HSE</li>
            <li>BIM</li>
            <li>Commissioning</li>
            <li>Contamination control</li>
          </ul>
        </div>

        <ul class="sectors__panels">
        <li class="sector">
          <a class="sector__link" href="semiconductors/">
            <div class="figure sector__media">
              <img src="../assets/img/sector-semiconductor-800.webp"
                   srcset="../assets/img/sector-semiconductor-480.webp 480w,
                           ../assets/img/sector-semiconductor-800.webp 800w,
                           ../assets/img/sector-semiconductor-1200.webp 1200w"
                   sizes="(max-width: 760px) 100vw, (max-width: 1100px) 34vw, 30vw"
                   alt="" role="presentation" width="800" height="1200" loading="lazy" decoding="async">
            </div>
            <div class="sector__top">
              <span class="sector__num"><span class="gate__num">01</span><span class="sector__tick" aria-hidden="true"></span></span>
              <h3 class="sector__title wipe">Semiconductor</h3>
            </div>
            <div class="sector__foot">
              <p class="sector__desc">Cleanroom fabrication to ISO&nbsp;14644 &mdash; high-purity utilities, ESD control and differential pressure integrity, where a HVAC variance costs yield</p>
              <span class="circle" aria-hidden="true">${circleArrow}</span>
            </div>
          </a>
        </li>
        <li class="sector">
          <a class="sector__link" href="data-centres/">
            <div class="figure sector__media">
              <img src="../assets/img/sector-data-centres-800.webp"
                   srcset="../assets/img/sector-data-centres-480.webp 480w,
                           ../assets/img/sector-data-centres-800.webp 800w,
                           ../assets/img/sector-data-centres-1200.webp 1200w"
                   sizes="(max-width: 760px) 100vw, (max-width: 1100px) 34vw, 30vw"
                   alt="" role="presentation" width="800" height="1200" loading="lazy" decoding="async">
            </div>
            <div class="sector__top">
              <span class="sector__num"><span class="gate__num">02</span><span class="sector__tick" aria-hidden="true"></span></span>
              <h3 class="sector__title wipe">Data Centres</h3>
            </div>
            <div class="sector__foot">
              <p class="sector__desc">N+1 and 2N critical power, precision cooling at rack density, and integrated systems testing with cause-and-effect proven before a rack goes live</p>
              <span class="circle" aria-hidden="true">${circleArrow}</span>
            </div>
          </a>
        </li>
        <li class="sector">
          <a class="sector__link" href="pharmaceuticals/">
            <div class="figure sector__media">
              <img src="../assets/img/sector-pharma-800.webp"
                   srcset="../assets/img/sector-pharma-480.webp 480w,
                           ../assets/img/sector-pharma-800.webp 800w,
                           ../assets/img/sector-pharma-1200.webp 1200w"
                   sizes="(max-width: 760px) 100vw, (max-width: 1100px) 34vw, 30vw"
                   alt="" role="presentation" width="800" height="1200" loading="lazy" decoding="async">
            </div>
            <div class="sector__top">
              <span class="sector__num"><span class="gate__num">03</span><span class="sector__tick" aria-hidden="true"></span></span>
              <h3 class="sector__title wipe">Pharma GMP</h3>
            </div>
            <div class="sector__foot">
              <p class="sector__desc">Facilities that answer to a regulator, not only a client &mdash; IQ/OQ/PQ sequencing and documentation traceable enough to withstand audit</p>
              <span class="circle" aria-hidden="true">${circleArrow}</span>
            </div>
          </a>
        </li>
        </ul>

      </div>
    </div>
  </section>


  <!-- ================= TWO MORE, IN PREPARATION =================
       Batteries has real, sourced content (Master Deck, "the bigger
       picture" slide). Specialty Chemicals does not yet — named
       because it is part of FTR's stated scope, nothing invented
       beyond that. -->
  <section class="section on-paper gate" id="next" aria-labelledby="next-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">02</span>
        <span class="label" id="next-h">Two more</span>
        <span class="gate__status">In preparation</span>
      </div>

      <p class="lead">
        The same disciplines &mdash; cleanroom-adjacent construction, HV
        power, precision commissioning &mdash; apply beyond the three sectors
        above. These two are next.
      </p>

      <div class="soon-grid">
        <article class="soon-card reveal">
          <span class="soon-card__tag">In preparation</span>
          <h3 class="h3 soon-card__title">Batteries</h3>
          <p class="soon-card__text">
            EV and battery gigafactories &mdash; cleanroom-adjacent,
            HV-intensive cell and pack manufacturing. A dedicated page
            publishes once there is enough to say beyond this.
          </p>
        </article>
        <article class="soon-card reveal">
          <span class="soon-card__tag">In preparation</span>
          <h3 class="h3 soon-card__title">Specialty Chemicals</h3>
          <p class="soon-card__text">
            Named in FTR&rsquo;s scope. Its own page publishes once its
            content is written, not before.
          </p>
        </article>
      </div>

      <p class="lead soon-note">
        ${link('../contact/', 'A director will answer any question on either directly')}
      </p>
    </div>
  </section>


  <!-- ================= CONTACT CTA ================= -->
  <section class="section gate" id="contact-cta" aria-labelledby="cta-h">
    <div class="shell">
      <div class="gate__head">
        <span class="gate__num">03</span>
        <span class="label">Start here</span>
        <span class="gate__status">Open</span>
      </div>

      <a class="next reveal" href="../academy/">
        <span class="next__label">Next</span>
        <span class="next__title">How we train the workforce </span>
      </a>

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

<script src="../assets/js/main.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(`${ROOT}/markets/index.html`, html);
console.log('written', html.length, 'bytes; title', titleLen, 'chars; description', DESC.length, 'chars');
