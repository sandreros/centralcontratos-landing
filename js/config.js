/**
 * CENTRAL DE CONTRATOS — Site Configuration
 * ─────────────────────────────────────────────────────────────────
 * As configurações são salvas no Supabase (tabela landing_config).
 * Se o Supabase não estiver configurado, usa os valores DEFAULT abaixo.
 *
 * Uso:
 *   const cfg = await getConfig();
 *   await saveConfig({ ctaUrl: 'https://...' });
 */

const DEFAULT_CONFIG = {
  ctaUrl:           '#',
  ctaText:          'Comece Agora',
  ctaBgColor:       '',
  ctaTextColor:     '',
  ctaFormat:        'default',
  whatsapp:         '',
  siteName:         'Central de Contratos',
  tagline:          'Documentos jurídicos em minutos',
  siteDescription:  'Gere, personalize e revenda contratos profissionais com um clique.',
  contactEmail:     'contato@centraldecontratos.com.br',
  showWhatsappFloat: true,
  privacyPolicy:    '',
  logoUrl:          '',
  
  // Seção Hero
  heroBadge:        '⚡ Contratos Profissionais Instantâneos',
  heroHeadline:     'Documentos jurídicos em minutos, não em semanas',
  heroSub:          'Gere contratos de locação, compra e venda, prestação de serviços, união estável e muito mais — de forma simples, rápida e acessível. Sem advogado, sem burocracia.',
  heroSecCtaText:   'Ver como funciona',
  heroSecCtaUrl:    '',
  heroSecCtaBgColor: '',
  heroSecCtaTextColor: '',
  heroSecCtaFormat: 'default',
  heroStats:        JSON.stringify([
    { value: 5000, suffix: '+', label: 'Documentos gerados' },
    { value: 50, suffix: '+', label: 'Tipos de contrato' },
    { value: 98, suffix: '%', label: 'Satisfação' }
  ]),
  
  // Seções da Landing Page
  sectionHowWorks:  JSON.stringify({
    eyebrow: '📖 Como Funciona',
    title: 'Simples assim — 3 passos',
    desc: 'Qualquer pessoa consegue gerar um documento profissional. Sem conhecimento jurídica, sem complicação.',
    steps: [
      { icon: '📂', title: 'Escolha o modelo', desc: 'Mais de 50 tipos de contrato disponíveis. Locação, compra e venda, serviços, comodato, procuração e muito mais.' },
      { icon: '✍️', title: 'Preencha os dados', desc: 'Formulário simples e direto. Sem juridiquês. São só as informações essenciais das partes e do objeto do contrato.' },
      { icon: '📄', title: 'Baixe o PDF', desc: 'Documento profissional gerado em segundos. Pronto para imprimir, assinar e guardar. Reimpressão gratuita sempre que precisar.' }
    ]
  }),
  sectionBenefits:  JSON.stringify({
    eyebrow: '✨ Por que escolher a gente',
    title: 'Tudo que você precisa em um só lugar',
    desc: 'Da geração ao gerenciamento, a Central de Contratos cuida de toda a parte burocrática para você.',
    features: [
      { icon: '⚖️', title: 'Documentos validados', desc: 'Modelos elaborados com base na legislação brasileira vigente. Você gera com segurança e confiança.' },
      { icon: '💳', title: 'Créditos flexíveis', desc: 'Pague só pelo que usar. Compre pacotes de créditos e gere documentos conforme sua necessidade.' },
      { icon: '📈', title: 'Revenda e lucre', desc: 'Parceiros revendem os documentos com markup. Você define o preço e fica com a diferença.' },
      { icon: '🔒', title: '100% seguro', desc: 'Dados criptografados, sessão protegida e documentos com marca d\'água anti-cópia. Sua informação está segura.' },
      { icon: '📱', title: 'Funciona no celular', desc: 'Acesse de qualquer dispositivo. Gere contratos pelo smartphone sem precisar instalar nada.' },
      { icon: '🎯', title: 'Suporte dedicado', desc: 'Equipe pronta para ajudar em caso de dúvidas. Atendimento via WhatsApp e e-mail.' }
    ]
  }),
  sectionDocs:      JSON.stringify({
    eyebrow: '📁 Catálogo',
    title: 'Qual documento você precisa?',
    desc: 'Nosso catálogo cresce continuamente. Confira os principais modelos disponíveis.',
    docs: [
      { emoji: '🏠', name: 'Contrato de Locação Residencial' },
      { emoji: '🏢', name: 'Locação Comercial' },
      { emoji: '🤝', name: 'Compra e Venda de Imóvel' },
      { emoji: '🚗', name: 'Compra e Venda de Veículo' },
      { emoji: '💼', name: 'Prestação de Serviços' },
      { emoji: '💑', name: 'Declaração de União Estável' },
      { emoji: '📜', name: 'Procuração' },
      { emoji: '🏡', name: 'Contrato de Comodato' },
      { emoji: '🛠️', name: 'Contrato de Reforma/Obra' },
      { emoji: '👔', name: 'Contrato de Trabalho' },
      { emoji: '🤲', name: 'Declaração de Doação' },
      { emoji: '➕', name: 'E muito mais...' }
    ]
  }),
  sectionTestimonials: JSON.stringify({
    eyebrow: '💬 Depoimentos',
    title: 'O que nossos parceiros dizem',
    desc: 'Profissionais de todo o Brasil já usam a Central de Contratos para agilizar o dia a dia.',
    testimonials: [
      { stars: '★★★★★', text: '"Trabalho com locação de imóveis e antes perdia horas montando contratos. Hoje gero em 2 minutos e meus clientes ficam impressionados com o profissionalismo do documento."', avatar: 'RS', name: 'Rafael Santos', role: 'Corretor de Imóveis • São Paulo, SP' },
      { stars: '★★★★★', text: '"Sou MEI e precisava de um contrato de prestação de serviços. Em 5 minutos tinha o documento pronto, passável de assinar. O sistema é muito simples de usar."', avatar: 'CM', name: 'Camila Mendes', role: 'Consultora de Marketing • Belo Horizonte, MG' },
      { stars: '★★★★★', text: '"Revendo os serviços da Central de Contratos para meus clientes de administração e tenho uma fonte de renda extra fantástica. O suporte é excelente e o sistema nunca falhou."', avatar: 'JO', name: 'João Oliveira', role: 'Administrador de Condomínios • Curitiba, PR' }
    ]
  }),
  sectionFaq:       JSON.stringify({
    eyebrow: '❓ Dúvidas Frequentes',
    title: 'Perguntas frequentes',
    desc: 'Não encontrou o que procura? Entre em contato conosco.',
    faqs: [
      { q: 'Os contratos têm validade jurídica?', a: 'Sim. Os modelos da Central de Contratos são elaborados com base na legislação brasileira vigente — Código Civil, Lei do Inquilinato, CLT e outras normas aplicáveis. Um contrato entre partes tem validade plena quando assinado por ambos, com ou sem reconhecimento de firma. Para maior segurança jurídica em transações de alto valor, recomendamos registro em cartório.' },
      { q: 'O que são os créditos e como funcionam?', a: 'Cada crédito equivale à geração de 1 documento. Você compra um pacote de créditos e os usa conforme precisar. A reimpressão de um documento já gerado é gratuita e não consome créditos adicionais. Créditos não têm prazo de validade.' },
      { q: 'Preciso de advogado para usar a plataforma?', a: 'Não. A plataforma foi criada para ser usada por qualquer pessoa, sem necessidade de conhecimento jurídico. Os formulários são simples e objetivos. Para situações muito específicas ou de alto valor, sempre recomendamos consultar um profissional jurídico.' },
      { q: 'Como funciona a revenda de documentos?', a: 'Parceiros podem definir um preço de revenda para cada documento gerado. Você compra créditos por um valor e revende os documentos por um preço maior, ficando com a diferença. O sistema calcula automaticamente o seu ROI e exibe no painel. É uma ótima oportunidade de renda extra para corretores, administradores, contadores e outros profissionais.' },
      { q: 'Posso acessar pelo celular?', a: 'Sim, o sistema é 100% responsivo e funciona perfeitamente em smartphones e tablets. Não é necessário instalar nenhum aplicativo — basta acessar pelo navegador.' },
      { q: 'E se eu precisar de um modelo que não está disponível?', a: 'Você pode solicitar novos modelos diretamente pela plataforma. Nossa equipe analisa as solicitações e adiciona os modelos mais pedidos ao catálogo. O nosso acervo está em constante crescimento!' }
    ]
  }),
  
  // Rodapé & Planos
  footerDesc:       'A plataforma mais simples para gerar, personalizar e revender documentos jurídicos profissionais.',
  copyrightText:    '© Central de Contratos. Todos os direitos reservados.',
  pricingPlans:     JSON.stringify([
    { id: 'plan-1', name: 'Bronze', price: '49', period: 'Pague uma vez', desc: 'Perfeito para quem precisa de poucos documentos.', features: ['10 Créditos de Emissão', 'Mais de 50 Modelos', 'Reimpressão Gratuita', 'Validade Jurídica', 'Suporte por E-mail'], ctaText: 'Comprar Bronze', ctaUrl: '#', popular: false, sortOrder: 1 },
    { id: 'plan-2', name: 'Prata', price: '149', period: 'Pague uma vez', desc: 'O melhor custo-benefício para profissionais liberais.', features: ['50 Créditos de Emissão', 'Mais de 50 Modelos', 'Reimpressão Gratuita', 'Suporte via WhatsApp', 'Markup de Revenda Livre'], ctaText: 'Comprar Prata', ctaUrl: '#', popular: true, sortOrder: 2 },
    { id: 'plan-3', name: 'Ouro', price: '299', period: 'Pague uma vez', desc: 'Para imobiliárias e administradores de alta demanda.', features: ['120 Créditos de Emissão', 'Mais de 50 Modelos', 'Reimpressão Gratuita', 'Suporte prioritário 24/7', 'Markup de Revenda Livre', 'Dashboard Completo'], ctaText: 'Comprar Ouro', ctaUrl: '#', popular: false, sortOrder: 3 }
  ]),
  
  // Configurações do Blog
  blogHeroEyebrow:  '📚 Blog',
  blogHeroTitle:    'Aprenda sobre contratos de um jeito simples',
  blogHeroSub:      'Artigos práticos para quem quer entender seus direitos, formalizar relações e se proteger — sem precisar de um advogado para cada dúvida.',
  blogCtaTitle:     'Gere seu contrato agora',
  blogCtaSub:       'Coloque em prática o que aprendeu aqui. Simples, rápido e seguro.',
  blogCtaBtnText:   'Começar agora →',
  blogCtaUrl:       '',
  blogCtaBgColor:   '',
  blogCtaTextColor: '',
  blogCtaFormat:    'default',
  
  // Configurações do Post de Blog
  postInlineCtaTitle:   'Pronto para gerar o seu contrato?',
  postInlineCtaSub:     'Use a Central de Contratos e tenha seu documento profissional em menos de 5 minutos.',
  postInlineCtaBtnText: 'Gerar meu contrato →',
  postInlineCtaUrl:     '',
  postInlineCtaBgColor: '',
  postInlineCtaTextColor: '',
  postInlineCtaFormat:  'default',
  postSidebarCtaTitle:  'Gere seu contrato agora',
  postSidebarCtaSub:    'Documentos profissionais em minutos. Sem precisar de advogado.',
  postSidebarCtaBtnText: 'Começar →',
  postSidebarCtaUrl:     '',
  postSidebarCtaBgColor: '',
  postSidebarCtaTextColor: '',
  postSidebarCtaFormat:  'default',

  // Cores Gerais
  themePrimaryColor: '#000f22',
  themeAccentColor: '#EDB83D',
  themeBgColor: '#f7f9fb',
  themeTextColor: '#191c1e',
  themeNavbarBgColor: '#ffffff',
  themeNavbarTextColor: '#43474d',
  themeNavbarTextTransparentColor: '#ffffff',

  // Cores por Dobra
  themeHeroBg: '#000f22',
  themeHeroText: '#ffffff',
  themeHowBg: '#f7f9fb',
  themeHowText: '#191c1e',
  themeBenefitsBg: '#000f22',
  themeBenefitsText: '#ffffff',
  themeCatalogBg: '#f7f9fb',
  themeCatalogText: '#191c1e',
  themePricingBg: '#ffffff',
  themePricingText: '#191c1e',
  themeTestimonialsBg: '#f7f9fb',
  themeTestimonialsText: '#191c1e',
  themeFaqBg: '#ffffff',
  themeFaqText: '#191c1e',
  themeFooterBg: '#000f22',
  themeFooterText: '#ffffff',

  // Mídias de Fundo por Dobra
  themeHeroBgImage: '',
  themeHeroBgVideo: '',
  themeHowBgImage: '',
  themeHowBgVideo: '',
  themeBenefitsBgImage: '',
  themeBenefitsBgVideo: '',
  themeCatalogBgImage: '',
  themeCatalogBgVideo: '',
  themePricingBgImage: '',
  themePricingBgVideo: '',
  themeTestimonialsBgImage: '',
  themeTestimonialsBgVideo: '',
  themeFaqBgImage: '',
  themeFaqBgVideo: '',
  themeFooterBgImage: '',
  themeFooterBgVideo: '',

  // Configurações de Ads no Blog
  googleAdClient: '',
  adGridType: 'none',
  adGridImg: '',
  adGridLink: '',
  adGridSlot: '',
  adSidebarType: 'none',
  adSidebarImg: '',
  adSidebarLink: '',
  adSidebarSlot: '',
  adInlineType: 'none',
  adInlineImg: '',
  adInlineLink: '',
  adInlineSlot: '',
  blogAdCampaigns: '[]'
};

/** Cache em memória para evitar múltiplas chamadas na mesma página */
let _configCache = null;

/**
 * Retorna a configuração atual.
 * Prioridade: Supabase → DEFAULT_CONFIG
 * @returns {Promise<Object>}
 */
async function getConfig() {
  if (_configCache) return _configCache;

  const sbConfig = await sbFetchConfig();

  if (sbConfig && Object.keys(sbConfig).length > 0) {
    _configCache = { ...DEFAULT_CONFIG, ...sbConfig };
  } else {
    // Fallback: localStorage (compatibilidade retroativa) → DEFAULT
    try {
      const stored = JSON.parse(localStorage.getItem('cc_config') || '{}');
      _configCache = { ...DEFAULT_CONFIG, ...stored };
    } catch {
      _configCache = { ...DEFAULT_CONFIG };
    }
  }

  return _configCache;
}

/**
 * Salva a configuração no Supabase.
 * @param {Object} data
 */
async function saveConfig(data) {
  _configCache = { ...DEFAULT_CONFIG, ..._configCache, ...data };

  try {
    await sbSaveConfig(data);
  } catch (err) {
    // Fallback para localStorage se Supabase não estiver disponível
    console.warn('[Config] Supabase indisponível, salvando em localStorage:', err.message);
    localStorage.setItem('cc_config', JSON.stringify(_configCache));
    throw err; // re-throw para o chamador mostrar erro
  }
}

/** Invalida o cache (útil após salvar ou em reload) */
function clearConfigCache() {
  _configCache = null;
}

/**
 * Aplica estilos customizados de cores e formato a um elemento de botão/CTA.
 * @param {HTMLElement} element
 * @param {string} bgColor
 * @param {string} textColor
 * @param {string} format
 */
function applyCtaStyle(element, bgColor, textColor, format) {
  if (!element) return;
  if (bgColor) {
    element.style.setProperty('background', bgColor, 'important');
    element.style.setProperty('background-color', bgColor, 'important');
    element.style.setProperty('background-image', 'none', 'important');
  }
  if (textColor) {
    element.style.setProperty('color', textColor, 'important');
  }
  if (format && format !== 'default') {
    let radius = '1rem'; // default do tema (--radius-md)
    if (format === 'square') radius = '0px';
    else if (format === 'rounded') radius = '8px';
    else if (format === 'pill') radius = '9999px';
    element.style.setProperty('border-radius', radius, 'important');
  }
}

/* =================================================================
   LÓGICA DO TEMA CUSTOMIZADO DINÂMICO
   ================================================================= */

/**
 * Converte cor hex (#RRGGBB ou #RGB) para rgba(...) com canal alfa.
 */
function hexToRgba(hex, alpha = 1) {
  if (!hex || !hex.startsWith('#')) return hex;
  const cleanHex = hex.replace('#', '');
  let r, g, b;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return hex;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Retorna true se a cor hex for considerada clara (brilho >= 128).
 */
function isColorLight(hex) {
  if (!hex || !hex.startsWith('#')) return true;
  const cleanHex = hex.replace('#', '');
  let r, g, b;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    return true;
  }
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128;
}

/**
 * Gera os estilos CSS customizados para os cards internos de uma seção
 * com base na cor de fundo da mesma (contraste automático).
 */
function getSectionCardStyle(sectionId, bgCol, textCol) {
  const isLight = isColorLight(bgCol);
  const cardBg = isLight ? '#ffffff' : 'rgba(255, 255, 255, 0.05)';
  const cardBorder = isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255, 255, 255, 0.1)';
  const hoverBg = isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255, 255, 255, 0.08)';
  const titleColor = isLight ? 'var(--primary)' : '#ffffff';
  const descColor = isLight ? 'var(--text-muted)' : 'rgba(255,255,255,0.7)';

  return `
    #${sectionId} {
      background: ${bgCol} !important;
      color: ${textCol} !important;
    }
    #${sectionId} h2, #${sectionId} h3, #${sectionId} h4, #${sectionId} h5, #${sectionId} h6 {
      color: ${isLight ? 'var(--primary)' : '#ffffff'} !important;
    }
    #${sectionId} p, #${sectionId} .section-header p, #${sectionId} .hero-sub {
      color: ${descColor} !important;
    }
    #${sectionId} .step-card, #${sectionId} .feature-card, #${sectionId} .doc-type-card, #${sectionId} .testimonial-card, #${sectionId} .pricing-card {
      background: ${cardBg} !important;
      border-color: ${cardBorder} !important;
      color: ${textCol} !important;
    }
    #${sectionId} .step-card:hover, #${sectionId} .feature-card:hover, #${sectionId} .doc-type-card:hover, #${sectionId} .testimonial-card:hover, #${sectionId} .pricing-card:hover {
      background: ${hoverBg} !important;
    }
    #${sectionId} .step-card h3, #${sectionId} .feature-card h4, #${sectionId} .doc-type-card span, #${sectionId} .testimonial-card .testimonial-name, #${sectionId} .pricing-card .pricing-title {
      color: ${titleColor} !important;
    }
    #${sectionId} .step-card p, #${sectionId} .feature-card p, #${sectionId} .testimonial-card p, #${sectionId} .pricing-card p {
      color: ${descColor} !important;
    }
  `;
}

/**
 * Busca a configuração ativa e aplica as cores personalizadas no :root e nas seções.
 */
/**
 * Gerencia a renderização de mídia de fundo (imagem ou vídeo) e overlay de legibilidade em uma seção.
 */
function applySectionMedia(sectionIdOrSelector, bgCol, bgImg, bgVid) {
  const section = document.getElementById(sectionIdOrSelector) || document.querySelector(sectionIdOrSelector);
  if (!section) return;

  // Garante posicionamento relativo para z-indexing
  section.style.position = 'relative';
  section.style.overflow = 'hidden';

  // 1. Imagem de Fundo
  if (bgImg) {
    section.style.setProperty('background-image', `url('${bgImg}')`, 'important');
    section.style.setProperty('background-size', 'cover', 'important');
    section.style.setProperty('background-position', 'center', 'important');
    section.style.setProperty('background-repeat', 'no-repeat', 'important');
  } else {
    section.style.backgroundImage = '';
  }

  // 2. Vídeo de Fundo
  let videoEl = section.querySelector('.cc-bg-video');
  if (bgVid) {
    if (!videoEl) {
      videoEl = document.createElement('video');
      videoEl.className = 'cc-bg-video';
      videoEl.autoplay = true;
      videoEl.loop = true;
      videoEl.muted = true;
      videoEl.setAttribute('playsinline', '');
      videoEl.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; pointer-events: none;';
      section.insertBefore(videoEl, section.firstChild);
    }
    if (videoEl.src !== bgVid) {
      videoEl.src = bgVid;
      videoEl.load();
    }
  } else if (videoEl) {
    videoEl.remove();
  }

  // 3. Overlay de Legibilidade (Translucidez de fundo)
  let overlayEl = section.querySelector('.cc-bg-overlay');
  if (bgImg || bgVid) {
    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.className = 'cc-bg-overlay';
      overlayEl.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none;';
      section.insertBefore(overlayEl, videoEl ? videoEl.nextSibling : section.firstChild);
    }
    overlayEl.style.backgroundColor = hexToRgba(bgCol, 0.85); // 85% de opacidade sobre a mídia
  } else if (overlayEl) {
    overlayEl.remove();
  }
}

/**
 * Busca a configuração ativa e aplica as cores personalizadas no :root e nas seções.
 */
async function applyGlobalTheme() {
  if (document.body && document.body.classList.contains('admin-body')) {
    // Não aplica o tema do site principal ao painel admin
    return;
  }
  
  try {
    const cfg = await getConfig();

    const primary = cfg.themePrimaryColor || '#000f22';
    const accent = cfg.themeAccentColor || '#EDB83D';
    const bg = cfg.themeBgColor || '#f7f9fb';
    const text = cfg.themeTextColor || '#191c1e';
    const navBg = cfg.themeNavbarBgColor || '#ffffff';
    const navText = cfg.themeNavbarTextColor || '#43474d';
    const navTextTrans = cfg.themeNavbarTextTransparentColor || '#ffffff';

    // Cores de seções
    const hBg = cfg.themeHeroBg || '#000f22';
    const hText = cfg.themeHeroText || '#ffffff';
    const howBg = cfg.themeHowBg || '#f7f9fb';
    const howText = cfg.themeHowText || '#191c1e';
    const benBg = cfg.themeBenefitsBg || '#000f22';
    const benText = cfg.themeBenefitsText || '#ffffff';
    const catBg = cfg.themeCatalogBg || '#f7f9fb';
    const catText = cfg.themeCatalogText || '#191c1e';
    const prBg = cfg.themePricingBg || '#ffffff';
    const prText = cfg.themePricingText || '#191c1e';
    const testBg = cfg.themeTestimonialsBg || '#f7f9fb';
    const testText = cfg.themeTestimonialsText || '#191c1e';
    const faqBg = cfg.themeFaqBg || '#ffffff';
    const faqText = cfg.themeFaqText || '#191c1e';
    const fBg = cfg.themeFooterBg || '#000f22';
    const fText = cfg.themeFooterText || '#ffffff';

    const isHeroLight = isColorLight(hBg);
    const isFooterLight = isColorLight(fBg);

    // Aplicação das Mídias de Fundo por Dobra
    applySectionMedia('hero', hBg, cfg.themeHeroBgImage, cfg.themeHeroBgVideo);
    applySectionMedia('como-funciona', howBg, cfg.themeHowBgImage, cfg.themeHowBgVideo);
    applySectionMedia('beneficios', benBg, cfg.themeBenefitsBgImage, cfg.themeBenefitsBgVideo);
    applySectionMedia('documentos', catBg, cfg.themeCatalogBgImage, cfg.themeCatalogBgVideo);
    applySectionMedia('planos', prBg, cfg.themePricingBgImage, cfg.themePricingBgVideo);
    applySectionMedia('depoimentos', testBg, cfg.themeTestimonialsBgImage, cfg.themeTestimonialsBgVideo);
    applySectionMedia('faq', faqBg, cfg.themeFaqBgImage, cfg.themeFaqBgVideo);
    applySectionMedia('footer', fBg, cfg.themeFooterBgImage, cfg.themeFooterBgVideo);

    let style = document.getElementById('cc-custom-theme');
    if (!style) {
      style = document.createElement('style');
      style.id = 'cc-custom-theme';
      document.head.appendChild(style);
    }

    style.textContent = `
      :root {
        --primary: ${primary} !important;
        --primary-light: ${hexToRgba(primary, 1.2)} !important; /* Aproximação */
        --primary-muted: ${hexToRgba(primary, 0.06)} !important;
        --accent: ${accent} !important;
        --accent-dark: ${accent} !important;
        --accent-glow: ${hexToRgba(accent, 0.25)} !important;
        --bg: ${bg} !important;
        --text: ${text} !important;
        --text-muted: ${hexToRgba(text, 0.7)} !important;
        --outline: ${hexToRgba(text, 0.15)} !important;
      }
      
      /* Ajuste da Navbar customizada */
      .navbar.scrolled {
        background: ${hexToRgba(navBg, 0.9)} !important;
      }
      .navbar.scrolled .nav-logo {
        color: ${primary} !important;
      }
      .navbar.scrolled .nav-links a {
        color: ${navText} !important;
      }
      .navbar.scrolled .nav-links a:hover {
        color: ${primary} !important;
        background: ${hexToRgba(primary, 0.06)} !important;
      }
      .navbar.scrolled .hamburger span {
        background: ${primary} !important;
      }
      
      .navbar:not(.scrolled) .nav-logo {
        color: ${navTextTrans} !important;
      }
      .navbar:not(.scrolled) .nav-links a {
        color: ${hexToRgba(navTextTrans, 0.8)} !important;
      }
      .navbar:not(.scrolled) .nav-links a:hover {
        color: ${navTextTrans} !important;
        background: ${hexToRgba(navTextTrans, 0.08)} !important;
      }
      .navbar:not(.scrolled) .hamburger span {
        background: ${navTextTrans} !important;
      }
      .navbar:not(.scrolled) .btn-primary {
        background: ${accent} !important;
        color: ${primary} !important;
        box-shadow: 0 4px 14px ${hexToRgba(accent, 0.25)} !important;
      }
      .navbar:not(.scrolled) .btn-primary:hover {
        background: ${hexToRgba(accent, 0.9)} !important;
      }

      /* Dobra Hero */
      #hero {
        background: ${hBg} !important;
        color: ${hText} !important;
      }
      #hero h1 {
        color: ${isHeroLight ? 'var(--primary)' : '#ffffff'} !important;
      }
      #hero p, #hero .hero-sub {
        color: ${isHeroLight ? 'var(--text-muted)' : 'rgba(255,255,255,0.7)'} !important;
      }
      #hero .btn-ghost {
        border-color: ${isHeroLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)'} !important;
        color: ${isHeroLight ? 'var(--primary)' : '#ffffff'} !important;
        background: ${isHeroLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.12)'} !important;
      }

      /* Estilos Contextuais dos Cards por Dobra (Contraste Inteligente) */
      ${getSectionCardStyle('como-funciona', howBg, howText)}
      ${getSectionCardStyle('beneficios', benBg, benText)}
      ${getSectionCardStyle('documentos', catBg, catText)}
      ${getSectionCardStyle('planos', prBg, prText)}
      ${getSectionCardStyle('depoimentos', testBg, testText)}
      ${getSectionCardStyle('faq', faqBg, faqText)}

      /* Rodapé */
      footer {
        background: ${fBg} !important;
        color: ${fText} !important;
      }
      footer h5, footer h6, footer .footer-brand-logo {
        color: ${isFooterLight ? 'var(--primary)' : '#ffffff'} !important;
      }
      footer p, footer a {
        color: ${isFooterLight ? 'var(--text-muted)' : 'rgba(255,255,255,0.7)'} !important;
      }
      footer a:hover {
        color: ${accent} !important;
      }
      footer .footer-bottom {
        border-top-color: ${isFooterLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)'} !important;
      }

      /* Estilos de Anúncios (Ads) no Blog */
      .blog-ad-card, .sidebar-ad-card, .inline-ad-card {
        position: relative;
        display: block;
        overflow: hidden;
        border-radius: var(--radius-lg);
        border: 1px solid var(--outline) !important;
        background: var(--surface-low) !important;
      }
      .blog-ad-card {
        aspect-ratio: 16/10;
        box-shadow: var(--shadow-sm);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .blog-ad-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
      }
      .blog-ad-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s;
      }
      .sidebar-ad-card img, .inline-ad-card img {
        width: 100%;
        height: auto;
        display: block;
        transition: transform 0.3s;
      }
      .blog-ad-card:hover img, .sidebar-ad-card:hover img, .inline-ad-card:hover img {
        transform: scale(1.03);
      }
      .ad-badge {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        background: rgba(0,0,0,0.6);
        color: white !important;
        font-size: 0.625rem;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        z-index: 10;
      }
      
      /* Camadas de z-index para mídia de fundo */
      #hero > *:not(.cc-bg-video):not(.cc-bg-overlay),
      #como-funciona > *:not(.cc-bg-video):not(.cc-bg-overlay),
      #beneficios > *:not(.cc-bg-video):not(.cc-bg-overlay),
      #documentos > *:not(.cc-bg-video):not(.cc-bg-overlay),
      #planos > *:not(.cc-bg-video):not(.cc-bg-overlay),
      #depoimentos > *:not(.cc-bg-video):not(.cc-bg-overlay),
      #faq > *:not(.cc-bg-video):not(.cc-bg-overlay),
      footer > *:not(.cc-bg-video):not(.cc-bg-overlay) {
        position: relative !important;
        z-index: 2 !important;
      }

      /* Blog Hero & Post Hero — tema din\u00e2mico */
      .blog-hero {

        background: ${hBg} !important;
        color: ${hText} !important;
      }
      .blog-hero h1, .blog-hero .display-2 {
        color: ${isHeroLight ? 'var(--primary)' : '#ffffff'} !important;
      }
      .blog-hero p, .blog-hero #blog-hero-sub {
        color: ${isHeroLight ? 'var(--text-muted)' : 'rgba(255,255,255,0.7)'} !important;
      }
      .blog-hero #blog-hero-eyebrow {
        background: ${isHeroLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)'} !important;
        border-color: ${isHeroLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.2)'} !important;
        color: ${accent} !important;
      }
      .post-hero {
        background: ${hBg} !important;
        color: ${hText} !important;
      }
      .post-hero h1, .post-hero .post-title {
        color: ${isHeroLight ? 'var(--primary)' : '#ffffff'} !important;
      }
      .post-hero .post-meta-hero, .post-hero .meta-item {
        color: ${isHeroLight ? 'var(--text-muted)' : 'rgba(255,255,255,0.65)'} !important;
      }
      .post-hero .post-breadcrumb a {
        color: ${isHeroLight ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)'} !important;
      }
      .post-hero .post-breadcrumb span {
        color: ${isHeroLight ? 'var(--text-muted)' : 'rgba(255,255,255,0.4)'} !important;
      }
      .filter-btn {
        color: ${isHeroLight ? 'var(--primary)' : 'rgba(255,255,255,0.8)'} !important;
        border-color: ${isHeroLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)'} !important;
      }
      .filter-btn.active {
        background: ${accent} !important;
        color: ${primary} !important;
        border-color: ${accent} !important;
      }
    `;
  } catch (err) {
    console.error('[Theme] Falha ao injetar estilos customizados:', err);
  }
}

// Inicializa a aplicação do tema automaticamente
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyGlobalTheme);
} else {
  applyGlobalTheme();
}

