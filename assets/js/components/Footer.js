import { config } from '../config.js';
import { el, h, toast } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { cvControl } from './Navbar.js';

/**
 * Footer links resolve to the real URLs from config. Where a URL has not been
 * added yet, the entry is rendered as a button that says so — never as a link
 * pointing at a page that does not exist.
 */
const footerLink = ({ label, iconName, href }) => {
  if (href) {
    const isMail = href.startsWith('mailto:');
    return el('a', {
      class: 'footer__link',
      href,
      ...(isMail ? {} : { target: '_blank', rel: 'noreferrer noopener' }),
    }, [icon(iconName), el('span', { text: label })]);
  }

  return el('button', {
    type: 'button',
    class: 'footer__link',
    'aria-label': `${label} — not added yet`,
    onclick: () => toast(`${label} has not been added yet — set it in assets/js/config.js.`, 'error'),
  }, [icon(iconName), el('span', { text: label })]);
};

export const Footer = () => {
  const year = new Date().getFullYear();

  const links = el('nav', { class: 'footer__links', 'aria-label': 'Footer' }, [
    footerLink({ label: 'LinkedIn', iconName: 'linkedin', href: config.linkedin }),
    footerLink({ label: 'GitHub', iconName: 'github', href: config.github }),
    footerLink({ label: 'Email', iconName: 'mail', href: config.email ? `mailto:${config.email}` : '' }),
    config.cvUrl
      ? el('a', { class: 'footer__link', href: config.cvUrl, download: config.cvFileName }, [
          icon('file'),
          el('span', { text: 'CV' }),
        ])
      : el('button', {
          type: 'button',
          class: 'footer__link',
          'aria-label': 'CV — not added yet',
          onclick: () => toast('CV has not been added yet — set cvUrl in assets/js/config.js.', 'error'),
        }, [icon('file'), el('span', { text: 'CV' })]),
  ]);

  return {
    element: el('footer', { class: 'footer' }, [
      h('div', 'container', [
        h('div', 'footer__inner', [
          h('div', '', [
            el('p', { class: 'footer__name', text: `${config.name} — ${config.title}` }),
            el('p', { class: 'footer__tag', text: 'Building quality through thoughtful testing.' }),
          ]),
          links,
        ]),
        h('div', 'footer__base', [
          el('span', { text: `© ${year} ${config.name}. All rights reserved.` }),
          el('span', { text: `${config.currentRole.role} · ${config.currentRole.company}` }),
        ]),
      ]),
    ]),
  };
};

export { cvControl };
