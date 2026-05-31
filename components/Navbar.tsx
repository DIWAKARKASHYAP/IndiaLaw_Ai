import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 border-b ">
      <h1 className="text-2xl font-bold">
        NyayaAI
      </h1>

      <Link
        href="/assistant"
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        Get Started
      </Link>
    </nav>
  );
}