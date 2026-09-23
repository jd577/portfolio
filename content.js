/**
 * Interactive test-case example and bug-investigation example.
 * Content is illustrative of method — the appointment feature is described as an
 * example test case, not as a delivered artefact from a named client project.
 */

export const testCase = {
  id: 'TC-001',
  type: 'Functional',
  feature: 'Patient Appointment Rescheduling',
  title: 'Admin reschedules a scheduled patient appointment.',
  precondition: 'Patient has an appointment with Scheduled status.',
  steps: [
    'Login as Admin.',
    "Open the patient's profile.",
    'Open Appointment Management.',
    'Select a scheduled appointment.',
    'Change the appointment date/time.',
    'Change the assigned provider if applicable.',
    'Save the changes.',
  ],
  expected:
    'The appointment is successfully rescheduled and the updated date, time, and assigned provider are reflected consistently.',
  scenarios: [
    {
      id: 'SC-02',
      name: 'Invalid date',
      type: 'Negative',
      checks:
        'A date that is not a real or acceptable date (for example 31 February, an empty value, or a malformed entry) is rejected with a clear validation message and no appointment change is saved.',
      layer: 'UI + API',
    },
    {
      id: 'SC-03',
      name: 'Past date',
      type: 'Boundary',
      checks:
        'Rescheduling to a date/time that has already passed is blocked, and the boundary (today, and the current hour) is handled deliberately rather than accidentally.',
      layer: 'UI + API',
    },
    {
      id: 'SC-04',
      name: 'Unauthorized user',
      type: 'Authorization',
      checks:
        'A user without permission to reschedule cannot reach or complete the action — tested through the UI and by calling the endpoint directly with that user’s session.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-05',
      name: 'Missing provider',
      type: 'Negative',
      checks:
        'Saving without an assigned provider is handled according to the requirement: either rejected with a clear message, or saved as unassigned and shown consistently everywhere the appointment appears.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-06',
      name: 'Double booking',
      type: 'Business rule',
      checks:
        'Two appointments cannot occupy the same provider slot: the second attempt is rejected, and the existing appointment is left unchanged in the UI, the API and the database.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-07',
      name: 'API failure',
      type: 'Negative',
      checks:
        'When the reschedule request fails, the user sees a clear failure state, no false success message is shown, and the appointment keeps its previous values after the user retries or leaves the screen.',
      layer: 'UI + API',
    },
    {
      id: 'SC-08',
      name: 'Refresh / data consistency',
      type: 'Data consistency',
      checks:
        'After a hard refresh and when opening the appointment from other screens, the new date, time and provider are the same everywhere the appointment is displayed.',
      layer: 'UI + API + DB',
    },
    {
      id: 'SC-09',
      name: 'Concurrent update',
      type: 'Concurrency',
      checks:
        'When the same appointment is edited from two sessions at the same time, one change wins deliberately and the other is told the data changed — no silent overwrite, no mixed state.',
      layer: 'UI + API + DB',
    },
  ],
};

export const bugInvestigation = {
  issue:
    'Patient profile changes are not immediately reflected on another side of the application until a page reload.',
  stages: [
    {
      id: 'observed',
      title: 'Observed Behavior',
      body:
        'While working through a patient workflow, a profile change made on one side of the application did not appear on the other side. The other side only showed the updated value after a manual page reload. It looked like a small display issue, so it was investigated before being reported.',
      points: [
        'Noticed during normal workflow testing, not during a scripted step',
        'The data itself looked correct after reload — the concern was the stale view',
        'Checked whether it was a one-off or repeatable before going further',
      ],
    },
    {
      id: 'reproduction',
      title: 'Reproduction',
      body:
        'A repeatable path matters more than a description. The steps were written down and run again to confirm the behaviour was consistent.',
      points: [
        'Open the patient profile on Side A and the same patient on Side B',
        'Change a profile field on Side A and save',
        'Confirm the change is saved on Side A',
        'Switch to Side B without reloading — the previous value is still shown',
        'Reload Side B — the updated value appears',
        'Repeat the sequence to confirm it happens every time, not occasionally',
      ],
    },
    {
      id: 'investigation',
      title: 'Investigation',
      body:
        'The goal at this stage is to describe the behaviour precisely and narrow down where it sits — not to guess at a cause. Nothing here claims to be the root cause.',
      points: [
        'Checked whether the change is actually saved, or only shown locally',
        'Checked whether other fields on the same profile behave the same way',
        'Checked whether the same happens for other user roles',
        'Checked whether a full reload, a soft navigation or a background action refreshes the value',
        'Watched the network activity to see whether a request is made at the moment the value should update',
        'Noted the environment: browser, screen, user role and build',
      ],
      note:
        'Root cause is deliberately left to development. QA describes and proves the behaviour; the fix owner confirms the cause.',
    },
    {
      id: 'expected',
      title: 'Expected Behavior',
      body:
        'After a patient profile change is saved, the updated value is visible on every side of the application that displays it, without the user having to reload the page.',
    },
    {
      id: 'actual',
      title: 'Actual Behavior',
      body:
        'The other side of the application continues to show the previous value until the page is reloaded manually.',
    },
    {
      id: 'evidence',
      title: 'Evidence',
      body:
        'The report is written so a developer can act on it immediately: clear title, preconditions, numbered steps, expected vs actual, environment, severity, FE/BE classification and attachments.',
      points: [
        'Screenshots or a short screen recording of the sequence',
        'The exact field changed, with before and after values',
        'Environment: browser, screen, user role and build',
        'Severity and priority, and whether it blocks the workflow',
        'Classification: front-end display, back-end response, or not yet determined',
        'Attachment slot: [Add screenshot / video]',
      ],
    },
    {
      id: 'retest',
      title: 'Retest',
      body:
        'After the fix, the reported case is re-run first, then the related flows, then a targeted regression pass. The bug is closed only when the behaviour is confirmed against the reported evidence.',
      points: [
        'Repeat the exact reproduction steps on the fixed build',
        'Check the same field and the neighbouring fields on the profile',
        'Check other roles and the other side of the application',
        'Run the related workflow end to end to catch side effects',
        'Attach the verification evidence and close the defect',
      ],
    },
  ],
};
