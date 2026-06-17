/* ===========================
   MAIN.JS — Landing Page
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  const cfg = getConfig();

  // ── Apply config ─────────────────────────────────────
  applyCTAs(cfg);
  applyWhatsApp(cfg);

  // ── Navbar scroll effect ──────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile menu ───────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    // Close when a link is clicked
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // ── Smooth scroll for anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Scroll reveal ─────────────────────────────────────
  setupReveal();

  // ── FAQ accordion ─────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // close all
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

  // ── Counter animation ─────────────────────────────────
  setupCounters();
});

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
}

function setupReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

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
    const target = parseInt(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    let start = null;

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();

      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target).toLocaleString('pt-BR') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.5 });

    obs.observe(el);
  });
}
