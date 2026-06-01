import ChatBox from "@/components/ChatBox";
import Navbar from "@/components/Navbar";

export default function AssistantPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 pb-8 text-slate-900 md:px-8 md:pb-12">
      <Navbar />
      <div className="mx-auto mt-3 w-full max-w-6xl">
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur md:mb-10 md:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-100/60 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-100/60 blur-2xl" />

          <span className="relative inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            NyayaAI Assistant
          </span>
          <h1 className="relative mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Legal Assistant
          </h1>
          <p className="relative mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Ask questions about Indian law and get clear, structured guidance.
          </p>
        </div>

        <ChatBox />
      </div>
    </main>
  );
}