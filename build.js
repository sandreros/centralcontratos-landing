/**
 * build.js — Gerador de supabase-config.js para deploy na Vercel
 * ─────────────────────────────────────────────────────────────────
 * Este script lê as variáveis de ambiente configuradas no Vercel
 * e gera o arquivo js/supabase-config.js antes do deploy.
 *
 * Variáveis de ambiente necessárias no Vercel:
 *   SUPABASE_URL      → URL do projeto Supabase
 *   SUPABASE_ANON_KEY → Chave pública (anon) do Supabase
 *
 * Como configurar:
 *   1. Acesse vercel.com → seu projeto → Settings → Environment Variables
 *   2. Adicione SUPABASE_URL e SUPABASE_ANON_KEY
 *   3. O Vercel roda este script automaticamente no build
 */

const fs   = require('fs');
const path = require('path');

const SUPABASE_URL      = process.env.SUPABASE_URL      || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  [build.js] Variáveis de ambiente SUPABASE_URL e/ou SUPABASE_ANON_KEY não definidas.');
  console.warn('    O site funcionará no modo offline (sem Supabase).');
}

const content = `/**
 * CENTRAL DE CONTRATOS — Supabase Configuration
 * Gerado automaticamente pelo build.js — NÃO edite manualmente.
 */

const SUPABASE_URL      = '${SUPABASE_URL}';
const SUPABASE_ANON_KEY = '${SUPABASE_ANON_KEY}';
`;

const outPath = path.join(__dirname, 'js', 'supabase-config.js');
fs.writeFileSync(outPath, content, 'utf8');

console.log('✅ [build.js] js/supabase-config.js gerado com sucesso!');
console.log(`   URL: ${SUPABASE_URL ? SUPABASE_URL.substring(0, 40) + '...' : '(vazia)'}`);
