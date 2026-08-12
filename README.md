# Issue 01 — Ahmed

A gamified, monochrome comic-strip portfolio, built to the spec in [DESIGN.md](DESIGN.md).

The deployable site lives in **`site/`** and has **zero runtime dependencies** — it is
plain HTML, CSS, and one vanilla-JS file. You can open `site/index.html` directly, or
serve the folder anywhere static.

## Structure

```
site/
  index.html               5-panel issue: Cover · Who · Story · Work · Send
  styles.css               full design-token system from DESIGN.md
  script.js                gaze-free interaction layer (see notes)
  404.html                 the back cover
  work/*.html              5 project detail pages
  assets/                  optimized WebP/PNG frames + monochrome avatar cutouts
```

## Dependencies — kept project-local

There is no Python here, so there is no `venv`; the Node equivalent is a project-local
`node_modules` (never installed globally). It contains **only build-time tools**:

- `sharp` — image pipeline (cutout, grayscale, resize, WebP).

The shipped site uses none of it.

## Running the website

The site is static, so you have two options.

**Quickest — no install:** open `site/index.html` directly in a browser.

**Local server (recommended):**

```bash
npm install                  # one-time: fetch build-time tools (sharp)
npm run serve                # serve at http://localhost:4173
# or pick a port:  PORT=8080 npm run serve
```

`npm install` is only needed if you also want to run the asset build; the
server itself has zero runtime dependencies.

> **Windows PowerShell note:** if `npm` fails with *"running scripts is
> disabled on this system"*, either call `npm.cmd install` / `npm.cmd run
> serve`, or enable scripts for your user once with
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Other commands

```bash
npm run build     # regenerate site/assets + detail pages from source art
npm run preview   # alias of npm run serve
```

Source art (`storyline/`, `ahmed-avatar/`) and the build scripts
(`build-assets.js`, `gen-pages.js`) stay at the repo root and are not deployed.

## Notes / deviations

- **Avatars** were delivered with a warm cream background baked in. To honor the
  strict-monochrome rule the pipeline flood-fills that background to transparent
  (the ink outline is a hard barrier, so the figure interior is untouched) and
  grayscales the figure. The four Story Mode frames keep their full color — the
  one intentional color island.
- **Eye-tracking gaze** is the one DESIGN.md interaction not implemented: the
  avatar art has baked-in eyes (raster), so per-pupil tracking isn't possible
  without separate eye sprites. Everything else — speech bubbles, story-strip
  hover/tap a→b swap, keyboard control, magnetic CTAs, marker-draw-on-scroll,
  Konami / 5-tap egg, cursor & scroll readouts, reduced-motion fallbacks — is in.
