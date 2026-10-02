# Portfolio — round 4: actual skeleton redesign

This is the one you asked for: the page structure itself changed, not just the hero. Content
(project descriptions, skills, experience, links) is untouched — it's the same information, in a
different shell. `tsc --noEmit` passes, no dependencies added.

## The skeleton is different now

**Navigation moved off the top of the page entirely.** On desktop (`lg` and up), there's no top
navbar anymore — instead `SideDock.tsx` is a fixed vertical rail on the left: logo, then a numbered
dot for every section (`00`-`06`) that highlights automatically as you scroll (via
`IntersectionObserver`, not scroll-position math), then your real GitHub/LinkedIn/X/email icons at
the bottom. `Navigation.tsx` (the old top bar) still exists but only renders below `lg` now, as the
mobile menu — so nothing breaks on phones.

**Every section carries a giant ghost number.** `SectionWrapper.tsx` takes a new `index` prop and
renders it as a huge, very-low-opacity numeral in the corner of the section (Skills=01,
Projects=02, Architecture=03, Experience=04, Journey=05, Writing=06). This is what the dock's dots
are counting — the two are the same numbering, so the site tells you where you are in two places at
once instead of a flat scroll with no sense of position.

**One visual identity change that touches everything at once:** section titles (the `<h2>` in
`SectionWrapper`) and the hero name are now set in your monospace font instead of Inter. Small
change, single file, but it's what actually unifies "terminal status panel" + "ghost numbers" +
"dot navigation" into one coherent language instead of a few separate effects bolted on — this was
the gap in round 3.

**A persistent background mesh** (three soft radial gradients, `page.tsx`) sits fixed behind the
entire scroll, instead of the old per-section flat backgrounds with hard cuts at each divider.

## Kept from round 3 (they already fit this direction)
Custom magnetic cursor, the hero's `status.log` terminal panel (relabelled `~/status.log`), the
skills marquee, the bento-sized "Also Building" grid. All still there, now sitting inside the new
shell instead of the old one.

## Things to check on your end
- The dock's `githubRepository`-style icons are inline SVG paths I wrote by hand (no icon library
  added) — they render correctly in my check, but open the live site once and glance at all four to
  be sure nothing looks slightly off at your exact font/DPI.
- Dock and ghost numbers are desktop-only by design (`lg:` and up) — on mobile you get the old top
  bar and no ghost numbers, so small screens stay uncluttered. Say if you want a mobile treatment
  for either.
- I did not touch Metrics.tsx or Contact.tsx — they don't use `SectionWrapper`, so they don't have
  a ghost number. If you want them numbered too (07, 08), tell me and I'll wire it the same way.
