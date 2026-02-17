/**
 * All user-facing strings for skovlund.dev.
 *
 * Single source of truth for copy — keeps components focused on layout.
 * Organized by page/feature.
 *
 * Paragraphs containing inline links use the RichText type — an array of
 * plain strings and link objects, rendered by the <RichText> component.
 */

// ---------------------------------------------------------------------------
// Rich text type — segments of prose interspersed with links
// ---------------------------------------------------------------------------

export type RichTextLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type RichTextSegment = string | RichTextLink;
export type RichText = RichTextSegment[];

// ---------------------------------------------------------------------------
// Site-wide
// ---------------------------------------------------------------------------

export const site = {
  name: "Thomas Skovlund Hansen",
  email: "thomas@skovlund.dev",
  brandName: "skovlund.dev",
  sourceUrl: "https://github.com/tskovlund/skovlund.dev",
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const nav = {
  about: "About",
  blog: "Blog",
  projects: "Projects",
  shelf: "Shelf",
} as const;

// ---------------------------------------------------------------------------
// Page metadata (used in <title>, <meta description>, and nav hover taglines)
// ---------------------------------------------------------------------------

export const pages = {
  home: {
    title: "Home",
    description:
      "Building things with code, exploring rabbit holes, and playing the trombone.",
  },
  about: {
    title: "About",
    description:
      "Software, music, and everything in between — my background and what I'm working on.",
  },
  blog: {
    title: "Blog",
    description: "Writing about software and whatever else is on my mind.",
  },
  projects: {
    title: "Projects",
    description:
      "A collection of my projects, with links to repositories and demos.",
  },
  shelf: {
    title: "Shelf",
    description:
      "A collection of articles, tools, and things I think are worth your time.",
  },
} as const;

// ---------------------------------------------------------------------------
// Home page
// ---------------------------------------------------------------------------

export const home = {
  intro: {
    nameFirst: "Thomas",
    nameLast: "Skovlund Hansen",
    role: "Software Engineer",
    employer: {
      name: "Danske Commodities",
      abbreviation: "DC",
      href: "https://www.danskecommodities.com",
    },
    university: {
      name: "Aarhus University",
      abbreviation: "AU",
      href: "https://international.au.dk",
      degreeLabel: "MSc in CS",
    },
  },
  bio: "I build software, explore rabbit holes, and write about it. When I'm not at a keyboard, I'm probably playing trombone, running, or enjoying life with my girlfriend Maud.",
  interests:
    "Currently into declarative systems, giving AI agents more permissions than they probably deserve, and experimenting with self-hosted infrastructure. I'm a big believer in building personal tooling that compounds — every hour invested pays back across everything else.",
  sections: {
    latestPosts: "Latest posts",
    seeAllPosts: "See all posts",
    projects: "Selected Projects",
    seeAllProjects: "See all projects",
    connect: "Let's Connect!",
  },
  connect: [
    "If you want to get in touch about something or just say hi, reach out on social media or ",
    { label: "send me an email", href: `mailto:${site.email}` },
    ".",
  ] satisfies RichText,
  portraitAlt: "Thomas Skovlund Hansen",
};

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export type TimelineEntry = {
  year: string;
  segments: RichText;
};

export type ReleaseEntry = TimelineEntry & {
  cover: string;
};

export const about = {
  intro: [
    "I'm Thomas — a software engineer with an MSc in Computer Science from ",
    {
      label: "Aarhus University",
      href: "https://international.au.dk",
      external: true,
    },
    ". I care about building things well: clean architecture, declarative systems, tools that compound over time, and a (sometimes obsessive) attention to detail.",
  ] satisfies RichText,
  currentWork: [
    "Right now I'm deep into ",
    { label: "Nix", href: "https://nixos.org", external: true },
    ", autonomous coding agents, and self-hosted infrastructure. My computing environment is fully declarative — every setting, package, and secret managed as code in my ",
    { label: "nix-config", href: "/projects/nix-config" },
    " setup. ",
    { label: "This site", href: "/projects/skovlund-dev" },
    " was built without writing a single line of code myself.",
  ] satisfies RichText,
  privacy: [
    "I care about privacy and knowing where my data lives. I use ",
    { label: "Proton", href: "https://proton.me", external: true },
    ", ",
    { label: "Signal", href: "https://signal.org", external: true },
    ", and end-to-end encrypted services — and I'm working toward making that the default for everything.",
  ] satisfies RichText,
  sections: {
    experience: "Experience",
    music: "Music",
    privacy: "Privacy",
    releases: "Releases",
    releasesIntro:
      "I've been a part of the following releases as a trombone player:",
  },
  experience: [
    {
      year: "2025",
      segments: [
        "Built ",
        { label: "skovlund.dev", href: "/projects/skovlund-dev" },
        " entirely via AI agents",
      ],
    },
    {
      year: "2023",
      segments: [
        "Software Engineer at ",
        {
          label: "Danske Commodities",
          href: "https://www.danskecommodities.com",
          external: true,
        },
      ],
    },
    {
      year: "2023",
      segments: [
        "MSc in Computer Science from ",
        {
          label: "Aarhus University",
          href: "https://international.au.dk",
          external: true,
        },
      ],
    },
  ] satisfies TimelineEntry[],
  music: [
    "I play trombone, piano, and whatever else I can get my hands on — including DAWs for music production. I'm part of ",
    {
      label: "Nordkraft Big Band",
      href: "https://nordkraftbigband.dk",
      external: true,
    },
    ", a 17-piece jazz big band based in Aalborg, Denmark.",
  ] satisfies RichText,
  releases: [
    {
      year: "2025",
      cover: "everyday-synesthesia",
      segments: [
        {
          label: "Everyday Synesthesia: Sonic Pictures",
          href: "https://nordkraftbigband.lnk.to/EverydaySynesthesia-SonicPictures",
          external: true,
        },
        " — synesthetic big band suite by Rasmus Holm",
      ],
    },
    {
      year: "2025",
      cover: "silent-course",
      segments: [
        {
          label: "Silent Course",
          href: "https://nordkraftbigband.lnk.to/SilentCourse",
          external: true,
        },
        " — modern jazz with Remy Le Boeuf and Danielle Wertz",
      ],
    },
    {
      year: "2024",
      cover: "the-christmas-album",
      segments: [
        {
          label: "The Christmas Album",
          href: "https://nordkraftbigband.lnk.to/TheChristmasAlbum",
          external: true,
        },
        " — featuring Mads Mathias, Andrea Motis, Mathias Heise, Kaya Brüel, Szhirley, and Emil Otto",
      ],
    },
    {
      year: "2024",
      cover: "strangers-to-ourselves",
      segments: [
        {
          label: "Strangers to Ourselves",
          href: "https://nordkraftbigband.lnk.to/StrangersToOurselves",
          external: true,
        },
        " — Remy Le Boeuf's debut as chief conductor",
      ],
    },
    {
      year: "2023",
      cover: "big-band-stories",
      segments: [
        {
          label: "Big Band Stories",
          href: "https://nordkraftbigband.lnk.to/BigBandStories",
          external: true,
        },
        " — groovy North Jutland storytelling by Martin Granum",
      ],
    },
    {
      year: "2023",
      cover: "make-it-stick",
      segments: [
        {
          label: "Make It Stick!",
          href: "https://nordkraftbigband.lnk.to/MakeItStick-Album",
          external: true,
        },
        " — featuring trumpeter Thomas Fryland",
      ],
    },
    {
      year: "2022",
      cover: "avannaata-pissaanera",
      segments: [
        {
          label: "Avannaata Pissaanera",
          href: "https://nordkraftbigband.lnk.to/AvannaataPissaanera",
          external: true,
        },
        " — Greenlandic-Danish collaboration with Zika and Aviaja Lumholt",
      ],
    },
    {
      year: "2021",
      cover: "we-love-being-here-with-you",
      segments: [
        {
          label: "We Love Being Here With You",
          href: "https://tidal.com/album/185725258",
          external: true,
        },
        " — recorded with bassist John Clayton",
      ],
    },
    {
      year: "2021",
      cover: "dognscenerier",
      segments: [
        {
          label: "Døgnscenerier",
          href: "https://tidal.com/album/183073439",
          external: true,
        },
        " — suite by pianist and composer Nikolaj Bentzon",
      ],
    },
    {
      year: "2019",
      cover: "inmerso",
      segments: [
        {
          label: "Inmerso",
          href: "https://tidal.com/album/123676655",
          external: true,
        },
        " — with Cuejero, a Latin-flamenco-jazz quartet",
      ],
    },
  ] satisfies ReleaseEntry[],
  portraitAlt: "Thomas Skovlund Hansen",
};

// ---------------------------------------------------------------------------
// Color schemes
// ---------------------------------------------------------------------------

export type ColorScheme = {
  readonly id: string;
  readonly label: string;
  readonly selectorColor: string;
};

export const colorSchemes: readonly ColorScheme[] = [
  { id: "tokyo-night", label: "Tokyo Night", selectorColor: "#7aa2f7" },
  { id: "gruvbox", label: "Gruvbox", selectorColor: "#83a598" },
  { id: "nord", label: "Nord", selectorColor: "#88c0d0" },
  { id: "nightfox", label: "Nightfox", selectorColor: "#719cd6" },
  { id: "rose-pine", label: "Rosé Pine", selectorColor: "#c4a7e7" },
  {
    id: "catppuccin-frappe",
    label: "Catppuccin Frappé",
    selectorColor: "#8caaee",
  },
  {
    id: "catppuccin-macchiato",
    label: "Catppuccin Macchiato",
    selectorColor: "#8aadf4",
  },
  {
    id: "catppuccin-mocha",
    label: "Catppuccin Mocha",
    selectorColor: "#89b4fa",
  },
];

// ---------------------------------------------------------------------------
// Settings panel
// ---------------------------------------------------------------------------

export const settings = {
  trigger: "Settings",
  appearance: "Appearance",
  colorScheme: "Color scheme",
  themeLight: "Light",
  themeDark: "Dark",
  themeSystem: "System",
} as const;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  sourceLabel: "source",
} as const;

// ---------------------------------------------------------------------------
// Typewriter greetings (Danish, Dutch, English, Spanish)
// ---------------------------------------------------------------------------

export const greetings: string[] = ["Hej!", "Hoi!", "Hi!", "\u00A1Hola!"];

// Number of greeting color/gradient pairs defined in global.css
// (--greeting-color-0 through --greeting-color-5)
export const greetingColorCount: number = 6;

// Number of palette colors defined in global.css
// (--palette-0 through --palette-6)
export const paletteColorCount: number = 7;

// ---------------------------------------------------------------------------
// Footer rotating messages (plain text — rendered via typewriter)
// ---------------------------------------------------------------------------

export const footerMessages = [
  "Currently somewhere between Aarhus and Nijmegen.",
  "Powered by Nix, stubbornness, and recklessness.",
  "Currently reading stack traces instead of that book I\u0027ve been meaning to pick up.",
  "The source code is probably more interesting than this footer.",
  "If you scrolled all the way down here, we should be friends.",
  "Trombonist. The big brass one. With the slide.",
  "Coffee intake: concerning. Code output: correlated.",
  "Fueled by mass-produced-strength coffee and questionable sleep schedules.",
  "Somewhere on Watopia right now.",
  "Producing music nobody asked for.",
];

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------

export const socials = [
  {
    name: "GitHub",
    icon: "simple-icons:github",
    href: "https://github.com/tskovlund",
  },
  {
    name: "LinkedIn",
    icon: "simple-icons:linkedin",
    href: "https://www.linkedin.com/in/tskovlund",
  },
  {
    name: "X",
    icon: "simple-icons:x",
    href: "https://x.com/thomasskovlund",
  },
  {
    name: "Instagram",
    icon: "simple-icons:instagram",
    href: "https://instagram.com/tskovlund",
  },
  {
    name: "Bluesky",
    icon: "simple-icons:bluesky",
    href: "https://bsky.app/profile/tskovlund.bsky.social",
  },
] as const;

// ---------------------------------------------------------------------------
// Shelf items
// ---------------------------------------------------------------------------

export type ShelfLink = {
  title: string;
  href: string;
  description: RichText;
};

export type ShelfMedia = {
  title: string;
  href?: string;
  author: string;
  description: string;
};

export const shelf = {
  sections: {
    articles: "Articles & Essays",
    tools: "Tools",
    communities: "Projects & Communities",
    media: "Media",
    everything: "Everything Else",
  },
  articles: [
    {
      title: "Something Big is Happening",
      href: "https://shumer.dev/something-big-is-happening",
      description: [
        "Matt Shumer's accessible overview of how fast AI is moving, what it means for everyone, and how to prepare. Worth reading whether you're technical or not.",
      ],
    },
  ] satisfies ShelfLink[],
  tools: [
    {
      title: "Claude Code",
      href: "https://github.com/anthropics/claude-code",
      description: [
        "Anthropic's agentic coding tool. Excellent for autonomous, multi-step work.",
      ],
    },
    {
      title: "OpenCode",
      href: "https://github.com/opencode-ai/opencode",
      description: [
        "Open-source terminal AI coding agent. Model-agnostic, fast, and well-designed.",
      ],
    },
    {
      title: "Neovim",
      href: "https://neovim.io",
      description: [
        "The editor I keep coming back to. Extensible, fast, keyboard-driven. My config lives in ",
        { label: "nix-config", href: "/projects/nix-config" },
        ".",
      ],
    },
  ] satisfies ShelfLink[],
  communities: [
    {
      title: "NixOS",
      href: "https://nixos.org",
      description: [
        "Declarative, reproducible Linux. Once you go Nix, you don't go back. See my ",
        { label: "nix-config", href: "/projects/nix-config" },
        " for how I manage everything.",
      ],
    },
    {
      title: "Advent of Code",
      href: "https://adventofcode.com",
      description: [
        "Annual programming puzzles in December. My kind of advent calendar. See my ",
        { label: "solutions", href: "/projects/advent-of-code" },
        ".",
      ],
    },
    {
      title: "Kattis",
      href: "https://open.kattis.com",
      description: [
        "Competitive programming problems from contests around the world.",
      ],
    },
  ] satisfies ShelfLink[],
  media: [
    {
      title: "His Dark Materials",
      href: "https://www.goodreads.com/series/44427-his-dark-materials",
      author: "Philip Pullman",
      description:
        "The trilogy that shaped how I think about storytelling, free will, and growing up.",
    },
    {
      title: "The Book of Dust",
      href: "https://www.goodreads.com/series/199547-the-book-of-dust",
      author: "Philip Pullman",
      description:
        "The companion series. Darker, more mature, equally compelling.",
    },
  ] satisfies ShelfMedia[],
  everythingElse: [
    {
      title: "Flat Whites ☕",
      description: "The perfect coffee drink. No notes.",
    },
  ],
};
