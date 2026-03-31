/**
 * Hero Animation — decipher title, fade subtitle, stagger spec cards.
 * Vanilla TS, no dependencies. Runs on every component page.
 */

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const CHAR_STAGGER = 30;       // ms between each character starting to resolve
const CHAR_CYCLE_DURATION = 400; // ms each character spends cycling
const CYCLE_INTERVAL = 40;      // ms between scramble ticks
const SUBTITLE_DELAY = 600;     // ms after page load before subtitle fades in
const CARDS_DELAY = 1000;       // ms after page load before first card appears
const CARD_STAGGER = 150;       // ms between each card

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

function animateTitle(el: HTMLElement): void {
  const text = el.textContent || '';
  if (!text) return;

  // Clear and populate with spans
  el.textContent = '';
  el.classList.add('page-title--animating');

  const spans: HTMLSpanElement[] = [];

  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.className = 'hero-char';
    if (text[i] === ' ') {
      span.innerHTML = '&nbsp;';
      span.dataset.space = 'true';
    } else {
      span.textContent = randomChar();
      span.classList.add('hero-char--scrambling');
    }
    el.appendChild(span);
    spans.push(span);
  }

  // For each non-space character, cycle then settle
  spans.forEach((span, i) => {
    if (span.dataset.space) return;

    const realChar = text[i];
    const startTime = i * CHAR_STAGGER;
    const settleTime = startTime + CHAR_CYCLE_DURATION;

    // Start cycling after stagger delay
    let intervalId: number | undefined;

    const startCycling = () => {
      intervalId = window.setInterval(() => {
        span.textContent = randomChar();
      }, CYCLE_INTERVAL);
    };

    const settle = () => {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
      span.textContent = realChar;
      span.classList.remove('hero-char--scrambling');
      span.classList.add('hero-char--settled');
    };

    setTimeout(startCycling, startTime);
    setTimeout(settle, settleTime);
  });
}

function animateSubtitle(el: HTMLElement): void {
  el.classList.add('page-subtitle--animating');

  setTimeout(() => {
    el.classList.add('page-subtitle--visible');
  }, SUBTITLE_DELAY);
}

function animateSpecCards(container: HTMLElement): void {
  const cards = container.querySelectorAll<HTMLElement>('.spec-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    card.classList.add('spec-card--animating');
  });

  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('spec-card--visible');
    }, CARDS_DELAY + i * CARD_STAGGER);
  });
}

export function initHero(): void {
  const title = document.querySelector<HTMLElement>('.page-title');
  const subtitle = document.querySelector<HTMLElement>('.page-subtitle');
  const specHero = document.querySelector<HTMLElement>('.spec-hero');

  // Bail if no hero elements exist on this page
  if (!title) return;

  // Skip all animation for reduced motion preference
  if (prefersReducedMotion()) return;

  animateTitle(title);
  if (subtitle) animateSubtitle(subtitle);
  if (specHero) animateSpecCards(specHero);
}
