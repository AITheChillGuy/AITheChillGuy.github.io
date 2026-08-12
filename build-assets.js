/* One-time asset pipeline. Run: node build-assets.js
 * - Avatars: grayscale (kill the warm cast), flood-fill the cream bg to
 *   transparent from the corners (the ink outline is a hard barrier so the
 *   figure interior is never touched), then emit WebP + PNG at 2 widths.
 * - Story frames: stay full color (the one color island), emit WebP + PNG.
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'site', 'assets');
fs.mkdirSync(path.join(OUT, 'avatar'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'story'), { recursive: true });

// design Pose N -> source file pose# (1 hero, 2 walking+notebook,
// 3 arms-crossed, 4 waving, 6 lounging; 7 is the headshot/wordmark;
// 1+8 are exported as a shared-crop hero pair, see below)
const POSES = { 1: 1, 2: 2, 3: 3, 4: 4, 6: 6 };

const lum = (d, i) => 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];

async function cutout(src) {
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info; // RGBA, C=4
  const seed = lum(data, 0); // top-left is background
  const TOL = 30;
  const visited = new Uint8Array(W * H);
  const stack = [];
  const pushIf = (x, y) => {
    if (x < 0 || y < 0 || x >= W || y >= H) return;
    const p = y * W + x;
    if (visited[p]) return;
    visited[p] = 1;
    const v = lum(data, p * C);
    if (Math.abs(v - seed) <= TOL) {
      data[p * C + 3] = 0; // transparent
      stack.push(p);
    }
  };
  // seed every edge pixel
  for (let x = 0; x < W; x++) { pushIf(x, 0); pushIf(x, H - 1); }
  for (let y = 0; y < H; y++) { pushIf(0, y); pushIf(W - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % W, y = (p / W) | 0;
    pushIf(x + 1, y); pushIf(x - 1, y); pushIf(x, y + 1); pushIf(x, y - 1);
  }
  return sharp(data, { raw: { width: W, height: H, channels: C } });
}

async function boxOf(img) {
  const { data, info } = await img.clone().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (data[(y * W + x) * C + 3] > 10) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
  return { minX, minY, maxX, maxY };
}

async function trimBox(img) {
  // crop to the non-transparent bounding box so the figure anchors cleanly
  const b = await boxOf(img);
  return img.extract({ left: b.minX, top: b.minY, width: b.maxX - b.minX + 1, height: b.maxY - b.minY + 1 });
}

(async () => {
  for (const [pose, n] of Object.entries(POSES)) {
    const cut = await trimBox(await cutout(`ahmed-avatar/ahmed-character-pose${n}.png`));
    const meta = await cut.metadata();
    const base = `pose${pose}`;
    for (const w of [900, 480]) {
      if (w > meta.width) continue;
      const tag = w === 900 ? '' : '@sm';
      await cut.clone().resize({ width: w }).grayscale().webp({ quality: 90 })
        .toFile(path.join(OUT, 'avatar', `${base}${tag}.webp`));
      await cut.clone().resize({ width: w }).grayscale().png({ compressionLevel: 9 })
        .toFile(path.join(OUT, 'avatar', `${base}${tag}.png`));
    }
    console.log('avatar', base, `${meta.width}x${meta.height}`);
  }

  // headshot (Pose 7) -> square head crop, reused for the wordmark hover
  // swap + the favicon so neither is ever stretched into a non-square box.
  // materialize the trim so dimensions are real (metadata() would report the
  // pre-extract source size and break the square crop below).
  const headPng = await (await trimBox(await cutout('ahmed-avatar/ahmed-character-pose7.png')))
    .png().toBuffer();
  const hm = await sharp(headPng).metadata();
  // figure is a head-and-shoulders portrait; a top-anchored square of side =
  // width frames the face/shoulders cleanly (CSS rounds it to a circle).
  const side = Math.min(hm.width, hm.height);
  const sq = () => sharp(headPng)
    .extract({ left: 0, top: 0, width: side, height: side })
    .grayscale();

  // nav logo swap source (displayed small; 96px covers retina at ~28px)
  await sq().resize({ width: 96 }).webp({ quality: 90 })
    .toFile(path.join(OUT, 'avatar', 'headshot.webp'));
  await sq().resize({ width: 96 }).png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'avatar', 'headshot.png'));
  await sq().resize({ width: 256 }).png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'avatar', 'lock.png'));

  // favicon: circular alpha mask so the browser tab shows a round avatar
  // (transparent corners) instead of squishing a portrait into the slot.
  const FAV = 64;
  const circle = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${FAV}" height="${FAV}">` +
    `<circle cx="${FAV / 2}" cy="${FAV / 2}" r="${FAV / 2}" fill="#fff"/></svg>`
  );
  await sq().resize({ width: FAV, height: FAV })
    .composite([{ input: circle, blend: 'dest-in' }])
    .png().toFile(path.join(OUT, 'favicon.png'));

  // Apple touch icon: iOS masks corners itself and turns transparency black,
  // so this one is a full square on the page's white background.
  await sq().resize({ width: 180, height: 180 })
    .flatten({ background: '#FFFFFF' })
    .png({ compressionLevel: 9 }).toFile(path.join(OUT, 'apple-touch-icon.png'));

  // Hero pair (Pose 1 default, Pose 8 wave on hover). Both source frames
  // share one coordinate system (head ~y163, feet ~93px off the canvas
  // bottom in each), so cropping BOTH to the union bounding box yields two
  // pixel-identical images: same scale, feet aligned. They can then be
  // stacked and cross-faded without the figure ever resizing.
  const cutA = await cutout('ahmed-avatar/ahmed-character-pose1.png');
  const cutB = await cutout('ahmed-avatar/ahmed-character-pose8.png');
  const bA = await boxOf(cutA), bB = await boxOf(cutB);
  const u = {
    left: Math.min(bA.minX, bB.minX),
    top: Math.min(bA.minY, bB.minY),
  };
  u.width = Math.max(bA.maxX, bB.maxX) - u.left + 1;
  u.height = Math.max(bA.maxY, bB.maxY) - u.top + 1;
  for (const [tag, cut] of [['a', cutA], ['b', cutB]]) {
    const base = cut.clone().extract(u).grayscale();
    for (const w of [900, 480]) {
      const sm = w === 900 ? '' : '@sm';
      await base.clone().resize({ width: w }).webp({ quality: 90 })
        .toFile(path.join(OUT, 'avatar', `hero-${tag}${sm}.webp`));
      await base.clone().resize({ width: w }).png({ compressionLevel: 9 })
        .toFile(path.join(OUT, 'avatar', `hero-${tag}${sm}.png`));
    }
  }
  console.log('hero pair', `${u.width}x${u.height}`);

  for (const N of [1, 2, 3, 4]) {
    for (const v of ['a', 'b']) {
      const src = `storyline/frame-${N}${v}.png`;
      const s0 = await sharp(src).metadata();
      // Two things are baked into every source frame and must be cropped
      // out so the page's own comic outline is the only border:
      //  1. a thin hand-drawn panel border ~35-60px in from each edge —
      //     a fixed 64px inset clears it on all four scenes.
      //  2. a decorative sparkle in the bottom-right corner (rightmost
      //     ~10-12% across every ratio) — removed by the 15% right trim,
      //     which also takes the right border with it.
      const INSET = 64;
      const rightCrop = Math.round(s0.width * 0.15);
      const left = INSET, top = INSET;
      const cw = s0.width - INSET - rightCrop;
      const ch = s0.height - INSET * 2;
      const img = sharp(src).extract({ left, top, width: cw, height: ch });
      const m = { width: cw, height: ch };
      const full = Math.min(m.width, 1600);
      await img.clone().resize({ width: full }).webp({ quality: 78 })
        .toFile(path.join(OUT, 'story', `frame-${N}${v}.webp`));
      await img.clone().resize({ width: full }).png({ compressionLevel: 9, quality: 80 })
        .toFile(path.join(OUT, 'story', `frame-${N}${v}.png`));
      await img.clone().resize({ width: Math.round(full / 2) }).webp({ quality: 62 })
        .toFile(path.join(OUT, 'story', `frame-${N}${v}@sm.webp`));
      console.log('frame', `${N}${v}`, `${m.width}x${m.height} -> ${full}`);
    }
  }
  console.log('assets built ->', OUT);
})();
