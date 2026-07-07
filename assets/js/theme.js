// ============================================================
//  theme.js — theme switching for every hiraethdusk page.
//  Sets data-theme on <html> (which themes.css reacts to),
//  remembers the choice in localStorage, and injects the
//  corner toggle button that cycles base → night → dawn.
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
  let idx = Math.max(0, THEMES.findIndex(t => t.id === saved));

  applyTheme();

  function applyTheme() {
    document.documentElement.dataset.theme = THEMES[idx].id;
    try { localStorage.setItem('hd-theme', THEMES[idx].id); } catch (e) { /* ignore */ }
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
      applyTheme();
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
