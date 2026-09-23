import { config } from '../config.js';
import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

const PARAGRAPHS = [
  'I am a Computer Engineer working as a Software Quality Assurance Engineer at NeuroOcean AI. My work focuses on understanding requirements, designing meaningful test scenarios, executing functional and regression testing, investigating defects, and validating software across different layers.',
  'My testing approach goes beyond checking whether a feature works. I look for negative scenarios, boundary conditions, data consistency issues, authorization problems, API behavior, performance risks, and real-world user flows.',
  'I am also actively developing my automation and AI-for-QA skills to make testing more efficient, repeatable, and intelligent.',
  'At NeuroOcean AI my work includes testing AI/LLM-powered features and OpenAI API integrations, applying prompt engineering and AI workflows when validating AI-powered functionality, and validating backend data and business rules against PostgreSQL.',
];

const FACTS = [
  { iconName: 'briefcase', label: 'Current role', value: `${config.currentRole.role}, ${config.currentRole.company}` },
  { iconName: 'layers', label: 'Education', value: config.education },
  { iconName: 'clock', label: 'Experience', value: config.experienceSummary },
  { iconName: 'pin', label: 'Location', value: config.location },
  { iconName: 'target', label: 'Focus', value: 'Functional, regression, API, database, performance and security testing' },
];

export const About = () => {
  const node = section('about', 'About');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading('02', 'About', 'Approach to quality'),
    h('div', 'about__grid', [
      h('div', 'about__body', PARAGRAPHS.map((paragraph) => el('p', { text: paragraph }))),
      h('div', 'about__aside', FACTS.map((fact) =>
        h('div', 'fact', [
          icon(fact.iconName),
          h('div', '', [
            el('div', { class: 'fact__label', text: fact.label }),
            el('div', { class: 'fact__value', text: fact.value }),
          ]),
        ]),
      )),
    ]),
  );

  // Section heading needs the id referenced by aria-labelledby
  node.querySelector('h2').id = 'about-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};
