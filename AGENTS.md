# Project rules

- All portfolio content (profile, projects, certifications, skills, links) lives in `src/lib/data.ts`; components only render it — keeps edits to text in one place.
- Cinematic effects live in `src/components/cinematic/` (3D hero scene, tilt cards, preloader, marquee, scroll spider, theme-switch swinging hero) — keeps visual effects separate from section content.
- The 3D hero scene uses @react-three/fiber v8 + drei v9, is lazy-loaded, and pauses rendering when off-screen — keeps first load and scrolling smooth.
- 3D materials read colors from CSS design tokens at runtime instead of hardcoding — so palette changes in `src/index.css` flow into the 3D scene.
- Smooth scrolling uses Lenis via `useSmoothScroll` (skipped for reduced-motion users); do not add CSS `scroll-behavior: smooth` — it conflicts with Lenis.
- Buttons use the shared `.btn-primary`, `.btn-ghost`, `.icon-btn` classes in `src/index.css` — keeps hover styling consistent site-wide.
- Certificate previews use a lazy-loaded React-PDF dialog and explicit optional preview URLs in shared data; folder-only links show a fallback rather than pretending to be PDFs.
- Spider visibility and left/right placement use browser-local settings; mount the controls in the hero's reserved mobile area to keep the effect clear of content.
