// Page shell shared by every builder: <head>, header, footer, scripts.
// Header and footer are generated here ONCE so they cannot drift between pages.
//
// Client brief (5 Oct 2026): header = logo left, menu, one button "Discuss your project" right.
// Footer = logo, one-line description, three service links, info@ftright.com, LinkedIn
// (URL to follow, so omitted), legal name in Title Case, Privacy, Terms, copyright. NO address.
const { write, organization, arrowImg } = require('./lib');

const EMAIL = 'info@ftright.com';
const LEGAL = 'Ftright Tech-Infra &amp; Solutions Private Limited';
const CIN = 'U42909GJ2026PTC181309';

const NAV = [
  ['Home', '', null],
  ['About', 'about/', null],
  ['Services', 'services/', [
    ['Skills Development', 'services/skills-development/'],
    ['Critical Construction', 'services/critical-construction/'],
    ['India Market Entry', 'services/india-market-entry/'],
  ]],
  ['Sectors', 'sectors/', null],
  ['Why FTR', 'why-ftr/', null],
  ['Careers', 'careers/', null],
  ['Contact', 'contact/', null],
];

// Mark the page the visitor is on (a service page marks Services as current).
const current = (slug, href) => {
  if (href === '') return slug === '' ? ' aria-current="page"' : '';
  return slug && (slug + '/' === href || slug.startsWith(href)) ? ' aria-current="page"' : '';
};

const arrow = (P, cls = 'nav__arrow') => arrowImg(P, cls);

const header = (P, { stuck = true, slug = '' } = {}) => `<header class="header${stuck ? ' is-stuck' : ''}">
  <div class="shell header__bar">
    <a class="header__logo" href="${P || './'}" aria-label="FTR &mdash; First Time Right, home">
      <img src="${P}assets/img/ftr-logo-40.png"
           srcset="${P}assets/img/ftr-logo-40.png 1x, ${P}assets/img/ftr-logo-80.png 2x"
           alt="FTR — First Time Right" width="113" height="40">
    </a>

    <div class="header__actions">
      <a class="btn btn--primary header__cta" href="${P}contact/">Discuss your project</a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav">
        <span class="nav__toggle-bars" aria-hidden="true"><span></span><span></span><span></span></span>
        <span class="u-visually-hidden">Menu</span>
      </button>
    </div>

    <nav class="nav" id="nav" aria-label="Primary">
      <div class="nav__head">
        <img class="nav__logo" src="${P}assets/img/ftr-logo-32.png"
             srcset="${P}assets/img/ftr-logo-32.png 1x, ${P}assets/img/ftr-logo-64.png 2x"
             alt="" width="90" height="32">
        <button class="nav__close" type="button">
          <span class="nav__close-x" aria-hidden="true"></span>
          <span class="u-visually-hidden">Close menu</span>
        </button>
      </div>

      <span class="nav__label">Navigation</span>

      <ol class="nav__list">
${NAV.map(([name, href, sub], i) => `        <li class="nav__item">
          <a class="nav__link" href="${P || './'}${href}"${current(slug, href)}>
            <span class="nav__num">0${i + 1}</span>
            <span class="nav__name">${name}</span>
            ${arrow(P)}
          </a>${sub ? `
          <ul class="nav__sub">
${sub.map(([n, h]) => `            <li><a href="${P}${h}">${n}</a></li>`).join('\n')}
          </ul>` : ''}
        </li>`).join('\n')}
      </ol>

      <div class="nav__foot">
        <div class="lockup nav__lockup">
          <span class="lockup__rule" aria-hidden="true"></span>
          <span class="lockup__text">First Time Right</span>
          <span class="lockup__rule" aria-hidden="true"></span>
        </div>
      </div>
    </nav>
  </div>
</header>`;

const footer = (P) => `<footer class="footer">
  <div class="shell footer__shell">

    <div class="grid footer__grid">
      <div class="footer__brand">
        <img class="footer__logo" src="${P}assets/img/ftr-logo-28.png"
             srcset="${P}assets/img/ftr-logo-28.png 1x, ${P}assets/img/ftr-logo-56.png 2x"
             alt="FTR — First Time Right" width="79" height="28" loading="lazy">
        <p class="footer__about">Mission-critical construction, commissioning, skills and India market entry.</p>
        <p class="footer__contact"><a href="mailto:${EMAIL}">${EMAIL}</a></p>
      </div>

      <div class="footer__col">
        <h2 class="footer__title">Services</h2>
        <ul class="footer__list">
          <li><a href="${P}services/skills-development/">Skills Development</a></li>
          <li><a href="${P}services/critical-construction/">Critical Construction &amp; Consultancy</a></li>
          <li><a href="${P}services/india-market-entry/">India Market Entry</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h2 class="footer__title">Company</h2>
        <ul class="footer__list">
          <li><a href="${P}about/">About</a></li>
          <li><a href="${P}sectors/">Sectors</a></li>
          <li><a href="${P}why-ftr/">Why FTR</a></li>
          <li><a href="${P}careers/">Careers</a></li>
          <li><a href="${P}contact/">Contact</a></li>
        </ul>
      </div>

      <div class="footer__col">
        <h2 class="footer__title">Legal</h2>
        <ul class="footer__list">
          <li><a href="${P}privacy/">Privacy Policy</a></li>
          <li><a href="${P}terms/">Terms of Use</a></li>
        </ul>
      </div>
    </div>

    <div class="footer__lockup">
      <div class="lockup">
        <span class="lockup__rule" aria-hidden="true"></span>
        <span class="lockup__text">First Time Right</span>
        <span class="lockup__rule" aria-hidden="true"></span>
      </div>
    </div>

    <div class="footer__meta">
      <span>${LEGAL}</span>
      <span>CIN ${CIN}</span>
      <span class="footer__issue">&copy; 2026</span>
    </div>

  </div>
</footer>`;

// A whole page. `slug` is '' for home, otherwise e.g. 'services/skills-development'.
// `file` + `root` build a page that is served from any depth (the 404), so its asset
// paths are absolute and it carries no canonical.
function page({ slug, title, desc, css = [], schema = [], body, ogTitle, stuck = true, noindex = false, ogImage = 'assets/img/og-default.jpg', file = '', root = false }) {
  const depth = slug ? slug.split('/').length : 0;
  const P = root ? '/' : '../'.repeat(depth);
  const canonical = `https://ftright.com/${slug ? slug + '/' : ''}`;
  const graph = { '@context': 'https://schema.org', '@graph': [organization, ...schema] };
  const html = `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title}</title>
<meta name="description" content="${desc}">
${file ? '' : `<link rel="canonical" href="${canonical}">`}${noindex ? '\n<meta name="robots" content="noindex, follow">' : ''}

<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${ogTitle || title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="https://ftright.com/${ogImage}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="${P}assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${P}assets/img/favicon-180.png">

<link rel="preload" href="${P}assets/fonts/space-grotesk-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${P}assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>

<link rel="stylesheet" href="${P}assets/css/site${css.length ? '-' + css.join('-') : ''}.css">

<script type="application/ld+json">
${JSON.stringify(graph, null, 2)}
</script>
</head>

<body>

<a class="skip" href="#main">Skip to content</a>

<div class="spine" aria-hidden="true">
  <span class="spine__rule"></span>
  <span class="spine__fill"></span>
  <img class="spine__arrow" src="${P}assets/img/ftr-arrow-24.png" srcset="${P}assets/img/ftr-arrow-24.png 1x, ${P}assets/img/ftr-arrow-48.png 2x" alt="" width="24" height="16">
</div>

${header(P, { stuck, slug })}

<main id="main">

${body(P)}

</main>


${footer(P)}

<script src="${P}assets/js/main.js" defer></script>
</body>
</html>
`;
  write(file || `${slug ? slug + '/' : ''}index.html`, html);
  return html.length;
}

module.exports = { page, header, footer, EMAIL, LEGAL, CIN, arrow };
