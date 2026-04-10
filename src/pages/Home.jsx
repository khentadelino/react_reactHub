import { useNavigate } from "react-router-dom";
import ArticleCard from "../components/Articlecard";
import CodePreview from "../components/Codepreview";
import { articles } from "../utils/articleData";
import {
  FileText,
  Users,
  Tag,
  Star,
  Zap,
  TrendingUp,
  MoveRight,
} from "lucide-react";

const featured = articles.filter((article) => article.level === "Advanced");
const recent = [...articles]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);
const codeSpotlight =
  featured[0] ?? articles.find((article) => article.codeSnippet) ?? articles[0];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet via-violet to-violet border border-white/8 p-8 min-h-50 flex flex-col justify-between">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-400 text-[11px] font-black tracking-[0.25em]">
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-yellow-400/80 text-xs font-medium">
              React articles, patterns, and internals
            </span>
          </div>
          <h1 className="text-4xl font-black text-white mb-3 tracking-tight leading-none">
            Master Modern React
          </h1>
          <p className="text-white/50 text-sm max-w-md leading-relaxed mb-6">
            Deep dives into React internals, hooks, patterns, and the ecosystem.
            Written by core team members and industry experts.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/articles")}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-violet-500/25 active:scale-95"
            >
              Explore Articles
              <MoveRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/playground")}
              className="flex items-center gap-2 bg-white/8 hover:bg-white/12 text-white text-sm font-semibold px-5 py-2.5 rounded-xl border border-white/10 transition-all active:scale-95"
            >
              Try Playground
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { value: "50+", label: "Articles", icon: <FileText /> },
          { value: "12", label: "Authors", icon: <Users /> },
          { value: "8", label: "Topics", icon: <Tag /> },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111120] border border-white/8 rounded-2xl p-5 flex flex-col items-center gap-2"
          >
            {/* 🔥 ICON */}
            <div className="text-violet-400">{stat.icon}</div>

            {/* VALUE */}
            <span className="text-3xl font-black text-white">{stat.value}</span>

            {/* LABEL */}
            <span className="text-white/40 text-xs">{stat.label}</span>
          </div>
        ))}
      </div>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-400 text-[11px] font-black tracking-[0.25em]">
            <Star className="w-5 h-5" />
          </span>
          <h2 className="text-white font-bold text-base">
            Featured Deep Dives
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.map((article) => (
            <ArticleCard key={article.id} article={article} featured />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-400 text-[11px] font-black tracking-[0.25em]">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-white font-bold text-base">
              Recently Published
            </h2>
          </div>
          <div className="bg-[#111120] border border-white/8 rounded-2xl divide-y divide-white/5 overflow-hidden">
            {recent.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-white font-bold text-base">Code Spotlight</h2>
          </div>
          <CodePreview
            title={codeSpotlight.category}
            code={codeSpotlight.codeSnippet}
            interactive
          />
        </section>
      </div>
    </div>
  );
}
