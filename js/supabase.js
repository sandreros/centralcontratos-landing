/**
 * CENTRAL DE CONTRATOS — Supabase Client & Data Layer
 * ─────────────────────────────────────────────────────────────────
 * Centraliza todas as operações com o Supabase:
 *  • Autenticação do admin (Supabase Auth)
 *  • CRUD de configurações (landing_config)
 *  • CRUD de posts do blog (blog_posts)
 *
 * Requer: supabase-config.js carregado antes deste arquivo.
 */

/* ── Init ──────────────────────────────────────────────────────── */

let _supabase = null;

function getSupabaseClient() {
  if (_supabase) return _supabase;

  if (typeof SUPABASE_URL === 'undefined' || SUPABASE_URL.includes('SEU-PROJETO')) {
    console.warn('[Supabase] Credenciais não configuradas. Usando dados locais como fallback.');
    return null;
  }

  try {
    _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        storageKey: 'cc_landing_auth',
      }
    });
  } catch (err) {
    console.error('[Supabase] Erro ao inicializar cliente:', err);
    return null;
  }

  return _supabase;
}


/* ── Auth ──────────────────────────────────────────────────────── */

/**
 * Login do admin via Supabase Auth.
 * @param {string} email
 * @param {string} password
 * @returns {{ data, error }}
 */
async function sbSignIn(email, password) {
  const sb = getSupabaseClient();
  if (!sb) return { data: null, error: { message: 'Supabase não configurado.' } };

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  return { data, error };
}

/**
 * Logout do admin.
 */
async function sbSignOut() {
  const sb = getSupabaseClient();
  if (!sb) return;
  await sb.auth.signOut();
}

/**
 * Retorna a sessão atual (null se não autenticado).
 */
async function sbGetSession() {
  const sb = getSupabaseClient();
  if (!sb) return null;
  const { data: { session } } = await sb.auth.getSession();
  return session;
}


/* ── Config ────────────────────────────────────────────────────── */

/**
 * Busca as configurações do site no Supabase.
 * Retorna um objeto chave-valor (mesmo formato do DEFAULT_CONFIG).
 */
async function sbFetchConfig() {
  const sb = getSupabaseClient();
  if (!sb) return null;

  try {
    const { data, error } = await sb
      .from('landing_config')
      .select('key, value');

    if (error) throw error;

    // Converte array [{key, value}] → objeto plano
    const result = {};
    (data || []).forEach(row => {
      // Converte 'true'/'false' para boolean
      if (row.value === 'true')       result[row.key] = true;
      else if (row.value === 'false') result[row.key] = false;
      else                            result[row.key] = row.value;
    });

    return result;
  } catch (err) {
    console.error('[Supabase] Erro ao buscar config:', err);
    return null;
  }
}

/**
 * Salva (upsert) as configurações do site no Supabase.
 * @param {Object} configObj — objeto chave-valor
 */
async function sbSaveConfig(configObj) {
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Supabase não configurado.');

  const rows = Object.entries(configObj).map(([key, value]) => ({
    key,
    value: String(value),
  }));

  const { error } = await sb
    .from('landing_config')
    .upsert(rows, { onConflict: 'key' });

  if (error) throw error;
}


/* ── Posts ─────────────────────────────────────────────────────── */

/**
 * Busca todos os posts publicados, ordenados por data decrescente.
 * Admin (autenticado) vê também os não publicados.
 */
async function sbFetchPosts() {
  const sb = getSupabaseClient();
  if (!sb) return null;

  try {
    const session = await sbGetSession();
    let query = sb
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false });

    // Visitante comum só vê publicados (RLS garante, mas filtramos também)
    if (!session) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;
    if (error) throw error;

    return (data || []).map(dbPostToJs);
  } catch (err) {
    console.error('[Supabase] Erro ao buscar posts:', err);
    return null;
  }
}

/**
 * Busca um único post pelo slug.
 */
async function sbFetchPostBySlug(slug) {
  const sb = getSupabaseClient();
  if (!sb) return null;

  try {
    const { data, error } = await sb
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw error;
    return data ? dbPostToJs(data) : null;
  } catch (err) {
    console.error('[Supabase] Erro ao buscar post:', err);
    return null;
  }
}

/**
 * Cria ou atualiza um post.
 * @param {Object} post — objeto no formato JS (campos camelCase)
 * @returns {Object} post salvo
 */
async function sbUpsertPost(post) {
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Supabase não configurado.');

  const row = jsPostToDb(post);

  const { data, error } = await sb
    .from('blog_posts')
    .upsert(row)
    .select()
    .single();

  if (error) throw error;
  return dbPostToJs(data);
}

/**
 * Remove um post pelo id.
 */
async function sbDeletePost(id) {
  const sb = getSupabaseClient();
  if (!sb) throw new Error('Supabase não configurado.');

  const { error } = await sb
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
}


/* ── Converters ────────────────────────────────────────────────── */

/** Converte linha do banco (snake_case) para objeto JS (camelCase) */
function dbPostToJs(row) {
  return {
    id:            row.id,
    slug:          row.slug,
    title:         row.title,
    category:      row.category,
    categoryColor: row.category_color,
    author:        row.author,
    date:          row.date,
    readTime:      row.read_time,
    cover:         row.cover_url,
    excerpt:       row.excerpt,
    content:       row.content,
    published:     row.published,
  };
}

/** Converte objeto JS (camelCase) para linha do banco (snake_case) */
function jsPostToDb(post) {
  const row = {
    slug:           post.slug,
    title:          post.title,
    category:       post.category,
    category_color: post.categoryColor || '#000f22',
    author:         post.author || 'Equipe Central de Contratos',
    date:           post.date,
    read_time:      post.readTime || '5 min',
    cover_url:      post.cover || '',
    excerpt:        post.excerpt,
    content:        post.content,
    published:      post.published !== false, // default true
  };
  // Inclui id apenas se for UUID (edição), não em criação
  if (post.id && post.id.includes('-')) row.id = post.id;
  return row;
}
