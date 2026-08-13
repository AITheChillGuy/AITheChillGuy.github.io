/* Theme toggle — light/dark across the whole site.
 * Explicit choice (data-theme + localStorage) wins; with no stored
 * choice the CSS prefers-color-scheme media queries decide, so this
 * script only has to handle the manual override. A tiny inline
 * snippet in each page's <head> restores the stored theme pre-paint.
 */
(function () {
  'use strict';
  var root = document.documentElement;

  function current() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.theme-toggle');
    if (!btn) return;
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (err) { /* private mode */ }
  });
})();
