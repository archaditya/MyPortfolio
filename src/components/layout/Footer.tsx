export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-accent flex items-center justify-center text-[10px] font-bold text-white">
            A
          </span>
          <span className="font-mono text-xs text-white/30">
            archadi.dev © {new Date().getFullYear()} Aditya Kumar Kushwaha
          </span>
        </div>
        <p className="font-mono text-xs text-white/25 text-center">
          Backend Engineer focused on scalable APIs, distributed systems and
          production infrastructure.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/archaditya"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            GitHub
          </a>
          <span className="text-white/10">·</span>
          <a
            href="https://linkedin.com/in/adityakumarkushwaha"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-white/10">·</span>
          <a
            href="https://x.com/archadi_dev"
            className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            x
          </a>
          <span className="text-white/10">·</span>
          <a
            href="https://drive.google.com/file/d/1e0LWmP6fZJR0JXdFsc_sk_UfCMZpT2vH/view?pli=1"
            className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
