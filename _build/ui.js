// Small HTML building blocks shared by the page builders.
const { arrowImg, faq, next, alt } = require('./lib');

const gate = (num, label, status) => `<div class="gate__head">
        <span class="gate__num">${num}</span>
        <span class="label">${label}</span>
        <span class="gate__status">${status}</span>
      </div>`;

const hero = ({ P, label, title, lede, h1id = 'h1', short = false, crumbs = [], photo = null, actions = '' }) => `  <section class="phero${short ? ' phero--short' : ''}" aria-labelledby="${h1id}">
${photo ? `    <div class="phero__photo">
      <img src="${P}assets/img/${photo}-1600.webp"
           srcset="${P}assets/img/${photo}-640.webp 640w, ${P}assets/img/${photo}-1024.webp 1024w, ${P}assets/img/${photo}-1600.webp 1600w"
           sizes="100vw" alt="${alt(photo)}" width="1600" height="1066" fetchpriority="high" decoding="async">
    </div>` : `    <div class="phero__mark" aria-hidden="true">
      <img src="${P}assets/img/ftr-mark.webp" alt="" width="1200" height="423">
    </div>`}
    <div class="shell phero__inner">${crumbs.length ? `
      <nav class="crumbs" aria-label="Breadcrumb">
        <ol>
${crumbs.map(([t, h]) => (h ? `          <li><a href="${P}${h}">${t}</a></li>` : `          <li><span aria-current="page">${t}</span></li>`)).join('\n')}
        </ol>
      </nav>` : ''}
      <span class="label phero__label reveal">${label}</span>
      <h1 class="display phero__title" id="${h1id}">${title}</h1>
      <p class="phero__lede reveal">${lede}</p>${actions ? `
      <div class="phero__actions reveal">${actions}</div>` : ''}
    </div>
  </section>`;

const band = (P, { id, img, label, title, text, href, linkText, dim = false }) => `  <section class="band" aria-labelledby="${id}">
    <div class="figure band__media${dim ? ' band__media--dim' : ''}">
      <img src="${P}assets/img/${img}-1600.webp"
           srcset="${P}assets/img/${img}-640.webp 640w, ${P}assets/img/${img}-1024.webp 1024w, ${P}assets/img/${img}-1600.webp 1600w"
           sizes="100vw" alt="${alt(img)}" width="1600" height="1066" loading="lazy" decoding="async">
    </div>
    <div class="shell band__inner">
      <div class="band__copy">
        <span class="label band__label">${label}</span>
        <h2 class="h2 band__title wipe" id="${id}">${title}</h2>
        <p class="band__text">${text}</p>
        <a class="link band__link" href="${href}">${linkText} ${arrowImg(P)}</a>
      </div>
    </div>
  </section>`;

// Closing call to action. `to` defaults to the contact page; `type` preselects the enquiry type.
const cta = (P, { title = 'Let&rsquo;s build it right first time.', text = 'Tell us about the facility, the programme and the constraint. A member of the FTR team will reply.', primary = 'Discuss your project', type = '', href = '', secondary = 'info@ftright.com', secondaryHref = 'mailto:info@ftright.com' } = {}) => `<div class="cta cta--after reveal">
        <h2 class="h1 cta__title wipe" id="cta-h">${title}</h2>
        <p class="lead cta__text">${text}</p>
        <div class="cta__actions">
          <a class="btn btn--primary" href="${href ? P + href : P + 'contact/' + (type ? '?type=' + type : '')}">${primary}</a>
          <a class="btn btn--outline" href="${secondaryHref}">${secondary}</a>
        </div>
      </div>`;

const ctaSection = (P, opts = {}, nextBlock = '', tone = '') => `  <section class="section${tone} gate" id="contact-cta" aria-labelledby="cta-h">
    <div class="shell">
      ${nextBlock}
      ${cta(P, opts)}
    </div>
  </section>`;

module.exports = { gate, hero, band, cta, ctaSection, faq, next };
