import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function TopNav() {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { pathname } = useLocation();

  // 🔥 Dynamic titles
  const titles = {
    "/": "Dashboard",
    "/articles": "Articles",
    "/playground": "Playground",
    "/about": "About",
  };

  // Handle dynamic routes (like /articles/react-hooks)
  const getTitle = () => {
    if (pathname.startsWith("/articles")) return "Articles";
    if (pathname.startsWith("/playground")) return "Playground";
    return titles[pathname] || "Dashboard";
  };

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#0d0d14]/80 backdrop-blur-xl sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-lg tracking-tight">
          {getTitle()} {/* ✅ Dynamic title */}
        </span>

        <span className="text-xs text-white/40 border border-white/10 rounded-full px-2 py-0.5 font-mono">
          v18.3.0
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex items-center">
          {showSearch ? (
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                setShowSearch(false);
                setSearch("");
              }}
              placeholder="Search articles..."
              className="w-48 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder-white/30 outline-none focus:border-violet-500/50 transition-all"
            />
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/40 hover:text-white/60 transition-all group"
            >
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z"
                />
              </svg>
              <span className="hidden sm:block">Search...</span>
              <kbd className="hidden sm:block text-xs bg-white/10 rounded px-1 font-mono">
                Ctrl K
              </kbd>
            </button>
          )}
        </div>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-all">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
        </button>

        {/* Avatar */}
        <button className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-violet-500/20">
          JD
        </button>
      </div>
    </header>
  );
}
