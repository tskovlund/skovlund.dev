// ---------------------------------------------------------------------------
// Navigation state and mobile menu
// ---------------------------------------------------------------------------

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
