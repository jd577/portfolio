import { el, h, section, sectionHeading, copyText, toast } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { testCase } from '../data/content.js';

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

export const TestCase = () => {
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
