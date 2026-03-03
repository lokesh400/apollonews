/* ════════════════════════════════════════════════════════════════
   ADNEWS — main.js
   ════════════════════════════════════════════════════════════════ */

// ── Breaking News Ticker ─────────────────────────────────────────
async function loadTicker() {
  const ticker = document.getElementById('ticker');
  if (!ticker) return;
  try {
    const res  = await fetch('/search?q=&page=1');
    const text = await res.text();
    const parser = new DOMParser();
    const doc    = parser.parseFromString(text, 'text/html');
    const titles = [...doc.querySelectorAll('.article-title')]
      .slice(0, 10)
      .map(el => el.textContent.trim());
    if (titles.length) {
      ticker.textContent = titles.join('  ·  ');
    }
  } catch (e) {
    // Silently ignore; ticker shows default text
  }
}
loadTicker();

// ── Lazy-load images ──────────────────────────────────────────────
if ('IntersectionObserver' in window) {
  const lazyImgs = document.querySelectorAll('img[data-src]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        io.unobserve(entry.target);
      }
    });
  });
  lazyImgs.forEach(img => io.observe(img));
}

// ── Auto-refresh news every 10 minutes ───────────────────────────
// (Client-side hint — actual fetch is done by server cron)
let refreshCountdown = 600;
setInterval(() => {
  refreshCountdown--;
  if (refreshCountdown <= 0) {
    // Soft reload to show new articles
    window.location.reload();
  }
}, 1000);

console.log('%c📰 AdNews — News auto-fetches every 10 minutes via server cron.', 'color:#ffc107;font-weight:bold;');
