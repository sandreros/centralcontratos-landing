/* ===========================
   BLOG-LIST.JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = getConfig();
  const posts = getPosts();

  applyConfig(cfg);
  renderPosts(posts, 'all');
  setupFilters(posts);
  setupNavbar();
  setupMobileMenu();
  setupWhatsapp(cfg);
});

function applyConfig(cfg) {
  document.querySelectorAll('[data-cta]').forEach(el => {
    if (cfg.ctaUrl && cfg.ctaUrl !== '#') {
      el.href = cfg.ctaUrl;
      el.target = '_blank';
    }
  });
}

function setupNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

function setupWhatsapp(cfg) {
  const el = document.getElementById('wa-float');
  if (!el) return;
  if (!cfg.whatsapp || !cfg.showWhatsappFloat) { el.classList.add('hidden'); return; }
  el.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre a Central de Contratos.')}`;
}

function setupFilters(posts) {
  const categories = ['Todos', ...new Set(posts.map(p => p.category))];
  const container = document.getElementById('filter-btns');
  if (!container) return;

  container.innerHTML = '';
  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPosts(posts, cat === 'Todos' ? 'all' : cat);
    });
    container.appendChild(btn);
  });
}

function renderPosts(posts, category) {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;

  const filtered = category === 'all' ? posts : posts.filter(p => p.category === category);

  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-muted)">
      <div style="font-size:3rem;margin-bottom:1rem">📝</div>
      <p style="font-size:1.125rem;font-weight:600">Nenhum post encontrado</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(post => postCardHTML(post)).join('');
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return dateStr; }
}

function postCardHTML(post) {
  const coverSrc = post.cover || '';
  const coverEl = coverSrc
    ? `<img class="post-card-cover" src="${coverSrc}" alt="${post.title}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const placeholderEl = `<div class="post-card-cover-placeholder" style="${coverSrc ? 'display:none' : ''}">📄</div>`;

  return `
    <a href="post.html?slug=${post.slug}" class="post-card reveal">
      ${coverEl}${placeholderEl}
      <div class="post-card-body">
        <span class="post-category" style="background:${post.categoryColor || 'var(--primary)'}">
          ${post.category}
        </span>
        <h3 class="post-card-title">${post.title}</h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-meta">
          <span>📅 ${formatDate(post.date)}</span>
          <span>⏱ ${post.readTime}</span>
        </div>
        <span class="read-more-link">Ler artigo →</span>
      </div>
    </a>
  `;
}
