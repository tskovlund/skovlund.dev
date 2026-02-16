// ---------------------------------------------------------------------------
// Typewriter greeting
//
// Types, pauses, deletes, and retypes greetings in different languages.
// Each greeting gets a random color from the palette (never same twice).
// Cursor blinks when idle, stays solid when typing/deleting.
// ---------------------------------------------------------------------------

import { greetings, greetingColorCount } from "@i18n/en";

const TYPEWRITER_TYPE_SPEED_MS = 100;
const TYPEWRITER_DELETE_SPEED_MS = 60;
const TYPEWRITER_PAUSE_BEFORE_DELETE_MS = 2500;
const TYPEWRITER_PAUSE_AFTER_DELETE_MS = 150;

let typewriterTimeoutId: number | null = null;

export function setupTypewriter(): void {
  if (typewriterTimeoutId !== null) {
    clearTimeout(typewriterTimeoutId);
    typewriterTimeoutId = null;
  }

  // Early exit if the greeting elements aren't on this page
  if (
    !document.getElementById("greeting") ||
    !document.getElementById("typewriter-cursor") ||
    !document.getElementById("greeting-wrapper")
  )
    return;

  // Re-fetch as non-nullable consts so closures below see HTMLElement, not
  // HTMLElement | null (TypeScript doesn't narrow captured variables).
  const greetingElement = document.getElementById("greeting") as HTMLElement;
  const cursorElement = document.getElementById(
    "typewriter-cursor",
  ) as HTMLElement;
  const wrapperElement = document.getElementById(
    "greeting-wrapper",
  ) as HTMLElement;

  // Skip animation entirely for users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReducedMotion) {
    greetingElement.textContent = greetings[0];
    cursorElement.classList.remove("cursor-blink");
    return;
  }

  let greetingIndex = 0;
  let characterIndex = greetings[0].length;
  let isDeleting = false;
  let activeColorIndex = 0;

  function pickNextColor(): void {
    let nextColorIndex: number;
    do {
      nextColorIndex = Math.floor(Math.random() * greetingColorCount);
    } while (nextColorIndex === activeColorIndex);
    activeColorIndex = nextColorIndex;
    wrapperElement.style.color = `var(--greeting-color-${nextColorIndex})`;
    greetingElement.style.backgroundImage = `var(--greeting-grad-${nextColorIndex})`;
  }

  function typewriterTick(): void {
    const currentGreeting = greetings[greetingIndex];
    cursorElement.classList.add("cursor-typing");

    if (isDeleting) {
      characterIndex--;
      greetingElement.textContent = currentGreeting.substring(
        0,
        characterIndex,
      );

      if (characterIndex === 0) {
        isDeleting = false;
        greetingIndex = (greetingIndex + 1) % greetings.length;
        pickNextColor();
        typewriterTimeoutId = window.setTimeout(
          typewriterTick,
          TYPEWRITER_PAUSE_AFTER_DELETE_MS,
        );
      } else {
        typewriterTimeoutId = window.setTimeout(
          typewriterTick,
          TYPEWRITER_DELETE_SPEED_MS,
        );
      }
    } else {
      characterIndex++;
      greetingElement.textContent = greetings[greetingIndex].substring(
        0,
        characterIndex,
      );

      if (characterIndex === greetings[greetingIndex].length) {
        cursorElement.classList.remove("cursor-typing");
        typewriterTimeoutId = window.setTimeout(() => {
          isDeleting = true;
          typewriterTick();
        }, TYPEWRITER_PAUSE_BEFORE_DELETE_MS);
      } else {
        typewriterTimeoutId = window.setTimeout(
          typewriterTick,
          TYPEWRITER_TYPE_SPEED_MS,
        );
      }
    }
  }

  // Start with first greeting visible, cursor blinking. After pause, cycle.
  typewriterTimeoutId = window.setTimeout(() => {
    isDeleting = true;
    typewriterTick();
  }, TYPEWRITER_PAUSE_BEFORE_DELETE_MS);
}
