import { useNavigate } from "react-router-dom";
import TopicPill from "./Topicpill";

import {
  Zap,
  Anchor,
  Server,
  Sparkles,
  Accessibility,
  GitBranch,
  Palette,
  Smartphone,
} from "lucide-react";

const iconMap = {
  Zap,
  Anchor,
  Server,
  Sparkles,
  Accessibility,
  GitBranch,
  Palette,
  Smartphone,
};

export default function ArticleCard({ article, featured = false }) {
  const navigate = useNavigate();
  const canNavigate = Boolean(article.slug);

  const handleClick = () => {
    if (canNavigate) {
      navigate(`/articles/${article.slug}`);
    }
  };

  const level = article.level ?? article.difficulty;
  const authorRole = article.authorRole ?? article.role;

  const iconAccent =
    article.iconBg ?? article.color ?? "from-violet-500 to-fuchsia-600";

  // ✅ FIXED ICON LOGIC
  const Icon = iconMap[article.icon];

  const authorAvatar =
    article.authorAvatar ??
    article.author
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);

  // =========================
  // FEATURED CARD
  // =========================
  if (featured) {
    return (
      <div
        onClick={handleClick}
        className={`group relative bg-[#111120] border border-white/8 rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/30 ${
          canNavigate ? "cursor-pointer hover:border-white/15" : ""
        }`}
      >
        {/* Glow */}
        <div
          className={`absolute -top-8 -right-8 w-32 h-32 bg-linear-to-br ${iconAccent} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-11 h-11 rounded-xl bg-linear-to-br ${iconAccent} flex items-center justify-center shadow-lg`}
          >
            {Icon && <Icon className="w-5 h-5 text-white" />}
          </div>

          <span className="text-xs text-white/40 border border-white/10 rounded-full px-2.5 py-1 font-medium">
            {level}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-violet-200 transition-colors">
          {article.title}
        </h3>

        <p className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-2">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center text-xs text-white font-bold">
              {authorAvatar}
            </div>

            <div>
              <p className="text-white/70 text-xs font-medium leading-none">
                {article.author}
              </p>
              <p className="text-white/30 text-xs mt-0.5">{authorRole}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/30">
            <div className="flex items-center gap-1 text-xs">
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
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // LIST CARD
  // =========================
  return (
    <div
      onClick={handleClick}
      className={`group flex items-center gap-4 p-4 rounded-xl border border-transparent transition-all duration-200 ${
        canNavigate
          ? "cursor-pointer hover:bg-white/3 hover:border-white/8"
          : ""
      }`}
    >
      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-xl bg-linear-to-br ${iconAccent} flex items-center justify-center shrink-0`}
      >
        {Icon && <Icon className="w-4 h-4 text-white" />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white/85 text-sm font-semibold group-hover:text-white transition-colors truncate">
          {article.title}
        </h4>

        <p className="text-white/35 text-xs mt-0.5">{article.author}</p>

        <div className="flex gap-1.5 mt-2 flex-wrap">
          {article.tags.map((tag) => (
            <TopicPill key={tag} label={tag} small />
          ))}
        </div>
      </div>

      {/* Arrow */}
      <svg
        className="w-4 h-4 text-white/20 group-hover:text-white/40 shrink-0 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}
