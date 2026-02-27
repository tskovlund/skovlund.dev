export type Site = {
  NAME: string;
  EMAIL: string;
  NUMBER_OF_POSTS_ON_HOMEPAGE: number;
  HOMEPAGE_PROJECT_SLUGS: string[];
  AVERAGE_WORDS_PER_MINUTE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = {
  NAME: string;
  ICON: string;
  HREF: string;
  COLOR: string;
}[];
