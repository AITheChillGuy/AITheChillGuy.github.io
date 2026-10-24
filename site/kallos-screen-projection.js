/* Project native HTML onto glTF display corners using public model-viewer hotspots. */
(() => {
  'use strict';
  let instance = 0;
  const finiteVector = value => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const position = vector => vector.map(value => value + 'm').join(' ');

  // Scaled partial pivoting keeps the solve stable for both pixel and unit coordinates.
  function solve(rows) {
    const scales = rows.map(row => Math.max(...row.slice(0, 8).map(Math.abs)));
    for (let column = 0; column < 8; column += 1) {
      let pivot = column, score = 0;
      for (let row = column; row < 8; row += 1) {
        const candidate = scales[row] ? Math.abs(rows[row][column]) / scales[row] : 0;
        if (candidate > score) { score = candidate; pivot = row; }
      }
      if (score < 1e-12) return null;
      [rows[column], rows[pivot]] = [rows[pivot], rows[column]];
      [scales[column], scales[pivot]] = [scales[pivot], scales[column]];
      const divisor = rows[column][column];
      if (!Number.isFinite(divisor) || Math.abs(divisor) < 1e-14) return null;
      for (let i = column; i <= 8; i += 1) rows[column][i] /= divisor;
      for (let row = 0; row < 8; row += 1) {
        if (row === column) continue;
        const factor = rows[row][column];
        for (let i = column; i <= 8; i += 1) rows[row][i] -= factor * rows[column][i];
      }
    }
    const result = rows.map(row => row[8]);
    return result.every(Number.isFinite) ? result : null;
  }

  function homography(points, width, height) {
    const unit = [[0, 0], [1, 0], [1, 1], [0, 1]], rows = [];
    unit.forEach(([u, v], i) => {
      const {x, y} = points[i];
      rows.push([u, v, 1, 0, 0, 0, -x * u, -x * v, x]);
      rows.push([0, 0, 0, u, v, 1, -y * u, -y * v, y]);
    });
    const h = solve(rows);
    return h && [h[0] / width, h[1] / height, h[2],
      h[3] / width, h[4] / height, h[5], h[6] / width, h[7] / height];
  }

  function project(h, x, y) {
    const denominator = h[6] * x + h[7] * y + 1;
    if (!Number.isFinite(denominator) || Math.abs(denominator) < 1e-10) return null;
    return {x: (h[0] * x + h[1] * y + h[2]) / denominator,
      y: (h[3] * x + h[4] * y + h[5]) / denominator};
  }

  function centerScale(h, width, height) {
    const x = width / 2, y = height / 2;
    const d = h[6] * x + h[7] * y + 1;
    const nx = h[0] * x + h[1] * y + h[2], ny = h[3] * x + h[4] * y + h[5];
    const xx = (h[0] * d - nx * h[6]) / (d * d);
    const xy = (h[1] * d - nx * h[7]) / (d * d);
    const yx = (h[3] * d - ny * h[6]) / (d * d);
    const yy = (h[4] * d - ny * h[7]) / (d * d);
    return {nativeScale: Math.sqrt(Math.abs(xx * yy - xy * yx)),
      nativeScaleX: Math.hypot(xx, yx), nativeScaleY: Math.hypot(xy, yy)};
  }

  function convex(points) {
    let sign = 0;
    for (let i = 0; i < 4; i += 1) {
      const a = points[i], b = points[(i + 1) % 4], c = points[(i + 2) % 4];
      const turn = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
      if (!Number.isFinite(turn) || Math.abs(turn) < 1e-5) return false;
      if (sign && Math.sign(turn) !== sign) return false;
      sign = Math.sign(turn);
    }
    const twiceArea = points.reduce((sum, point, i) => {
      const next = points[(i + 1) % 4];
      return sum + point.x * next.y - next.x * point.y;
    }, 0);
    return Math.abs(twiceArea) >= 8;
  }

  function create(viewer, surface, frames) {
    if (!viewer || !surface || !frames) throw new TypeError('A viewer, surface and screen frames are required.');
    const id = ++instance, screens = new Map(), nodes = [];
    let active = null, pending = 0, warmFrames = 0, disposed = false;
    for (const [role, frame] of Object.entries(frames)) {
      if (!finiteVector(frame.center) || !finiteVector(frame.right) || !finiteVector(frame.up) ||
        !(Number.isFinite(frame.width) && frame.width > 0 && Number.isFinite(frame.height) && frame.height > 0)) {
        throw new TypeError('Invalid display frame: ' + role);
      }
      const normal = finiteVector(frame.normal) ? frame.normal : [
        frame.right[1] * frame.up[2] - frame.right[2] * frame.up[1],
        frame.right[2] * frame.up[0] - frame.right[0] * frame.up[2],
        frame.right[0] * frame.up[1] - frame.right[1] * frame.up[0]
      ];
      const names = [];
      [[-1, 1], [1, 1], [1, -1], [-1, -1]].forEach(([right, up], index) => {
        const corner = frame.center.map((value, axis) => value +
          right * frame.right[axis] * frame.width / 2 + up * frame.up[axis] * frame.height / 2);
        const node = document.createElement('span');
        node.slot = 'hotspot-kallos-screen-' + id + '-' + role + '-' + index;
        node.dataset.position = position(corner); node.dataset.normal = position(normal);
        node.setAttribute('aria-hidden', 'true'); node.setAttribute('inert', '');
        node.style.cssText = 'display:block;width:0;height:0;opacity:0;pointer-events:none;border:0;padding:0;';
        names.push(node.slot); nodes.push(node); viewer.append(node);
      });
      screens.set(role, {frame, names});
    }
    surface.style.position = 'absolute'; surface.style.left = '0'; surface.style.top = '0';
    surface.style.transformOrigin = '0 0';

    function invalid(reason) {
      surface.style.visibility = 'hidden'; surface.style.pointerEvents = 'none';
      surface.dataset.projectable = 'false';
      surface.dataset.projection = JSON.stringify({role: active, projectable: false, reason});
      return null;
    }
    function update() {
      if (disposed || !active) return null;
      const {frame, names} = screens.get(active);
      if (typeof viewer.queryHotspot !== 'function') return invalid('viewer-not-ready');
      const hotspots = names.map(name => viewer.queryHotspot(name));
      if (hotspots.some(hotspot => !hotspot)) return invalid('hotspots-not-ready');
      if (hotspots.some(hotspot => !hotspot.facingCamera)) return invalid('back-facing');
      const local = hotspots.map(hotspot => hotspot.canvasPosition);
      if (local.some(point => !point || ![point.x, point.y, point.z].every(Number.isFinite))) {
        return invalid('nonfinite-corners');
      }
      if (local.some(point => point.z < -1.000001 || point.z > 1.000001)) return invalid('outside-depth-frustum');
      const viewerWidth = viewer.clientWidth, viewerHeight = viewer.clientHeight;
      if (!(viewerWidth > 0 && viewerHeight > 0)) return invalid('empty-viewport');
      const xs = local.map(point => point.x), ys = local.map(point => point.y);
      if (Math.max(...xs) < 0 || Math.min(...xs) > viewerWidth ||
        Math.max(...ys) < 0 || Math.min(...ys) > viewerHeight) return invalid('fully-offscreen');
      if (!convex(local)) return invalid('degenerate-quad');

      // The overlay and viewer share a containing stage. Account for its border/scroll without a body portal.
      const parent = surface.offsetParent || surface.parentElement;
      if (!parent) return invalid('missing-containing-block');
      const parentRect = parent.getBoundingClientRect(), viewerRect = viewer.getBoundingClientRect();
      const left = viewerRect.left - parentRect.left - parent.clientLeft + parent.scrollLeft;
      const top = viewerRect.top - parentRect.top - parent.clientTop + parent.scrollTop;
      const points = local.map(point => ({x: point.x + left, y: point.y + top, z: point.z}));
      const width = (distance(points[0], points[1]) + distance(points[3], points[2])) / 2;
      const height = width * frame.height / frame.width;
      if (!(Number.isFinite(width) && width >= 1 && Number.isFinite(height) && height >= 1)) {
        return invalid('empty-native-layout');
      }
      const h = homography(points, width, height);
      if (!h) return invalid('singular-homography');
      const corners = [[0, 0], [width, 0], [width, height], [0, height]];
      const mapped = corners.map(([x, y]) => project(h, x, y));
      if (mapped.some(point => !point || !Number.isFinite(point.x) || !Number.isFinite(point.y))) {
        return invalid('nonfinite-projection');
      }
      const cornerError = Math.max(...mapped.map((point, i) => distance(point, points[i])));
      if (!Number.isFinite(cornerError) || cornerError > 0.5) return invalid('projection-residual');
      const scales = centerScale(h, width, height);
      if (!Object.values(scales).every(Number.isFinite)) return invalid('nonfinite-scale');
      const matrix = [h[0], h[3], 0, h[6], h[1], h[4], 0, h[7], 0, 0, 1, 0, h[2], h[5], 0, 1];
      const radius = Number.isFinite(frame.radius) ? Math.max(0, frame.radius) : 0;
      surface.style.width = width + 'px'; surface.style.height = height + 'px';
      surface.style.borderRadius = (radius / frame.width * 100) + '% / ' + (radius / frame.height * 100) + '%';
      surface.style.transform = 'matrix3d(' + matrix.join(',') + ')';
      surface.style.visibility = 'visible'; surface.style.pointerEvents = '';
      surface.classList.remove('kd-flat-fallback');
      surface.dataset.projectable = 'true';
      const result = {role: active, projectable: true, width, height, aspect: width / height,
        points, cornerError, ...scales};
      surface.dataset.projection = JSON.stringify(result);
      return result;
    }
    function schedule(extraFrames = 0) {
      if (disposed || !active) return;
      warmFrames = Math.max(warmFrames, Number.isFinite(extraFrames) ? extraFrames : 0);
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0; update();
        if (warmFrames > 0) { warmFrames -= 1; schedule(); }
      });
    }
    const onCamera = () => schedule(), onLoad = () => schedule(2), onResize = () => schedule(1);
    viewer.addEventListener('camera-change', onCamera); viewer.addEventListener('load', onLoad);
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(onResize) : null;
    if (observer) observer.observe(viewer);
    window.addEventListener('resize', onResize);

    function hide() {
      active = null; warmFrames = 0;
      if (pending) { cancelAnimationFrame(pending); pending = 0; }
      surface.style.visibility = 'hidden'; surface.style.pointerEvents = 'none';
      delete surface.dataset.projection; surface.dataset.projectable = 'false';
    }
    hide();
    return Object.freeze({
      use(role) {
        if (disposed) return null;
        if (!screens.has(role)) throw new RangeError('Unknown display role: ' + role);
        active = role;
        const result = update(); schedule(2); return result;
      },
      update, hide,
      dispose() {
        if (disposed) return;
        hide(); disposed = true;
        viewer.removeEventListener('camera-change', onCamera); viewer.removeEventListener('load', onLoad);
        window.removeEventListener('resize', onResize); if (observer) observer.disconnect();
        nodes.forEach(node => node.remove());
      }
    });
  }
  window.KallosScreenProjection = Object.freeze({create});
})();
