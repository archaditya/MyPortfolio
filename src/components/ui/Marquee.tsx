"use client";

// Infinite horizontal ticker. Duplicates children once so the loop is seamless.
export default function Marquee({
  items,
  reverse = false,
  speed = 32,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-mono text-sm text-white/25 whitespace-nowrap">{item}</span>
          <span className="text-accent/40">/</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-4">
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080808] to-transparent" />
    </div>
  );
}
