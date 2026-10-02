"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070d] py-14 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06] items-start">
          {/* Left Column: Stacked Primary Brand Logo & Bio */}
          <div className="md:col-span-6 flex flex-col items-start gap-4">
            <div className="w-auto">
              <a href="#" className="inline-block transition-transform duration-200 hover:scale-105">
                <img
                  src="/brand/aditya-logo-tight.png"
                  alt="Aditya — Software Engineer"
                  className="h-20 md:h-24 w-auto object-contain rounded-xl drop-shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                />
              </a>
            </div>
            <p className="text-white/50 text-xs leading-relaxed max-w-sm">
              Architecting production-ready backend microservices, distributed chunked storage engines, and enterprise Applied AI intelligence platforms.
            </p>
          </div>

          {/* Middle Column: Quick Section Navigation */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-3 font-semibold">
              Navigation
            </p>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a href="#projects" className="text-white/60 hover:text-accent transition-colors">
                  Projects &amp; Deployments
                </a>
              </li>
              <li>
                <a href="#architecture" className="text-white/60 hover:text-accent transition-colors">
                  System Architecture
                </a>
              </li>
              <li>
                <a href="#skills" className="text-white/60 hover:text-accent transition-colors">
                  Technical Stack
                </a>
              </li>
              <li>
                <a href="#experience" className="text-white/60 hover:text-accent transition-colors">
                  Engineering Roles
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-accent transition-colors">
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Connect & Socials */}
          <div className="md:col-span-3">
            <p className="font-mono text-[11px] text-white/40 uppercase tracking-widest mb-3 font-semibold">
              Connect
            </p>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://github.com/archaditya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <span className="text-[10px] text-white/30">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/akkpk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px] text-white/30">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/archadi_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>X (Twitter)</span>
                  <span className="text-[10px] text-white/30">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.pushpostvault.com/s/111d33ec-35ef-49b9-8991-946407df92cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline flex items-center gap-1.5 font-semibold"
                >
                  <span>Download Resume</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/30">
          <p>archadi.dev © {new Date().getFullYear()} Aditya Kumar Kushwaha. All rights reserved.</p>
          <p className="text-[11px]">Built with Next.js, Go, TypeScript &amp; Tailored Brand Kit</p>
        </div>
      </div>
    </footer>
  );
}
