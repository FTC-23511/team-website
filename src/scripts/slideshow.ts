// Home hero background slideshow. Slides crossfade on a slow drift; the next photo is decoded before
// it fades in, so there is never a blank frame. It pauses when the hero is off screen, when the tab is
// hidden, or when the visitor presses pause, and stays on the first photo under reduced motion.

const SHOW_MS = 7000;
const FADE_MS = 1600;

export function mountSlides(root: HTMLElement, toggle: HTMLButtonElement | null) {
  const slides = [...root.querySelectorAll<HTMLImageElement>('.slide')];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (slides.length < 2) {
    toggle?.remove();
    return;
  }

  let index = 0, timer = 0, userPaused = false, inView = true, busy = false;

  const load = (img: HTMLImageElement) => {
    if (!img.getAttribute('src') && img.dataset.src) img.src = img.dataset.src;
    return img.decode().catch(() => undefined);
  };

  const running = () => !userPaused && inView && !document.hidden && !reduce.matches;

  const schedule = () => {
    window.clearTimeout(timer);
    root.classList.toggle('is-paused', !running());
    if (toggle) toggle.hidden = reduce.matches;
    if (running() && !busy) timer = window.setTimeout(advance, SHOW_MS);
  };

  async function advance() {
    busy = true;
    const out = slides[index];
    const nextIndex = (index + 1) % slides.length;
    const incoming = slides[nextIndex];
    await load(incoming);
    busy = false;
    if (!running()) return schedule();
    out.classList.remove('is-active');
    out.classList.add('is-leaving');
    incoming.classList.remove('is-leaving');
    incoming.classList.add('is-active');
    window.setTimeout(() => out.classList.remove('is-leaving'), FADE_MS + 100);
    index = nextIndex;
    load(slides[(index + 1) % slides.length]); // warm the one after
    schedule();
  }

  // The control keeps one name ("Pause motion"); its pressed state says whether motion is held.
  toggle?.addEventListener('click', () => {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', String(userPaused));
    schedule();
  });
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    schedule();
  }).observe(root);
  document.addEventListener('visibilitychange', schedule);
  reduce.addEventListener('change', schedule);

  // Warm the second photo once the page has settled, unless motion is reduced and the first photo holds.
  window.setTimeout(() => {
    if (!reduce.matches) load(slides[1]);
  }, 1500);
  schedule();
}
