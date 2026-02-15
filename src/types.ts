export type Site = {
  NAME: string;
  EMAIL: string;
  NUMBER_OF_POSTS_ON_HOMEPAGE: number;
  NUMBER_OF_PROJECTS_ON_HOMEPAGE: number;
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
}[];
