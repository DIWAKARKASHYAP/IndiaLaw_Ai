 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 px-4 py-2 md:px-6">
      <nav
        className={`mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 transition-all duration-300 md:px-7 ${
          isScrolled
            ? "rounded-2xl border border-white/40 bg-white/55 shadow-lg shadow-slate-900/10 backdrop-blur-xl"
            : "rounded-none border-b border-slate-200/70 bg-white/90 backdrop-blur-0"
        }`}
      >
        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">NyayaAI</h1>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg border border-slate-300 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Home
          </Link>
          <Link
            href="/assistant"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Open Assistant
          </Link>
        </div>
      </nav>
    </header>
  );
}