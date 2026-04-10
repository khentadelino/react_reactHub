import { useMemo, useState } from "react";
import ArticleCard from "../components/Articlecard";
import { articles } from "../utils/articleData";
import { SlidersHorizontal } from "lucide-react";

export default function Articles() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [level, setLevel] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();

    return articles.filter((article) => {
      const matchSearch =
        !search ||
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query);

      const matchTag =
        !activeTag ||
        article.tags.includes(activeTag) ||
        article.category === activeTag;

      const matchLevel = level === "All" || article.level === level;

      return matchSearch && matchTag && matchLevel;
    });
  }, [search, activeTag, level]);

  const hasFilters = search || activeTag || level !== "All";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-black mb-1">All Articles</h1>
        <p className="text-white/40 text-sm">
          {articles.length} articles by expert React authors
        </p>
      </div>

      {/* SEARCH + FILTER TOGGLE */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* SEARCH */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles or authors..."
            className="w-full bg-[#111120] border border-white/10 rounded-xl pl-9 pr-10 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:border-violet-500/50 transition"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* FILTER TOGGLE BUTTON */}
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl bg-violet-600 border border-violet-500 text-white hover:bg-violet-500 transition"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* FILTER BY TOPIC */}
      {showFilters && (
        <div className="mb-6 bg-violet-400/10 border border-violet-500/20 rounded-xl p-6">
          <h2 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
            Filter By Topic
          </h2>

          <div className="flex flex-wrap gap-2">
            {/* ALL */}
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition ${
                activeTag === null
                  ? "bg-violet-500 text-white border-violet-400"
                  : "bg-[#111120] text-white/60 border-white/10 hover:text-white"
              }`}
            >
              All
            </button>

            {/* TOPICS */}
            {[
              "Styling",
              "Internals",
              "React Native",
              "Hooks",
              "Server Components",
              "New Features",
              "Accessibility",
              "State Management",
            ].map((label) => (
              <button
                key={label}
                onClick={() => setActiveTag(activeTag === label ? null : label)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition ${
                  activeTag === label
                    ? "bg-violet-500 text-white border-violet-400"
                    : "bg-[#111120] text-white/60 border-white/10 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS INFO */}
      {hasFilters && (
        <p className="text-white/30 text-xs mb-4">
          {filtered.length} result{filtered.length !== 1 && "s"} found
          {activeTag && (
            <>
              {" "}
              for <span className="text-violet-400">{activeTag}</span>
            </>
          )}
        </p>
      )}

      {/* CONTENT */}
      {/* CONTENT */}
      {filtered.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((article) => (
            <div key={article.id} className="break-inside-avoid mb-5">
              <ArticleCard article={article} featured />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-white/30">
          <div className="text-sm font-black tracking-[0.3em] text-violet-400 mb-3">
            EMPTY
          </div>

          <p className="font-semibold">No articles found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>

          <button
            onClick={() => {
              setSearch("");
              setActiveTag(null);
              setLevel("All");
            }}
            className="mt-4 text-violet-400 text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
