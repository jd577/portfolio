/**
 * -----------------------------------------------------------------------------
 * SITE CONFIG — the ONLY file you need to edit to personalise the portfolio.
 *
 * Values below come from Jawad's CV. The only remaining placeholder is the CV
 * PDF itself: drop it in assets/ and set cvUrl.
 * -----------------------------------------------------------------------------
 */

export const config = {
  siteUrl: 'https://jd577.github.io/portfolio/', // GitHub Pages URL (update if repo name differs)
  name: 'Jawad Akhtar',
  title: 'Software Quality Assurance Engineer',
  tagline:
    'Manual Testing | API Testing | Database Testing | Performance Testing | Test Automation | AI for QA',
  education: 'BS Computer Engineering · UET Taxila',
  location: 'Lahore, Punjab, Pakistan',
  phone: '03250860119',
  experienceSummary: '1 year of professional SQA experience',
  currentRole: {
    company: 'NeuroOcean AI',
    role: 'Software Quality Assurance Engineer',
  },
  status: 'Open to SQA Engineering Opportunities',

  /* Real contact details (from CV). */
  email: 'jawadakhtar292@gmail.com',
  emailSubject: 'SQA Engineering Opportunity — Jawad Akhtar (portfolio)',
  linkedin: 'https://www.linkedin.com/in/jawad-akhtar-b710023a9',
  github: 'https://github.com/jd577',
  cvUrl: 'assets/Jawad-Akhtar-CV.pdf',
  cvFileName: 'Jawad-Akhtar-CV.pdf',

  /* Optional project links — leave empty to render "[Add GitHub URL]" / "[Add Demo URL]". */
  projectLinks: {
    thryve: { github: '', demo: '' },
    flit: { github: '', demo: '' },
    qualityguard: { github: '', demo: '' },
    lifeweaver: { github: '', demo: '' },
  },
};
