import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HomeInfo from "@/components/HomeInfo";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <HomeInfo />
    </main>
  );
}