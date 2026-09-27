// LEGO Robotics Classes content. Sources, all scraped 2026-09-26/27:
// - The Google Site's Intro Classes, Advanced Classes, Intro Class Signup, Interest Form and Class Policy pages
//   (sites.google.com/view/seattlesolvers/classes/...). Wording is theirs, with typos fixed and dashes removed.
// - The sign-up and interest forms on JotForm (linked below), which list the same sessions.
// - "Sponsorship Package - FTC 23511, 2026.pdf" (page 2, "Teaching") for the program figures.
// Every line must trace to one of these. Never add a date, price or promise from memory.
//
// New term: add its sessions to the course (ISO dates, Pacific time). The page works out on its own whether
// sign-up is open: while any session of a course with a sign-up form (`signUp`) is still ahead, the main action is
// that form; once every such session has started, it switches to the interest form, even on a deploy that was
// built before the sessions ended. A course without its own form never shows Sign up: its sessions read
// "Upcoming" and families use the interest form. The status line under the title follows the same dates.

import { emails } from './site';

export type Session = {
  /** First and last class day, YYYY-MM-DD. */
  start: string;
  end: string;
  term: string;
  /** Where that session meets, as the sign-up page gives it. */
  place: string;
};

/** `small` is a narrower copy of the same photo, for slots that are small on phones (the classroom pair). */
export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focus?: string;
  small?: { src: string; width: number };
};

export type Course = {
  id: 'intro' | 'advanced';
  name: string;
  level: string;
  grades?: string;
  prerequisite?: string;
  description: string[];
  outcome?: string;
  lessons: string[];
  sessions: Session[];
  /** This course's own sign-up form on JotForm, if it takes sign-ups online. */
  signUp?: string;
  /** Shown when the course has no session ahead. */
  noSessions: string;
  photo: Photo;
};

export const forms = {
  // Classes Interest Form: no payment; notifies families when Intro, Advanced or other events are scheduled.
  interest: { label: 'Get notified', href: 'https://form.jotform.com/240864574513157' },
};

export const header = {
  title: 'LEGO Robotics Classes',
  // Google Site, Home page ("Lego Robotics Classes").
  lede: 'Our own curriculum, built from our years in FIRST LEGO League, teaches kids entering grades 4 to 7 the basics of robotics in a fun, interactive way.',
};

export const courses: Course[] = [
  {
    id: 'intro',
    name: 'Intro to LEGO Robotics',
    level: 'Beginner',
    grades: 'Incoming grades 4 to 7',
    description: [
      'Designed for incoming 4th to 7th graders. We use LEGO SPIKE Prime kits for building and a Scratch-based app for programming.',
      'Kids learn to build, code, and move the robot, pick up and move objects, and create basic attachments for it. We also go over some of the sensors in the kit: how to use them, a basic version of how they work, and where they show up in real life.',
    ],
    outcome: 'By the end of class, kids are ready to join a team and compete in FIRST LEGO League.',
    lessons: [
      'What is a robot? Building the LEGO SPIKE robot',
      'Moving the robot: driving, turns, and what pseudocode is',
      'The ultrasonic sensor, and moving objects',
      'The color sensor, and a basic line follower',
      'Introduction to the FIRST LEGO League competition mat',
      'Mission planning, and coding on the mat',
      'Finishing the code, then a mock competition',
    ],
    sessions: [
      { start: '2026-07-20', end: '2026-07-24', term: 'Summer 2026', place: 'Near Beaver Lake Park' },
      { start: '2026-08-03', end: '2026-08-07', term: 'Summer 2026', place: 'Near Blackwell Elementary' },
    ],
    // The "Intro to LEGO Robotics Class Signup Form": sign-up, then a separate liability form, then PayPal payment.
    // It is for Intro only; Advanced has no online sign-up form of its own on the Google Site.
    signUp: 'https://form.jotform.com/240471783426156',
    noSessions: 'No sessions are open right now.',
    photo: {
      src: '/images/classes/intro-building.webp',
      alt: 'Two students at a class table, one building a LEGO SPIKE robot while the other watches beside a laptop',
      width: 1400,
      height: 1050,
      focus: '50% 40%',
    },
  },
  {
    id: 'advanced',
    name: 'Advanced LEGO Robotics',
    level: 'Advanced',
    prerequisite: 'Intro to LEGO Robotics, required',
    description: [
      'The next step after Intro. Students build on what they have learned: an advanced driving base coded to run efficiently, reliably, and robustly, and custom parts they design and build for their robots.',
      'They pick up the Engineering Design Process and mission strategy, and take their programming and design further with advanced line follower patterns, gears, and more.',
    ],
    outcome: 'By the end of the session, they complete more complex missions in a mini robotics competition.',
    lessons: [
      'Review, pseudocode, and My Blocks (functions)',
      'Line squaring',
      'Proportional line following',
      'Gears',
      'Mission planning on the FLL mat, the Engineering Design Process, and designing attachments',
      'Preparing for the mock tournament',
      'Mock tournament with parents',
    ],
    sessions: [],
    noSessions: 'No classes are scheduled yet.',
    photo: {
      src: '/images/classes/advanced-building.webp',
      alt: 'Three Advanced class students at a table, two building from LEGO parts trays and one coding on a laptop',
      width: 1400,
      height: 787,
      focus: '55% 45%',
    },
  },
];

/** Every session on the page with its course and that course's sign-up form, for the enrollment status. */
export const allSessions = courses.flatMap((c) =>
  c.sessions.map((s) => ({ start: s.start, end: s.end, term: s.term, course: c.id, form: c.signUp })),
);

// Photos from the class pages, for the classroom panel. Laid out by aspect ratio at one shared height. On phones
// the wide one spans the row and the other two share the next, so only those two carry a 600px copy.
export const classroomPhotos: Photo[] = [
  {
    src: '/images/classes/classroom-mat.webp',
    alt: 'A classroom of students at two long tables, with the FIRST LEGO League mat on the floor and a team member at the screen',
    width: 1400,
    height: 1050,
    small: { src: '/images/classes/classroom-mat-600.webp', width: 600 },
  },
  {
    src: '/images/classes/classroom-teaching.webp',
    alt: 'Students at tables with LEGO bins while team members teach at the front of the room',
    width: 1400,
    height: 681,
  },
  {
    src: '/images/classes/classroom-garage.webp',
    alt: 'Students at laptops around a LEGO bin while a team member presents on a TV',
    width: 1400,
    height: 1050,
    small: { src: '/images/classes/classroom-garage-600.webp', width: 600 },
  },
];

// The details that hold for both courses (Intro Class Signup and Interest Form pages).
export const details = {
  schedule: [
    { term: 'Summer', value: '9 AM to 12 PM for five days', note: '15 hours in all' },
    { term: 'School year', value: 'Seven classes of 1 hour 45 minutes', note: '12 hours 15 minutes in all' },
  ],
  scheduleNote: 'Dates and start times may vary.',
  price: [
    { term: 'Summer', value: '$300' },
    { term: 'School year', value: '$250' },
  ],
  priceNote: 'Paid through PayPal, inside the sign-up form.',
  location:
    'In Sammamish, within walking distance of Blackwell Elementary, Samantha Smith Elementary, or Beaver Lake Park, depending on the session.',
  locationNote: 'The exact address comes after you sign up.',
  bring: 'A laptop or tablet, and a snack to last through class.',
  proceeds: 'All proceeds go toward supporting our team, future classes, and the other events we run.',
};

// Sponsorship package, page 2: "run ... for 4 years now, attracting over 100 students to date ... at ⅓ the
// cost of other nearby businesses."
export const record = {
  years: '4',
  students: '100+',
  cost: 'a third of the cost',
};

// The four Organization Policies (Google Site, Class Policy page), for every class the team runs.
export const policies = {
  intro:
    'These policies apply to every class run by the Seattle Solvers, FTC Team #23511, including Intro to LEGO Robotics and Advanced LEGO Robotics.',
  items: [
    {
      id: 'attendance',
      title: 'Attendance',
      summary: 'Students attend every class. A missed class cannot be made up.',
      body: [
        'Students are expected to attend all classes. Because each class runs over a short period, missed classes are not eligible for a make-up class.',
        'If a student is unable to attend a class, please let the teachers know through WhatsApp or email as soon as possible so they can account for the change.',
      ],
    },
    {
      id: 'pickup',
      title: 'Pickup and drop-off',
      summary: 'Doors open 10 minutes before class and close 10 minutes after it starts.',
      body: [
        'Class doors open 10 minutes before the beginning of class and close 10 minutes after the class starts. If your student is arriving more than 10 minutes after class begins, message the primary contact for the class (the phone number is in the WhatsApp group description).',
        'Because of other commitments, teachers stay for only 10 minutes after class ends, and the door closes then. If you will be more than 10 minutes late to pick up your student, please message the primary contact for the team.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      summary: 'Email us, or message the class contact on WhatsApp when it is urgent.',
      body: [
        `For any class-related reason, email ${emails.business} or send a WhatsApp message to the class primary contact (the phone number is in the WhatsApp group description). If it is urgent, message on WhatsApp.`,
        'We do not take phone calls outside of class time.',
      ],
    },
    {
      id: 'cancellation',
      title: 'Cancellation',
      summary: 'A 75% refund up to two weeks before classes begin, and a full refund if we cancel.',
      body: [
        'The Seattle Solvers promise a 75% refund to anyone who cancels their enrollment up to two weeks before classes begin. Refund requests received within two weeks of the start date are not accepted.',
        `To cancel your enrollment, email ${emails.business}. If the Seattle Solvers cancel a class you are enrolled in, you will get a full refund.`,
      ],
    },
  ],
};
