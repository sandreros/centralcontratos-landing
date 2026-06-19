/* ================================================================
   BLOG-POST.JS — Post Individual (async + Supabase)
   ================================================================ */

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

/* ── Sanitização de HTML ─────────────────────────────────────── */

/**
 * Sanitiza HTML de post: mantém tags seguras, remove scripts e event handlers.
 * Não depende de DOMPurify — usa o DOM do navegador como parser.
 */
function sanitizePostHtml(html) {
  const ALLOWED_TAGS = new Set([
    'p','br','b','strong','i','em','u','s','del','ins','mark','small','sub','sup',
    'h1','h2','h3','h4','h5','h6',
    'ul','ol','li','dl','dt','dd',
    'blockquote','q','cite','pre','code','kbd','samp',
    'a','img','figure','figcaption','picture','source',
    'table','thead','tbody','tfoot','tr','th','td','caption','colgroup','col',
    'div','span','section','article','aside','header','footer','main','nav',
    'details','summary',
    'hr',
  ]);

  const ALLOWED_ATTRS = new Set([
    'href','src','alt','title','class','id','style',
    'target','rel','width','height','loading','decoding','srcset','sizes',
    'rowspan','colspan','scope','headers',
    'open','type','start','reversed',
  ]);

  // Tags completamente bloqueadas (remove junto com conteúdo)
  const BLOCK_TAGS = new Set(['script','style','iframe','object','embed','applet','form','input','button','textarea','select','base','meta','link','noscript','template']);

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="__root">${html}</div>`, 'text/html');
  const root = doc.getElementById('__root');
  if (!root) return '';

  function walk(node) {
    const toRemove = [];
    node.childNodes.forEach(child => {
      if (child.nodeType === Node.COMMENT_NODE) {
        toRemove.push(child);
        return;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) return;

      const tag = child.tagName.toLowerCase();

      if (BLOCK_TAGS.has(tag)) {
        toRemove.push(child);
        return;
      }

      if (!ALLOWED_TAGS.has(tag)) {
        // Substitui a tag pelo conteúdo (unwrap)
        while (child.firstChild) child.parentNode.insertBefore(child.firstChild, child);
        toRemove.push(child);
        return;
      }

      // Remove atributos não permitidos e event handlers (on*)
      const attrsToRemove = [];
      Array.from(child.attributes).forEach(attr => {
        const name = attr.name.toLowerCase();
        if (name.startsWith('on') || !ALLOWED_ATTRS.has(name)) {
          attrsToRemove.push(attr.name);
        }
      });
      attrsToRemove.forEach(a => child.removeAttribute(a));

      // Força rel seguro em links externos
      if (tag === 'a') {
        if (child.getAttribute('target') === '_blank') {
          child.setAttribute('rel', 'noopener noreferrer');
        }
        const href = child.getAttribute('href') || '';
        // Bloqueia javascript: URIs
        if (/^javascript:/i.test(href.trim())) child.removeAttribute('href');
      }

      // Bloqueia data: URIs em src (exceto data: legítimos de imagem — não necessário aqui)
      if (tag === 'img') {
        const src = child.getAttribute('src') || '';
        if (/^javascript:/i.test(src.trim())) child.removeAttribute('src');
      }

      walk(child);
    });
    toRemove.forEach(n => { if (n.parentNode) n.parentNode.removeChild(n); });
  }

  walk(root);
  return root.innerHTML;
}

/* ── Init ────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', async () => {
  setupNavbar();
  setupMobileMenu();

  const slug = new URLSearchParams(window.location.search).get('slug');
  if (!slug) { window.location.href = 'index.html'; return; }

  // Busca config e post em paralelo
  const [cfg, post] = await Promise.all([getConfig(), getPostBySlug(slug)]);

  setupWhatsapp(cfg);
  applyCTA(cfg);
  applyPromoCTAs(cfg);

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

  applyBranding(cfg);
  renderPost(post, cfg);
  updateMeta(post, cfg);
  renderSidebar(post);
  applyAds(cfg, slug);
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
  el.classList.remove('hidden');
}

function applyCTA(cfg) {
  document.querySelectorAll('[data-cta]').forEach(el => {
    if (cfg.ctaUrl && cfg.ctaUrl !== '#') {
      el.href = cfg.ctaUrl;
      el.target = '_blank';
    }
    applyCtaStyle(el, cfg.ctaBgColor, cfg.ctaTextColor, cfg.ctaFormat);
  });
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return dateStr; }
}

function renderPost(post, cfg) {
  // Hero
  const catEl = document.getElementById('post-category');
  catEl.textContent        = post.category;
  catEl.style.background   = post.categoryColor || 'var(--primary)';
  document.getElementById('post-title').textContent     = post.title;
  document.getElementById('post-date').textContent      = formatDate(post.date);
  document.getElementById('post-read-time').textContent = post.readTime;
  document.getElementById('post-author').textContent    = post.author;

  // Cover
  const coverEl = document.getElementById('post-cover');
  if (post.cover) {
    coverEl.src    = post.cover;
    coverEl.alt    = post.title;
    coverEl.onerror = () => { coverEl.style.display = 'none'; };
  } else {
    coverEl.style.display = 'none';
  }

  // Content — sanitizado contra XSS
  document.getElementById('post-body').innerHTML = sanitizePostHtml(post.content || '');
}

async function renderSidebar(currentPost) {
  const posts  = await getPosts();
  const recent = posts.filter(p => p.slug !== currentPost.slug).slice(0, 4);

  const recentContainer = document.getElementById('recent-posts');
  if (!recentContainer) return;

  recentContainer.innerHTML = recent.length
    ? recent.map(p => `
      <a href="post.html?slug=${p.slug}" class="recent-post-item" style="text-decoration:none;display:flex;gap:.875rem;align-items:flex-start;padding:.75rem 0;border-bottom:1px solid var(--surface-high)">
        <div class="recent-post-img" style="${p.cover ? '' : 'background:var(--surface-low)'}">
          ${p.cover
            ? `<img src="${p.cover}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.parentElement.textContent='📄'">`
            : '📄'}
        </div>
        <div>
          <div class="recent-post-title" style="font-size:.875rem;font-weight:600;color:var(--text);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${p.title}</div>
          <div class="recent-post-date" style="font-size:.75rem;color:var(--text-muted);margin-top:.25rem">${formatDate(p.date)}</div>
        </div>
      </a>
    `).join('')
    : '<p style="font-size:.9rem;color:var(--text-muted)">Nenhum outro post disponível ainda.</p>';
}

function updateMeta(post, cfg) {
  const siteName = cfg && cfg.siteName ? cfg.siteName : 'Central de Contratos';
  document.title = `${post.title} — ${siteName}`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = post.excerpt;

  // Open Graph metadata
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = post.title;

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = post.excerpt;

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && post.cover) {
    let coverUrl = post.cover;
    if (!coverUrl.startsWith('http') && !coverUrl.startsWith('//')) {
      if (coverUrl.startsWith('../')) {
        coverUrl = window.location.origin + '/' + coverUrl.replace(/^\.\.\//, '');
      } else {
        coverUrl = window.location.origin + '/' + coverUrl.replace(/^\//, '');
      }
    }
    ogImage.content = coverUrl;
  }
}

function applyBranding(cfg) {
  if (cfg.siteName) {
    document.querySelectorAll('[data-site-name]').forEach(el => {
      el.textContent = cfg.siteName;
    });
  }
}

function applyPromoCTAs(cfg) {
  // Inline CTA
  const inlineTitle = document.getElementById('post-inline-cta-title');
  if (inlineTitle && cfg.postInlineCtaTitle) inlineTitle.textContent = cfg.postInlineCtaTitle;

  const inlineSub = document.getElementById('post-inline-cta-sub');
  if (inlineSub && cfg.postInlineCtaSub) inlineSub.textContent = cfg.postInlineCtaSub;

  const inlineBtn = document.getElementById('post-inline-cta-btn');
  if (inlineBtn && cfg.postInlineCtaBtnText) {
    inlineBtn.innerHTML = cfg.postInlineCtaBtnText;
    const targetUrl = cfg.postInlineCtaUrl || cfg.ctaUrl || '#';
    inlineBtn.href = targetUrl;
    if (targetUrl !== '#') inlineBtn.target = '_blank';
    applyCtaStyle(inlineBtn, cfg.postInlineCtaBgColor, cfg.postInlineCtaTextColor, cfg.postInlineCtaFormat);
  }

  // Sidebar CTA
  const sidebarTitle = document.getElementById('post-sidebar-cta-title');
  if (sidebarTitle && cfg.postSidebarCtaTitle) sidebarTitle.textContent = cfg.postSidebarCtaTitle;

  const sidebarSub = document.getElementById('post-sidebar-cta-sub');
  if (sidebarSub && cfg.postSidebarCtaSub) sidebarSub.textContent = cfg.postSidebarCtaSub;

  const sidebarBtn = document.getElementById('post-sidebar-cta-btn');
  if (sidebarBtn && cfg.postSidebarCtaBtnText) {
    sidebarBtn.innerHTML = cfg.postSidebarCtaBtnText;
    const targetUrl = cfg.postSidebarCtaUrl || cfg.ctaUrl || '#';
    sidebarBtn.href = targetUrl;
    if (targetUrl !== '#') sidebarBtn.target = '_blank';
    applyCtaStyle(sidebarBtn, cfg.postSidebarCtaBgColor, cfg.postSidebarCtaTextColor, cfg.postSidebarCtaFormat);
  }
}

function applyAds(cfg, slug) {
  let campaigns = [];
  try {
    campaigns = typeof cfg.blogAdCampaigns === 'string' ? JSON.parse(cfg.blogAdCampaigns) : (cfg.blogAdCampaigns || []);
  } catch {
    campaigns = [];
  }

  const d = new Date();
  const tzOffset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - (tzOffset * 60 * 1000));
  const todayStr = localDate.toISOString().split('T')[0];

  // Filtra as válidas e direcionadas a este post (ou a todos)
  const activeValid = campaigns.filter(ad => {
    if (!ad.active) return false;
    if (ad.startDate && todayStr < ad.startDate) return false;
    if (ad.endDate && todayStr > ad.endDate) return false;
    // Segmentação por post: 'all' ou ausente = todos; valor específico = só naquele slug
    if (ad.targetPost && ad.targetPost !== 'all' && ad.targetPost !== slug) return false;
    return true;
  });

  // Carrega o script do AdSense se houver algum anúncio Google ativo
  const hasGoogleAds = activeValid.some(ad => ad.type === 'google');
  if (hasGoogleAds && cfg.googleAdClient) {
    loadAdSenseScript(cfg.googleAdClient);
  }

  // Filtra por slots e ordena por sortOrder
  const sidebarAds = activeValid.filter(ad => ad.slot === 'sidebar');
  sidebarAds.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  const inlineAds = activeValid.filter(ad => ad.slot === 'inline');
  inlineAds.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  // ── Sidebar Ads: exibe TODOS os anúncios válidos empilhados ──────
  const sidebarAdEl = document.getElementById('post-sidebar-ad');
  if (sidebarAdEl && sidebarAds.length > 0) {
    sidebarAdEl.style.display = 'block';
    let sidebarHtml = '';
    let sidebarGoogleCount = 0;

    sidebarAds.forEach(ad => {
      if (ad.type === 'custom' && ad.customImg) {
        sidebarHtml += `
          <a href="${ad.customLink || '#'}" target="_blank" rel="noopener noreferrer" class="sidebar-ad-card" style="display:block;margin-bottom:1rem">
            <div class="ad-badge">Anúncio</div>
            <img src="${ad.customImg}" alt="${ad.name}" onerror="this.style.display='none'">
          </a>
        `;
      } else if (ad.type === 'google' && cfg.googleAdClient && ad.googleSlot) {
        sidebarHtml += `
          <div class="google-ad-container" style="text-align:center;overflow:hidden;border:1px solid var(--outline);border-radius:var(--radius-lg);padding:1rem;background:var(--surface-low);margin-bottom:1rem">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">Patrocinado</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${cfg.googleAdClient}"
                 data-ad-slot="${ad.googleSlot}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        `;
        sidebarGoogleCount++;
      }
    });

    sidebarAdEl.innerHTML = sidebarHtml;
    if (sidebarGoogleCount > 0) pushAdSense(sidebarGoogleCount, '[Ads Sidebar]');
  }

  // ── Inline Article Ads: distribui sequencialmente a cada 3 parágrafos ──
  const bodyEl = document.getElementById('post-body');
  if (bodyEl && inlineAds.length > 0) {

    // Monta o HTML de cada anúncio
    const adHtmlList = [];
    inlineAds.forEach(ad => {
      if (ad.type === 'custom' && ad.customImg) {
        adHtmlList.push(`
          <a href="${ad.customLink || '#'}" target="_blank" rel="noopener noreferrer" class="inline-ad-card" style="display:block;margin:2rem 0;">
            <div class="ad-badge">Anúncio</div>
            <img src="${ad.customImg}" alt="${ad.name}" style="width:100%;height:auto;display:block" onerror="this.style.display='none'">
          </a>
        `);
      } else if (ad.type === 'google' && cfg.googleAdClient && ad.googleSlot) {
        adHtmlList.push(`
          <div class="google-ad-container" style="text-align:center;margin:2rem 0;overflow:hidden;border:1px solid var(--outline);border-radius:var(--radius-lg);padding:1rem;background:var(--surface-low)">
            <div style="font-size:10px;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">Patrocinado</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${cfg.googleAdClient}"
                 data-ad-slot="${ad.googleSlot}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        `);
      }
    });

    if (adHtmlList.length > 0) {
      // Usa DOMParser para manipular o conteúdo como DOM real (não string split)
      const parser = new DOMParser();
      const doc = parser.parseFromString('<div id="root">' + bodyEl.innerHTML + '</div>', 'text/html');
      const root = doc.getElementById('root');
      const paragraphs = Array.from(root.querySelectorAll('p'));

      // Anúncio 1 → após o 3º parágrafo (índice 2)
      // Anúncio 2 → após o 6º parágrafo (índice 5)
      // Anúncio 3 → após o 9º parágrafo (índice 8) ... etc.
      let inlineGoogleCount = 0;
      adHtmlList.forEach((html, idx) => {
        const targetParaIdx = 2 + (idx * 3);
        const targetPara = paragraphs[targetParaIdx];
        const wrapper = doc.createElement('div');
        wrapper.innerHTML = html.trim();
        const node = wrapper.firstElementChild;
        if (!node) return;

        if (targetPara && targetPara.parentNode) {
          targetPara.parentNode.insertBefore(node, targetPara.nextSibling);
        } else {
          root.appendChild(node);
        }

        if (html.includes('adsbygoogle')) inlineGoogleCount++;
      });

      // Serializa de volta para o DOM real da página
      bodyEl.innerHTML = root.innerHTML;

      // Dispara o AdSense para cada bloco inline inserido
      if (inlineGoogleCount > 0) pushAdSense(inlineGoogleCount, '[Ads Inline]');
    }
  }
}
