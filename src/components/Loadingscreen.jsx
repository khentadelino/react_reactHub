import { HashLoader } from "react-spinners";

export default function Loadingscreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-linear-to-br from-slate-50 to-slate-100 px-6">
      {/* Branding */}
      <div className="space-y-3 text-center animate-pulse">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-blue-600">
          BusinessBlog
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Loading your insights...
        </h1>

        <p className="text-sm text-slate-500">
          Please wait while we prepare your data
        </p>
      </div>

      {/* Spinner */}
      <div className="flex items-center justify-center">
        <HashLoader color="#2563eb" size={50} speedMultiplier={0.9} />
      </div>
    </div>
  );
}
