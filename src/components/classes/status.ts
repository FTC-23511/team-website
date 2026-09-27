// Where the classes stand, worked out on the Seattle calendar. The same functions run at build time and again in
// the visitor's browser (applyLiveStatus), so a deploy made before a session began never keeps advertising it:
// every status line, session label and action on /classes is corrected on load from today's date.

export type Dated = { start: string; end: string };
export type SessionStatus = 'upcoming' | 'running' | 'finished';

/** A session as the page tracks it: its dates and term, its course, and that course's sign-up form, if it has one. */
export type Session = Dated & { term: string; course: string; form?: string };

/** Today's date in Seattle as YYYY-MM-DD, which compares correctly as a string. */
export function todayInSeattle(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

export function sessionStatus(session: Dated, today: string): SessionStatus {
  if (today < session.start) return 'upcoming';
  if (today <= session.end) return 'running';
  return 'finished';
}

/** A session is open for sign-up while it has yet to start and its course has a sign-up form. */
const signUpOpen = (s: Session, today: string) => !!s.form && sessionStatus(s, today) === 'upcoming';

/** Whether one course can be signed up for right now. */
export const courseOpen = (sessions: Session[], course: string, today: string) =>
  sessions.some((s) => s.course === course && signUpOpen(s, today));

/** The label beside each session: "Open" only when the course takes sign-ups for it. */
export function sessionLabel(status: SessionStatus, hasForm: boolean): string {
  if (status === 'upcoming') return hasForm ? 'Open' : 'Upcoming';
  return status === 'running' ? 'In session' : 'Finished';
}

export type Enrollment = {
  /** Some session with a sign-up form has yet to start. */
  open: boolean;
  /** The status line under the page title. */
  line: string;
  /** Where "Sign up" goes while open: the sign-up form of the next session that takes sign-ups. */
  signUp?: string;
};

/** The page's enrollment state, from every session it lists. Dates decide, never the order sessions are listed in. */
export function enrollmentState(sessions: Session[], today: string): Enrollment {
  const byStart = [...sessions].sort((a, b) => a.start.localeCompare(b.start));
  const next = byStart.find((s) => signUpOpen(s, today));
  if (next) return { open: true, line: `Sign-up is open for ${next.term}`, signUp: next.form };
  const running = byStart.find((s) => sessionStatus(s, today) === 'running');
  if (running) return { open: false, line: `${running.term} classes are in session` };
  const coming = byStart.find((s) => sessionStatus(s, today) === 'upcoming');
  if (coming) return { open: false, line: `${coming.term} classes are coming up` };
  const byEnd = [...sessions].sort((a, b) => a.end.localeCompare(b.end));
  const last = byEnd[byEnd.length - 1];
  if (last) return { open: false, line: `${last.term} classes have finished` };
  return { open: false, line: 'No classes are scheduled right now' };
}

/**
 * Where a Sign up link on the page points. The link is rendered, hidden while closed, whenever a listed session
 * takes sign-ups, so the browser can reveal it: the open session's form, or any listed form until it re-points it.
 */
export const signUpHref = (sessions: Session[], state: Enrollment) =>
  state.signUp ?? sessions.find((s) => s.form)?.form;

/**
 * In the browser: re-check every session against today's date and correct the page. It reads the sessions from
 * the page's #class-sessions JSON and updates any hook on the page, whichever component rendered it:
 * [data-enrollment-line] text, [data-enrollment-marker] state, the [data-enrollment-signup] link's form,
 * [data-when="open|closed"] (with data-for="<course>" for one course, or the whole program without it), and
 * [data-session="start/end"] rows with their labels.
 */
export function applyLiveStatus(doc: Document = document): void {
  const source = doc.getElementById('class-sessions');
  if (!source) return;
  const sessions = JSON.parse(source.textContent || '[]') as Session[];
  const today = todayInSeattle();
  const state = enrollmentState(sessions, today);

  doc.querySelectorAll<HTMLElement>('[data-enrollment-line]').forEach((el) => {
    el.textContent = state.line;
  });
  doc.querySelectorAll<HTMLElement>('[data-enrollment-marker]').forEach((el) => {
    el.classList.toggle('is-open', state.open);
  });
  doc.querySelectorAll<HTMLAnchorElement>('a[data-enrollment-signup]').forEach((a) => {
    if (state.signUp) a.href = state.signUp;
  });
  doc.querySelectorAll<HTMLElement>('[data-when]').forEach((el) => {
    const course = el.dataset.for;
    const on = course ? courseOpen(sessions, course, today) : state.open;
    el.hidden = (el.dataset.when === 'open') !== on;
  });
  doc.querySelectorAll<HTMLElement>('[data-session]').forEach((el) => {
    const [start, end] = (el.dataset.session ?? '').split('/');
    const status = sessionStatus({ start, end }, today);
    el.dataset.status = status;
    const label = el.querySelector('[data-session-status]');
    if (label) label.textContent = sessionLabel(status, el.dataset.form === 'true');
  });
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** "July 20 to 24", or "July 30 to August 3" across a month. */
export function formatRange({ start, end }: Dated): string {
  const [, m1, d1] = start.split('-').map(Number);
  const [, m2, d2] = end.split('-').map(Number);
  return m1 === m2 ? `${MONTHS[m1 - 1]} ${d1} to ${d2}` : `${MONTHS[m1 - 1]} ${d1} to ${MONTHS[m2 - 1]} ${d2}`;
}
