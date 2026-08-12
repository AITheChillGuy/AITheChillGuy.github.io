# Story Mode — Image Generation Prompts

Eight prompts: four story panels × two frames each (Frame A = static, Frame B =
animation companion). Every prompt below is fully self-contained — no jumping between
sections. Copy the prompt block under the panel you want, attach the listed reference
images, set the listed aspect ratio, generate.

---

## Quick reference — which images to attach for each prompt

| Prompt | Aspect ratio | Reference images to attach |
|---|---|---|
| § 01 Frame A — First Contact | 4:3 (1600×1200) | Your face photo · Haptic-glove photo · **QU rose-window facade photo** *(image 1 — cubic blocks with circular lattice windows)* |
| § 01 Frame B — The realization | 4:3 (1600×1200) | Your generated § 01 Frame A image · Your face photo |
| § 02 Frame A — The Brain on the Screen | 4:3 (1600×1200) | Your face photo · **QU wind-tower (*badgheer*) photo** *(image 2 — flat-capped square towers with vertical slits)* |
| § 02 Frame B — The acceptance | 4:3 (1600×1200) | Your generated § 02 Frame A image · Your face photo |
| § 03 Frame A — The Stack | 16:10 (1600×1000) | Your face photo |
| § 03 Frame B — The model just answered | 16:10 (1600×1000) | Your generated § 03 Frame A image · Your face photo |
| § 04 Frame A — The Corporate Future | 2.35:1 (1600×680) | Your face photo *(face partly hidden — back view)* |
| § 04 Frame B — The Academic Future | 2.35:1 (1600×680) | Your face photo · Your generated § 04 Frame A image *(as a pose/composition reference only — NOT to keep identical)* |

**Tool-specific reference notes:**

- **Midjourney v7:** attach face as `--cref <url>`, attach style ref (e.g. the GTA
  portrait you provided) as `--sref <url>`, glove as `--iw 1.5` image ref. Use
  `--seed <n>` and reuse the same seed across all four Frame A panels.
- **Nano Banana / Gemini 2.5 Flash Image:** drop all reference images into the prompt
  attachments panel. For Frame B, drop the Frame A image AND your face photo, then
  paste the Frame B prompt — the tool will keep most pixels identical and only edit
  the listed deltas.
- **Flux Kontext:** same as Nano Banana. Especially good for Frame B deltas.
- **DALL·E 3 / Imagen 3:** these tools don't natively support character refs. Generate
  Frame A from the prompt alone, then use their inpainting / edit-region mode for
  Frame B, masking just the area that should change.

---

## § 01 Frame A — "First Contact" (HCI Lab, haptic glove, the moment of curiosity)

**Aspect ratio:** 4:3 landscape (1600 × 1200)

**Reference images to attach:**
1. **Your face photo** — required. The figure's face must match this exactly.
2. **Your haptic-glove photo (HGTS)** — required. The glove in his right hand must
   match this exactly.
3. **Qatar University rose-window facade photo (image 1)** — strongly recommended.
   This is the cluster of stacked cubic stone blocks with large circular Islamic
   geometric lattice windows. Tell the model explicitly to match this reference
   image's silhouette and detail; this facade has been the most consistent failure
   point across generations.

**Prompt — copy and paste in full:**

```
A single comic-book illustration in the style of a vintage pop-art / GTA-loading-screen
character poster. Bold black ink linework with varying line weights — thick 3–4px
outlines on the figure, finer 1–2px ink on background details. Heavy use of Ben-Day
halftone dot shading: visible large dots in the mid-shadows on skin, fabric, and matte
surfaces, fading to clean white highlights. Cross-hatched ink lines pack the deepest
shadows. Bright, flat, saturated color fills — no soft gradients, no airbrush, no
painterly blending; gradients are implied only by halftone dot density. Crisp white
specular highlights on faces, hair, plastic, glass, and metal — drawn as clean shapes,
never as soft glows. Radiating sunburst speed-lines extending from the main light
source toward the corners. Color palette: warm primary yellows, deep reds and
burgundies, forest and emerald greens, cobalt and teal blues, off-white highlights,
true black ink. Saturated and graphic, not photoreal. Vintage printed-paper feel with
a faint cream border and a subtle paper-grain texture across the whole image. A small
four-point sparkle ornament sits in the bottom-right corner as a signature mark.

THE FIGURE: Ahmed — a man in his mid-20s, of Egyptian / Middle Eastern descent, warm
olive skin tone. Short dark-brown curly hair, tight on the sides and slightly fuller
on top. Strong dark eyebrows. A neat dark mustache joining a small chin goatee, no
full beard. Bright hazel-brown eyes with a single sharp catchlight in each pupil.
Lean athletic build. Calm, intelligent expression — observant, slightly skeptical, not
theatrical. Match his face, hair, facial-hair shape, and head proportions IDENTICALLY
to the attached face reference photo. Halftone shading falls on the RIGHT side of his
face; the LEFT side stays in clean highlight.

WARDROBE: a deep BURGUNDY / OXBLOOD-RED short-sleeve crew-neck t-shirt, plain (no
graphic, no print, no logo), slightly rumpled from a long lab session. Dark slim
chinos or trousers. Plain white low-top sneakers. Sleeves of the burgundy t-shirt
fall just above the elbows.

ARCHITECTURAL ANCHOR (visible through the rear window — MATCH THE ATTACHED QU
ROSE-WINDOW REFERENCE PHOTO EXACTLY for silhouette, proportions, and ornament
detail): the iconic Qatar University rose-window facade — a dense cluster of
cream-colored sand-stone CUBIC volumes stacked at slightly varying heights, each
cube's outward face dominated by a single large CIRCULAR ROSE WINDOW filled with
intricate Islamic geometric latticework (an eight-point star pattern of
interlocking polygons in a mashrabiya / jali screen style). Some cubes carry low
hipped sand-stone tile roofs. NO pyramidal tops, NO pointed roofs, NO wind towers —
the cubes are FLAT-TOPPED or low-pitched; the only geometric feature on the wall
is the round latticed oculus. A few green tree tops and a date palm visible at the
base. Sky bright warm yellow above the cluster. Drawn in saturated cream and tan
flat color with bold black ink outlines and halftone shading on the shaded faces.

SCENE: A cluttered university HCI / VR research lab, three-quarter angle, camera at
chest height looking slightly down across a workbench. Ahmed stands centered, slightly
left of frame, leaning forward over the bench. He holds a black-and-white haptic glove
in his right hand at roughly eye level, fingers splayed, examining it like Hamlet
considering the skull — curious, faintly skeptical, mouth a flat line. His left hand
rests on the bench beside a tangled cluster of bright multicolor jumper wires (red,
yellow, blue). Hair slightly disheveled.

The haptic glove must match the attached glove reference image exactly: a black-fabric
glove with rigid white articulated finger exoskeleton segments along the back of each
finger, a chunky white plastic control housing on the back of the hand (with a blank
rectangular logo plaque — leave the plaque BLANK, no letters), and a white plastic
wrist cuff. Cabling exits the wrist and snakes off-panel. Render the glove with crisp
ink outlines and clean white plastic highlights.

Foreground bench (all surfaces blank, no readable text): an Arduino microcontroller on
a white breadboard with the multicolor jumper wires fanning out of it; a coiled
USB-serial cable; a white ceramic coffee mug with a faint brown ring stain; a small
yellow sticky note stuck to the bench edge (BLANK); a thick paperback technical manual
splayed open face-down.

Background wall (left to right, no readable text on any screen):
- Two MODERN thin-bezel flat-panel LCD/LED monitors at slightly different heights,
  each on a slim adjustable arm or low matte-black stand. Slim profiles, dark grey
  casings, near-edgeless screens — clearly contemporary hardware, NOT old CRTs, NOT
  bulky boxy monitors. The LEFT monitor glows pale cyan-blue, showing a blocky low-poly
  3D first-person view of an empty white room with a small crosshair dead-center. The
  RIGHT monitor glows acid green, showing an abstract noisy sine wave on a dark grid
  background.
- A small modern compact digital oscilloscope (slim chassis with a small flat color
  display, NOT a vintage CRT scope) sits between or below the monitors, its screen
  showing a single clean glowing sine-wave trace.
- A pegboard above the monitors with hanging coiled cables and a sleek black VR
  headset dangling by its strap.
- A whiteboard at the far right showing a faint half-erased hand outline diagram with
  small arrows at the fingertips (drawn as decorative ink marks, no letters).

Set into the rear wall, BETWEEN the monitor stack and the whiteboard, a narrow window
frames the Qatar University rose-window facade (described above and shown in the
attached reference photo): a cluster of cream cubic stone blocks at varying heights,
each face featuring a large circular Islamic geometric lattice window, against a
bright warm-yellow daylight sky, with date palm fronds visible at the base of the
window. The window is small in the composition (about one-sixth of the frame width)
but the circular rose-window pattern is unmistakable.

A door visible at the top-left corner of the panel is deep red with a metal handle,
and a blank rectangular sign mounted above it (NO text).

LIGHTING: warm overhead fluorescents wash the room in pale yellow; cooler cyan-blue
glow spills from the monitor screens onto Ahmed's right side and the back of the
glove. Strong sunburst speed-lines radiating from the ceiling lights toward the
corners. Heavy halftone dot shading on the back wall and under the bench. Crisp
specular white highlights on the glove's plastic, the monitor edges, the oscilloscope
glass, and Ahmed's eye catchlights.

COLOR PALETTE: pale yellow walls and lighting, deep red door, burgundy t-shirt (the
single most saturated note on Ahmed, echoing the door), cyan-blue monitor glow,
acid-green data monitor, sand-tan stone cubes with dark ink rose-window lattice
through the window, true black ink outlines.

COMPOSITION: rule-of-thirds — Ahmed and the glove sit on the left third, monitors fill
the right two thirds, bench cuts across the bottom third. The viewer feels like a lab
visitor standing on the opposite side of the bench.

AVOID: no text, no letters, no words, no captions, no signs with writing, no readable
numbers, no logos, no watermarks, no signatures, no photorealism, no 3D render, no
smooth airbrush gradients, no soft glows, no lens flare, no bokeh, no extra fingers,
no distorted face, no melted hands, no asymmetric eyes, no anime style, no manga
style, no Disney style, no children's book style, no painterly brushstrokes, no oil
painting texture, no extra characters in the background, no crowds, no muddy colors,
no desaturated washed-out look, no vintage CRT monitors, no boxy old hardware.
```

---

## § 01 Frame B — "First Contact" / The realization

**Aspect ratio:** 4:3 landscape (1600 × 1200)

**Reference images to attach (ORDER MATTERS — attach Frame A FIRST, face photo
SECOND — the prompt explicitly references "the first attached image"):**
1. **Your generated § 01 Frame A image** — FIRST. Drop this in as the base image
   in your tool's image-edit / reference mode. The prompt will tell the model to
   keep this one pixel-identical except for the listed deltas.
2. **Your face photo** — SECOND, ONLY as a face-anchor reference to prevent the
   face from drifting between frames. Do NOT use it as a style reference.

**Prompt — copy and paste in full:**

```
Two reference images are attached. THE FIRST IMAGE is the previously generated § 01
Frame A panel (the static comic-book scene of Ahmed in the HCI lab holding the
haptic glove) — this is the base image to keep IDENTICAL. THE SECOND IMAGE is a
photo of Ahmed's face — use this ONLY as an anchor to keep his face from drifting;
do not change the comic-book rendering style of his face to match the photo.

Keep everything in the FIRST attached image (the Frame A panel) IDENTICAL: same
camera angle, same composition, same lighting key, same color palette, same line
weight, same halftone density, same wardrobe (burgundy t-shirt, dark trousers,
white sneakers), same hair, same facial structure, same props in the same
positions, same background. The figure does not move, shift, rotate, or change
pose. Only THREE small changes are permitted, listed below. All other surfaces stay
exactly as they are in the FIRST attached image.

CHANGE 1 — AHMED'S FACE: his eyes widen by a small amount, eyebrows lift very
slightly, and the corners of his mouth lift into the very beginning of a small
surprised smile — a single-frame "aha, it works" beat. The catchlight in each pupil
sharpens. His head and body do NOT move; only the eye and mouth shapes change.

CHANGE 2 — THE GLOVE: the small sensor dots at the tip of each finger of the haptic
glove now glow with bright cyan light, drawn as small clean cyan circles with thin
radiating sunburst speed-lines around each one. The glove's overall position and
orientation in his right hand are unchanged.

CHANGE 3 — THE RIGHT MONITOR (acid-green sine wave): the noisy sine wave now shows a
single tall sharp spike rising out of the otherwise flat baseline, and the screen's
overall brightness flares slightly brighter for this frame. A faint white horizontal
scanline sweeps across the upper third of the screen.

NOTHING else changes. The Arduino, the wires, the coffee mug, the sticky note, the
manual, the door, the window with the QU rose-window facade, the pegboard, the VR
headset, the oscilloscope, the whiteboard, the LEFT monitor, Ahmed's burgundy shirt,
his hair, his hands, his stance — all stay pixel-identical to the FIRST attached
image (the Frame A panel).

AVOID: no text, no letters, no words, no logos, no extra fingers, no pose change, no
camera movement, no relighting, no color shift, no style drift, no new objects.
```

---

## § 02 Frame A — "The Brain on the Screen" (three-monitor desk, late evening)

**Aspect ratio:** 4:3 landscape (1600 × 1200)

**Reference images to attach:**
1. **Your face photo** — required.
2. **Qatar University wind-tower (*badgheer*) photo (image 2)** — strongly
   recommended. This is a DIFFERENT facade of the same campus from § 01: tall
   sand-stone wind-catching towers with FLAT-TOPPED square caps and vertical slit
   openings (NOT pyramids, NOT pointed roofs). Tell the model explicitly to match
   this reference image's silhouette exactly. Same campus as § 01, different facade,
   different time of day.

**Prompt — copy and paste in full:**

```
A single comic-book illustration in the style of a vintage pop-art / GTA-loading-screen
character poster. Bold black ink linework with varying line weights — thick 3–4px
outlines on the figure, finer 1–2px ink on background details. Heavy use of Ben-Day
halftone dot shading: visible large dots in mid-shadows, fading to clean white
highlights. Cross-hatched ink in deepest shadows. Bright, flat, saturated color fills
— no soft gradients, no airbrush, no painterly blending. Crisp white specular
highlights on faces, hair, plastic, glass, and metal — clean shapes, never soft glows.
Radiating sunburst speed-lines from the main light source toward the corners. Color
palette: warm yellows, deep reds and burgundies, forest and emerald greens, cobalt and
teal blues, off-white highlights, true black ink. Saturated and graphic, not
photoreal. Faint cream border and subtle paper-grain texture. A small four-point
sparkle ornament sits in the bottom-right corner as a signature mark.

THE FIGURE: Ahmed — a man in his mid-20s, Egyptian / Middle Eastern descent, warm
olive skin. Short dark-brown curly hair, tight on the sides, fuller on top. Strong
dark eyebrows. Neat dark mustache joining a small chin goatee. Hazel-brown eyes with
a single sharp catchlight in each pupil. Lean athletic build. Match his face, hair,
and proportions IDENTICALLY to the attached face reference photo. Halftone shading on
the RIGHT side of his face; LEFT side in clean highlight.

WARDROBE: a heather CHARCOAL-GREY long-sleeve crewneck sweatshirt, sleeves pushed up
to mid-forearm, plain (no graphic, no logo). Dark slim chinos or trousers. Plain white
low-top sneakers. The grey reads as the "deep work" uniform and lets the cool blue
monitor glow dominate the figure.

ARCHITECTURAL ANCHOR (visible through the rear window's venetian blinds — MATCH THE
ATTACHED QU WIND-TOWER REFERENCE PHOTO EXACTLY for silhouette and proportions): a
row of three to four IDENTICAL Qatari wind-catching towers (badgheer). Each tower
has a tall vertical square shaft of sand-stone rising above the campus rooftops, and
is topped with a WIDER, FLAT-TOPPED SQUARE CAP — emphatically NOT pointed, NOT
pyramidal, NOT a peaked roof. The cap is a square block sitting on a flared /
tapered transition that widens outward from the shaft below it. Each face of the cap
is pierced by VERTICAL SLIT OPENINGS (about 4–6 narrow vertical slits per face) for
catching wind from any direction. Below the towers, low cream-stone flat-roofed
campus volumes with arcaded walkways. This is a DIFFERENT facade of the SAME campus
as § 01 (Qatar University) — different side of the building, different time of day.
Now silhouetted against a deep cobalt night sky with halftone-stippled stars filling
the spaces between the towers.

SCENE: A quiet university office at late evening. Side-view, camera at desk level,
looking across the desk at Ahmed seated in a black mesh office chair. Ahmed is in
three-quarter profile facing the monitors, leaning in, his left elbow planted on the
desk, chin resting in his left palm. His right hand holds a yellow mechanical pencil
mid-tap against a spiral-bound notebook open on the desk. Eyes narrowed, mouth a flat
focused line — deep concentration after hours of work.

Three computer monitors fan across the desk in a shallow arc, all glowing (NO
readable text on any screen):
- LEFT monitor (THE TRIUMPH SCREEN — this is the visual climax of the panel): a
  grayscale axial brain MRI scan on a deep black background. The brain anatomy is
  overlaid with a clean, confident MULTI-CLASS SEGMENTATION MASK in the style of a
  medical-imaging segmentation visualization (think nnU-Net or 3D Slicer output) —
  several distinct anatomical regions of the brain are each filled with a bright,
  flat, saturated color: a bright CORAL-RED region at the upper-center near the
  midline, a large bright SATURATED YELLOW region filling the right hemisphere, a
  smaller bright MAGENTA / HOT-PINK region in the central deep-brain area, an
  OLIVE-YELLOW region just below the magenta, and a bright EMERALD-GREEN region at
  the lower edge of the brain. Each colored region has a clean black ink edge and
  a flat saturated semi-transparent fill so the underlying grayscale brain anatomy
  is faintly visible through it. The mask shapes are biologically plausible
  (irregular organic outlines, not geometric blobs). A small bright-green CHECKMARK
  icon glows just beside the brain at its lower-right. Three tiny radiating
  sunburst speed-lines fan outward from one of the colored regions, signaling
  "it finally worked." This is the screen Ahmed has been staring at for hours —
  the multi-class segmentation has converged. The rest of the brain anatomy
  outside the mask reads as clean grayscale halftone with crisp ink edges.
- CENTER monitor: a dark terminal / training dashboard view dominated by a descending
  loss curve in cyan (line graph sweeping from top-left down to bottom-right), with a
  column of ticking abstract numeric readouts below it (render as featureless gray
  bars and decorative squiggles, no real letters or digits).
- RIGHT monitor: a research-paper preview thumbnail — a single column of body text
  on a clean white page (render as featureless gray bars, no readable letters).
  No stamps, no overlays, no badges on the page itself in Frame A — leave the
  paper preview clean. The Frame B animation will add a small acceptance icon to
  this monitor.

Behind the monitors: the back wall is papered in dozens of small square sticky notes
in saturated yellow, hot pink, and pale blue — all blank, no writing. A white
dry-erase board on the right edge of the panel shows a faint hand-drawn mathematical
equation rendered as decorative squiggle marks (not real letters).

Desk props: an empty white coffee mug tipped slightly forward; a second half-full mug
behind the keyboard; the open notebook showing a hand-drawn diagram of a symmetrical
encoder–decoder shape with skip-connection arrows running left to right (the SHAPE
only, no labels); a pen lying across the keyboard; a pair of folded black-framed
glasses.

Behind Ahmed, the back wall is dominated by a tall window with half-shut venetian
blinds. Through the gaps in the blinds, the Qatar University wind-towers / badgheer
(described above and shown in the attached reference photo — square shafts with
WIDER FLAT-TOPPED CAPS pierced by vertical slits, NOT pointed pyramids) are visible
against a deep cobalt night sky with halftone-stippled stars. The diagonal
venetian-blind bars cast parallel halftone-dotted shadow stripes across the back
wall and across Ahmed's shoulder.

LIGHTING: cool blue monitor glow on Ahmed's face and the desk surface — primary key
light. A single warm amber desk lamp out of frame casts soft warm halftone on the
right edge of the scene as a secondary rim. Bright white catchlights on the monitor
bezels and the yellow pencil. Faint sunburst speed-lines fanning from the center
monitor toward the corners.

COLOR PALETTE: muted teals and dark navy in the room, warm amber lamp accent, the
yellow pencil and yellow sticky notes as bright focal pops, the hot pink and pale
blue sticky notes for variety, Ahmed's charcoal-grey sweatshirt as a quiet mid-tone
center that lets the monitor cyan dominate his face and shoulders, sand-tan badgheer
behind the blinds.

COMPOSITION: Ahmed occupies the left third in three-quarter profile; the three
monitors stair-step across the right two thirds. Slight low angle — looking up at
the desk — to make the moment feel monumental rather than mundane. The window with
the night-time badgheer sits as a vertical band in the upper-left third behind
Ahmed.

AVOID: no text, no letters, no words, no captions, no signs with writing, no readable
numbers, no logos, no watermarks, no signatures, no photorealism, no 3D render, no
smooth airbrush gradients, no soft glows, no lens flare, no bokeh, no extra fingers,
no distorted face, no melted hands, no asymmetric eyes, no anime style, no manga
style, no Disney style, no children's book style, no painterly brushstrokes, no oil
painting texture, no extra characters in the background, no crowds, no muddy colors,
no desaturated washed-out look.
```

---

## § 02 Frame B — "The Brain on the Screen" / The acceptance

**Aspect ratio:** 4:3 landscape (1600 × 1200)

**Reference images to attach (ORDER MATTERS — attach Frame A FIRST, face photo
SECOND — the prompt explicitly references "the first attached image"):**
1. **Your generated § 02 Frame A image** — FIRST. Base image for the edit; the
   prompt will tell the model to keep this one pixel-identical except for the
   listed deltas.
2. **Your face photo** — SECOND, ONLY as a face-anchor reference to keep the face
   from drifting between frames. Do NOT use it as a style reference.

**Prompt — copy and paste in full:**

```
Two reference images are attached. THE FIRST IMAGE is the previously generated § 02
Frame A panel (the static comic-book scene of Ahmed at his three-monitor desk at
night, with the brain MRI segmentation on the left monitor) — this is the base
image to keep IDENTICAL. THE SECOND IMAGE is a photo of Ahmed's face — use this
ONLY as an anchor to keep his face from drifting; do not change the comic-book
rendering style of his face to match the photo.

Keep everything in the FIRST attached image (the Frame A panel) IDENTICAL: same
camera angle, same composition, same lighting key, same color palette, same line
weight, same halftone density, same wardrobe (charcoal-grey sweatshirt, dark
trousers, white sneakers), same hair, same facial structure, same props in the
same positions, same background, same window with the night-time QU wind-towers
(flat-capped square shafts with vertical slits) behind the blinds. The figure does
not move, shift, rotate, or change pose. Only FOUR small changes are permitted,
listed below. All other surfaces stay exactly as they are in the FIRST attached
image.

CHANGE 1 — AHMED'S FACE: his flat focused mouth softens into a small, almost-
imperceptible relieved smile — just the right corner of his mouth lifts. His narrowed
eyes open slightly wider and the catchlight in each eye sharpens. His head, hand,
and body posture do NOT move.

CHANGE 2 — THE RIGHT MONITOR (research paper preview): a small bright EMERALD-GREEN
circular badge with a clean white CHECKMARK / TICK icon inside it now appears in
the top-right corner of the paper preview, sized roughly the same as one of the
gray text-bars. Three short radiating sunburst speed-lines fan outward from the
badge, as if it just popped onto the page — the visual equivalent of an
"accepted" notification arriving. The page itself, the gray text-bars, and the
monitor frame stay exactly as they are.

CHANGE 3 — THE CENTER MONITOR (training dashboard): the descending cyan loss curve
now ends one small notch lower than in Frame A, and a tiny bright cyan dot pulses at
the final point of the curve.

CHANGE 4 — THE PENCIL: the yellow mechanical pencil tip now has two tiny radiating
sunburst speed-lines around it, as if it just tapped down a beat earlier.

NOTHING else changes. The LEFT monitor's multi-class brain-MRI segmentation (the
coral-red, yellow, magenta, olive-yellow, and emerald-green colored regions, the
green checkmark beside the brain, and the sunburst marks all stay exactly as in
Frame A), the venetian blinds, the QU wind-towers through the blinds, the sticky-
note wall, the whiteboard, the notebook, the coffee mugs, the glasses, the desk
lamp glow, the chair, the keyboard, Ahmed's charcoal sweatshirt, his hair, his
hands, his stance — all stay pixel-identical to the FIRST attached image (the
Frame A panel).

AVOID: no text, no letters, no words, no logos, no extra fingers, no pose change, no
camera movement, no relighting, no color shift, no style drift, no new objects.
```

---

## § 03 Frame A — "The Stack" (command-center workstation, solo)

**Aspect ratio:** 16:10 wide (1600 × 1000)

**Reference images to attach:**
1. **Your face photo** — required. Only one reference needed for this panel.

**Prompt — copy and paste in full:**

```
A single comic-book illustration in the style of a vintage pop-art / GTA-loading-screen
character poster. Bold black ink linework with varying line weights — thick 3–4px
outlines on the figure, finer 1–2px ink on background details. Heavy use of Ben-Day
halftone dot shading: visible large dots in mid-shadows, fading to clean white
highlights. Cross-hatched ink in deepest shadows. Bright, flat, saturated color fills
— no soft gradients, no airbrush, no painterly blending. Crisp white specular
highlights on faces, hair, plastic, glass, and metal — clean shapes, never soft glows.
Radiating sunburst speed-lines from the main light source toward the corners. Color
palette: warm yellows, deep reds and burgundies, forest and emerald greens, cobalt
and teal blues, off-white highlights, true black ink. Saturated and graphic, not
photoreal. Faint cream border and subtle paper-grain texture. A small four-point
sparkle ornament sits in the bottom-right corner as a signature mark.

THE FIGURE: Ahmed — a man in his mid-20s, Egyptian / Middle Eastern descent, warm
olive skin. Short dark-brown curly hair, tight on the sides, fuller on top. Strong
dark eyebrows. Neat dark mustache joining a small chin goatee. Hazel-brown eyes with
a single sharp catchlight in each pupil. Lean athletic build. Match his face, hair,
and proportions IDENTICALLY to the attached face reference photo. Halftone shading on
the RIGHT side of his face; LEFT side in clean highlight.

WARDROBE: a clean COBALT-BLUE button-up Oxford shirt, long sleeves neatly rolled to
mid-forearm, top button open, no tie. Crisp collar, no pattern, no logo. Dark slim
chinos or trousers. Plain white low-top sneakers. The cobalt blue is the most
professional shirt in the series and harmonizes with the dominant cyan monitor glow
rather than fighting it.

SCENE: A modern AI research office at a medical institution. Wide cinematic framing,
camera slightly elevated, looking down across a wraparound L-shaped desk loaded with
technology — a personal command center. Ahmed is dead-center of the frame, standing
between a shallow arc of FOUR large widescreen monitors that curve around him. He
leans slightly forward; his right hand is mid-gesture toward the second-from-left
monitor (palm open, fingers tracing an imaginary line on the screen); his left hand
holds a black stylus over a slim white drawing tablet on the desk. Expression:
focused, confident, mid-thought — eyes scanning across screens like a conductor
reading a score. Not posed for the camera; caught working.

The four monitors fan from left to right in a shallow arc, each glowing a different
hue, each showing a different facet of the stack — render every screen WITHOUT
readable text:

LEFT-MOST MONITOR: a DICOM medical-imaging viewer. Left half shows a grayscale 3D
rendered brain volume in cinematic three-quarter rotation; right half shows a single
axial brain MRI slice in grayscale with a semi-transparent RED segmentation mask
overlay highlighting an irregular lesion in the upper region. Thin cyan crosshair
guides bisect the slice. Dark UI chrome around the edges.

LEFT-CENTER MONITOR: a dark-mode code editor (Jupyter / VSCode aesthetic) on deep
navy background, with multicolored syntax-highlighted code — greens, purples, salmon
pinks, sky blues — rendered as decorative colored bars and squiggles, NOT real
letters. A small training loss curve plot pinned in the top-right corner of the
screen descends sharply from upper-left to lower-right in cyan. A tiny yellow smiling
face icon (Hugging Face style) sits as a pinned browser tab at the top edge.

RIGHT-CENTER MONITOR: a complex AGENT-WORKFLOW graph. Labeled rectangular nodes
connected by directed arrows in a tree / DAG layout — one root node at the top
branching into multiple parallel paths, with one branch forking off to a sub-graph
and another looping back. Dark UI background with nodes colored in cyan, orange, and
white. Render every node label as a featureless gray bar (no readable text).
LangGraph / agent-orchestration aesthetic.

RIGHT-MOST MONITOR: a multimodal model output panel. Top half: a grayscale chest
X-RAY with a thin red bounding-box drawn around a region of interest in the upper
left lung field. Bottom half: a generated structured radiology report rendered as
rows of horizontal gray text-bars (no readable letters), with a small caret cursor
at the end of the last line — implying the model is still generating.

Behind the monitors, the back wall is a large WHITEBOARD covered in marker diagrams
drawn in black, blue, and red expo marker:
- A RAG pipeline schematic running left-to-right: a stack of document icons → a
  chunking grid → a database cylinder → an arrow into a brain-shaped icon (the LLM)
  → an output speech-bubble icon. All drawn as ICONS only, no text labels.
- Above it, a multimodal model architecture sketch: an image-encoder block on the
  left, a text-encoder block on the right, both feeding into a fusion block in the
  middle, with an output head on top. Boxes only, no labels.
- To the right, a small 3D vector-lattice (FAISS-style): a grid of dots in blue
  marker with one path traced through it in red marker, ending in a solid red dot.

Desk props: an open spiral notebook with hand-drawn architecture sketches in dark
ink; a half-empty coffee mug with deep cornell-blue and gold accent stripes (no
readable text on it); the slim white drawing tablet under his left hand; a stack of
printed academic papers with the top one folded into a tent; a small 3D-printed
white anatomical brain on a wooden plinth used as a paperweight; a fifth smaller
secondary monitor mounted on a swing-arm above the main bank, showing a real-time
training dashboard (gauge dials and a streaming line plot, no text).

Wall details: to the left of the whiteboard, a row of three small framed prints — a
stylized brain, a UNet encoder-decoder silhouette, a transformer block silhouette.
To the right, a low bookshelf with a stack of thick medical-imaging textbooks and a
couple of academic conference name-badges hanging from lanyards (lanyard cards
BLANK).

LIGHTING: dominant cool blue-cyan wash from the four monitors hitting Ahmed's front
and the desk surface — strong screen-light reflection on his face, neck, and the
underside of his arms. Warm tungsten accent from an overhead desk lamp behind him
spills onto the top of his hair and his right shoulder, creating a rim-light
separation. Heavy halftone dot shading in the corners of the room. Crisp specular
white catchlights on each monitor bezel, the stylus, and Ahmed's eyes. Sunburst
speed-lines radiating faintly from the center of the monitor arc outward to the
corners of the frame.

COLOR PALETTE: deep navy and electric cyan dominating the monitor glow; warm amber
tungsten rim on Ahmed and the back wall; Ahmed's cobalt-blue Oxford shirt as the
saturated chromatic anchor at center, harmonizing with the cyan screens; red marker
accents on the whiteboard, lesion mask, and bounding box for graphic pop;
cornell-blue and gold mug as a small institutional cue.

COMPOSITION: cinematic wide framing with strong centered symmetry — Ahmed at the
vanishing point of the wraparound desk, the four monitors fanning symmetrically left
and right like a panopticon, the whiteboard diagrams filling the upper third behind
him, the desk anchoring the bottom third. Eye-line arc sweeps from the leftmost MRI
screen across all four monitors to the rightmost X-ray screen.

AVOID: no text, no letters, no words, no captions, no signs with writing, no readable
numbers, no logos, no watermarks, no signatures, no photorealism, no 3D render, no
smooth airbrush gradients, no soft glows, no lens flare, no bokeh, no extra fingers,
no distorted face, no melted hands, no asymmetric eyes, no anime style, no manga
style, no Disney style, no children's book style, no painterly brushstrokes, no oil
painting texture, no extra characters in the background, no crowds, no muddy colors,
no desaturated washed-out look.
```

---

## § 03 Frame B — "The Stack" / The model just answered

**Aspect ratio:** 16:10 wide (1600 × 1000)

**Reference images to attach (ORDER MATTERS — attach Frame A FIRST, face photo
SECOND — the prompt explicitly references "the first attached image"):**
1. **Your generated § 03 Frame A image** — FIRST. Base image for the edit; the
   prompt will tell the model to keep this one pixel-identical except for the
   listed deltas.
2. **Your face photo** — SECOND, ONLY as a face-anchor reference to keep the face
   from drifting between frames. Do NOT use it as a style reference.

**Prompt — copy and paste in full:**

```
Two reference images are attached. THE FIRST IMAGE is the previously generated § 03
Frame A panel (the static comic-book scene of Ahmed at the wraparound four-monitor
command-center desk) — this is the base image to keep IDENTICAL. THE SECOND IMAGE
is a photo of Ahmed's face — use this ONLY as an anchor to keep his face from
drifting; do not change the comic-book rendering style of his face to match the
photo.

Keep everything in the FIRST attached image (the Frame A panel) IDENTICAL: same
camera angle, same composition, same lighting key, same color palette, same line
weight, same halftone density, same wardrobe (cobalt-blue Oxford shirt, dark
trousers, white sneakers), same hair, same facial structure, same props in the
same positions, same background, same whiteboard diagrams, same four monitors,
same desk layout. The figure does not move, shift, rotate, or change pose; the
stylus stays where it is, the right hand stays mid-gesture toward the second-from-
left monitor. Only FOUR small changes are permitted, listed below. All other
surfaces stay exactly as they are in the FIRST attached image.

CHANGE 1 — AHMED'S FACE: his focused mid-thought expression shifts into the very
beginning of a confident, closed-mouth smile — just a small lift at the corners of
his mouth and a sharper catchlight in each eye, as if he just saw the model return a
correct answer. His head, body, and hand positions do NOT move.

CHANGE 2 — THE RIGHT-CENTER MONITOR (agent-workflow graph): every directed arrow in
the graph now glows a bright saturated cyan with a thin white inner highlight along
its length, as if a query just traversed the entire graph. The node shapes themselves
are unchanged in position and color; only the arrows are now luminous.

CHANGE 3 — THE RIGHT-MOST MONITOR (chest X-ray with bounding box): the thin red
bounding box around the upper-left lung-field region now pulses brighter and thicker
by a small amount, with three tiny radiating sunburst speed-lines at one of its
corners. A single small bright-green checkmark icon appears just outside the
top-right corner of the bounding box.

CHANGE 4 — THE LEFT-CENTER MONITOR (code editor): the cyan training-loss curve in
the top-right corner now shows one additional bright cyan dot at its end, slightly
lower than the previous endpoint — implying one more training step just completed.

NOTHING else changes. The leftmost DICOM monitor, the whiteboard diagrams behind
him, the secondary monitor on the swing-arm, the coffee mug, the 3D-printed brain,
the notebook, the framed prints, the bookshelf, the drawing tablet, Ahmed's cobalt
Oxford shirt, his hair, his hands, his stance — all stay pixel-identical to the
FIRST attached image (the Frame A panel).

AVOID: no text, no letters, no words, no logos, no extra fingers, no pose change, no
camera movement, no relighting, no color shift, no style drift, no new objects.
```

---

## § 04 Frame A — "The Corporate Future" (Ahmed-as-executive walking through a corporate plaza)

**Aspect ratio:** Cinematic letterbox 2.35:1 (1600 × 680)

**Narrative beat:** § 04 is now a DIPTYCH. The hover animation between Frame A
and Frame B is the closing metaphor of the issue: same Ahmed, same pose, two
different futures. **Frame A shows the corporate version of Ahmed** — sharp navy
suit, walking through a sleek modern corporate plaza of a tech / biotech /
healthcare company. This is the industry path. The two frames will live in the
exact same composition, exact same pose, exact same head turn, exact same stride,
exact same lighting key, exact same camera angle — only the OUTFIT and the
ENVIRONMENT change between them. When the user hovers the panel, Ahmed transforms
from this corporate future into the academic future (Frame B).

**Reference images to attach:**
1. **Your face photo** — required, even though only the corner of his face is
   visible over his shoulder.

(No architectural reference is needed. The corporate plaza is described as a
generic tech / biotech archetype, not any specific real company — this is
intentional, so the diptych reads as the abstract idea of "two futures" rather
than as any specific employer.)

**Prompt — copy and paste in full:**

```
A single comic-book illustration in the style of a vintage pop-art / GTA-loading-screen
character poster. Bold black ink linework with varying line weights — thick 3–4px
outlines on the figure, finer 1–2px ink on background details. Heavy use of Ben-Day
halftone dot shading: visible large dots in mid-shadows on glass, metal, sky, and
skin, fading to clean white highlights. Cross-hatched ink in deepest shadows.
Bright, flat, saturated color fills — no soft gradients, no airbrush, no painterly
blending. Crisp white specular highlights on hair, fabric, glass facades, and
polished metal — clean shapes, never soft glows. Faint sunburst speed-lines
emanating from the late-afternoon sun toward the corners. Color palette: warm
late-afternoon golden amber, cool steel-blue and silver glass, crisp off-white
modern concrete, dusty teal sky, polished light-grey paving, dark navy suit,
black ink. Saturated and graphic, not photoreal. Faint cream border and subtle
paper-grain texture. A small four-point sparkle ornament sits in the bottom-right
corner as a signature mark.

THE FIGURE: Ahmed — a man in his mid-20s, Egyptian / Middle Eastern descent, warm
olive skin. Short dark-brown curly hair, tight on the sides, fuller on top. Strong
dark eyebrows. Neat dark mustache joining a small chin goatee. Hazel-brown eyes
with a single sharp catchlight. Lean athletic build. Match the visible sliver of
his face (only the right cheek, the corner of his mouth, and one eye are visible
over his shoulder) IDENTICALLY to the attached face reference photo.

WARDROBE (overrides the lower-body lock for this panel — this is the closer, the
"leveled-up" wardrobe beat that completes the four-shirt arc): a slim-fit DARK
NAVY-BLUE two-piece suit, well-tailored. The jacket is a single-breasted notch-
lapel, two-button silhouette, hanging cleanly from the shoulders, with a slight
nip at the waist. Matching navy suit trousers (no chinos, no jeans). A crisp WHITE
dress shirt visible at the collar where it rises above the jacket — no tie, top
button open, modern open-collar look. Polished DARK BROWN or BLACK leather oxford
or derby shoes — emphatically NOT sneakers, NOT trainers, NOT casual footwear. He
still carries the spiral-bound notebook tucked under his left arm. The navy suit
is the most professional outfit in the four-panel arc and pops as a clean dark
saturated silhouette against the warm late-afternoon palette and pale architecture.
NO logos, NO patterns, NO crests, NO pocket-square ornament.

SCENE: Late afternoon at the central plaza of a sleek modern corporate / tech /
biotech HQ campus. Camera positioned low and behind Ahmed, looking forward across
the polished plaza toward a large modern corporate office building dominating the
mid-distance. The viewer is BEHIND Ahmed for the first time in the series.

Ahmed walks away from camera across the plaza, mid-stride, his left foot forward,
moving with purpose but unhurried — a confident corporate-executive stride. His
right hand carries a slim sleek black leather PORTFOLIO / SLIM BRIEFCASE at his
side. His head is turned slightly back over his right shoulder — only the corner
of his face is visible, showing a small knowing smile and one hazel-brown eye. His
tailored navy suit jacket reads cleanly from behind: clean shoulder line, slight
back vent, sleeves ending at the wrist with a faint white shirt cuff showing. The
suit silhouette is the dominant dark shape in the foreground. A long real late-
afternoon shadow stretches from his feet back toward the camera, drawn in solid
black ink with halftone-dotted edges.

[POSE LOCK FOR DIPTYCH — CRITICAL] Memorize this exact pose: low-angle from
behind, mid-stride with left foot forward, head turned slightly right over the
shoulder, half-smile visible, one item carried at the side. This is the EXACT pose
that will be reused for § 04 Frame B (the academic future). The two frames are a
diptych — same character, same pose, same composition, only outfit and
environment change.

THE PLAZA: a wide flat polished light-grey concrete or pale stone plaza, rendered
with halftone-stippled paving lines suggesting clean large geometric concrete
panels with crisp expansion joints. The paving feels modern, contemporary, almost
cold — not warm sand-tan. A few small contemporary trees in geometric planters
flank the plaza at intervals. No road markings, no chevrons.

THE BACKGROUND BUILDING (mid-distance, dominating the upper portion of the frame):
a generic but unmistakably corporate / tech / biotech HQ — a sleek modern glass-
and-steel mid-rise office building with a clean rectangular grid of reflective
glass panels, sharp horizontal floor lines suggesting maybe 8–12 floors, a clean
cantilevered glass-canopy entrance at ground level with revolving doors, and a
low horizontal modern white concrete biotech-research wing extending to one side
with strip windows. A small abstract corporate sculpture (geometric stainless-
steel form, no logos) sits in the plaza in front of the entrance. Render the
glass with flat cool steel-blue and silver tones, halftone shading on the west-
facing surfaces, crisp white highlight bands on the east-facing glass catching
the warm sky reflection.

DISTANT BACKGROUND: a few smaller corporate building silhouettes recede further
into the distance behind the main building. A handful of small distant figures in
business attire (suggested as silhouetted ink shapes, no detail) walk across the
plaza, suggesting it is the end of a working day.

THE SKY: a clean dusty teal sky filling the upper third of the frame, with a few
thin halftone-stippled cloud bands picking up warm tints along their undersides.
The sun is low on the right side of the frame, just out of view behind the
corporate building, casting warm golden light across the plaza and rim-lighting
Ahmed's right side. NO graphic sunrise, NO concentric halftone-dot arcs, NO
stylized sun — just real late-afternoon light.

LIGHTING: warm golden-hour side-light from the right of the frame. Ahmed is rim-
lit along his right shoulder and the top of his head; his front-facing side falls
into warm halftone shadow. The corporate building's east-facing glass catches a
bright highlight band of warm sky reflection; its west sides fall into halftone
shadow. The sculpture in the plaza catches a sharp specular highlight on its
upper edge. Long real shadows stretch from Ahmed, the planters, and the building
back toward the left of the frame.

COLOR PALETTE: warm golden-amber late-afternoon light; cool steel-blue and silver
glass; crisp off-white modern concrete; polished light-grey plaza paving; dusty
teal sky; dark green geometric-planter trees; Ahmed's dark NAVY-BLUE suit
reading as a clean dark silhouette in the center foreground, with the small
WHITE shirt-collar at his neck as the brightest specular note on the figure;
sleek black leather portfolio at his side; black ink outlines throughout.

COMPOSITION: cinematic wide letterbox framing. Ahmed positioned slightly left of
center in the lower foreground, walking forward and slightly to the right toward
the corporate building. The corporate office building fills the upper mid-distance,
anchoring the composition. The plaza recedes into the distance with subtle
perspective. The overall composition reads as a real wide-angle corporate-campus
late-afternoon shot — polished, decisive, professional.

AVOID: no text, no letters, no words, no captions, no signs with writing, no
readable numbers, no logos, no corporate brand marks, no watermarks, no signatures,
no photorealism, no 3D render, no smooth airbrush gradients, no soft glows, no
lens flare, no bokeh, no extra fingers, no distorted face, no melted hands, no
asymmetric eyes, no anime style, no manga style, no Disney style, no children's
book style, no painterly brushstrokes, no oil painting texture, no crowds, no
muddy colors, no desaturated washed-out look. SPECIFICALLY: no archway portals,
no labeled gates, no triumphal arches, no graphic concentric sunrise, no runway-
style road markings, no aircraft chevrons, no academic / university buildings in
this frame (no ivy, no stone classical columns, no domed lecture halls — those
belong in Frame B), and no any one specific real-world tech company that could be
identified by name.
```

---

## § 04 Frame B — "The Academic Future" (Ahmed-as-grad-student walking through a university quad)

**Aspect ratio:** Cinematic letterbox 2.35:1 (1600 × 680)

**Narrative beat:** The other half of the diptych. **Frame B shows the academic
version of Ahmed** — grad-student outfit, walking through a classic university
quad. Same Ahmed, same exact pose as Frame A, same camera angle, same lighting
key, same composition — only the OUTFIT and the ENVIRONMENT change. When the user
hovers the panel on the site, Ahmed transforms from the corporate executive
(Frame A) into this grad student (Frame B). The hover swap IS the closing
metaphor of the issue: two futures, both real, both his.

**IMPORTANT — generate this as a fresh full panel, NOT as an image-edit.** This
is the only Frame B in the document that is NOT a "keep the previous image
identical except for tiny deltas" edit. Both halves of the § 04 diptych are
different scenes that share only the character (face, body, pose) and the visual
style. Use a fresh full prompt as below.

**Reference images to attach (order matters):**
1. **Your face photo** — FIRST and required, to keep his face IDENTICAL to the
   other panels. The tiny visible face sliver still needs to read as you.
2. **Your generated § 04 Frame A image** — SECOND, as a POSE / COMPOSITION
   reference only. Tell the model to MATCH THE POSE, STRIDE, HEAD TURN, CAMERA
   ANGLE, AND LIGHTING KEY of this image exactly — but to REPLACE the outfit
   (suit → grad-student outfit) and the environment (corporate plaza → university
   quad) entirely. Do NOT instruct the model to keep this image "identical."

**Prompt — copy and paste in full:**

```
Two reference images are attached. THE FIRST IMAGE is a photo of Ahmed's face —
match his face, hair, mustache, goatee, and head proportions IDENTICALLY to this
photo. THE SECOND IMAGE is the previously generated § 04 Frame A panel (Ahmed in
a navy suit walking across a corporate plaza) — match the POSE, STRIDE, HEAD
TURN, CAMERA ANGLE, AND LIGHTING KEY of this image exactly, but REPLACE the
outfit and the environment entirely as described below. The two panels form a
DIPTYCH: same Ahmed, same exact pose, two different futures.

A single comic-book illustration in the style of a vintage pop-art / GTA-loading-
screen character poster. Bold black ink linework with varying line weights — thick
3–4px outlines on the figure, finer 1–2px ink on background details. Heavy use of
Ben-Day halftone dot shading: visible large dots in mid-shadows on stone, ivy,
sky, and skin, fading to clean white highlights. Cross-hatched ink in deepest
shadows. Bright, flat, saturated color fills — no soft gradients, no airbrush, no
painterly blending. Crisp white specular highlights on hair, fabric, and stone —
clean shapes, never soft glows. Faint sunburst speed-lines emanating from the
late-afternoon sun. Color palette: warm late-afternoon golden amber, warm cream
sand-stone, deep ivy green, lush lawn green, dusty teal sky, sand-tan stone path,
black ink. Saturated and graphic, not photoreal. Faint cream border and subtle
paper-grain texture. A small four-point sparkle ornament sits in the bottom-right
corner as a signature mark.

THE FIGURE: Ahmed — a man in his mid-20s, Egyptian / Middle Eastern descent, warm
olive skin. Short dark-brown curly hair, tight on the sides, fuller on top. Strong
dark eyebrows. Neat dark mustache joining a small chin goatee. Hazel-brown eyes
with a single sharp catchlight. Lean athletic build. Match the visible sliver of
his face (only the right cheek, the corner of his mouth, and one eye are visible
over his shoulder) IDENTICALLY to the attached face reference photo. The face
reads as the EXACT same person as in the corporate Frame A image — this is the
diptych anchor.

WARDROBE — GRAD STUDENT (this is the contrast to Frame A's suit; the wardrobe
override IS the entire point of this frame): a casual-academic ensemble. A
heather DARK NAVY OR CHARCOAL crewneck pullover SWEATER (cotton or fine knit) over
a crisp WHITE T-SHIRT visible at the neckline. SLIM-FIT DARK INDIGO BLUE JEANS
(not chinos, not suit trousers — clearly denim with subtle ink-line stitching at
the seams). PLAIN CLEAN WHITE LOW-TOP CANVAS SNEAKERS or simple white leather
trainers. A WORN CANVAS-AND-LEATHER MESSENGER BAG (warm tan canvas with brown
leather straps and trim) slung diagonally across his body, hanging at his right
hip — visible from behind as a tan-and-brown silhouette against the dark sweater.
He still has the same spiral-bound notebook tucked under his left arm (carry-over
prop from § 01–§ 03). NO suit, NO tie, NO oxfords, NO briefcase — those belong
in Frame A.

POSE LOCK (CRITICAL — match Frame A exactly): low-angle camera positioned behind
Ahmed, looking forward. He walks away from camera, mid-stride, his LEFT FOOT
forward (same as Frame A). His head is turned slightly back over his RIGHT
shoulder — only the corner of his face is visible, showing a small knowing smile
and one hazel-brown eye (same as Frame A). His shoulders, the angle of his torso,
the position of his arms, and the slight tilt of his head must match Frame A as
closely as the new outfit allows. The diptych must read as the same person caught
in the same instant of stride, just dropped into a different life.

SCENE: Late afternoon at a classic university quad. Camera positioned low and
behind Ahmed (same angle as Frame A), looking forward across a wide stone-paved
path that crosses a lush green lawn quad and leads toward a university building
in the mid-distance.

THE PATH: a wide flat stone-paved path of large warm sand-tan flagstones with
mossy grout lines, cutting across the central axis of a green grass lawn. The
path feels older, more organic, more "campus" than the polished corporate plaza
of Frame A.

THE QUAD: a wide green grass lawn (saturated lush green) flanks the stone path on
both sides, with a few mature deciduous trees casting long warm late-afternoon
shadows across the grass. A wooden bench under one of the trees. Maybe a low
stone wall along one edge. Birds and squirrels suggested as small ink silhouettes
at the lawn's edges.

THE BACKGROUND BUILDING (mid-distance, dominating the upper portion of the frame):
a generic but unmistakably ACADEMIC building — a classical-modernist university
hall in warm cream sand-stone, with a low DOMED ROTUNDA or PEDIMENTED ENTRANCE
PORTICO at the center, tall narrow arched windows in repeating rhythm along the
facade, a wide flight of stone entry steps, and CLIMBING IVY draped along one
flank of the building. A small clock tower or a simple stone bell tower silhouette
rises behind the main hall. The whole building reads "university" — Oxbridge /
Ivy-League / classical academic — but is not any specific real institution. Render
with flat warm cream color and halftone shading on the west-facing surfaces. The
deep green ivy is the strongest color note on the building.

DISTANT BACKGROUND: more academic buildings recede into the distance behind the
main hall — smaller silhouetted forms with similar classical-modernist proportions.
A handful of small distant figures (suggested as ink silhouettes carrying
backpacks or messenger bags, no detail) walk across the quad in different
directions, suggesting it is the end of a class day.

THE SKY: a clean dusty teal sky filling the upper third of the frame (SAME sky
color as Frame A — diptych continuity), with a few thin halftone-stippled cloud
bands. The sun is low on the right side of the frame (same direction as Frame A),
just out of view behind the academic building, casting warm golden light across
the quad and rim-lighting Ahmed's right side. NO graphic sunrise, NO concentric
halftone-dot arcs, NO stylized sun.

LIGHTING: warm golden-hour side-light from the right of the frame (SAME lighting
key as Frame A — diptych continuity). Ahmed is rim-lit along his right shoulder
and the top of his head; his front-facing side falls into warm halftone shadow.
The cream academic building catches the warm light strongly along its east-facing
surfaces; its west sides fall into halftone shadow. The lawn glows warm green in
the late light. Long real shadows stretch from Ahmed, the trees, the bench, and
the building back toward the left of the frame. The shadow geometry should match
Frame A as closely as the new environment allows.

COLOR PALETTE: warm golden-amber late-afternoon light; cream sand-stone academic
building with halftone gray shadow on west-facing surfaces; deep saturated ivy
green climbing the building; lush warm grass green of the quad; sand-tan stone
path; dusty teal sky; dark green tree foliage; Ahmed's dark navy / charcoal
sweater + white t-shirt collar + dark indigo jeans reading as a more textured /
casual silhouette in the center foreground (compared to Frame A's clean dark suit
silhouette); warm tan canvas messenger bag with brown leather straps as a
secondary chromatic note; black ink outlines throughout.

COMPOSITION: cinematic wide letterbox framing matching Frame A's composition
exactly. Ahmed positioned slightly left of center in the lower foreground (same
position as Frame A), walking forward and slightly to the right toward the
academic building. The academic hall fills the upper mid-distance, anchoring the
composition. The stone path recedes into the distance with subtle perspective.
The overall composition reads as a real wide-angle university-quad late-afternoon
shot — thoughtful, contemplative, scholarly.

AVOID: no text, no letters, no words, no captions, no signs with writing, no
readable numbers, no logos, no university crests, no watermarks, no signatures,
no photorealism, no 3D render, no smooth airbrush gradients, no soft glows, no
lens flare, no bokeh, no extra fingers, no distorted face, no melted hands, no
asymmetric eyes, no anime style, no manga style, no Disney style, no children's
book style, no painterly brushstrokes, no oil painting texture, no crowds, no
muddy colors, no desaturated washed-out look. SPECIFICALLY: no archway portals,
no labeled gates, no triumphal arches, no graphic concentric sunrise, no runway-
style road markings, no aircraft chevrons, no corporate buildings in this frame
(no glass-and-steel office tower, no biotech HQ, no plaza with abstract sculpture
— those belong in Frame A), no any one specific real-world university that could
be identified by name (no Harvard, no Oxford, no Stanford), no suit, no tie, no
briefcase, no oxford shoes — Ahmed in this frame must read as a grad student,
not as an executive.
```

---

## Tips for keeping all eight images consistent

1. **Generate the four Frame A panels first, in story order: § 01 → § 02 → § 03 →
   § 04.** § 01 sets the visual look; once it works, attach it as a `--sref` style
   reference for the next three to keep the line weight, halftone density, and color
   saturation locked.
2. **Always attach the same face reference** on every prompt, even Frame B prompts.
   Faces drift more than scenes — anchor the face hard.
3. **Lock the lower body for § 01–§ 03; § 04 splits into a diptych of two
   future-selves.** Panels § 01, § 02, and § 03 share the same lower body (dark
   slim chinos + plain white low-top sneakers). The wardrobe changes per panel to
   mark the passage of time:
   - § 01 — burgundy crew-neck tee (undergrad lab, casual)
   - § 02 — charcoal-grey long-sleeve sweatshirt (late-night deep work)
   - § 03 — cobalt-blue Oxford button-up (current professional role)
   - § 04 Frame A (CORPORATE FUTURE) — slim-fit dark navy two-piece suit, white
     open-collar dress shirt, polished dark leather oxfords, slim black leather
     portfolio
   - § 04 Frame B (ACADEMIC FUTURE) — dark navy/charcoal crewneck sweater over
     white t-shirt, slim dark indigo jeans, plain white canvas sneakers, tan
     canvas-and-leather messenger bag

   The first three panels are a chronological arc (tee → sweatshirt → Oxford); the
   fourth panel is a hover-toggle DIPTYCH between two parallel possible futures.
4. **Lock the lighting key.** Halftone shadow on the right side of his face,
   highlight on the left, in all four panels and both frames of each panel. This is
   the cheapest consistency trick.
5. **§ 01 and § 02 show DIFFERENT facades of the same Qatar University campus.**
   - § 01 (daylight, through the lab window) shows the **rose-window facade** —
     stacked cream cubic stone blocks with large circular Islamic geometric lattice
     windows. Attach reference image 1.
   - § 02 (night, through venetian blinds) shows the **wind-tower / *badgheer*
     facade** — tall square shafts with FLAT-TOPPED square caps pierced by vertical
     slits (NOT pointed pyramids — generators love to add fake pyramidal tops, so
     guard against this in every regeneration). Attach reference image 2.
   - Continuity comes from the cream sand-stone color and the warm Doha sky, not
     from a shared silhouette. The reader registers "same campus" via palette and
     time-of-day shift, not matching architecture.
6. **For § 04, the diptych:** generate Frame A (the corporate future) FIRST. Once
   you have a Frame A you're happy with, generate Frame B (the academic future) by
   attaching Frame A as a POSE / COMPOSITION reference (NOT as a "keep identical"
   base) and using the fresh full prompt for Frame B. The diptych works only if
   the pose, head turn, camera angle, and lighting key match across the two
   frames — only the outfit and environment should change. If Frame B drifts in
   pose or camera angle, re-roll with a stronger pose-lock instruction. Both
   environments are generic archetypes — no specific real company in Frame A, no
   specific real university in Frame B; if a generation produces a recognizable
   institution or brand, re-roll.
7. **Re-render rather than inpaint.** If the glove, the badgheer, or the wardrobe
   goes wrong on a Frame A, re-roll the whole panel. Inpainting comic-book linework
   cleanly is harder than re-rolling.
8. **For Frame B of § 01, § 02, § 03 ONLY, work in image-edit mode** (Nano Banana,
   Flux Kontext, Midjourney `--cref`/`--sref`, or DALL·E inpainting). Those three
   Frame B's are tiny-delta hover animations on the same scene. Never generate
   them from the prompt alone — the scene will not match Frame A precisely enough
   for an animation pair.

9. **§ 04 Frame B is the EXCEPTION — generate it as a fresh full prompt.** It is
   a different scene entirely (academic quad vs. corporate plaza), not a small
   delta. Attach Frame A as a POSE / COMPOSITION reference, not as a base for
   editing. The two § 04 frames are bound together by character and pose, not by
   pixel-identity.

---

## How to wire the Frame A / Frame B pairs into the site

Once you have both frames for a panel, the simplest implementation is a CSS animation
that swaps `background-image` on hover:

```css
.panel-01 {
  background-image: url("/story/panel-01-frame-a.png");
}
.panel-01:hover {
  background-image: url("/story/panel-01-frame-b.png");
}
```

For the smoother 1.2-second beat described in DESIGN.md, use a CSS keyframe that
crossfades for 200ms in, holds Frame B for 800ms, then crossfades back over 200ms on
cursor exit. For § 01, § 02, and § 03, you can alternatively keep the artwork as
static PNGs and animate via SVG overlay — slice the delta layer (the cyan glove
sensors in § 01, the green checkmark badge in § 02, the glowing arrows in § 03)
out as an inline SVG that fades in on top of Frame A.

§ 04 is different — it's a full diptych, not a delta. The hover swap should be a
slower, more deliberate crossfade between two complete images (e.g., 400ms ease
into Frame B, hold 1200ms, 400ms ease back to Frame A on cursor exit). The longer
duration sells the "transformation between two future-selves" beat instead of
reading as a quick hover effect. Consider also pairing the swap with a tiny
caption or label that fades in (e.g., a label that reads "INDUSTRY" on Frame A
and "ACADEMIA" on Frame B) so the reader registers what just happened.

For mobile, swap "on hover" for "on scroll into view" — fire the Frame A → Frame B
transition once when the panel enters the viewport, then settle back to Frame A
after 1.2 seconds.
