// Replaces the old single-form handler in main.js with generic forms + tabs + consent banner.
// Safe to re-run (guarded by the GENERIC marker).
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'assets', 'js', 'main.js');
let s = fs.readFileSync(file, 'utf8');

if (!s.includes('/* --- Forms (generic) ---')) {
  const a = s.indexOf('  /* --- Enquiry form ---');
  if (a < 0) throw new Error('old form block not found');
  const b = s.indexOf('  /* --- ', a + 10);
  if (b < 0) throw new Error('block end not found');
  const neu = `  /* --- Forms (generic) ---
     Every <form data-form> posts to Web3Forms over fetch(), so the visitor
     never leaves the page. A filled honeypot means a bot: we skip the
     network call and show the same success message, which wastes the
     bot's time without tipping it off. The enquiry-type select can be
     preselected from ?type=... and sets the email subject, which is how
     India Market Entry enquiries are told apart (and filterable) inbox-side. */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var status = form.querySelector('.form__status');
    var btn = form.querySelector('button[type="submit"]');
    var trap = form.querySelector('input[name="botcheck"]');
    var subject = form.querySelector('input[name="subject"]');
    var sel = form.querySelector('select[name="enquiry_type"]');
    var okText = form.getAttribute('data-success') || 'Thank you \\u2014 a member of the FTR team will be in touch shortly.';

    var say = function (text, kind) {
      status.textContent = text;
      status.className = 'form__status is-shown ' + (kind || '');
    };

    if (sel) {
      var wanted = new URLSearchParams(location.search).get('type');
      if (wanted) {
        Array.prototype.forEach.call(sel.options, function (o) {
          if (o.getAttribute('data-slug') === wanted) sel.value = o.value;
        });
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      if (trap && trap.value) { say(okText, 'is-ok'); form.reset(); return; }

      if (subject && sel && sel.value) {
        subject.value = (form.getAttribute('data-subject') || 'FTR website enquiry') + ': ' + sel.value;
      }

      btn.disabled = true;
      say('Sending\\u2026', '');

      fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.success) throw new Error(data.message || 'Submission failed');
          say(okText, 'is-ok');
          form.reset();
        })
        .catch(function () {
          say('That did not send. Please email general@ftright.com, or try again in a moment.', 'is-error');
        })
        .then(function () { btn.disabled = false; });
    });
  });

  /* --- Tabs ---
     Used by Careers: three audiences, three forms. The URL hash picks the
     tab, so other pages can link straight to one. Without JS every panel
     is shown in sequence. */
  document.querySelectorAll('.tabs').forEach(function (box) {
    var tabs = box.querySelectorAll('.tabs__tab');
    var panels = box.querySelectorAll('.tabs__panel');
    if (!tabs.length) return;
    box.classList.add('tabs--js');
    var show = function (i, focus, push) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', String(i === j));
        t.tabIndex = i === j ? 0 : -1;
        panels[j].hidden = i !== j;
      });
      if (focus) tabs[i].focus();
      if (push && history.replaceState) history.replaceState(null, '', '#' + panels[i].id);
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i, false, true); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); show((i + 1) % tabs.length, true, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show((i + tabs.length - 1) % tabs.length, true, true); }
      });
    });
    var start = 0;
    panels.forEach(function (p, i) { if ('#' + p.id === location.hash) start = i; });
    show(start);
    window.addEventListener('hashchange', function () {
      panels.forEach(function (p, i) { if ('#' + p.id === location.hash) show(i); });
    });
  });

  /* --- Analytics consent ---
     Nothing loads and no banner shows unless a GA4 id is configured via
     <meta name="ga-id">. When it is, analytics cookies are set only after
     the visitor accepts. (Also add the Google hosts to the CSP in _headers.) */
  var gaMeta = document.querySelector('meta[name="ga-id"]');
  if (gaMeta && gaMeta.content) {
    var consent = null;
    try { consent = localStorage.getItem('ftr-consent'); } catch (err) {}
    var loadGA = function () {
      var el = document.createElement('script');
      el.async = true;
      el.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaMeta.content;
      document.head.appendChild(el);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', gaMeta.content);
    };
    if (consent === 'yes') loadGA();
    else if (consent === null) {
      var bar = document.createElement('div');
      bar.className = 'consent';
      bar.setAttribute('role', 'region');
      bar.setAttribute('aria-label', 'Cookies');
      bar.innerHTML = '<p>We would like to use analytics cookies to see how the site is used. <a href="' + (document.querySelector('.footer a[href$="privacy/"]') || { getAttribute: function () { return '#'; } }).getAttribute('href') + '">Privacy Policy</a></p>' +
        '<div><button type="button" class="btn btn--primary" data-c="yes">Accept</button> <button type="button" class="btn btn--ghost" data-c="no">Decline</button></div>';
      bar.addEventListener('click', function (e) {
        var c = e.target.getAttribute && e.target.getAttribute('data-c');
        if (!c) return;
        try { localStorage.setItem('ftr-consent', c); } catch (err) {}
        bar.remove();
        if (c === 'yes') loadGA();
      });
      document.body.appendChild(bar);
    }
  }

`;
  s = s.slice(0, a) + neu + s.slice(b);
  fs.writeFileSync(file, s);
  console.log('main.js: generic forms, tabs and consent banner installed');
} else {
  console.log('main.js already patched');
}
