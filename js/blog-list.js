/* ================================================================
   BLOG-LIST.JS — Listagem do Blog (async + Supabase)
   ================================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  // Mostra skeleton enquanto carrega
  showGridSkeleton();

  // Busca dados em paralelo
  const [cfg, posts] = await Promise.all([getConfig(), getPosts()]);

  applyConfig(cfg);
  renderPosts(posts, 'all');
  setupFilters(posts);
  setupNavbar();
  setupMobileMenu();
  setupWhatsapp(cfg);
});

function showGridSkeleton() {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;
  grid.innerHTML = Array(3).fill(0).map(() => `
    <div class="post-card" style="pointer-events:none">
      <div class="post-card-cover-placeholder" style="background:var(--surface-high);animation:pulse 1.5s ease-in-out infinite"></div>
      <div class="post-card-body">
        <div style="width:80px;height:20px;background:var(--surface-high);border-radius:99px;animation:pulse 1.5s ease-in-out infinite"></div>
        <div style="width:100%;height:24px;background:var(--surface-high);border-radius:6px;margin-top:.75rem;animation:pulse 1.5s ease-in-out infinite"></div>
        <div style="width:70%;height:24px;background:var(--surface-high);border-radius:6px;margin-top:.5rem;animation:pulse 1.5s ease-in-out infinite"></div>
        <div style="width:100%;height:60px;background:var(--surface-high);border-radius:6px;margin-top:.75rem;animation:pulse 1.5s ease-in-out infinite"></div>
      </div>
    </div>
  `).join('');
}

function applyConfig(cfg) {
  document.querySelectorAll('[data-cta]').forEach(el => {
    if (cfg.ctaUrl && cfg.ctaUrl !== '#') {
      el.href = cfg.ctaUrl;
      el.target = '_blank';
    }
  });

  if (cfg.siteName) {
    document.title = `Blog — ${cfg.siteName}`;
    document.querySelectorAll('[data-site-name]').forEach(el => {
      el.textContent = cfg.siteName;
    });
  }

  // Inject blog hero and CTA fields dynamically
  if (cfg.blogHeroEyebrow) {
    const eyebrow = document.getElementById('blog-hero-eyebrow');
    if (eyebrow) eyebrow.innerHTML = cfg.blogHeroEyebrow;
  }
  if (cfg.blogHeroTitle) {
    const title = document.getElementById('blog-hero-title');
    if (title) title.textContent = cfg.blogHeroTitle;
  }
  if (cfg.blogHeroSub) {
    const sub = document.getElementById('blog-hero-sub');
    if (sub) sub.textContent = cfg.blogHeroSub;
  }
  if (cfg.blogCtaTitle) {
    const ctaTitle = document.getElementById('blog-cta-title');
    if (ctaTitle) ctaTitle.textContent = cfg.blogCtaTitle;
  }
  if (cfg.blogCtaSub) {
    const ctaSub = document.getElementById('blog-cta-sub');
    if (ctaSub) ctaSub.textContent = cfg.blogCtaSub;
  }
  if (cfg.blogCtaBtnText) {
    const ctaBtn = document.getElementById('blog-cta-btn');
    if (ctaBtn) ctaBtn.innerHTML = cfg.blogCtaBtnText;
  }
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
  el.classList.remove('hidden');
}

function setupFilters(posts) {
  const categories = ['Todos', ...new Set(posts.map(p => p.category))];
  const container  = document.getElementById('filter-btns');
  if (!container) return;

  container.innerHTML = '';
  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className   = 'filter-btn' + (i === 0 ? ' active' : '');
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

  // Trigger reveal animation
  if (window.IntersectionObserver) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    grid.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return dateStr; }
}

function postCardHTML(post) {
  const coverSrc     = post.cover || '';
  const coverEl      = coverSrc
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
