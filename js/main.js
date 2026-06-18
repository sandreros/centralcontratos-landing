/* ================================================================
   MAIN.JS — Landing Page (async + Supabase)
   ================================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  // Busca config do Supabase
  const cfg = await getConfig();

  // ── Render all dynamic CMS sections ────────────────────────────
  renderHero(cfg);
  renderHowWorks(cfg);
  renderBenefits(cfg);
  renderDocs(cfg);
  renderPricing(cfg);
  renderTestimonials(cfg);
  renderFAQ(cfg);

  // ── Apply config ───────────────────────────────────────────────
  applyCTAs(cfg);
  applyWhatsApp(cfg);
  applyFooterEmail(cfg);
  applyBranding(cfg);
  applyCopyright(cfg);

  // ── Navbar scroll effect ───────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', mobileNav.classList.contains('open'));
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // ── Smooth scroll for anchor links ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll reveal ──────────────────────────────────────────────
  setupReveal();

  // ── Counter animation ──────────────────────────────────────────
  setupCounters();

  // ── Footer year ────────────────────────────────────────────────
  const yrEl = document.getElementById('footer-year');
  if (yrEl) yrEl.textContent = new Date().getFullYear();
});

function renderHero(cfg) {
  const badgeEl = document.getElementById('hero-badge');
  if (badgeEl && cfg.heroBadge) {
    badgeEl.innerHTML = `<span>⚡</span> ${cfg.heroBadge.replace(/^⚡\s*/, '')}`;
  }
  const headlineEl = document.getElementById('hero-headline');
  if (headlineEl && cfg.heroHeadline) {
    headlineEl.textContent = cfg.heroHeadline;
  }
  const subEl = document.getElementById('hero-sub');
  if (subEl && cfg.heroSub) {
    subEl.textContent = cfg.heroSub;
  }
  const secCtaEl = document.getElementById('hero-sec-cta');
  if (secCtaEl && cfg.heroSecCtaText) {
    secCtaEl.textContent = cfg.heroSecCtaText;
  }
  
  const statsContainer = document.getElementById('hero-stats-container');
  if (statsContainer) {
    let stats = [];
    try {
      stats = typeof cfg.heroStats === 'string' ? JSON.parse(cfg.heroStats) : (cfg.heroStats || []);
    } catch {
      stats = [];
    }
    if (stats.length > 0) {
      statsContainer.innerHTML = stats.map(stat => `
        <div>
          <div class="hero-stat-value" data-counter="${stat.value}" data-suffix="${stat.suffix || ''}">0</div>
          <div class="hero-stat-label">${stat.label}</div>
        </div>
      `).join('');
    }
  }
}

function renderHowWorks(cfg) {
  let data = {};
  try {
    data = typeof cfg.sectionHowWorks === 'string' ? JSON.parse(cfg.sectionHowWorks) : (cfg.sectionHowWorks || {});
  } catch {
    return;
  }

  const eyebrow = document.getElementById('how-eyebrow');
  if (eyebrow && data.eyebrow) eyebrow.textContent = data.eyebrow;

  const title = document.getElementById('how-title');
  if (title && data.title) title.textContent = data.title;

  const desc = document.getElementById('how-desc');
  if (desc && data.desc) desc.textContent = data.desc;

  const grid = document.getElementById('how-grid');
  if (grid && data.steps) {
    grid.innerHTML = data.steps.map((step, idx) => `
      <div class="step-card reveal reveal-delay-${idx + 1}">
        <div class="step-number">${idx + 1}</div>
        <div class="step-icon">${step.icon}</div>
        <h3>${step.title}</h3>
        <p>${step.desc}</p>
      </div>
    `).join('');
  }
}

function renderBenefits(cfg) {
  let data = {};
  try {
    data = typeof cfg.sectionBenefits === 'string' ? JSON.parse(cfg.sectionBenefits) : (cfg.sectionBenefits || {});
  } catch {
    return;
  }

  const eyebrow = document.getElementById('benefits-eyebrow');
  if (eyebrow && data.eyebrow) eyebrow.textContent = data.eyebrow;

  const title = document.getElementById('benefits-title');
  if (title && data.title) title.textContent = data.title;

  const desc = document.getElementById('benefits-desc');
  if (desc && data.desc) desc.textContent = data.desc;

  const grid = document.getElementById('benefits-grid');
  if (grid && data.features) {
    grid.innerHTML = data.features.map((feat, idx) => `
      <div class="feature-card reveal reveal-delay-${(idx % 3) + 1}">
        <div class="feature-icon-wrap" style="background:rgba(255,255,255,0.06)">
          <span>${feat.icon}</span>
        </div>
        <h4>${feat.title}</h4>
        <p>${feat.desc}</p>
      </div>
    `).join('');
  }
}

function renderDocs(cfg) {
  let data = {};
  try {
    data = typeof cfg.sectionDocs === 'string' ? JSON.parse(cfg.sectionDocs) : (cfg.sectionDocs || {});
  } catch {
    return;
  }

  const eyebrow = document.getElementById('docs-eyebrow');
  if (eyebrow && data.eyebrow) eyebrow.textContent = data.eyebrow;

  const title = document.getElementById('docs-title');
  if (title && data.title) title.textContent = data.title;

  const desc = document.getElementById('docs-desc');
  if (desc && data.desc) desc.textContent = data.desc;

  const grid = document.getElementById('docs-grid');
  if (grid && data.docs) {
    grid.innerHTML = data.docs.map((doc, idx) => `
      <div class="doc-type-card reveal reveal-delay-${(idx % 4) + 1}">
        <div class="doc-type-emoji">${doc.emoji}</div>
        <span>${doc.name}</span>
      </div>
    `).join('');
  }
}

function renderPricing(cfg) {
  const grid = document.getElementById('pricing-grid');
  if (!grid) return;

  let plans = [];
  try {
    plans = typeof cfg.pricingPlans === 'string' ? JSON.parse(cfg.pricingPlans) : (cfg.pricingPlans || []);
  } catch {
    plans = [];
  }

  if (plans.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">Nenhum plano disponível no momento.</p>`;
    return;
  }

  plans.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  grid.innerHTML = plans.map((plan, idx) => {
    const isPopular = plan.popular === true;
    const cardClass = isPopular ? 'pricing-card popular reveal reveal-delay-2' : `pricing-card reveal reveal-delay-${(idx % 3) + 1}`;
    const btnClass = isPopular ? 'btn btn-accent pricing-cta' : 'btn btn-primary pricing-cta';
    const badgeHtml = isPopular ? '<div class="pricing-badge">Mais Popular</div>' : '';
    
    const featuresHtml = (plan.features || []).map(feat => `<li>${feat}</li>`).join('');

    return `
      <div class="${cardClass}">
        ${badgeHtml}
        <h3 class="pricing-title">${plan.name}</h3>
        <p class="pricing-desc">${plan.desc}</p>
        <div class="pricing-price-wrap">
          <span class="pricing-currency">R$</span>
          <span class="pricing-price">${plan.price}</span>
        </div>
        <p class="pricing-period">${plan.period || 'pago único'}</p>
        <ul class="pricing-features">
          ${featuresHtml}
        </ul>
        <a href="${plan.ctaUrl || '#'}" class="${btnClass}">${plan.ctaText || 'Assinar'}</a>
      </div>
    `;
  }).join('');
}

function renderTestimonials(cfg) {
  let data = {};
  try {
    data = typeof cfg.sectionTestimonials === 'string' ? JSON.parse(cfg.sectionTestimonials) : (cfg.sectionTestimonials || {});
  } catch {
    return;
  }

  const eyebrow = document.getElementById('testimonials-eyebrow');
  if (eyebrow && data.eyebrow) eyebrow.textContent = data.eyebrow;

  const title = document.getElementById('testimonials-title');
  if (title && data.title) title.textContent = data.title;

  const desc = document.getElementById('testimonials-desc');
  if (desc && data.desc) desc.textContent = data.desc;

  const grid = document.getElementById('testimonials-grid');
  if (grid && data.testimonials) {
    grid.innerHTML = data.testimonials.map((test, idx) => `
      <div class="testimonial-card reveal reveal-delay-${(idx % 3) + 1}">
        <div class="testimonial-stars">${test.stars || '★★★★★'}</div>
        <p class="testimonial-text">${test.text}</p>
        <div class="testimonial-author">
          <div class="author-avatar" style="background:linear-gradient(135deg, var(--primary), var(--primary-light))">${test.avatar}</div>
          <div>
            <div class="author-name">${test.name}</div>
            <div class="author-role">${test.role}</div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function renderFAQ(cfg) {
  let data = {};
  try {
    data = typeof cfg.sectionFaq === 'string' ? JSON.parse(cfg.sectionFaq) : (cfg.sectionFaq || {});
  } catch {
    return;
  }

  const eyebrow = document.getElementById('faq-eyebrow');
  if (eyebrow && data.eyebrow) eyebrow.textContent = data.eyebrow;

  const title = document.getElementById('faq-title');
  if (title && data.title) title.textContent = data.title;

  const desc = document.getElementById('faq-desc');
  if (desc && data.desc) desc.textContent = data.desc;

  const list = document.getElementById('faq-list');
  if (list && data.faqs) {
    list.innerHTML = data.faqs.map((faq) => `
      <div class="faq-item reveal" role="listitem">
        <button class="faq-question">
          <span>${faq.q}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
  }
  
  setupFaqAccordion();
}

function setupFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    if (btn.dataset.faqAttached) return;
    btn.dataset.faqAttached = 'true';

    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

function applyCTAs(cfg) {
  document.querySelectorAll('[data-cta]').forEach(el => {
    const url = cfg.ctaUrl && cfg.ctaUrl !== '#' ? cfg.ctaUrl : '#';
    if (el.tagName === 'A') {
      el.href = url;
      if (url !== '#') el.target = '_blank';
    }
  });
  document.querySelectorAll('[data-cta-text]').forEach(el => {
    if (cfg.ctaText) el.textContent = cfg.ctaText;
  });
}

function applyWhatsApp(cfg) {
  const waFloat = document.getElementById('wa-float');
  if (!waFloat) return;

  if (!cfg.whatsapp || !cfg.showWhatsappFloat) {
    waFloat.classList.add('hidden');
    return;
  }

  const msg = encodeURIComponent('Olá! Tenho interesse na Central de Contratos. Pode me ajudar?');
  waFloat.href = `https://wa.me/${cfg.whatsapp}?text=${msg}`;
  waFloat.classList.remove('hidden');
}

function applyFooterEmail(cfg) {
  const emailEl = document.getElementById('footer-email');
  if (!emailEl) return;
  if (cfg.contactEmail) {
    emailEl.href        = 'mailto:' + cfg.contactEmail;
    emailEl.textContent = cfg.contactEmail;
  }
}

function setupReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!window.IntersectionObserver) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

function setupCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target   = parseInt(el.getAttribute('data-counter'));
    const suffix   = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    let start = null;

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();

      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target).toLocaleString('pt-BR') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });

    obs.observe(el);
  });
}

function applyBranding(cfg) {
  if (cfg.siteName) {
    document.title = `${cfg.siteName} — ${cfg.tagline || 'Documentos Jurídicos em Minutos'}`;
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${cfg.siteName} — ${cfg.tagline || 'Documentos Jurídicos em Minutos'}`;
    
    document.querySelectorAll('[data-site-name]').forEach(el => {
      el.textContent = cfg.siteName;
    });
  }
  
  if (cfg.logoUrl) {
    document.querySelectorAll('.nav-logo img, .footer-brand-logo img').forEach(img => {
      img.src = cfg.logoUrl;
      img.style.display = 'block';
    });
  }
  
  if (cfg.siteDescription) {
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = cfg.siteDescription;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = cfg.siteDescription;
    
    document.querySelectorAll('[data-site-description]').forEach(el => {
      el.textContent = cfg.siteDescription;
    });
  }
}

function applyCopyright(cfg) {
  const copyrightEl = document.querySelector('#footer-copyright p:first-child');
  if (copyrightEl && cfg.copyrightText) {
    let text = cfg.copyrightText;
    if (text.includes('{{year}}')) {
      text = text.replace('{{year}}', new Date().getFullYear());
    }
    copyrightEl.innerHTML = text.replace('Central de Contratos', `<span data-site-name>${cfg.siteName || 'Central de Contratos'}</span>`);
    const yrEl = copyrightEl.querySelector('#footer-year');
    if (yrEl) yrEl.textContent = new Date().getFullYear();
  }
}
