import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { SITE } from "@consts";
import { readingTimeTemplate } from "@i18n/en";

export function classNames(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const MINIMUM_READING_TIME_MINUTES = 1;

// Content layer entries expose an optional body, so callers can pass undefined
// for entries that carry no rendered content.
export function readingTime(html: string | undefined): string {
  const textOnly: string = (html ?? "").replace(/<[^>]+>/g, "");
  const wordCount: number = textOnly.split(/\s+/).length;
  const readingTimeMinutes: string = (
    wordCount / SITE.AVERAGE_WORDS_PER_MINUTE +
    MINIMUM_READING_TIME_MINUTES
  ).toFixed();
  return readingTimeTemplate(readingTimeMinutes);
}
