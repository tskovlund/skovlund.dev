/**
 * Site configuration — re-exports strings from i18n and adds numeric config.
 *
 * Components can import from here (UPPER_CASE typed API) or directly
 * from @i18n/en (lowercase, more granular). Both reference the same data.
 */

import type { Site, Metadata, Socials } from "@types";
import { site, pages, socials } from "@i18n/en";

export const SITE: Site = {
  NAME: site.name,
  EMAIL: site.email,
  NUMBER_OF_POSTS_ON_HOMEPAGE: 3,
  NUMBER_OF_PROJECTS_ON_HOMEPAGE: 3,
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

export const SOCIALS: Socials = socials.map((social) => ({
  NAME: social.name,
  ICON: social.icon,
  HREF: social.href,
}));

export const CARD_COLOR_CLASSES: string[] = [
  "border-l-tn-light-accent dark:border-l-tn-dark-accent hover:bg-tn-light-accent/5 dark:hover:bg-tn-dark-accent/5",
  "border-l-tn-light-warm dark:border-l-tn-dark-warm hover:bg-tn-light-warm/5 dark:hover:bg-tn-dark-warm/5",
  "border-l-tn-light-green dark:border-l-tn-dark-green hover:bg-tn-light-green/5 dark:hover:bg-tn-dark-green/5",
  "border-l-tn-light-orange dark:border-l-tn-dark-orange hover:bg-tn-light-orange/5 dark:hover:bg-tn-dark-orange/5",
  "border-l-tn-light-cyan dark:border-l-tn-dark-cyan hover:bg-tn-light-cyan/5 dark:hover:bg-tn-dark-cyan/5",
];
