---
version: alpha
name: Issue 01 — Ahmed
description: >
  A gamified, comic-strip self-portrait built as a portfolio. Strict monochrome
  (true black, true white, neutral grays — no warmth). Editorial typography meets
  hand-drawn character storytelling. Designed for two readers at once: graduate
  admissions committees reviewing MS candidates in machine learning, and engineering
  recruiters scanning for production AI experience. The cartoon Ahmed avatar is the
  narrator; every section is a panel in his issue.
colors:
  primary: "#0A0A0A"        # Ink — near-pure black, the figure's outline weight
  secondary: "#2E2E2E"      # Charcoal — long-form body, secondary headlines
  tertiary: "#6B6B6B"       # Slate — captions, metadata, footnotes
  neutral: "#FFFFFF"        # Page — pure white, the canvas
  surface: "#FAFAFA"        # Bone — one step off-white for raised cards
  muted: "#EDEDED"          # Mist — tag chips, hover wells
  border: "#D4D4D4"         # Hairline — 1px rules, table edges
  faint: "#A8A8A8"          # Stone — disabled text, decorative ruled marks
  on-primary: "#FFFFFF"     # White text on Ink
  on-neutral: "#0A0A0A"     # Ink text on Page
  highlight-wash: "#E5E5E5" # The marker stroke behind a single word
  speech-fill: "#FFFFFF"    # Speech bubble background
  speech-stroke: "#0A0A0A"  # Speech bubble outline
typography:
  display-xl:
    fontFamily: Fraunces
    fontSize: 9rem
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: -0.045em
    fontVariation: "'SOFT' 50, 'WONK' 1, 'opsz' 144"
  display-lg:
    fontFamily: Fraunces
    fontSize: 6rem
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: -0.04em
    fontVariation: "'SOFT' 50, 'WONK' 1, 'opsz' 144"
  display-md:
    fontFamily: Fraunces
    fontSize: 4rem
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -0.03em
  h1:
    fontFamily: Fraunces
    fontSize: 2.75rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02em
  h2:
    fontFamily: Fraunces
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.015em
  h3:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  lead:
    fontFamily: Fraunces
    fontSize: 1.625rem
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: -0.005em
    fontVariation: "'SOFT' 30, 'opsz' 36"
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  speech:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.005em
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.16em
  mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  mono-caps:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0.08em
  counter-xl:
    fontFamily: Fraunces
    fontSize: 7rem
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.05em
    fontFeature: "'tnum' on, 'lnum' on"
rounded:
  none: 0px
  sm: 2px
  md: 6px
  bubble: 22px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
  4xl: 160px
  gutter: 128px
  gutter-tablet: 48px
  gutter-mobile: 20px
  safe-area-top: env(safe-area-inset-top)
  safe-area-bottom: env(safe-area-inset-bottom)
  safe-area-left: env(safe-area-inset-left)
  safe-area-right: env(safe-area-inset-right)
  touch-target-min: 44px
breakpoints:
  mobile: 0px            # 0 – 599 (phones, portrait)
  mobile-lg: 480px       # 480 – 599 (large phones)
  tablet: 600px          # 600 – 1023 (tablets, small laptops)
  desktop: 1024px        # 1024 – 1439 (standard desktop)
  desktop-lg: 1440px     # 1440+ (wide desktop, design canvas)
  desktop-xl: 1920px     # 1920+ (full-HD and above)
platforms:
  web-desktop: 1024px+   # mouse + keyboard, hover available
  web-tablet: 600–1023px # touch primary, hover unreliable
  web-mobile: 0–599px    # touch only, no hover, no cursor
  ios: native            # iOS 16+, SwiftUI or React Native
  android: native        # Android 12+ (API 31+), Jetpack Compose or React Native
storyline-frames:
  source-dir: "D:\\Projects\\Portfolio\\storyline"
  panel-1-rest: "frame-1a.png"     # HCI lab, glove off
  panel-1-hover: "frame-1b.png"    # HCI lab, glove fingertips lit
  panel-2-rest: "frame-2a.png"     # MRI desk, paper under review
  panel-2-hover: "frame-2b.png"    # MRI desk, green checkmarks
  panel-3-rest: "frame-3a.png"     # WCM-Q workstation, scanning
  panel-3-hover: "frame-3b.png"    # WCM-Q workstation, lesion highlighted
  panel-4-rest: "frame-4a.png"     # Walking forward, industry/suit
  panel-4-hover: "frame-4b.png"    # Walking forward, academia/casual
  swap-mode: hover                 # desktop: cursor; touch: tap-toggle; scroll: auto-play once
  swap-duration: 180ms             # 260ms for panel 4 (longer, two-future read)
  pairing-rule: by-number          # 1a↔1b, 2a↔2b, 3a↔3b, 4a↔4b — never cross-paired
font-fallbacks:
  fraunces: "Fraunces, 'Times New Roman', Georgia, serif"
  inter: "Inter, -apple-system, 'SF Pro Text', 'Segoe UI', Roboto, system-ui, sans-serif"
  mono: "'JetBrains Mono', ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, Consolas, monospace"
  fraunces-ios: "Fraunces, 'New York', Georgia, serif"
  inter-ios: "Inter, -apple-system, 'SF Pro Text', system-ui, sans-serif"
  fraunces-android: "Fraunces, 'Noto Serif', Roboto, serif"
  inter-android: "Inter, Roboto, system-ui, sans-serif"
typography-responsive:
  display-xl:
    desktop: 9rem
    tablet: 6rem        # was 9rem
    mobile: 3.75rem     # was 9rem — hero must not exceed 60px on phones
  display-lg:
    desktop: 6rem
    tablet: 4.5rem
    mobile: 3rem
  display-md:
    desktop: 4rem
    tablet: 3rem
    mobile: 2.25rem
  h1:
    desktop: 2.75rem
    tablet: 2.25rem
    mobile: 1.875rem
  h2:
    desktop: 2rem
    tablet: 1.75rem
    mobile: 1.5rem
  h3:
    desktop: 1.5rem
    tablet: 1.375rem
    mobile: 1.25rem
  lead:
    desktop: 1.625rem
    tablet: 1.375rem
    mobile: 1.125rem
  counter-xl:
    desktop: 7rem
    tablet: 5rem
    mobile: 3.5rem
  body-lg:
    desktop: 1.125rem
    tablet: 1.0625rem
    mobile: 1rem
  body-md:
    desktop: 1rem
    tablet: 1rem
    mobile: 0.9375rem
components:
  nav-link:
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    padding: 12px
  nav-link-hover:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.primary}"
  nav-link-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-caps}"
    padding: 12px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.label-caps}"
    padding: 18px
  button-primary-hover:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-primary}"
  button-ghost:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.label-caps}"
    padding: 18px
  button-ghost-hover:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.primary}"
  link-inline:
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  card-project:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 36px
  card-project-hover:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  tag-pill:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.pill}"
    typography: "{typography.mono-caps}"
    padding: 8px
  divider-rule:
    backgroundColor: "{colors.border}"
    height: 1px
  field-input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    typography: "{typography.body-md}"
    padding: 14px
  field-input-focus:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
  caption-meta:
    textColor: "{colors.tertiary}"
    typography: "{typography.label-caps}"
  highlight-mark:
    backgroundColor: "{colors.highlight-wash}"
    textColor: "{colors.primary}"
  speech-bubble:
    backgroundColor: "{colors.speech-fill}"
    textColor: "{colors.primary}"
    rounded: "{rounded.bubble}"
    typography: "{typography.speech}"
    padding: 14px
  comic-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 32px
  story-counter:
    textColor: "{colors.primary}"
    typography: "{typography.counter-xl}"
  detail-hero:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    padding: 96px
  footer-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm}"
    padding: 64px
---

## Overview

**Issue 01 — Ahmed.** A portfolio shaped like a comic book, set in newsprint type, with a cartoon narrator who refuses to break character.

The site exists for two audiences who are usually solved in different ways. A graduate admissions committee needs evidence — published work, technical depth, a clear research arc. An engineering recruiter needs personality and proof — something that holds attention through a phone scroll and survives a 30-second judgment. The conventional move is to compromise both. This system does the opposite: it gives the recruiter a hand-drawn character with speech bubbles and an interactive story panel, and gives the admissions reader a Fraunces hero, an IEEE-Access citation, and prose that takes itself seriously. The two audiences meet in the middle, on a page that is unmistakably *one* person.

The design language has three rules and only three.

1. **It is strictly monochrome — with one exception.** Pure black, pure white, neutral grays everywhere. No warmth, no accent, no hue at any depth — except inside the four Story Mode panels, which are full-color pop-art comic frames. The frames are the page's only color island. The avatar is monochrome. The type is monochrome. The page is monochrome. The story panels are not.
2. **The avatar narrates.** Ahmed (the cartoon) appears in every section as a character, not an ornament. He waves at the hero, walks across the experience timeline, peeks from behind project cards, lounges on the 404. He sometimes talks — speech bubbles fire on hover, lifted from GM Meme — but never says more than one line.
3. **Everything is a panel.** Sections are framed like comic panels. Projects are issues. The hero is a cover. The 404 is the back page. The grammar is print-on-paper, scrolled on a phone.

The voice borrows three things from three inspirations: the typographic scale and clipped headline of [Olha Lazarieva](https://olhalazarieva.com/), the peek-from-behind-letterforms hide-and-reveal of [Flying Papers](https://www.flyingpapers.com/), and the character-led "who are we?" intro and speech-bubble personality of [GM Meme Studio](https://www.gm-meme.com/). All translated into grayscale, all sharpened for technical legibility.

## Platforms

This system targets five surfaces. The design tokens (`colors`, `rounded`, `spacing`, `components`) are identical on all five — only sizes, gestures, and ornament density change. The promise is that a reader can move from a phone, to a tablet, to a desktop, to a native iOS or Android shell, and feel they are inside the same issue.

**Web — desktop (`1024px+`).** The full system. 12-column grid, 128px outer gutter, hero name clips the right margin, cursor coordinate readout visible, magnetic CTAs, eye-tracking, comic-strip horizontal-snap with `scroll-timeline`, Konami easter egg.

**Web — tablet (`600–1023px`).** 8-column grid, 48px outer gutter. Hero scales to `display-xl tablet` (6rem) and is allowed to wrap to two or three lines instead of clipping (the clipped edge is desktop-only signature). All hover-only animations promote to scroll-into-view triggers. Magnetic CTAs disabled. Cursor readout hidden. Avatar still walks the rail; rail height shrinks by 30%.

**Web — mobile (`0–599px`).** 4-column grid, 20px outer gutter. Hero scales to `display-xl mobile` (3.75rem) on a single line or wraps to two — never clips. Comic strip becomes vertical scroll, panels stack top-to-bottom, the avatar walks *down* the right edge. Speech bubbles fire on scroll-into-view, not hover; one bubble per panel, dismissable by tap. No cursor readout. No magnetic CTAs. No Konami sequence — replaced by a hidden 5-tap on the wordmark sparkle.

**iOS (`16+`).** Implemented in SwiftUI or React Native. Safe-area insets honored on top and bottom (notch, Dynamic Island, home indicator). Comic strip uses native paged `ScrollView` (`isPagingEnabled = true`) with haptic `UIImpactFeedbackGenerator.medium` on each panel boundary. Speech bubbles fire on scroll-into-view with a `softHaptic`. System share sheet replaces the contact form's `SEND →` for native; the web contact form is the fallback in WebView contexts. Honors **Reduce Motion**, **Larger Text** (Dynamic Type — up to `accessibility5`), **Increase Contrast**, **Smart Invert** (avatar is excluded via `accessibilityIgnoresInvertColors = true`).

**Android (`12+ / API 31+`).** Implemented in Jetpack Compose or React Native. Edge-to-edge with `WindowCompat.setDecorFitsSystemWindows(false)`. Status bar and navigation bar both transparent, content drawn beneath, padding via `WindowInsets`. Comic strip uses `HorizontalPager` with `PagerSnapDistance.atMost(1)` and `HapticFeedbackType.LongPress` on snap. System back gesture closes detail pages with a slide-right transition. Honors **Remove Animations** (system setting), **Font Scale** (up to 200%), and **High Contrast Text**. Dynamic theming (Material You) is *suppressed* — this system is strictly monochrome by intent.

**Cross-platform contract.** Whichever surface renders the page, three things must remain true: (1) the system is monochrome at every depth, (2) the avatar is a character — he has poses, gaze, and speech bubbles — not a decorative blob, and (3) every panel is reachable in a strictly linear reading order so a screen reader, a printer, or a no-JS fallback can traverse the whole issue.

## Colors

A nine-step neutral grayscale. No hue whatsoever. The system is built so an agent or a print test can render the page in true black ink on white paper and lose nothing.

- **Primary (`#0A0A0A` — Ink):** Headlines, body text on light, the figure's outline, the speech bubble stroke. Near-pure black; the 5% lift off `#000000` reduces vibration on bright screens without warming the color.
- **Secondary (`#2E2E2E` — Charcoal):** Long-form paragraphs where Ink reads too dense, and project-card body copy.
- **Tertiary (`#6B6B6B` — Slate):** Captions, dates, location stamps, footnotes, "issue number" labels.
- **Neutral (`#FFFFFF` — Page):** The canvas. The default background of every section that is not a Detail Hero or the Footer.
- **Surface (`#FAFAFA` — Bone):** Raised cards — projects, comic panels, story counters — one tick off pure white.
- **Muted (`#EDEDED` — Mist):** Tag pills, ghost-button hover, scroll-progress bar, the wash behind code blocks.
- **Border (`#D4D4D4` — Hairline):** 1px rules. Always 1px, never more.
- **Faint (`#A8A8A8` — Stone):** Decorative ornaments and the trailing edge of "drawn-on-scroll" marker strokes when they fade.

**Inverse.** Two surfaces invert. The Detail Hero on every project page is Ink with White type. The Footer is Ink with White type. These are the only black surfaces in the system.

**Highlight wash.** `#E5E5E5` is the marker stroke. Used behind exactly one word per section. On scroll into view, it animates in left-to-right with a hand-drawn easing curve over 600ms — *drawn*, not faded.

**Contrast.** Ink on Page = 19.5:1 (AAA). Charcoal on Page = 12.6:1 (AAA). Slate on Page = 5.6:1 (AA). White on Ink = 19.5:1 (AAA). The system intentionally has no near-contrast pairs.

## Typography

**Fraunces** (display & editorial), **Inter** (UI & body), **JetBrains Mono** (code & tech tags). Free, variable, and already in production at every credible CS-adjacent design shop, so an admissions committee that recognizes them will recognize them as a deliberate choice.

**Fraunces** carries the personality. At display sizes the `SOFT` axis runs to 50 and `WONK` to 1, which warps the letterforms just enough to feel human inside a portfolio that is otherwise austere. At body sizes (the `lead` paragraph below the hero), `SOFT` drops to 30 — the type tightens, signaling that the reader is now reading.

**Inter** disappears. It is the navigation, the buttons, the body, the form fields. Tracked +0.16em at `label-caps` to read like a print folio mark.

**JetBrains Mono** is content, not style. Used only for technology tags (`PYTORCH`, `LANGCHAIN`, `FAISS`, `AZURE`), repo paths, citation IDs, and the one place the page admits it is a website: the cursor coordinate readout in the bottom-right of every viewport.

**The hero.** Two lines of `display-xl` (9rem) Fraunces — `AHMED` / `IBRAHIM`. Each line clips the right margin on common laptop widths. *Do not shrink to fit.* The clipped edge is the entire point.

**Responsive typography.** The display scale steps down at two breakpoints (see `typography-responsive` in the frontmatter). At `tablet` (600–1023px) `display-xl` is 6rem and the hero is allowed to break to a wrapped second line. At `mobile` (<600px) it drops to 3.75rem and renders on one line if it fits or two lines if it does not — but never clips. Body styles step down half a size at mobile to preserve a 60–75 character measure on a 4.7-inch phone. On native iOS and Android, type honors the system font-scale setting up to 200% — `display-xl` is clamped at the lower of (system-scaled size, 50% of viewport width) so the hero never collides with the safe-area edge. JetBrains Mono is replaced by SF Mono on iOS and Roboto Mono on Android when the bundled webfont fails to load (see `font-fallbacks`).

**The counter.** A new style, `counter-xl` (7rem Fraunces with tabular figures), drives the comic-panel section markers — `§ 01`, `§ 02`, `§ 03` — at full bleed on the left edge of each story section.

**Speech bubbles** use the `speech` style — 0.9375rem Inter Medium, tight leading, slightly negative letterspacing. They are short. One sentence. Never a paragraph.

## Layout

A 12-column grid with a 128px outer gutter on desktop, an 8-column grid with a 48px outer gutter on tablet, and a 4-column grid with a 20px outer gutter on mobile. The grid is broken on purpose: the avatar, the highlight wash, the speech bubbles, and the section counter all live *outside* the column field. They occupy the gutter — that's the comic-book margin where the artist signs the panel.

**Safe areas.** On every platform that exposes them — iOS notch/Dynamic Island, iPhone home indicator, Android status and navigation bars, web in fullscreen / standalone PWA — the page draws edge-to-edge and pads content by `safe-area-inset-*`. The sticky nav top-aligns to `env(safe-area-inset-top)` on web and `WindowInsets.statusBars` on native. The footer's last row bottom-aligns to `safe-area-inset-bottom`. The cursor coordinate readout on desktop sits 16px above `safe-area-inset-bottom` so it clears the iPad home indicator in browser fullscreen.

**Touch targets.** Every interactive element renders at a minimum of 44×44px (iOS HIG) / 48×48dp (Material) hit area on touch surfaces, even when its visual size is smaller. Tag pills, in particular, must reserve 44px of vertical hit area on tablet and mobile via padding — not a visible enlargement.

### The five panels

The main scroll is exactly five panels, each occupying ~100vh on desktop. The avatar walks through all of them.

1. **§ 00 — Cover.** The hero. Massive Fraunces name, Pose 1 standing bottom-right, the lead paragraph clipped just under the name. The `highlight-wash` animates behind the word *trustworthy* on entry.
2. **§ 01 — Who.** The "About" panel. Three short paragraphs in a centered column, Pose 3 (arms crossed) in the left gutter. A single inline speech bubble fires on hover anywhere in the text: *"I work on AI for medicine. Calmly."*
3. **§ 02 — Story.** The interactive timeline. See "Story Mode" below — this replaces every boring chronological timeline you have ever seen.
4. **§ 03 — Work.** The project grid. Five cards. See "Project Grid" below.
5. **§ 04 — Send.** The contact panel. One field, one button, one speech bubble. Pose 6 (lounging) sits to the right of the form.

A 1px Hairline rule separates each panel. No section is on a colored band. No section has a heavy border. The page should feel turned, not clicked.

### Story Mode — the experience panel

The experience section is not a timeline. It is a horizontal-scroll comic strip of four panels, locked to scroll-snap, advanced by horizontal scroll, trackpad swipe, arrow keys (`←/→`), on-screen chevrons, or numeric panel jump-buttons (`§ 01 § 02 § 03 § 04`). **This section is the one explicit color island in an otherwise monochrome system** — see "Color exception" in the Panel Script below. Each panel is a full-bleed comic-book frame in classic pop-art style: full-color cel shading, Ben-Day halftone dots, 2–3px black ink linework, screaming yellow / cobalt blue / cherry red accents, and dramatic radial speed-lines bursting from the focal point of every scene.

**Image assets.** Each panel ships as a *pair* of pre-rendered comic frames at `D:\Projects\Portfolio\storyline\frame-{N}{a|b}.png`. The `a` frame is the scene at rest. The `b` frame is the same composition with one small change "powered on" — a hand glows, a stamp lands, an X-ray lights up, a path is chosen. The system loads both frames per panel and swaps between them on a single hover/tap interaction. There is no third state. There is no fourth state. Two frames per panel is the entire animation budget for this section.

**Hover-to-swap interaction.** On desktop, cursor entry over a panel cross-fades the displayed image from `frame-{N}a.png` to `frame-{N}b.png` over 180ms. Cursor exit cross-fades back to `frame-{N}a.png` over the same duration. On touch surfaces (tablet web, mobile web, iOS, Android), the swap is a tap-toggle: first tap on a panel flips it to `b`; second tap returns it to `a`; tapping any other panel automatically resets the previous one to `a`. On scroll-into-view (mobile vertical strip and native phones), each panel auto-plays the `a → b → a` swap once over 1.6s the moment the panel crosses 60% viewport height, then rests in `a` until the user manually taps it. The `b` state never loops, never auto-reverts mid-hover, and never fires more than one swap per cursor-enter event.

> **Pairing rule.** The hover-to-swap pairs frames by panel number — `1a ↔ 1b`, `2a ↔ 2b`, `3a ↔ 3b`, `4a ↔ 4b`. Each pair is one storyline beat. Frames are *never* cross-paired across panels (`1a → 2b` is forbidden).

Beneath the strip, a horizontal rail runs the full width of the viewport. The cartoon Ahmed (Pose 2 — walking with notebook, drawn in the page's monochrome ink style, *not* the panels' pop-art style) walks left-to-right along the rail as the user scrolls. His position is locked to scroll progress via `scroll-timeline`. At each panel boundary he pauses, turns to face the panel, and a speech bubble fires. The rail-avatar is the only piece of monochrome that touches the color island — the bridge between the two visual languages.

**See "Story Mode — Panel Script" below for per-panel content, caption text, dialogue, sound effects, and the exact `a → b` transition each pair represents.**

**Tablet and mobile.** On tablet, the strip remains horizontal but advances by swipe (touch-action: pan-x) and by on-screen `<` / `>` chevrons that grow to 56×56px. Panel images render at `1080 × 1350` (the vertical source-art crop) when the viewport is narrower than 720px. On mobile, the strip rotates to vertical scroll. Panels stack top-to-bottom. The avatar walks *down* the right edge instead of along the bottom — his stride is locked to vertical scroll progress via `scroll-timeline` on web and `Animated.event` bound to scrollY on native. All hover animations promote to scroll-into-view triggers (the panel animates once when it enters the viewport, instead of on cursor hover) and never reverse — the animation completes once and the panel rests in its post-animation state until the user scrolls back past it, at which point the animation reverses over 200ms exactly the way cursor-exit does on desktop.

**Native iOS.** Implemented as `TabView` with `PageTabViewStyle` (paged horizontal) on iPad and a vertical `LazyVStack` inside a `ScrollView` on iPhone. Snap behavior comes for free from `PageTabViewStyle`; on iPhone, a custom `GeometryReader`-based snap modifier locks each panel to the top of the viewport. A `UIImpactFeedbackGenerator(style: .medium)` fires on every snap. The walking avatar is a separate `Image` overlay driven by `@State scrollProgress: CGFloat` bound to the scroll's content offset.

**Native Android.** Implemented as `HorizontalPager` (tablets) or vertical `LazyColumn` with `rememberSnapFlingBehavior` (phones). `HapticFeedbackType.LongPress` fires on each `currentPage` change. The avatar overlay is a `Box` with an `offset { ... }` derived from `pagerState.currentPageOffsetFraction` or `scrollState.value`.

### Project Grid — the work panel

Five `card-project` rectangles in an asymmetric 12-column grid:

```
[ 01 ........ 7 cols ......... ] [ 02 ... 5 cols ... ]
[ 03 ... 4 cols ... ] [ 04 ............ 8 cols ........... ]
[ 05 ........................ 12 cols ........................ ]
```

Card 05 is the wide one — reserved for the published stroke segmentation paper, which is the academic anchor of the portfolio. The asymmetry signals editorial layout (a contents page in a magazine), not a CMS grid.

**Tablet (8-col).** Cards 01 and 02 stack to full-width. Cards 03 and 04 split 4/4. Card 05 remains full-width. The asymmetry is lost; what remains is the editorial rhythm: wide, wide, split, wide.

**Mobile (4-col).** All five cards stack to full-width, each at 100% with 36px padding and a hairline rule between them — no card-to-card whitespace. Cards lose their hover lift on touch; tapping a card animates a 1px Hairline stroke around it for 120ms (the touch-feedback equivalent of the desktop lift) before navigating to the detail page.

**Native iOS / Android.** Cards render in a single-column `LazyVStack` / `LazyColumn`. Tap-down state replaces hover: card scales to 0.98 for the duration of the press and returns to 1.0 with a 180ms spring on release. On iOS, this is a `withAnimation(.spring())` on a `@GestureState isPressed`. On Android, this is `Modifier.combinedClickable` with an `InteractionSource` driving a `scaleIn` animation.

Each card carries:

- An issue number in `label-caps` Slate (`ISSUE №03`).
- A title in `h2` Fraunces.
- A one-sentence elevator in `body-md` Charcoal.
- Three to five `tag-pill` chips along the bottom (`PYTORCH`, `LANGCHAIN`, `FAISS`, `AZURE`, `RAG`).
- A 14×14 sparkle ornament in the top-right corner.

**The five projects.**

1. **Clinical RAG for Healthcare Knowledge** — End-to-end retrieval system on LangChain, FAISS, and Azure Cognitive Search. Tuned chunking, embedding, and reranking to lift precision over a naive baseline. Tags: `LANGCHAIN` `FAISS` `AZURE` `RAG` `PYTHON`.
2. **Domain-Adapted Clinical LLMs** — Pre-training and fine-tuning language models on clinical corpora for downstream healthcare tasks. Tags: `HUGGINGFACE` `PYTORCH` `LLM` `FINE-TUNING`.
3. **Large Multimodal Models for Radiology** — Visual question answering and automated report generation over 2D/3D medical imaging. Tags: `VQA` `LMM` `DICOM` `PYTORCH`.
4. **Agentic AI for Clinical Workflows** — LangChain / LangGraph agents with multi-step reasoning, tool use, and Agentic RAG. Tags: `LANGGRAPH` `AGENTS` `TOOL-USE` `AZURE-OPENAI`.
5. **Stroke Lesion Segmentation on MRI** — *Zafari-Ghadim, Soliman, Yousif, **Ibrahim**, Rashed, Mabrok. "Deep Models for Stroke Segmentation: Do Complex Architectures Always Perform Better?" IEEE Access, 2024.* Custom PyTorch data loaders and augmentation pipelines for highly imbalanced medical imaging data, comparing classic UNet, attention-augmented variants, and Transformer-based architectures. Tags: `PYTORCH` `UNET` `VIT` `MEDICAL-IMAGING` `IEEE-ACCESS`.

**Project Detail Pages.** Each card links to its own page at `/work/[slug]`. See "Components → detail-hero" for the page architecture.

## Story Mode — Panel Script

The four story panels are pre-rendered comic frames already delivered as image assets in `D:\Projects\Portfolio\storyline\`. They are *not* illustrator scripts to be drawn — they are finished art the system loads at runtime. Each panel is a pair (`frame-{N}a.png` and `frame-{N}b.png`) representing one storyline beat at rest and the same beat with one element "powered on." The system swaps between the two on cursor hover (desktop), tap (touch web), or scroll-into-view auto-play (mobile and native).

### Color exception

This is the single explicit color island in the system. The frames are full-color classic pop-art comic book:

- **Palette.** Bold cherry red, cobalt blue, lemon yellow, and warm flesh tones inside a strict 2–3px black ink outline. Sky and skin use cool blue halftone shading; metal and glass use linear hatching. The page outside the panels remains pure monochrome.
- **Style.** Mid-century Roy Lichtenstein meets modern manga inking. Ben-Day halftone dots at 30% density for shading, screaming radial speed-lines bursting from the focal point of every scene (the glove, the screen, the X-ray, the road), and clear hard-edged cel-coloring inside ink boundaries.
- **Borders.** Each panel has a 2px Ink border and a 6px corner radius — the same border treatment that wraps comic-panels elsewhere on the page. The border bridges the visual languages: monochrome outside, full color inside.
- **On-panel type.** All captions, speech bubbles, sound effects, and on-screen monitor text are baked into the artwork (not live text). This is the only section of the site where type lives inside an image. Live text appears only in the captions *outside* the panel (the section counter, the chapter title, the subtitle).

### Panel conventions

- **CAPTION** is the chapter title displayed *outside* the panel, in live `h2` Fraunces above the frame. Inside the panel, the artwork carries its own pop-art caption box if the illustrator chose to include one.
- **SPEECH BUBBLES** in the panels are baked into the artwork. The site's *separate*, live `speech-bubble` component is what fires beneath the panel from the walking rail-avatar — those are live HTML/SwiftUI/Compose elements, accessible to screen readers.
- **SFX** are baked into the panel art — `*click*`, `*BZZT*`, `*squeak*` — set in bold sans-serif with radiating motion lines.
- **HOVER STATE** for every panel is the same single mechanic: the displayed image swaps from `frame-{N}a.png` to `frame-{N}b.png`. No bespoke animations per panel — the swap *is* the animation. The swap is a 180ms cross-fade on desktop, a tap-toggle on touch, and an auto-play-once on scroll-into-view (mobile and native). See "Story Mode — the experience panel" above for full mechanics.
- **EXIT** appears only on the final panel (§ 04). Every other panel simply advances at the user's command — see "Panel transitions" below.

### Place — geographic anchors (already baked into the art)

The illustrator has already worked the real-world places into the frames. The reader does not need them labeled — they are recognized:

- **§ 01 & § 02.** Qatar University. The framed window in § 01 and the venetian-blinded window in § 02 both look out onto Qatar University's *badgheer* — the sand-stone modular wind towers in their repeating vertical silhouette. Same place, two different beats, six months apart.
- **§ 03.** Weill Cornell Medicine Qatar. Ahmed sits at a multi-monitor workstation; an X-ray monitor and a brain-MRI monitor frame the right side; a stylus-and-Wacom-tablet anchors the foreground. The setting reads as a research lab inside Education City.
- **§ 04.** No real-world architecture in `frame-4a` (modern glass office buildings, the "industry future"). `frame-4b` shows a classical domed academic building (the "graduate-school future"). The hover swap *is* the choice between two futures.

---

### § 01 — "First Contact"

**Subtitle:** VR & Haptics Lab · Qatar University CSE Department · Jun – Oct 2023  
**Image pair:** `frame-1a.png` (rest) · `frame-1b.png` (powered on)  
**Aspect:** Cinematic landscape (~2.5:1, ~1600 × 640 source)

**SCENE.** Ahmed stands behind a cluttered HCI lab bench, sleeves up on a burgundy t-shirt, right hand raised palm-out wearing a chunky metal-and-grey haptic glove. The background is a wall of pop-art lab equipment: a red lab door on the left, two CRT-style monitors (one showing a Unity-style 3D crosshair scene, one showing a green oscilloscope waveform), a peg-boarded VR headset and a tangle of cables on the right, a small framed view of the QU *badgheer* and a date palm on the middle wall. The bench foreground has an Arduino + breadboard with rainbow jumper wires, a white coffee mug, an open manual, a sticky note. Radial speed-lines burst from the top edge of the panel toward the glove.

**HOVER (`frame-1a → frame-1b`).** The glove's fingertips power on — five sharp cobalt-blue glow-pads ignite at each fingertip with white star-burst highlights. Ahmed's expression brightens fractionally (a tiny eye-widen, mouth slightly open). Everything else in the scene is identical between the two frames. The "click" of the glove turning on is the entire animation; nothing else moves.

**LIVE CAPTION** (rendered above the panel as `h2` Fraunces): **First contact.** They handed me a haptic glove and asked if I knew Unity. I lied.

**LIVE RAIL-AVATAR BUBBLE** (fires when the panel snaps into view): *"How hard could it be?"*

---

### § 02 — "The Brain on the Screen"

**Subtitle:** Department of Mathematics, Statistics & Physics · Qatar University · Oct – Dec 2023  
**Image pair:** `frame-2a.png` (rest) · `frame-2b.png` (validated)  
**Aspect:** Landscape (~16:9, ~1600 × 900 source)

**SCENE.** Side-view of Ahmed seated at a three-monitor research desk in a grey crew-neck sweater. Chin resting in his left hand, mechanical pencil in his right, mid-tap against an open notebook. Three monitors fan across the desk: left = brain MRI in axial view, center = descending loss curve over an IDE, right = a paper preview with a bold red diagonal "UNDER REVIEW" mark. The wall above the monitors is a riot of yellow / pink / cyan sticky notes. The far-left background frames a window with half-shut venetian blinds; the QU *badgheer* are visible silhouetted in night sky beyond. A handwritten dice-loss equation is chalked on a board in the upper-right corner.

**HOVER (`frame-2a → frame-2b`).** Two small green checkmark stamps appear: one on the brain-MRI monitor (the segmentation is correct) and one in the upper-right corner of the paper-preview monitor (the paper is accepted). The red "UNDER REVIEW" mark stays — but is now overruled by the checkmark. Ahmed's expression doesn't change; the work speaks. Everything else in the scene is identical between the two frames.

**LIVE CAPTION:** **Six months later.** Brain MRIs, imbalanced classes, custom PyTorch loaders. Three architectures benchmarked. One that won.

**LIVE RAIL-AVATAR BUBBLE:** *"The simple model beat the fancy one. I didn't see that coming."*

---

### § 03 — "Reading the Image"

**Subtitle:** Weill Cornell Medicine Qatar · AI Research Specialist · Oct 2023 → Present  
**Image pair:** `frame-3a.png` (rest) · `frame-3b.png` (lesion found)  
**Aspect:** Portrait (~3:4, ~1200 × 1600 source)

**SCENE.** Ahmed at a multi-monitor research workstation, leaning forward in a dark-blue button-down with sleeve rolled, drawing on a Wacom-style tablet with a stylus. Surrounding him: a pipeline diagram (small monitor, upper-left), a code editor with syntax-highlighted Python (top-center), a loss curve plot (top-right), an agent-graph flowchart (center-right), an X-ray with an accompanying clinical report (far-right), and a small glass-brain sculpture on a stack of books. Radial speed-lines burst from behind Ahmed's head; cyan halftone dots wash the upper background.

**HOVER (`frame-3a → frame-3b`).** A small red highlight box appears on the X-ray monitor, marking the suspected lesion. A green checkmark lights up beside it on the clinical report. The arrow from Ahmed's gesturing hand toward the X-ray sharpens — the model and the clinician now agree. Ahmed's expression brightens by one notch (a hint of a smile). Nothing else in the panel changes.

**LIVE CAPTION:** **Now.** I'm building agentic RAG for radiology. The clinicians ask the questions. The models try to answer them.

**LIVE RAIL-AVATAR BUBBLE:** *"Let me check the retrieval first."*

---

### § 04 — "Two Futures"

**Subtitle:** Next Issue · Industry or Graduate School · Trustworthy AI for Medicine  
**Image pair:** `frame-4a.png` (industry path) · `frame-4b.png` (academic path)  
**Aspect:** Portrait (~3:4, ~1200 × 1600 source)

**SCENE.** Ahmed walking forward through an open plaza, mid-stride, half-turned to glance back over his right shoulder at the reader. A small smile. A notebook tucked under his arm.

- **`frame-4a` (rest, "industry").** Navy three-piece suit, leather briefcase, white notebook. Background: modern glass-and-steel office buildings, manicured trees lining a clean stone walkway, golden-hour sun setting between skyscrapers. The visual cue is clean corporate.
- **`frame-4b` (hover, "academia").** Casual navy sweater over a white tee, tan messenger bag, the same white notebook. Background: a domed classical academic building with columns and a quadrangle, students walking in the distance, mid-day sun. The visual cue is campus life.

This panel makes the hover beat into a *choice*: hover swaps the future. The reader sees both possibilities. Ahmed himself doesn't change — the same face, the same notebook, the same half-smile — only the world he's stepping into changes around him.

**HOVER (`frame-4a → frame-4b`).** Entire scene transitions — clothes, bag, buildings, lighting, foliage — across the same standing figure of Ahmed. The cross-fade is the longest of the four panels (260ms instead of 180ms) to let the two worlds register sequentially: first the new clothes, then the new buildings, then the new sun. Tap on touch to lock either future in place.

**LIVE CAPTION:** **To be continued.** Industry or graduate school. Trustworthy AI for medicine, either way. You're reading the application.

**LIVE RAIL-AVATAR BUBBLE:** *"You pick the next issue."*

**EXIT.** This is the last panel and the closing splash of the issue. There is no "next panel" — instead, an inline `↑ BACK TO ISSUE 01` button at the bottom-right of the strip scrolls the user back to the hero. The cartoon Ahmed on the rail beneath the strip walks all the way to the right edge, stops, turns to face the reader, and waves once (Pose 4 swap). The wave is the closing beat of the issue.

---

### Panel transitions

When the user advances from one panel to the next:

- The leaving panel slides 100% to the left over 480ms with a custom cubic-bezier ease (`cubic-bezier(0.7, 0, 0.3, 1)` — a tight, ink-feeling ease).
- The arriving panel slides in from the right at the same speed.
- The avatar on the rail underneath walks at a pace synchronized with the slide — he takes exactly four steps per panel transition. The rail is wide enough that he never appears teleported; you can see his stride.
- Panel borders briefly flash in (1px stroke fading up over the first 200ms of transition) to draw the eye to the new frame.

### Keyboard and accessibility

- `←` / `→` advance panels (horizontal-snap surfaces).
- `↑` / `↓` advance panels (vertical-snap surfaces: mobile web, iPhone, Android phones).
- `1` / `2` / `3` / `4` jump directly to that panel.
- `Space` or `Enter` while a panel is focused toggles the `a → b` swap (the keyboard equivalent of hover). Focus is signaled by a 2px Ink ring offset 4px outside the panel border — the only focus indicator in the section.
- `Tab` / `Shift+Tab` cycles focus to each panel's caption block, allowing screen readers to traverse the story as ordered text. Each panel's live caption (above the panel) and live rail-avatar bubble (below the panel) are HTML/SwiftUI/Compose elements, fully accessible. The image itself carries an `aria-describedby` reference to a hidden long-description block that narrates both the rest state and the hover state in plain prose (e.g., *"Ahmed in a lab holding a haptic glove. On interaction, the glove's fingertips light up blue."*).
- `prefers-reduced-motion: reduce` (web), **Reduce Motion** (iOS), and **Remove Animations** (Android) disable the cross-fade. The swap becomes an instant state change — `frame-Na` is shown until interaction, then `frame-Nb` is shown until interaction-end, with no fade between. The two frames remain available; only the transition is suppressed.
- Each panel has a hidden `<figcaption>` (or `accessibilityLabel` on native) containing the panel's full description (caption + rest-state description + hover-state description + rail-avatar bubble), in reading order, available to screen readers and search engines.

### Asset checklist (already delivered)

The frames already live at `D:\Projects\Portfolio\storyline\` and ship inside the build as static assets. For each panel:

1. **Two frame PNGs** — `frame-{N}a.png` (rest) and `frame-{N}b.png` (hover). Both at the panel's native aspect: cinematic landscape for § 01, 16:9 landscape for § 02, portrait 3:4 for § 03 and § 04. The pair is preloaded together so the swap has no network latency.
2. **A WebP companion** for each frame, generated at build time at 60% quality. Browsers that support WebP get the smaller asset; PNG is the fallback. On native iOS, both formats are bundled as `Image` assets in the asset catalog; on Android, both live in `res/drawable-{density}` with density qualifiers.
3. **A 32 × 32 panel thumbnail** for the jump-buttons (`§ 01` `§ 02` `§ 03` `§ 04`) — a cropped silhouette of the `a` frame's key figure or prop, exported as SVG.
4. **A plain-prose alt-text pair** per panel — one sentence describing `a`, one sentence describing `b` — stored alongside the image as `frame-{N}{a|b}.alt.txt` and surfaced via `aria-label` / `accessibilityLabel`.

The live `speech-bubble` component beneath the strip is rendered by the app, not the illustrator — it is HTML/SwiftUI/Compose and is fully selectable, translatable, and screen-readable.

## Interaction & Motion

The page is gamified. Not "scroll a thing and a Lottie plays" gamified — *gamified* in the sense that the user has small toys to find and the page rewards attention. Every interaction below is defined in this system; nothing outside this list is permitted.

### Cursor as gaze

On desktop, the cursor is the default arrow. On hover over the avatar (in any pose where his face is visible — Poses 1, 3, 4, 6), his pupils track the cursor with a 12px deflection range and a 120ms ease. The illusion is small and reliable; it is also the only animation that runs whenever the avatar is on screen.

**Tablet, mobile, and native.** No cursor exists, so gaze follows the *device gyroscope* instead — the pupils deflect up to 8px against `deviceorientation` on web or `CMMotionManager` (iOS) / `SensorManager.TYPE_ROTATION_VECTOR` (Android) on native. The effect is intentionally subtler than desktop (8px vs 12px) and clamped to ±15° of device tilt so it never makes the avatar look seasick. If motion-sensor permission is denied or the device cannot report orientation, gaze falls back to the nearest tappable element — pupils point at whichever card, button, or input is closest to the avatar's bounding box. On `prefers-reduced-motion`, gaze is locked forward.

### Speech bubbles

A `speech-bubble` component fires when:

- The cursor hovers a project card (one bubble per card, with that project's hook line).
- The story strip advances to a new panel (the bubble above).
- The user idles for 8 seconds on the hero (Ahmed says: *"Take your time."*).
- The user reaches the footer (Ahmed says: *"Thanks for reading the whole issue."*).

Bubbles enter with a 200ms scale-up from 0.92, anchored to the avatar's mouth. They exit on cursor-out with a 120ms fade. Never more than one bubble on screen.

**Touch & native triggers.** On any surface without hover, the same bubbles fire on different triggers: scroll-into-view (project cards — bubble fires when the card crosses 50% viewport height), panel snap (story strip — bubble fires on the same beat as desktop, after the snap settles), 8-second idle on hero, and footer-in-view. Bubbles are dismissable by tapping anywhere outside them. On native, the bubble enters with a `spring(response: 0.28, dampingFraction: 0.7)` on iOS or a `Spring(stiffness = StiffnessMediumLow)` on Android, and is announced to VoiceOver / TalkBack as a polite live region so screen-reader users hear the line. A faint `softHaptic` fires on entry (one tap, no buzz).

### Magnetic CTAs

The two primary buttons (`READ THE CV ↗` in the hero, `SEND →` in the footer) are magnetic — within a 96px radius the button center shifts toward the cursor by up to 8px. The arrow glyph rotates 12° on hover. Restraint: only these two buttons. No magnetism on cards, nav links, or form inputs.

**Touch & native.** Magnetism is disabled on touch surfaces — there is no cursor to track. The replacement is a *press elasticity*: on touch-down the button compresses by 2px in the direction of the press (calculated from the touch point relative to the button center), and the arrow glyph rotates 12° toward the press point. On release, the button springs back over 220ms. On iOS this is a `withAnimation(.interpolatingSpring(stiffness: 220, damping: 14))`; on Android, `spring(stiffness = StiffnessMedium)`. Press elasticity is suppressed under `prefers-reduced-motion` / Remove Animations.

### Marker draw-on-scroll

The `highlight-wash` mark behind a word does not fade in — it *draws* in, from left to right, on a 600ms hand-easing curve, when the section enters the viewport. It is the only animation that touches text.

### Project card lift

On hover, a `card-project` raises 4px (translateY) with a 1px Hairline rule appearing beneath it as a "shadow." On press, it drops 2px (press feedback). On click, the card transitions to its detail page with a shared-element animation: the card scales up to occupy the new page's `detail-hero` slot over 400ms.

### Comic-strip scroll

The Story Mode panel uses CSS `scroll-snap-type: x mandatory`. Horizontal scroll, trackpad swipe, `←/→` arrow keys, and on-screen `<` / `>` chevrons all advance one panel. Avatar walk speed is locked to scroll position via `scroll-timeline`.

### Konami easter egg

Typing `↑ ↑ ↓ ↓ ← → ← → B A` triggers a one-time animation: every avatar pose on the page swaps to Pose 4 (waving) for two seconds, and a single bubble appears at center: *"You found me."* Then everything returns to normal. Logged in `localStorage` so it never fires twice.

**Touch & native equivalent.** No keyboard exists on phones, so the sequence is replaced by a 5-tap on the wordmark sparkle within 1.5 seconds. The same bubble fires; the same once-per-device rule applies, persisted in `localStorage` on web or `UserDefaults` / `DataStore` on native. On iOS, the tap pattern additionally fires a single `UINotificationFeedbackGenerator.success` haptic the moment the bubble appears. On Android, `HapticFeedbackType.Confirm`.

### Cursor coordinate readout

A tiny `mono-caps` readout in the bottom-right of every viewport: `X 1247 / Y 503`. Updates in real time. This is the page admitting it is a website. It is the only piece of UI that is unapologetically nerdy.

**Touch & native replacement.** Without a cursor, the readout is replaced by a *scroll progress* readout in the same position: `§ 02 / 05 · 47%`. It shows the current panel index and the percentage scrolled within the page (web) or the current scroll offset relative to total content height (native). Same `mono-caps` Slate, same 16px inset, same understated tone. On native, it is exposed to VoiceOver / TalkBack as `"Section 2 of 5, 47 percent."` and refreshes on every scroll-end event, not on every frame.

### Touch & gesture grammar

A single, consistent gesture vocabulary across web-touch, iOS, and Android:

- **Tap** — primary activation. Press feedback is the 2px drop defined under Elevation & Depth.
- **Long-press (500ms)** — opens the avatar's expression menu on touch: a single sheet of poses with a one-line caption each. Tap a pose to swap the current avatar to it for 4 seconds. Disabled on form fields.
- **Horizontal swipe** — advances the Story Mode strip on tablet (`pan-x`), navigates between project detail pages on iOS/Android (`UISwipeGestureRecognizer.left/right` / `Modifier.draggable`).
- **Vertical swipe** — scrolls the page; on Story Mode mobile, also advances the strip (panels are stacked).
- **Pinch / zoom** — disabled on the issue body (`touch-action: pan-y pinch-zoom: false` is *not* set; the page allows browser zoom for accessibility, but no custom pinch gestures are registered).
- **System back gesture (Android edge swipe, iOS edge swipe from left)** — pops a project detail page back to the issue. On iOS, this is the default `NavigationStack` behavior; on Android, `BackHandler` in Compose.
- **Pull-to-refresh** — disabled. The page is editorial, not a feed.

Every gesture has a non-gesture fallback: every swipe also has a visible chevron, every long-press also has a tap-equivalent menu entry, every gyroscope-driven gaze gracefully degrades to nearest-element-pointing.

### Native haptics

Haptics are restraint-only — they fire on exactly five beats and nowhere else.

- **Panel snap in Story Mode** — `UIImpactFeedbackGenerator.medium` (iOS) / `HapticFeedbackType.LongPress` (Android).
- **Speech bubble entry** — a single soft tap, `UIImpactFeedbackGenerator.soft` / `HapticFeedbackType.TextHandleMove`.
- **Button press release** (`button-primary` and `button-ghost` only) — `UIImpactFeedbackGenerator.light` / `HapticFeedbackType.VirtualKey`.
- **Konami / 5-tap easter egg** — `UINotificationFeedbackGenerator.success` / `HapticFeedbackType.Confirm`.
- **Form submission success** — same as Konami. The contact form fires this once on a successful `SEND →`.

All haptics suppress under iOS **Reduce Motion** *and* under the system's **Haptics** toggle, and under Android **Remove Animations**. The page never fires a haptic that the user has not opted into.

### Reduced motion

When `prefers-reduced-motion: reduce` is set (web), or **Reduce Motion** is enabled on iOS, or **Remove Animations** is enabled on Android: marker-wash appears with a 200ms fade, no draw. Magnetic CTAs disabled. Press elasticity disabled. Avatar eyes stop tracking (and gyroscope gaze on mobile/native is locked forward). Speech bubbles still fire (they are content, not motion) but enter with a 120ms opacity fade instead of the scale-spring. Comic strip becomes a regular scroll without snap on web; on iOS it falls back to `PageTabViewStyle(indexDisplayMode: .never)` without spring; on Android it falls back to `HorizontalPager` with `flingBehavior = ScrollableDefaults.flingBehavior()` (no snap distance constraint). All haptics suppress. The system is fully usable; only the polish drops.

### Reduced data & offline

The page is editorial — most of its weight is type and SVG, both of which compress aggressively. The two heavy assets are the avatar poses (PNGs) and the Story Mode panels. On `Save-Data: on` (web) or Low Data Mode (iOS) / Data Saver (Android), the Story Mode panels load at 50% resolution (the same source art exported at half-pixel-density), the avatar's eye-tracking deflection drops from 12px to 4px (smaller animation, smaller delta), and the marker-wash uses a static fill instead of an SVG path animation. Native shells cache all five panels and avatar poses on first run so the issue reads offline; web shells use a service worker with a stale-while-revalidate strategy for the same assets.

## Elevation & Depth

There is no traditional elevation system. No drop shadows. No blurs. No glassmorphism. Depth is communicated by exactly four mechanisms:

- **A single tone step.** Bone (`#FAFAFA`) sits one tick under Page. That is a card.
- **A 1px Hairline rule.** That is a divider, a card edge on hover, a table row.
- **Whitespace.** Reckless amounts of it.
- **Press feedback.** On `:active`, interactive elements drop 2px. This is the only motion-as-depth allowed.

If a component cannot be resolved with tone + hairline + space + press, the component is wrong.

## Shapes

Square is the default. The page is set on a grid; the grid is square. Three places earn curvature:

- **`rounded.sm` (2px):** Input fields. Just enough to feel touchable.
- **`rounded.md` (6px):** Project cards and comic panels. One tier softer than square to invite the click.
- **`rounded.bubble` (22px):** Speech bubbles only. With a hand-drawn tail pointing back to the avatar's mouth — the tail is rendered as inline SVG, 1px stroke in Ink, no fill.
- **`rounded.pill` (999px):** Buttons and tag chips. Full curvature concedes the user has a finger.

**The sparkle.** Every avatar pose carries a tiny 4-point diamond/sparkle in its lower-right corner. Promote that mark to the system's signature ornament. Replace default list bullets with it. Place one at the trailing edge of the hero name, the top-right corner of every project card, and the far right of the footer. The sparkle is the brand mark — the only ornament the system permits, and the page's quiet running joke.

## Components

**Navigation.** Sticky top bar, 64px tall on desktop, 56px tall on tablet, 52px tall on mobile, Page background, 1px Hairline bottom rule. Left: wordmark `A. IBRAHIM` in `label-caps` next to the sparkle. Right: four `nav-link` items — `WORK`, `STORY`, `ABOUT`, `CONTACT`. Active state has Ink background with White text (full inversion, pill-shaped, never just underlined). On hover over the wordmark, the sparkle replaces with a 32×32 Pose 4 (waving) miniature for 800ms then returns. On tablet and mobile, links collapse into a `MENU` toggle that opens a full-screen Ink overlay with White links centered (each link 44px tall minimum, 24px vertical gap), and Ahmed Pose 6 lounging at the bottom-right. The bar pads its top edge by `safe-area-inset-top` on PWAs and native shells so it clears the iOS notch and Android status bar. The wordmark-tap on touch is the only way to trigger the Pose 4 swap (which doubles as the 5-tap easter egg target).

**Hero (`§ 00`).** Two-line `display-xl` Fraunces name. Below, a `lead` paragraph (1.625rem Fraunces, soft 30) drawing from the CV summary: *"Computer engineer and AI researcher at Weill Cornell Medicine Qatar. I build large multimodal models, agentic LLM workflows, and clinical RAG systems for medicine — quietly, but with rigor."* The word **trustworthy** carries the `highlight-mark` drawing in on scroll. Beneath: two CTAs — `button-primary` (`READ THE CV ↗`) and `button-ghost` (`EMAIL ME →`). Pose 1 stands bottom-right at ~560px tall on desktop, ~360px on tablet, ~240px on mobile (anchored to bottom-right, below the CTAs rather than beside them). The desktop cursor readout sits in the bottom-right; on tablet and mobile that slot holds the scroll-progress readout (`§ 00 / 05 · 14%`) instead. The hero never clips the viewport edge below `tablet` — on mobile, the name wraps to two lines safely inside the gutter.

**Story Counter (`story-counter`).** 7rem Fraunces, tabular numerals, sits in the top-left of each comic-strip panel. Always two digits with a leading zero (`§ 01`). The counter is Ink on Bone — never animated.

**Comic Panel (`comic-panel`).** Bone fill, 32px padding, 6px rounded corners, no shadow. Contains the `story-counter`, an `h2` Fraunces title, an optional `caption-meta` (e.g. `OCT 2023 — DEC 2023 · DOHA`), and a body paragraph. The avatar walks past the panel along a rail beneath, not inside it.

**Project Card (`card-project`).** Bone fill, 36px padding, 6px rounded, sparkle in top-right. Title in `h2` Fraunces, role/date in `mono-caps` Slate (`ISSUE №03 · 2024 · IEEE ACCESS`), summary in `body-md` Charcoal, tag pills in `mono-caps` along the bottom. On hover: card raises 4px, gains a 1px Hairline rule beneath, and a speech bubble fires from the avatar (who lives in the section margin) with the project's hook line.

**Project Detail Page.** Each project has its own page at `/work/[slug]`. The page architecture:

1. **`detail-hero`** — Ink background, White type, 96px padding. Issue number (`ISSUE №03`) in `label-caps` White at the top. Project title in `display-md` Fraunces. A one-sentence subtitle in `lead`. Pose-specific avatar (Pose 4 waving for Project 1, Pose 2 walking for Project 5 / academic, Pose 3 arms-crossed for Project 3 / serious modeling work) cut out at full bleed on the right.
2. **Anatomy** — Two-column layout. Left: `Role`, `Stack`, `Status`, `Published in` (when applicable), each labeled in `label-caps` Slate. Right: 4–5 body paragraphs in `body-lg` Charcoal walking through the work — problem, approach, what was hard, what shipped, what's next.
3. **Artifacts** — A row of monochrome figures, diagrams, or architecture sketches in Bone-surfaced cards. For the stroke paper: the comparative metrics table. For the RAG project: a Mermaid diagram of the retrieval pipeline. Each figure has a `caption-meta` Slate caption.
4. **Footnotes** — Inline citations rendered as `mono-sm`, hanging-indent. The stroke paper page carries the full IEEE Access citation as the first footnote.
5. **Next Issue** — A 1px Hairline rule, then a wide Bone strip with `NEXT ISSUE →` in `label-caps`, then the next project's title in `h1` Fraunces. Click to walk to the next page; on hover, Pose 2 (walking) appears at the strip's left edge.

**Tag pill (`tag-pill`).** Mist fill, Charcoal mono caps, pill radius. Used on cards and the skills section only.

**Speech Bubble (`speech-bubble`).** White fill, 1px Ink stroke, 22px corner radius. A hand-drawn SVG tail (1px Ink, no fill) anchors to the avatar's mouth. One sentence of `speech` type inside. Bubbles never carry CTAs, never carry links, never wrap to more than three lines.

**Buttons (`button-primary` / `button-ghost`).** Pill radius. Primary is Ink fill with White text. Ghost is Page fill with Ink text and a 1px Ink stroke. Both carry a trailing arrow glyph: `↗` for external, `→` for in-page, `↓` for download. Both are magnetic in the hero and footer; everywhere else they are static.

**Inline Link (`link-inline`).** Ink text, 1px Hairline underline 2px below baseline. Hover thickens the underline to 2px Ink. Color never changes; visited never styles.

**Field Input (`field-input`).** Page fill, 1px Hairline bottom border only (no box). 14px padding, `body-md` type. On focus, the bottom border thickens to 2px Ink. No focus ring, no shadow. Labels float above the field in `label-caps` Slate.

**Caption / Metadata (`caption-meta`).** Slate, `label-caps`, tracked. Dates, locations, venues, role titles.

**Highlight Mark (`highlight-mark`).** A `<mark>` element with `highlight-wash` background, no text color change. Drawn left-to-right on scroll entry. One per section.

**Cursor Readout.** Bottom-right of viewport, 16px from each edge, `mono-caps` Slate, `X 1247 / Y 503` format. Updates on `mousemove`. Disappears on touch devices. **Scroll Readout (touch/native replacement).** Same slot, same `mono-caps` Slate. Renders `§ 02 / 05 · 47%` and updates on scroll-end. On native, exposed to VoiceOver / TalkBack as `"Section 2 of 5, 47 percent."` Both readouts sit 16px above `safe-area-inset-bottom` so they clear the iOS home indicator and Android gesture bar.

**Footer (`footer-panel`).** Ink background, White type. Three columns desktop, two columns tablet, stacked mobile: Contact (`akzmibrahim@gmail.com` · `+974 51372633` · `Doha, Qatar`), Elsewhere (`LinkedIn ↗` · `GitHub ↗` · `Google Scholar ↗`), Colophon (a 3-line paragraph naming Fraunces, Inter, JetBrains Mono, and crediting the hand-drawn avatar). Bottom row: `© 2026 AHMED IBRAHIM · ISSUE 01 · SET IN FRAUNCES & INTER · DOHA, QATAR` with a sparkle at far right. Above the footer, a `speech-bubble` fires once: *"Thanks for reading the whole issue."* On mobile and native, the phone number is a `tel:` link, the email is a `mailto:` link, and the location opens the platform map app (`maps:` URL on iOS, `geo:` URI on Android). The footer pads its bottom edge by `safe-area-inset-bottom` so the colophon row never collides with the iOS home indicator or Android navigation gesture bar.

**404 (`/404`).** A standalone page. Page background. A massive `display-xl` `404` clipping the viewport on desktop, sized down per the responsive scale on tablet (`4.5rem`) and mobile (`3rem`) where it does not clip. Pose 6 (lounging) center-stage. A speech bubble: *"This page is taking a break. I get it."* A single `button-ghost` `← BACK TO ISSUE 01`. No nav, no footer — the 404 is the back cover. On native, the 404 surfaces from any unresolved deep link or `NavigationStack` fallback; the system back gesture or the ghost button both return to the hero.

## Native (iOS & Android)

The native shells implement the same five-panel issue with the same tokens. What changes is the implementation surface — system fonts as fallback, native navigation containers, native gesture and haptic primitives, native accessibility integrations. Below is the component-by-component mapping.

### Navigation

- **iOS.** A `NavigationStack` (not a `TabView` — the issue is linear). The top bar is a custom `ToolbarItemGroup` with the wordmark `A. IBRAHIM ✦` on the leading edge and a single `Menu` button on the trailing edge (no four-link tab — `WORK / STORY / ABOUT / CONTACT` map to in-page anchors via `ScrollViewReader`). The bar is `.toolbarBackground(.visible, for: .navigationBar)` with `Color("Page")` and a `.hairline` divider drawn as a `Rectangle().frame(height: 1).foregroundColor(.border)` overlay.
- **Android.** A `TopAppBar` (Material 3) styled to match: `containerColor = Page`, `titleContentColor = Ink`, with the wordmark as the title and a single `IconButton` (`Icons.Default.Menu`) on the right. Below it, a `Divider(thickness = 1.dp, color = Border)` enforces the hairline rule. Edge-to-edge with `WindowCompat.setDecorFitsSystemWindows(false)` and `Modifier.statusBarsPadding()` on the bar itself.

### Detail-hero (project pages)

- **iOS.** A `GeometryReader`-bound header at the top of a `ScrollView`. The pose-specific avatar is a `Image(.pose4)` at the trailing edge, `.aspectRatio(contentMode: .fit)`, sized to 60% of the hero height. Title uses `.font(.custom("Fraunces", size: 64).weight(.heavy))` (display-md, desktop) scaled by `Dynamic Type` via a `@ScaledMetric` wrapper.
- **Android.** A `Box` with `Modifier.fillMaxWidth().heightIn(min = 480.dp)`, `background = Ink`, `contentColor = onPrimary`. The avatar is an `Image(painter = painterResource(R.drawable.pose4))` aligned `Alignment.BottomEnd`. Title uses `FontFamily(Font(R.font.fraunces_variable))` with `fontSize = MaterialTheme.typography.displayMedium.fontSize * fontScale.coerceAtMost(2f)`.

### Story Mode container

- **iOS (iPad).** `TabView { ForEach(panels) { ... } }.tabViewStyle(.page).indexViewStyle(.page(backgroundDisplayMode: .never))`. Custom paging indicator is a row of four `§ 0n` mono-caps labels at the bottom, active panel inverted.
- **iOS (iPhone).** Vertical `ScrollView` with a `LazyVStack(spacing: 0)` and a custom snap modifier `.scrollTargetBehavior(.viewAligned)` (iOS 17+). Each panel is a `GeometryReader` that reports its midY, driving the avatar overlay's offset.
- **Android.** `HorizontalPager(state = pagerState, pageSpacing = 0.dp, flingBehavior = PagerDefaults.flingBehavior(state = pagerState, pagerSnapDistance = PagerSnapDistance.atMost(1)))` on tablets. On phones, `LazyColumn(state = listState, flingBehavior = rememberSnapFlingBehavior(...))`.

### Speech bubble

- **iOS.** A `ZStack` overlay drawn as a custom `Shape` — a rounded rectangle with a `Path`-drawn tail. `Text(line).font(.custom("Inter", size: 15).weight(.medium))`. Entry animation: `withAnimation(.spring(response: 0.28, dampingFraction: 0.7)) { isPresented = true }`. The bubble is announced via `.accessibilityElement(children: .combine)` and `.accessibilityAddTraits(.isStaticText)`.
- **Android.** A `Card` with a custom `Shape` (Compose `GenericShape` for the tail). `Text(line, style = MaterialTheme.typography.bodyMedium.copy(fontWeight = FontWeight.Medium))`. Entry animation: `AnimatedVisibility(visible = isPresented, enter = scaleIn(animationSpec = spring(stiffness = StiffnessMediumLow)) + fadeIn())`.

### Button-primary / button-ghost

- **iOS.** A custom `ButtonStyle` (`InkPillStyle`) that renders the pill, applies press elasticity via a `@GestureState pressOffset: CGSize`, and triggers `UIImpactFeedbackGenerator(style: .light).impactOccurred()` on `.onEnded`. Trailing arrow glyph is a `Text("↗")` with `.rotationEffect(.degrees(isPressed ? 12 : 0))`.
- **Android.** A `Button(onClick = onClick, shape = RoundedCornerShape(50.dp), colors = ButtonDefaults.buttonColors(containerColor = Ink, contentColor = OnPrimary))` wrapped with a `Modifier.combinedClickable` whose `onClick` calls `view.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY)`.

### Field-input

- **iOS.** A `TextField` with `.textFieldStyle(.plain)` and a custom underline drawn as a `Rectangle().frame(height: 1).foregroundColor(.border)`. On `.focused`, the rectangle animates to `.frame(height: 2).foregroundColor(.primary)`.
- **Android.** A `BasicTextField` with a custom `decorationBox` that draws the bottom underline as a `Divider`. The underline thickens to `2.dp` and recolors to `Ink` on `interactionSource.collectIsFocusedAsState() == true`.

### Footer

- **iOS.** A `VStack` at the bottom of the root `ScrollView` with `.background(Color.primary).foregroundColor(.onPrimary)`. Bottom padding includes `safeAreaInsets.bottom + 24`.
- **Android.** A `Surface(color = Ink, contentColor = OnPrimary)` at the bottom of the root `LazyColumn`. `Modifier.windowInsetsPadding(WindowInsets.navigationBars).padding(bottom = 24.dp)`.

### 404

- **iOS.** Not a route per se — surfaced as a `.sheet` when a deep link resolves to nothing, or as a `NavigationStack`'s `.navigationDestination` fallback. Same visual: massive `404` in `display-xl mobile`, Pose 6, speech bubble, and a single `BACK TO ISSUE 01` ghost button.
- **Android.** A `composable("404")` destination inside `NavHost`. Same visual. The system back gesture returns to the hero.

### Asset density

All bitmap assets — avatar poses, comic-strip base images, sparkle ornament if rasterized — ship at three densities: `@1x` for low-DPI Android (mdpi) and small web, `@2x` for retina web and Android xhdpi, `@3x` for Android xxhdpi and iOS retina. Source artwork is exported from the illustrator's master at 3x and downsampled. SVG (sparkle, speech-bubble tail, agent-graph arrows, halftone-sunrise rings) is the preferred format wherever possible and ships at a single density.

### Accessibility integrations

- **iOS.** Every interactive element has an `.accessibilityLabel` and `.accessibilityHint`. The avatar carries `.accessibilityHidden(true)` on poses where the speech bubble's text already conveys the moment — the bubble itself is the accessible announcement. VoiceOver reading order is enforced via `.accessibilitySortPriority`. Dynamic Type is supported up to `accessibility5`; the type scale clamps at 200% to keep `display-xl` from overflowing.
- **Android.** Every interactive element has a `Modifier.semantics { contentDescription = "..." }`. The avatar carries `Modifier.clearAndSetSemantics { }` where decorative. TalkBack reading order is enforced via `Modifier.semantics { traversalIndex = N }`. Font scale supported up to 200%; the type scale clamps at 200%.
- **Both.** Every speech bubble is announced as a polite live region (`liveRegion = LiveRegionMode.Polite` / `.accessibilityLiveRegion(.polite)`). Every panel has a hidden caption block (`.accessibilityElement` containing caption + dialogue + SFX in reading order) so the issue can be traversed linearly without sight.

## Do's and Don'ts

**Do** keep the palette strictly neutral *outside* the Story Mode panels. Pure black, pure white, neutral grays. If a render ever shows a warm or cool cast on the hero, the footer, a project card, the navigation, or anywhere else, that is a bug. The four story-mode frame pairs are the *only* permitted color in the system.

**Do** let the hero name clip the viewport edge *on desktop*. The clipped letterform is the system's signature move at `1024px+`. Below `tablet`, the name wraps instead — clipping at phone widths reads as a broken layout, not editorial intent.

**Do** treat the avatar as a character. He has poses, he has gaze, he has speech bubbles. He is not a decorative blob.

**Do** make speech bubbles short. One sentence. If a bubble needs two sentences, it needs to be a paragraph, and a paragraph belongs on the page, not in a bubble.

**Do** use the sparkle as the universal bullet, the wordmark companion, the project-card corner mark, and the footer-end ornament. It is the only ornament permitted.

**Do** keep the comic-strip story panel locked to scroll-snap with full keyboard control. Anyone using arrows must be able to traverse the whole experience.

**Do** ship a project detail page per project, each with its own `detail-hero`, its own anatomy section, and a `NEXT ISSUE` strip at the bottom.

**Do** respect `prefers-reduced-motion`. Marker wash fades instead of draws, magnetism disabled, eye-tracking off. The system must remain fully usable without motion.

**Don't** introduce color *outside* the Story Mode panels. Not for error states. Not for success ticks. Not for graphs. Not for nav highlights. Not for hover affordances. If you need to signal an error, thicken the input's bottom border to 2px Ink and prepend the label with `!`. If you need to plot data on a project page, do it in grayscale only. The color budget for the entire site is spent on the eight pop-art frame images; everything else is neutral.

**Don't** use pure `#000000` or pure `#FFFFFF` for the *figure outline*. Ink is `#0A0A0A`. White-on-Ink is `#FFFFFF` (which is fine for type on a black surface), but the avatar's outline is always Ink, never true black.

**Don't** use drop shadows, blurs, glassmorphism, or any colored elevation. Depth is tone + hairline + air + press.

**Don't** place the avatar on a Surface card or on the Ink Footer panel. He lives on Page only. Inverse surfaces are for him to walk *off* the screen at panel transitions.

**Don't** let the avatar idle-animate (blinking, bouncing, breathing). Stillness is the source of his gravitas. The only motion he is permitted is eye-tracking, the comic-strip walk, the wordmark wave on hover, and a one-time Konami wave.

**Don't** mix `Fraunces` and `Inter` inside a single line. Headlines are Fraunces. UI is Inter. Code is JetBrains Mono. No exceptions for emphasis — italics inside Fraunces handle emphasis natively.

**Don't** lowercase the navigation labels or section eyebrows. `label-caps` is structural; it is what makes the page feel like a print folio.

**Don't** add a "Hire me" sticker, a testimonials carousel, a press logo strip, or any social-proof scaffolding. The IEEE Access citation, the WCM-Q affiliation, and the project work *are* the proof. The page is the voice.

**Don't** trigger more than one speech bubble at a time. They are a punctuation mark, not a chorus.

**Don't** allow more than one `highlight-mark` per section. Two is graffiti. Three is a brochure.

**Do** keep the design tokens identical across web, iOS, and Android. Only sizes (responsive scale), gestures (touch vs cursor), and ornamentation density (8px gaze deflection on touch vs 12px on desktop) change. Color, type family, rounding, and spacing are universal.

**Do** honor every system accessibility preference on every platform: `prefers-reduced-motion` on web, Reduce Motion + Dynamic Type + Increase Contrast on iOS, Remove Animations + Font Scale + High Contrast Text on Android. The system must remain fully usable when every motion is suppressed.

**Do** pad every safe-area edge on every platform. The notch, the Dynamic Island, the home indicator, the Android status bar, the Android navigation bar — none of them are ever overlapped by content.

**Do** ship a non-gesture fallback for every gesture. Every swipe has a visible chevron. Every long-press has a tap-equivalent. Every gyroscope gaze degrades to nearest-element-pointing. The page must work for a user with one finger, one switch, or one keyboard.

**Don't** fire haptics the user has not opted into. Suppress every haptic under Reduce Motion / Remove Animations and under the platform's haptics toggle. The page is restrained on every surface — never buzzes for attention.

**Don't** ship platform-specific colors, materials, or theming. Material You dynamic theming is suppressed. iOS system tint is overridden to Ink. The system is monochrome by intent, even when the platform offers more.

**Don't** use platform-default navigation patterns where they conflict with the editorial reading order. The iOS tab bar, the Android bottom navigation, and the hamburger drawer all exist — none of them are used. The issue is one linear scroll on every surface, and `WORK / STORY / ABOUT / CONTACT` are anchors inside that scroll, not separate destinations.
