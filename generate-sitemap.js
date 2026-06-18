const fs = require('fs');
const path = require('path');

// 1. Carrega as configurações do Supabase a partir do arquivo js/supabase-config.js
const configPath = path.join(__dirname, 'js', 'supabase-config.js');
let supabaseUrl = '';
let supabaseAnonKey = '';

try {
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const urlMatch = configContent.match(/const\s+SUPABASE_URL\s*=\s*['"]([^'"]+)['"]/);
    const keyMatch = configContent.match(/const\s+SUPABASE_ANON_KEY\s*=\s*['"]([^'"]+)['"]/);
    
    if (urlMatch) supabaseUrl = urlMatch[1];
    if (keyMatch) supabaseAnonKey = keyMatch[1];
  }
} catch (err) {
  console.error('Erro ao ler js/supabase-config.js:', err.message);
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Configurações do Supabase não encontradas ou incompletas. Gerando sitemap apenas com páginas estáticas.');
}

const siteUrl = 'https://centraldecontratos.com.br';
const today = new Date().toISOString().split('T')[0];

async function generate() {
  console.log('Iniciando geração do sitemap...');
  
  let posts = [];
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const fetchUrl = `${supabaseUrl}/rest/v1/blog_posts?select=slug,date&published=eq.true`;
      const response = await fetch(fetchUrl, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });
      if (response.ok) {
        posts = await response.json();
        console.log(`Sucesso: ${posts.length} posts ativos carregados do Supabase.`);
      } else {
        console.warn('Falha ao buscar posts do Supabase:', response.statusText);
      }
    } catch (err) {
      console.warn('Erro ao conectar ao Supabase:', err.message);
    }
  }

  // Cria o sitemap XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Página Inicial
  xml += `  <url>\n`;
  xml += `    <loc>${siteUrl}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Listagem do Blog
  xml += `  <url>\n`;
  xml += `    <loc>${siteUrl}/blog/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += `  </url>\n`;

  // Política de Privacidade
  xml += `  <url>\n`;
  xml += `    <loc>${siteUrl}/blog/privacidade.html</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.3</priority>\n`;
  xml += `  </url>\n`;

  // Posts do Blog dinâmicos
  posts.forEach(post => {
    const postDate = post.date || today;
    xml += `  <url>\n`;
    xml += `    <loc>${siteUrl}/blog/post.html?slug=${post.slug}</loc>\n`;
    xml += `    <lastmod>${postDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  // Escreve sitemap.xml
  const sitemapPath = path.join(__dirname, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`\n✅ sitemap.xml gerado com sucesso em: ${sitemapPath}`);
}

generate();
