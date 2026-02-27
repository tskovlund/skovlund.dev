import type { ThemeColor } from "@types";
import { CodeXml, Bot, Server, Music, Dna } from "@lucide/astro";

export const LUCIDE_ICONS: Record<string, typeof CodeXml> = {
  "code-xml": CodeXml,
  bot: Bot,
  server: Server,
  music: Music,
  dna: Dna,
};

export const THEME_COLOR_CLASSES: Record<ThemeColor, string> = {
  accent: "text-light-accent dark:text-dark-accent",
  warm: "text-light-warm dark:text-dark-warm",
  green: "text-light-green dark:text-dark-green",
  orange: "text-light-orange dark:text-dark-orange",
  cyan: "text-light-cyan dark:text-dark-cyan",
  red: "text-light-red dark:text-dark-red",
  yellow: "text-light-yellow dark:text-dark-yellow",
};
