(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* private mode */ } }
  };

  // Theme toggle. The saved choice is applied early by an inline script in
  // <head> to avoid a flash; this handles the button.
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    const current = () => root.dataset.theme
      || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    const label = () => themeBtn.setAttribute('aria-label', `Switch to ${current() === 'dark' ? 'light' : 'dark'} theme`);
    label();
    themeBtn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      storage.set('tf-theme', next);
      label();
    });
  }

  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }

  // Header border once the page scrolls
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Scroll reveal, staggered within a group
  const revealEls = document.querySelectorAll('.reveal');
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    group.querySelectorAll(':scope > .reveal').forEach((el, i) => el.style.setProperty('--delay', `${Math.min(i, 6) * 70}ms`));
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Hero: subtle pointer parallax on the layered screens
  const visual = document.querySelector('.hero-visual');
  if (visual && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const layers = [...visual.querySelectorAll('[data-depth]')];
    const base = layers.map((el) => getComputedStyle(el).transform);
    let frame = 0;
    visual.closest('.hero').addEventListener('pointermove', (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = visual.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / r.width;
        const y = (e.clientY - (r.top + r.height / 2)) / r.height;
        layers.forEach((el, i) => {
          const d = Number(el.dataset.depth);
          const t = base[i] === 'none' ? '' : base[i];
          el.style.transform = `translate3d(${(-x * d).toFixed(1)}px, ${(-y * d).toFixed(1)}px, 0) ${t}`;
        });
      });
    });
  }

  // Work page: category filters with counts
  const filters = document.querySelectorAll('.filter');
  const projectCards = document.querySelectorAll('.project-grid .project[data-category]');
  if (filters.length) {
    filters.forEach((btn) => {
      const cat = btn.dataset.filter;
      const n = cat === 'all'
        ? projectCards.length
        : [...projectCards].filter((p) => p.dataset.category.split(' ').includes(cat)).length;
      const count = btn.querySelector('.count');
      if (count) count.textContent = n;
      btn.addEventListener('click', () => {
        filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        projectCards.forEach((p) => {
          p.hidden = cat !== 'all' && !p.dataset.category.split(' ').includes(cat);
        });
      });
    });
  }

  // Project dialog
  const projects = window.TF_PROJECTS || [];
  const dialog = document.querySelector('#project-dialog');
  if (dialog && projects.length) {
    const $ = (sel) => dialog.querySelector(sel);
    const stageImg = $('.dialog-stage img');
    const caption = $('.dialog-caption');
    const thumbs = $('.dialog-thumbs');
    const prev = $('.stage-nav.prev');
    const next = $('.stage-nav.next');
    let current = null;
    let index = 0;
    let opener = null;

    const show = (i) => {
      const imgs = current.images;
      index = (i + imgs.length) % imgs.length;
      const [src, alt] = imgs[index];
      stageImg.src = src;
      stageImg.alt = alt;
      caption.textContent = imgs.length > 1 ? `${alt} — ${index + 1} / ${imgs.length}` : alt;
      thumbs.querySelectorAll('button').forEach((b, j) => b.setAttribute('aria-current', String(j === index)));
      const active = thumbs.children[index];
      if (active) active.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    };

    const open = (slug, fromEl) => {
      current = projects.find((p) => p.slug === slug);
      if (!current) return false;
      opener = fromEl || null;
      $('.client').textContent = current.client;
      $('#project-dialog-title').textContent = current.title;
      $('.dialog-text').replaceChildren(...current.body.map((t) => Object.assign(document.createElement('p'), { textContent: t })));

      const meta = $('.dialog-meta');
      meta.replaceChildren();
      [['Role', current.role], ['When', current.years], ['Credit', current.credit]].forEach(([k, v]) => {
        if (!v) return;
        const row = document.createElement('div');
        row.append(Object.assign(document.createElement('dt'), { textContent: k }), Object.assign(document.createElement('dd'), { textContent: v }));
        meta.append(row);
      });

      $('.highlights').replaceChildren(...current.highlights.map((t) => Object.assign(document.createElement('li'), { textContent: t })));
      $('.dialog-tags').replaceChildren(...current.tags.map((t) => Object.assign(document.createElement('li'), { textContent: t })));

      const cs = $('.dialog-case');
      cs.hidden = !current.caseStudy;
      if (current.caseStudy) cs.href = current.caseStudy;

      thumbs.replaceChildren(...current.images.map(([src, alt], j) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Show image ${j + 1}: ${alt}`);
        b.append(Object.assign(document.createElement('img'), { src, alt: '', loading: 'lazy' }));
        b.addEventListener('click', () => show(j));
        return b;
      }));
      const multi = current.images.length > 1;
      thumbs.hidden = !multi;
      prev.hidden = !multi;
      next.hidden = !multi;
      show(0);

      if (!dialog.open) dialog.showModal();
      dialog.querySelector('.dialog-body').scrollTop = 0;
      history.replaceState(null, '', `#${slug}`);
      return true;
    };

    prev.addEventListener('click', () => show(index - 1));
    next.addEventListener('click', () => show(index + 1));
    $('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', (e) => {
      if (e.target.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'ArrowLeft') show(index - 1);
    });
    dialog.addEventListener('close', () => {
      history.replaceState(null, '', location.pathname + location.search);
      if (opener) opener.focus();
    });

    document.querySelectorAll('[data-project]').forEach((card) => {
      card.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        if (open(card.dataset.project, card)) e.preventDefault();
      });
    });

    const fromHash = decodeURIComponent(location.hash.slice(1));
    if (fromHash) open(fromHash);
  }

  // Case studies: click a screenshot to view it full size
  const zoom = document.querySelector('#zoom-dialog');
  if (zoom) {
    const img = zoom.querySelector('img');
    let opener = null;
    document.querySelectorAll('.shot, .case-hero-img').forEach((fig) => {
      const pic = fig.querySelector('img');
      fig.tabIndex = 0;
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-label', `View full size: ${pic.alt}`);
      const openZoom = () => {
        opener = fig;
        img.src = pic.dataset.full || pic.src;
        img.alt = pic.alt;
        zoom.showModal();
        zoom.querySelector('.zoom-scroll').scrollTop = 0;
      };
      fig.addEventListener('click', openZoom);
      fig.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openZoom(); }
      });
    });
    zoom.querySelector('.dialog-close').addEventListener('click', () => zoom.close());
    zoom.addEventListener('click', (e) => { if (e.target === zoom || e.target.classList.contains('zoom-scroll')) zoom.close(); });
    zoom.addEventListener('close', () => { if (opener) opener.focus(); });
  }

  // Contact form. Set data-endpoint on the form to a form backend (Formspree,
  // Basin, Netlify Forms, your own API...) that accepts a JSON POST.
  const form = document.querySelector('#contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const fields = [...form.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), select, textarea')];

    const validate = (field) => {
      let message = '';
      if (field.validity.valueMissing) message = 'This field is required.';
      else if (field.validity.typeMismatch) message = 'Please enter a valid email address.';
      const error = form.querySelector(`#${field.id}-error`);
      if (error) error.textContent = message;
      field.setAttribute('aria-invalid', String(Boolean(message)));
      return !message;
    };

    fields.forEach((field) => field.addEventListener('blur', () => {
      if (field.value || field.getAttribute('aria-invalid') === 'true') validate(field);
    }));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.classList.remove('is-error');
      const invalid = fields.filter((field) => !validate(field));
      if (invalid.length) {
        status.textContent = '';
        invalid[0].focus();
        return;
      }

      const data = new FormData(form);
      if (data.get('website')) return; // honeypot
      const payload = Object.fromEntries([...data.keys()].map((k) => [k, data.getAll(k).join(', ')]));
      const endpoint = form.dataset.endpoint;
      const button = form.querySelector('[type="submit"]');

      if (!endpoint) {
        status.textContent = 'Thanks! This form isn’t connected yet — nothing was sent.';
        return;
      }

      button.disabled = true;
      status.textContent = 'Sending…';
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.textContent = 'Thanks — your message is on its way. We’ll be in touch within two working days.';
      } catch {
        status.classList.add('is-error');
        status.textContent = 'Sorry, something went wrong sending your message. Please try again in a moment.';
      } finally {
        button.disabled = false;
      }
    });
  }
})();
