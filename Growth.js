import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

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

export const Growth = () => {
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
