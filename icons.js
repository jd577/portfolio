/**
 * Inline SVG icon set (stroke-based, inherits `currentColor`).
 * No icon library, no external requests, no licensing concerns.
 * Tool glyphs are abstract, simplified marks — not vendor logos.
 */

const svg = (paths, viewBox = '0 0 24 24') =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;

export const icons = {
  logo: svg(
    `<path d="M5 12.5 9.5 17 19 7"/><path d="M3.5 6.5 12 3l8.5 3.5v6.2c0 4.3-3.4 7.4-8.5 8.8-5.1-1.4-8.5-4.5-8.5-8.8Z" stroke-width="1.4"/>`,
  ),
  download: svg(`<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/>`),
  arrowRight: svg(`<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>`),
  arrowDown: svg(`<path d="M12 4v15"/><path d="m6 13 6 6 6-6"/>`),
  arrowUp: svg(`<path d="M12 20V5"/><path d="m6 11 6-6 6 6"/>`),
  chevron: svg(`<path d="m9 5 7 7-7 7"/>`),
  chevronDown: svg(`<path d="m5 9 7 7 7-7"/>`),
  menu: svg(`<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>`),
  close: svg(`<path d="M6 6l12 12"/><path d="M18 6 6 18"/>`),
  sun: svg(
    `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/>`,
  ),
  moon: svg(`<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"/>`),
  mail: svg(`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>`),
  linkedin: svg(
    `<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17"/><path d="M8 7.4v.1"/><path d="M12 17v-3.6a2.2 2.2 0 0 1 4.4 0V17"/>`,
  ),
  github: svg(
    `<path d="M9.2 20.4c-3.6 1-3.6-2-5-2.4"/><path d="M14.8 21v-3.3c0-.9-.2-1.6-.8-2.1 2.6-.3 4.8-1.3 4.8-5.5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-1-.3-3.2 1.2a11 11 0 0 0-5.6 0C6.6 4.2 5.6 4.5 5.6 4.5a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 4.4 10c0 4.2 2.2 5.2 4.8 5.5-.4.4-.7.9-.8 1.6V21"/>`,
  ),
  file: svg(`<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>`),
  copy: svg(`<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>`),
  check: svg(`<path d="m5 12.5 4.5 4.5L19 7"/>`),
  bug: svg(
    `<path d="M9 7a3 3 0 0 1 6 0"/><rect x="7" y="7" width="10" height="12" rx="5"/><path d="M4 11h3"/><path d="M17 11h3"/><path d="M4 16h3"/><path d="M17 16h3"/><path d="M12 11v6"/>`,
  ),
  layers: svg(`<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3.5 12.5 8.5 4.7 8.5-4.7"/><path d="m3.5 16.8 8.5 4.7 8.5-4.7"/>`),
  api: svg(`<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01"/><path d="M7 17h.01"/>`),
  database: svg(
    `<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6"/><path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>`,
  ),
  gauge: svg(
    `<path d="M4 18a8.5 8.5 0 1 1 16 0"/><path d="m12 18 4-5.5"/><circle cx="12" cy="18" r="1.2"/>`,
  ),
  shield: svg(`<path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6Z"/><path d="m9.2 12 2 2 3.6-3.8"/>`),
  robot: svg(
    `<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4"/><circle cx="12" cy="3.4" r="1.2"/><path d="M9.5 13v1.5"/><path d="M14.5 13v1.5"/><path d="M2 12.5v3"/><path d="M22 12.5v3"/>`,
  ),
  cursor: svg(`<path d="m5 3 6 17 2.4-6.6L20 11Z"/>`),
  users: svg(
    `<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 6"/><path d="M17.5 14.4a5.5 5.5 0 0 1 3 5.1"/>`,
  ),
  flask: svg(
    `<path d="M9.5 3h5"/><path d="M10.5 3v6.2L5.6 17.4A2 2 0 0 0 7.3 20.5h9.4a2 2 0 0 0 1.7-3.1L13.5 9.2V3"/><path d="M8 14.5h8"/>`,
  ),
  flow: svg(
    `<rect x="3" y="4" width="6" height="5" rx="1.4"/><rect x="15" y="15" width="6" height="5" rx="1.4"/><path d="M9 6.5h5.5a3 3 0 0 1 3 3V15"/><path d="m15 13.5 2.5 2.5L15 18.5"/>`,
  ),
  terminal: svg(`<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/>`),
  search: svg(`<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>`),
  external: svg(`<path d="M14 4h6v6"/><path d="m20 4-8.5 8.5"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>`),
  spark: svg(`<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m6 6 2.5 2.5"/><path d="M15.5 15.5 18 18"/><path d="m18 6-2.5 2.5"/><path d="M8.5 15.5 6 18"/>`),
  target: svg(
    `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>`,
  ),
  clock: svg(`<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`),
  network: svg(
    `<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="m10.6 6.9-4 9.9"/><path d="m13.4 6.9 4 9.9"/><path d="M7.2 19h9.6"/>`,
  ),
  refresh: svg(
    `<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/>`,
  ),
  brain: svg(
    `<path d="M9.5 4.5A2.8 2.8 0 0 0 6.8 8a2.6 2.6 0 0 0-1.3 4.5A2.9 2.9 0 0 0 7 17.6a2.7 2.7 0 0 0 5.2.8V5.6a2.6 2.6 0 0 0-2.7-1.1Z"/><path d="M14.5 4.5A2.8 2.8 0 0 1 17.2 8a2.6 2.6 0 0 1 1.3 4.5A2.9 2.9 0 0 1 17 17.6a2.7 2.7 0 0 1-5.2.8V5.6a2.6 2.6 0 0 1 2.7-1.1Z"/>`,
  ),
  phone: svg(
    `<path d="M7 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7 2 2 0 0 1 7 3.5Z"/>`,
  ),
  pin: svg(
    `<path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>`,
  ),
  calendar: svg(
    `<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M8 14h3"/><path d="M8 17h6"/>`,
  ),
  stethoscope: svg(
    `<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M5 3H4"/><path d="M15 3h1"/><path d="M10 15v1a5 5 0 0 0 5 5 4 4 0 0 0 4-4v-2"/><circle cx="19" cy="12.5" r="2"/>`,
  ),
  briefcase: svg(
    `<rect x="3" y="7.5" width="18" height="12.5" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>`,
  ),
};

/** Resolve an icon name to an inline-SVG wrapper element. */
export const icon = (name, className = 'icon') => {
  const node = document.createElement('span');
  node.className = className;
  node.innerHTML = icons[name] || icons.target;
  return node;
};
