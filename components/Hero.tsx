import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pb-8 pt-16 text-center md:px-8 md:pt-24">
      <span className="rounded-full border border-slate-300 bg-white px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-700">
        AI-powered legal guidance
      </span>

      <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-balance md:text-6xl">
        Understand Indian Law
        <span className="block text-slate-600">in simple language</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
        Ask legal questions, upload legal documents, and get structured
        law-focused responses backed by Indian legal context.
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
        Built for students, working professionals, and first-time users who want
        quick legal clarity before speaking to a lawyer.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link
          href="/assistant"
          className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Start Asking
        </Link>
        <Link
          href="/assistant"
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Upload Document
        </Link>
      </div>

      <div className="mt-10 grid w-full max-w-4xl gap-3 text-left sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Explain laws
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Understand Acts and sections in simple language.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Document support
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Upload legal PDFs and extract important text quickly.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Practical next steps
          </p>
          <p className="mt-1 text-sm text-slate-700">
            Get guidance with clear disclaimers, not final legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}