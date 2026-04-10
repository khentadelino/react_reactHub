import { useState } from "react";
import { Check, Copy, CirclePlay, Loader2 } from "lucide-react";
function highlight(code) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/(\/\/[^\n]*)/g, '<span class="text-white/30 italic">$1</span>')
    .replace(
      /\b(function|const|return|import|export|default|from|let|var|class|new|if|else|for|while|async|await)\b/g,
      '<span class="text-violet-400 font-semibold">$1</span>',
    )
    .replace(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      '<span class="text-emerald-400">$1</span>',
    )
    .replace(
      /\b([A-Z][a-zA-Z]*)\b/g,
      '<span class="text-yellow-300">$1</span>',
    );
}

export default function CodePreview({
  title = "jsx",
  code,
  interactive = false,
}) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 1500);
  };

  return (
    <div className="bg-[#0d0d18] border border-white/8 rounded-2xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#111122]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-white/30 font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {interactive && (
            <button
              onClick={handleRun}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
              title="Run"
            >
              {running ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CirclePlay className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
            title="Copy"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <pre className="p-5 text-xs font-mono leading-relaxed text-white/70 overflow-x-auto">
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </div>
  );
}
