import { config } from '../config.js';
import { el, h } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { cvControl } from './Navbar.js';

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

export const Hero = () => {
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
