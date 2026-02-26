import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE } from "@consts";

export function classNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const MINIMUM_READING_TIME_MINUTES = 1;

export function readingTime(html: string): string {
  let textOnly: string = html;
  while (/<[^>]+>/.test(textOnly)) {
    textOnly = textOnly.replace(/<[^>]+>/g, "");
  }
  const wordCount: number = textOnly.split(/\s+/).length;
  const readingTimeMinutes: string = (
    wordCount / SITE.AVERAGE_WORDS_PER_MINUTE +
    MINIMUM_READING_TIME_MINUTES
  ).toFixed();
  return `${readingTimeMinutes} min read`;
}
