/**
 * CENTRAL DE CONTRATOS — Site Configuration
 * Edite os valores padrão aqui, ou use o painel Admin (/admin/) para atualizar sem mexer no código.
 */

const DEFAULT_CONFIG = {
  /** URL do botão "Comece Agora" (CTA principal). Ex: link de pagamento ou cadastro */
  ctaUrl: '#',
  /** Texto do botão CTA principal */
  ctaText: 'Comece Agora',
  /** Número do WhatsApp com DDI. Ex: "5511999999999" */
  whatsapp: '',
  /** Nome do site */
  siteName: 'Central de Contratos',
  /** Tagline do site */
  tagline: 'Documentos jurídicos em minutos',
  /** Descrição para SEO */
  siteDescription: 'Gere, personalize e revenda contratos profissionais com um clique. Contratos de locação, compra e venda, prestação de serviços e muito mais.',
  /** Senha de acesso ao painel admin */
  adminPassword: 'admin@2024',
  /** E-mail de contato exibido no footer */
  contactEmail: 'contato@centraldecontratos.com.br',
  /** Mostrar botão WhatsApp flutuante */
  showWhatsappFloat: true,
};

/**
 * Retorna a config mesclando padrões com valores salvos pelo admin no localStorage.
 */
function getConfig() {
  try {
    const stored = JSON.parse(localStorage.getItem('cc_config') || '{}');
    return { ...DEFAULT_CONFIG, ...stored };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

/**
 * Salva a config no localStorage (usado pelo painel admin).
 */
function saveConfig(data) {
  localStorage.setItem('cc_config', JSON.stringify(data));
}
