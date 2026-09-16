/* FTR — main.js
   Mobile menu, header state, scroll reveal, hold-point release,
   and the spine progress marker.
   No dependencies. Degrades to fully visible content without JS. */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');

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
      // The target is mid visibility:hidden -> visible transition when
      // this runs; focus() on a still-hidden element is silently
      // dropped. One rAF fires before the style flush for this frame,
      // so it takes two to land after the drawer is actually visible.
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          (open ? closeBtn : toggle).focus({ preventScroll: true });
        });
      });
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

  /* --- Header state --- */
  var header = document.querySelector('.header');
  if (header && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* --- Spine progress ---
     One rAF-throttled scroll listener writes a single custom property;
     CSS does the rest. Cheaper than animating elements directly, and it
     keeps the marker and the fill in exact sync. */
  var spine = document.querySelector('.spine');
  if (spine) {
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

  /* --- Enquiry form ---
     Submits to Web3Forms over fetch() so the visitor never leaves the
     page. The honeypot is checked here too: a filled trap means a bot,
     so we skip the network call entirely and show the same success
     state, which wastes the bot's time instead of tipping it off. */
  var form = document.getElementById('enquiry');
  if (form) {
    var status = document.getElementById('status');
    var submitBtn = document.getElementById('submit');
    var trap = form.querySelector('input[name="botcheck"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      if (trap && trap.value) {
        status.textContent = 'Thank you — we will be in touch shortly.';
        form.reset();
        return;
      }

      submitBtn.disabled = true;
      status.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.success) {
            status.textContent = 'Thank you — we will be in touch shortly.';
            form.reset();
          } else {
            throw new Error(data.message || 'Submission failed');
          }
        })
        .catch(function () {
          status.textContent = 'Something went wrong sending this. Please call one of the numbers alongside instead.';
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }

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
