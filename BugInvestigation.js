import { el, h, placeholder, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { bugInvestigation } from '../data/content.js';

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

export const BugInvestigation = () => {
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
