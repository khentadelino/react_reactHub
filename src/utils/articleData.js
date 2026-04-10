import rawArticles from "../data/reactBlogs.json";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getArticleSlug(article) {
  return article.slug ?? slugify(article.title);
}

export const articles = rawArticles.map((article) => ({
  ...article,
  slug: getArticleSlug(article),
  level: article.level ?? article.difficulty ?? "Intermediate",
  authorRole: article.authorRole ?? article.role ?? "Contributor",
  iconBg: article.iconBg ?? article.color ?? "from-violet-500 to-fuchsia-600",
  authorAvatar:
    article.authorAvatar ??
    article.author
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2),
  publishedAt: article.publishedAt ?? article.date,
  content:
    article.content ??
    `${article.excerpt}\n\nThis article is part of the ReactHub demo content. Add the full article body here whenever you are ready.`,
}));

export const topics = [...new Set(articles.flatMap((article) => article.tags))];

export const stats = {
  articles: articles.length,
  authors: new Set(articles.map((article) => article.author)).size,
  topics: topics.length,
};

export function findArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}
