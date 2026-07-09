// ============================================================
//  panel.js — collapsible options panel, shared by every toy.
//  Clicking the panel title hides/shows the panel body.
// ============================================================
document.addEventListener('click', (e) => {
  const title = e.target.closest('.panel-title');
  if (!title) return;
  const collapsed = title.closest('.panel').classList.toggle('collapsed');
  title.setAttribute('aria-expanded', String(!collapsed));
});
