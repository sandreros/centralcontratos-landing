/* ===========================
   BLOG-POST.JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = getConfig();
  const slug = new URLSearchParams(window.location.search).get('slug');

  setupNavbar();
  setupMobileMenu();
  setupWhatsapp(cfg);

  if (!slug) { window.location.href = 'index.html'; return; }

  const post = getPostBySlug(slug);
  if (!post) {
    document.getElementById('post-container').innerHTML = `
      <div style="text-align:center;padding:6rem 2rem">
        <div style="font-size:4rem;margin-bottom:1rem">😕</div>
        <h2>Post não encontrado</h2>
        <p style="color:var(--text-muted);margin:1rem 0 2rem">Este artigo não existe ou foi removido.</p>
        <a href="index.html" class="btn btn-primary">← Voltar ao Blog</a>
      </div>`;
    return;
  }

  renderPost(post, cfg);
  renderSidebar(post);
  updateMeta(post);
  applyCTA(cfg);
});

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

function applyCTA(cfg) {
  document.querySelectorAll('[data-cta]').forEach(el => {
    if (cfg.ctaUrl && cfg.ctaUrl !== '#') {
      el.href = cfg.ctaUrl;
      el.target = '_blank';
    }
  });
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return dateStr; }
}

function renderPost(post, cfg) {
  // Hero
  document.getElementById('post-category').textContent = post.category;
  document.getElementById('post-category').style.background = post.categoryColor || 'var(--primary)';
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-date').textContent = formatDate(post.date);
  document.getElementById('post-read-time').textContent = post.readTime;
  document.getElementById('post-author').textContent = post.author;

  // Cover
  const coverEl = document.getElementById('post-cover');
  if (post.cover) {
    coverEl.src = post.cover.replace('../', '');
    coverEl.alt = post.title;
    coverEl.onerror = () => { coverEl.style.display = 'none'; };
  } else {
    coverEl.style.display = 'none';
  }

  // Content
  document.getElementById('post-body').innerHTML = post.content || '';
}

function renderSidebar(currentPost) {
  const posts = getPosts();

  // Recent posts
  const recent = posts.filter(p => p.slug !== currentPost.slug).slice(0, 4);
  const recentContainer = document.getElementById('recent-posts');
  if (recentContainer) {
    recentContainer.innerHTML = recent.length ? recent.map(p => `
      <a href="post.html?slug=${p.slug}" class="recent-post-item" style="text-decoration:none;display:flex;gap:.875rem;align-items:flex-start;padding:.75rem 0;border-bottom:1px solid var(--surface-high)">
        <div class="recent-post-img" style="${p.cover ? '' : 'background:var(--surface-low)'}">
          ${p.cover ? `<img src="${p.cover.replace('../', '')}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.parentElement.textContent='📄'">` : '📄'}
        </div>
        <div>
          <div class="recent-post-title" style="font-size:.875rem;font-weight:600;color:var(--text);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.title}</div>
          <div class="recent-post-date" style="font-size:.75rem;color:var(--text-muted);margin-top:.25rem">${formatDate(p.date)}</div>
        </div>
      </a>
    `).join('') : '<p style="font-size:.9rem;color:var(--text-muted)">Nenhum outro post disponível ainda.</p>';
  }
}

function updateMeta(post) {
  document.title = `${post.title} — Central de Contratos`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = post.excerpt;
}
