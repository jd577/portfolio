/*
 * GENERATED FILE - do not edit by hand.
 * Built from the ES-module sources in assets/js by tools/build-bundle.mjs.
 * Lets the portfolio run when index.html is opened directly from disk
 * (file://), where browsers block ES modules. Deployed copies keep using
 * the real modules; this bundle is only the file:// fallback.
 */
'use strict';
const __NS = {};
const __reg = (key, value) => { __NS[key] = value; };
const __get = (key) => __NS[key];

/* ---- config.js ---- */
__reg("config.js", (function () {
/**
 * -----------------------------------------------------------------------------
 * SITE CONFIG — the ONLY file you need to edit to personalise the portfolio.
 *
 * Values below come from Jawad's CV. The only remaining placeholder is the CV
 * PDF itself: drop it in assets/ and set cvUrl.
 * -----------------------------------------------------------------------------
 */

const config = {
  siteUrl: 'https://jd577.github.io/portfolio/', // GitHub Pages URL (update if repo name differs)
  name: 'Jawad Akhtar',
  title: 'Software Quality Assurance Engineer',
  tagline:
    'Manual Testing | API Testing | Database Testing | Performance Testing | Test Automation | AI for QA',
  education: 'BS Computer Engineering · UET Taxila',
  location: 'Lahore, Punjab, Pakistan',
  phone: '03250860119',
  experienceSummary: '1 year of professional SQA experience',
  currentRole: {
    company: 'NeuroOcean AI',
    role: 'Software Quality Assurance Engineer',
  },
  status: 'Open to SQA Engineering Opportunities',

  /* Real contact details (from CV). */
  email: 'jawadakhtar292@gmail.com',
  emailSubject: 'SQA Engineering Opportunity — Jawad Akhtar (portfolio)',
  linkedin: 'https://www.linkedin.com/in/jawad-akhtar-b710023a9',
  github: 'https://github.com/jd577',
  cvUrl: 'assets/Jawad-Akhtar-CV.pdf',
  cvFileName: 'Jawad-Akhtar-CV.pdf',

  /* Optional project links — leave empty to render "[Add GitHub URL]" / "[Add Demo URL]". */
  projectLinks: {
    thryve: { github: '', demo: '' },
    flit: { github: '', demo: '' },
    qualityguard: { github: '', demo: '' },
    lifeweaver: { github: '', demo: '' },
  },
};

return { config: config };
})());

/* ---- lib/dom.js ---- */
__reg("lib/dom.js", (function () {
/**
 * Tiny DOM + UI helpers. No dependencies.
 * All text goes through `text()` / textContent so nothing is ever injected as HTML.
 */

const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key === 'html') node.innerHTML = value; // only ever used with local constants
    else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function')
      node.addEventListener(key.slice(2).toLowerCase(), value);
    else node.setAttribute(key, value === true ? '' : String(value));
  }

  append(node, children);
  return node;
};

const append = (parent, children) => {
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false) continue;
    parent.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return parent;
};

const frag = (children = []) => {
  const node = document.createDocumentFragment();
  append(node, children);
  return node;
};

/** Shorthand: h(2, 'class', [children]) */
const h = (tag, className, children = []) => el(tag, { class: className }, children);

const text = (value) => document.createTextNode(String(value));

const on = (node, event, handler, options) => {
  node.addEventListener(event, handler, options);
  return node;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------------------------------------- */
/* Toast (announced politely to screen readers)                                */
/* -------------------------------------------------------------------------- */

let toastRoot = null;
let toastTimer = null;

const ensureToastRoot = () => {
  if (!toastRoot) {
    toastRoot = el('div', {
      class: 'toast-region',
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true',
    });
    document.body.appendChild(toastRoot);
  }
  return toastRoot;
};

const toast = (message, variant = 'info') => {
  const root = ensureToastRoot();
  root.textContent = '';
  root.classList.remove('is-visible');

  const node = el('div', { class: `toast toast--${variant}` }, [
    el('span', { class: 'toast__icon', 'aria-hidden': 'true', text: variant === 'error' ? '!' : '✓' }),
    el('span', { class: 'toast__text', text: message }),
  ]);

  root.appendChild(node);
  // force reflow so the transition runs again on repeat calls
  void node.offsetWidth;
  root.classList.add('is-visible');

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => root.classList.remove('is-visible'), 4200);
};

/* -------------------------------------------------------------------------- */
/* Copy to clipboard (with graceful fallback)                                  */
/* -------------------------------------------------------------------------- */

const copyText = async (value) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const area = el('textarea', { class: 'sr-only' });
    area.value = value;
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  } catch {
    return false;
  }
};

/* -------------------------------------------------------------------------- */
/* Scroll reveal                                                               */
/* -------------------------------------------------------------------------- */

let revealObserver = null;

const initReveal = (scope = document) => {
  const targets = Array.from(scope.querySelectorAll('[data-reveal]'));
  if (!targets.length) return;

  const reveal = (node) => node.classList.add('is-revealed');

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach(reveal);
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      // threshold 0: reveal as soon as ANY part enters the viewport.
      // Percentage thresholds never fire for sections taller than the
      // screen (e.g. Projects on a phone), leaving them invisible.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
  }

  targets.forEach((node) => {
    if (node.classList.contains('is-revealed')) return;
    // Elements already at or above the current viewport (mid-page reload,
    // anchor jumps) reveal immediately instead of waiting for a scroll.
    if (node.getBoundingClientRect().top < window.innerHeight) reveal(node);
    else revealObserver.observe(node);
  });
};

/* -------------------------------------------------------------------------- */
/* Small UI primitives used by several sections                                */
/* -------------------------------------------------------------------------- */

/** Rendered as a non-link, dotted-underline value so nothing is a broken link. */
const placeholder = (label) =>
  el('span', {
    class: 'placeholder',
    dataset: { placeholder: label },
    title: `Placeholder — set this value in assets/js/config.js`,
    text: label,
  });

/** Returns the real value if configured, otherwise a visible placeholder node. */
const valueOrPlaceholder = (value, label) =>
  value ? el('span', { class: 'value', text: value }) : placeholder(label);

const sectionHeading = (index, kicker, title, intro = '') =>
  h('header', 'section__head', [
    el('p', { class: 'section__index', text: index }),
    el('p', { class: 'section__kicker', text: kicker }),
    el('h2', { class: 'section__title', text: title }),
    intro ? el('p', { class: 'section__intro', text: intro }) : null,
  ]);

const chip = (label, variant = 'default') =>
  el('span', { class: `chip chip--${variant}`, text: label });

const section = (id, label, children = []) => {
  const node = el('section', { class: 'section', id, 'aria-labelledby': `${id}-title` });
  const inner = h('div', 'container section__inner', children);
  node.appendChild(inner);
  node.dataset.sectionLabel = label;
  return node;
};

const sectionTitleId = (id) => `${id}-title`;

return { el: el, append: append, frag: frag, h: h, text: text, on: on, prefersReducedMotion: prefersReducedMotion, toast: toast, copyText: copyText, initReveal: initReveal, placeholder: placeholder, valueOrPlaceholder: valueOrPlaceholder, sectionHeading: sectionHeading, chip: chip, section: section, sectionTitleId: sectionTitleId };
})());

/* ---- lib/icons.js ---- */
__reg("lib/icons.js", (function () {
/**
 * Inline SVG icon set (stroke-based, inherits `currentColor`).
 * No icon library, no external requests, no licensing concerns.
 * Tool glyphs are abstract, simplified marks — not vendor logos.
 */

const svg = (paths, viewBox = '0 0 24 24') =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

const icons = {
  logo: svg(
    `<path d="M5 12.5 9.5 17 19 7"/><path d="M3.5 6.5 12 3l8.5 3.5v6.2c0 4.3-3.4 7.4-8.5 8.8-5.1-1.4-8.5-4.5-8.5-8.8Z" stroke-width="1.4"/>`,
  ),
  download: svg(`<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/>`),
  arrowRight: svg(`<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>`),
  arrowDown: svg(`<path d="M12 4v15"/><path d="m6 13 6 6 6-6"/>`),
  arrowUp: svg(`<path d="M12 20V5"/><path d="m6 11 6-6 6 6"/>`),
  chevron: svg(`<path d="m9 5 7 7-7 7"/>`),
  chevronDown: svg(`<path d="m5 9 7 7 7-7"/>`),
  menu: svg(`<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>`),
  close: svg(`<path d="M6 6l12 12"/><path d="M18 6 6 18"/>`),
  sun: svg(
    `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>`,
  ),
  moon: svg(`<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/>`),
  mail: svg(`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>`),
  linkedin: svg(
    `<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17"/><path d="M8 7.4v.1"/><path d="M12 17v-3.6a2.2 2.2 0 0 1 4.4 0V17"/>`,
  ),
  github: svg(
    `<path d="M9.2 20.4c-3.6 1-3.6-2-5-2.4"/><path d="M14.8 21v-3.3c0-.9-.2-1.6-.8-2.1 2.6-.3 4.8-1.3 4.8-5.5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-1-.3-3.2 1.2a11 11 0 0 0-5.6 0C6.6 4.2 5.6 4.5 5.6 4.5a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 4.4 10c0 4.2 2.2 5.2 4.8 5.5-.4.4-.7.9-.8 1.6V21"/>`,
  ),
  file: svg(`<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>`),
  copy: svg(`<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>`),
  check: svg(`<path d="m5 12.5 4.5 4.5L19 7"/>`),
  bug: svg(
    `<path d="M9 7a3 3 0 0 1 6 0"/><rect x="7" y="7" width="10" height="12" rx="5"/><path d="M4 11h3"/><path d="M17 11h3"/><path d="M4 16h3"/><path d="M17 16h3"/><path d="M12 11v6"/>`,
  ),
  layers: svg(`<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3.5 12.5 8.5 4.7 8.5-4.7"/><path d="m3.5 16.8 8.5 4.7 8.5-4.7"/>`),
  api: svg(`<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01"/><path d="M7 17h.01"/>`),
  database: svg(
    `<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>`,
  ),
  gauge: svg(
    `<path d="M4 18a8.5 8.5 0 1 1 16 0"/><path d="m12 18 4-5.5"/><circle cx="12" cy="18" r="1.2"/>`,
  ),
  shield: svg(`<path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z"/><path d="m9.2 12 2 2 3.6-3.8"/>`),
  robot: svg(
    `<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4"/><circle cx="12" cy="3.4" r="1.2"/><path d="M9.5 13v1.5"/><path d="M14.5 13v1.5"/><path d="M2 12.5v3"/><path d="M22 12.5v3"/>`,
  ),
  cursor: svg(`<path d="m5 3 6 17 2.4-6.6L20 11Z"/>`),
  users: svg(
    `<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6"/><path d="M17.5 14.4a5.5 5.5 0 0 1 3 5.1"/>`,
  ),
  flask: svg(
    `<path d="M9.5 3h5"/><path d="M10.5 3v6.2L5.6 17.4A2 2 0 0 0 7.3 20.5h9.4a2 2 0 0 0 1.7-3.1L13.5 9.2V3"/><path d="M8 14.5h8"/>`,
  ),
  flow: svg(
    `<rect x="3" y="4" width="6" height="5" rx="1.4"/><rect x="15" y="15" width="6" height="5" rx="1.4"/><path d="M9 6.5h5.5a3 3 0 0 1 3 3V15"/><path d="m15 13.5 2.5 2.5L15 18.5"/>`,
  ),
  terminal: svg(`<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/>`),
  search: svg(`<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>`),
  external: svg(`<path d="M14 4h6v6"/><path d="m20 4-8.5 8.5"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>`),
  spark: svg(`<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m6 6 2.5 2.5"/><path d="M15.5 15.5 18 18"/><path d="m18 6-2.5 2.5"/><path d="M8.5 15.5 6 18"/>`),
  target: svg(
    `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>`,
  ),
  clock: svg(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`),
  network: svg(
    `<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="m10.6 6.9-4 9.9"/><path d="m13.4 6.9 4 9.9"/><path d="M7.2 19h9.6"/>`,
  ),
  refresh: svg(
    `<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/>`,
  ),
  brain: svg(
    `<path d="M9.5 4.5A2.8 2.8 0 0 0 6.8 8a2.6 2.6 0 0 0-1.3 4.5A2.9 2.9 0 0 0 7 17.6a2.7 2.7 0 0 0 5.2.8V5.6a2.6 2.6 0 0 0-2.7-1.1Z"/><path d="M14.5 4.5A2.8 2.8 0 0 1 17.2 8a2.6 2.6 0 0 1 1.3 4.5A2.9 2.9 0 0 1 17 17.6a2.7 2.7 0 0 1-5.2.8V5.6a2.6 2.6 0 0 1 2.7-1.1Z"/>`,
  ),
  phone: svg(
    `<path d="M7 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7 2 2 0 0 1 7 3.5Z"/>`,
  ),
  pin: svg(
    `<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>`,
  ),
  calendar: svg(
    `<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M8 14h3"/><path d="M8 17h6"/>`,
  ),
  stethoscope: svg(
    `<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3H4"/><path d="M15 3h1"/><path d="M10 15v1a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2"/><circle cx="19" cy="12.5" r="2"/>`,
  ),
  briefcase: svg(
    `<rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>`,
  ),
};

/** Resolve an icon name to an inline-SVG wrapper element. */
const icon = (name, className = 'icon') => {
  const node = document.createElement('span');
  node.className = className;
  node.innerHTML = icons[name] || icons.target;
  return node;
};

return { icons: icons, icon: icon };
})());

/* ---- data/skills.js ---- */
__reg("data/skills.js", (function () {
/**
 * QA skills — grouped exactly as provided.
 *
 * Levels are descriptive, never numeric:
 *   core     -> used as part of my day-to-day QA work
 *   practiced-> applied hands-on in real testing work
 *   working  -> comfortable using it, still building depth
 *   learning -> actively learning / applying in personal projects
 *
 * No percentages, no fake proficiency scores.
 */

const skillLevels = {
  core: { label: 'Core practice', short: 'Core', hint: 'Used in day-to-day QA work' },
  practiced: { label: 'Practiced', short: 'Practiced', hint: 'Applied hands-on in real testing work' },
  working: { label: 'Working knowledge', short: 'Working', hint: 'Comfortable using it, still building depth' },
  learning: { label: 'Actively learning', short: 'Learning', hint: 'Learning and applying in practice projects' },
};

const skillCategories = [
  {
    id: 'manual',
    name: 'Manual Testing',
    icon: 'cursor',
    summary: 'The foundation of everything else — scenario design and exploratory judgement.',
    skills: [
      { name: 'Functional Testing', level: 'core' },
      { name: 'Regression Testing', level: 'core' },
      { name: 'Smoke Testing', level: 'core' },
      { name: 'Sanity Testing', level: 'core' },
      { name: 'End-to-End Testing', level: 'core' },
      { name: 'UI/UX Testing', level: 'practiced' },
      { name: 'Black Box Testing', level: 'core' },
      { name: 'Negative Testing', level: 'practiced' },
      { name: 'Boundary Testing', level: 'practiced' },
      { name: 'Exploratory Testing', level: 'practiced' },
      { name: 'Cross-browser Testing', level: 'practiced' },
    ],
  },
  {
    id: 'api',
    name: 'API Testing',
    icon: 'api',
    summary: 'Validating behaviour below the UI, where most real defects hide.',
    skills: [
      { name: 'Postman', level: 'practiced' },
      { name: 'Swagger', level: 'practiced' },
      { name: 'REST API validation', level: 'practiced' },
      { name: 'Request/response validation', level: 'practiced' },
      { name: 'Status code validation', level: 'practiced' },
      { name: 'Authentication testing', level: 'practiced' },
      { name: 'Authorization testing', level: 'practiced' },
      { name: 'Negative API testing', level: 'practiced' },
      { name: 'JSON validation', level: 'practiced' },
      { name: 'Error-handling validation', level: 'practiced' },
      { name: 'Business-logic validation', level: 'practiced' },
    ],
  },
  {
    id: 'database',
    name: 'Database Testing',
    icon: 'database',
    summary: 'Confirming the data behind the screen is consistent, complete and correct.',
    skills: [
      { name: 'PostgreSQL', level: 'practiced' },
      { name: 'pgAdmin 4', level: 'practiced' },
      { name: 'SQL', level: 'practiced' },
      { name: 'Data validation', level: 'core' },
      { name: 'CRUD validation', level: 'practiced' },
      { name: 'Backend/frontend data consistency', level: 'practiced' },
      { name: 'Database query validation', level: 'practiced' },
    ],
  },
  {
    id: 'performance',
    name: 'Performance Testing',
    icon: 'gauge',
    summary: 'Checking how the system behaves under realistic and heavy user load.',
    skills: [
      { name: 'Apache JMeter', level: 'working' },
      { name: 'Load Testing', level: 'working' },
      { name: 'Stress Testing', level: 'working' },
      { name: 'Response-time analysis', level: 'working' },
      { name: 'Concurrent-user testing', level: 'working' },
      { name: 'Performance bottleneck identification', level: 'working' },
    ],
  },
  {
    id: 'security',
    name: 'Security Testing',
    icon: 'shield',
    summary: 'Awareness-driven testing: access control, input handling and known weaknesses.',
    skills: [
      { name: 'OWASP ZAP', level: 'working' },
      { name: 'Basic web security testing', level: 'working' },
      { name: 'Authentication testing', level: 'practiced' },
      { name: 'Authorization testing', level: 'practiced' },
      { name: 'Input validation', level: 'practiced' },
      { name: 'Security vulnerability awareness', level: 'working' },
    ],
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: 'terminal',
    summary: 'Turning repeatable manual checks into reliable automated coverage.',
    skills: [
      { name: 'Playwright with Python', level: 'learning' },
      { name: 'Selenium', level: 'working' },
      { name: 'Katalon Studio', level: 'working' },
      { name: 'Selenium IDE', level: 'working' },
    ],
  },
  {
    id: 'ai',
    name: 'AI & QA',
    icon: 'brain',
    summary: 'Using AI as an assistant in the QA workflow — with the engineer validating every result.',
    skills: [
      { name: 'AI-assisted test-case generation', level: 'learning' },
      { name: 'AI-assisted bug analysis', level: 'learning' },
      { name: 'AI-assisted requirement analysis', level: 'learning' },
      { name: 'AI-assisted test automation', level: 'learning' },
      { name: 'LLM evaluation', level: 'learning' },
      { name: 'AI tools for QA productivity', level: 'learning' },
      { name: 'OpenAI API integration testing', level: 'practiced' },
      { name: 'LLM application testing', level: 'practiced' },
      { name: 'Prompt engineering for QA', level: 'working' },
      { name: 'RAG / LangChain / LangGraph awareness', level: 'working' },
    ],
  },
];

return { skillLevels: skillLevels, skillCategories: skillCategories };
})());

/* ---- data/tools.js ---- */
__reg("data/tools.js", (function () {
/**
 * Tools I have worked with or am learning.
 * `status` is honest: "used" (worked with) or "learning" (actively learning).
 * No certifications, no official proficiency levels, no vendor logos.
 */

const tools = [
  { name: 'Postman', icon: 'api', status: 'used', note: 'REST API testing, collections, request/response validation' },
  { name: 'Swagger', icon: 'file', status: 'used', note: 'Reading API contracts and testing documented endpoints' },
  { name: 'PostgreSQL', icon: 'database', status: 'used', note: 'Querying and validating application data' },
  { name: 'pgAdmin 4', icon: 'layers', status: 'used', note: 'Database inspection and query execution' },
  { name: 'JMeter', icon: 'gauge', status: 'used', note: 'Load and stress testing, response-time analysis' },
  { name: 'OWASP ZAP', icon: 'shield', status: 'used', note: 'Baseline web security scans and manual probing' },
  { name: 'Wireshark', icon: 'network', status: 'learning', note: 'Network traffic inspection during investigation' },
  { name: 'Playwright', icon: 'cursor', status: 'learning', note: 'Browser automation with Python' },
  { name: 'Python', icon: 'terminal', status: 'used', note: 'Automation scripts and test data handling' },
  { name: 'Katalon Studio', icon: 'flask', status: 'used', note: 'Scripted and record-and-play test automation' },
  { name: 'Selenium', icon: 'flow', status: 'used', note: 'WebDriver-based browser automation' },
  { name: 'Selenium IDE', icon: 'cursor', status: 'used', note: 'Rapid recording and replay of browser tests' },
  { name: 'n8n', icon: 'flow', status: 'learning', note: 'Workflow automation for QA support tasks' },
  { name: 'Chrome DevTools', icon: 'search', status: 'used', note: 'Network, console and DOM inspection during testing' },
  { name: 'FastAPI', icon: 'api', status: 'used', note: 'Backend API behaviour observed and validated during testing' },
  { name: 'SQLAlchemy', icon: 'database', status: 'used', note: 'Backend data-layer checks in AI automation projects' },
  { name: 'Git / GitHub', icon: 'github', status: 'used', note: 'Version control for test suites and documentation' },
];

return { tools: tools };
})());

/* ---- data/projects.js ---- */
__reg("data/projects.js", (function () {
/**
 * Featured QA projects — real work, described honestly.
 *
 * Fields that were not provided in the brief are left empty and the UI renders
 * them as an explicit "[Add ...]" placeholder instead of inventing content.
 */

const projects = [
  {
    id: 'thryve',
    name: 'Thryve Healthcare Platform',
    type: 'QA Project Case Study',
    context: 'Professional QA work',
    accent: 'health',
    description:
      'A healthcare platform involving patient onboarding, subscriptions, appointments, provider workflows, phlebotomy visits, lab orders, care plans, messaging, and AI-assisted patient features.',
    responsibilities: [
      'Testing patient, admin, provider and phlebotomist workflows',
      'Validating role-based access across each role',
      'End-to-end workflow testing across connected entities',
      'Data consistency checks between screens and layers',
      'Regression testing across releases',
      'Investigating and reporting defects with evidence',
    ],
    testingAreas: [
      'Patient workflows',
      'Admin workflows',
      'Provider workflows',
      'Phlebotomist workflows',
      'Subscription and credit management',
      'Appointment workflows',
      'Lab orders',
      'Patient assessments',
      'Messaging',
      'Care plans',
      'AI-generated lab summaries',
      'Patient CoPilot',
      'File uploads',
      'Notifications',
      'Document workflows',
      'Role-based access',
      'Data consistency',
      'Regression testing',
    ],
    keyScenarios: [
      'Each role can only reach the workflows it is authorised to use',
      'A subscription or credit change is reflected correctly in the related workflows',
      'An appointment moves through its states consistently for patient, provider and phlebotomist',
      'A lab order and its results stay consistent between the ordering and results views',
      'An assessment submission is stored and displayed consistently',
      'Messages reach the intended participant and only the intended participant',
      'A care plan reflects the data it is built from',
      'AI-generated lab summaries and Patient CoPilot responses match the underlying patient data',
      'File uploads and document workflows behave correctly for valid, oversized, unsupported and interrupted files',
      'Notifications reach the right role at the right step of a workflow',
      'Previously working flows still work after each release (regression)',
    ],
    challenges: [
      'Four distinct roles — patient, admin, provider and phlebotomist — each with its own workflows and permission boundaries',
      'Workflows depend on state: an appointment, lab order or care plan only behaves correctly when the previous step completed',
      'Subscription and credit management affects what a user can do elsewhere in the platform',
      'Many interconnected entities mean one change can affect several screens, so data consistency has to be verified end to end',
      'AI-assisted features (lab summaries, Patient CoPilot) need to be checked against the real patient data behind them',
      'File handling and messaging introduce inputs that vary by user, network and file type',
    ],
    learned: [
      'How to structure testing around roles and permissions rather than around screens',
      'Why end-to-end walkthroughs matter when entities depend on each other’s state',
      'How to validate AI-generated output against the source data it summarises',
      'Why regression scope has to be chosen deliberately in a platform with many connected workflows',
    ],
    tools: [], // not specified — rendered as a placeholder in the UI
    workflow: {
      title: 'Patient journey used to plan end-to-end coverage',
      steps: [
        'Patient Signup',
        'Package Purchase',
        'Intake Assessment',
        'Provider Consultation',
        'Lab / Order',
        'Phlebotomy',
        'Results',
        'Care Plan',
      ],
    },
  },
  {
    id: 'flit',
    name: 'Flit AI Recruiting Platform',
    type: 'QA Project Case Study',
    context: 'Professional QA work',
    accent: 'recruit',
    description:
      'An AI-powered recruiting platform involving candidates, employees, job recommendations, profiles, hiring workflows, interviews, and candidate selection.',
    responsibilities: [
      'Testing authentication and candidate profile creation',
      'Validating CV parsing output against the uploaded document',
      'Testing job recommendation and employer/hiring workflows',
      'API validation against the documented contract',
      'UI, negative and regression testing',
    ],
    testingAreas: [
      'Registration',
      'Authentication',
      'Candidate profile creation',
      'CV parsing and AI-powered CV generation',
      'Job posting',
      'Job recommendations',
      'Candidate management',
      'Employer workflows',
      'Hiring workflows',
      'Interview scheduling',
      'Video introduction',
      'API validation',
      'UI testing',
      'Negative testing',
      'Regression testing',
    ],
    keyScenarios: [
      'A candidate can register, sign in and sign out, and invalid credentials are rejected',
      'A completed candidate profile produces the recommendations expected for that profile',
      'CV parsing and AI-powered CV generation reflect the content of the uploaded CV',
      'A posted job is visible and behaves correctly for matching candidates',
      'Interview scheduling keeps candidate and employer views consistent',
      'An employer can move a candidate through the hiring workflow',
      'A video introduction is recorded, stored and played back for the right candidate',
      'API responses match the documented contract in shape, status code and content',
      'Invalid, missing, oversized or malformed input is rejected with clear feedback',
      'Previously working flows still work after each release (regression)',
    ],
    challenges: [
      'Two very different user types — candidates and employers — with separate journeys that meet in the hiring workflow',
      'CV parsing and job recommendations depend on user-supplied content, so expected results have to be judged against the input',
      'Video introduction testing covers capture, storage and playback across browsers',
      'UI behaviour had to be cross-checked against the API to separate a display issue from a data issue',
    ],
    learned: [
      'How to separate a UI defect from an API or data defect using response inspection',
      'How to design negative scenarios for input-driven features such as CV parsing',
      'How to keep regression scope focused when features feed into each other',
    ],
    tools: ['Postman', 'Swagger', 'Playwright', 'Browser developer tools'],
    pipeline: {
      title: 'How each feature moved through the QA lifecycle',
      steps: [
        'Requirement',
        'Test Strategy',
        'Test Scenarios',
        'Execution',
        'Defect Detection',
        'Retesting',
        'Regression',
      ],
    },
  },
  {
    id: 'qualityguard',
    name: 'QualityGuard',
    type: 'QA Automation / Learning Project',
    context: 'Personal project — not a production system',
    accent: 'automation',
    description:
      'A QA-focused automation and learning project built to practise designing automated browser tests in a reusable, maintainable way with Python and Playwright.',
    responsibilities: [
      'Designing a reusable test structure instead of one-off scripts',
      'Writing automated browser tests for login and related flows',
      'Managing test data separately from test logic',
      'Writing assertions that fail for the right reason',
      'Covering negative scenarios and regression paths',
    ],
    testingAreas: [
      'Automated browser testing',
      'Reusable test structure',
      'Test data',
      'Assertions',
      'Login testing',
      'Negative scenarios',
      'Regression automation',
    ],
    keyScenarios: [
      'A valid login reaches the expected destination',
      'An invalid username, invalid password or empty field is rejected with clear feedback',
      'The same test data set can be reused across runs without leaving the app in a broken state',
      'A previously automated flow still passes after a change (regression run)',
      'A failing assertion reports what was expected versus what happened',
    ],
    challenges: [
      'Keeping tests independent so one failure does not cascade into the rest of the run',
      'Separating test data, page interactions and assertions so tests stay readable',
      'Writing assertions that describe intent instead of implementation detail',
    ],
    learned: [
      'How a small amount of structure makes automated tests far easier to maintain',
      'How to design negative scenarios that are worth automating',
      'Why regression automation pays off only when the suite stays stable and readable',
    ],
    tools: ['Python', 'Playwright'],
    stackNote: 'Primary technology: Python + Playwright',
  },

  {
    id: 'lifeweaver',
    name: 'LifeWeaver — AI-Powered Platform',
    type: 'QA Project Case Study',
    context: 'Professional QA work',
    accent: 'ai',
    description:
      'An AI-powered platform combining LLM functionality with backend API integrations to external services such as WhatsApp, Gmail, and Google Calendar.',
    responsibilities: [
      'QA across core functional and integration workflows',
      'Testing AI/LLM functionality and backend API integrations',
      'Validating integrations with WhatsApp, Gmail, and Calendar',
      'Executing API, database, functional, and end-to-end test scenarios',
      'Identifying, documenting, and retesting defects',
    ],
    testingAreas: [
      'AI/LLM functionality',
      'Backend API integrations',
      'WhatsApp integration',
      'Gmail integration',
      'Google Calendar integration',
      'API testing',
      'Database testing',
      'Functional testing',
      'End-to-end testing',
      'Defect retesting',
    ],
    keyScenarios: [
      'Each external integration (WhatsApp, Gmail, Calendar) sends and receives the data the workflow expects',
      'AI/LLM responses are consistent with the input and the connected data',
      'Data created through an integration is stored consistently in the backend',
      'A failure in an external service produces a clear, recoverable state in the platform',
      'Previously working flows still pass after changes (regression)',
    ],
    challenges: [
      'Behaviour depends on third-party services as well as the platform itself, so defects had to be isolated layer by layer',
      'AI-powered responses had to be validated against the intent and data behind each request',
      'Integration issues can be intermittent, so reproduction notes and evidence mattered even more',
    ],
    learned: [
      'How to test a system whose behaviour crosses into third-party services',
      'How to structure evidence for integration defects so developers can act on it',
      'How to validate AI-powered features end to end, from input to stored result',
    ],
    tools: [], // not specified — rendered as a placeholder in the UI
  },
];
return { projects: projects };
})());

/* ---- data/content.js ---- */
__reg("data/content.js", (function () {
/**
 * Interactive test-case example and bug-investigation example.
 * Content is illustrative of method — the appointment feature is described as an
 * example test case, not as a delivered artefact from a named client project.
 */

const testCase = {
  id: 'TC-001',
  type: 'Functional',
  feature: 'Patient Appointment Rescheduling',
  title: 'Admin reschedules a scheduled patient appointment.',
  precondition: 'Patient has an appointment with Scheduled status.',
  steps: [
    'Login as Admin.',
    "Open the patient's profile.",
    'Open Appointment Management.',
    'Select a scheduled appointment.',
    'Change the appointment date/time.',
    'Change the assigned provider if applicable.',
    'Save the changes.',
  ],
  expected:
    'The appointment is successfully rescheduled and the updated date, time, and assigned provider are reflected consistently.',
  scenarios: [
    {
      id: 'SC-02',
      name: 'Invalid date',
      type: 'Negative',
      checks:
        'A date that is not a real or acceptable date (for example 31 February, an empty value, or a malformed entry) is rejected with a clear validation message and no appointment change is saved.',
      layer: 'UI + API',
    },
    {
      id: 'SC-03',
      name: 'Past date',
      type: 'Boundary',
      checks:
        'Rescheduling to a date/time that has already passed is blocked, and the boundary (today, and the current hour) is handled deliberately rather than accidentally.',
      layer: 'UI + API',
    },
    {
      id: 'SC-04',
      name: 'Unauthorized user',
      type: 'Authorization',
      checks:
        'A user without permission to reschedule cannot reach or complete the action — tested through the UI and by calling the endpoint directly with that user’s session.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-05',
      name: 'Missing provider',
      type: 'Negative',
      checks:
        'Saving without an assigned provider is handled according to the requirement: either rejected with a clear message, or saved as unassigned and shown consistently everywhere the appointment appears.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-06',
      name: 'Double booking',
      type: 'Business rule',
      checks:
        'Two appointments cannot occupy the same provider slot: the second attempt is rejected, and the existing appointment is left unchanged in the UI, the API and the database.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-07',
      name: 'API failure',
      type: 'Negative',
      checks:
        'When the reschedule request fails, the user sees a clear failure state, no false success message is shown, and the appointment keeps its previous values after the user retries or leaves the screen.',
      layer: 'UI + API',
    },
    {
      id: 'SC-08',
      name: 'Refresh / data consistency',
      type: 'Data consistency',
      checks:
        'After a hard refresh and when opening the appointment from other screens, the new date, time and provider are the same everywhere the appointment is displayed.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-09',
      name: 'Concurrent update',
      type: 'Concurrency',
      checks:
        'When the same appointment is edited from two sessions at the same time, one change wins deliberately and the other is told the data changed — no silent overwrite, no mixed state.',
      layer: 'UI + API + DB',
    },
  ],
};

const bugInvestigation = {
  issue:
    'Patient profile changes are not immediately reflected on another side of the application until a page reload.',
  stages: [
    {
      id: 'observed',
      title: 'Observed Behavior',
      body:
        'While working through a patient workflow, a profile change made on one side of the application did not appear on the other side. The other side only showed the updated value after a manual page reload. It looked like a small display issue, so it was investigated before being reported.',
      points: [
        'Noticed during normal workflow testing, not during a scripted step',
        'The data itself looked correct after reload — the concern was the stale view',
        'Checked whether it was a one-off or repeatable before going further',
      ],
    },
    {
      id: 'reproduction',
      title: 'Reproduction',
      body:
        'A repeatable path matters more than a description. The steps were written down and run again to confirm the behaviour was consistent.',
      points: [
        'Open the patient profile on Side A and the same patient on Side B',
        'Change a profile field on Side A and save',
        'Confirm the change is saved on Side A',
        'Switch to Side B without reloading — the previous value is still shown',
        'Reload Side B — the updated value appears',
        'Repeat the sequence to confirm it happens every time, not occasionally',
      ],
    },
    {
      id: 'investigation',
      title: 'Investigation',
      body:
        'The goal at this stage is to describe the behaviour precisely and narrow down where it sits — not to guess at a cause. Nothing here claims to be the root cause.',
      points: [
        'Checked whether the change is actually saved, or only shown locally',
        'Checked whether other fields on the same profile behave the same way',
        'Checked whether the same happens for other user roles',
        'Checked whether a full reload, a soft navigation or a background action refreshes the value',
        'Watched the network activity to see whether a request is made at the moment the value should update',
        'Noted the environment: browser, screen, user role and build',
      ],
      note:
        'Root cause is deliberately left to development. QA describes and proves the behaviour; the fix owner confirms the cause.',
    },
    {
      id: 'expected',
      title: 'Expected Behavior',
      body:
        'After a patient profile change is saved, the updated value is visible on every side of the application that displays it, without the user having to reload the page.',
    },
    {
      id: 'actual',
      title: 'Actual Behavior',
      body:
        'The other side of the application continues to show the previous value until the page is reloaded manually.',
    },
    {
      id: 'evidence',
      title: 'Evidence',
      body:
        'The report is written so a developer can act on it immediately: clear title, preconditions, numbered steps, expected vs actual, environment, severity, FE/BE classification and attachments.',
      points: [
        'Screenshots or a short screen recording of the sequence',
        'The exact field changed, with before and after values',
        'Environment: browser, screen, user role and build',
        'Severity and priority, and whether it blocks the workflow',
        'Classification: front-end display, back-end response, or not yet determined',
        'Attachment slot: [Add screenshot / video]',
      ],
    },
    {
      id: 'retest',
      title: 'Retest',
      body:
        'After the fix, the reported case is re-run first, then the related flows, then a targeted regression pass. The bug is closed only when the behaviour is confirmed against the reported evidence.',
      points: [
        'Repeat the exact reproduction steps on the fixed build',
        'Check the same field and the neighbouring fields on the profile',
        'Check other roles and the other side of the application',
        'Run the related workflow end to end to catch side effects',
        'Attach the verification evidence and close the defect',
      ],
    },
  ],
};

return { testCase: testCase, bugInvestigation: bugInvestigation };
})());

/* ---- components/Navbar.js ---- */
__reg("components/Navbar.js", (function () {
const { config } = __get("config.js");
const { el, h, toast } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");

const NAV_ITEMS = [
  { id: 'home', label: 'Home', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'skills', label: 'Skills', index: '03' },
  { id: 'projects', label: 'Projects', index: '04' },
  { id: 'approach', label: 'QA Approach', index: '05' },
  { id: 'experience', label: 'Experience', index: '06' },
  { id: 'contact', label: 'Contact', index: '07' },
];

/**
 * CV button: renders a real link when `config.cvUrl` is set, otherwise a button
 * that explains where to put the file. Never a broken link.
 */
const cvControl = ({ label = 'Download CV', variant = 'primary', extraClass = '' } = {}) => {
  const classes = `btn ${variant === 'primary' ? 'btn--primary' : 'btn--ghost'} ${extraClass}`.trim();

  if (config.cvUrl) {
    return el('a', {
      class: classes,
      href: config.cvUrl,
      download: config.cvFileName,
      'aria-label': `Download ${config.name}'s CV (PDF)`,
    }, [icon('download'), el('span', { text: label })]);
  }

  return el('button', {
    type: 'button',
    class: classes,
    'aria-label': `${label} — CV file not added yet`,
    onclick: () =>
      toast('CV not added yet — set cvUrl in assets/js/config.js and drop the PDF in assets/.', 'error'),
  }, [icon('download'), el('span', { text: label })]);
};

const Navbar = () => {
  const links = NAV_ITEMS.map((item) =>
    el('a', {
      class: 'nav__link',
      href: `#${item.id}`,
      dataset: { navTarget: item.id },
      text: item.label,
    }),
  );

  const mobileLinks = NAV_ITEMS.map((item) =>
    el('a', {
      class: 'mobile-nav__link',
      href: `#${item.id}`,
      dataset: { navTarget: item.id },
    }, [el('span', { text: item.label }), el('span', { text: item.index })]),
  );

  const themeToggle = el('button', {
    type: 'button',
    class: 'theme-toggle',
    'aria-label': 'Switch to dark theme',
    title: 'Toggle colour theme',
  }, [icon('sun', 'icon icon--sun'), icon('moon', 'icon icon--moon')]);

  const menuToggle = el('button', {
    type: 'button',
    class: 'nav-toggle',
    'aria-expanded': 'false',
    'aria-controls': 'mobile-nav',
    'aria-label': 'Open navigation menu',
  }, [icon('menu', 'icon icon--menu'), icon('close', 'icon icon--close')]);

  const mobileNav = el('nav', { class: 'mobile-nav', id: 'mobile-nav', 'aria-label': 'Mobile' }, [
    h('ul', 'mobile-nav__list', mobileLinks),
    cvControl(),
  ]);

  const progressBar = el('div', { class: 'progress', 'aria-hidden': 'true' });

  const header = el('header', { class: 'navbar', id: 'navbar' }, [
    h('div', 'container navbar__inner', [
      el('a', { class: 'brand', href: '#home', 'aria-label': `${config.name} — home` }, [
        el('span', { class: 'brand__mark' }, [icon('logo')]),
        el('span', { class: 'brand__text' }, [
          el('span', { class: 'brand__name', text: config.name }),
          el('span', { class: 'brand__role', text: 'SQA Engineer' }),
        ]),
      ]),
      el('nav', { class: 'nav', 'aria-label': 'Primary' }, links),
      h('div', 'navbar__actions', [themeToggle, menuToggle, cvControl({ extraClass: 'btn--sm' })]),
    ]),
    mobileNav,
    progressBar,
  ]);

  /* --- mobile menu ----------------------------------------------------- */

  const closeMenu = () => {
    mobileNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.classList.remove('is-locked');
  };

  const openMenu = () => {
    mobileNav.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.classList.add('is-locked');
    mobileNav.querySelector('a')?.focus();
  };

  menuToggle.addEventListener('click', () => {
    if (menuToggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });

  mobileNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener('resize', () => window.innerWidth >= 940 && closeMenu(), { passive: true });

  /* --- scroll state + reading progress --------------------------------- */

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- theme ----------------------------------------------------------- */

  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a1116' : '#f6f8f9');
    const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
  };

  const readStored = () => {
    try {
      return window.localStorage.getItem('ja-theme');
    } catch {
      return null;
    }
  };

  applyTheme(readStored() || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      window.localStorage.setItem('ja-theme', next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
    toast(next === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!readStored()) applyTheme(event.matches ? 'dark' : 'light');
  });

  /* --- scroll spy (runs after the page sections exist) ------------------ */

  const mount = () => {
    if (!('IntersectionObserver' in window)) return;

    const setActive = (id) => {
      header.querySelectorAll('[data-nav-target]').forEach((node) => {
        const active = node.dataset.navTarget === id;
        node.classList.toggle('is-active', active);
        if (node.classList.contains('nav__link')) {
          if (active) node.setAttribute('aria-current', 'true');
          else node.removeAttribute('aria-current');
        }
      });
    };

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        });
        let best = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActive(best);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.15, 0.5, 1] },
    );

    sections.forEach((node) => observer.observe(node));
  };

  return { element: header, mount };
};

return { NAV_ITEMS: NAV_ITEMS, cvControl: cvControl, Navbar: Navbar };
})());

/* ---- components/Hero.js ---- */
__reg("components/Hero.js", (function () {
const { config } = __get("config.js");
const { el, h } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { cvControl } = __get("components/Navbar.js");

const FOCUS_AREAS = [
  { name: 'Manual Testing', iconName: 'cursor' },
  { name: 'API Testing', iconName: 'api' },
  { name: 'Database Testing', iconName: 'database' },
  { name: 'Performance Testing', iconName: 'gauge' },
  { name: 'Test Automation', iconName: 'terminal' },
  { name: 'AI-assisted QA', iconName: 'brain' },
];

const LIFECYCLE = [
  'Requirement',
  'Test Design',
  'Execution',
  'Defect Report',
  'Retest',
  'Regression',
];

const Hero = () => {
  const hero = el('section', {
    class: 'hero',
    id: 'home',
    'aria-labelledby': 'hero-title',
  });

  const statusBadge = el('div', { class: 'hero__status' }, [
    el('span', { class: 'status' }, [
      el('span', { class: 'status__dot', 'aria-hidden': 'true' }),
      el('span', { text: config.status }),
    ]),
  ]);

  const meta = [
    { label: 'Current role', value: `${config.currentRole.role} · ${config.currentRole.company}` },
    { label: 'Education', value: config.education },
    { label: 'Experience', value: config.experienceSummary },
    { label: 'Location', value: config.location },
  ];

  const intro = el('p', {
    class: 'hero__intro',
    text:
      'Computer Engineer and Software Quality Assurance Engineer focused on building reliable software through systematic testing, API validation, database verification, performance testing, automation, and AI-assisted QA.',
  });

  const panel = h('div', 'hero__panel', [
    h('div', 'panel', [
      h('p', 'panel__head', [icon('target'), el('span', { text: 'What I test' })]),
      h('div', 'focus-grid', FOCUS_AREAS.map((area) =>
        el('div', { class: 'focus' }, [icon(area.iconName), el('span', { text: area.name })]),
      )),
    ]),
    h('div', 'panel', [
      h('p', 'panel__head', [icon('flow'), el('span', { text: 'How I work' })]),
      h('div', 'lifecycle', LIFECYCLE.flatMap((step, index) => {
        const nodes = [el('span', { class: 'lifecycle__step', text: step })];
        if (index < LIFECYCLE.length - 1) nodes.push(el('span', { class: 'lifecycle__sep', 'aria-hidden': 'true', text: '→' }));
        return nodes;
      })),
    ]),
  ]);

  const grid = h('div', 'container hero__grid', [
    h('div', 'hero__content', [
      h('p', 'hero__eyebrow', [icon('shield'), el('span', { text: 'Software Quality Assurance' })]),
      statusBadge,
      el('h1', { class: 'hero__title', id: 'hero-title' }, [
        el('span', { text: config.name }),
      ]),
      el('p', { class: 'hero__role', text: config.title }),
      el('p', { class: 'hero__tagline', text: config.tagline }),
      intro,
      h('div', 'btn-row hero__cta', [
        el('a', { class: 'btn btn--primary', href: '#projects' }, [
          el('span', { text: 'View My Work' }),
          icon('arrowRight'),
        ]),
        cvControl(),
      ]),
      h('div', 'hero__meta', meta.map((item) =>
        h('div', 'hero__meta-item', [
          el('span', { class: 'hero__meta-label', text: item.label }),
          el('span', { class: 'hero__meta-value', text: item.value }),
        ]),
      )),
    ]),
    panel,
  ]);

  hero.appendChild(grid);

  return { element: hero };
};

return { Hero: Hero };
})());

/* ---- components/About.js ---- */
__reg("components/About.js", (function () {
const { config } = __get("config.js");
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");

const PARAGRAPHS = [
  'I am a Computer Engineer working as a Software Quality Assurance Engineer at NeuroOcean AI. My work focuses on understanding requirements, designing meaningful test scenarios, executing functional and regression testing, investigating defects, and validating software across different layers.',
  'My testing approach goes beyond checking whether a feature works. I look for negative scenarios, boundary conditions, data consistency issues, authorization problems, API behavior, performance risks, and real-world user flows.',
  'I am also actively developing my automation and AI-for-QA skills to make testing more efficient, repeatable, and intelligent.',
  'At NeuroOcean AI my work includes testing AI/LLM-powered features and OpenAI API integrations, applying prompt engineering and AI workflows when validating AI-powered functionality, and validating backend data and business rules against PostgreSQL.',
];

const FACTS = [
  { iconName: 'briefcase', label: 'Current role', value: `${config.currentRole.role}, ${config.currentRole.company}` },
  { iconName: 'layers', label: 'Education', value: config.education },
  { iconName: 'clock', label: 'Experience', value: config.experienceSummary },
  { iconName: 'pin', label: 'Location', value: config.location },
  { iconName: 'target', label: 'Focus', value: 'Functional, regression, API, database, performance and security testing' },
];

const About = () => {
  const node = section('about', 'About');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading('02', 'About', 'Approach to quality'),
    h('div', 'about__grid', [
      h('div', 'about__body', PARAGRAPHS.map((paragraph) => el('p', { text: paragraph }))),
      h('div', 'about__aside', FACTS.map((fact) =>
        h('div', 'fact', [
          icon(fact.iconName),
          h('div', '', [
            el('div', { class: 'fact__label', text: fact.label }),
            el('div', { class: 'fact__value', text: fact.value }),
          ]),
        ]),
      )),
    ]),
  );

  // Section heading needs the id referenced by aria-labelledby
  node.querySelector('h2').id = 'about-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { About: About };
})());

/* ---- components/Skills.js ---- */
__reg("components/Skills.js", (function () {
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { skillCategories, skillLevels } = __get("data/skills.js");

const LEVEL_RANK = { core: 4, practiced: 3, working: 2, learning: 1 };

const levelBadge = (level) => {
  const meta = skillLevels[level];
  return el('span', {
    class: `level level--${level}`,
    title: meta.hint,
  }, [
    el('span', {
      class: 'level__dots',
      role: 'img',
      'aria-label': meta.label,
    }, Array.from({ length: 4 }, (_, index) =>
      el('span', {
        class: `level__dot${index < LEVEL_RANK[level] ? ' is-on' : ''}`,
        'aria-hidden': 'true',
      }),
    )),
    el('span', { class: 'level__label', 'aria-hidden': 'true', text: meta.short }),
  ]);
};

const skillRow = (skill) =>
  h('li', 'skill-row', [
    el('span', { class: 'skill-row__name', text: skill.name }),
    levelBadge(skill.level),
  ]);

const Skills = () => {
  const node = section('skills', 'Skills');
  node.classList.add('section--alt');

  const tabs = skillCategories.map((category, index) =>
    el('button', {
      type: 'button',
      role: 'tab',
      class: 'tab',
      id: `skill-tab-${category.id}`,
      'aria-controls': 'skill-panel',
      'aria-selected': index === 0 ? 'true' : 'false',
      tabindex: index === 0 ? '0' : '-1',
    }, [
      icon(category.icon),
      el('span', { text: category.name }),
      el('span', { class: 'tab__count', text: String(category.skills.length) }),
    ]),
  );

  const tablist = el('div', {
    class: 'tabs tabs--column',
    role: 'tablist',
    'aria-label': 'QA skill categories',
    'aria-orientation': 'vertical',
  }, tabs);

  const panelName = el('h3', { class: 'skills__panel-name' });
  const panelSummary = el('p', { class: 'skills__panel-summary' });
  const panelList = el('ul', { class: 'skill-grid' });

  const panel = h('div', 'skills__panel', [
    h('div', 'skills__panel-head', [panelName, panelSummary]),
    panelList,
  ]);
  panel.id = 'skill-panel';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');

  const render = (index) => {
    const category = skillCategories[index];
    panelName.textContent = category.name;
    panelSummary.textContent = category.summary;
    panelList.replaceChildren(...category.skills.map(skillRow));
    panel.setAttribute('aria-labelledby', `skill-tab-${category.id}`);
    panel.dataset.category = category.id;

    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      render(index);
      tab.focus();
    });
  });

  tablist.addEventListener('keydown', (event) => {
    const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    let next = current;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight')
      next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft')
      next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;

    render(next);
    tabs[next].focus();
  });

  const legend = h('div', 'legend', Object.entries(skillLevels).map(([key, meta]) =>
    h('span', 'legend__item', [levelBadge(key), el('span', { text: meta.hint })]),
  ));

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '03',
      'QA Skills',
      'What I test, and how confidently',
      'Grouped by testing discipline. Levels are descriptive rather than numeric — there are no invented percentages here.',
    ),
    h('div', 'skills__layout', [tablist, panel]),
    legend,
  );

  node.querySelector('h2').id = 'skills-title';
  node.setAttribute('data-reveal', '');
  render(0);

  return { element: node };
};

return { Skills: Skills };
})());

/* ---- components/Tools.js ---- */
__reg("components/Tools.js", (function () {
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { tools } = __get("data/tools.js");

const STATUS_LABEL = { used: 'Worked with', learning: 'Learning' };

const toolCard = (tool) =>
  h('li', 'tool', [
    el('span', { class: 'tool__icon' }, [icon(tool.icon)]),
    h('div', 'tool__body', [
      h('div', 'tool__top', [
        el('span', { class: 'tool__name', text: tool.name }),
        el('span', { class: `tag tag--${tool.status}`, text: STATUS_LABEL[tool.status] }),
      ]),
      el('p', { class: 'tool__note', text: tool.note }),
    ]),
  ]);

const Tools = () => {
  const node = section('tools', 'Tools');

  const searchInput = el('input', {
    class: 'search__input',
    type: 'search',
    id: 'tool-search',
    placeholder: 'Filter tools…',
    'aria-label': 'Filter tools by name',
    autocomplete: 'off',
  });

  const search = h('div', 'search', [icon('search'), searchInput]);

  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'used', label: 'Worked with' },
    { key: 'learning', label: 'Learning' },
  ].map((filter, index) =>
    el('button', {
      type: 'button',
      class: 'filter',
      'aria-pressed': index === 0 ? 'true' : 'false',
      dataset: { filter: filter.key },
      text: filter.label,
    }),
  );

  const filters = el('div', { class: 'filters', role: 'group', 'aria-label': 'Filter tools by status' }, filterButtons);

  const list = el('ul', { class: 'tool-grid', 'aria-live': 'polite' });
  const empty = el('p', { class: 'empty', text: 'No tools match that filter.', hidden: true });
  const count = el('span', { class: 'eyebrow' });

  let activeFilter = 'all';

  const render = () => {
    const query = searchInput.value.trim().toLowerCase();
    const visible = tools.filter((tool) => {
      const matchesFilter = activeFilter === 'all' || tool.status === activeFilter;
      const matchesQuery =
        !query || tool.name.toLowerCase().includes(query) || tool.note.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });

    list.replaceChildren(...visible.map(toolCard));
    empty.hidden = visible.length > 0;
    count.textContent = `${visible.length} of ${tools.length} tools shown`;
  };

  searchInput.addEventListener('input', render);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((other) =>
        other.setAttribute('aria-pressed', String(other === button)),
      );
      render();
    });
  });

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '04',
      'Tools',
      'Tools I work with',
      'The QA toolset behind the testing — labelled honestly as either something I have worked with or something I am currently learning.',
    ),
    h('div', 'tools__bar', [search, filters, count]),
    list,
    empty,
  );

  node.querySelector('h2').id = 'tools-title';
  node.setAttribute('data-reveal', '');
  render();

  return { element: node };
};

return { Tools: Tools };
})());

/* ---- components/Projects.js ---- */
__reg("components/Projects.js", (function () {
const { config } = __get("config.js");
const { el, h, placeholder, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { projects } = __get("data/projects.js");

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                       */
/* -------------------------------------------------------------------------- */

const flowDiagram = (flow) =>
  h('div', 'block', [
    h('p', 'block__title', [icon('flow'), el('span', { text: flow.title })]),
    h('div', 'flow', flow.steps.flatMap((step, index) => {
      const nodes = [
        h('span', 'flow__step', [
          el('span', { class: 'flow__num', text: String(index + 1).padStart(2, '0') }),
          el('span', { text: step }),
        ]),
      ];
      if (index < flow.steps.length - 1)
        nodes.push(el('span', { class: 'flow__arrow', 'aria-hidden': 'true', text: '→' }));
      return nodes;
    })),
  ]);

const bulletBlock = (title, iconName, items, listClass = 'check-list') =>
  h('div', 'block', [
    h('p', 'block__title', [icon(iconName), el('span', { text: title })]),
    h('ul', listClass, items.map((item) => el('li', { text: item }))),
  ]);

const chipBlock = (title, iconName, items) =>
  h('div', 'block', [
    h('p', 'block__title', [icon(iconName), el('span', { text: title })]),
    h('div', 'chip-list', items.map((item) => el('span', { class: 'chip', text: item }))),
  ]);

const accordionBlock = (id, label, content, open = false) => {
  const panelId = `${id}-panel`;
  const triggerId = `${id}-trigger`;

  const panel = el('div', {
    class: 'accordion__panel',
    id: panelId,
    role: 'region',
    'aria-labelledby': triggerId,
    hidden: !open,
  }, [content]);

  const trigger = el('button', {
    type: 'button',
    class: 'accordion__trigger',
    id: triggerId,
    'aria-expanded': open ? 'true' : 'false',
    'aria-controls': panelId,
  }, [
    el('span', { text: label }),
    icon('chevronDown', 'icon accordion__chevron'),
  ]);

  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });

  return h('div', 'accordion', [trigger, panel]);
};

/* -------------------------------------------------------------------------- */
/* Project card                                                                */
/* -------------------------------------------------------------------------- */

const linkOrPlaceholder = (url, label) =>
  url
    ? el('a', { class: 'btn btn--ghost btn--sm', href: url, target: '_blank', rel: 'noreferrer noopener' }, [
        icon('external'),
        el('span', { text: label }),
      ])
    : el('span', { class: 'btn btn--ghost btn--sm', 'aria-disabled': 'true' }, [
        icon('external'),
        placeholder(`[Add ${label} URL]`),
      ]);

const projectCard = (project) => {
  const links = config.projectLinks[project.id] || { github: '', demo: '' };

  const toolsRow = project.tools.length
    ? chipBlock('Tools used', 'terminal', project.tools)
    : h('div', 'block', [
        h('p', 'block__title', [icon('terminal'), el('span', { text: 'Tools used' })]),
        el('p', { class: 'kv__value' }, [
          el('span', { text: 'Tool list for this project: ' }),
          placeholder('[Add tools]'),
          el('span', { text: ' — set it in assets/js/data/projects.js' }),
        ]),
      ]);

  const body = h('div', 'project__body', [
    ...(project.workflow ? [flowDiagram(project.workflow)] : []),
    ...(project.pipeline ? [flowDiagram(project.pipeline)] : []),
    ...(project.stackNote
      ? [h('div', 'callout callout--neutral', [icon('terminal'), el('span', { text: project.stackNote })])]
      : []),
    h('div', 'project__cols', [
      bulletBlock('My QA responsibilities', 'users', project.responsibilities),
      bulletBlock('Key testing scenarios', 'target', project.keyScenarios),
      bulletBlock('QA challenges', 'bug', project.challenges),
      bulletBlock('What I learned', 'spark', project.learned),
    ]),
    accordionBlock(
      `${project.id}-testing`,
      `Testing performed (${project.testingAreas.length} areas)`,
      chipBlock('Coverage areas', 'layers', project.testingAreas),
    ),
    toolsRow,
  ]);

  const foot = h('div', 'project__foot', [
    el('span', { class: 'eyebrow' }, [
      icon('external'),
      el('span', { text: 'Project links' }),
    ]),
    linkOrPlaceholder(links.github, 'GitHub'),
    linkOrPlaceholder(links.demo, 'Demo'),
  ]);

  return el('article', { class: 'project', 'aria-labelledby': `${project.id}-title` }, [
    h('div', 'project__head', [
      h('div', 'project__top', [
        el('span', { class: 'project__badge' }, [
          icon(project.type.startsWith('QA Automation') ? 'terminal' : 'stethoscope'),
          el('span', { text: project.type }),
        ]),
        el('span', { class: 'project__context', text: project.context }),
      ]),
      el('h3', { class: 'project__name', id: `${project.id}-title`, text: project.name }),
      el('p', { class: 'project__desc', text: project.description }),
    ]),
    body,
    foot,
  ]);
};

/* -------------------------------------------------------------------------- */

const Projects = () => {
  const node = section('projects', 'Projects');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '05',
      'Featured QA Projects',
      'Projects I have tested',
      'Each entry is a QA case study: what the product does, what I tested, what made it hard, and what it taught me.',
    ),
    h('div', 'project-list', projects.map(projectCard)),
    h('div', 'callout callout--neutral', [
      icon('spark'),
      el('span', {
        text: 'Links are shown as placeholders until real URLs are added in assets/js/config.js — nothing here points to a page that does not exist.',
      }),
    ]),
  );

  node.querySelector('h2').id = 'projects-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { Projects: Projects };
})());

/* ---- components/CaseStudy.js ---- */
__reg("components/CaseStudy.js", (function () {
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");

const STAGES = [
  {
    id: 'requirement',
    title: 'Requirement Analysis',
    iconName: 'file',
    lead:
      'Testing starts before a single test is written. If the requirement is unclear, the test will be wrong — so this stage is about understanding the intent.',
    columns: [
      {
        title: 'What I establish first',
        iconName: 'search',
        items: [
          'User story',
          'Acceptance criteria',
          'User roles',
          'Business rules',
          'Dependencies',
        ],
      },
      {
        title: 'Questions I ask before designing tests',
        iconName: 'target',
        items: [
          'Which roles can reach this feature, and which must not?',
          'What state must the data be in for this to work?',
          'What happens when the input is missing, invalid, or unexpected?',
          'What else in the system depends on this behaviour?',
          'How will I know the result is correct, and where do I verify it?',
        ],
      },
    ],
  },
  {
    id: 'design',
    title: 'Test Design',
    iconName: 'flask',
    lead:
      'A feature is not covered by its happy path. Scenarios are designed across behaviour, boundaries, permissions, data and the layers underneath the UI.',
    columns: [
      {
        title: 'Scenario types identified',
        iconName: 'layers',
        items: [
          'Positive scenarios',
          'Negative scenarios',
          'Boundary conditions',
          'Edge cases',
          'Authorization',
          'Data validation',
          'UI behavior',
          'API behavior',
          'Database consistency',
        ],
      },
      {
        title: 'How scenarios are chosen',
        iconName: 'brain',
        items: [
          'Start from the acceptance criteria, then deliberately move away from them',
          'Take each input to its minimum, maximum and just-outside values',
          'Repeat the action as a user who should not have access',
          'Interrupt the flow: cancel, go back, refresh, retry, submit twice',
          'Check the same data in the UI, the API response and the database',
        ],
      },
    ],
  },
  {
    id: 'execution',
    title: 'Test Execution',
    iconName: 'cursor',
    lead:
      'Execution is where the design is validated against the real build, across the layers that carry the behaviour.',
    columns: [
      {
        title: 'Testing performed',
        iconName: 'check',
        items: [
          'Functional testing',
          'Integration testing',
          'Regression testing',
          'Cross-browser testing',
          'API validation',
          'Database validation',
        ],
      },
      {
        title: 'Discipline during execution',
        iconName: 'clock',
        items: [
          'Run the positive path first to confirm the feature can work at all',
          'Keep a note of anything unexpected, even if it is not a defect',
          'Re-run a failure once before reporting, to confirm it is repeatable',
          'Record environment details while they are still in front of me',
          'Check the related flows, not only the flow under test',
        ],
      },
    ],
  },
  {
    id: 'defect',
    title: 'Defect Reporting',
    iconName: 'bug',
    lead:
      'A defect report is a working document for a developer. It has to be reproducible, specific and classified so it can be acted on quickly.',
    columns: [
      {
        title: 'Every bug report contains',
        iconName: 'file',
        items: [
          'Clear title',
          'Preconditions',
          'Steps to reproduce',
          'Expected result',
          'Actual result',
          'Environment',
          'Severity / priority',
          'Screenshot or video',
          'FE / BE classification',
        ],
      },
      {
        title: 'Classification and follow-up',
        iconName: 'flow',
        items: [
          'Front end or back end, based on what the response and database show',
          'Severity from user impact, priority from release context',
          'Evidence attached so the developer sees exactly what I saw',
          'Related scenarios noted where the same cause may appear elsewhere',
        ],
      },
    ],
  },
  {
    id: 'verify',
    title: 'Verification',
    iconName: 'refresh',
    lead:
      'A fix is not closed because a developer said it is fixed. It is closed after the reported case is retested and the surrounding behaviour is checked.',
    columns: [
      {
        title: 'Verification path',
        iconName: 'flow',
        items: [
          'Bug Fix',
          'Retest',
          'Regression',
          'Verify Related Features',
          'Close',
        ],
      },
      {
        title: 'Before closing',
        iconName: 'shield',
        items: [
          'Repeat the exact reported steps on the fixed build',
          'Check the same behaviour for other roles and entry points',
          'Run a targeted regression pass over the affected area',
          'Attach verification evidence to the defect record',
        ],
      },
    ],
  },
];

const column = (col) =>
  h('div', 'block', [
    h('p', 'block__title', [icon(col.iconName), el('span', { text: col.title })]),
    h('ul', col.items.length > 6 ? 'check-list' : 'numbered', col.items.map((item) => el('li', { text: item }))),
  ]);

const CaseStudy = () => {
  const node = section('approach', 'QA Approach');

  const tabs = STAGES.map((stage, index) =>
    el('button', {
      type: 'button',
      role: 'tab',
      class: 'step-tab',
      id: `stage-tab-${stage.id}`,
      'aria-controls': 'stage-panel',
      'aria-selected': index === 0 ? 'true' : 'false',
      tabindex: index === 0 ? '0' : '-1',
    }, [
      el('span', { class: 'step-tab__num', text: String(index + 1) }),
      el('span', { text: stage.title }),
    ]),
  );

  const tablist = el('div', {
    class: 'step-tabs',
    role: 'tablist',
    'aria-label': 'How I test a feature — stages',
  }, tabs);

  const title = el('h3', { class: 'step-panel__title' });
  const lead = el('p', { class: 'step-panel__lead' });
  const cols = el('div', { class: 'step-cols' });

  const panel = h('div', 'step-panel', [
    h('div', 'step-panel__head', [title, lead]),
    cols,
  ]);
  panel.id = 'stage-panel';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');

  const render = (index) => {
    const stage = STAGES[index];
    title.replaceChildren(icon(stage.iconName), el('span', { text: stage.title }));
    lead.textContent = stage.lead;
    cols.replaceChildren(...stage.columns.map(column));
    panel.setAttribute('aria-labelledby', `stage-tab-${stage.id}`);

    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      render(index);
      tab.focus();
    });
  });

  tablist.addEventListener('keydown', (event) => {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    let next = current;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;

    render(next);
    tabs[next].focus();
  });

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '06',
      'QA Case Study',
      'How I Test a Feature',
      'The method behind the work: from reading a requirement to closing a verified defect.',
    ),
    h('div', 'approach', [tablist, panel]),
  );

  node.querySelector('h2').id = 'approach-title';
  node.setAttribute('data-reveal', '');
  render(0);

  return { element: node };
};

return { CaseStudy: CaseStudy };
})());

/* ---- components/TestCase.js ---- */
__reg("components/TestCase.js", (function () {
const { el, h, section, sectionHeading, copyText, toast } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { testCase } = __get("data/content.js");

const metaRow = (label, value) =>
  h('div', 'kv__row', [
    el('span', { class: 'kv__label', text: label }),
    el('span', { class: 'kv__value', text: value }),
  ]);

const baseCaseAsText = () =>
  [
    `Feature: ${testCase.feature}`,
    `Test Case ID: ${testCase.id}`,
    `Test Type: ${testCase.type}`,
    `Title: ${testCase.title}`,
    `Precondition: ${testCase.precondition}`,
    '',
    'Steps:',
    ...testCase.steps.map((step, index) => `${index + 1}. ${step}`),
    '',
    `Expected Result: ${testCase.expected}`,
  ].join('\n');

const scenarioAsText = (scenario) =>
  [
    `Feature: ${testCase.feature}`,
    `Scenario ID: ${scenario.id}`,
    `Scenario: ${scenario.name}`,
    `Type: ${scenario.type}`,
    `Verified across: ${scenario.layer}`,
    '',
    `What it checks: ${scenario.checks}`,
  ].join('\n');

const TestCase = () => {
  const node = section('testcase', 'Test Case Example');
  node.classList.add('section--alt');

  /* --- document panel -------------------------------------------------- */

  const docTitle = el('h4', { class: 'tc-doc__title' });
  const docBody = el('div', { class: 'tc-doc__sections' });
  const docHead = h('div', 'tc-doc__head', [
    el('span', { class: 'tc-doc__id', text: testCase.id }),
    el('span', { class: 'chip chip--accent', text: testCase.type }),
    el('span', { class: 'eyebrow', text: testCase.feature }),
  ]);

  const copyBtn = el('button', { type: 'button', class: 'btn btn--quiet btn--sm' }, [
    icon('copy'),
    el('span', { text: 'Copy' }),
  ]);

  const doc = h('div', 'tc-doc', [docHead, docTitle, docBody]);

  let currentText = baseCaseAsText();

  copyBtn.addEventListener('click', async () => {
    const ok = await copyText(currentText);
    toast(ok ? 'Test case copied to clipboard' : 'Copy blocked by the browser — select the text manually', ok ? 'info' : 'error');
  });

  docHead.appendChild(copyBtn);

  /* --- scenario selector ----------------------------------------------- */

  const detail = h('div', 'scenario-detail', []);

  let baseButton = null;

  const scenarioButtons = testCase.scenarios.map((scenario) =>
    el('button', {
      type: 'button',
      class: 'scenario',
      'aria-current': 'false',
      dataset: { scenario: scenario.id },
    }, [
      el('span', { class: 'scenario__id', text: scenario.id }),
      el('span', { text: scenario.name }),
      icon('chevron', 'icon scenario__chevron'),
    ]),
  );

  const scenarioList = el('div', {
    class: 'scenario-list',
    role: 'group',
    'aria-label': 'Additional test scenarios for this feature',
  }, scenarioButtons);

  const clearSelection = () => {
    scenarioButtons.forEach((button) => button.setAttribute('aria-current', 'false'));
    if (baseButton) baseButton.setAttribute('aria-current', 'false');
  };

  /* --- views ----------------------------------------------------------- */

  const showBase = () => {
    clearSelection();
    if (baseButton) baseButton.setAttribute('aria-current', 'true');

    docTitle.textContent = testCase.title;
    docBody.replaceChildren(
      h('div', 'kv', [
        metaRow('Test Case ID', testCase.id),
        metaRow('Test Type', testCase.type),
        metaRow('Feature', testCase.feature),
        metaRow('Precondition', testCase.precondition),
      ]),
      h('div', 'block', [
        h('p', 'block__title', [icon('cursor'), el('span', { text: 'Steps' })]),
        h('ol', 'numbered', testCase.steps.map((step) => el('li', { text: step }))),
      ]),
      h('div', 'block', [
        h('p', 'block__title', [icon('check'), el('span', { text: 'Expected Result' })]),
        el('p', { class: 'kv__value', text: testCase.expected }),
      ]),
      h('div', 'callout callout--neutral', [
        icon('layers'),
        el('span', {
          text: 'The same check is repeated below the UI: the API response reflects the new values, and the stored record matches what the screen shows.',
        }),
      ]),
    );
    currentText = baseCaseAsText();

    detail.replaceChildren(
      h('p', 'block__title', [icon('target'), el('span', { text: 'Base case selected' })]),
      el('p', {
        class: 'kv__value',
        text: 'This is the positive path. Select any scenario on the left to see what it verifies and where the behaviour is checked.',
      }),
    );
  };

  const showScenario = (scenario) => {
    clearSelection();
    scenarioButtons.forEach((button) =>
      button.setAttribute('aria-current', String(button.dataset.scenario === scenario.id)),
    );

    docTitle.textContent = scenario.name;
    docBody.replaceChildren(
      h('div', 'kv', [
        metaRow('Scenario ID', scenario.id),
        metaRow('Type', scenario.type),
        metaRow('Verified across', scenario.layer),
        metaRow('Related test case', `${testCase.id} — ${testCase.feature}`),
      ]),
      h('div', 'block', [
        h('p', 'block__title', [icon('search'), el('span', { text: 'What it checks' })]),
        el('p', { class: 'kv__value', text: scenario.checks }),
      ]),
    );
    currentText = scenarioAsText(scenario);

    detail.replaceChildren(
      h('p', 'block__title', [icon('bug'), el('span', { text: 'Why this scenario exists' })]),
      el('p', {
        class: 'kv__value',
        text: 'Positive cases prove a feature works. These cases are the ones that find where it breaks — invalid input, missing permission, competing updates and inconsistent data.',
      }),
    );
  };

  scenarioButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const scenario = testCase.scenarios.find((item) => item.id === button.dataset.scenario);
      if (scenario) showScenario(scenario);
    });
  });

  /* --- layout ---------------------------------------------------------- */

  baseButton = el('button', {
    type: 'button',
    class: 'scenario',
    'aria-current': 'true',
    dataset: { scenario: 'base' },
    onclick: () => showBase(),
  }, [
    el('span', { class: 'scenario__id', text: testCase.id }),
    el('span', { text: 'Positive path' }),
    icon('chevron', 'icon scenario__chevron'),
  ]);

  const left = h('div', '', [
    h('div', 'panel', [
      h('p', 'panel__head', [icon('file'), el('span', { text: 'Base test case' })]),
      h('div', 'scenario-list', [baseButton]),
      h('p', 'panel__head', [icon('target'), el('span', { text: 'Additional scenarios' })]),
      scenarioList,
    ]),
  ]);

  const right = h('div', 'tc__main', [doc, detail]);

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '07',
      'Test Case Example',
      'A test case, written the way I write them',
      'One feature, one base case, and the scenarios that surround it. Select any scenario to see what it verifies.',
    ),
    h('div', 'tc', [h('div', 'tc__layout', [left, right])]),
  );

  node.querySelector('h2').id = 'testcase-title';
  node.setAttribute('data-reveal', '');
  showBase();

  return { element: node };
};

return { TestCase: TestCase };
})());

/* ---- components/BugInvestigation.js ---- */
__reg("components/BugInvestigation.js", (function () {
const { el, h, placeholder, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { bugInvestigation } = __get("data/content.js");

const stageBody = (stage) => {
  const nodes = [];

  if (stage.body) nodes.push(el('p', { class: 'kv__value', text: stage.body }));

  if (stage.points) {
    nodes.push(
      h('ul', 'numbered', stage.points.map((point) =>
        point.startsWith('[Add')
          ? el('li', {}, [placeholder(point)])
          : el('li', { text: point }),
      )),
    );
  }

  if (stage.note) nodes.push(el('p', { class: 'bug__note', text: stage.note }));

  return nodes;
};

const BugInvestigation = () => {
  const node = section('bug', 'Bug Investigation');

  const stages = bugInvestigation.stages.map((stage, index) => {
    const triggerId = `bug-stage-${stage.id}-trigger`;
    const panelId = `bug-stage-${stage.id}-panel`;
    const open = index === 0;

    const panel = el('div', {
      class: 'bug__stage-panel',
      id: panelId,
      role: 'region',
      'aria-labelledby': triggerId,
      hidden: !open,
    }, stageBody(stage));

    const trigger = el('button', {
      type: 'button',
      class: 'bug__stage-trigger',
      id: triggerId,
      'aria-expanded': String(open),
      'aria-controls': panelId,
    }, [
      el('span', { class: 'bug__stage-num', text: String(index + 1).padStart(2, '0') }),
      el('span', { text: stage.title }),
      icon('chevronDown', 'icon accordion__chevron'),
    ]);

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
    });

    return h('div', 'accordion', [trigger, panel]);
  });

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '08',
      'Bug Investigation',
      'How I investigate a defect',
      'A defect report is only useful if it is reproducible and evidenced. This is the path an issue takes from “something looks wrong” to a verified fix.',
    ),
    h('div', 'bug', [
      h('div', 'bug__issue', [
        el('span', { class: 'bug__issue-label', text: 'Reported issue' }),
        el('span', { class: 'bug__issue-text', text: bugInvestigation.issue }),
      ]),
      h('div', 'bug__stages', stages),
      h('div', 'callout', [
        icon('search'),
        el('span', {
          text: 'QA investigates behaviour and provides reproducible evidence — it does not file “it doesn’t work”, and it does not guess at a root cause that only development can confirm.',
        }),
      ]),
    ]),
  );

  node.querySelector('h2').id = 'bug-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { BugInvestigation: BugInvestigation };
})());

/* ---- components/Experience.js ---- */
__reg("components/Experience.js", (function () {
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");

/* Both roles as stated on the CV. */
const ROLES = [
  {
    company: 'NeuroOcean AI',
    role: 'Software Quality Assurance Engineer',
    period: 'Jan 2026 – Present',
    current: true,
    summary:
      'Designing, maintaining and executing test cases based on requirements, acceptance criteria and business workflows, in close collaboration with development and product teams.',
    responsibilities: [
      'Design, maintain and execute test cases from requirements and acceptance criteria',
      'Functional, regression, smoke, sanity, exploratory, UI/UX, API, database, security, load and end-to-end testing',
      'Analyse requirements to identify functional, integration, usability and data-quality risks',
      'Test REST APIs with Postman and Swagger — requests, responses, authentication, error handling, business logic',
      'Validate backend data and business rules using PostgreSQL and pgAdmin 4',
      'Load and performance testing with Apache JMeter under concurrent-user scenarios',
      'Test automation with Katalon Studio and Selenium IDE for functional and regression scenarios',
      'Test AI-powered features and LLM-based applications, including OpenAI API integrations',
      'Apply prompt engineering and AI workflows when validating AI-powered functionality',
      'Report, track, reproduce and retest defects with clear steps, expected/actual results and evidence',
      'Validate role-based access, frontend/backend integration and data consistency',
      'Collaborate with developers and product teams to investigate defects and clarify requirements',
    ],
  },
  {
    company: 'NeuroOcean AI',
    role: 'ML & AI Intern',
    period: 'Oct 2025 – Dec 2025',
    current: false,
    summary: 'Worked on real-world AI automation, backend APIs, and LLM-powered systems.',
    responsibilities: [
      'Contributed to production projects involving OpenAI APIs, FastAPI, PostgreSQL and workflow automation',
      'Performed API testing, backend debugging, database validation and system reliability checks',
      'Collaborated with development teams to improve product performance and user experience',
    ],
  },
];

const roleCard = (role) =>
  h('div', 'exp__card', [
    h('div', 'exp__head', [
      el('span', { class: 'exp__company', text: role.company }),
      el('span', { class: 'exp__period' }, [
        icon('calendar'),
        el('span', { text: role.period }),
      ]),
      role.current ? el('span', { class: 'chip chip--ok', text: 'Current role' }) : null,
    ]),
    el('p', { class: 'exp__role', text: role.role }),
    el('p', { class: 'kv__value', text: role.summary }),
    role.responsibilities.length
      ? h('ul', 'exp__list check-list', role.responsibilities.map((item) => el('li', { text: item })))
      : null,
  ]);

const Experience = () => {
  const node = section('experience', 'Experience');
  node.classList.add('section--alt');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '09',
      'Experience',
      'Where I have worked',
      'Professional experience to date, described as stated on my CV.',
    ),
    h('div', 'timeline', ROLES.map((role) => h('div', 'timeline__item', [roleCard(role)]))),
  );

  node.querySelector('h2').id = 'experience-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { Experience: Experience };
})());

/* ---- components/Philosophy.js ---- */
__reg("components/Philosophy.js", (function () {
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");

const QUOTE =
  'Good QA is not only about finding bugs. It is about understanding how a system should behave, identifying where it can fail, validating assumptions, and providing developers with clear evidence that helps them fix problems efficiently.';

const PRINCIPLES = [
  {
    iconName: 'users',
    title: 'Think Like the User',
    text: 'Test real-world workflows and unexpected behavior.',
  },
  {
    iconName: 'layers',
    title: 'Think Like the System',
    text: 'Validate APIs, databases, permissions, state transitions, and data consistency.',
  },
  {
    iconName: 'shield',
    title: 'Think Like an Attacker',
    text: 'Consider invalid input, unauthorized access, unexpected states, and security weaknesses.',
  },
];

const Philosophy = () => {
  const node = section('philosophy', 'QA Philosophy');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading('10', 'QA Philosophy', 'My QA Philosophy'),
    el('blockquote', { class: 'philosophy__quote', text: QUOTE }),
    h('div', 'principles', PRINCIPLES.map((principle) =>
      h('div', 'principle', [
        el('span', { class: 'principle__icon' }, [icon(principle.iconName)]),
        el('h3', { text: principle.title }),
        el('p', { class: 'principle__text', text: principle.text }),
      ]),
    )),
  );

  node.querySelector('h2').id = 'philosophy-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { Philosophy: Philosophy };
})());

/* ---- components/AIForQA.js ---- */
__reg("components/AIForQA.js", (function () {
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");

const USES = [
  { iconName: 'file', name: 'Requirement analysis', desc: 'Breaking a requirement into testable statements and open questions.' },
  { iconName: 'flask', name: 'Test scenario generation', desc: 'Drafting a first set of scenarios faster, then reviewing every one.' },
  { iconName: 'target', name: 'Edge-case discovery', desc: 'Prompting for boundary and negative cases I may not have listed.' },
  { iconName: 'search', name: 'Test-case review', desc: 'Checking my own cases for gaps, ambiguity and missing preconditions.' },
  { iconName: 'bug', name: 'Bug analysis', desc: 'Structuring an observation and comparing it against similar behaviour.' },
  { iconName: 'database', name: 'Test-data generation', desc: 'Producing varied, valid and invalid data sets for a scenario.' },
  { iconName: 'terminal', name: 'Automation assistance', desc: 'Scaffolding scripts and locators, then verifying them by running them.' },
  { iconName: 'api', name: 'API test generation', desc: 'Drafting request cases from a documented endpoint contract.' },
  { iconName: 'layers', name: 'Documentation', desc: 'Turning test notes into readable, reusable documentation.' },
  { iconName: 'brain', name: 'LLM / model evaluation', desc: 'Testing model output for correctness, consistency and failure behaviour.' },
];

const AIForQA = () => {
  const node = section('ai', 'AI + QA');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '11',
      'AI + Software Quality Assurance',
      'AI + Software Quality Assurance',
      'I am exploring practical ways to use AI inside the QA workflow — as an assistant that speeds up analysis and drafting, not as a replacement for testing judgement.',
    ),
    h('div', 'ai__grid', [
      h('div', 'ai-statement', [
        el('p', { class: 'ai-statement__text', text: 'AI assists the QA engineer; the QA engineer validates the result.' }),
        el('p', {
          class: 'ai-statement__sub',
          text: 'Anything AI produces is treated as a draft: it is reviewed against the requirement, executed against the build, and verified in the data before it counts as tested. AI does not replace QA engineers.',
        }),
      ]),
      h('ul', 'ai-uses', USES.map((use) =>
        h('li', 'ai-use', [
          icon(use.iconName),
          h('div', '', [
            el('p', { class: 'ai-use__name', text: use.name }),
            el('p', { class: 'ai-use__desc', text: use.desc }),
          ]),
        ]),
      )),
    ]),
  );

  node.querySelector('h2').id = 'ai-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { AIForQA: AIForQA };
})());

/* ---- components/Growth.js ---- */
__reg("components/Growth.js", (function () {
const { el, h, section, sectionHeading } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");

/* Direction of growth — not current titles or claimed seniority. */
const DIRECTIONS = [
  { iconName: 'terminal', label: 'Advanced Test Automation' },
  { iconName: 'cursor', label: 'Playwright + Python' },
  { iconName: 'api', label: 'API Automation' },
  { iconName: 'refresh', label: 'CI/CD Testing' },
  { iconName: 'brain', label: 'AI-powered QA' },
  { iconName: 'layers', label: 'QA Architecture' },
  { iconName: 'target', label: 'Senior SQA Engineering' },
];

const Growth = () => {
  const node = section('growth', 'Currently growing toward');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '12',
      'Career Direction',
      'Currently Growing Toward',
      'Where I am deliberately building depth next.',
    ),
    h('ul', 'growth', DIRECTIONS.map((direction) =>
      h('li', 'growth__item', [icon(direction.iconName), el('span', { text: direction.label })]),
    )),
  );

  node.querySelector('h2').id = 'growth-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { Growth: Growth };
})());

/* ---- components/Contact.js ---- */
__reg("components/Contact.js", (function () {
const { config } = __get("config.js");
const { el, h, placeholder, section, sectionHeading, copyText, toast } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { cvControl } = __get("components/Navbar.js");

const CHANNELS = [
  {
    key: 'email',
    label: 'Email',
    iconName: 'mail',
    placeholderLabel: '[Add Email]',
    // Opens a compose window in the browser (Gmail) so it works even on
    // machines with no default mail app. The copy button stays as backup.
    href: (value) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${value}&su=${encodeURIComponent(config.emailSubject)}`,
    linkLabel: (value) => value,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    iconName: 'linkedin',
    placeholderLabel: '[Add LinkedIn URL]',
    href: (value) => value,
    linkLabel: () => 'Open LinkedIn profile',
  },
  {
    key: 'github',
    label: 'GitHub',
    iconName: 'github',
    placeholderLabel: '[Add GitHub URL]',
    href: (value) => value,
    linkLabel: () => 'Open GitHub profile',
  },
  {
    key: 'phone',
    label: 'Phone',
    iconName: 'phone',
    placeholderLabel: '[Add Phone]',
    href: (value) => `tel:+92${value.slice(1)}`,
    linkLabel: (value) => value,
  },
];

const locationCard = () =>
  h('div', 'contact-card', [
    h('div', 'contact-card__icon', [icon('pin')]),
    h('div', '', [
      el('p', { class: 'contact-card__label', text: 'Location' }),
      el('p', { class: 'contact-card__value', text: config.location }),
    ]),
  ]);

const channelCard = (channel) => {
  const value = config[channel.key];
  const configured = Boolean(value);

  const head = h('div', 'contact-card__icon', [icon(channel.iconName)]);
  const body = h('div', '', [
    el('p', { class: 'contact-card__label', text: channel.label }),
    configured
      ? el('p', { class: 'contact-card__value', text: channel.linkLabel(value) })
      : el('p', { class: 'contact-card__value' }, [placeholder(channel.placeholderLabel)]),
  ]);

  const actions = h('div', 'contact-card__actions');

  if (configured && (channel.key === 'email' || channel.key === 'phone')) {
    const label = channel.key === 'email' ? 'email address' : 'phone number';
    actions.appendChild(
      el('button', {
        type: 'button',
        class: 'btn btn--quiet btn--icon',
        'aria-label': `Copy ${label}`,
        title: `Copy ${label}`,
        onclick: async (event) => {
          event.preventDefault();
          const ok = await copyText(value);
          toast(ok ? `${label === 'email address' ? 'Email' : 'Phone'} copied to clipboard` : 'Copy blocked by the browser', ok ? 'info' : 'error');
        },
      }, [icon('copy')]),
    );
  }

  if (configured && channel.key !== 'email') {
    actions.appendChild(el('span', { class: 'icon-wrap' }, [icon('external')]));
  }

  const children = [head, body, actions];

  const card = configured
    ? el('a', {
        class: 'contact-card',
        href: channel.href(value),
        ...(channel.key === 'phone' ? {} : { target: '_blank', rel: 'noreferrer noopener' }),
        'aria-label': `${channel.label}: ${channel.linkLabel(value)}`,
      }, children)
    : el('div', { class: 'contact-card' }, children);

  return card;
};

const Contact = () => {
  const node = section('contact', 'Contact');
  node.classList.add('section--alt');

  const cvValue = config.cvUrl;

  const cvCard = cvValue
    ? el('a', { class: 'contact-card', href: cvValue, download: config.cvFileName }, [
        h('div', 'contact-card__icon', [icon('file')]),
        h('div', '', [
          el('p', { class: 'contact-card__label', text: 'CV' }),
          el('p', { class: 'contact-card__value', text: 'Download CV (PDF)' }),
        ]),
        h('div', 'contact-card__actions', [icon('download')]),
      ])
    : h('div', 'contact-card', [
        h('div', 'contact-card__icon', [icon('file')]),
        h('div', '', [
          el('p', { class: 'contact-card__label', text: 'CV' }),
          el('p', { class: 'contact-card__value' }, [placeholder('[Add CV PDF]')]),
        ]),
        h('div', 'contact-card__actions', [cvControl({ label: 'CV', variant: 'ghost', extraClass: 'btn--sm' })]),
      ]);

  const anyMissing = !cvValue;

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '13',
      'Contact',
      'Get in touch',
      'Available for Software Quality Assurance Engineering roles and QA collaboration.',
    ),
    h('div', 'contact__grid', [...CHANNELS.map(channelCard), locationCard(), cvCard]),
    h('div', 'btn-row', [
      cvControl(),
      config.linkedin
        ? el('a', { class: 'btn btn--ghost', href: config.linkedin, target: '_blank', rel: 'noreferrer noopener' }, [
            icon('linkedin'),
            el('span', { text: 'LinkedIn' }),
          ])
        : null,
      config.email
        ? el('a', {
            class: 'btn btn--ghost',
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${config.email}&su=${encodeURIComponent(config.emailSubject)}`,
            target: '_blank',
            rel: 'noreferrer noopener',
          }, [
            icon('mail'),
            el('span', { text: 'Email me' }),
          ])
        : null,
    ]),
    anyMissing
      ? h('div', 'contact__note', [
          icon('spark'),
          el('span', {
            text: 'The CV placeholder is intentional: no file is linked until a real PDF exists. Set cvUrl in assets/js/config.js after dropping the PDF into assets/ and every Download CV button will use it.',
          }),
        ])
      : null,
  );

  node.querySelector('h2').id = 'contact-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};

return { Contact: Contact };
})());

/* ---- components/Footer.js ---- */
__reg("components/Footer.js", (function () {
const { config } = __get("config.js");
const { el, h, toast } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { cvControl } = __get("components/Navbar.js");

/**
 * Footer links resolve to the real URLs from config. Where a URL has not been
 * added yet, the entry is rendered as a button that says so — never as a link
 * pointing at a page that does not exist.
 */
const footerLink = ({ label, iconName, href }) => {
  if (href) {
    const isMail = href.startsWith('mailto:');
    return el('a', {
      class: 'footer__link',
      href,
      ...(isMail ? {} : { target: '_blank', rel: 'noreferrer noopener' }),
    }, [icon(iconName), el('span', { text: label })]);
  }

  return el('button', {
    type: 'button',
    class: 'footer__link',
    'aria-label': `${label} — not added yet`,
    onclick: () => toast(`${label} has not been added yet — set it in assets/js/config.js.`, 'error'),
  }, [icon(iconName), el('span', { text: label })]);
};

const Footer = () => {
  const year = new Date().getFullYear();

  const links = el('nav', { class: 'footer__links', 'aria-label': 'Footer' }, [
    footerLink({ label: 'LinkedIn', iconName: 'linkedin', href: config.linkedin }),
    footerLink({ label: 'GitHub', iconName: 'github', href: config.github }),
    footerLink({
      label: 'Email',
      iconName: 'mail',
      href: config.email
        ? `https://mail.google.com/mail/?view=cm&fs=1&to=${config.email}&su=${encodeURIComponent(config.emailSubject)}`
        : '',
    }),
    config.cvUrl
      ? el('a', { class: 'footer__link', href: config.cvUrl, download: config.cvFileName }, [
          icon('file'),
          el('span', { text: 'CV' }),
        ])
      : el('button', {
          type: 'button',
          class: 'footer__link',
          'aria-label': 'CV — not added yet',
          onclick: () => toast('CV has not been added yet — set cvUrl in assets/js/config.js.', 'error'),
        }, [icon('file'), el('span', { text: 'CV' })]),
  ]);

  return {
    element: el('footer', { class: 'footer' }, [
      h('div', 'container', [
        h('div', 'footer__inner', [
          h('div', '', [
            el('p', { class: 'footer__name', text: `${config.name} — ${config.title}` }),
            el('p', { class: 'footer__tag', text: 'Building quality through thoughtful testing.' }),
          ]),
          links,
        ]),
        h('div', 'footer__base', [
          el('span', { text: `© ${year} ${config.name}. All rights reserved.` }),
          el('span', { text: `${config.currentRole.role} · ${config.currentRole.company}` }),
        ]),
      ]),
    ]),
  };
};



return { Footer: Footer, cvControl: cvControl };
})());

/* ---- main.js ---- */
__reg("main.js", (function () {
/**
 * Entry point — composes the page from components.
 * Order of components here is the order of sections on the page.
 */

const { el, initReveal, prefersReducedMotion } = __get("lib/dom.js");
const { icon } = __get("lib/icons.js");
const { Navbar } = __get("components/Navbar.js");
const { Hero } = __get("components/Hero.js");
const { About } = __get("components/About.js");
const { Skills } = __get("components/Skills.js");
const { Tools } = __get("components/Tools.js");
const { Projects } = __get("components/Projects.js");
const { CaseStudy } = __get("components/CaseStudy.js");
const { TestCase } = __get("components/TestCase.js");
const { BugInvestigation } = __get("components/BugInvestigation.js");
const { Experience } = __get("components/Experience.js");
const { Philosophy } = __get("components/Philosophy.js");
const { AIForQA } = __get("components/AIForQA.js");
const { Growth } = __get("components/Growth.js");
const { Contact } = __get("components/Contact.js");
const { Footer } = __get("components/Footer.js");

const COMPONENTS = [
  Hero,
  About,
  Skills,
  Tools,
  Projects,
  CaseStudy,
  TestCase,
  BugInvestigation,
  Experience,
  Philosophy,
  AIForQA,
  Growth,
  Contact,
];

const mount = () => {
  const header = Navbar();
  const skipLink = el('a', { class: 'skip-link', href: '#main', text: 'Skip to main content' });
  const main = el('main', { class: 'main', id: 'main' });

  document.body.prepend(skipLink, header.element);

  const instances = COMPONENTS.map((Component) => Component());
  instances.forEach((instance) => main.appendChild(instance.element));

  document.body.appendChild(main);
  document.body.appendChild(Footer().element);

  /* Components that need the DOM in place (e.g. scroll spy). */
  instances.forEach((instance) => instance.mount?.());
  header.mount?.();

  /* Back to top */
  const toTop = el('button', {
    type: 'button',
    class: 'to-top',
    'aria-label': 'Back to top',
    title: 'Back to top',
  }, [icon('arrowUp')]);

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    document.querySelector('.brand')?.focus({ preventScroll: true });
  });

  const onScroll = () => toTop.classList.toggle('is-visible', window.scrollY > 700);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  document.body.appendChild(toTop);

  /* Keyboard-friendly in-page navigation: move focus to the target section. */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    // Let the browser handle the scroll, then move focus for keyboard users.
    window.setTimeout(() => {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, prefersReducedMotion() ? 0 : 420);
  });

  initReveal(document);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount, { once: true });
} else {
  mount();
}


})());
