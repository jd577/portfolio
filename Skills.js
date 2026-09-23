import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { skillCategories, skillLevels } from '../data/skills.js';

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

export const Skills = () => {
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
