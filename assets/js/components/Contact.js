import { config } from '../config.js';
import { el, h, placeholder, section, sectionHeading, copyText, toast } from '../lib/dom.js';
import { icon } from '../lib/icons.js';
import { cvControl } from './Navbar.js';

const CHANNELS = [
  {
    key: 'email',
    label: 'Email',
    iconName: 'mail',
    placeholderLabel: '[Add Email]',
    // Opens a compose window in the browser (Gmail) so it works even on
    // machines with no default mail app. The copy button stays as backup.
    href: (value) =>
      `https://mail.google.com/mail/?view=cm&fs=1&to=${value}&su=${encodeURIComponent(config.emailSubject)}`,
    linkLabel: (value) => value,
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    iconName: 'linkedin',
    placeholderLabel: '[Add LinkedIn URL]',
    href: (value) => value,
    linkLabel: () => 'Open LinkedIn profile',
  },
  {
    key: 'github',
    label: 'GitHub',
    iconName: 'github',
    placeholderLabel: '[Add GitHub URL]',
    href: (value) => value,
    linkLabel: () => 'Open GitHub profile',
  },
  {
    key: 'phone',
    label: 'Phone',
    iconName: 'phone',
    placeholderLabel: '[Add Phone]',
    href: (value) => `tel:+92${value.slice(1)}`,
    linkLabel: (value) => value,
  },
];

const locationCard = () =>
  h('div', 'contact-card', [
    h('div', 'contact-card__icon', [icon('pin')]),
    h('div', '', [
      el('p', { class: 'contact-card__label', text: 'Location' }),
      el('p', { class: 'contact-card__value', text: config.location }),
    ]),
  ]);

const channelCard = (channel) => {
  const value = config[channel.key];
  const configured = Boolean(value);

  const head = h('div', 'contact-card__icon', [icon(channel.iconName)]);
  const body = h('div', '', [
    el('p', { class: 'contact-card__label', text: channel.label }),
    configured
      ? el('p', { class: 'contact-card__value', text: channel.linkLabel(value) })
      : el('p', { class: 'contact-card__value' }, [placeholder(channel.placeholderLabel)]),
  ]);

  const actions = h('div', 'contact-card__actions');

  if (configured && (channel.key === 'email' || channel.key === 'phone')) {
    const label = channel.key === 'email' ? 'email address' : 'phone number';
    actions.appendChild(
      el('button', {
        type: 'button',
        class: 'btn btn--quiet btn--icon',
        'aria-label': `Copy ${label}`,
        title: `Copy ${label}`,
        onclick: async (event) => {
          event.preventDefault();
          const ok = await copyText(value);
          toast(ok ? `${label === 'email address' ? 'Email' : 'Phone'} copied to clipboard` : 'Copy blocked by the browser', ok ? 'info' : 'error');
        },
      }, [icon('copy')]),
    );
  }

  if (configured && channel.key !== 'email') {
    actions.appendChild(el('span', { class: 'icon-wrap' }, [icon('external')]));
  }

  const children = [head, body, actions];

  const card = configured
    ? el('a', {
        class: 'contact-card',
        href: channel.href(value),
        ...(channel.key === 'phone' ? {} : { target: '_blank', rel: 'noreferrer noopener' }),
        'aria-label': `${channel.label}: ${channel.linkLabel(value)}`,
      }, children)
    : el('div', { class: 'contact-card' }, children);

  return card;
};

export const Contact = () => {
  const node = section('contact', 'Contact');
  node.classList.add('section--alt');

  const cvValue = config.cvUrl;

  const cvCard = cvValue
    ? el('a', { class: 'contact-card', href: cvValue, download: config.cvFileName }, [
        h('div', 'contact-card__icon', [icon('file')]),
        h('div', '', [
          el('p', { class: 'contact-card__label', text: 'CV' }),
          el('p', { class: 'contact-card__value', text: 'Download CV (PDF)' }),
        ]),
        h('div', 'contact-card__actions', [icon('download')]),
      ])
    : h('div', 'contact-card', [
        h('div', 'contact-card__icon', [icon('file')]),
        h('div', '', [
          el('p', { class: 'contact-card__label', text: 'CV' }),
          el('p', { class: 'contact-card__value' }, [placeholder('[Add CV PDF]')]),
        ]),
        h('div', 'contact-card__actions', [cvControl({ label: 'CV', variant: 'ghost', extraClass: 'btn--sm' })]),
      ]);

  const anyMissing = !cvValue;

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '13',
      'Contact',
      'Get in touch',
      'Available for Software Quality Assurance Engineering roles and QA collaboration.',
    ),
    h('div', 'contact__grid', [...CHANNELS.map(channelCard), locationCard(), cvCard]),
    h('div', 'btn-row', [
      cvControl(),
      config.linkedin
        ? el('a', { class: 'btn btn--ghost', href: config.linkedin, target: '_blank', rel: 'noreferrer noopener' }, [
            icon('linkedin'),
            el('span', { text: 'LinkedIn' }),
          ])
        : null,
      config.email
        ? el('a', {
            class: 'btn btn--ghost',
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${config.email}&su=${encodeURIComponent(config.emailSubject)}`,
            target: '_blank',
            rel: 'noreferrer noopener',
          }, [
            icon('mail'),
            el('span', { text: 'Email me' }),
          ])
        : null,
    ]),
    anyMissing
      ? h('div', 'contact__note', [
          icon('spark'),
          el('span', {
            text: 'The CV placeholder is intentional: no file is linked until a real PDF exists. Set cvUrl in assets/js/config.js after dropping the PDF into assets/ and every Download CV button will use it.',
          }),
        ])
      : null,
  );

  node.querySelector('h2').id = 'contact-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};
