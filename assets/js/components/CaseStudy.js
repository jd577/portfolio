import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

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

export const CaseStudy = () => {
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
