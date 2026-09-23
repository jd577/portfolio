/**
 * Entry point — composes the page from components.
 * Order of components here is the order of sections on the page.
 */

import { el, initReveal, prefersReducedMotion } from './lib/dom.js';
import { icon } from './lib/icons.js';
import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { About } from './components/About.js';
import { Skills } from './components/Skills.js';
import { Tools } from './components/Tools.js';
import { Projects } from './components/Projects.js';
import { CaseStudy } from './components/CaseStudy.js';
import { TestCase } from './components/TestCase.js';
import { BugInvestigation } from './components/BugInvestigation.js';
import { Experience } from './components/Experience.js';
import { Philosophy } from './components/Philosophy.js';
import { AIForQA } from './components/AIForQA.js';
import { Growth } from './components/Growth.js';
import { Contact } from './components/Contact.js';
import { Footer } from './components/Footer.js';

const COMPONENTS = [
  Hero,
  About,
  Skills,
  Tools,
  Projects,
  CaseStudy,
  TestCase,
  BugInvestigation,
  Experience,
  Philosophy,
  AIForQA,
  Growth,
  Contact,
];

const mount = () => {
  const header = Navbar();
  const skipLink = el('a', { class: 'skip-link', href: '#main', text: 'Skip to main content' });
  const main = el('main', { class: 'main', id: 'main' });

  document.body.prepend(skipLink, header.element);

  const instances = COMPONENTS.map((Component) => Component());
  instances.forEach((instance) => main.appendChild(instance.element));

  document.body.appendChild(main);
  document.body.appendChild(Footer().element);

  /* Components that need the DOM in place (e.g. scroll spy). */
  instances.forEach((instance) => instance.mount?.());
  header.mount?.();

  /* Back to top */
  const toTop = el('button', {
    type: 'button',
    class: 'to-top',
    'aria-label': 'Back to top',
    title: 'Back to top',
  }, [icon('arrowUp')]);

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    document.querySelector('.brand')?.focus({ preventScroll: true });
  });

  const onScroll = () => toTop.classList.toggle('is-visible', window.scrollY > 700);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  document.body.appendChild(toTop);

  /* Keyboard-friendly in-page navigation: move focus to the target section. */
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute('href').slice(1);
    if (!id) return;

    const target = document.getElementById(id);
    if (!target) return;

    // Let the browser handle the scroll, then move focus for keyboard users.
    window.setTimeout(() => {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }, prefersReducedMotion() ? 0 : 420);
  });

  initReveal(document);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount, { once: true });
} else {
  mount();
}
