// ---------------------------------------------------------------------------
// Theme, color scheme, and settings panel management
// ---------------------------------------------------------------------------

export const DEFAULT_COLOR_SCHEME = "tokyo-night";

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export function shouldBeDark(): boolean {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") return false;
  if (savedTheme === "dark") return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(dark: boolean): void {
  // Temporarily disable transitions to prevent flash during theme switch
  const transitionBlocker = document.createElement("style");
  transitionBlocker.appendChild(
    document.createTextNode(
      "* {" +
        "-webkit-transition: none !important;" +
        "-moz-transition: none !important;" +
        "-o-transition: none !important;" +
        "-ms-transition: none !important;" +
        "transition: none !important;" +
        "}",
    ),
  );
  document.head.appendChild(transitionBlocker);

  document.documentElement.classList.toggle("dark", dark);

  // Force reflow so the transition blocker takes effect before removal
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  window.getComputedStyle(transitionBlocker).opacity;
  document.head.removeChild(transitionBlocker);
}

export function updateThemeButtons(): void {
  const activeTheme = localStorage.getItem("theme") ?? "system";
  const themeButtons = document.querySelectorAll("[data-theme-button]");
  themeButtons.forEach((button) => {
    const isActive =
      (button as HTMLElement).dataset.themeButton === activeTheme;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    if (isActive) {
      button.classList.add("theme-active");
    } else {
      button.classList.remove("theme-active");
    }
  });
}

// ---------------------------------------------------------------------------
// Color scheme
// ---------------------------------------------------------------------------

export function applyColorScheme(): void {
  const savedScheme = localStorage.getItem("colorScheme");
  let effectiveScheme = savedScheme || DEFAULT_COLOR_SCHEME;

  // Validate saved scheme against available scheme buttons in the DOM
  const schemeButtons = document.querySelectorAll("[data-scheme-button]");
  if (schemeButtons.length > 0) {
    let isValidScheme = false;
    schemeButtons.forEach((button) => {
      if ((button as HTMLElement).dataset.schemeButton === savedScheme) {
        isValidScheme = true;
      }
    });

    if (!isValidScheme) {
      effectiveScheme = DEFAULT_COLOR_SCHEME;
      localStorage.setItem("colorScheme", effectiveScheme);
    }
  }

  document.documentElement.setAttribute("data-color-scheme", effectiveScheme);
}

export function updateColorSchemeButtons(): void {
  const activeScheme =
    localStorage.getItem("colorScheme") || DEFAULT_COLOR_SCHEME;
  const schemeButtons = document.querySelectorAll("[data-scheme-button]");
  schemeButtons.forEach((button) => {
    const isActive =
      (button as HTMLElement).dataset.schemeButton === activeScheme;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
    if (isActive) {
      button.classList.add("scheme-active");
    } else {
      button.classList.remove("scheme-active");
    }
  });
}

// ---------------------------------------------------------------------------
// Settings panel
// ---------------------------------------------------------------------------

export function closeAllSettingsPanels(): void {
  document.querySelectorAll("[data-settings-panel]").forEach((panel) => {
    panel.classList.add("hidden");
  });
  document.querySelectorAll("[data-settings-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
}
