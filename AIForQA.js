import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

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

export const AIForQA = () => {
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
