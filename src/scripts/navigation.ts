// ---------------------------------------------------------------------------
// Navigation state, mobile menu, and tagline hover positioning
// ---------------------------------------------------------------------------

import { pages } from "@i18n/en";

const TAGLINE_INSET_PX = 48;

export const PAGE_DESCRIPTIONS: Record<string, string> = {
  "/about": pages.about.description,
  "/blog": pages.blog.description,
  "/projects": pages.projects.description,
  "/shelf": pages.shelf.description,
};

// ---------------------------------------------------------------------------
// Active nav highlighting
// ---------------------------------------------------------------------------

export function updateActiveNavLink(): void {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach((navLink) => {
    const linkPath =
      (navLink.getAttribute("href") ?? "").replace(/\/$/, "") || "/";
    navLink.classList.toggle(
      "nav-active",
      currentPath === linkPath ||
        (linkPath !== "/" && currentPath.startsWith(linkPath + "/")),
    );
  });

  const homeNavLink = document.getElementById("nav-home");
  if (homeNavLink) {
    homeNavLink.classList.toggle("nav-active", currentPath === "/");
  }
}

// ---------------------------------------------------------------------------
// Mobile menu reset
// ---------------------------------------------------------------------------

export function resetMobileMenu(): void {
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenu) mobileMenu.classList.add("hidden");
  const menuOpenIcon = document.getElementById("menu-open-icon");
  const menuCloseIcon = document.getElementById("menu-close-icon");
  if (menuOpenIcon) menuOpenIcon.classList.remove("hidden");
  if (menuCloseIcon) menuCloseIcon.classList.add("hidden");
  const menuToggleButton = document.getElementById("menu-toggle");
  if (menuToggleButton) {
    menuToggleButton.setAttribute("aria-expanded", "false");
  }
}

// ---------------------------------------------------------------------------
// Nav tagline positioning
// ---------------------------------------------------------------------------

export function positionNavTagline(hoveredNavLink: Element): void {
  const hoveredPath =
    (hoveredNavLink.getAttribute("href") ?? "").replace(/\/$/, "") || "/";
  const hoveredDescription = PAGE_DESCRIPTIONS[hoveredPath];
  if (!hoveredDescription) return;

  const taglineElement = document.getElementById("nav-tagline");
  if (!taglineElement) return;

  taglineElement.textContent = hoveredDescription;

  // Position aligned with hovered link. The tagline is position:absolute
  // inside its offset parent (the Container), so convert viewport coords
  // to parent-relative coords.
  const parentLeft =
    taglineElement.offsetParent?.getBoundingClientRect().left ?? 0;
  const linkLeft = hoveredNavLink.getBoundingClientRect().left;
  taglineElement.style.left = linkLeft - parentLeft + "px";
  taglineElement.classList.remove("hidden");

  // Clamp so the tagline doesn't overflow the offset parent's right edge
  const taglineRect = taglineElement.getBoundingClientRect();
  const parentRight =
    (taglineElement.offsetParent?.getBoundingClientRect().right ??
      window.innerWidth) - TAGLINE_INSET_PX;
  if (taglineRect.right > parentRight) {
    taglineElement.style.left =
      parentRight - parentLeft - taglineRect.width + "px";
  }
}

export function hideNavTagline(): void {
  const taglineElement = document.getElementById("nav-tagline");
  if (taglineElement) taglineElement.classList.add("hidden");
}
