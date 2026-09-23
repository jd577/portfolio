import { el, h, section, sectionHeading } from '../lib/dom.js';
import { icon } from '../lib/icons.js';

/* Both roles as stated on the CV. */
const ROLES = [
  {
    company: 'NeuroOcean AI',
    role: 'Software Quality Assurance Engineer',
    period: 'Jan 2026 – Present',
    current: true,
    summary:
      'Designing, maintaining and executing test cases based on requirements, acceptance criteria and business workflows, in close collaboration with development and product teams.',
    responsibilities: [
      'Design, maintain and execute test cases from requirements and acceptance criteria',
      'Functional, regression, smoke, sanity, exploratory, UI/UX, API, database, security, load and end-to-end testing',
      'Analyse requirements to identify functional, integration, usability and data-quality risks',
      'Test REST APIs with Postman and Swagger — requests, responses, authentication, error handling, business logic',
      'Validate backend data and business rules using PostgreSQL and pgAdmin 4',
      'Load and performance testing with Apache JMeter under concurrent-user scenarios',
      'Test automation with Katalon Studio and Selenium IDE for functional and regression scenarios',
      'Test AI-powered features and LLM-based applications, including OpenAI API integrations',
      'Apply prompt engineering and AI workflows when validating AI-powered functionality',
      'Report, track, reproduce and retest defects with clear steps, expected/actual results and evidence',
      'Validate role-based access, frontend/backend integration and data consistency',
      'Collaborate with developers and product teams to investigate defects and clarify requirements',
    ],
  },
  {
    company: 'NeuroOcean AI',
    role: 'ML & AI Intern',
    period: 'Oct 2025 – Dec 2025',
    current: false,
    summary: 'Worked on real-world AI automation, backend APIs, and LLM-powered systems.',
    responsibilities: [
      'Contributed to production projects involving OpenAI APIs, FastAPI, PostgreSQL and workflow automation',
      'Performed API testing, backend debugging, database validation and system reliability checks',
      'Collaborated with development teams to improve product performance and user experience',
    ],
  },
];

const roleCard = (role) =>
  h('div', 'exp__card', [
    h('div', 'exp__head', [
      el('span', { class: 'exp__company', text: role.company }),
      el('span', { class: 'exp__period' }, [
        icon('calendar'),
        el('span', { text: role.period }),
      ]),
      role.current ? el('span', { class: 'chip chip--ok', text: 'Current role' }) : null,
    ]),
    el('p', { class: 'exp__role', text: role.role }),
    el('p', { class: 'kv__value', text: role.summary }),
    role.responsibilities.length
      ? h('ul', 'exp__list check-list', role.responsibilities.map((item) => el('li', { text: item })))
      : null,
  ]);

export const Experience = () => {
  const node = section('experience', 'Experience');
  node.classList.add('section--alt');

  node.querySelector('.section__inner').replaceChildren(
    sectionHeading(
      '09',
      'Experience',
      'Where I have worked',
      'Professional experience to date, described as stated on my CV.',
    ),
    h('div', 'timeline', ROLES.map((role) => h('div', 'timeline__item', [roleCard(role)]))),
  );

  node.querySelector('h2').id = 'experience-title';
  node.setAttribute('data-reveal', '');

  return { element: node };
};
