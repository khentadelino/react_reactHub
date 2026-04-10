import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
      <div className="text-sm font-black tracking-[0.35em] text-violet-400 mb-4">
        404
      </div>
      <h1 className="text-2xl font-black text-white mb-2">Page Not Found</h1>
      <p className="text-white/40 text-sm mb-6 max-w-md">
        This route does not exist yet, or the URL is incorrect.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
      >
        Back to Home
      </button>
    </div>
  );
}
