/* ===========================
   ADMIN.JS — Admin Panel
   =========================== */

const ADMIN_SESSION_KEY = 'cc_admin_session';

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
});

// ─── Auth ──────────────────────────────────────────────

function checkAuth() {
  const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (session === 'ok') {
    showPanel();
  } else {
    showLogin();
  }
}

function showLogin() {
  document.getElementById('admin-login').style.display = 'flex';
  document.getElementById('admin-main').style.display  = 'none';

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const cfg = getConfig();
    const pwd = document.getElementById('login-password').value;
    if (pwd === cfg.adminPassword) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'ok');
      showPanel();
    } else {
      document.getElementById('login-error').textContent = 'Senha incorreta. Tente novamente.';
      document.getElementById('login-error').style.display = 'block';
    }
  });
}

function showPanel() {
  document.getElementById('admin-login').style.display = 'none';
  document.getElementById('admin-main').style.display  = 'flex';
  initPanel();
}

function logout() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
  location.reload();
}

// ─── Panel Init ────────────────────────────────────────

function initPanel() {
  loadConfigForm();
  loadPosts();
  setupNavItems();
  document.getElementById('btn-logout').addEventListener('click', logout);
  document.getElementById('config-form').addEventListener('submit', saveConfigForm);
  document.getElementById('btn-new-post').addEventListener('click', () => openPostModal(null));
  document.getElementById('post-form').addEventListener('submit', savePost);
  document.getElementById('btn-close-modal').addEventListener('click', closePostModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) closePostModal();
  });
  document.getElementById('btn-export').addEventListener('click', exportSettings);
  document.getElementById('btn-import').addEventListener('click', () => document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change', importSettings);
}

// ─── Navigation ────────────────────────────────────────

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

// ─── Config Form ────────────────────────────────────────

function loadConfigForm() {
  const cfg = getConfig();
  document.getElementById('cfg-cta-url').value      = cfg.ctaUrl || '';
  document.getElementById('cfg-cta-text').value     = cfg.ctaText || 'Comece Agora';
  document.getElementById('cfg-whatsapp').value     = cfg.whatsapp || '';
  document.getElementById('cfg-email').value        = cfg.contactEmail || '';
  document.getElementById('cfg-password').value     = cfg.adminPassword || '';
  document.getElementById('cfg-wa-float').checked   = cfg.showWhatsappFloat !== false;
}

function saveConfigForm(e) {
  e.preventDefault();
  const current = getConfig();
  const updated = {
    ...current,
    ctaUrl:          document.getElementById('cfg-cta-url').value.trim(),
    ctaText:         document.getElementById('cfg-cta-text').value.trim() || 'Comece Agora',
    whatsapp:        document.getElementById('cfg-whatsapp').value.trim().replace(/\D/g, ''),
    contactEmail:    document.getElementById('cfg-email').value.trim(),
    adminPassword:   document.getElementById('cfg-password').value || current.adminPassword,
    showWhatsappFloat: document.getElementById('cfg-wa-float').checked,
  };
  saveConfig(updated);
  showToast('✅ Configurações salvas com sucesso!', 'success');
}

// ─── Posts CRUD ────────────────────────────────────────

function loadPosts() {
  const posts = getPosts();
  const list  = document.getElementById('posts-list');
  const count = document.getElementById('posts-count');

  count.textContent = posts.length + ' post' + (posts.length !== 1 ? 's' : '');

  if (!posts.length) {
    list.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-muted)">
      <div style="font-size:2.5rem;margin-bottom:1rem">📝</div>
      <p style="font-weight:600">Nenhum post ainda</p>
      <p style="font-size:.875rem;margin-top:.5rem">Clique em "Novo Post" para começar.</p>
    </div>`;
    return;
  }

  list.innerHTML = posts.map((post, idx) => `
    <div class="post-admin-item">
      <div class="post-admin-cover">
        ${post.cover
          ? `<img src="${post.cover.replace('../', '../')}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.parentElement.textContent='📄'">`
          : '📄'}
      </div>
      <div class="post-admin-info">
        <div class="post-admin-title">${post.title}</div>
        <div class="post-admin-meta">
          <span style="background:${post.categoryColor||'#000f22'};color:white;padding:1px 8px;border-radius:99px;font-size:.6875rem;font-weight:700">${post.category}</span>
          &nbsp;·&nbsp; ${formatDate(post.date)} &nbsp;·&nbsp; ${post.readTime}
        </div>
      </div>
      <div class="post-admin-actions">
        <button class="btn btn-sm btn-outline" onclick="openPostModal(${idx})">✏️ Editar</button>
        <button class="btn btn-sm" style="background:rgba(186,26,26,.1);color:var(--error);border:1px solid var(--error)" onclick="deletePost(${idx})">🗑</button>
      </div>
    </div>
  `).join('');
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch { return dateStr; }
}

let editingIndex = null;

function openPostModal(idx) {
  editingIndex = idx;
  const modal = document.getElementById('modal-overlay');
  const title = document.getElementById('modal-title');
  const form  = document.getElementById('post-form');

  title.textContent = idx === null ? 'Novo Post' : 'Editar Post';

  if (idx !== null) {
    const post = getPosts()[idx];
    form.elements['post-title'].value    = post.title || '';
    form.elements['post-slug'].value     = post.slug  || '';
    form.elements['post-category'].value = post.category || '';
    form.elements['post-cat-color'].value = post.categoryColor || '#000f22';
    form.elements['post-author'].value   = post.author || 'Equipe Central de Contratos';
    form.elements['post-date'].value     = post.date  || '';
    form.elements['post-read'].value     = post.readTime || '5 min';
    form.elements['post-cover'].value    = post.cover || '';
    form.elements['post-excerpt'].value  = post.excerpt || '';
    form.elements['post-content'].value  = post.content || '';
  } else {
    form.reset();
    form.elements['post-author'].value = 'Equipe Central de Contratos';
    form.elements['post-date'].value   = new Date().toISOString().split('T')[0];
    form.elements['post-read'].value   = '5 min';
    form.elements['post-cat-color'].value = '#000f22';
  }

  // Auto-generate slug from title
  form.elements['post-title'].addEventListener('input', () => {
    if (idx === null) {
      form.elements['post-slug'].value = slugify(form.elements['post-title'].value);
    }
  }, { once: false });

  modal.classList.add('open');
}

function closePostModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  editingIndex = null;
}

function savePost(e) {
  e.preventDefault();
  const form = e.target;
  const posts = getPosts().slice(); // copy

  const newPost = {
    id: editingIndex !== null ? posts[editingIndex].id : String(Date.now()),
    title:         form.elements['post-title'].value.trim(),
    slug:          form.elements['post-slug'].value.trim() || slugify(form.elements['post-title'].value),
    category:      form.elements['post-category'].value.trim(),
    categoryColor: form.elements['post-cat-color'].value,
    author:        form.elements['post-author'].value.trim(),
    date:          form.elements['post-date'].value,
    readTime:      form.elements['post-read'].value.trim(),
    cover:         form.elements['post-cover'].value.trim(),
    excerpt:       form.elements['post-excerpt'].value.trim(),
    content:       form.elements['post-content'].value,
  };

  if (editingIndex !== null) {
    posts[editingIndex] = newPost;
  } else {
    posts.unshift(newPost);
  }

  savePosts(posts);
  closePostModal();
  loadPosts();
  showToast(editingIndex !== null ? '✅ Post atualizado!' : '✅ Post criado!', 'success');
}

function deletePost(idx) {
  if (!confirm('Tem certeza que deseja remover este post?')) return;
  const posts = getPosts().slice();
  posts.splice(idx, 1);
  savePosts(posts);
  loadPosts();
  showToast('🗑 Post removido.', 'success');
}

// ─── Export / Import ────────────────────────────────────

function exportSettings() {
  const data = {
    config: getConfig(),
    posts:  getPosts(),
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `cc-admin-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📦 Backup exportado!', 'success');
}

function importSettings(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (data.config) saveConfig(data.config);
      if (data.posts)  savePosts(data.posts);
      loadConfigForm();
      loadPosts();
      showToast('✅ Backup importado com sucesso!', 'success');
    } catch {
      showToast('❌ Arquivo inválido.', 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ─── Helpers ────────────────────────────────────────────

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
    setTimeout(() => toast.classList.remove('show'), 3000);
  });
}
