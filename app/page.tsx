import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import global from "@/styles/global.css";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}