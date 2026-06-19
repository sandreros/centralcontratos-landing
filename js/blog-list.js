/* ================================================================
   BLOG-LIST.JS — Listagem do Blog (async + Supabase)
   ================================================================ */

let _cfg = null;

/* ── Helpers AdSense ──────────────────────────────────────────── */

/**
 * Carrega o script do AdSense de forma segura e idempotente.
 */
function loadAdSenseScript(clientId) {
  if (document.querySelector('script[src*="adsbygoogle.js"]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

/**
 * Dispara .push({}) para N blocos do AdSense.
 * Aguarda o script carregar (até 5s) se ainda não estiver disponível.
 */
function pushAdSense(count, context) {
  const doPush = () => {
    for (let i = 0; i < count; i++) {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); }
      catch (e) { console.warn(`[AdSense] ${context} push erro:`, e.message); }
    }
  };
  if (window.adsbygoogle) { doPush(); return; }
  let waited = 0;
  const poll = setInterval(() => {
    waited += 100;
    if (window.adsbygoogle) { clearInterval(poll); doPush(); }
    else if (waited >= 5000) clearInterval(poll);
  }, 100);
}

document.addEventListener('DOMContentLoaded', async () => {
  // Mostra skeleton enquanto carrega
  showGridSkeleton();

  // Busca dados em paralelo
  const [cfg, posts] = await Promise.all([getConfig(), getPosts()]);
  _cfg = cfg;

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
  // Obtém lista de campanhas e verifica se há Google Ads ativo
  let campaigns = [];
  try {
    campaigns = typeof cfg.blogAdCampaigns === 'string' ? JSON.parse(cfg.blogAdCampaigns) : (cfg.blogAdCampaigns || []);
  } catch {
    campaigns = [];
  }

  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - (offset * 60 * 1000));
  const todayStr = localDate.toISOString().split('T')[0];

  const activeValidCampaigns = campaigns.filter(ad => {
    if (!ad.active) return false;
    if (ad.startDate && todayStr < ad.startDate) return false;
    if (ad.endDate && todayStr > ad.endDate) return false;
    return true;
  });

  const hasGoogleAds = activeValidCampaigns.some(ad => ad.type === 'google');
  if (hasGoogleAds && _cfg.googleAdClient) {
    loadAdSenseScript(_cfg.googleAdClient);
  }

  document.querySelectorAll('[data-cta]').forEach(el => {
    if (cfg.ctaUrl && cfg.ctaUrl !== '#') {
      el.href = cfg.ctaUrl;
      el.target = '_blank';
    }
    applyCtaStyle(el, cfg.ctaBgColor, cfg.ctaTextColor, cfg.ctaFormat);
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
    if (ctaBtn) {
      ctaBtn.innerHTML = cfg.blogCtaBtnText;
      const targetUrl = cfg.blogCtaUrl || cfg.ctaUrl || '#';
      ctaBtn.href = targetUrl;
      if (targetUrl !== '#') ctaBtn.target = '_blank';
      applyCtaStyle(ctaBtn, cfg.blogCtaBgColor, cfg.blogCtaTextColor, cfg.blogCtaFormat);
    }
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

  const cardsHtml = filtered.map(post => postCardHTML(post));

  // Inserção programática dos anúncios no grid
  let gridCampaigns = [];
  if (_cfg && _cfg.blogAdCampaigns) {
    try {
      const campaigns = typeof _cfg.blogAdCampaigns === 'string' ? JSON.parse(_cfg.blogAdCampaigns) : (_cfg.blogAdCampaigns || []);
      const d = new Date();
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - (offset * 60 * 1000));
      const todayStr = localDate.toISOString().split('T')[0];

      gridCampaigns = campaigns.filter(ad => {
        if (ad.slot !== 'grid') return false;
        if (!ad.active) return false;
        // Grid da listagem só exibe anúncios direcionados a "todos" (não a artigos específicos)
        if (ad.targetPost && ad.targetPost !== 'all') return false;
        if (ad.startDate && todayStr < ad.startDate) return false;
        if (ad.endDate && todayStr > ad.endDate) return false;
        return true;
      });
      gridCampaigns.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));
    } catch (e) {
      console.error('[Ads] Erro ao filtrar anúncios do grid:', e);
    }
  }

  if (gridCampaigns.length > 0) {
    gridCampaigns.forEach((ad, index) => {
      let adHtml = '';
      if (ad.type === 'custom' && ad.customImg) {
        adHtml = `
          <a href="${ad.customLink || '#'}" target="_blank" rel="noopener noreferrer" class="blog-ad-card reveal">
            <div class="ad-badge">Anúncio</div>
            <img src="${ad.customImg}" alt="${ad.name}" class="ad-img" onerror="this.parentElement.style.display='none'">
          </a>
        `;
      } else if (ad.type === 'google' && _cfg.googleAdClient && ad.googleSlot) {
        adHtml = `
          <div class="google-ad-container reveal" style="text-align:center;overflow:hidden;border:1px solid var(--outline);border-radius:var(--radius-lg);padding:1rem;background:var(--surface-low)">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">Patrocinado</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${_cfg.googleAdClient}"
                 data-ad-slot="${ad.googleSlot}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        `;
      }

      if (adHtml) {
        const insertPosition = 2 + (index * 3);
        if (cardsHtml.length >= insertPosition) {
          cardsHtml.splice(insertPosition, 0, adHtml);
        } else if (index === 0) {
          cardsHtml.push(adHtml);
        }
      }
    });
  }

  grid.innerHTML = cardsHtml.join('');

  // Dispara inserção do AdSense para cada bloco ins inserido (após script carregar)
  const googleAdCount = gridCampaigns.filter(ad => ad.type === 'google').length;
  if (googleAdCount > 0) {
    pushAdSense(googleAdCount, '[Ads Grid]');
  }

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
