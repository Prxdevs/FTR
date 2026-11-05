/* FTR — main.js
   Mobile menu, header state, scroll reveal, hold-point release,
   and the spine progress marker.
   No dependencies. Degrades to fully visible content without JS. */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

  /* --- Hero entrance ---
     The hero is always in view at load, so its release is triggered
     directly here rather than through the scroll IntersectionObserver
     further down. That matters: IO fires almost immediately for
     content already on screen — often before the browser has painted
     a first frame with the pre-release state — and a transition with
     nothing rendered to animate away from just snaps to its end
     value, silently, no matter what duration or delay it's given. Two
     rAFs guarantee that first frame has actually painted. */
  var hero = document.querySelector('.hero, .phero');
  if (hero) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add('is-in');
      });
    });
  }

  /* --- Hero facility rotor ---
     Cycles the facility word and its photograph together. Static
     (first facility) under reduced motion; the full sentence is in
     the H1's visually hidden text either way. */
  var rotor = document.querySelector('[data-rotor]');
  if (rotor && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var words = rotor.querySelectorAll('.rotor__word');
    var shots = document.querySelectorAll('.hero__shot');
    var at = 0;
    setInterval(function () {
      if (document.hidden) return;
      words[at].classList.remove('is-on');
      if (shots[at]) shots[at].classList.remove('is-on');
      at = (at + 1) % words.length;
      words[at].classList.add('is-on');
      if (shots[at]) shots[at].classList.add('is-on');
    }, 3200);
  }

  /* --- Mobile menu --- */
  var toggle = document.querySelector('.nav__toggle');
  var nav = document.querySelector('.nav');

  if (toggle && nav) {
    var backdrop = document.createElement('div');
    backdrop.className = 'nav__backdrop';
    backdrop.setAttribute('aria-hidden', 'true');
    nav.insertAdjacentElement('beforebegin', backdrop);
    var closeBtn = nav.querySelector('.nav__close');

    var here = location.pathname.replace(/index\.html$/, '');
    nav.querySelectorAll('.nav__link').forEach(function (a) {
      if (a.pathname.replace(/index\.html$/, '') === here) a.setAttribute('aria-current', 'page');
    });

    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      // focus() on a visibility:hidden element is silently dropped. The
      // CSS flips visibility instantly on open (only the slide is timed),
      // so the drawer is already focusable here; no frame-timing hack.
      (open ? closeBtn : toggle).focus({ preventScroll: true });
    };

    toggle.addEventListener('click', function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    backdrop.addEventListener('click', function () { setOpen(false); });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;
      // Simple focus trap: only the close button and the nav links are
      // reachable while the drawer covers the page.
      var focusable = nav.querySelectorAll('.nav__close, .nav__link');
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* --- In-page index ---
     Marks the link for whichever section is crossing the middle of the
     screen. Sits above the reveal block below, which returns early. */
  var indexLinks = document.querySelectorAll('.snav__link');
  if (indexLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        indexLinks.forEach(function (a) {
          if (a.hash === '#' + entry.target.id) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    indexLinks.forEach(function (a) {
      var target = document.getElementById(a.hash.slice(1));
      if (target) spy.observe(target);
    });
  }

  /* --- Header state --- */
  var header = document.querySelector('.header');
  if (header && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* --- Reading progress (spine and header rule) ---
     One rAF-throttled scroll listener writes a single custom property;
     CSS does the rest. Cheaper than animating elements directly, and it
     keeps the marker and the fill in exact sync. */
  var spine = document.querySelector('.spine');
  if (spine || header) {
    var ticking = false;
    var update = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty('--progress', Math.min(1, Math.max(0, p)).toFixed(4));
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('load', update);
    update();
  }


  /* --- Counting numerals ---
     The final value is already in the markup, so the figure is correct
     without JS, for search engines, and under reduced-motion. This only
     animates from zero up to it, once, when the row is reached. */
  var counters = document.querySelectorAll('.count');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (counters.length && 'IntersectionObserver' in window && !reduced) {
    var countObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        obs.unobserve(el);

        var to = parseInt(el.getAttribute('data-to'), 10);
        var pad = parseInt(el.getAttribute('data-pad'), 10) || 0;
        if (isNaN(to)) return;

        var DURATION = 1100;
        var start = null;

        var tick = function (now) {
          if (start === null) start = now;
          var t = Math.min(1, (now - start) / DURATION);
          // Same easing curve as the CSS, so the page moves with one hand.
          var eased = 1 - Math.pow(1 - t, 3);
          var value = String(Math.round(to * eased));
          while (value.length < pad) value = '0' + value;
          el.textContent = value;
          if (t < 1) requestAnimationFrame(tick);
        };

        el.textContent = pad ? '0'.repeat(pad) : '0';
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* --- Forms (generic) ---
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
    var okText = form.getAttribute('data-success') || 'Thank you \u2014 a member of the FTR team will be in touch shortly.';

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
      say('Sending\u2026', '');

      fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (!data.success) throw new Error(data.message || 'Submission failed');
          say(okText, 'is-ok');
          form.reset();
        })
        .catch(function () {
          say('That did not send. Please email info@ftright.com, or try again in a moment.', 'is-error');
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

  /* --- Terms ---
     A technical word is a button; its plain definition sits beside it
     and opens on tap. One open at a time, Esc or an outside tap closes.
     Without JS the definition simply reads inline in brackets. */
  var terms = document.querySelectorAll('.term');
  if (terms.length) {
    var closeTerms = function (except) {
      terms.forEach(function (t) {
        if (t !== except) t.setAttribute('aria-expanded', 'false');
      });
    };
    terms.forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
      t.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = t.getAttribute('aria-expanded') !== 'true';
        closeTerms(t);
        t.setAttribute('aria-expanded', String(open));
        if (open) {
          var def = t.nextElementSibling;
          def.classList.remove('term__def--end');
          if (def.getBoundingClientRect().right > window.innerWidth - 16) {
            def.classList.add('term__def--end');
          }
        }
      });
    });
    document.addEventListener('click', function () { closeTerms(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeTerms();
    });
  }

  /* --- Chooser ---
     Pick the line that fits; the matching answer opens. Pressing the same
     option again closes it. Without JS every answer is listed. */
  document.querySelectorAll('.chooser').forEach(function (c) {
    var opts = c.querySelectorAll('.chooser__opt');
    var results = c.querySelectorAll('.chooser__result');
    if (!opts.length) return;
    c.classList.add('chooser--js');
    var pick = function (i) {
      var already = opts[i].getAttribute('aria-pressed') === 'true';
      opts.forEach(function (o, j) { o.setAttribute('aria-pressed', String(!already && i === j)); });
      results.forEach(function (r, j) { r.hidden = already || i !== j; });
    };
    opts.forEach(function (o, i) { o.addEventListener('click', function () { pick(i); }); });
    results.forEach(function (r) { r.hidden = true; });
  });

  /* --- Ladder ---
     Five levels as tabs. Arrow keys move between them. Without JS every
     level is shown in sequence, so nothing is gated on this running. */
  document.querySelectorAll('.ladder').forEach(function (ladder) {
    var tabs = ladder.querySelectorAll('.ladder__tab');
    var panels = ladder.querySelectorAll('.ladder__panel');
    if (!tabs.length) return;
    ladder.classList.add('ladder--js');
    var show = function (i, focus) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', String(i === j));
        t.tabIndex = i === j ? 0 : -1;
        panels[j].hidden = i !== j;
      });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); show((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); show((i + tabs.length - 1) % tabs.length, true); }
      });
    });
    show(0);
  });

  /* --- Leadership profiles ---
     Each card's name is a button that opens that person's <dialog>. Esc,
     the close button or a click on the backdrop closes it, and focus
     returns to the card. */
  document.querySelectorAll('[data-person]').forEach(function (btn) {
    var dlg = document.getElementById(btn.getAttribute('data-person'));
    if (!dlg || typeof dlg.showModal !== 'function') return;
    btn.addEventListener('click', function () { dlg.showModal(); });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.closest('.profile__close')) dlg.close();
    });
  });

  /* --- Reveal and hold-point release ---
     One observer drives every entrance. Elements are released once and
     then unobserved: replaying on scroll-back reads as decoration
     rather than as a gate. */
  var watched = document.querySelectorAll('.reveal, .gate, .band, .figure, .standard');
  if (!('IntersectionObserver' in window) || !watched.length) return;

  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      el.classList.add('is-in');
      if (el.classList.contains('gate') || el.classList.contains('standard')) {
        el.classList.add('is-released');
      }
      obs.unobserve(el);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

  watched.forEach(function (el) { io.observe(el); });
})();
