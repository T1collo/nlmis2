# NLMIS2 — Phase 1 landing spine: Hero · Logistics · How it works

Build exactly three sections into the existing app at
`C:\Users\Collins\Desktop\Tuturials\nlmis2` (Next.js 16.4 App Router, React 19.3,
Tailwind 4, TypeScript; `app/` and `components/` at the repo root, no `src/`).
Do not build any other section yet. Leave the anchors listed under "Page assembly" so
later sections can slot in.

Before writing code:
- Read `AGENTS.md`. The Next.js docs at `node_modules/next/dist/docs/` override what you
  remember about Next APIs. Check fonts, images, metadata/icons, and client/server
  component boundaries there.
- Follow the global UI standard in `~/.claude/CLAUDE.md`. Run ui-ux-pro-max first. The
  palette and fonts below are locked, so use the search only for gaps such as easing or
  spacing questions, not to re-pick them. Use the GSAP skills, ui-gate, and the
  web-design-guidelines review.
- Install `gsap` and `@gsap/react`. Copy the sibling project's `src/lib/gsap.ts` pattern
  (explicit `registerPlugin`, re-export `gsap`, `useGSAP` and `ScrollTrigger`) to
  `lib/gsap.ts`.

Product: **NLMIS** (National Logistics Management Information System), programme line
**Taifa Care**, owner language **Ministry of Health · Digital Health Agency**. This is a
public marketing site, so it must contain no contract numbers, consortium names, FR-* IDs,
or real carrier logos.

All copy lives in one module, `content/site.ts` (use the existing `@/` alias). Components
must contain no copy string literals.

---

## 0. Tokens (locked)

Define these as Tailwind 4 `@theme` tokens in `app/globals.css`. Components use the tokens
and never raw hex values.

| Token | Value | Use |
|---|---|---|
| `ink` | `#10243D` | body text and headlines on light grounds |
| `primary` | `#22539B` | CTAs, links, focus rings on light grounds |
| `primary-hover` | `#1A4179` | CTA hover |
| `primary-on-dark` | `#7FA8E6` | cobalt moments on `#111`. Primary on `#111` is only about 2.6:1, so it fails contrast |
| `brand-teal` | `#77C5CB` | hero rule, active-link bar, focus ring on dark grounds (stands in for SpaceEdu `--cyan`) |
| `brand-teal-logo` | `#5FB8C0` | the `mis` half of the wordmark |
| `brand-green` | `#83BD56` | decorative only, never text |
| `surface` | `#F2F6FA` | How-it-works ground |
| `line` | `#D8E3EF` | hairlines, browser-frame border |
| `canvas` | `#FFFFFF` | page and logistics ground |
| `space-ink` | `#04101F` | hero night ground |
| `btn-ink` | `#071227` | text on glossy white pills |
| `band` | `#111111` | logistics ground band |
| `giant` | `#E9E9E9` | logistics giant letters |
| `rule-on-dark` | `rgba(255,255,255,.23)` | hero nav hairline |

Load all fonts with `next/font/google` and expose each as a CSS variable. Never use a CSS
`@import` for fonts.
- **Prata** 400 for the hero title and the How-it-works headline and step titles.
- **Hanken Grotesk** 400–700 for body, nav, and pills site-wide. This replaces KV's
  Archivo, so there is one body face.
- **Poppins** 500/600 for the wordmark only: `nl` + `<i>mis</i>`, with `mis` in
  `brand-teal-logo`.
- **Anton** 400 for the logistics big caps: headline, card titles, giant letters.
- **JetBrains Mono** 400 for the logistics speed readout only.

Favicon: the Earth cut-out PNG
`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202005_3346cc4d-ec3b-44ab-825c-b18e49f5021a.png`.
Download it and serve it through the metadata icons convention described in the Next docs.

Add both cloudfront hosts (`d8j0ntlcm91z4.cloudfront.net` and
`d2ol7oe51mr4n9.cloudfront.net`) to `images.remotePatterns` so stills render through
`next/image`. Videos stay as plain `<video>` with remote `src`.

---

## 1. Hero (`#top`): a faithful SpaceEdu port, Earth only

Port the SpaceEdu spec exactly, with the changes listed here. Keep every measured value.
The changes:

**Removed:** Venus and Mars, all three cut-out `<img>` slots, the `.planet-l`/`.planet-r`
buttons, both `.label` spans, the planet switcher JS, and the clip warming code. Earth is
the only clip and the only still.

**Kept verbatim** (every length is `calc(N * var(--u))`, with the same numbers):
- the `--u` / `--dh-px` / `--vshift` / `--gutter` system from the 1353×1163 reference,
  including the `100dvh` `@supports` overrides
- the nav geometry, the 2u hairline under the nav (`.navbar::after`), and the 4u
  active-link bar
- eyebrow, title, rule, lede and CTA positions and sizes
- the glossy pill gradients and shadows for both the nav CTA and the hero CTA
- the 96u frosted circular scroll button with the arrow SVG
- the focus rings, which use `brand-teal` here
- the responsive tiers A–F in the same source order. Delete the rules that only target
  `.planet` and `.label`. Tier F then only needs to exist if something remains in it.
- the entrance sequence: same keyframe semantics, durations, delays, eases and
  self-cleanup. Drop the two label lines.

**Adapted because the hero is now a section, not the whole page:**
- `.stage` changes from `position:fixed` to a `<header id="top">` that is
  `position:relative; height:100svh; min-height:calc(560 * var(--u)); overflow:hidden`.
  Remove `body{overflow:hidden}` and `html,body{height:100%}`. The page must scroll.
- `--u`, `--vshift` and the tiers are scoped to the hero (`.hero{--u:…}`), not `:root`,
  so later sections use normal rem/Tailwind sizing.
- The nav is absolute inside the hero and scrolls away. It is not fixed.
- The scroll button scrolls smoothly to `#logistics`. With reduced motion it jumps
  without smoothing.

**Nav (same `<a>` elements in both layouts; no duplicated markup):**
- Wordmark `nl<i>mis</i>` linking to `#top`.
- Links: `Platform` → `#platform` (placeholder anchor), `How it works` → `#how-it-works`,
  `Logistics` → `#logistics`. No `aria-current` underline is drawn on load. Instead, the
  4u teal bar marks the link of the section currently in view (IntersectionObserver).
  Its entrance draw still targets the first link.
- Pill: `Request onboarding` → `#onboarding`. In the desktop nav the pill is wider than
  SpaceEdu's 107u "Enroll", so let its width be `auto` with
  `padding-inline: calc(20 * var(--u))` and keep the height and radius.
- Burger behaviour exactly as SpaceEdu §10: `data-open`, `aria-expanded`, label swap,
  close on outside click, on Escape (returning focus to the button), and on link click.

**Copy (from `content/site.ts`):**
- Eyebrow: `NATIONAL SYSTEM`. The eyebrow is 30.45u with 4u tracking, so check that it
  fits on one line at tier C. If it doesn't, drop tracking to 3u in that tier only.
- Title: `KENYA` (the Prata, 112.4u slot that SpaceEdu used for "EARTH").
- Lede: `Know stock, requisitions and deliveries on one national record — from facility
  to distributor —<br> so counties see what is where before a patient is waiting.`
  Keep the `<br>` behaviour per tier as in SpaceEdu. Adjust the break so the desktop
  lede still sits on two lines at 18.36u inside the column.
- CTA pill: `GET STARTED` → `#onboarding`.
- `sr-only` text: "Backdrop: Earth from orbit, turned so East Africa and Kenya face the
  viewer, rotating slowly."

**Media: a real Earth facing Africa.** This replaces the supplied clip, which faces
Australia. The composition matches the SpaceEdu reference frame:
- A huge globe rises from the bottom of the viewport. Its top limb sits just under the
  CTA, and the pill slightly overlaps the arc.
- The copy sits on dark starfield above the arc.
- The scroll button sits over the planet near the bottom.
- Reference still (the reduced-motion fallback and the LCP poster):
  `public/hero/earth-africa.jpg`, 2688×1520.

Globe geometry, in design units at 1353×1163:
- Radius = 0.78 × viewport width.
- Disk top at 53.5% of the hero height.
- Orthographic view centre at lat −52°, lon 37.5°, which puts Kenya and Lake Victoria in
  the centre of the visible cap, with the Horn of Africa and the Red Sea toward the
  limb.

Build it as `components/hero/earth-globe.tsx` (`"use client"`), loaded with
`next/dynamic` `{ ssr:false }` after first paint. Until it is ready, and permanently
under reduced motion, the `next/image` still (`priority`, `fill`, `sizes="100vw"`,
`object-cover object-top`) shows in the same box, so there is no CLS.

The globe uses three.js (`three` only, no wrappers). Import the members you need, not
the namespace.
- `SphereGeometry(1, 128, 128)` with `MeshPhongMaterial`, using the Blue Marble day map
  (`public/hero/earth-blue-marble.jpg`, at least 8K wide if available, else 4096×2048),
  plus a specular or water mask and a bump map.
- A second sphere at radius 1.006 for clouds (`public/hero/earth-clouds.png`,
  transparent). The clouds drift 1.15× faster than the ground.
- An atmosphere rim: a back-side sphere at radius 1.04 with a fresnel `ShaderMaterial`
  in `#4A94FF`, additive blending.
- A camera framed to reproduce the geometry above. The globe's rotation axis is tilted
  so the view centre matches lat −52°. Spin is about 0.6° per second west to east,
  driven by `gsap.ticker`. Pause when the hero is off-screen (IntersectionObserver) or
  the tab is hidden.
- DPR capped at 1.75. `antialias` on. `alpha` on, so the canvas sits over the
  `space-ink` starfield.
- The starfield is a static `public/hero/starfield.webp`, or the still's top region
  reused. Do not render stars in WebGL.
- Dispose of geometry, materials, textures and the renderer on unmount.
- If WebGL is unavailable, the still is the fallback.
- Source textures from NASA Visible Earth Blue Marble (public domain). If that host is
  unreachable, `three-globe@2.31.0/example/img/earth-blue-marble.jpg` and
  `example/clouds/clouds.png` on unpkg are the same Blue Marble data. Credit
  "NASA Visible Earth" in an `sr-only` line or a later footer.

The entrance `sky` fade applies to the globe wrapper (opacity only). No video element
is used in the hero any more.

Drop the secondary "See how it works" link from the hero. It would sit on the bright
planet and fail contrast. The nav already links there.

**Motion implementation:** the user's standard routes motion through GSAP. Rebuild the
SpaceEdu entrance as one `gsap.timeline()` inside `useGSAP`, gated by
`gsap.matchMedia()`:
- `(prefers-reduced-motion: no-preference)`: run the timeline.
- `reduce`: nothing runs, the video is `display:none`, and the still shows.

Use the same `from` values (mask reveal `yPercent:115`; rise `y` 8u/12u plus
`autoAlpha`; settle `scale:.965`; draw `scaleX:0` from the centre; sky
`autoAlpha` fade only, never a translate), the same durations and delays (positions on
the timeline), and eases from `CustomEase` matching `cubic-bezier(.16,1,.3,1)`,
`(.22,1,.36,1)` and `(.4,0,.2,1)`.

Prevent a flash of the finished layout:
- A tiny inline `<head>` script adds `html.anim` when motion is allowed. In `layout.tsx`,
  put the script inside `<head>` (check the Next docs for the right way), not in an
  effect.
- CSS under `.anim` sets the initial hidden states.
- Wait for `document.fonts.ready` (500 ms guard), then two `requestAnimationFrame`s, then
  play.
- `onComplete`: `clearProps` on every animated node and remove `html.anim`. Nothing
  residual is left behind.

Pseudo-elements (`.navbar::after`, the active bar) can't be tweened directly. Render them
as real `<span aria-hidden>` elements instead.

**Hero acceptance:**
- The first viewport is wordmark + nav, eyebrow, title, rule, lede, pill, secondary link,
  scroll button, and full-bleed Earth.
- No side planets, stats, or cards.
- The composition matches SpaceEdu at 1353×1163, 1440×900, 1920×1080, 820×1180,
  390×844, 360×640 and 844×390 (short tier).
- No horizontal scroll from 320 to 2560 px.
- The entrance runs once. After it, `<html>` has no `.anim` class and no inline
  transforms remain.

---

## 2. Logistics (`#logistics`): the KV scroll hero, remapped to health supply chain

Port the KV freight spec. Keep every mechanism and measurement, and change only what is
listed here. The handling clip is the same asset; the story becomes "depot to facility".

**Media (unchanged):**
- 1080p: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/409763c0-95f4-49d3-a601-dc564d55072b.mp4`
- 720p (≤ 900 px wide): `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b3718419-7a0a-478d-bfb0-0ff8bef7f3f7.mp4`
- Poster: `https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/2307e4bf-be39-42b4-b579-e168aeccabf0.jpg`

**Rules that survive unchanged:**
- The clip is never `play()`ed. It is only scrubbed.
- No opacity on the video.
- Vehicles are never drawn or moved in code.
- Track height = (1 + A + B) × viewport, with A = 2.4 and B from the strip width
  formula.
- The sticky `100lvh` scene.
- Video sizing: cover on wide screens. On portrait or narrow screens: 155vw wide, 40% of
  the frame at mid-screen, final band edge at 36% of the viewport.
- `--edge-px` = clip top + 0.448 × clip height.
- Giant letters at 330u (180u on phones), line-height .8, `mix-blend-mode: darken`, with
  their bottom on `--edge-px`.
- Settled flag at q ≥ 0.94 sets `--ph: 1`.
- Strip and letters translateX formulas as in KV.
- `u = min(100vw/1440, 100vh/960)`, and on phones `min(100vw/430, 1.4px)`, scoped to
  `#logistics`.
- Phone layout, readout position, and no sideways scroll.

**Implementation:**
- Use ScrollTrigger on the track only to read progress: `start:"top top"`,
  `end:"bottom bottom"`, `onUpdate` storing `scrollY` relative to the track.
- Do not use ScrollTrigger `pin`. The scene stays CSS `position:sticky` as KV specifies,
  which works on mobile without pin-spacer jumps.
- One `gsap.ticker` callback is the single rAF loop:
  - ease the clip time (`cur += (target − cur) × 0.2`)
  - seek only when not seeking and Δ > 1/60 s, and re-seek on `seeked`
  - write the strip and letters transforms
  - update the readout
- Recompute A, B, the clip box and `--edge-px` on resize and on the ScrollTrigger
  `refreshInit` event.
- Choose the 720p source by width when the component mounts. Don't swap it on resize.
- Drop KV's recorder mode (`?rec=1`).
- `gsap.matchMedia()`:
  - `(prefers-reduced-motion: reduce)`: no scrub and no track height. Show a single
    `100svh` scene with the poster (`next/image`), the band at the 44.8% edge, the giant
    letters static and left-aligned behind the truck, and the strip as a normal
    horizontally scrollable row (snap) inside the band.
  - Everything else: the KV behaviour. Phones use the KV portrait framing; there is no
    pin to fall back from.

**Remapped content (all from `content/site.ts`):**
- **Nav** (absolute at the top of the track, scrolls away):
  - Left: `NLMIS` in Poppins 600, 30u, tracking −.04em.
  - Right: `How it works` → `#how-it-works`, plus an outline pill
    `Request onboarding` → `#onboarding` (Hanken 500, 10u, uppercase, tracking .1em,
    min-height 44 px).
  - Drop "Menu" and "Follow".
- **Giant letters:** `SUPPLY CHAIN`.
- **Speed readout:** keep the KV KM/H readout in JetBrains Mono. It suits the trucking
  scene. Give it `aria-hidden` and the same smoothing, cap and two-digit format.
- **Band pill:** outline pill `From depot to facility` → `#how-it-works`, centred 36u
  above the bottom. It appears on settle exactly as KV (fade plus 24 px rise).
- **Strip headline** (Anton 64u, line-height .98; 46u on phones):
  `EVERY MOVE / ON ONE RECORD. / VISIBLE END TO END.` The third line uses
  `primary-on-dark`.
- **Two lead paragraphs** (Hanken 12u, white at 62%. Check they stay at or above 4.5:1
  on `#111`; raise the opacity to 70% if they don't):
  - "From central warehouse to the last health facility, every consignment moves under
    one national record."
  - "One integrated system means one source of truth, one audit trail and full
    visibility from dispatch to receipt."
- **Five cards** (270u, 30u side padding, a 1 px divider at white 12% except on the
  first). Each has a 38u stroke SVG icon, a two-line Anton title at 26u, and Hanken body
  text at 12.4u:
  1. **Warehouse / dispatch** (warehouse icon): "Orders leave KEMSA, MEDS or an onboarded
     supplier carrying their GS1 identity."
  2. **Line-haul / last mile** (truck): "Consignments move from county to facility,
     with alerts the moment a leg runs late."
  3. **Track / & trace** (barcode scan): "Every scan writes a location event, so
     movement history stays visible in transit."
  4. **Goods / receipt** (box with check): "The facility's HMIS closes the delivery
     straight into its stock record."
  5. **Recall / & reverse** (rotate-ccw arrow): "When a batch goes wrong, every holder of
     it can be identified and reached."
- **Layout change from KV: a card grid, not a sideways strip.**
  - The sticky scene ends once the truck has settled and SUPPLY CHAIN has slid past.
    Phase B now covers only the letters: B = (lettersWidth + vw) / vw × 0.9 viewports.
  - The `band` colour then continues as a normal-flow block below the track. It holds a
    header row and the cards.
  - Header row: the headline on the left (two lines at desktop width:
    `EVERY MOVE ON ONE RECORD.` / `VISIBLE END TO END.`) and the two lead paragraphs
    in a 24rem column on the right, aligned to the bottom.
  - Cards: an `<ol>` grid, `repeat(auto-fit, minmax(14.5rem, 1fr))` with a 1rem gap.
    That gives 5 across at 1440, 3+2 on tablet and 1 per row on phones.
  - Each card is `#1B1B1B` with a `#2B2B2B` 1px border and 14px radius. It holds the
    number in `primary-on-dark` with a teal stroke icon on the same row, a Hanken 600
    17px title, and the body in `#B8B8B8`.
  - No horizontal scroll anywhere.
- **Card reveal:** a `ScrollTrigger.batch` on the cards. Each rises 24px with
  `autoAlpha` and a 0.08s stagger as it enters. The title also gets the KV
  background-clip sweep (cobalt → white) once over 0.9s. With reduced motion there's no
  reveal; cards are static white text.
- Semantics:
  - section `aria-labelledby` the strip headline (`<h2>`)
  - cards as an `<ol>` of `<li>` with `<h3>` titles
  - giant letters `aria-hidden`
  - video `aria-hidden` with a `sr-only` sentence: "A reach stacker loads a shipping
    container onto a truck at a depot."

**Logistics acceptance (1440×960, then 390×844):**
- On load, the stacker holds the container under the NLMIS nav.
- Scrolling lifts, turns, loads the truck, and pulls back until the truck sits on the
  band.
- SUPPLY CHAIN slides behind the truck, never through the cab or container.
- The headline enters from the right, then the cards sweep from cobalt to white.
- The readout tracks scroll speed.
- Scrolling back reverses everything.
- No sideways page scroll.
- With reduced motion, a single static scene is readable without scrolling through any
  track.

---

## 3. How it works (`#how-it-works`): ported from the sibling project

Port behaviour and structure from the sibling project
`C:\Users\Collins\Desktop\Tuturials\nlmis`:
`src/components/sections/how-it-works.tsx`, `console-screen.tsx`, `browser-frame.tsx`,
and `howItWorks` in `src/content/site.ts`. Copy `nlmis/public/screens/*.webp`
(`home`, `requisition`, `marketplace`, `budget`, `trace`; all 1920×973) into
`nlmis2/public/screens/`.

**Keep from the sibling:**
- All screens pre-mounted with `next/image`. Only opacity and transform change; never
  swap `src`.
- Desktop (xl+): two columns. The steps are on the left and the sticky browser frame on
  the right, vertically centred. The activation line is the frame's midline.
- Stacked (below xl): the sticky frame sits at the top, and a step activates a short way
  into the reading area under the frame.
- The active step is at full opacity and inactive steps at about 0.4.
- Measured bottom padding so the last step can still reach the activation line.
- The `holdFrame` / `refreshInit` handling and `gsap.matchMedia()` structure the sibling
  already uses.
- Browser chrome is decorative (`aria-hidden`): neutral dots and an address pill reading
  `nlmis.taifacare.go.ke`. Images carry real alts.
- Step 05 has no capture yet. It shows a labelled placeholder ("Goods receipt", "Screen
  capture coming soon") in the same aspect-ratio box. Don't show an unrelated screen.
- Reduced motion: no entrance scale. Step and screen sync still works, with an instant
  opacity swap.
- Steps are focusable. Activating a step with the keyboard (Enter/Space) scrolls it to
  the activation line and sets `aria-current="step"`.

**Restyle to this site:**
- `surface` ground. Section padding clamp(4.5rem, 9vw, 8rem) top and clamp(5rem, 10vw,
  9rem) bottom. Max width 82rem.
- Eyebrow: a 2rem teal rule, then `HOW IT WORKS` (Hanken 600, 13px, 0.22em, `primary`).
- Headline in Prata, clamp(2.5rem, 5vw, 4.25rem): `From requisition` / `to patient`.
- Body: "One flow, visible end to end. Every step writes back to the same record." Use
  `ink` at reduced weight. Muted text colour `#44556B` becomes a token
  (`ink-muted`, ≥ 6:1 on `surface`).
- Step number in Hanken 600, 13px, tabular figures, `primary`. Step title in Prata,
  clamp(1.375rem, 2vw, 1.75rem). Body 16px/1.65 in `ink-muted`. A 1px `line` hairline
  between steps.
- The frame is white with a `line` border, 14px radius and a soft ink-tinted shadow.
- Figcaption: "Live console screens. Names and initials are sample values."

**Steps** (copy from the sibling `howItWorks.steps`; lightly edited text is fine):

| # | Title | Screen |
|---|---|---|
| 01 | The facility raises a request | requisition |
| 02 | NLMIS selects the supplier | marketplace |
| 03 | The purchase order is issued | budget |
| 04 | The consignment is tracked | trace |
| 05 | The facility receives stock | placeholder: "Goods receipt" |
| 06 | The record closes the loop | home |

**How-it-works acceptance:**
- At 1440×900, each step lights up as it crosses the frame midline, and the frame
  crossfades without image reloads (check the network tab).
- The last step reaches the line.
- At 390×844, the frame stays pinned at the top and steps activate under it.
- Reduced motion keeps the sync.

---

## Page assembly (Phase 1)

`app/page.tsx` is a server component that renders, in order:

1. `<Hero />`
2. `<Logistics />`
3. `<HowItWorks />`
4. `<div id="platform" />` and `<div id="onboarding" />` as empty placeholder anchors,
   each with a comment saying which Phase 2 section replaces it.

Keep `"use client"` at the leaves: the hero motion and nav, the logistics scene, and the
how-it-works sync. Static markup and copy stay on the server where possible. Update
`app/layout.tsx`:
- `lang="en"`, fonts, metadata, favicon, the `html.anim` head script
- title "NLMIS — National Logistics Management Information System"
- description built from the hero lede

## Done means

1. `npm run build` passes with no type or lint errors.
2. `node ~/.claude/scripts/ui-gate.mjs check` is green. Any genuine exceptions go in
   `.claude/ui-gate.json` with a reason.
3. web-design-guidelines review is clean on every touched UI file.
4. Run the app and take screenshots at 1440×900, 820×1180, 390×844 and 844×390:
   - the hero after the entrance
   - logistics at about 0%, 50% (truck loading), 100% of A (settled), and mid-strip
   - How it works with step 03 active
   Also capture one reduced-motion pass (emulate `prefers-reduced-motion`).
5. `document.documentElement.scrollWidth === innerWidth` at 320, 390, 820, 1440 and
   2560.
6. Report any spec value you couldn't honour, and why.
