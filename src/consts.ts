/**
 * Site configuration — re-exports strings from i18n and adds numeric config.
 *
 * Components can import from here (UPPER_CASE typed API) or directly
 * from @i18n/en (lowercase, more granular). Both reference the same data.
 */

import { pages, site, socials } from "@i18n/en";
import type { Metadata, Site, Socials } from "@types";

export const SITE: Site = {
  NAME: site.name,
  EMAIL: site.email,
  NUMBER_OF_POSTS_ON_HOMEPAGE: 3,
  HOMEPAGE_PROJECT_SLUGS: ["skovlund-dev", "nix-config", "eliza"],
  AVERAGE_WORDS_PER_MINUTE: 200,
};

export const HOME: Metadata = {
  TITLE: pages.home.title,
  DESCRIPTION: pages.home.description,
};

export const BLOG: Metadata = {
  TITLE: pages.blog.title,
  DESCRIPTION: pages.blog.description,
};

export const PROJECTS: Metadata = {
  TITLE: pages.projects.title,
  DESCRIPTION: pages.projects.description,
};

export const ABOUT: Metadata = {
  TITLE: pages.about.title,
  DESCRIPTION: pages.about.description,
};

export const SHELF: Metadata = {
  TITLE: pages.shelf.title,
  DESCRIPTION: pages.shelf.description,
};

export const NOT_FOUND: Metadata = {
  TITLE: pages.notFound.title,
  DESCRIPTION: pages.notFound.description,
};

export const SOCIALS: Socials = socials.map((social) => ({
  NAME: social.name,
  HANDLE: social.handle,
  ICON: social.icon,
  HREF: social.href,
  COLOR: social.color,
}));

export const DEFAULT_COLOR_SCHEME: string = "tokyo-night";

export const CARD_COLOR_CLASSES: string[] = [
  "border-l-light-accent dark:border-l-dark-accent hover:bg-light-accent/5 dark:hover:bg-dark-accent/5",
  "border-l-light-warm dark:border-l-dark-warm hover:bg-light-warm/5 dark:hover:bg-dark-warm/5",
  "border-l-light-green dark:border-l-dark-green hover:bg-light-green/5 dark:hover:bg-dark-green/5",
  "border-l-light-orange dark:border-l-dark-orange hover:bg-light-orange/5 dark:hover:bg-dark-orange/5",
  "border-l-light-cyan dark:border-l-dark-cyan hover:bg-light-cyan/5 dark:hover:bg-dark-cyan/5",
];
