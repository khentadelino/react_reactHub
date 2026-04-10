import { useState } from "react";

const EXAMPLES = [
  {
    id: "memoization",
    title: "Auto Memoization",
    tag: "React 19",
    code: `// React 19: Automatic Memoization
function ExpensiveComponent({ data }) {
  // No useMemo needed
  const processed = heavyComputation(data);

  return <View data={processed} />;
}`,
  },
  {
    id: "server-action",
    title: "Server Action",
    tag: "RSC",
    code: `// Server Action in Next.js 14+
async function submitForm(formData) {
  'use server';

  const name = formData.get('name');
  await db.users.create({ name });
  revalidatePath('/users');
}

export default function Form() {
  return (
    <form action={submitForm}>
      <input name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}`,
  },
  {
    id: "custom-hook",
    title: "Custom Hook",
    tag: "Hooks",
    code: `// Custom hook for data fetching
function useArticles(topic) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles(topic)
      .then(setData)
      .finally(() => setLoading(false));
  }, [topic]);

  return { data, loading };
}`,
  },
  {
    id: "fiber",
    title: "Concurrent Feature",
    tag: "Fiber",
    code: `// Using startTransition for non-urgent updates
import { startTransition, useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value);

    startTransition(() => {
      setResults(search(e.target.value));
    });
  }

  return <input onChange={handleChange} value={query} />;
}`,
  },
];

export default function Playground() {
  const [active, setActive] = useState(EXAMPLES[0]);
  const [userCode, setUserCode] = useState(EXAMPLES[0].code);
  const [output, setOutput] = useState("");

  const handleSelect = (example) => {
    setActive(example);
    setUserCode(example.code);
    setOutput("");
  };

  const handleRun = () => {
    setOutput(
      "Compiled successfully. No errors detected.\n\nPreview output would render here in a full runtime environment.",
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white mb-1">
          Interactive Playground
        </h1>
        <p className="text-white/40 text-sm">
          Explore and edit React code examples
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-3">
            Examples
          </p>
          {EXAMPLES.map((example) => (
            <button
              key={example.id}
              onClick={() => handleSelect(example)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                active.id === example.id
                  ? "bg-violet-600/15 border-violet-500/30 text-white"
                  : "bg-[#111120] border-white/8 text-white/50 hover:border-white/15 hover:text-white/70"
              }`}
            >
              <p className="text-sm font-semibold">{example.title}</p>
              <span className="text-xs text-violet-400/70">{example.tag}</span>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-[#0d0d18] border border-white/8 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111122]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-white/30 font-mono">
                  jsx / {active.title}
                </span>
              </div>
              <button
                onClick={handleRun}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
                Run
              </button>
            </div>
            <textarea
              value={userCode}
              onChange={(event) => setUserCode(event.target.value)}
              spellCheck={false}
              className="w-full bg-transparent p-5 text-xs font-mono text-white/70 leading-relaxed outline-none resize-none h-64 focus:text-white/85 transition-colors"
            />
          </div>

          <div className="bg-[#0d0d18] border border-white/8 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-white/5 bg-[#111122] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-white/30 font-mono">Output</span>
            </div>
            <div className="p-5 min-h-20">
              {output ? (
                <pre className="text-xs font-mono text-green-400/80 leading-relaxed">
                  {output}
                </pre>
              ) : (
                <p className="text-white/20 text-xs italic">
                  Click "Run" to simulate the code output.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
