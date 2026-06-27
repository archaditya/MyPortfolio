import Navigation from "@/components/layout/Navigation";
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
      {/* Noise texture */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navigation />

      <main>
        <Hero />

        <div className="section-divider" />
        <Skills />

        <div className="section-divider" />
        <Projects />

        <div className="section-divider" />
        <Architecture />

        {/* <div className="section-divider" />
        <Experience /> */}
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
