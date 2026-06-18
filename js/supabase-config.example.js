/**
 * CENTRAL DE CONTRATOS — Supabase Configuration (TEMPLATE)
 * ─────────────────────────────────────────────────────────────────
 * ⚠️  Este arquivo é um EXEMPLO. NÃO contém credenciais reais.
 *
 * Para configurar:
 *   1. Copie este arquivo: cp supabase-config.example.js supabase-config.js
 *   2. Preencha os valores abaixo com os dados do seu projeto Supabase
 *   3. O arquivo supabase-config.js está no .gitignore e nunca será commitado
 *
 * Onde encontrar suas credenciais:
 *   → https://supabase.com → seu projeto → Settings → API
 *
 * ─────────────────────────────────────────────────────────────────
 * Sobre segurança:
 *   A ANON KEY é projetada para ser pública. A proteção dos dados
 *   é feita pelas políticas de Row Level Security (RLS) no Supabase,
 *   que já estão configuradas em supabase/landing_schema.sql.
 *
 *   Nunca exponha a SERVICE ROLE KEY aqui. Use apenas a ANON KEY.
 * ─────────────────────────────────────────────────────────────────
 */

const SUPABASE_URL      = 'https://SEU-PROJETO.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...sua-anon-key-aqui';
