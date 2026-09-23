import { config } from '../config.js';
import { el, h, placeholder, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { projects } from '../data/projects.js';

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                       */
/* -------------------------------------------------------------------------- */

const flowDiagram = (flow) =>
  h('div', 'block', [
    h('p', 'block__title', [icon('flow'), el('span', { text: flow.title })]),
    h('div', 'flow', flow.steps.flatMap((step, index) => {
      const nodes = [
        h('span', 'flow__step', [
          el('span', { class: 'flow__num', text: String(index + 1).padStart(2, '0') }),
          el('span', { text: step }),
        ]),
      ];
      if (index < flow.steps.length - 1)
        nodes.push(el('span', { class: 'flow__arrow', 'aria-hidden': 'true', text: '→' }));
      return nodes;
    })),
  ]);

const bulletBlock = (title, iconName, items, listClass = 'check-list') =>
  h('div', 'block', [
    h('p', 'block__title', [icon(iconName), el('span', { text: title })]),
    h('ul', listClass, items.map((item) => el('li', { text: item }))),
  ]);

const chipBlock = (title, iconName, items) =>
  h('div', 'block', [
    h('p', 'block__title', [icon(iconName), el('span', { text: title })]),
    h('div', 'chip-list', items.map((item) => el('span', { class: 'chip', text: item }))),
  ]);

const accordionBlock = (id, label, content, open = false) => {
  const panelId = `${id}-panel`;
  const triggerId = `${id}-trigger`;

  const panel = el('div', {
    class: 'accordion__panel',
    id: panelId,
    role: 'region',
    'aria-labelledby': triggerId,
    hidden: !open,
  }, [content]);

  const trigger = el('button', {
    type: 'button',
    class: 'accordion__trigger',
    id: triggerId,
    'aria-expanded': open ? 'true' : 'false',
    'aria-controls': panelId,
  }, [
    el('span', { text: label }),
    icon('chevronDown', 'icon accordion__chevron'),
  ]);

  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });

  return h('div', 'accordion', [trigger, panel]);
};

/* -------------------------------------------------------------------------- */
/* Project card                                                                */
/* -------------------------------------------------------------------------- */

const linkOrPlaceholder = (url, label) =>
  url
    ? el('a', { class: 'btn btn--ghost btn--sm', href: url, target: '_blank', rel: 'noreferrer noopener' }, [
        icon('external'),
        el('span', { text: label }),
      ])
    : el('span', { class: 'btn btn--ghost btn--sm', 'aria-disabled': 'true' }, [
        icon('external'),
        placeholder(`[Add ${label} URL]`),
      ]);

const projectCard = (project) => {
  const links = config.projectLinks[project.id] || { github: '', demo: '' };

  const toolsRow = project.tools.length
    ? chipBlock('Tools used', 'terminal', project.tools)
    : h('div', 'block', [
        h('p', 'block__title', [icon('terminal'), el('span', { text: 'Tools used' })]),
        el('p', { class: 'kv__value' }, [
          el('span', { text: 'Tool list for this project: ' }),
          placeholder('[Add tools]'),
          el('span', { text: ' — set it in assets/js/data/projects.js' }),
        ]),
      ]);

  const body = h('div', 'project__body', [
    ...(project.workflow ? [flowDiagram(project.workflow)] : []),
    ...(project.pipeline ? [flowDiagram(project.pipeline)] : []),
    ...(project.stackNote
      ? [h('div', 'callout callout--neutral', [icon('terminal'), el('span', { text: project.stackNote })])]
      : []),
    h('div', 'project__cols', [
      bulletBlock('My QA responsibilities', 'users', project.responsibilities),
      bulletBlock('Key testing scenarios', 'target', project.keyScenarios),
      bulletBlock('QA challenges', 'bug', project.challenges),
      bulletBlock('What I learned', 'spark', project.learned),
    ]),
    accordionBlock(
      `${project.id}-testing`,
      `Testing performed (${project.testingAreas.length} areas)`,
      chipBlock('Coverage areas', 'layers', project.testingAreas),
    ),
    toolsRow,
  ]);

  const foot = h('div', 'project__foot', [
    el('span', { class: 'eyebrow' }, [
      icon('external'),
      el('span', { text: 'Project links' }),
    ]),
    linkOrPlaceholder(links.github, 'GitHub'),
    linkOrPlaceholder(links.demo, 'Demo'),
  ]);

  return el('article', { class: 'project', 'aria-labelledby': `${project.id}-title` }, [
    h('div', 'project__head', [
      h('div', 'project__top', [
        el('span', { class: 'project__badge' }, [
          icon(project.type.startsWith('QA Automation') ? 'terminal' : 'stethoscope'),
          el('span', { text: project.type }),
        ]),
        el('span', { class: 'project__context', text: project.context }),
      ]),
      el('h3', { class: 'project__name', id: `${project.id}-title`, text: project.name }),
      el('p', { class: 'project__desc', text: project.description }),
    ]),
    body,
    foot,
  ]);
};

/* -------------------------------------------------------------------------- */

export const Projects = () => {
  const node = section('projects', 'Projects');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '05',
      'Featured QA Projects',
      'Projects I have tested',
      'Each entry is a QA case study: what the product does, what I tested, what made it hard, and what it taught me.',
    ),
    h('div', 'project-list', projects.map(projectCard)),
    h('div', 'callout callout--neutral', [
      icon('spark'),
      el('span', {
        text: 'Links are shown as placeholders until real URLs are added in assets/js/config.js — nothing here points to a page that does not exist.',
      }),
    ]),
  );

  node.querySelector('h2').id = 'projects-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};
