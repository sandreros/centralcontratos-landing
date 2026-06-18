/* ================================================================
   PRIVACY.JS — Script de Suporte para Página de Privacidade
   ================================================================ */

document.addEventListener('DOMContentLoaded', async () => {
  setupNavbar();
  setupMobileMenu();

  // Busca configurações do Supabase (Fallback automático para padrão se indisponível)
  const cfg = await getConfig();

  applyBranding(cfg);
  applyFooterEmail(cfg);
  setupWhatsapp(cfg);
});

function setupNavbar() {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function setupMobileMenu() {
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
}

function applyBranding(cfg) {
  const siteName = cfg.siteName || 'Central de Contratos';
  document.title = `Política de Privacidade — ${siteName}`;

  // Se o admin gravou um texto de política customizado, aplica-o e processa placeholders
  if (cfg.privacyPolicy) {
    const postBody = document.querySelector('.post-body');
    if (postBody) {
      let content = cfg.privacyPolicy;
      const email = cfg.contactEmail || 'contato@centraldecontratos.com.br';
      const siteUrl = window.location.origin;

      // Substituição de placeholders
      content = content
        .replace(/\{\{siteName\}\}/g, siteName)
        .replace(/\{\{contactEmail\}\}/g, email)
        .replace(/\{\{email\}\}/g, email)
        .replace(/\{\{siteUrl\}\}/g, siteUrl);

      postBody.innerHTML = content;
    }
  }

  // Nome do site em elementos genéricos
  document.querySelectorAll('[data-site-name]').forEach(el => {
    el.textContent = siteName;
  });

  // Nome do site em formato de link ou URL
  const siteUrl = window.location.origin;
  document.querySelectorAll('[data-site-url]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = siteUrl;
    }
    el.textContent = siteUrl.replace(/^https?:\/\//, '');
  });
}

function applyFooterEmail(cfg) {
  const email = cfg.contactEmail || 'contato@centraldecontratos.com.br';
  
  // Elemento específico de e-mail na política
  document.querySelectorAll('[data-contact-email]').forEach(el => {
    if (el.tagName === 'A') {
      el.href = 'mailto:' + email;
    }
    el.textContent = email;
  });

  const footerEmail = document.getElementById('footer-email');
  if (footerEmail) {
    footerEmail.href = 'mailto:' + email;
    footerEmail.textContent = email;
  }
}

function setupWhatsapp(cfg) {
  const el = document.getElementById('wa-float');
  if (!el) return;
  if (!cfg.whatsapp || !cfg.showWhatsappFloat) {
    el.classList.add('hidden');
    return;
  }
  el.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre a Central de Contratos.')}`;
  el.classList.remove('hidden');
}
