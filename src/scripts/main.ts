// ---------------------------------------------------------------------------
// Main site script — orchestrator
//
// Bundled module that runs once and never re-executes on navigation. Registers
// event listeners via delegation on document for persistent chrome, and uses
// astro:page-load for per-navigation setup. Imports domain modules for theme,
// navigation, and typewriter logic.
// ---------------------------------------------------------------------------

import type { TransitionBeforeSwapEvent } from "astro:transitions/client";
import {
  DEFAULT_COLOR_SCHEME,
  shouldBeDark,
  applyTheme,
  updateThemeButtons,
  applyColorScheme,
  updateColorSchemeButtons,
  closeAllSettingsPanels,
} from "./theme";
import { updateActiveNavLink, resetMobileMenu } from "./navigation";
import { setupTypewriter } from "./typewriter";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STAGGER_DELAY_MS = 150;
const BACK_TO_TOP_VIEWPORT_RATIO = 0.5;

let isFirstLoad = true;

// ---------------------------------------------------------------------------
// Chrome listeners — registered once at module load, use event delegation
// ---------------------------------------------------------------------------

// Click delegation: settings panel, theme buttons, color scheme buttons,
// mobile menu toggle, back-to-top
document.addEventListener("click", (clickEvent) => {
  const clickTarget = clickEvent.target as HTMLElement;

  // Settings panel trigger — toggle the panel that contains this trigger
  const settingsTrigger = clickTarget.closest("[data-settings-trigger]");
  if (settingsTrigger instanceof HTMLElement) {
    const settingsRoot = settingsTrigger.closest("[data-settings-root]");
    const settingsPanel = settingsRoot?.querySelector("[data-settings-panel]");
    if (settingsPanel) {
      const isOpen = !settingsPanel.classList.contains("hidden");
      // Close all open panels first (handles the case where both mobile and
      // desktop panels exist, e.g. during resize)
      closeAllSettingsPanels();
      if (!isOpen) {
        settingsPanel.classList.remove("hidden");
        settingsTrigger.setAttribute("aria-expanded", "true");
      }
    }
    return;
  }

  // Clicks inside a settings panel should not close it
  if (clickTarget.closest("[data-settings-panel]")) {
    // Fall through to theme/scheme button handlers below
  } else {
    // Click outside any settings panel — close all
    closeAllSettingsPanels();
  }

  const themeButton = clickTarget.closest("[data-theme-button]");
  if (themeButton instanceof HTMLElement) {
    const selectedTheme = themeButton.dataset.themeButton;
    if (selectedTheme) {
      localStorage.setItem("theme", selectedTheme);
      if (selectedTheme === "light") {
        applyTheme(false);
      } else if (selectedTheme === "dark") {
        applyTheme(true);
      } else {
        applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
      }
      updateThemeButtons();
    }
    return;
  }

  const schemeButton = clickTarget.closest("[data-scheme-button]");
  if (schemeButton instanceof HTMLElement) {
    const selectedScheme = schemeButton.dataset.schemeButton;
    if (selectedScheme) {
      localStorage.setItem("colorScheme", selectedScheme);
      document.documentElement.setAttribute(
        "data-color-scheme",
        selectedScheme,
      );
      updateColorSchemeButtons();
    }
    return;
  }

  const menuToggleButton = clickTarget.closest("#menu-toggle");
  if (menuToggleButton instanceof HTMLElement) {
    const mobileMenu = document.getElementById("mobile-menu");
    const menuOpenIcon = document.getElementById("menu-open-icon");
    const menuCloseIcon = document.getElementById("menu-close-icon");
    if (mobileMenu && menuOpenIcon && menuCloseIcon) {
      mobileMenu.classList.toggle("hidden");
      menuOpenIcon.classList.toggle("hidden");
      menuCloseIcon.classList.toggle("hidden");
      const isExpanded = !mobileMenu.classList.contains("hidden");
      menuToggleButton.setAttribute(
        "aria-expanded",
        isExpanded ? "true" : "false",
      );
    }
    return;
  }

  if (clickTarget.closest("#back-to-top")) {
    clickEvent.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Close settings panel on Escape
document.addEventListener("keydown", (keyboardEvent) => {
  if (keyboardEvent.key === "Escape") {
    closeAllSettingsPanels();
  }
});

// System theme preference changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (mediaChangeEvent) => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme || savedTheme === "system") {
      applyTheme(mediaChangeEvent.matches);
    }
  });

// Scroll state
document.addEventListener("scroll", handleScroll);

// ---------------------------------------------------------------------------
// View Transition — prepare new document before swap
// ---------------------------------------------------------------------------

document.addEventListener("astro:before-swap", (swapEvent) => {
  const transitionEvent = swapEvent as TransitionBeforeSwapEvent;

  // Remove duplicate font links from new document
  transitionEvent.newDocument.head
    .querySelectorAll('link[as="font"]')
    .forEach((fontLink) => fontLink.remove());

  // Pre-reveal animated elements so they're at final opacity/position when
  // the View Transition captures the new page snapshot. Without this, the
  // .animate class leaves elements at opacity:0 + translate-y:3, creating a
  // gap between the transition fade-in and content appearing.
  transitionEvent.newDocument
    .querySelectorAll(".animate")
    .forEach((element) => element.classList.add("show"));

  // Apply theme to new document before swap to prevent flash
  transitionEvent.newDocument.documentElement.classList.toggle(
    "dark",
    shouldBeDark(),
  );

  // Apply color scheme to new document before swap to prevent flash
  const savedColorScheme = localStorage.getItem("colorScheme");
  transitionEvent.newDocument.documentElement.setAttribute(
    "data-color-scheme",
    savedColorScheme || DEFAULT_COLOR_SCHEME,
  );
});

// ---------------------------------------------------------------------------
// Per-navigation setup — runs on initial load AND each navigation
// ---------------------------------------------------------------------------

function onPageLoad(): void {
  applyTheme(shouldBeDark());
  updateThemeButtons();
  applyColorScheme();
  updateColorSchemeButtons();
  handleScroll();
  revealAnimatedElements(isFirstLoad ? STAGGER_DELAY_MS : 0);
  isFirstLoad = false;

  closeAllSettingsPanels();
  resetMobileMenu();
  updateActiveNavLink();
  setupTypewriter();
  setupFooter();
}

document.addEventListener("astro:page-load", onPageLoad);

// ---------------------------------------------------------------------------
// Stagger animation — reveals .animate elements sequentially on first load
// ---------------------------------------------------------------------------

function revealAnimatedElements(delayBetweenMs: number): void {
  const animatedElements = document.querySelectorAll(".animate");

  animatedElements.forEach((element, index) => {
    if (delayBetweenMs > 0) {
      setTimeout(() => {
        element.classList.add("show");
      }, index * delayBetweenMs);
    } else {
      element.classList.add("show");
    }
  });
}

// ---------------------------------------------------------------------------
// Scroll state
// ---------------------------------------------------------------------------

function handleScroll(): void {
  document.documentElement.classList.toggle("scrolled", window.scrollY > 0);

  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    const shouldShow =
      window.scrollY > window.innerHeight * BACK_TO_TOP_VIEWPORT_RATIO;
    backToTopButton.classList.toggle("opacity-0", !shouldShow);
    backToTopButton.classList.toggle("pointer-events-none", !shouldShow);
    backToTopButton.classList.toggle("opacity-60", shouldShow);
    backToTopButton.classList.toggle("pointer-events-auto", shouldShow);
  }
}

// ---------------------------------------------------------------------------
// Footer — dynamic year
// ---------------------------------------------------------------------------

function setupFooter(): void {
  const footerYearElement = document.getElementById("footer-year");
  if (footerYearElement) {
    footerYearElement.textContent = new Date().getFullYear().toString();
  }
}
