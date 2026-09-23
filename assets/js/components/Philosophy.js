import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

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

export const Philosophy = () => {
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
