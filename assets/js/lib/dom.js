/**
 * Tiny DOM + UI helpers. No dependencies.
 * All text goes through `text()` / textContent so nothing is ever injected as HTML.
 */

export const el = (tag, attrs = {}, children = []) => {
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

export const append = (parent, children) => {
  const list = Array.isArray(children) ? children : [children];
  for (const child of list) {
    if (child === null || child === undefined || child === false) continue;
    parent.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return parent;
};

export const frag = (children = []) => {
  const node = document.createDocumentFragment();
  append(node, children);
  return node;
};

/** Shorthand: h(2, 'class', [children]) */
export const h = (tag, className, children = []) => el(tag, { class: className }, children);

export const text = (value) => document.createTextNode(String(value));

export const on = (node, event, handler, options) => {
  node.addEventListener(event, handler, options);
  return node;
};

export const prefersReducedMotion = () =>
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

export const toast = (message, variant = 'info') => {
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

export const copyText = async (value) => {
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

export const initReveal = (scope = document) => {
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
export const placeholder = (label) =>
  el('span', {
    class: 'placeholder',
    dataset: { placeholder: label },
    title: `Placeholder — set this value in assets/js/config.js`,
    text: label,
  });

/** Returns the real value if configured, otherwise a visible placeholder node. */
export const valueOrPlaceholder = (value, label) =>
  value ? el('span', { class: 'value', text: value }) : placeholder(label);

export const sectionHeading = (index, kicker, title, intro = '') =>
  h('header', 'section__head', [
    el('p', { class: 'section__index', text: index }),
    el('p', { class: 'section__kicker', text: kicker }),
    el('h2', { class: 'section__title', text: title }),
    intro ? el('p', { class: 'section__intro', text: intro }) : null,
  ]);

export const chip = (label, variant = 'default') =>
  el('span', { class: `chip chip--${variant}`, text: label });

export const section = (id, label, children = []) => {
  const node = el('section', { class: 'section', id, 'aria-labelledby': `${id}-title` });
  const inner = h('div', 'container section__inner', children);
  node.appendChild(inner);
  node.dataset.sectionLabel = label;
  return node;
};

export const sectionTitleId = (id) => `${id}-title`;
