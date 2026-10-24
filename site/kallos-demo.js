/* Bridge the isolated, source-built Kallos frontend to the physical device displays. */
(() => {
  'use strict';
  const base = new URL('assets/kallos-app/index.html', document.currentScript.src);
  const frames = new Map(), snapshots = new Map();
  let state = null;
  const empty = () => ({lang: 'en', date: 'Monday 26 October 2026',
    counts: {sessions: 3, booked: 27, checked: 2, available: 15}, classes: []});
  function notify() { document.dispatchEvent(new CustomEvent('kallos:demo-change')); }
  function send(frame, payload) { frame.contentWindow?.postMessage(payload, location.origin); }
  function broadcast(payload, except) {
    for (const frame of frames.values()) if (frame !== except) send(frame, payload);
  }
  for (const root of document.querySelectorAll('[data-kallos-app]')) {
    const role = root.dataset.kallosApp;
    const viewport = document.createElement('div'); viewport.className = 'kd-render';
    const frame = document.createElement('iframe');
    const url = new URL(base); url.searchParams.set('role', role); url.searchParams.set('v', new URL(document.currentScript.src).searchParams.get('v') || 'current');
    frame.src = url.href;
    frame.title = `Kallos ${role === 'staff' ? 'staff workspace' : 'member website'} — interactive sample data`;
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-downloads');
    frame.setAttribute('referrerpolicy', 'no-referrer');
    frame.setAttribute('loading', 'eager'); frame.className = 'kd-frontend';
    viewport.append(frame); root.replaceChildren(viewport); frames.set(role, frame);
  }
  addEventListener('message', event => {
    if (event.origin !== location.origin || !event.data || typeof event.data !== 'object') return;
    const pair = [...frames].find(([, frame]) => frame.contentWindow === event.source);
    if (!pair) return;
    const [role, frame] = pair, message = event.data;
    if (message.type === 'kallos:ready') {
      frame.dataset.ready = 'true';
      if (state) send(frame, {type: 'kallos:state', state});
    } else if (message.type === 'kallos:change' && message.state && message.snapshot) {
      state = message.state; snapshots.set(role, message.snapshot);
      broadcast({type: 'kallos:state', state}, frame); notify();
    } else if (message.type === 'kallos:snapshot' && message.snapshot) {
      snapshots.set(role, message.snapshot); notify();
    } else if (message.type === 'kallos:escape') {
      document.dispatchEvent(new CustomEvent('kallos:escape'));
    }
  });
  window.KallosDemo = Object.freeze({
    reset() {
      state = null; snapshots.clear();
      broadcast({type: 'kallos:reset'});
    },
    snapshot(role) { return structuredClone(snapshots.get(role) || empty()); }
  });
})();
