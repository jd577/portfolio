/**
 * QA skills — grouped exactly as provided.
 *
 * Levels are descriptive, never numeric:
 *   core     -> used as part of my day-to-day QA work
 *   practiced-> applied hands-on in real testing work
 *   working  -> comfortable using it, still building depth
 *   learning -> actively learning / applying in personal projects
 *
 * No percentages, no fake proficiency scores.
 */

export const skillLevels = {
  core: { label: 'Core practice', short: 'Core', hint: 'Used in day-to-day QA work' },
  practiced: { label: 'Practiced', short: 'Practiced', hint: 'Applied hands-on in real testing work' },
  working: { label: 'Working knowledge', short: 'Working', hint: 'Comfortable using it, still building depth' },
  learning: { label: 'Actively learning', short: 'Learning', hint: 'Learning and applying in practice projects' },
};

export const skillCategories = [
  {
    id: 'manual',
    name: 'Manual Testing',
    icon: 'cursor',
    summary: 'The foundation of everything else — scenario design and exploratory judgement.',
    skills: [
      { name: 'Functional Testing', level: 'core' },
      { name: 'Regression Testing', level: 'core' },
      { name: 'Smoke Testing', level: 'core' },
      { name: 'Sanity Testing', level: 'core' },
      { name: 'End-to-End Testing', level: 'core' },
      { name: 'UI/UX Testing', level: 'practiced' },
      { name: 'Black Box Testing', level: 'core' },
      { name: 'Negative Testing', level: 'practiced' },
      { name: 'Boundary Testing', level: 'practiced' },
      { name: 'Exploratory Testing', level: 'practiced' },
      { name: 'Cross-browser Testing', level: 'practiced' },
    ],
  },
  {
    id: 'api',
    name: 'API Testing',
    icon: 'api',
    summary: 'Validating behaviour below the UI, where most real defects hide.',
    skills: [
      { name: 'Postman', level: 'practiced' },
      { name: 'Swagger', level: 'practiced' },
      { name: 'REST API validation', level: 'practiced' },
      { name: 'Request/response validation', level: 'practiced' },
      { name: 'Status code validation', level: 'practiced' },
      { name: 'Authentication testing', level: 'practiced' },
      { name: 'Authorization testing', level: 'practiced' },
      { name: 'Negative API testing', level: 'practiced' },
      { name: 'JSON validation', level: 'practiced' },
      { name: 'Error-handling validation', level: 'practiced' },
      { name: 'Business-logic validation', level: 'practiced' },
    ],
  },
  {
    id: 'database',
    name: 'Database Testing',
    icon: 'database',
    summary: 'Confirming the data behind the screen is consistent, complete and correct.',
    skills: [
      { name: 'PostgreSQL', level: 'practiced' },
      { name: 'pgAdmin 4', level: 'practiced' },
      { name: 'SQL', level: 'practiced' },
      { name: 'Data validation', level: 'core' },
      { name: 'CRUD validation', level: 'practiced' },
      { name: 'Backend/frontend data consistency', level: 'practiced' },
      { name: 'Database query validation', level: 'practiced' },
    ],
  },
  {
    id: 'performance',
    name: 'Performance Testing',
    icon: 'gauge',
    summary: 'Checking how the system behaves under realistic and heavy user load.',
    skills: [
      { name: 'Apache JMeter', level: 'working' },
      { name: 'Load Testing', level: 'working' },
      { name: 'Stress Testing', level: 'working' },
      { name: 'Response-time analysis', level: 'working' },
      { name: 'Concurrent-user testing', level: 'working' },
      { name: 'Performance bottleneck identification', level: 'working' },
    ],
  },
  {
    id: 'security',
    name: 'Security Testing',
    icon: 'shield',
    summary: 'Awareness-driven testing: access control, input handling and known weaknesses.',
    skills: [
      { name: 'OWASP ZAP', level: 'working' },
      { name: 'Basic web security testing', level: 'working' },
      { name: 'Authentication testing', level: 'practiced' },
      { name: 'Authorization testing', level: 'practiced' },
      { name: 'Input validation', level: 'practiced' },
      { name: 'Security vulnerability awareness', level: 'working' },
    ],
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: 'terminal',
    summary: 'Turning repeatable manual checks into reliable automated coverage.',
    skills: [
      { name: 'Playwright with Python', level: 'learning' },
      { name: 'Selenium', level: 'working' },
      { name: 'Katalon Studio', level: 'working' },
      { name: 'Selenium IDE', level: 'working' },
    ],
  },
  {
    id: 'ai',
    name: 'AI & QA',
    icon: 'brain',
    summary: 'Using AI as an assistant in the QA workflow — with the engineer validating every result.',
    skills: [
      { name: 'AI-assisted test-case generation', level: 'learning' },
      { name: 'AI-assisted bug analysis', level: 'learning' },
      { name: 'AI-assisted requirement analysis', level: 'learning' },
      { name: 'AI-assisted test automation', level: 'learning' },
      { name: 'LLM evaluation', level: 'learning' },
      { name: 'AI tools for QA productivity', level: 'learning' },
      { name: 'OpenAI API integration testing', level: 'practiced' },
      { name: 'LLM application testing', level: 'practiced' },
      { name: 'Prompt engineering for QA', level: 'working' },
      { name: 'RAG / LangChain / LangGraph awareness', level: 'working' },
    ],
  },
];
