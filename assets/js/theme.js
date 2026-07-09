// ============================================================
//  theme.js — theme switching for every hiraethdusk page.
//  Sets data-theme on <html> (which themes.css reacts to),
//  remembers an explicit choice in localStorage, and injects
//  the corner toggle button that cycles dusk → night → dawn.
//  First-time visitors whose OS prefers dark start on night.
//
//  Every theme change fires a 'hd-theme' event on window, so
//  canvas-based toys can re-read the palette and repaint.
//
//  Load this in <head> WITHOUT defer: applying the saved theme
//  before first paint avoids a flash of the wrong colours.
// ============================================================
(function () {
  const THEMES = [
    { id: 'dusk',  icon: '🌇' },
    { id: 'night', icon: '🌙' },
    { id: 'dawn',  icon: '⛅' },
  ];

  let saved = null;
  try { saved = localStorage.getItem('hd-theme'); } catch (e) { /* private mode */ }

  let idx = THEMES.findIndex(t => t.id === saved);
  if (idx < 0) {
    const dark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
    idx = dark ? 1 : 0;
  }

  applyTheme(false); // don't persist an implicit default — only real clicks

  function applyTheme(persist) {
    document.documentElement.dataset.theme = THEMES[idx].id;
    if (persist) {
      try { localStorage.setItem('hd-theme', THEMES[idx].id); } catch (e) { /* ignore */ }
    }
    window.dispatchEvent(new CustomEvent('hd-theme', { detail: THEMES[idx].id }));
  }

  function makeButton() {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';

    function render() {
      btn.textContent = THEMES[idx].icon;
      btn.dataset.name = THEMES[idx].id; // shown in the hover pill
      btn.setAttribute('aria-label', 'switch theme (current: ' + THEMES[idx].id + ')');
    }

    btn.addEventListener('click', () => {
      idx = (idx + 1) % THEMES.length;
      applyTheme(true);
      render();
    });

    render();
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', makeButton);
  } else {
    makeButton();
  }
})();
