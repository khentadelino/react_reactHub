import { articles } from "../utils/articleData";
import { MapPin, Calendar, Mail } from "lucide-react";
export default function About() {
  // Build contributors directly from articles JSON (deduplicated)
  const contributors = Array.from(
    new Map(
      articles.map((article) => [
        article.author,
        {
          name: article.author,
          role: article.role,
        },
      ]),
    ).values(),
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-10">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="relative space-y-6">
          {/* TOP ROW: LOGO + TEXT */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-xl font-black shadow-lg shadow-violet-500/20 text-white">
              R
            </div>

            <div>
              <h1 className="text-2xl font-black text-white">ReactHub</h1>
              <p className="text-white/50 text-sm">
                Advanced React Learning Platform
              </p>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Articles", value: "50+" },
              { label: "Contributors", value: "12" },
              { label: "Readers", value: "10K" },
              { label: "Since", value: "2024" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#0f0f1c] border border-white/8 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-black text-white">
                  {item.value}
                </div>
                <div className="text-xs text-white/40 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section>
        <h2 className="text-white font-bold text-lg mb-4">About</h2>

        <div className="space-y-4 text-white/60 leading-relaxed text-sm">
          <p>
            ReactHub is a curated platform for learning advanced React concepts.
            We collaborate with React core team members and industry experts to
            bring you in-depth tutorials, real-world patterns, and insider
            knowledge from across the React ecosystem.
          </p>

          <p>
            Whether you're mastering hooks, exploring concurrent features, or
            building production-ready applications, our content is designed to
            accelerate your journey from intermediate to expert React developer.
          </p>
        </div>
      </section>

      {/* CONTRIBUTORS (NOW FROM JSON) */}
      <section>
        <h2 className="text-white font-bold text-lg mb-4">Contributors</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {contributors.slice(0, 4).map((author, index) => {
            const gradients = [
              "from-violet-500 to-purple-700",
              "from-teal-500 to-cyan-700",
              "from-blue-500 to-indigo-700",
              "from-orange-500 to-red-700",
            ];

            return (
              <div
                key={author.name}
                className="bg-[#111120] border border-white/8 rounded-xl p-5 flex flex-col items-center text-center gap-3"
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {author.name}
                  </h3>
                  <p className="text-violet-400/70 text-xs">{author.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <section className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-6">
        <h2 className="text-white font-bold text-lg mb-4">Get in Touch</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300 text-sm">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-violet-400 shrink-0" />
            <span>hello@reacthub.dev</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-violet-400 shrink-0" />
            <span>San Francisco, CA</span>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-violet-400 shrink-0" />
            <span>Mon–Fri, 9am–6pm PST</span>
          </div>
        </div>
      </section>
    </div>
  );
}
