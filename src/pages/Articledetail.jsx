import { useNavigate, useParams } from "react-router-dom";
import TopicPill from "../components/Topicpill";
import { findArticleBySlug } from "../utils/articleData";

export default function ArticleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = findArticleBySlug(slug);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-white/40">
        <div className="text-sm font-black tracking-[0.3em] text-violet-400 mb-4">
          404
        </div>
        <p className="font-semibold text-white">Article not found</p>
        <button
          onClick={() => navigate("/articles")}
          className="mt-4 text-violet-400 text-sm hover:underline"
        >
          Back to articles
        </button>
      </div>
    );
  }

  const paragraphs = article.content?.split("\n\n") || [];
  const tags = article.tags || [];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#12102a] to-[#080810] px-6 pt-10 pb-12">
        <div className="absolute inset-0">
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-br ${article.iconBg} opacity-10 blur-3xl`}
          />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${article.iconBg} flex items-center justify-center text-sm font-bold text-white`}
            >
              {typeof article.icon === "string"
                ? article.icon.slice(0, 2)
                : "AI"}
            </div>

            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <TopicPill key={tag} label={tag} />
              ))}
            </div>
          </div>

          <h1 className="text-3xl font-black text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <p className="text-white/50 text-base leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-xs font-bold text-white">
                {article.author
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <p className="text-white font-semibold text-sm">
                  {article.author}
                </p>
                <p className="text-white/40 text-xs">
                  {article.role || "Author"}
                </p>
              </div>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-1 text-white/40 text-xs">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {article.readTime}
            </div>

            <div className="text-white/40 text-xs">
              {article.publishedAt
                ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No date"}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className="text-white/70 text-base leading-8 mb-5">
            {paragraph}
          </p>
        ))}

        {/* TAKEAWAYS */}
        <div className="mt-8 p-5 bg-[#111120] border border-white/8 rounded-2xl">
          <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wider text-white/40">
            Key Takeaways
          </h3>

          <ul className="space-y-2">
            {[
              "Understanding the core concepts",
              "Practical application in real projects",
              "Performance implications and trade-offs",
              "Future-proof patterns",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-white/60 text-sm"
              >
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FOOTER NAV */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/8">
          <button
            onClick={() => navigate("/articles")}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            All Articles
          </button>

          <button
            type="button"
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
          >
            Share Article
          </button>
        </div>
      </div>
    </div>
  );
}
