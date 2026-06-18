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
  heroStats:        JSON.stringify([
    { value: 5000, suffix: '+', label: 'Documentos gerados' },
    { value: 50, suffix: '+', label: 'Tipos de contrato' },
    { value: 98, suffix: '%', label: 'Satisfação' }
  ]),
  
  // Seções da Landing Page
  sectionHowWorks:  JSON.stringify({
    eyebrow: '📖 Como Funciona',
    title: 'Simples assim — 3 passos',
    desc: 'Qualquer pessoa consegue gerar um documento profissional. Sem conhecimento jurídico, sem complicação.',
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
  
  // Configurações do Post de Blog
  postInlineCtaTitle:   'Pronto para gerar o seu contrato?',
  postInlineCtaSub:     'Use a Central de Contratos e tenha seu documento profissional em menos de 5 minutos.',
  postInlineCtaBtnText: 'Gerar meu contrato →',
  postSidebarCtaTitle:  'Gere seu contrato agora',
  postSidebarCtaSub:    'Documentos profissionais em minutos. Sem precisar de advogado.',
  postSidebarCtaBtnText: 'Começar →'
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
