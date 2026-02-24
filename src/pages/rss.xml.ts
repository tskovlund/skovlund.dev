import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, HOME } from "@consts";

type RssContext = {
  site: string;
};

export async function GET(context: RssContext): Promise<Response> {
  const blog = (await getCollection("blog")).filter((post) => !post.data.draft);

  const projects = (await getCollection("projects")).filter(
    (project) => !project.data.draft && project.data.featured,
  );

  const items = [...blog, ...projects].sort(
    (first, second) =>
      new Date(second.data.date).valueOf() -
      new Date(first.data.date).valueOf(),
  );

  return rss({
    title: SITE.NAME,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
  });
}
