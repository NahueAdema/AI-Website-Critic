"use client";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/6 backdrop-blur-sm bg-[#080b0f]/80">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-linear-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#080b0f"
            strokeWidth="2.5"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <span className="font-bold text-sm tracking-wide text-white">
          Web<span className="text-emerald-400">Critic</span>
        </span>
      </div>
      <span className="font-mono text-[11px] text-slate-700 tracking-widest hidden md:block">
        v2.0 · Powered by Groq
      </span>
    </header>
  );
}
