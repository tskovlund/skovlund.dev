import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE } from "@consts";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function readingTime(html: string): string {
  const textOnly: string = html.replace(/<[^>]+>/g, "");
  const wordCount: number = textOnly.split(/\s+/).length;
  const readingTimeMinutes: string = (
    wordCount / SITE.AVERAGE_WORDS_PER_MINUTE +
    1
  ).toFixed();
  return `${readingTimeMinutes} min read`;
}
