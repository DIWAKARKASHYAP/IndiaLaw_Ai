import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">

      <h1 className="text-6xl font-bold max-w-4xl">
        Understand Indian Law with AI
      </h1>

      <p className="mt-6 text-gray-600 text-lg max-w-2xl">
        Ask legal questions and analyze legal documents
        using AI-powered legal search.
      </p>

      <Link
        href="/assistant"
        className="mt-8 bg-black text-white px-6 py-3 rounded-xl"
      >
        Get Started
      </Link>
    </section>
  );
}