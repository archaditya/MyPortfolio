import Navigation from "@/components/layout/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Philosophy from "@/components/sections/Philosophy";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Architecture from "@/components/sections/Architecture";
import Experience from "@/components/sections/Experience";
import Metrics from "@/components/sections/Metrics";
import Writing from "@/components/sections/Writing";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Persistent background mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(59,130,246,0.10), transparent 40%), radial-gradient(circle at 85% 30%, rgba(168,85,247,0.08), transparent 40%), radial-gradient(circle at 50% 90%, rgba(59,130,246,0.06), transparent 45%)",
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />
      <CustomCursor />

      {/* Top Navigation */}
      <Navigation />

      <main className="w-full">
        <Hero />

        <div className="section-divider" />
        <Skills />

        <div className="section-divider" />
        <Projects />

        <div className="section-divider" />
        <Architecture />

        <div className="section-divider" />
        <Experience />

        <div className="section-divider" />
        <Philosophy />

        <Metrics />

        <div className="section-divider" />
        <Writing />

        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
