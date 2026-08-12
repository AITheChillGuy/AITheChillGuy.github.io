# Work Pages Plan — one bespoke page per project

Goal: replace the six template work pages with unique, interactive designs, the
way `work/hgts.html` already got its own treatment (3D viewer + gallery). Each
page's design should *embody the paper's mechanism* — the interaction IS the
explanation. One page per session, deployed and verified before the next.

## Ground rules (apply to every page)

- **Stay in the system:** strict monochrome, Fraunces / Manrope / JetBrains
  Mono, hairline borders, `label-caps` eyebrows, editorial voice. Unique ≠
  off-brand: each page gets its own *motif*, not its own palette.
- **Vanilla only.** No frameworks. Page-specific CSS appended to `styles.css`
  under a namespaced block (like `.hgts-*`); page-specific JS inline in the
  page (like hgts's reset-view script). Assets vendored, never hotlinked.
- **Honest numbers.** Before building a page, fetch the actual paper and pull
  real metrics for the stats/figures. No invented benchmarks.
- **Respect `prefers-reduced-motion`** for every animation; everything must
  degrade to a readable static page with JS off.
- **Light pages.** Target < 300 KB added per page (excluding shared assets);
  no scroll-jacking on mobile; test at 360px width.
- **Ship loop per page:** fetch paper → design → build → link-check → commit →
  push (auto-deploys) → verify live → update this file's checklist.

## The pages, in build order

### 1. `agentic-ai.html` → TriAgent  ★ start here (content is stale, not just plain)
**Paper:** "TriAgent: An Adaptive Multi-Agent Architecture for Crisis Clinical
Decision Support Under Incomplete Information" — Ibrahim, AlSanousi, Serag.
*AI* 7(6):230, 2026, DOI 10.3390/ai7060230. **Now published** — the index
still says `wip(agentic)` "in-progress" and it's missing from Publications.

**Story (Ahmed's framing):** this is a *crisis* system. In an ER during a
mass-casualty event — or anywhere the health system itself is in crisis:
conflict zones, disasters, places like Gaza — the patient in front of you has
no chart. No history, no med list, no allergy record, and no time. Rule-based
CDS assumes structured data that doesn't exist; a bare LLM has no mechanism
that *forces* a safety check. The page opens on that reality: a patient card
that is mostly blank — unknowns rendered as redacted/empty fields — and the
design shows the system working *around* the gaps, not pretending they aren't
there. Missing information is the protagonist, not an edge case.

**Real architecture (from the paper — drives the board):**
- **Orchestrator Agent** — routes by model reasoning, no fixed execution path;
  invokes only the modules each case requires.
- Specialist modules: **clinical assessment · retrieval · treatment planning ·
  safety verification · system coordination**.
- **Retrieval sub-agent** — iterative query refinement + relevance grading
  over **49,000 MIMIC-IV discharge notes**.
- **Medication-conflict screening** and **allergy-risk assessment** — invoked
  in parallel, only when clinically indicated.
- **Critique Agent** — reviews the full reasoning trace before the
  recommendation is finalized.

**Real numbers (retrospective, 1000 real emergency presentations with
synthesized incomplete inputs):**
- **85.0%** critical-case recall vs **≤ 14.7%** for matched single-model /
  retrieval-only baselines — the headline stat (~5.8×).
- **65.7%** overall triage accuracy vs ≤ 43.4% baselines.
- Safety checks executed on **every** continuation pathway.
- Print the paper's own caveat honestly: these are internal system
  properties; prospective clinician-involved validation still ahead.

**Motif — the live triage board:** interactive agent graph (inline SVG).
The blank patient card sits beside the board; the visitor toggles what's
known (history? med list? allergies? vitals?) and watches the Orchestrator
re-plan live — message pulses along edges, conflict/allergy modules waking in
parallel only when indicated, the Critique Agent gating the exit. A scripted
**crisis-scenario mode** steps through one incomplete-information case beat by
beat. Stats strip uses the real numbers above. Tone rule for the crisis
framing: factual and respectful — the setting explains why the problem
matters; no dramatization.

**Also in this session:** add TriAgent to the index Publications list; flip
the projects git-log entry `wip` → `paper(triagent)` + published pill; update
terminal easter eggs (`git status` "in active development", README
"drafting"); rename page to `triagent.html` with `agentic-ai.html` as a
redirect stub (matches existing stub pattern); update next-chain labels.

### 2. `mera.html` — MERA, RAG over clinical records
**Paper:** MAKE 7(3):73, 2025. RAG over MIMIC-IV-Note.
- **Story:** grounding — answers that point back into the record.
- **Motif — the chart itself:** page styled as a de-identified clinical chart:
  monospace record fields, animated **redaction bars** (the de-identification
  motif is natively monochrome). Interactive retrieval demo: pick a canned
  clinical question → matching passages highlight inside a mock note → answer
  assembles with citation markers lighting back to their source chunks.
  Scroll-driven pipeline strip: query → retrieve → ground → answer.

### 3. `menara.html` — MENARA, dialect-robust Arabic medical LLM
**Paper:** MAKE 8(4):110, 2026 + ACL ArabicNLP 2025 (model merging).
- **Story:** one model, many Arabics.
- **Motif — the language switcher:** same medical question morphing across
  MSA / Gulf / Levantine / Maghrebi / Egyptian (animated text swap, real RTL
  Arabic typography — vendor a subset of an open Arabic font) while the answer
  panel stays fixed: *many dialects, one answer quality*. Second visual: model
  merging as two/three weight-space fields interpolating into one (animated
  SVG isolines — abstract, monochrome, honest).

### 4. `d3.html` — D3, small LM vs LLMs for drug–drug interactions
**Paper:** MLwA 20:100658, 2025. ~72M params vs billion-param LLMs.
- **Story:** David vs Goliath — right-sized models.
- **Motif — scale you can feel:** log-scale parameter bars where the LLM bar
  breaks out of the chart frame; animated parameter counter; tiny display
  type for "72M" against enormous type for the giants. Interactive drug-pair
  picker over a small embedded sample of pairs → interaction card flips out.
  Cost-vs-accuracy scatter with D3 sitting in the good corner.

### 5. `stroke-segmentation.html` — do complex architectures win?
**Paper:** IEEE Access 12:198262, 2024 (+ arXiv:2403.17177).
- **Story:** controlled comparison — hold everything fixed, vary only the
  architecture.
- **Motif — the reveal slider:** stylized monochrome MRI slice (hand-drawn
  SVG, no fake patient data) with a **drag-to-compare overlay** showing
  predicted vs ground-truth lesion masks. Three architecture "weigh-in" cards
  (UNet / Attention-UNet / Transformer) with matched-conditions callout; Dice
  bars animate in; the punchline lands: complexity didn't reliably win.

### 6. `multimodal-radiology.html` — the imaging VLM line of work
**Papers:** M3 (BJR|AI 2(1), 2025) + "From Slices to Volumes" (MICCAI 2025).
Consolidates the vision-language radiology thread.
- **Story:** models that read the scan, slice by slice.
- **Motif — the scan scrubber:** a drag/scroll CT-stack scrubber (pre-drawn
  abstract slice frames, canvas or layered SVG) like a radiologist paging
  through a volume; slices visibly stack into a 3D volume (the 2D→3D fusion
  idea). Canned VQA: pick a question → attention spotlight sweeps the slice →
  answer types out as a report line.

## Progress

- [ ] 1. TriAgent (+ index publication entry, git-log flip, terminal sync)
- [ ] 2. MERA
- [ ] 3. MENARA
- [ ] 4. D3
- [ ] 5. Stroke segmentation
- [ ] 6. Multimodal radiology

## Deliberately out of scope

- Non-first-author papers without project pages (SPINE, ChatCVD, breast
  cancer, ICU readmission, …) stay list-only in Publications.
- HGTS is done; the redirect stubs (`clinical-rag.html`, `domain-llms.html`)
  stay as-is.
