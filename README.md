# Central de Contratos — Landing Page & Blog

Site institucional e blog da plataforma **Central de Contratos**. Construído com HTML + CSS + JS puro — sem dependências de framework, pronto para hospedar em qualquer CDN, GitHub Pages ou Vercel.

---

## 📁 Estrutura

```
├── index.html            ← Landing page principal
├── blog/
│   ├── index.html        ← Lista de posts do blog
│   └── post.html         ← Página de post individual (URL: ?slug=nome-do-post)
├── admin/
│   └── index.html        ← Painel admin (senha protegida)
├── css/
│   └── style.css         ← Design system completo
├── js/
│   ├── config.js         ← Configurações do site (CTA, WhatsApp, etc.)
│   ├── posts.js          ← Posts padrão do blog
│   ├── main.js           ← Landing page JS
│   ├── blog-list.js      ← Blog listagem JS
│   ├── blog-post.js      ← Blog post individual JS
│   └── admin.js          ← Painel admin JS
└── assets/
    ├── logo.png           ← Logo do site
    ├── hero-dashboard.png ← Imagem do hero (opcional)
    └── blog/
        ├── locacao.png
        ├── compra-venda.png
        ├── uniao-estavel.png
        ├── freelancer.png
        └── mei.png
```

---

## 🚀 Deploy no GitHub Pages

1. Crie um repositório no GitHub (ex: `centralcontratos-landing`)
2. Faça push deste projeto:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page e blog"
   git remote add origin https://github.com/SEU_USUARIO/centralcontratos-landing.git
   git push -u origin main
   ```
3. No GitHub → **Settings → Pages → Source: Deploy from a branch → main → / (root)**
4. Acesse em: `https://SEU_USUARIO.github.io/centralcontratos-landing`

---

## ⚙️ Como configurar (sem tocar no código)

Acesse o painel admin em:
```
seu-site.com/admin/
```

**Senha padrão:** `admin@2024`

No painel você pode:
- ✅ Definir a **URL do botão CTA** (link de pagamento, cadastro, etc.)
- ✅ Configurar o **número de WhatsApp**
- ✅ Criar, editar e remover **posts do blog**
- ✅ Exportar/importar configurações como JSON (backup)

---

## ✏️ Para mudar configurações de forma permanente

Edite o arquivo `js/config.js` — os valores `DEFAULT_CONFIG` são os padrões que aparecem quando o admin não alterou nada:

```js
const DEFAULT_CONFIG = {
  ctaUrl: 'https://link-do-sistema.com',  // ← URL do botão principal
  whatsapp: '5511999999999',              // ← Seu WhatsApp
  // ...
};
```

Para posts padrão, edite `js/posts.js`.

---

## 🎨 Design

- **Cores:** Azul marinho `#000f22` + Dourado `#EDB83D` + Verde `#1a9e70`
- **Fontes:** Inter (corpo) + Manrope (títulos) via Google Fonts
- **Responsivo:** Mobile, tablet e desktop
- **Animações:** Scroll reveal + FAQ accordion + hover effects

---

## 🔒 Segurança do Painel Admin

O painel usa `sessionStorage` para a sessão e `localStorage` para persistir configurações. **Por segurança:**
- Não publique a URL do admin amplamente
- Altere a senha padrão no primeiro acesso
- Faça backups regulares via "Exportar"

---

## 📄 Licença

Uso exclusivo da Central de Contratos.
