import { config } from '../config.js';
import { el, h, toast } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

export const NAV_ITEMS = [
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
export const cvControl = ({ label = 'Download CV', variant = 'primary', extraClass = '' } = {}) => {
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

export const Navbar = () => {
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
