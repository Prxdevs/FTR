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
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link') && nav.classList.contains('is-open')) toggle.click();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) toggle.click();
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
