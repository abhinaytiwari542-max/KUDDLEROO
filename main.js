/* Kuddleroo — site behaviour
   Kept deliberately small: no framework, no dependencies. */

(() => {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── mobile menu ─────────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');

  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // close after tapping a link, and on Escape
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    // reset when we cross back to the desktop layout
    window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /* ── sticky-nav shadow ───────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px';
    document.body.prepend(sentinel);
    new IntersectionObserver(
      ([entry]) => nav.classList.toggle('is-stuck', !entry.isIntersecting)
    ).observe(sentinel);
  }

  /* ── scroll reveal ───────────────────────────────────
     IntersectionObserver rather than scroll-driven CSS
     animations: this needs to work in Firefox too, and a
     one-shot reveal reads better than a scrubbed one. */
  const revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // stagger siblings inside a grid so rows cascade
    document.querySelectorAll(
      '.pillars__grid, .why__grid, .gallery, .prog__grid, .space__notes'
    ).forEach((grid) => {
      [...grid.children].forEach((child, i) => {
        child.style.setProperty('--d', `${Math.min(i, 5) * 80}ms`);
      });
    });

    revealables.forEach((el) => io.observe(el));
  }

  /* ── highlight the section you're reading ────────── */
  const links = [...document.querySelectorAll('.nav__menu a[href^="#"]:not(.btn)')];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.removeAttribute('aria-current'));
        const active = links.find(
          (a) => a.getAttribute('href') === `#${entry.target.id}`
        );
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((s) => spy.observe(s));
  }

  /* ── footer year ─────────────────────────────────── */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
