(() => {
  'use strict';

  document.documentElement.classList.add('js');

  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Work page: category filters
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project[data-category]');
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.filter;
      filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      projects.forEach((p) => {
        p.hidden = category !== 'all' && p.dataset.category !== category;
      });
    });
  });

  // Contact page: client-side validation only. No backend is wired up yet —
  // point the form at a real endpoint and replace the success branch below.
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = form.querySelector('.form-status');

    const validate = (field) => {
      let message = '';
      if (field.validity.valueMissing) message = 'This field is required.';
      else if (field.validity.typeMismatch) message = 'Please enter a valid email address.';
      const error = form.querySelector(`#${field.id}-error`);
      if (error) error.textContent = message;
      field.setAttribute('aria-invalid', String(Boolean(message)));
      return !message;
    };

    const fields = [...form.querySelectorAll('input, select, textarea')];
    fields.forEach((field) => field.addEventListener('blur', () => validate(field)));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const invalid = fields.filter((field) => !validate(field));
      if (invalid.length) {
        status.textContent = '';
        invalid[0].focus();
        return;
      }
      status.textContent = 'Thanks — your message passed validation. (Demo form: nothing was sent.)';
      form.reset();
    });
  }
})();
