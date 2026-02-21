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
// Shared links — single source of truth for frequently referenced URLs
// ---------------------------------------------------------------------------

const links = {
  au: {
    label: "Aarhus University",
    href: "https://au.dk",
    external: true,
  },
  dc: {
    label: "Danske Commodities",
    href: "https://www.danskecommodities.com",
    external: true,
  },
  nixConfig: {
    label: "nix-config",
    href: "https://github.com/tskovlund/nix-config",
    external: true,
  },
  nix: {
    label: "Nix",
    href: "https://nixos.org",
    external: true,
  },
  nbb: {
    label: "Nordkraft Big Band",
    href: "https://nordkraftbigband.dk",
    external: true,
  },
} satisfies Record<string, RichTextLink>;

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
      href: "https://au.dk",
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
    "I'm Thomas — a software engineer from Denmark. I like building things properly: declarative systems, sharp tools, and knowing where my data actually lives.",
  ] satisfies RichText,
  currentWork: [
    "Right now I'm into ",
    links.nix,
    ", AI coding agents, and self-hosted infrastructure. My computing environment is managed as code in my ",
    links.nixConfig,
    " setup, I run a ",
    { label: "NixOS VPS", href: "/projects/miles-vps" },
    " for observability and backups, and ",
    { label: "this site", href: "/projects/skovlund-dev" },
    " was built entirely by AI agents. I default to ",
    { label: "Proton", href: "https://proton.me", external: true },
    ", ",
    { label: "Signal", href: "https://signal.org", external: true },
    ", and end-to-end encryption — working toward making that the norm for everything.",
  ] satisfies RichText,
  sections: {
    experience: "Experience",
    music: "Music",
  },
  experienceProse: [
    [
      "Computer science at ",
      links.au,
      " — BSc, MSc, a ",
      {
        label: "thesis on Oblivious Data Structures",
        href: "/thesis.pdf",
        external: true,
      },
      ", and a half-year detour into studying trombone at ",
      {
        label: "the conservatory",
        href: "https://musikkons.dk",
        external: true,
      },
      " before I figured out I'd rather keep music as something I do for fun.",
    ],
    [
      "I've consulted at ",
      {
        label: "IT Minds",
        href: "https://it-minds.dk",
        external: true,
      },
      " (shipped code for LEGO, Danske Bank, Cordura) and built .NET microservices for energy trading at ",
      links.dc,
      ". On the side: trombone in ",
      links.nbb,
      ", chairman of ",
      {
        label: "TÅGEKAMMERET",
        href: "https://tket.dk",
        external: true,
      },
      ", competitive programming at ",
      {
        label: "NWERC",
        href: "https://nwerc.eu",
        external: true,
      },
      ", a TA across half a dozen courses at ",
      links.au,
      ", and an exchange year in Argentina. I've covered a lot of ground — the common thread is that I'll always say yes to an interesting project.",
    ],
  ] satisfies RichText[],
  experience: [
    {
      year: "2025",
      segments: [
        { label: "skovlund.dev", href: "/projects/skovlund-dev" },
        " + ",
        { label: "personal infrastructure", href: "/projects/nix-config" },
        " via AI agents",
      ],
    },
    {
      year: "2023",
      segments: ["Software Engineer at ", links.dc],
    },
    {
      year: "2023",
      segments: ["MSc in Computer Science, ", links.au],
    },
    {
      year: "2020",
      segments: [
        "Software Consultant at ",
        {
          label: "IT Minds",
          href: "https://it-minds.dk",
          external: true,
        },
      ],
    },
    {
      year: "2019",
      segments: [
        "Studied trombone at ",
        {
          label: "Det Jyske Musikkonservatorium",
          href: "https://musikkons.dk",
          external: true,
        },
      ],
    },
    {
      year: "2018",
      segments: ["BSc in Computer Science, ", links.au],
    },
    {
      year: "2017",
      segments: [
        "Competitive programming at ",
        {
          label: "NWERC",
          href: "https://nwerc.eu",
          external: true,
        },
      ],
    },
    {
      year: "2016",
      segments: ["First semester as a TA at ", links.au],
    },
    {
      year: "2014",
      segments: ["MGK København — musical foundation course"],
    },
    {
      year: "2011",
      segments: ["Exchange year in Catamarca, Argentina"],
    },
    {
      year: "2004",
      segments: [
        "Joined ",
        {
          label: "Legoland Garden",
          href: "https://billundkultur.dk/musik/legoland-billund-garden/",
          external: true,
        },
      ],
    },
    {
      year: "1994",
      segments: ["Hello, world!"],
    },
  ] satisfies TimelineEntry[],
  music: [
    "I started on alto horn in ",
    {
      label: "Legoland Garden",
      href: "https://billundkultur.dk/musik/legoland-billund-garden/",
      external: true,
    },
    " at ten, switched to trombone, and never really stopped — ten years of touring Japan, the Netherlands, and half of Europe, mentoring the younger kids the way the older ones had mentored me. These days I play trombone, piano, and whatever else I can get my hands on — including DAWs for production. I've been part of ",
    links.nbb,
    ", a 17-piece jazz big band based in Aalborg, for years — and picked up a few recording credits along the way:",
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
        ' — modern jazz with Remy Le Boeuf and Danielle Wertz. "First Snow" won a Grammy® for Best Instrumental Composition in 2026.',
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
  { id: "rose-pine", label: "Rosé Pine", selectorColor: "#c4a7e7" },
  { id: "catppuccin", label: "Catppuccin", selectorColor: "#89b4fa" },
  { id: "kanagawa", label: "Kanagawa", selectorColor: "#7e9cd8" },
  { id: "everforest", label: "Everforest", selectorColor: "#7fbbb3" },
  { id: "dracula", label: "Dracula", selectorColor: "#bd93f9" },
  { id: "solarized", label: "Solarized", selectorColor: "#268bd2" },
  { id: "monokai", label: "Monokai", selectorColor: "#ff6188" },
  { id: "horizon", label: "Horizon", selectorColor: "#e95678" },
  { id: "night-owl", label: "Night Owl", selectorColor: "#82aaff" },
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
  author?: string;
  description: string;
};

export const shelf = {
  intro:
    "A semi-structured, non-exhaustive list of things I enjoy and recommend. I hope you discover something new here — and if you think I'm missing something, I'd love to hear about it.",
  sections: {
    reading: "Reading",
    music: "Music",
    film: "Film",
    tv: "TV",
    videoGames: "Video Games",
    boardGames: "Board Games",
    tools: "Tools",
    communities: "Projects & Communities",
    everything: "Everything Else",
  },
  reading: [
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
    {
      title: "Harry Potter",
      href: "https://www.goodreads.com/series/45175-harry-potter",
      author: "J.K. Rowling",
      description: "The series that made me a reader. Still holds up.",
    },
    {
      title: "The Hitchhiker's Guide to the Galaxy",
      href: "https://www.goodreads.com/series/40957-the-hitchhiker-s-guide-to-the-galaxy",
      author: "Douglas Adams",
      description:
        "The answer to life, the universe, and everything. Endlessly quotable.",
    },
    {
      title: "What If?",
      href: "https://www.goodreads.com/book/show/21413662-what-if",
      author: "Randall Munroe",
      description:
        "Serious scientific answers to absurd hypothetical questions. From the creator of xkcd.",
    },
    {
      title: "xkcd",
      href: "https://xkcd.com",
      author: "Randall Munroe",
      description:
        "A webcomic of romance, sarcasm, math, and language. You'll lose hours.",
    },
    {
      title: "1984",
      href: "https://www.goodreads.com/book/show/61439040-1984",
      author: "George Orwell",
      description:
        "More relevant every year. The kind of book that changes how you read the news.",
    },
    {
      title: "As We May Think",
      href: "https://www.theatlantic.com/magazine/archive/1945/07/as-we-may-think/303881/",
      author: "Vannevar Bush",
      description:
        "The 1945 essay that envisioned the memex — a device for linking and retrieving knowledge — decades before hypertext existed. The essay that inspired the web.",
    },
    {
      title: "Something Big is Happening",
      href: "https://shumer.dev/something-big-is-happening",
      author: "Matt Shumer",
      description:
        "Accessible overview of how fast AI is moving, what it means for everyone, and how to prepare. Worth reading whether you're technical or not.",
    },
  ] satisfies ShelfMedia[],
  music: [
    {
      title: "Snarky Puppy",
      href: "https://snarkypuppy.com",
      description:
        "Genre-defying collective that blurs the line between jazz, funk, and world music. Live albums are the move.",
    },
    {
      title: "Vulfpeck",
      href: "https://www.vulfpeck.com",
      description:
        "Minimalist funk that somehow keeps getting better. Theo Katzman and Cory Wong are unfairly talented.",
    },
    {
      title: "Jacob Collier",
      href: "https://www.jacobcollier.com",
      description:
        "Harmonic genius. The kind of musician that makes you question whether you actually understand music.",
    },
    {
      title: "Lizzy McAlpine",
      href: "https://www.lizzymcalpine.com",
      description:
        "Singer-songwriter with jazz sensibility. Quietly devastating.",
    },
    {
      title: "Cory Wong",
      href: "https://www.corywongmusic.com",
      description:
        "The hardest-working rhythm guitarist in funk. Also a Vulfpeck staple.",
    },
    {
      title: "Maria Schneider Orchestra",
      href: "https://www.mariaschneider.com",
      description:
        "Big band writing at its absolute finest. Grammy-winning composer who makes orchestras sound like landscapes.",
    },
    {
      title: "Danielle Wertz",
      href: "https://www.daniellewertz.com",
      description:
        "Jazz vocalist and arranger. Featured on Nordkraft Big Band's Silent Course.",
    },
    {
      title: "Remy Le Boeuf's Assembly of Shadows",
      href: "https://www.remyleboeuf.com",
      description:
        "Modern jazz with orchestral depth. Remy is also Nordkraft Big Band's chief conductor.",
    },
    {
      title: "Nordkraft Big Band",
      href: "https://nordkraftbigband.dk",
      description:
        "My big band. 17-piece jazz orchestra from Aalborg, Denmark. I'm biased but we sound great.",
    },
    {
      title: "Joe Hisaishi",
      href: "https://joehisaishi.com",
      description:
        "The composer behind every Studio Ghibli soundtrack. Phenomenal.",
    },
    {
      title: "Vanguard Jazz Orchestra",
      href: "https://www.vanguardjazzorchestra.com",
      description:
        "Monday nights at the Village Vanguard since 1966. The gold standard for big band jazz.",
    },
    {
      title: "Count Basie Orchestra",
      href: "https://thecountbasieorchestra.com",
      description:
        "The swinging-est big band in history. Played a lot of their charts in Randers Big Band growing up.",
    },
    {
      title: "DR Big Band",
      href: "https://drkoncerthuset.dk/dr-big-band/dr-big-band/",
      description:
        "The Danish Radio Big Band. World-class musicians playing everything from Ellington to electronic.",
    },
    {
      title: "Aarhus Jazz Orchestra",
      href: "https://www.aarhusjazzorchestra.dk",
      description:
        "Top-class productions with national and international guest soloists. Denmark punches way above its weight in jazz.",
    },
    {
      title: "Odense Jazz Orchestra",
      href: "https://odensejazzorchestra.dk",
      description: "Another reason Denmark punches above its weight.",
    },
  ] satisfies ShelfMedia[],
  film: [
    {
      title: "Interstellar",
      href: "https://www.imdb.com/title/tt0816692/",
      author: "Christopher Nolan",
      description: "The one Nolan film I'd save if I could only keep one.",
    },
    {
      title: "Inception",
      href: "https://www.imdb.com/title/tt1375666/",
      author: "Christopher Nolan",
      description: "Layers on layers. Still finding new details on rewatches.",
    },
    {
      title: "The Dark Knight",
      href: "https://www.imdb.com/title/tt0468569/",
      author: "Christopher Nolan",
      description: "The superhero movie that transcends the genre.",
    },
    {
      title: "Oppenheimer",
      href: "https://www.imdb.com/title/tt15398776/",
      author: "Christopher Nolan",
      description: "Three hours that feel like ninety minutes.",
    },
    {
      title: "The Matrix",
      href: "https://www.imdb.com/title/tt0133093/",
      author: "The Wachowskis",
      description: "Red pill. No explanation needed.",
    },
    {
      title: "The Lord of the Rings",
      href: "https://www.imdb.com/title/tt0120737/",
      author: "Peter Jackson",
      description: "The extended editions, obviously.",
    },
    {
      title: "Casino Royale",
      href: "https://www.imdb.com/title/tt0381061/",
      author: "Martin Campbell",
      description:
        "The greatest Bond movie. Daniel Craig's debut is perfect from start to finish.",
    },
    {
      title: "Gone Girl",
      href: "https://www.imdb.com/title/tt2267998/",
      author: "David Fincher",
      description: "The less you know going in, the better.",
    },
    {
      title: "Get Out",
      href: "https://www.imdb.com/title/tt5052448/",
      author: "Jordan Peele",
      description: "Horror that's actually about something. Brilliant debut.",
    },
    {
      title: "Knives Out",
      href: "https://www.imdb.com/title/tt8946378/",
      author: "Rian Johnson",
      description: "A whodunit that's just pure fun from start to finish.",
    },
    {
      title: "Jagten",
      href: "https://www.imdb.com/title/tt2106476/",
      author: "Thomas Vinterberg",
      description:
        "Mads Mikkelsen in a small-town nightmare. One of the best Danish films ever made.",
    },
    {
      title: "Druk",
      href: "https://www.imdb.com/title/tt10288566/",
      author: "Thomas Vinterberg",
      description:
        "Danish teachers test a theory about alcohol. Won the Oscar. Proud to be Danish.",
    },
    {
      title: "Adams Æbler",
      href: "https://www.imdb.com/title/tt0418455/",
      author: "Anders Thomas Jensen",
      description:
        "Dark Danish comedy about an optimistic priest and a neo-Nazi. ATJ is a genius — see also Blinkende Lygter and De Grønne Slagtere.",
    },
    {
      title: "Howl's Moving Castle",
      href: "https://www.imdb.com/title/tt0347149/",
      author: "Hayao Miyazaki",
      description:
        "Studio Ghibli at its most magical. The music is just as beautiful as the animation.",
    },
    {
      title: "Spirited Away",
      href: "https://www.imdb.com/title/tt0245429/",
      author: "Hayao Miyazaki",
      description:
        "The film that made the whole world pay attention to Ghibli.",
    },
    {
      title: "The Millennium Trilogy",
      href: "https://www.imdb.com/title/tt1132620/",
      author: "Niels Arden Oplev",
      description:
        "The Swedish film adaptations of Stieg Larsson's novels. Scandinavian crime fiction at its darkest.",
    },
  ] satisfies ShelfMedia[],
  tv: [
    {
      title: "Breaking Bad",
      href: "https://www.imdb.com/title/tt0903747/",
      description: "The best TV show ever made. No further comment.",
    },
    {
      title: "Better Call Saul",
      href: "https://www.imdb.com/title/tt3032476/",
      description: "Somehow a worthy prequel. Slow burn that pays off in full.",
    },
    {
      title: "Game of Thrones",
      href: "https://www.imdb.com/title/tt0944947/",
      description:
        "Everyone recommends it, and there's a reason. The ending is what it is, but the journey is extraordinary.",
    },
    {
      title: "Chernobyl",
      href: "https://www.imdb.com/title/tt7366338/",
      description: "Five episodes of dread. All true.",
    },
    {
      title: "Mr. Robot",
      href: "https://www.imdb.com/title/tt4158110/",
      description:
        "The most technically accurate hacking show. Also a psychological masterpiece.",
    },
    {
      title: "The Boys",
      href: "https://www.imdb.com/title/tt1190634/",
      description:
        "Superheroes if they were terrible people. Uncomfortably funny.",
    },
    {
      title: "Ozark",
      href: "https://www.imdb.com/title/tt5071412/",
      description: "Money laundering in the Ozarks. Bateman is phenomenal.",
    },
    {
      title: "The Last of Us",
      href: "https://www.imdb.com/title/tt3581920/",
      description:
        "One of the rare game-to-TV adaptations that actually works.",
    },
    {
      title: "Black Mirror",
      href: "https://www.imdb.com/title/tt2085059/",
      description:
        "Technology as horror. Some episodes stick with you for days.",
    },
    {
      title: "The Rings of Power",
      href: "https://www.imdb.com/title/tt7631058/",
      description:
        "Controversial, yes. I'm no Tolkien purist — the visuals alone are worth it.",
    },
    {
      title: "Broen",
      href: "https://www.imdb.com/title/tt1733785/",
      description:
        "Scandinavian noir at its best. The bridge between Denmark and Sweden, in every sense.",
    },
    {
      title: "Forbrydelsen",
      href: "https://www.imdb.com/title/tt0826760/",
      description:
        "The original Danish crime drama that inspired The Killing. Twenty episodes of not knowing who did it.",
    },
    {
      title: "Matador",
      href: "https://www.imdb.com/title/tt0077051/",
      description:
        "The Danish TV classic. Set in a small town from 1929 to 1947 — everyone in Denmark has seen it.",
    },
    {
      title: "Drengene fra Angora",
      href: "https://www.imdb.com/title/tt0396308/",
      description:
        "Danish sketch comedy at its most unhinged. See also: Angora by Night and Team Easy On.",
    },
    {
      title: "The Office",
      href: "https://www.imdb.com/title/tt0386676/",
      description: "That's what she said.",
    },
    {
      title: "Silicon Valley",
      href: "https://www.imdb.com/title/tt2575988/",
      description:
        "Painfully accurate satire of the tech industry. I've been in some of those meetings.",
    },
  ] satisfies ShelfMedia[],
  videoGames: [
    {
      title: "The Witcher 3: Wild Hunt",
      href: "https://www.thewitcher.com/us/en/witcher3",
      description:
        "The one RPG where I actually cared about the side quests more than the main story.",
    },
    {
      title: "Baldur's Gate 3",
      href: "https://baldursgate3.game",
      description:
        "Currently playing. D&D brought to life with an absurd level of polish.",
    },
    {
      title: "Rocket League",
      href: "https://www.rocketleague.com",
      description:
        "Cars playing football. Learning not to rage is a work in progress.",
    },
    {
      title: "The Legend of Zelda: Breath of the Wild",
      href: "https://zelda.nintendo.com",
      description:
        "Open-world done right. Every hill has something worth climbing for.",
    },
    {
      title: "Portal",
      href: "https://store.steampowered.com/app/400/Portal/",
      description: "Short, brilliant, and quotable. The cake is a lie.",
    },
    {
      title: "World of Warcraft",
      href: "https://worldofwarcraft.blizzard.com",
      description: "Where did the time go?",
    },
    {
      title: "Pokémon Emerald",
      description: "Peak Pokémon. Hoenn forever.",
    },
    {
      title: "ROM hacks",
      description:
        "A Pandora's box. If you know, you know — and if you don't, go explore.",
    },
  ] satisfies ShelfMedia[],
  boardGames: [
    {
      title: "Wingspan",
      href: "https://stonemaiergames.com/games/wingspan/",
      description:
        "Beautiful engine-building board game about birds. Surprisingly competitive.",
    },
    {
      title: "Codenames",
      href: "https://czechgames.com/en/codenames/",
      description: "The best party game. Simple rules, endless replayability.",
    },
    {
      title: "Exploding Kittens",
      href: "https://www.explodingkittens.com",
      description: "Chaotic card game that's impossible not to laugh at.",
    },
    {
      title: "The Quest for El Dorado",
      href: "https://www.ravensburger.us/en-US/products/games/family-games/the-quest-for-el-dorado-27456",
      description: "Deck-building meets racing. Easy to learn, hard to master.",
    },
    {
      title: "Ticket to Ride",
      href: "https://www.daysofwonder.com/game/ticket-to-ride/",
      description: "Collect trains, claim routes, betray your friends.",
    },
  ] satisfies ShelfMedia[],
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
      href: "https://github.com/anomalyco/opencode",
      description: [
        "Open-source terminal AI coding agent. Model-agnostic, fast, and well-designed.",
      ],
    },
    {
      title: "Neovim",
      href: "https://neovim.io",
      description: [
        "The editor I keep coming back to. Extensible, fast, keyboard-driven — not an operating system, and no ",
        {
          label: "RSI",
          href: "https://en.wikipedia.org/wiki/Repetitive_strain_injury",
          external: true,
        },
        " from the hotkeys. Your wrists will thank you. My config lives in ",
        links.nixConfig,
        ".",
      ],
    },
    {
      title: "Nix",
      href: "https://nixos.org",
      description: [
        "Declarative, reproducible builds and system configuration. Steep learning curve, massive payoff. My entire setup runs on it — see my ",
        links.nixConfig,
        ".",
      ],
    },
    {
      title: "Tailscale",
      href: "https://tailscale.com",
      description: [
        "Mesh VPN that just works. Makes self-hosting so much simpler — everything is private by default.",
      ],
    },
    {
      title: "Devbox",
      href: "https://www.jetify.com/devbox",
      description: [
        "Reproducible dev environments powered by Nix, without needing to learn Nix. I use it for every project.",
      ],
    },
    {
      title: "Git",
      href: "https://git-scm.com",
      description: [
        "The version control system. Hard to imagine building anything without it.",
      ],
    },
    {
      title: "fzf",
      href: "https://github.com/junegunn/fzf",
      description: [
        "Fuzzy finder for the terminal. Ctrl+R for command history will never be the same.",
      ],
    },
    {
      title: "tldr",
      href: "https://tldr.sh",
      description: [
        "Community-maintained man pages that actually get to the point.",
      ],
    },
    {
      title: "z",
      href: "https://github.com/rupa/z",
      description: [
        "Jump to frequently used directories. Type z foo and you're there. Tiny tool, huge time saver.",
      ],
    },
    {
      title: "Typst",
      href: "https://typst.app",
      description: [
        "Modern typesetting that's actually pleasant to use. For when LaTeX is overkill.",
      ],
    },
    {
      title: "LaTeX",
      href: "https://www.latex-project.org",
      description: [
        "The gold standard for academic typesetting. Steep learning curve, beautiful output. Typst is catching up fast.",
      ],
    },
    {
      title: "ZeroClaw",
      href: "https://github.com/zeroclaw-labs/zeroclaw",
      description: [
        "Autonomous AI assistant. I wouldn't recommend it yet — but I'm testing it on my ",
        { label: "VPS", href: "/projects/miles-vps" },
        " and it's promising.",
      ],
    },
  ] satisfies ShelfLink[],
  communities: [
    {
      title: "NixOS",
      href: "https://nixos.org",
      description: [
        "Declarative, reproducible Linux. See my ",
        links.nixConfig,
        " for how I manage everything.",
      ],
    },
    {
      title: "Advent of Code",
      href: "https://adventofcode.com",
      description: [
        "Annual programming puzzles in December. My kind of advent calendar. See my ",
        {
          label: "solutions",
          href: "https://github.com/tskovlund/adventofcode",
          external: true,
        },
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
    {
      title: "Project Euler",
      href: "https://projecteuler.net",
      description: [
        "Math-heavy programming challenges. The kind of problems where the brute-force solution takes a century to run.",
      ],
    },
    {
      title: "NWERC",
      href: "https://nwerc.eu",
      description: [
        "The Northwestern European Regional Contest. I competed for ",
        links.au,
        " in Bath and Eindhoven.",
      ],
    },
    {
      title: "Homebrew",
      href: "https://brew.sh",
      description: [
        "The missing package manager for macOS. Even as a Nix user, I still rely on it for GUI apps via casks.",
      ],
    },
    {
      title: "TÅGEKAMMERET",
      href: "https://tket.dk",
      description: [
        "The science student society at ",
        links.au,
        ". I was chairman. Great people, questionable amounts of beer.",
      ],
    },
  ] satisfies ShelfLink[],
  everythingElse: [
    {
      title: "LEGO",
      href: "https://www.lego.com",
      description:
        "From my home town. I have way too much and somehow still buy more.",
    },
    {
      title: "Hiking",
      description:
        "Canadian Rockies, Norwegian fjords, anywhere with elevation and Maud. My favourite way to spend a day.",
    },
    {
      title: "Running and cycling",
      description: "Outside when the weather allows, on Zwift when it doesn't.",
    },
    {
      title: "3Blue1Brown",
      href: "https://www.3blue1brown.com",
      description:
        "Math visualizations that make complex ideas feel intuitive. Genuinely worth your time.",
    },
    {
      title: "Flat whites, Danish pastries, and smørrebrød",
      description: "The holy trinity.",
    },
  ],
};
