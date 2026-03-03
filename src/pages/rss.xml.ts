import { getCollection } from "astro:content";

import rss from "@astrojs/rss";
import { HOME, SITE } from "@consts";

type RssContext = {
  site: string;
};

export async function GET(context: RssContext): Promise<Response> {
  const posts = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort(
      (first, second) =>
        new Date(second.data.date).valueOf() -
        new Date(first.data.date).valueOf(),
    );

  return rss({
    title: SITE.NAME,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.slug}/`,
    })),
  });
}
