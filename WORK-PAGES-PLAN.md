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
*AI* 7(6):230, 2026, DOI 10.3390/ai7060230. Now published; index still says
`wip(agentic)` and it's missing from Publications.
- **Story:** a *crisis* system. In a mass-casualty ER — or where the health
  system itself is in crisis: conflict zones, disasters, places like Gaza —
  the patient has no chart, no med list, no allergies on file, no time.
  Missing information is the protagonist, not an edge case. Tone: factual and
  respectful; the setting explains why it matters, no dramatization.
- **Motif — the live triage board:** interactive agent graph (inline SVG)
  beside a mostly-blank patient card. Toggle what's known (history / meds /
  allergies / vitals) → the Orchestrator visibly re-plans: pulses along
  edges, conflict + allergy modules waking in parallel only when indicated,
  the Critique Agent gating the exit. Scripted crisis-scenario mode steps
  through one incomplete-information case.
- **Real facts to use:** Orchestrator + specialist modules (assessment,
  retrieval, treatment planning, safety verification, coordination); retrieval
  sub-agent over 49k MIMIC-IV notes; stats — 85.0% critical-case recall vs
  ≤ 14.7% baseline (~5.8×), 65.7% vs 43.4% triage accuracy, safety checks on
  every pathway (1000 real presentations, retrospective); print the paper's
  own caveat: prospective clinician-involved validation still ahead.
- **Session also:** add TriAgent to Publications; flip git-log entry `wip` →
  `paper(triagent)` + published pill; sync terminal easter eggs; rename to
  `triagent.html` with `agentic-ai.html` redirect stub; fix next-chain labels.

### 2. `mera.html` — MERA, RAG over clinical records
**Paper:** "MERA: A Medical Electronic Records Assistant" — MAKE 7(3):73,
2025. RAG over MIMIC-IV-Note for clinical inquiry.
- **Story:** grounding — in medicine an answer is only useful if it points
  back into the record. The page performs that claim: every generated line
  visibly traces to the passage that supports it.
- **Motif — the chart itself:** the page is styled as a de-identified
  clinical chart: monospace record fields, animated redaction bars (the
  de-identification motif is natively monochrome). Interactive retrieval
  demo: pick a canned clinical question → matching passages highlight inside
  a mock note → the answer assembles itself with citation markers that light
  back to their source chunks on hover. A scroll-driven pipeline strip walks
  query → retrieve → ground → answer.
- **Fetch at build time:** the MAKE paper for real eval numbers (correctness,
  groundedness, ROUGE-1 F1, Jaccard, METEOR — metrics named on current page),
  model lineup (Mistral, Qwen), corpus size, and one real-shaped example
  question to drive the demo.

### 3. `menara.html` — MENARA, dialect-robust Arabic medical LLM
**Paper:** "MENARA: Medical Natural Arabic Response Assistant" — MAKE
8(4):110, 2026 + companion "Bridging Dialectal Gaps…" ACL ArabicNLP 2025.
- **Story:** one model, many Arabics. MSA is what textbooks are written in;
  patients ask in Gulf, Levantine, Maghrebi, Egyptian. A model that only
  speaks "textbook" quietly fails the people most likely to need it.
- **Motif — the language switcher:** the same medical question morphing
  between dialects in real RTL Arabic typography (vendor a subset of an open
  Arabic font) while the answer panel stays fixed — *many dialects, one
  answer quality*. Second visual: model merging as two/three weight-space
  fields interpolating into one (animated SVG isolines — abstract,
  monochrome, honest). Dialect labels double as navigation chips.
- **Fetch at build time:** both papers for the merge recipe (which base
  models merged, method), dialect evaluation results, and 3–4 authentic
  dialect phrasings of one question (verify wording with Ahmed — native
  speaker — before shipping).

### 4. `d3.html` — D3, small LM vs LLMs for drug–drug interactions
**Paper:** "D3: A Small Language Model for Drug–Drug Interaction Prediction…"
— MLwA 20:100658, 2025. ~72M params, pretrained from scratch.
- **Story:** David vs Goliath — right-sized models. A 72M-parameter model
  pretrained for one job holds its own against billion-parameter generalists,
  at a fraction of the inference cost.
- **Motif — scale you can feel:** log-scale parameter bars where the LLM bar
  breaks out of the chart frame; an animated parameter counter; "72M" set
  tiny against enormous display type for the giants. Interactive drug-pair
  picker over a small embedded sample of pairs → interaction card flips out
  with the predicted interaction class. Cost-vs-accuracy scatter with D3
  sitting alone in the good corner.
- **Fetch at build time:** the MLwA paper for exact parameter count, which
  LLMs it was benchmarked against, accuracy/F1 per model, and a handful of
  real drug pairs + labels safe to embed as the demo dataset.

### 5. `stroke-segmentation.html` — do complex architectures win?
**Paper:** "Deep Models for Stroke Segmentation: Do Complex Architectures
Always Perform Better?" — IEEE Access 12:198262, 2024 (+ arXiv:2403.17177).
- **Story:** controlled comparison — hold loaders, augmentation, and loss
  fixed; vary only the architecture. The punchline: added complexity did not
  reliably beat the well-tuned simple baseline.
- **Motif — the reveal slider:** stylized monochrome MRI slice (hand-drawn
  SVG, no fake patient data) with a drag-to-compare overlay showing predicted
  vs ground-truth lesion masks. Three architecture "weigh-in" cards (UNet /
  Attention-UNet / Transformer) listing matched conditions; Dice bars animate
  in and land close together — the visual understatement *is* the finding.
- **Fetch at build time:** the IEEE Access paper (open) for real Dice/IoU
  numbers per architecture, datasets used (ISLES/ATLAS?), and training-setup
  details for the matched-conditions callout. Keep the lesion geometry in the
  SVG anatomically plausible but clearly illustrative.

### 6. `multimodal-radiology.html` — the imaging VLM line of work
**Papers:** "M3: Multimodal AI for Medical Report Generation and VQA from 3D
Abdominal CT" — BJR|AI 2(1), 2025 + "From Slices to Volumes" — MICCAI 2025.
- **Story:** models that read the scan, slice by slice — and then learn to
  see the volume the way a radiologist does, fusing 2D detail with 3D
  context. Consolidates the vision-language radiology thread.
- **Motif — the scan scrubber:** a drag/scroll CT-stack scrubber (pre-drawn
  abstract slice frames, layered SVG or canvas) paging through a volume like
  a radiologist; on scroll the slices visibly stack into a 3D volume — the
  2D→3D fusion idea performed by the layout. Canned VQA: pick a question →
  an attention spotlight sweeps the slice → the answer types out as a report
  line, character by character.
- **Fetch at build time:** both papers for report-generation metrics and VQA
  accuracy, fusion architecture details for an honest pipeline figure, and
  which findings/questions make good canned examples. All slice imagery
  drawn, not real patient data.

## Progress

- [x] 1. TriAgent (+ index publication entry, git-log flip, terminal sync) — shipped 2026-08-13
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
