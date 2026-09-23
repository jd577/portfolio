import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { tools } from '../data/tools.js';

const STATUS_LABEL = { used: 'Worked with', learning: 'Learning' };

const toolCard = (tool) =>
  h('li', 'tool', [
    el('span', { class: 'tool__icon' }, [icon(tool.icon)]),
    h('div', 'tool__body', [
      h('div', 'tool__top', [
        el('span', { class: 'tool__name', text: tool.name }),
        el('span', { class: `tag tag--${tool.status}`, text: STATUS_LABEL[tool.status] }),
      ]),
      el('p', { class: 'tool__note', text: tool.note }),
    ]),
  ]);

export const Tools = () => {
  const node = section('tools', 'Tools');

  const searchInput = el('input', {
    class: 'search__input',
    type: 'search',
    id: 'tool-search',
    placeholder: 'Filter tools…',
    'aria-label': 'Filter tools by name',
    autocomplete: 'off',
  });

  const search = h('div', 'search', [icon('search'), searchInput]);

  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'used', label: 'Worked with' },
    { key: 'learning', label: 'Learning' },
  ].map((filter, index) =>
    el('button', {
      type: 'button',
      class: 'filter',
      'aria-pressed': index === 0 ? 'true' : 'false',
      dataset: { filter: filter.key },
      text: filter.label,
    }),
  );

  const filters = el('div', { class: 'filters', role: 'group', 'aria-label': 'Filter tools by status' }, filterButtons);

  const list = el('ul', { class: 'tool-grid', 'aria-live': 'polite' });
  const empty = el('p', { class: 'empty', text: 'No tools match that filter.', hidden: true });
  const count = el('span', { class: 'eyebrow' });

  let activeFilter = 'all';

  const render = () => {
    const query = searchInput.value.trim().toLowerCase();
    const visible = tools.filter((tool) => {
      const matchesFilter = activeFilter === 'all' || tool.status === activeFilter;
      const matchesQuery =
        !query || tool.name.toLowerCase().includes(query) || tool.note.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });

    list.replaceChildren(...visible.map(toolCard));
    empty.hidden = visible.length > 0;
    count.textContent = `${visible.length} of ${tools.length} tools shown`;
  };

  searchInput.addEventListener('input', render);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach((other) =>
        other.setAttribute('aria-pressed', String(other === button)),
      );
      render();
    });
  });

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '04',
      'Tools',
      'Tools I work with',
      'The QA toolset behind the testing — labelled honestly as either something I have worked with or something I am currently learning.',
    ),
    h('div', 'tools__bar', [search, filters, count]),
    list,
    empty,
  );

  node.querySelector('h2').id = 'tools-title';
  node.setAttribute('data-reveal', '');
  render();

  return { element: node };
};
