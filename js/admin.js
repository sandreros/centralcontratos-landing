/* ================================================================
   ADMIN.JS — Painel Administrativo Completo com Supabase Auth & CMS
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
});

let _plansList = []; // Array em memória para gerenciamento de planos
let _editingPlanId = null; // ID do plano em edição (null = novo)

/* ── Auth ──────────────────────────────────────────────────────── */

async function initAuth() {
  showLoading(true);
  const session = await sbGetSession();
  showLoading(false);

  if (session) {
    showPanel();
  } else {
    showLogin();
  }
}

function showLogin() {
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-main').style.display  = 'none';
  document.getElementById('admin-loading').style.display = 'none';

  document.getElementById('login-form').addEventListener('submit', handleLogin, { once: true });
}

async function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl  = document.getElementById('login-error');
  const btn      = document.getElementById('btn-login');

  errorEl.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Entrando...';

  const { error } = await sbSignIn(email, password);

  btn.disabled = false;
  btn.textContent = 'Entrar →';

  if (error) {
    errorEl.textContent = 'E-mail ou senha incorretos. Tente novamente.';
    errorEl.style.display = 'block';
    document.getElementById('login-form').addEventListener('submit', handleLogin, { once: true });
    return;
  }

  showPanel();
}

async function handleLogout() {
  await sbSignOut();
  location.reload();
}

function showPanel() {
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-loading').style.display = 'none';
  document.getElementById('admin-main').style.display  = 'flex';
  initPanel();
}

function showLoading(show) {
  const loading = document.getElementById('admin-loading');
  const login   = document.getElementById('admin-login');
  const main    = document.getElementById('admin-main');
  if (show) {
    loading.style.display = 'flex';
    login.style.display   = 'none';
    main.style.display    = 'none';
  } else {
    loading.style.display = 'none';
  }
}


/* ── Panel Init ────────────────────────────────────────────────── */

async function initPanel() {
  setupNavItems();
  document.getElementById('btn-logout').addEventListener('click', handleLogout);
  document.getElementById('btn-download-sitemap').addEventListener('click', downloadSitemap);

  // Formulários Submit
  document.getElementById('general-form').addEventListener('submit', saveGeneralForm);
  document.getElementById('cms-home-form').addEventListener('submit', saveCmsHomeForm);
  document.getElementById('cms-blog-form').addEventListener('submit', saveCmsBlogForm);

  // Modais de Planos
  document.getElementById('btn-new-plan').addEventListener('click', () => openPlanModal(null));
  document.getElementById('btn-close-plan-modal').addEventListener('click', closePlanModal);
  document.getElementById('btn-cancel-plan-modal').addEventListener('click', closePlanModal);
  document.getElementById('plan-modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('plan-modal-overlay')) closePlanModal();
  });
  document.getElementById('plan-form').addEventListener('submit', savePlan);

  // Modais de Posts
  document.getElementById('btn-new-post').addEventListener('click', () => openPostModal(null));
  document.getElementById('btn-close-modal').addEventListener('click', closePostModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) closePostModal();
  });
  document.getElementById('post-form').addEventListener('submit', savePost);

  // Carga inicial dos dados de forma assíncrona
  showLoading(true);
  await Promise.all([
    loadGeneralForm(),
    loadCmsHomeForm(),
    loadPlans(),
    loadCmsBlogForm(),
    loadPosts()
  ]);
  showLoading(false);
}

function setupNavItems() {
  document.querySelectorAll('.admin-nav-item[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.section).classList.add('active');
    });
  });
}


/* ── 1. CONFIGURAÇÕES GERAIS ── */

async function loadGeneralForm() {
  const cfg = await getConfig();
  document.getElementById('cfg-site-name').value  = cfg.siteName || '';
  document.getElementById('cfg-tagline').value    = cfg.tagline || '';
  document.getElementById('cfg-logo-url').value   = cfg.logoUrl || '';
  document.getElementById('cfg-site-description').value = cfg.siteDescription || '';
  document.getElementById('cfg-cta-url').value    = cfg.ctaUrl || '';
  document.getElementById('cfg-cta-text').value   = cfg.ctaText || '';
  document.getElementById('cfg-whatsapp').value   = cfg.whatsapp || '';
  document.getElementById('cfg-wa-float').checked = cfg.showWhatsappFloat !== false;
  document.getElementById('cfg-email').value      = cfg.contactEmail || '';
  document.getElementById('cfg-privacy-policy').value   = cfg.privacyPolicy || '';
  document.getElementById('cfg-deploy-webhook').value = cfg.deployWebhook || '';
}

async function saveGeneralForm(e) {
  e.preventDefault();
  const btn = e.submitter || document.querySelector('#general-form [type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const updated = {
    siteName:         document.getElementById('cfg-site-name').value.trim(),
    tagline:          document.getElementById('cfg-tagline').value.trim(),
    logoUrl:          document.getElementById('cfg-logo-url').value.trim(),
    siteDescription:  document.getElementById('cfg-site-description').value.trim(),
    ctaUrl:           document.getElementById('cfg-cta-url').value.trim(),
    ctaText:          document.getElementById('cfg-cta-text').value.trim(),
    whatsapp:         document.getElementById('cfg-whatsapp').value.trim().replace(/\D/g, ''),
    showWhatsappFloat: document.getElementById('cfg-wa-float').checked,
    contactEmail:     document.getElementById('cfg-email').value.trim(),
    privacyPolicy:    document.getElementById('cfg-privacy-policy').value.trim(),
    deployWebhook:    document.getElementById('cfg-deploy-webhook').value.trim(),
  };

  try {
    await saveConfig(updated);
    clearConfigCache();
    triggerDeployWebhook();
    showToast('✅ Configurações gerais salvas!', 'success');
  } catch (err) {
    showToast('❌ Erro ao salvar: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}


/* ── 2. SEÇÕES DA HOME (CMS) ── */

async function loadCmsHomeForm() {
  const cfg = await getConfig();

  // Campos simples do Hero
  document.getElementById('cfg-hero-badge').value = cfg.heroBadge || '';
  document.getElementById('cfg-hero-headline').value = cfg.heroHeadline || '';
  document.getElementById('cfg-hero-sub').value = cfg.heroSub || '';
  document.getElementById('cfg-hero-sec-cta-text').value = cfg.heroSecCtaText || '';

  // Rodapé & Copyright
  document.getElementById('cfg-footer-desc').value = cfg.footerDesc || '';
  document.getElementById('cfg-copyright-text').value = cfg.copyrightText || '';

  // Campos simples de outras seções
  const how = parseJson(cfg.sectionHowWorks, {});
  document.getElementById('cfg-how-eyebrow').value = how.eyebrow || '';
  document.getElementById('cfg-how-title').value = how.title || '';
  document.getElementById('cfg-how-desc').value = how.desc || '';

  const benefits = parseJson(cfg.sectionBenefits, {});
  document.getElementById('cfg-benefits-eyebrow').value = benefits.eyebrow || '';
  document.getElementById('cfg-benefits-title').value = benefits.title || '';
  document.getElementById('cfg-benefits-desc').value = benefits.desc || '';

  const docs = parseJson(cfg.sectionDocs, {});
  document.getElementById('cfg-docs-eyebrow').value = docs.eyebrow || '';
  document.getElementById('cfg-docs-title').value = docs.title || '';
  document.getElementById('cfg-docs-desc').value = docs.desc || '';

  const tests = parseJson(cfg.sectionTestimonials, {});
  document.getElementById('cfg-test-eyebrow').value = tests.eyebrow || '';
  document.getElementById('cfg-test-title').value = tests.title || '';
  document.getElementById('cfg-test-desc').value = tests.desc || '';

  const faq = parseJson(cfg.sectionFaq, {});
  document.getElementById('cfg-faq-eyebrow').value = faq.eyebrow || '';
  document.getElementById('cfg-faq-title').value = faq.title || '';
  document.getElementById('cfg-faq-desc').value = faq.desc || '';

  // Injeção de editores de listas
  renderStatsEditor(parseJson(cfg.heroStats, []));
  renderStepsEditor(how.steps || []);
  renderBenefitsEditor(benefits.features || []);
  renderDocsEditor(docs.docs || []);
  renderTestimonialsEditor(tests.testimonials || []);
  renderFaqEditor(faq.faqs || []);
}

function parseJson(str, fallback) {
  try {
    return typeof str === 'string' ? JSON.parse(str) : str;
  } catch { return fallback; }
}

// Renderizadores do CMS

function renderStatsEditor(stats) {
  const container = document.getElementById('stats-editor');
  container.innerHTML = stats.map((stat, idx) => `
    <div class="cms-item-card cms-grid-3" data-idx="${idx}">
      <div class="form-group">
        <label class="form-label" style="font-size:0.75rem">Valor</label>
        <input type="number" class="form-input stat-value" value="${stat.value}">
      </div>
      <div class="form-group">
        <label class="form-label" style="font-size:0.75rem">Rótulo / Descrição</label>
        <input type="text" class="form-input stat-label" value="${stat.label}">
      </div>
      <div class="form-group">
        <label class="form-label" style="font-size:0.75rem">Sufixo</label>
        <input type="text" class="form-input stat-suffix" value="${stat.suffix}">
      </div>
    </div>
  `).join('');
}

function renderStepsEditor(steps) {
  const container = document.getElementById('steps-editor');
  container.innerHTML = steps.map((step, idx) => `
    <div class="cms-item-card" data-idx="${idx}">
      <div class="cms-item-header">Passo ${idx + 1}</div>
      <div class="cms-grid-2">
        <div class="form-group">
          <label class="form-label" style="font-size:0.75rem">Emoji / Ícone</label>
          <input type="text" class="form-input step-icon" value="${step.icon}" maxlength="4">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:0.75rem">Título</label>
          <input type="text" class="form-input step-title" value="${step.title}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" style="font-size:0.75rem">Descrição</label>
        <input type="text" class="form-input step-desc" value="${step.desc}">
      </div>
    </div>
  `).join('');
}

function renderBenefitsEditor(features) {
  const container = document.getElementById('benefits-editor');
  container.innerHTML = features.map((feat, idx) => `
    <div class="cms-item-card" data-idx="${idx}">
      <div class="cms-item-header">Card ${idx + 1}</div>
      <div class="cms-grid-2">
        <div class="form-group">
          <label class="form-label" style="font-size:0.75rem">Emoji / Ícone</label>
          <input type="text" class="form-input feat-icon" value="${feat.icon}" maxlength="4">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:0.75rem">Título</label>
          <input type="text" class="form-input feat-title" value="${feat.title}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" style="font-size:0.75rem">Descrição</label>
        <input type="text" class="form-input feat-desc" value="${feat.desc}">
      </div>
    </div>
  `).join('');
}

function renderDocsEditor(docs) {
  const container = document.getElementById('docs-editor');
  container.innerHTML = docs.map((doc, idx) => `
    <div class="cms-item-card cms-grid-3 doc-row" data-idx="${idx}">
      <input type="text" class="form-input doc-emoji" value="${doc.emoji}" placeholder="🏠" style="text-align:center">
      <input type="text" class="form-input doc-name" value="${doc.name}" placeholder="Nome do modelo">
      <button type="button" class="cms-item-remove" onclick="removeDocRow(this)">✕</button>
    </div>
  `).join('');
}

function addDocRow() {
  const container = document.getElementById('docs-editor');
  const div = document.createElement('div');
  div.className = 'cms-item-card cms-grid-3 doc-row';
  div.innerHTML = `
    <input type="text" class="form-input doc-emoji" placeholder="📄" style="text-align:center">
    <input type="text" class="form-input doc-name" placeholder="Novo Modelo">
    <button type="button" class="cms-item-remove" onclick="removeDocRow(this)">✕</button>
  `;
  container.appendChild(div);
}

function removeDocRow(btn) {
  btn.closest('.doc-row').remove();
}

function renderTestimonialsEditor(testimonials) {
  const container = document.getElementById('testimonials-editor');
  container.innerHTML = testimonials.map((test, idx) => `
    <div class="cms-item-card" data-idx="${idx}">
      <div class="cms-item-header">Depoimento ${idx + 1}</div>
      <div class="cms-grid-3" style="grid-template-columns:1fr 1fr 60px">
        <div class="form-group">
          <label class="form-label" style="font-size:0.75rem">Autor</label>
          <input type="text" class="form-input test-name" value="${test.name}">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:0.75rem">Cargo/Cidade</label>
          <input type="text" class="form-input test-role" value="${test.role}">
        </div>
        <div class="form-group">
          <label class="form-label" style="font-size:0.75rem">Sigla</label>
          <input type="text" class="form-input test-avatar" value="${test.avatar}" maxlength="3">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" style="font-size:0.75rem">Texto do Depoimento</label>
        <textarea class="form-input test-text" rows="2" style="font-family:inherit">${test.text}</textarea>
      </div>
      <div class="form-group" style="display:none">
        <input type="text" class="form-input test-stars" value="${test.stars || '★★★★★'}">
      </div>
    </div>
  `).join('');
}

function renderFaqEditor(faqs) {
  const container = document.getElementById('faq-editor');
  container.innerHTML = faqs.map((faq, idx) => `
    <div class="cms-item-card faq-row" data-idx="${idx}">
      <div class="cms-item-header">
        <span>Pergunta</span>
        <button type="button" class="cms-item-remove" onclick="removeFaqRow(this)">✕ Remover</button>
      </div>
      <input type="text" class="form-input faq-q" value="${faq.q}" placeholder="Pergunta">
      <textarea class="form-input faq-a" rows="3" placeholder="Resposta" style="font-family:inherit;margin-top:0.25rem">${faq.a}</textarea>
    </div>
  `).join('');
}

function addFaqRow() {
  const container = document.getElementById('faq-editor');
  const div = document.createElement('div');
  div.className = 'cms-item-card faq-row';
  div.innerHTML = `
    <div class="cms-item-header">
      <span>Nova Pergunta</span>
      <button type="button" class="cms-item-remove" onclick="removeFaqRow(this)">✕ Remover</button>
    </div>
    <input type="text" class="form-input faq-q" placeholder="Pergunta">
    <textarea class="form-input faq-a" rows="3" placeholder="Resposta" style="font-family:inherit;margin-top:0.25rem"></textarea>
  `;
  container.appendChild(div);
}

function removeFaqRow(btn) {
  btn.closest('.faq-row').remove();
}

// Salvar Home Page CMS
async function saveCmsHomeForm(e) {
  e.preventDefault();
  const btn = e.submitter || document.querySelector('#cms-home-form [type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  // 1. Estatísticas
  const stats = [];
  document.querySelectorAll('#stats-editor [data-idx]').forEach(el => {
    stats.push({
      value: parseInt(el.querySelector('.stat-value').value) || 0,
      label: el.querySelector('.stat-label').value.trim(),
      suffix: el.querySelector('.stat-suffix').value.trim()
    });
  });

  // 2. Como Funciona Steps
  const steps = [];
  document.querySelectorAll('#steps-editor [data-idx]').forEach(el => {
    steps.push({
      icon: el.querySelector('.step-icon').value.trim(),
      title: el.querySelector('.step-title').value.trim(),
      desc: el.querySelector('.step-desc').value.trim()
    });
  });

  // 3. Benefícios Features
  const features = [];
  document.querySelectorAll('#benefits-editor [data-idx]').forEach(el => {
    features.push({
      icon: el.querySelector('.feat-icon').value.trim(),
      title: el.querySelector('.feat-title').value.trim(),
      desc: el.querySelector('.feat-desc').value.trim()
    });
  });

  // 4. Catálogo Docs
  const docs = [];
  document.querySelectorAll('#docs-editor .doc-row').forEach(el => {
    docs.push({
      emoji: el.querySelector('.doc-emoji').value.trim(),
      name: el.querySelector('.doc-name').value.trim()
    });
  });

  // 5. Depoimentos Testimonials
  const testimonials = [];
  document.querySelectorAll('#testimonials-editor [data-idx]').forEach(el => {
    testimonials.push({
      stars: el.querySelector('.test-stars').value || '★★★★★',
      text: el.querySelector('.test-text').value.trim(),
      avatar: el.querySelector('.test-avatar').value.trim(),
      name: el.querySelector('.test-name').value.trim(),
      role: el.querySelector('.test-role').value.trim()
    });
  });

  // 6. FAQ
  const faqs = [];
  document.querySelectorAll('#faq-editor .faq-row').forEach(el => {
    faqs.push({
      q: el.querySelector('.faq-q').value.trim(),
      a: el.querySelector('.faq-a').value.trim()
    });
  });

  // Re-montando as configurações finais
  const updated = {
    heroBadge:      document.getElementById('cfg-hero-badge').value.trim(),
    heroHeadline:   document.getElementById('cfg-hero-headline').value.trim(),
    heroSub:        document.getElementById('cfg-hero-sub').value.trim(),
    heroSecCtaText: document.getElementById('cfg-hero-sec-cta-text').value.trim(),
    footerDesc:     document.getElementById('cfg-footer-desc').value.trim(),
    copyrightText:  document.getElementById('cfg-copyright-text').value.trim(),

    heroStats:      JSON.stringify(stats),
    sectionHowWorks: JSON.stringify({
      eyebrow: document.getElementById('cfg-how-eyebrow').value.trim(),
      title: document.getElementById('cfg-how-title').value.trim(),
      desc: document.getElementById('cfg-how-desc').value.trim(),
      steps: steps
    }),
    sectionBenefits: JSON.stringify({
      eyebrow: document.getElementById('cfg-benefits-eyebrow').value.trim(),
      title: document.getElementById('cfg-benefits-title').value.trim(),
      desc: document.getElementById('cfg-benefits-desc').value.trim(),
      features: features
    }),
    sectionDocs: JSON.stringify({
      eyebrow: document.getElementById('cfg-docs-eyebrow').value.trim(),
      title: document.getElementById('cfg-docs-title').value.trim(),
      desc: document.getElementById('cfg-docs-desc').value.trim(),
      docs: docs
    }),
    sectionTestimonials: JSON.stringify({
      eyebrow: document.getElementById('cfg-test-eyebrow').value.trim(),
      title: document.getElementById('cfg-test-title').value.trim(),
      desc: document.getElementById('cfg-test-desc').value.trim(),
      testimonials: testimonials
    }),
    sectionFaq: JSON.stringify({
      eyebrow: document.getElementById('cfg-faq-eyebrow').value.trim(),
      title: document.getElementById('cfg-faq-title').value.trim(),
      desc: document.getElementById('cfg-faq-desc').value.trim(),
      faqs: faqs
    })
  };

  try {
    await saveConfig(updated);
    clearConfigCache();
    triggerDeployWebhook();
    showToast('✅ CMS da Home page atualizado!', 'success');
  } catch (err) {
    showToast('❌ Erro ao salvar: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}


/* ── 3. PLANOS & PREÇOS ── */

async function loadPlans() {
  const list = document.getElementById('plans-list');
  const count = document.getElementById('plans-count');
  list.innerHTML = `<div class="posts-loading"><div class="spinner"></div><p>Carregando planos...</p></div>`;

  const cfg = await getConfig();
  try {
    _plansList = typeof cfg.pricingPlans === 'string' ? JSON.parse(cfg.pricingPlans) : (cfg.pricingPlans || []);
  } catch {
    _plansList = [];
  }

  // Ordenar planos
  _plansList.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  count.textContent = _plansList.length + ' plano' + (_plansList.length !== 1 ? 's' : '');

  if (!_plansList.length) {
    list.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--text-muted)">
        <div style="font-size:2.5rem;margin-bottom:1rem">🏷️</div>
        <p style="font-weight:600">Nenhum plano cadastrado</p>
        <p style="font-size:.875rem;margin-top:.5rem">Clique em "Novo Plano" para começar.</p>
      </div>`;
    return;
  }

  list.innerHTML = _plansList.map(plan => `
    <div class="post-admin-item" data-id="${plan.id}">
      <div class="post-admin-cover" style="font-size:1.5rem;text-align:center;line-height:48px;background:rgba(255,255,255,0.05)">
        💳
      </div>
      <div class="post-admin-info">
        <div class="post-admin-title" style="display:flex;align-items:center;gap:0.5rem">
          <span>${plan.name}</span>
          ${plan.popular ? `<span style="background:var(--accent);color:var(--bg);font-size:0.625rem;font-weight:800;padding:2px 6px;border-radius:99px">POPULAR</span>` : ''}
        </div>
        <div class="post-admin-meta">
          <strong>R$ ${plan.price}</strong> / ${plan.period || 'único'} &nbsp;·&nbsp; Ordem: ${plan.sortOrder || 1} &nbsp;·&nbsp; ${plan.features.length} benefícios
        </div>
      </div>
      <div class="post-admin-actions">
        <button class="btn btn-sm btn-outline" onclick="openPlanModalById('${plan.id}')">✏️ Editar</button>
        <button class="btn btn-sm" style="background:rgba(186,26,26,.1);color:var(--error);border:1px solid var(--error)" onclick="confirmDeletePlan('${plan.id}')">🗑</button>
      </div>
    </div>
  `).join('');
}

function openPlanModal(plan) {
  _editingPlanId = plan ? plan.id : null;
  const modal = document.getElementById('plan-modal-overlay');
  const title = document.getElementById('plan-modal-title');
  const form  = document.getElementById('plan-form');

  title.textContent = plan ? 'Editar Plano' : 'Novo Plano';

  if (plan) {
    document.getElementById('plan-name-input').value = plan.name || '';
    document.getElementById('plan-price-input').value = plan.price || '';
    document.getElementById('plan-period-input').value = plan.period || '';
    document.getElementById('plan-desc-input').value = plan.desc || '';
    document.getElementById('plan-features-input').value = (plan.features || []).join('\n');
    document.getElementById('plan-cta-text-input').value = plan.ctaText || '';
    document.getElementById('plan-cta-url-input').value = plan.ctaUrl || '';
    document.getElementById('plan-sort-order-input').value = plan.sortOrder || 1;
    document.getElementById('plan-popular-input').checked = !!plan.popular;
  } else {
    form.reset();
    document.getElementById('plan-sort-order-input').value = _plansList.length + 1;
  }

  modal.classList.add('open');
}

function openPlanModalById(id) {
  const plan = _plansList.find(p => p.id === id);
  if (plan) openPlanModal(plan);
}

function closePlanModal() {
  document.getElementById('plan-modal-overlay').classList.remove('open');
  _editingPlanId = null;
}

async function savePlan(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const featuresText = document.getElementById('plan-features-input').value;
  const features = featuresText.split('\n').map(f => f.trim()).filter(f => f.length > 0);

  const planData = {
    id: _editingPlanId || 'plan-' + Date.now(),
    name: document.getElementById('plan-name-input').value.trim(),
    price: document.getElementById('plan-price-input').value.trim(),
    period: document.getElementById('plan-period-input').value.trim(),
    desc: document.getElementById('plan-desc-input').value.trim(),
    features: features,
    ctaText: document.getElementById('plan-cta-text-input').value.trim() || 'Assinar',
    ctaUrl: document.getElementById('plan-cta-url-input').value.trim() || '#',
    sortOrder: parseInt(document.getElementById('plan-sort-order-input').value) || 1,
    popular: document.getElementById('plan-popular-input').checked
  };

  // Se for destaque "popular", desmarca os demais
  if (planData.popular) {
    _plansList.forEach(p => { if (p.id !== planData.id) p.popular = false; });
  }

  const existingIdx = _plansList.findIndex(p => p.id === planData.id);
  if (existingIdx !== -1) {
    _plansList[existingIdx] = planData;
  } else {
    _plansList.push(planData);
  }

  try {
    await saveConfig({ pricingPlans: JSON.stringify(_plansList) });
    clearConfigCache();
    triggerDeployWebhook();
    closePlanModal();
    await loadPlans();
    showToast(_editingPlanId ? '✅ Plano atualizado!' : '✅ Novo plano criado!', 'success');
  } catch (err) {
    showToast('❌ Erro ao salvar plano: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

async function confirmDeletePlan(id) {
  if (!confirm('Tem certeza que deseja remover este plano de preços?')) return;

  _plansList = _plansList.filter(p => p.id !== id);
  try {
    await saveConfig({ pricingPlans: JSON.stringify(_plansList) });
    clearConfigCache();
    triggerDeployWebhook();
    await loadPlans();
    showToast('🗑️ Plano de preços removido.', 'success');
  } catch (err) {
    showToast('❌ Erro ao remover plano: ' + err.message, 'error');
  }
}


/* ── 4. SEÇÕES DO BLOG (CMS) ── */

async function loadCmsBlogForm() {
  const cfg = await getConfig();

  // Listagem do Blog
  document.getElementById('cfg-blog-eyebrow').value = cfg.blogHeroEyebrow || '';
  document.getElementById('cfg-blog-title').value = cfg.blogHeroTitle || '';
  document.getElementById('cfg-blog-sub').value = cfg.blogHeroSub || '';
  document.getElementById('cfg-blog-cta-title').value = cfg.blogCtaTitle || '';
  document.getElementById('cfg-blog-cta-sub').value = cfg.blogCtaSub || '';
  document.getElementById('cfg-blog-cta-btn').value = cfg.blogCtaBtnText || '';

  // Leitura do Post (promocionais)
  document.getElementById('cfg-post-side-title').value = cfg.postSidebarCtaTitle || '';
  document.getElementById('cfg-post-side-sub').value = cfg.postSidebarCtaSub || '';
  document.getElementById('cfg-post-side-btn').value = cfg.postSidebarCtaBtnText || '';

  document.getElementById('cfg-post-inline-title').value = cfg.postInlineCtaTitle || '';
  document.getElementById('cfg-post-inline-sub').value = cfg.postInlineCtaSub || '';
  document.getElementById('cfg-post-inline-btn').value = cfg.postInlineCtaBtnText || '';
}

async function saveCmsBlogForm(e) {
  e.preventDefault();
  const btn = e.submitter || document.querySelector('#cms-blog-form [type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const updated = {
    blogHeroEyebrow:      document.getElementById('cfg-blog-eyebrow').value.trim(),
    blogHeroTitle:        document.getElementById('cfg-blog-title').value.trim(),
    blogHeroSub:          document.getElementById('cfg-blog-sub').value.trim(),
    blogCtaTitle:         document.getElementById('cfg-blog-cta-title').value.trim(),
    blogCtaSub:           document.getElementById('cfg-blog-cta-sub').value.trim(),
    blogCtaBtnText:       document.getElementById('cfg-blog-cta-btn').value.trim(),

    postSidebarCtaTitle:   document.getElementById('cfg-post-side-title').value.trim(),
    postSidebarCtaSub:     document.getElementById('cfg-post-side-sub').value.trim(),
    postSidebarCtaBtnText: document.getElementById('cfg-post-side-btn').value.trim(),

    postInlineCtaTitle:   document.getElementById('cfg-post-inline-title').value.trim(),
    postInlineCtaSub:     document.getElementById('cfg-post-inline-sub').value.trim(),
    postInlineCtaBtnText: document.getElementById('cfg-post-inline-btn').value.trim(),
  };

  try {
    await saveConfig(updated);
    clearConfigCache();
    triggerDeployWebhook();
    showToast('✅ CMS do Blog atualizado!', 'success');
  } catch (err) {
    showToast('❌ Erro ao salvar: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}


/* ── 5. GERENCIAR POSTS (CRUD) ── */

async function loadPosts() {
  const list  = document.getElementById('posts-list');
  const count = document.getElementById('posts-count');
  list.innerHTML = `<div class="posts-loading"><div class="spinner"></div><p>Carregando posts...</p></div>`;

  const posts = await getPosts();
  clearPostsCache();

  count.textContent = posts.length + ' post' + (posts.length !== 1 ? 's' : '');

  if (!posts.length) {
    list.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-muted)">
      <div style="font-size:2.5rem;margin-bottom:1rem">📝</div>
      <p style="font-weight:600">Nenhum post ainda</p>
      <p style="font-size:.875rem;margin-top:.5rem">Clique em "Novo Post" para começar.</p>
    </div>`;
    return;
  }

  list.innerHTML = posts.map((post) => `
    <div class="post-admin-item" data-id="${post.id}" data-slug="${post.slug}">
      <div class="post-admin-cover">
        ${post.cover
          ? `<img src="${post.cover}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.parentElement.textContent='📄'">`
          : '📄'}
      </div>
      <div class="post-admin-info">
        <div class="post-admin-title">${post.title}</div>
        <div class="post-admin-meta">
          <span style="background:${post.categoryColor||'#000f22'};color:white;padding:1px 8px;border-radius:99px;font-size:.6875rem;font-weight:700">${post.category}</span>
          &nbsp;·&nbsp; ${formatDate(post.date)} &nbsp;·&nbsp; ${post.readTime}
          ${post.published === false ? '&nbsp;·&nbsp; <span style="color:var(--error);font-weight:700">Não publicado</span>' : ''}
        </div>
      </div>
      <div class="post-admin-actions">
        <button class="btn btn-sm btn-outline" onclick="openPostModalById('${post.id}')">✏️ Editar</button>
        <button class="btn btn-sm" style="background:rgba(186,26,26,.1);color:var(--error);border:1px solid var(--error)" onclick="confirmDeletePost('${post.id}', '${escHtml(post.title)}')">🗑</button>
      </div>
    </div>
  `).join('');
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

function escHtml(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

let _editingPostId = null;

async function openPostModal(post) {
  _editingPostId = post ? post.id : null;
  const modal = document.getElementById('modal-overlay');
  const title = document.getElementById('modal-title');
  const form  = document.getElementById('post-form');

  title.textContent = post ? 'Editar Post' : 'Novo Post';

  if (post) {
    form.elements['post-title'].value         = post.title || '';
    form.elements['post-slug'].value          = post.slug  || '';
    form.elements['post-category'].value      = post.category || '';
    form.elements['post-cat-color'].value     = post.categoryColor || '#000f22';
    form.elements['post-author'].value        = post.author || 'Equipe Central de Contratos';
    form.elements['post-date'].value          = post.date  || '';
    form.elements['post-read'].value          = post.readTime || '5 min';
    form.elements['post-cover'].value         = post.cover || '';
    form.elements['post-excerpt'].value       = post.excerpt || '';
    form.elements['post-content'].value       = post.content || '';
    form.elements['post-published'].checked   = post.published !== false;
  } else {
    form.reset();
    form.elements['post-author'].value        = 'Equipe Central de Contratos';
    form.elements['post-date'].value          = new Date().toISOString().split('T')[0];
    form.elements['post-read'].value          = '5 min';
    form.elements['post-cat-color'].value     = '#000f22';
    form.elements['post-published'].checked   = true;
  }

  // Sanitização automática de slug
  const titleInput = form.elements['post-title'];
  const slugInput  = form.elements['post-slug'];
  titleInput.oninput = () => {
    if (!_editingPostId) slugInput.value = slugify(titleInput.value);
  };
  slugInput.onchange = () => {
    slugInput.value = slugify(slugInput.value);
  };

  modal.classList.add('open');
}

async function openPostModalById(id) {
  const posts = await getPosts();
  const post  = posts.find(p => p.id === id);
  if (post) openPostModal(post);
}

function closePostModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  _editingPostId = null;
}

async function savePost(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('[type=submit]');
  const originalText = btn.textContent;

  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const postData = {
    id:            _editingPostId || undefined,
    title:         form.elements['post-title'].value.trim(),
    slug:          form.elements['post-slug'].value.trim() || slugify(form.elements['post-title'].value),
    category:      form.elements['post-category'].value.trim(),
    categoryColor: form.elements['post-cat-color'].value,
    author:        form.elements['post-author'].value.trim() || 'Equipe Central de Contratos',
    date:          form.elements['post-date'].value,
    readTime:      form.elements['post-read'].value.trim() || '5 min',
    cover:         form.elements['post-cover'].value.trim(),
    excerpt:       form.elements['post-excerpt'].value.trim(),
    content:       form.elements['post-content'].value.trim(),
    published:     form.elements['post-published'].checked,
  };

  try {
    await upsertPost(postData);
    closePostModal();
    triggerDeployWebhook();
    await loadPosts();
    showToast(_editingPostId ? '✅ Post atualizado!' : '✅ Post criado!', 'success');
  } catch (err) {
    showToast('❌ Erro ao salvar post: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

async function confirmDeletePost(id, title) {
  if (!confirm(`Tem certeza que deseja remover o post "${title}"?`)) return;

  try {
    await deletePostById(id);
    triggerDeployWebhook();
    await loadPosts();
    showToast('🗑 Post removido.', 'success');
  } catch (err) {
    showToast('❌ Erro ao remover: ' + err.message, 'error');
  }
}


/* ── Helpers ────────────────────────────────────────────────────── */

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-');
}

function showToast(msg, type = '') {
  let toast = document.getElementById('admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'admin-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  });
}

async function downloadSitemap() {
  const btn = document.getElementById('btn-download-sitemap');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Gerando...';

  try {
    const cfg = await getConfig();
    const posts = await getPosts();
    const publishedPosts = posts.filter(p => p.published !== false);

    const siteUrl = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
      ? 'https://centraldecontratos.com.br'
      : window.location.origin;

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}/</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}/blog/</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;

    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}/blog/privacidade.html</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.3</priority>\n`;
    xml += `  </url>\n`;

    publishedPosts.forEach(post => {
      const postDate = post.date || today;
      xml += `  <url>\n`;
      xml += `    <loc>${siteUrl}/blog/post.html?slug=${post.slug}</loc>\n`;
      xml += `    <lastmod>${postDate}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('📥 sitemap.xml gerado e baixado!', 'success');
  } catch (err) {
    showToast('❌ Erro ao gerar sitemap: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

async function triggerDeployWebhook() {
  try {
    const cfg = await getConfig();
    if (cfg.deployWebhook) {
      console.log('[Webhook] Disparando webhook de deploy:', cfg.deployWebhook);
      fetch(cfg.deployWebhook, { method: 'POST', mode: 'no-cors' })
        .then(() => console.log('[Webhook] Webhook de deploy enviado com sucesso.'))
        .catch(err => console.error('[Webhook] Falha ao enviar webhook:', err));
    }
  } catch (err) {
    console.error('[Webhook] Erro ao buscar configuração do webhook:', err);
  }
}
