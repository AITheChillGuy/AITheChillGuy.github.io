const fs = require('fs');
const SP = '<svg class="sparkle" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z"/></svg>';
const SPM = '<svg class="sparkle mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z"/></svg>';
const FONTS = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,800;9..144,900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';

const pages = [
  { slug: 'domain-llms', num: '02', pose: 1, title: 'Domain-Adapted Clinical LLMs',
    lead: 'Teaching a general language model to speak clinical without forgetting how to reason.',
    stack: 'HuggingFace · PyTorch · LLM · Fine-tuning', status: 'Research, ongoing',
    prose: [
      ['The problem.', 'General-purpose LLMs hedge, hallucinate clinical detail, and miss the vocabulary that matters in a hospital. Off-the-shelf is not enough for downstream healthcare tasks.'],
      ['The approach.', 'Continued pre-training on clinical corpora followed by task fine-tuning. Careful data curation and deduplication; parameter-efficient adapters where full fine-tuning was too expensive for the available compute.'],
      ['What was hard.', 'Catastrophic forgetting and evaluation drift. Adapting to clinical text without degrading general reasoning meant tracking both in-domain and out-of-domain metrics every checkpoint.'],
      ['What shipped.', 'Domain-adapted checkpoints that outperform the base model on the target clinical tasks, with the adaptation recipe documented so it can be re-run on new corpora.'],
      ["What's next.", 'Pairing the adapted model with the retrieval stack so domain knowledge is both in the weights and in the context.']],
    fig: ['FIG. 1 — ADAPTATION RECIPE', 'base LLM\n  -> continued pre-train (clinical corpus, deduped)\n  -> task fine-tune (PEFT adapters)\n  -> eval: in-domain + general (every checkpoint)'],
    foot: 'Research work, Weill Cornell Medicine Qatar. Internal evaluation.',
    next: ['multimodal-radiology', 'Large Multimodal Models for Radiology'] },

  { slug: 'multimodal-radiology', num: '03', pose: 3, title: 'Large Multimodal Models for Radiology',
    lead: 'Models that read the scan, not just the chart — VQA and report generation over 2D and 3D imaging.',
    stack: 'VQA · LMM · DICOM · PyTorch', status: 'Research, ongoing',
    prose: [
      ['The problem.', 'Radiology questions are visual. A text-only model cannot answer them; it can only paraphrase the report. Real assistance means looking at the pixels.'],
      ['The approach.', 'Large multimodal models for visual question answering and automated report generation, trained over 2D and 3D medical imaging with DICOM-aware preprocessing and volume sampling.'],
      ['What was hard.', '3D volumes are large and class signal is sparse. Memory-aware sampling and augmentation that preserves anatomy were the difference between a model that learned and one that memorised.'],
      ['What shipped.', 'A VQA and report-generation pipeline that grounds its answers in the image region it attended to, so a radiologist can check where the model looked.'],
      ["What's next.", 'Coupling the multimodal model with the agentic workflow so a clinical question can route between text retrieval and image reasoning.']],
    fig: ['FIG. 1 — MULTIMODAL PIPELINE', 'DICOM volume -> preprocess + sample\n  -> vision encoder\n  -> multimodal fusion <- question\n  -> answer / generated report (+ attended region)'],
    foot: 'Research work, Weill Cornell Medicine Qatar. Internal evaluation.',
    next: ['agentic-ai', 'Agentic AI for Clinical Workflows'] },

  { slug: 'agentic-ai', num: '04', pose: 2, title: 'Agentic AI for Clinical Workflows',
    lead: 'Agents that check the retrieval first — multi-step reasoning with tools, not a single prompt.',
    stack: 'LangGraph · LangChain · Agents · Azure OpenAI', status: 'Research → integration',
    prose: [
      ['The problem.', 'Real clinical questions are multi-step: retrieve, cross-check, compute, then answer. A single LLM call collapses that into one guess.'],
      ['The approach.', 'LangChain and LangGraph agents with explicit state, tool use, and Agentic RAG — the retriever from Issue №01 is a tool the agent can call, re-query, and verify against before it commits to an answer.'],
      ['What was hard.', 'Loop control and cost. Agents that can call tools can also spiral; bounding steps, caching tool calls, and making every hop inspectable were essential.'],
      ['What shipped.', 'A graph-structured agent that decomposes a clinical question, calls retrieval and computation tools, and returns an answer with the full reasoning trace.'],
      ["What's next.", 'Adding the multimodal model as a callable tool so the same agent can reason over images and text in one workflow.']],
    fig: ['FIG. 1 — AGENT GRAPH', 'question -> planner\n  -> [ retrieve | compute | verify ]  (bounded loop)\n  -> synthesise -> answer + reasoning trace'],
    foot: 'Research work, Weill Cornell Medicine Qatar. Internal evaluation.',
    next: ['stroke-segmentation', 'Stroke Lesion Segmentation on MRI'] },

  { slug: 'stroke-segmentation', num: '05', pose: 2, title: 'Stroke Lesion Segmentation on MRI',
    lead: 'Do complex architectures always perform better? We benchmarked three and published the answer.',
    stack: 'PyTorch · UNet · ViT · Medical Imaging', status: 'Published — IEEE Access, 2024',
    prose: [
      ['The problem.', 'Stroke lesions on MRI are small, irregular, and heavily outnumbered by healthy tissue. Highly imbalanced segmentation is where fancy architectures are supposed to earn their keep.'],
      ['The approach.', 'Custom PyTorch data loaders and an augmentation pipeline built for severe class imbalance, used to benchmark a classic UNet against attention-augmented variants and a Transformer-based architecture under identical training conditions.'],
      ['What was hard.', 'A fair comparison. Identical loaders, identical augmentation, identical loss and schedule — so the architecture was the only variable. The imbalance made the loss choice (Dice-family) decisive.'],
      ['What shipped.', 'A published, peer-reviewed comparison in IEEE Access showing that the added architectural complexity did not reliably beat the well-tuned simple baseline on this task.'],
      ["What's next.", 'The methodology — controlled, loader-first benchmarking — carries into every imaging project since.']],
    fig: ['FIG. 1 — COMPARATIVE SETUP', 'imbalanced MRI -> custom loader + augmentation\n  -> { UNet | Attention-UNet | Transformer }\n  -> identical loss / schedule -> Dice / IoU'],
    foot: 'Zafari-Ghadim, Soliman, Yousif, Ibrahim, Rashed, Mabrok. "Deep Models for Stroke Segmentation: Do Complex Architectures Always Perform Better?" IEEE Access, 2024.',
    next: ['clinical-rag', 'Clinical RAG for Healthcare Knowledge'] },
];

for (const p of pages) {
  const prose = p.prose.map(([h, b]) => `    <p><strong>${h}</strong> ${b}</p>`).join('\n');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${p.title} — Ahmed's Portfolio</title>
<meta name="description" content="${p.lead}">
<link rel="icon" href="../assets/favicon.png">
<link rel="apple-touch-icon" href="../assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<link rel="stylesheet" href="../styles.css">
</head>
<body>
<nav class="nav">
  <a class="wordmark label-caps" href="../index.html#cover">
    ${SPM}
    A. IBRAHIM
  </a>
  <ul class="nav-links">
    <li><a class="nav-link label-caps" href="../index.html#work">WORK</a></li>
    <li><a class="nav-link label-caps" href="../index.html#story">STORY</a></li>
    <li><a class="nav-link label-caps" href="../index.html#about">ABOUT</a></li>
    <li><a class="nav-link label-caps" href="../index.html#send">CONTACT</a></li>
  </ul>
</nav>

<header class="detail-hero">
  <p class="label-caps issue">ISSUE №${p.num}</p>
  <h1 class="display-md">${p.title}</h1>
  <p class="lead">${p.lead}</p>
  <div class="avatar" data-pose="${p.pose}"><img src="../assets/avatar/pose${p.pose}.png" alt="Cartoon Ahmed"></div>
</header>

<section class="anatomy">
  <dl>
    <dt class="label-caps">Role</dt><dd>AI Research Specialist, WCM-Q</dd>
    <dt class="label-caps">Stack</dt><dd>${p.stack}</dd>
    <dt class="label-caps">Status</dt><dd>${p.status}</dd>
  </dl>
  <div class="prose">
${prose}
  </div>
</section>

<section class="artifacts">
  <figure class="fig">
<pre>${p.fig[1]}</pre>
    <figcaption class="caption-meta label-caps">${p.fig[0]}</figcaption>
  </figure>
</section>

<p class="footnote">${p.foot}</p>

<a class="next-issue" href="${p.next[0]}.html" style="display:block">
  <span class="label-caps lab">NEXT ISSUE →</span>
  <h2 class="h2">${p.next[1]}</h2>
</a>

<footer class="footer">
  <div class="footer-row">
    <span class="label-caps">© 2026 AHMED IBRAHIM · ISSUE 01 · DOHA, QATAR</span>
    ${SP}
  </div>
</footer>

<div class="readout" id="readout" aria-hidden="true">§ —</div>
<script>
(()=>{const r=document.getElementById("readout");
addEventListener("scroll",()=>{const h=document.documentElement;
r.textContent="§ ${p.num} · "+Math.round(h.scrollTop/(h.scrollHeight-h.clientHeight||1)*100)+"%";},{passive:true});})();
</script>
</body>
</html>
`;
  fs.writeFileSync('site/work/' + p.slug + '.html', html);
  console.log('wrote', p.slug);
}
