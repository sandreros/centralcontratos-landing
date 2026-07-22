/* ================================================================
   ADMIN.JS — Painel Administrativo Completo com Supabase Auth & CMS
   ================================================================ */

console.log('[Admin] admin.js carregado com sucesso!');

if (document.readyState === 'loading') {
  console.log('[Admin] DOM ainda carregando, registrando listener...');
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Admin] DOMContentLoaded disparado. Iniciando initAuth...');
    initAuth().catch(err => {
      console.error('[Admin Init Error]:', err);
      alert('Erro ao inicializar o painel: ' + err.message);
    });
  });
} else {
  console.log('[Admin] DOM já está pronto. Iniciando initAuth imediatamente...');
  initAuth().catch(err => {
    console.error('[Admin Init Error]:', err);
    alert('Erro ao inicializar o painel: ' + err.message);
  });
}

const THEME_PRESETS = {
  classic: {
    label: '⚖️ Clássico',
    themePrimaryColor: '#000f22',
    themeAccentColor: '#EDB83D',
    themeBgColor: '#f7f9fb',
    themeTextColor: '#191c1e',
    themeNavbarBgColor: '#ffffff',
    themeNavbarTextColor: '#43474d',
    themeNavbarTextTransparentColor: '#ffffff',
    themeHeroBg: '#000f22',          themeHeroText: '#ffffff',
    themeHowBg: '#f7f9fb',           themeHowText: '#191c1e',
    themeBenefitsBg: '#000f22',      themeBenefitsText: '#ffffff',
    themeCatalogBg: '#f7f9fb',       themeCatalogText: '#191c1e',
    themePricingBg: '#ffffff',       themePricingText: '#191c1e',
    themeTestimonialsBg: '#f7f9fb',  themeTestimonialsText: '#191c1e',
    themeFaqBg: '#ffffff',           themeFaqText: '#191c1e',
    themeFooterBg: '#000f22',        themeFooterText: '#ffffff'
  },
  cyberpunk: {
    label: '⚡ Cyberpunk',
    themePrimaryColor: '#0d0e15',
    themeAccentColor: '#ff0055',
    themeBgColor: '#0a0b10',
    themeTextColor: '#e0e0e6',
    themeNavbarBgColor: '#0d0e15',
    themeNavbarTextColor: '#e0e0e6',
    themeNavbarTextTransparentColor: '#ff0055',
    themeHeroBg: '#0d0e15',          themeHeroText: '#e0e0e6',
    themeHowBg: '#12131a',           themeHowText: '#e0e0e6',
    themeBenefitsBg: '#0a0b10',      themeBenefitsText: '#e0e0e6',
    themeCatalogBg: '#12131a',       themeCatalogText: '#e0e0e6',
    themePricingBg: '#12131a',       themePricingText: '#ffffff',
    themeTestimonialsBg: '#0a0b10',  themeTestimonialsText: '#e0e0e6',
    themeFaqBg: '#12131a',           themeFaqText: '#e0e0e6',
    themeFooterBg: '#0d0e15',        themeFooterText: '#e0e0e6'
  },
  emerald: {
    label: '🌿 Esmeralda',
    themePrimaryColor: '#0b2e24',
    themeAccentColor: '#10b981',
    themeBgColor: '#f4f7f6',
    themeTextColor: '#111827',
    themeNavbarBgColor: '#ffffff',
    themeNavbarTextColor: '#374151',
    themeNavbarTextTransparentColor: '#ffffff',
    themeHeroBg: '#0b2e24',          themeHeroText: '#ffffff',
    themeHowBg: '#f4f7f6',           themeHowText: '#111827',
    themeBenefitsBg: '#0b2e24',      themeBenefitsText: '#ffffff',
    themeCatalogBg: '#f4f7f6',       themeCatalogText: '#111827',
    themePricingBg: '#ffffff',       themePricingText: '#111827',
    themeTestimonialsBg: '#f4f7f6',  themeTestimonialsText: '#111827',
    themeFaqBg: '#ffffff',           themeFaqText: '#111827',
    themeFooterBg: '#0b2e24',        themeFooterText: '#ffffff'
  },
  sunset: {
    label: '🌅 Pôr do Sol',
    themePrimaryColor: '#2d1b4e',
    themeAccentColor: '#f97316',
    themeBgColor: '#fafaf9',
    themeTextColor: '#1c1917',
    themeNavbarBgColor: '#ffffff',
    themeNavbarTextColor: '#44403c',
    themeNavbarTextTransparentColor: '#ffffff',
    themeHeroBg: '#2d1b4e',          themeHeroText: '#ffffff',
    themeHowBg: '#fafaf9',           themeHowText: '#1c1917',
    themeBenefitsBg: '#2d1b4e',      themeBenefitsText: '#ffffff',
    themeCatalogBg: '#fafaf9',       themeCatalogText: '#1c1917',
    themePricingBg: '#ffffff',       themePricingText: '#1c1917',
    themeTestimonialsBg: '#fafaf9',  themeTestimonialsText: '#1c1917',
    themeFaqBg: '#ffffff',           themeFaqText: '#1c1917',
    themeFooterBg: '#2d1b4e',        themeFooterText: '#ffffff'
  },
  ocean: {
    label: '🌊 Oceano',
    themePrimaryColor: '#0f172a',
    themeAccentColor: '#3b82f6',
    themeBgColor: '#f8fafc',
    themeTextColor: '#0f172a',
    themeNavbarBgColor: '#ffffff',
    themeNavbarTextColor: '#334155',
    themeNavbarTextTransparentColor: '#ffffff',
    themeHeroBg: '#0f172a',          themeHeroText: '#ffffff',
    themeHowBg: '#f8fafc',           themeHowText: '#0f172a',
    themeBenefitsBg: '#0f172a',      themeBenefitsText: '#ffffff',
    themeCatalogBg: '#f8fafc',       themeCatalogText: '#0f172a',
    themePricingBg: '#ffffff',       themePricingText: '#0f172a',
    themeTestimonialsBg: '#f8fafc',  themeTestimonialsText: '#0f172a',
    themeFaqBg: '#ffffff',           themeFaqText: '#0f172a',
    themeFooterBg: '#0f172a',        themeFooterText: '#ffffff'
  },
  minimal: {
    label: '⬜ Minimalista',
    themePrimaryColor: '#18181b',
    themeAccentColor: '#a855f7',
    themeBgColor: '#fafafa',
    themeTextColor: '#27272a',
    themeNavbarBgColor: '#ffffff',
    themeNavbarTextColor: '#27272a',
    themeNavbarTextTransparentColor: '#18181b',
    themeHeroBg: '#18181b',          themeHeroText: '#ffffff',
    themeHowBg: '#fafafa',           themeHowText: '#27272a',
    themeBenefitsBg: '#18181b',      themeBenefitsText: '#ffffff',
    themeCatalogBg: '#fafafa',       themeCatalogText: '#27272a',
    themePricingBg: '#ffffff',       themePricingText: '#27272a',
    themeTestimonialsBg: '#fafafa',  themeTestimonialsText: '#27272a',
    themeFaqBg: '#ffffff',           themeFaqText: '#27272a',
    themeFooterBg: '#18181b',        themeFooterText: '#ffffff'
  },
  rose: {
    label: '🌹 Rosa',
    themePrimaryColor: '#881337',
    themeAccentColor: '#f43f5e',
    themeBgColor: '#fff1f2',
    themeTextColor: '#1c0a0f',
    themeNavbarBgColor: '#ffffff',
    themeNavbarTextColor: '#4c0519',
    themeNavbarTextTransparentColor: '#ffffff',
    themeHeroBg: '#881337',          themeHeroText: '#ffffff',
    themeHowBg: '#fff1f2',           themeHowText: '#1c0a0f',
    themeBenefitsBg: '#881337',      themeBenefitsText: '#ffffff',
    themeCatalogBg: '#fff1f2',       themeCatalogText: '#1c0a0f',
    themePricingBg: '#ffffff',       themePricingText: '#1c0a0f',
    themeTestimonialsBg: '#fff1f2',  themeTestimonialsText: '#1c0a0f',
    themeFaqBg: '#ffffff',           themeFaqText: '#1c0a0f',
    themeFooterBg: '#881337',        themeFooterText: '#ffffff'
  }
};

/**
 * Preenche todos os inputs de tema com os valores do preset.
 */
function applyThemePreset(presetKey) {
  const colors = THEME_PRESETS[presetKey];
  if (!colors) return;

  // Cores globais
  document.getElementById('cfg-theme-primary').value = colors.themePrimaryColor;
  document.getElementById('cfg-theme-accent').value = colors.themeAccentColor;
  document.getElementById('cfg-theme-bg').value = colors.themeBgColor;
  document.getElementById('cfg-theme-text').value = colors.themeTextColor;
  document.getElementById('cfg-theme-nav-bg').value = colors.themeNavbarBgColor;
  document.getElementById('cfg-theme-nav-text').value = colors.themeNavbarTextColor;
  document.getElementById('cfg-theme-nav-text-trans').value = colors.themeNavbarTextTransparentColor;
  document.getElementById('cfg-theme-pricing-bg').value = colors.themePricingBg;
  document.getElementById('cfg-theme-pricing-text').value = colors.themePricingText;

  // Cores das dobras (existem apenas na aba de seções da home)
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
  setVal('cfg-home-hero-bg',          colors.themeHeroBg);
  setVal('cfg-home-hero-text',         colors.themeHeroText);
  setVal('cfg-home-how-bg',            colors.themeHowBg);
  setVal('cfg-home-how-text',          colors.themeHowText);
  setVal('cfg-home-benefits-bg',       colors.themeBenefitsBg);
  setVal('cfg-home-benefits-text',     colors.themeBenefitsText);
  setVal('cfg-home-catalog-bg',        colors.themeCatalogBg);
  setVal('cfg-home-catalog-text',      colors.themeCatalogText);
  setVal('cfg-home-faq-bg',            colors.themeFaqBg);
  setVal('cfg-home-faq-text',          colors.themeFaqText);
  setVal('cfg-home-testimonials-bg',   colors.themeTestimonialsBg);
  setVal('cfg-home-testimonials-text', colors.themeTestimonialsText);
  setVal('cfg-home-footer-bg',         colors.themeFooterBg);
  setVal('cfg-home-footer-text',       colors.themeFooterText);

  // Marca o select de preset também
  const sel = document.getElementById('cfg-theme-preset');
  if (sel) sel.value = presetKey;
}

/**
 * Aplica o preset nos inputs E salva imediatamente no Supabase.
 */
window.applyThemePresetAndSave = async function(presetKey) {
  const colors = THEME_PRESETS[presetKey];
  if (!colors) return;

  applyThemePreset(presetKey);

  const btn = document.getElementById(`preset-btn-${presetKey}`);
  if (btn) { btn.disabled = true; btn.textContent = 'Aplicando...'; }

  const themeData = {
    themePrimaryColor: colors.themePrimaryColor,
    themeAccentColor:  colors.themeAccentColor,
    themeBgColor:      colors.themeBgColor,
    themeTextColor:    colors.themeTextColor,
    themeNavbarBgColor: colors.themeNavbarBgColor,
    themeNavbarTextColor: colors.themeNavbarTextColor,
    themeNavbarTextTransparentColor: colors.themeNavbarTextTransparentColor,
    themeHeroBg:            colors.themeHeroBg,
    themeHeroText:          colors.themeHeroText,
    themeHowBg:             colors.themeHowBg,
    themeHowText:           colors.themeHowText,
    themeBenefitsBg:        colors.themeBenefitsBg,
    themeBenefitsText:      colors.themeBenefitsText,
    themeCatalogBg:         colors.themeCatalogBg,
    themeCatalogText:       colors.themeCatalogText,
    themePricingBg:         colors.themePricingBg,
    themePricingText:       colors.themePricingText,
    themeTestimonialsBg:    colors.themeTestimonialsBg,
    themeTestimonialsText:  colors.themeTestimonialsText,
    themeFaqBg:             colors.themeFaqBg,
    themeFaqText:           colors.themeFaqText,
    themeFooterBg:          colors.themeFooterBg,
    themeFooterText:        colors.themeFooterText,
  };

  try {
    await saveConfig(themeData);
    clearConfigCache();
    triggerDeployWebhook();
    showToast(`✅ Tema "${colors.label}" aplicado e salvo!`, 'success');
  } catch (err) {
    showToast('❌ Erro ao salvar tema: ' + err.message, 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Aplicar'; }
  }
};

let _plansList = []; // Array em memória para gerenciamento de planos
let _editingPlanId = null; // ID do plano em edição (null = novo)

let _campaignsList = []; // Array em memória para gerenciamento de campanhas
let _editingCampaignId = null; // ID da campanha em edição (null = novo)

/* ── Auth ──────────────────────────────────────────────────────── */

async function initAuth() {
  showLoading(true);
  const session = await sbGetSession();
  showLoading(false);
  if (session) { showPanel(); } else { showLogin(); }
}

function showLogin() {
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-main').style.display  = 'none';
  document.getElementById('admin-loading').style.display = 'none';

  // Diagnóstico de conexão Supabase — aparece abaixo do botão
  const sbOk = (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL && !SUPABASE_URL.includes('SEU-PROJETO'));
  const diagEl = document.getElementById('login-supabase-diag');
  if (diagEl) {
    if (sbOk) {
      const shortUrl = SUPABASE_URL.replace('https://', '').split('.')[0];
      diagEl.innerHTML = `🟢 Supabase conectado <code style="font-size:.7rem;opacity:.6">${shortUrl}</code>`;
      diagEl.style.color = '#4caf50';
    } else {
      diagEl.innerHTML = '🔴 Supabase <strong>NÃO configurado</strong> — variáveis de ambiente ausentes.';
      diagEl.style.color = '#f44336';
    }
  }

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

  // Verifica se o cliente Supabase foi inicializado
  if (typeof SUPABASE_URL === 'undefined' || !SUPABASE_URL || SUPABASE_URL.includes('SEU-PROJETO')) {
    btn.disabled = false;
    btn.textContent = 'Entrar →';
    errorEl.innerHTML = '⚠️ Supabase não configurado.<br><small style="font-weight:400">Adicione SUPABASE_URL e SUPABASE_ANON_KEY nas variáveis de ambiente do Vercel e faça um novo deploy.</small>';
    errorEl.style.display = 'block';
    document.getElementById('login-form').addEventListener('submit', handleLogin, { once: true });
    return;
  }

  const { error } = await sbSignIn(email, password);

  btn.disabled = false;
  btn.textContent = 'Entrar →';

  if (error) {
    console.error('[Admin Login] Erro do Supabase:', error);
    // Mostra o erro real para facilitar diagnóstico
    let msg = 'E-mail ou senha incorretos. Tente novamente.';
    if (error.message) {
      if (error.message.includes('Invalid login credentials')) {
        msg = 'Credenciais inválidas. Verifique o e-mail e a senha.';
      } else if (error.message.includes('Email not confirmed')) {
        msg = 'E-mail não confirmado. Confirme o e-mail no Supabase → Authentication → Users → clique no usuário → "Send confirmation email".';
      } else if (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('Failed')) {
        msg = '❌ Erro de rede ao conectar ao Supabase. Verifique se a URL e a chave estão corretas nas variáveis de ambiente.';
      } else {
        msg = `Erro: ${error.message}`;
      }
    }
    errorEl.innerHTML = msg;
    errorEl.style.display = 'block';
    document.getElementById('login-form').addEventListener('submit', handleLogin, { once: true });
    return;
  }

  showPanel();
}

async function handleLogout() {
  inactivityStop();
  await sbSignOut();
  location.reload();
}

/* ── Auto-Logout por Inatividade ───────────────────────────────── */

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutos
const INACTIVITY_WARN_MS    =  2 * 60 * 1000; // avisa 2 min antes

let _inactivityTimer  = null;
let _inactivityWarn   = null;
let _countdownTimer   = null;
let _inactivityActive = false;

/** Reinicia o timer a cada interação do usuário */
function inactivityReset() {
  if (!_inactivityActive) return;

  // Fecha o aviso se estiver aberto (usuário voltou a tempo)
  const modal = document.getElementById('inactivity-modal');
  if (modal && modal.style.display !== 'none') {
    modal.style.display = 'none';
    clearInterval(_countdownTimer);
  }

  clearTimeout(_inactivityTimer);
  clearTimeout(_inactivityWarn);

  // Agenda aviso
  _inactivityWarn = setTimeout(() => {
    inactivityShowWarning();
  }, INACTIVITY_TIMEOUT_MS - INACTIVITY_WARN_MS);

  // Agenda logout
  _inactivityTimer = setTimeout(async () => {
    inactivityStop();
    await sbSignOut();
    location.reload();
  }, INACTIVITY_TIMEOUT_MS);
}

/** Exibe o modal de aviso com contagem regressiva */
function inactivityShowWarning() {
  const modal = document.getElementById('inactivity-modal');
  if (!modal) return;
  modal.style.display = 'flex';

  let secs = Math.floor(INACTIVITY_WARN_MS / 1000);
  const countEl = document.getElementById('inactivity-countdown');
  const updateCount = () => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    if (countEl) countEl.textContent = `${m}:${String(s).padStart(2, '0')}`;
  };
  updateCount();

  clearInterval(_countdownTimer);
  _countdownTimer = setInterval(() => {
    secs--;
    updateCount();
    if (secs <= 0) clearInterval(_countdownTimer);
  }, 1000);
}

/** Inicia o monitoramento de inatividade */
function inactivityStart() {
  _inactivityActive = true;
  const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
  events.forEach(evt => document.addEventListener(evt, inactivityReset, { passive: true }));
  inactivityReset();
  console.log('[Admin] Auto-logout por inatividade ativado (15 min).');
}

/** Para o monitoramento */
function inactivityStop() {
  _inactivityActive = false;
  clearTimeout(_inactivityTimer);
  clearTimeout(_inactivityWarn);
  clearInterval(_countdownTimer);
  const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
  events.forEach(evt => document.removeEventListener(evt, inactivityReset));
}

function showPanel() {
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-loading').style.display = 'none';
  document.getElementById('admin-main').style.display  = 'flex';
  inactivityStart();
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

  // Modais de Campanhas de Anúncios (Ads)
  document.getElementById('btn-new-campaign').addEventListener('click', () => openCampaignModal(null));
  document.getElementById('btn-close-campaign-modal').addEventListener('click', closeCampaignModal);
  document.getElementById('btn-cancel-campaign-modal').addEventListener('click', closeCampaignModal);
  document.getElementById('campaign-modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('campaign-modal-overlay')) closeCampaignModal();
  });
  document.getElementById('campaign-form').addEventListener('submit', saveCampaign);

  document.getElementById('campaign-type-input').addEventListener('change', (e) => {
    const isGoogle = e.target.value === 'google';
    document.getElementById('campaign-google-fields').style.display = isGoogle ? 'block' : 'none';
    document.getElementById('campaign-custom-fields').style.display = isGoogle ? 'none' : 'block';
    document.getElementById('campaign-slot-id-input').required = isGoogle;
    document.getElementById('campaign-img-input').required = !isGoogle;
    document.getElementById('campaign-link-input').required = !isGoogle;
  });

  // Tema Preset — Select legado (compatibilidade)
  const presetSel = document.getElementById('cfg-theme-preset');
  if (presetSel) {
    presetSel.addEventListener('change', (e) => {
      if (e.target.value && THEME_PRESETS[e.target.value]) applyThemePreset(e.target.value);
    });
  }

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

  showLoading(true);
  try {
    await loadGeneralForm();
    await loadCmsHomeForm();
    await loadPlans();
    await loadCampaigns();
    await loadCmsBlogForm();
    await loadPosts();
  } catch (err) {
    console.error('[Admin] Erro ao carregar dados do painel:', err);
    alert('Erro ao carregar os dados: ' + err.message);
  }
  showLoading(false);
  document.getElementById('admin-main').style.display = 'flex';
  setupSubtabs();
  EmojiPicker.init();
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

  // Customização do CTA Geral
  const hasCustomCta = !!(cfg.ctaBgColor || cfg.ctaTextColor);
  document.getElementById('cfg-cta-use-custom').checked = hasCustomCta;
  document.getElementById('cfg-cta-bg-color').value = cfg.ctaBgColor || '#000f22';
  document.getElementById('cfg-cta-text-color').value = cfg.ctaTextColor || '#ffffff';
  document.getElementById('cfg-cta-format').value = cfg.ctaFormat || 'default';

  // Tema & Cores
  document.getElementById('cfg-theme-primary').value = cfg.themePrimaryColor || '#000f22';
  document.getElementById('cfg-theme-accent').value = cfg.themeAccentColor || '#EDB83D';
  document.getElementById('cfg-theme-bg').value = cfg.themeBgColor || '#f7f9fb';
  document.getElementById('cfg-theme-text').value = cfg.themeTextColor || '#191c1e';
  
  document.getElementById('cfg-theme-nav-bg').value = cfg.themeNavbarBgColor || '#ffffff';
  document.getElementById('cfg-theme-nav-text').value = cfg.themeNavbarTextColor || '#43474d';
  document.getElementById('cfg-theme-nav-text-trans').value = cfg.themeNavbarTextTransparentColor || '#ffffff';

  document.getElementById('cfg-theme-pricing-bg').value = cfg.themePricingBg || '#ffffff';
  document.getElementById('cfg-theme-pricing-text').value = cfg.themePricingText || '#191c1e';
  document.getElementById('cfg-theme-pricing-bg-image').value = cfg.themePricingBgImage || '';
  document.getElementById('cfg-theme-pricing-bg-video').value = cfg.themePricingBgVideo || '';
}

async function saveGeneralForm(e) {
  e.preventDefault();
  const btn = e.submitter || document.querySelector('#general-form [type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const useCustomCta = document.getElementById('cfg-cta-use-custom').checked;

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
    
    // Customização do CTA Geral
    ctaBgColor:       useCustomCta ? document.getElementById('cfg-cta-bg-color').value : '',
    ctaTextColor:     useCustomCta ? document.getElementById('cfg-cta-text-color').value : '',
    ctaFormat:        document.getElementById('cfg-cta-format').value,

    // Tema & Cores
    themePrimaryColor: document.getElementById('cfg-theme-primary').value,
    themeAccentColor:  document.getElementById('cfg-theme-accent').value,
    themeBgColor:      document.getElementById('cfg-theme-bg').value,
    themeTextColor:    document.getElementById('cfg-theme-text').value,
    
    themeNavbarBgColor: document.getElementById('cfg-theme-nav-bg').value,
    themeNavbarTextColor: document.getElementById('cfg-theme-nav-text').value,
    themeNavbarTextTransparentColor: document.getElementById('cfg-theme-nav-text-trans').value,

    themePricingBg:      document.getElementById('cfg-theme-pricing-bg').value,
    themePricingText:    document.getElementById('cfg-theme-pricing-text').value,
    themePricingBgImage: document.getElementById('cfg-theme-pricing-bg-image').value.trim(),
    themePricingBgVideo: document.getElementById('cfg-theme-pricing-bg-video').value.trim(),
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
  document.getElementById('cfg-hero-sec-cta-url').value = cfg.heroSecCtaUrl || '';
  
  const hasCustomHeroSec = !!(cfg.heroSecCtaBgColor || cfg.heroSecCtaTextColor);
  document.getElementById('cfg-hero-sec-cta-use-custom').checked = hasCustomHeroSec;
  document.getElementById('cfg-hero-sec-cta-bg-color').value = cfg.heroSecCtaBgColor || '#ffffff';
  document.getElementById('cfg-hero-sec-cta-text-color').value = cfg.heroSecCtaTextColor || '#000f22';
  document.getElementById('cfg-hero-sec-cta-format').value = cfg.heroSecCtaFormat || 'default';

  // Cores por Dobra
  document.getElementById('cfg-home-hero-bg').value = cfg.themeHeroBg || '#000f22';
  document.getElementById('cfg-home-hero-text').value = cfg.themeHeroText || '#ffffff';
  document.getElementById('cfg-home-how-bg').value = cfg.themeHowBg || '#f7f9fb';
  document.getElementById('cfg-home-how-text').value = cfg.themeHowText || '#191c1e';
  document.getElementById('cfg-home-benefits-bg').value = cfg.themeBenefitsBg || '#000f22';
  document.getElementById('cfg-home-benefits-text').value = cfg.themeBenefitsText || '#ffffff';
  document.getElementById('cfg-home-catalog-bg').value = cfg.themeCatalogBg || '#f7f9fb';
  document.getElementById('cfg-home-catalog-text').value = cfg.themeCatalogText || '#191c1e';
  document.getElementById('cfg-home-faq-bg').value = cfg.themeFaqBg || '#ffffff';
  document.getElementById('cfg-home-faq-text').value = cfg.themeFaqText || '#191c1e';
  document.getElementById('cfg-home-testimonials-bg').value = cfg.themeTestimonialsBg || '#f7f9fb';
  document.getElementById('cfg-home-testimonials-text').value = cfg.themeTestimonialsText || '#191c1e';
  document.getElementById('cfg-home-footer-bg').value = cfg.themeFooterBg || '#000f22';
  document.getElementById('cfg-home-footer-text').value = cfg.themeFooterText || '#ffffff';

  // Mídias por Dobra
  document.getElementById('cfg-home-hero-bg-image').value = cfg.themeHeroBgImage || '';
  document.getElementById('cfg-home-hero-bg-video').value = cfg.themeHeroBgVideo || '';
  document.getElementById('cfg-home-how-bg-image').value = cfg.themeHowBgImage || '';
  document.getElementById('cfg-home-how-bg-video').value = cfg.themeHowBgVideo || '';
  document.getElementById('cfg-home-benefits-bg-image').value = cfg.themeBenefitsBgImage || '';
  document.getElementById('cfg-home-benefits-bg-video').value = cfg.themeBenefitsBgVideo || '';
  document.getElementById('cfg-home-catalog-bg-image').value = cfg.themeCatalogBgImage || '';
  document.getElementById('cfg-home-catalog-bg-video').value = cfg.themeCatalogBgVideo || '';
  document.getElementById('cfg-home-faq-bg-image').value = cfg.themeFaqBgImage || '';
  document.getElementById('cfg-home-faq-bg-video').value = cfg.themeFaqBgVideo || '';
  document.getElementById('cfg-home-testimonials-bg-image').value = cfg.themeTestimonialsBgImage || '';
  document.getElementById('cfg-home-testimonials-bg-video').value = cfg.themeTestimonialsBgVideo || '';
  document.getElementById('cfg-home-footer-bg-image').value = cfg.themeFooterBgImage || '';
  document.getElementById('cfg-home-footer-bg-video').value = cfg.themeFooterBgVideo || '';

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
  const useCustomHeroSec = document.getElementById('cfg-hero-sec-cta-use-custom').checked;

  const updated = {
    heroBadge:      document.getElementById('cfg-hero-badge').value.trim(),
    heroHeadline:   document.getElementById('cfg-hero-headline').value.trim(),
    heroSub:        document.getElementById('cfg-hero-sub').value.trim(),
    heroSecCtaText: document.getElementById('cfg-hero-sec-cta-text').value.trim(),
    heroSecCtaUrl:  document.getElementById('cfg-hero-sec-cta-url').value.trim(),
    heroSecCtaBgColor: useCustomHeroSec ? document.getElementById('cfg-hero-sec-cta-bg-color').value : '',
    heroSecCtaTextColor: useCustomHeroSec ? document.getElementById('cfg-hero-sec-cta-text-color').value : '',
    heroSecCtaFormat: document.getElementById('cfg-hero-sec-cta-format').value,
    footerDesc:     document.getElementById('cfg-footer-desc').value.trim(),
    copyrightText:  document.getElementById('cfg-copyright-text').value.trim(),

    // Cores por Dobra
    themeHeroBg:          document.getElementById('cfg-home-hero-bg').value,
    themeHeroText:        document.getElementById('cfg-home-hero-text').value,
    themeHowBg:           document.getElementById('cfg-home-how-bg').value,
    themeHowText:         document.getElementById('cfg-home-how-text').value,
    themeBenefitsBg:      document.getElementById('cfg-home-benefits-bg').value,
    themeBenefitsText:    document.getElementById('cfg-home-benefits-text').value,
    themeCatalogBg:       document.getElementById('cfg-home-catalog-bg').value,
    themeCatalogText:     document.getElementById('cfg-home-catalog-text').value,
    themeFaqBg:           document.getElementById('cfg-home-faq-bg').value,
    themeFaqText:         document.getElementById('cfg-home-faq-text').value,
    themeTestimonialsBg:   document.getElementById('cfg-home-testimonials-bg').value,
    themeTestimonialsText: document.getElementById('cfg-home-testimonials-text').value,
    themeFooterBg:        document.getElementById('cfg-home-footer-bg').value,
    themeFooterText:      document.getElementById('cfg-home-footer-text').value,

    // Mídias por Dobra
    themeHeroBgImage:          document.getElementById('cfg-home-hero-bg-image').value.trim(),
    themeHeroBgVideo:          document.getElementById('cfg-home-hero-bg-video').value.trim(),
    themeHowBgImage:           document.getElementById('cfg-home-how-bg-image').value.trim(),
    themeHowBgVideo:           document.getElementById('cfg-home-how-bg-video').value.trim(),
    themeBenefitsBgImage:      document.getElementById('cfg-home-benefits-bg-image').value.trim(),
    themeBenefitsBgVideo:      document.getElementById('cfg-home-benefits-bg-video').value.trim(),
    themeCatalogBgImage:       document.getElementById('cfg-home-catalog-bg-image').value.trim(),
    themeCatalogBgVideo:       document.getElementById('cfg-home-catalog-bg-video').value.trim(),
    themeFaqBgImage:           document.getElementById('cfg-home-faq-bg-image').value.trim(),
    themeFaqBgVideo:           document.getElementById('cfg-home-faq-bg-video').value.trim(),
    themeTestimonialsBgImage:   document.getElementById('cfg-home-testimonials-bg-image').value.trim(),
    themeTestimonialsBgVideo:   document.getElementById('cfg-home-testimonials-bg-video').value.trim(),
    themeFooterBgImage:        document.getElementById('cfg-home-footer-bg-image').value.trim(),
    themeFooterBgVideo:        document.getElementById('cfg-home-footer-bg-video').value.trim(),

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

    // CTA styling fields
    const hasCustomCta = !!(plan.ctaBgColor || plan.ctaTextColor);
    document.getElementById('plan-cta-use-custom-input').checked = hasCustomCta;
    document.getElementById('plan-cta-bg-color-input').value = plan.ctaBgColor || '#000f22';
    document.getElementById('plan-cta-text-color-input').value = plan.ctaTextColor || '#ffffff';
    document.getElementById('plan-cta-format-input').value = plan.ctaFormat || 'default';
  } else {
    form.reset();
    document.getElementById('plan-sort-order-input').value = _plansList.length + 1;
    document.getElementById('plan-cta-use-custom-input').checked = false;
    document.getElementById('plan-cta-bg-color-input').value = '#000f22';
    document.getElementById('plan-cta-text-color-input').value = '#ffffff';
    document.getElementById('plan-cta-format-input').value = 'default';
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

  const useCustomCta = document.getElementById('plan-cta-use-custom-input').checked;

  const planData = {
    id: _editingPlanId || 'plan-' + Date.now(),
    name: document.getElementById('plan-name-input').value.trim(),
    price: document.getElementById('plan-price-input').value.trim(),
    period: document.getElementById('plan-period-input').value.trim(),
    desc: document.getElementById('plan-desc-input').value.trim(),
    features: features,
    ctaText: document.getElementById('plan-cta-text-input').value.trim() || 'Assinar',
    ctaUrl: document.getElementById('plan-cta-url-input').value.trim() || '#',
    ctaBgColor: useCustomCta ? document.getElementById('plan-cta-bg-color-input').value : '',
    ctaTextColor: useCustomCta ? document.getElementById('plan-cta-text-color-input').value : '',
    ctaFormat: document.getElementById('plan-cta-format-input').value,
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
  
  document.getElementById('cfg-blog-cta-url').value = cfg.blogCtaUrl || '';
  const hasCustomBlogCta = !!(cfg.blogCtaBgColor || cfg.blogCtaTextColor);
  document.getElementById('cfg-blog-cta-use-custom').checked = hasCustomBlogCta;
  document.getElementById('cfg-blog-cta-bg-color').value = cfg.blogCtaBgColor || '#000f22';
  document.getElementById('cfg-blog-cta-text-color').value = cfg.blogCtaTextColor || '#ffffff';
  document.getElementById('cfg-blog-cta-format').value = cfg.blogCtaFormat || 'default';

  // Leitura do Post (promocionais) - Sidebar
  document.getElementById('cfg-post-side-title').value = cfg.postSidebarCtaTitle || '';
  document.getElementById('cfg-post-side-sub').value = cfg.postSidebarCtaSub || '';
  document.getElementById('cfg-post-side-btn').value = cfg.postSidebarCtaBtnText || '';
  
  document.getElementById('cfg-post-side-url').value = cfg.postSidebarCtaUrl || '';
  const hasCustomPostSide = !!(cfg.postSidebarCtaBgColor || cfg.postSidebarCtaTextColor);
  document.getElementById('cfg-post-side-use-custom').checked = hasCustomPostSide;
  document.getElementById('cfg-post-side-bg-color').value = cfg.postSidebarCtaBgColor || '#000f22';
  document.getElementById('cfg-post-side-text-color').value = cfg.postSidebarCtaTextColor || '#ffffff';
  document.getElementById('cfg-post-side-format').value = cfg.postSidebarCtaFormat || 'default';

  // Leitura do Post (promocionais) - Inline
  document.getElementById('cfg-post-inline-title').value = cfg.postInlineCtaTitle || '';
  document.getElementById('cfg-post-inline-sub').value = cfg.postInlineCtaSub || '';
  document.getElementById('cfg-post-inline-btn').value = cfg.postInlineCtaBtnText || '';
  
  document.getElementById('cfg-post-inline-url').value = cfg.postInlineCtaUrl || '';
  const hasCustomPostInline = !!(cfg.postInlineCtaBgColor || cfg.postInlineCtaTextColor);
  document.getElementById('cfg-post-inline-use-custom').checked = hasCustomPostInline;
  document.getElementById('cfg-post-inline-bg-color').value = cfg.postInlineCtaBgColor || '#000f22';
  document.getElementById('cfg-post-inline-text-color').value = cfg.postInlineCtaTextColor || '#ffffff';
  document.getElementById('cfg-post-inline-format').value = cfg.postInlineCtaFormat || 'default';

  // Configurações de Anúncios (Ads)
  document.getElementById('cfg-google-ad-client').value = cfg.googleAdClient || '';
}

async function saveCmsBlogForm(e) {
  e.preventDefault();
  const btn = e.submitter || document.querySelector('#cms-blog-form [type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const useCustomBlogCta = document.getElementById('cfg-blog-cta-use-custom').checked;
  const useCustomPostSide = document.getElementById('cfg-post-side-use-custom').checked;
  const useCustomPostInline = document.getElementById('cfg-post-inline-use-custom').checked;

  const updated = {
    blogHeroEyebrow:      document.getElementById('cfg-blog-eyebrow').value.trim(),
    blogHeroTitle:        document.getElementById('cfg-blog-title').value.trim(),
    blogHeroSub:          document.getElementById('cfg-blog-sub').value.trim(),
    blogCtaTitle:         document.getElementById('cfg-blog-cta-title').value.trim(),
    blogCtaSub:           document.getElementById('cfg-blog-cta-sub').value.trim(),
    blogCtaBtnText:       document.getElementById('cfg-blog-cta-btn').value.trim(),
    blogCtaUrl:           document.getElementById('cfg-blog-cta-url').value.trim(),
    blogCtaBgColor:       useCustomBlogCta ? document.getElementById('cfg-blog-cta-bg-color').value : '',
    blogCtaTextColor:     useCustomBlogCta ? document.getElementById('cfg-blog-cta-text-color').value : '',
    blogCtaFormat:        document.getElementById('cfg-blog-cta-format').value,

    postSidebarCtaTitle:   document.getElementById('cfg-post-side-title').value.trim(),
    postSidebarCtaSub:     document.getElementById('cfg-post-side-sub').value.trim(),
    postSidebarCtaBtnText: document.getElementById('cfg-post-side-btn').value.trim(),
    postSidebarCtaUrl:     document.getElementById('cfg-post-side-url').value.trim(),
    postSidebarCtaBgColor: useCustomPostSide ? document.getElementById('cfg-post-side-bg-color').value : '',
    postSidebarCtaTextColor: useCustomPostSide ? document.getElementById('cfg-post-side-text-color').value : '',
    postSidebarCtaFormat:  document.getElementById('cfg-post-side-format').value,

    postInlineCtaTitle:   document.getElementById('cfg-post-inline-title').value.trim(),
    postInlineCtaSub:     document.getElementById('cfg-post-inline-sub').value.trim(),
    postInlineCtaBtnText: document.getElementById('cfg-post-inline-btn').value.trim(),
    postInlineCtaUrl:     document.getElementById('cfg-post-inline-url').value.trim(),
    postInlineCtaBgColor: useCustomPostInline ? document.getElementById('cfg-post-inline-bg-color').value : '',
    postInlineCtaTextColor: useCustomPostInline ? document.getElementById('cfg-post-inline-text-color').value : '',
    postInlineCtaFormat:  document.getElementById('cfg-post-inline-format').value,

    // Configurações de Ads no Blog
    googleAdClient: document.getElementById('cfg-google-ad-client').value.trim()
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


/* ── Gerenciador de Campanhas de Ads (CRUD) ── */

async function loadCampaigns() {
  const container = document.getElementById('campaigns-list');
  if (!container) return;

  container.innerHTML = `<div class="posts-loading"><div class="spinner"></div><p>Carregando campanhas...</p></div>`;

  const cfg = await getConfig();
  try {
    _campaignsList = typeof cfg.blogAdCampaigns === 'string' ? JSON.parse(cfg.blogAdCampaigns) : (cfg.blogAdCampaigns || []);
  } catch {
    _campaignsList = [];
  }

  // Ordena as campanhas por ordem crescente de sortOrder
  _campaignsList.sort((a, b) => (a.sortOrder || 99) - (b.sortOrder || 99));

  if (!_campaignsList.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--text-muted)">
        <div style="font-size:2.5rem;margin-bottom:1rem">🎯</div>
        <p style="font-weight:600">Nenhum anúncio cadastrado</p>
        <p style="font-size:.875rem;margin-top:.5rem">Clique em "Novo Anúncio" para começar.</p>
      </div>`;
    return;
  }

  const slotNames = {
    grid: 'Grid (Entre Posts)',
    sidebar: 'Lateral (Artigo)',
    inline: 'Meio (Artigo)'
  };

  const typeNames = {
    custom: 'Banner Customizado',
    google: 'Google AdSense'
  };

  container.innerHTML = _campaignsList.map(ad => {
    const validityText = (ad.startDate || ad.endDate)
      ? `${ad.startDate ? formatDate(ad.startDate) : 'S/I'} até ${ad.endDate ? formatDate(ad.endDate) : 'S/F'}`
      : 'Sempre ativo';
    
    // Botão de ativação rápida diretamente na linha
    const statusBtn = ad.active 
      ? `<button class="btn btn-sm" type="button" style="background:rgba(16,185,129,0.1);color:var(--green);border:1px solid var(--green)" onclick="toggleCampaignActive('${ad.id}')">🟢 ATIVO</button>`
      : `<button class="btn btn-sm btn-outline" type="button" style="color:var(--text-muted);border:1px solid var(--outline)" onclick="toggleCampaignActive('${ad.id}')">🔴 INATIVO</button>`;

    // Badge se houver artigo alvo específico
    const targetText = (ad.targetPost && ad.targetPost !== 'all')
      ? `<span style="background:var(--primary-muted);color:var(--accent);padding:2px 8px;border-radius:4px;font-size:0.75rem;font-weight:700">Artigo: ${ad.targetPost}</span>`
      : '';

    return `
      <div class="post-admin-item" data-id="${ad.id}">
        <div class="post-admin-cover" style="font-size:1.5rem;text-align:center;line-height:48px;background:rgba(255,255,255,0.05)">
          🎯
        </div>
        <div class="post-admin-info">
          <div class="post-admin-title" style="display:flex;align-items:center;gap:0.75rem">
            <span>${ad.name}</span>
            ${targetText}
          </div>
          <div class="post-admin-meta">
            Espaço: <strong>${slotNames[ad.slot] || ad.slot}</strong> &nbsp;·&nbsp; Tipo: <strong>${typeNames[ad.type] || ad.type}</strong> &nbsp;·&nbsp; Ordem: <strong>${ad.sortOrder || 1}</strong> &nbsp;·&nbsp; Validade: ${validityText}
          </div>
        </div>
        <div class="post-admin-actions" style="display:flex;align-items:center;gap:0.5rem">
          ${statusBtn}
          <button class="btn btn-sm btn-outline" type="button" onclick="openCampaignModalById('${ad.id}')">✏️ Editar</button>
          <button class="btn btn-sm btn-outline" type="button" style="border-color:var(--outline)" onclick="duplicateCampaign('${ad.id}')" title="Duplicar">📋 Duplicar</button>
          <button class="btn btn-sm" type="button" style="background:rgba(186,26,26,.1);color:var(--error);border:1px solid var(--error)" onclick="confirmDeleteCampaign('${ad.id}')">🗑</button>
        </div>
      </div>
    `;
  }).join('');
}

async function openCampaignModal(ad) {
  _editingCampaignId = ad ? ad.id : null;
  const modal = document.getElementById('campaign-modal-overlay');
  const title = document.getElementById('campaign-modal-title');
  const form  = document.getElementById('campaign-form');

  title.textContent = ad ? 'Editar Anúncio' : 'Novo Anúncio';

  // Preenche dinamicamente o select de artigos alvo
  const posts = await getPosts();
  const select = document.getElementById('campaign-target-post-input');
  if (select) {
    select.innerHTML = `
      <option value="all">Exibir em Todos os Artigos</option>
      ${posts.map(p => `<option value="${p.slug}">Apenas em: ${p.title}</option>`).join('')}
    `;
  }

  if (ad) {
    document.getElementById('campaign-name-input').value = ad.name || '';
    document.getElementById('campaign-slot-input').value = ad.slot || 'grid';
    document.getElementById('campaign-type-input').value = ad.type || 'custom';
    document.getElementById('campaign-slot-id-input').value = ad.googleSlot || '';
    document.getElementById('campaign-img-input').value = ad.customImg || '';
    document.getElementById('campaign-link-input').value = ad.customLink || '';
    document.getElementById('campaign-sort-order-input').value = ad.sortOrder || 1;
    document.getElementById('campaign-target-post-input').value = ad.targetPost || 'all';
    document.getElementById('campaign-start-date-input').value = ad.startDate || '';
    document.getElementById('campaign-end-date-input').value = ad.endDate || '';
    document.getElementById('campaign-active-input').checked = ad.active !== false;
  } else {
    form.reset();
    document.getElementById('campaign-sort-order-input').value = _campaignsList.length + 1;
    document.getElementById('campaign-target-post-input').value = 'all';
    document.getElementById('campaign-active-input').checked = true;
  }

  // Trigger select change to update fields visibility
  const typeInput = document.getElementById('campaign-type-input');
  typeInput.dispatchEvent(new Event('change'));

  modal.classList.add('open');
}

window.openCampaignModalById = function(id) {
  const ad = _campaignsList.find(c => c.id === id);
  if (ad) openCampaignModal(ad);
};

function closeCampaignModal() {
  document.getElementById('campaign-modal-overlay').classList.remove('open');
  _editingCampaignId = null;
}

async function saveCampaign(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  const type = document.getElementById('campaign-type-input').value;
  const isGoogle = type === 'google';

  const adData = {
    id: _editingCampaignId || 'ad-' + Date.now(),
    name: document.getElementById('campaign-name-input').value.trim(),
    slot: document.getElementById('campaign-slot-input').value,
    type: type,
    googleSlot: isGoogle ? document.getElementById('campaign-slot-id-input').value.trim() : '',
    customImg: !isGoogle ? document.getElementById('campaign-img-input').value.trim() : '',
    customLink: !isGoogle ? document.getElementById('campaign-link-input').value.trim() : '',
    sortOrder: parseInt(document.getElementById('campaign-sort-order-input').value) || 1,
    targetPost: document.getElementById('campaign-target-post-input').value,
    startDate: document.getElementById('campaign-start-date-input').value,
    endDate: document.getElementById('campaign-end-date-input').value,
    active: document.getElementById('campaign-active-input').checked
  };

  const existingIdx = _campaignsList.findIndex(c => c.id === adData.id);
  if (existingIdx !== -1) {
    _campaignsList[existingIdx] = adData;
  } else {
    _campaignsList.push(adData);
  }

  try {
    await saveConfig({ blogAdCampaigns: JSON.stringify(_campaignsList) });
    clearConfigCache();
    triggerDeployWebhook();
    closeCampaignModal();
    await loadCampaigns();
    showToast(_editingCampaignId ? '✅ Anúncio atualizado!' : '✅ Novo anúncio criado!', 'success');
  } catch (err) {
    showToast('❌ Erro ao salvar anúncio: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

window.toggleCampaignActive = async function(id) {
  const ad = _campaignsList.find(c => c.id === id);
  if (!ad) return;

  ad.active = !ad.active;

  try {
    await saveConfig({ blogAdCampaigns: JSON.stringify(_campaignsList) });
    clearConfigCache();
    triggerDeployWebhook();
    await loadCampaigns();
    showToast(ad.active ? '🟢 Anúncio ativado com sucesso!' : '🔴 Anúncio desativado com sucesso!', 'success');
  } catch (err) {
    showToast('❌ Erro ao alterar status: ' + err.message, 'error');
  }
};

window.duplicateCampaign = async function(id) {
  const ad = _campaignsList.find(c => c.id === id);
  if (!ad) return;

  // Nomeia com sufixo numérico: "Banner A" → "Banner A 2", "Banner A 2" → "Banner A 3" etc.
  const baseName = ad.name.replace(/\s+\d+$/, '').trim(); // Remove número existente no final
  const siblingNums = _campaignsList
    .filter(c => c.name === baseName || c.name.match(new RegExp('^' + baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s+\\d+$')))
    .map(c => {
      const m = c.name.match(/(\d+)$/);
      return m ? parseInt(m[1]) : 1;
    });
  const nextNum = (siblingNums.length > 0 ? Math.max(...siblingNums) : 1) + 1;
  const newName = baseName + ' ' + nextNum;

  // sortOrder único: pega o maior existente + 1
  const maxOrder = _campaignsList.reduce((m, c) => Math.max(m, c.sortOrder || 0), 0);

  const clone = {
    ...ad,
    id: 'ad-' + Date.now(),
    name: newName,
    sortOrder: maxOrder + 1,
    active: false
  };

  _campaignsList.push(clone);

  try {
    await saveConfig({ blogAdCampaigns: JSON.stringify(_campaignsList) });
    clearConfigCache();
    triggerDeployWebhook();
    await loadCampaigns();
    showToast(`📋 "${newName}" criado! (Inativo — ative quando estiver pronto)`, 'success');
  } catch (err) {
    showToast('❌ Erro ao duplicar: ' + err.message, 'error');
  }
};

window.confirmDeleteCampaign = async function(id) {
  if (!confirm('Tem certeza que deseja remover esta campanha de anúncio?')) return;

  _campaignsList = _campaignsList.filter(c => c.id !== id);
  try {
    await saveConfig({ blogAdCampaigns: JSON.stringify(_campaignsList) });
    clearConfigCache();
    triggerDeployWebhook();
    await loadCampaigns();
    showToast('🗑️ Campanha de anúncio removida.', 'success');
  } catch (err) {
    showToast('❌ Erro ao remover anúncio: ' + err.message, 'error');
  }
};


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

/* ── Subtabs e EmojiPicker ── */

function setupSubtabs() {
  document.querySelectorAll('.admin-subtab-btn[data-subtab]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.admin-section');
      parent.querySelectorAll('.admin-subtab-btn').forEach(b => b.classList.remove('active'));
      parent.querySelectorAll('.admin-subcard').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const targetId = btn.dataset.subtab;
      const targetCard = document.getElementById(targetId);
      if (targetCard) targetCard.classList.add('active');
    });
  });
}

const EmojiPicker = {
  activeInput: null,
  popover: null,
  emojis: [
    '📄','📋','🤝','🏠','🏢','🚗','💼','💑','📜','🏡','🛠️','👔','🤲','➕',
    '🔑','🔐','🔓','⚖️','💳','📈','🔒','📱','🎯','⚡','📖','✨','📁','💬',
    '❓','👣','📧','🔍','💡','💻','📅','⏱️','👤','💰','✉️','✏️','🗑️','⚙️',
    '👑','🏆','⭐','✅','❌','📚','🖊️','🖋️','🏛️','🌍','🔔','📦','📤','📥'
  ],
  init() {
    document.addEventListener('focusin', (e) => {
      const target = e.target;
      if (target && target.matches && target.matches('.step-icon, .feat-icon, .doc-emoji')) {
        this.show(target);
      }
    });

    document.addEventListener('mousedown', (e) => {
      if (this.popover && !this.popover.contains(e.target) && e.target !== this.activeInput) {
        this.hide();
      }
    });
  },
  show(input) {
    this.activeInput = input;
    if (!this.popover) {
      this.popover = document.createElement('div');
      this.popover.className = 'emoji-picker-popover';
      this.popover.innerHTML = this.emojis.map(emoji => `
        <button type="button" class="emoji-picker-btn" data-emoji="${emoji}">${emoji}</button>
      `).join('');

      this.popover.addEventListener('click', (e) => {
        const btn = e.target.closest('.emoji-picker-btn');
        if (btn && this.activeInput) {
          const emoji = btn.dataset.emoji;
          this.activeInput.value = emoji;
          this.activeInput.dispatchEvent(new Event('input', { bubbles: true }));
          this.activeInput.dispatchEvent(new Event('change', { bubbles: true }));
          this.hide();
        }
      });
    }

    document.body.appendChild(this.popover);
    
    const rect = input.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    let top = rect.bottom + scrollY + 5;
    let left = rect.left + scrollX;

    if (left + 280 > window.innerWidth) {
      left = window.innerWidth - 290;
    }
    if (rect.bottom + 220 > window.innerHeight) {
      top = rect.top + scrollY - 225;
    }

    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  },
  hide() {
    if (this.popover && this.popover.parentNode) {
      this.popover.parentNode.removeChild(this.popover);
    }
    this.activeInput = null;
  }
};
