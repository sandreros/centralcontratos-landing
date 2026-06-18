-- ================================================================
-- CENTRAL DE CONTRATOS — Landing Page Schema
-- Execute este script no SQL Editor do seu projeto Supabase.
-- ================================================================


-- ── 1. TABELA: landing_config ────────────────────────────────────
-- Armazena pares chave-valor das configurações do site (CTA, WhatsApp, etc.)

CREATE TABLE IF NOT EXISTS public.landing_config (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_landing_config_updated_at ON public.landing_config;
CREATE TRIGGER trg_landing_config_updated_at
  BEFORE UPDATE ON public.landing_config
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ── 2. TABELA: blog_posts ────────────────────────────────────────
-- Armazena os artigos do blog

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           TEXT        UNIQUE NOT NULL,
  title          TEXT        NOT NULL,
  category       TEXT        NOT NULL,
  category_color TEXT        NOT NULL DEFAULT '#000f22',
  author         TEXT        NOT NULL DEFAULT 'Equipe Central de Contratos',
  date           DATE        NOT NULL DEFAULT CURRENT_DATE,
  read_time      TEXT        NOT NULL DEFAULT '5 min',
  cover_url      TEXT        NOT NULL DEFAULT '',
  excerpt        TEXT        NOT NULL DEFAULT '',
  content        TEXT        NOT NULL DEFAULT '',
  published      BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ── 3. ROW LEVEL SECURITY ────────────────────────────────────────

ALTER TABLE public.landing_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts     ENABLE ROW LEVEL SECURITY;

-- Leitura pública (visitantes do site)
DROP POLICY IF EXISTS "public_read_config" ON public.landing_config;
CREATE POLICY "public_read_config"
  ON public.landing_config FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "public_read_posts" ON public.blog_posts;
CREATE POLICY "public_read_posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

-- Escrita apenas para usuários autenticados (admin)
DROP POLICY IF EXISTS "auth_write_config" ON public.landing_config;
CREATE POLICY "auth_write_config"
  ON public.landing_config FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_write_posts" ON public.blog_posts;
CREATE POLICY "auth_write_posts"
  ON public.blog_posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Permitir que admin veja posts não publicados também
DROP POLICY IF EXISTS "auth_read_all_posts" ON public.blog_posts;
CREATE POLICY "auth_read_all_posts"
  ON public.blog_posts FOR SELECT
  USING (auth.role() = 'authenticated');


-- ── 4. SEED: Configurações padrão ───────────────────────────────

INSERT INTO public.landing_config (key, value) VALUES
  ('ctaUrl',           '#'),
  ('ctaText',          'Comece Agora'),
  ('whatsapp',         ''),
  ('siteName',         'Central de Contratos'),
  ('tagline',          'Documentos jurídicos em minutos'),
  ('contactEmail',     'contato@centraldecontratos.com.br'),
  ('showWhatsappFloat','true')
ON CONFLICT (key) DO NOTHING;


-- ── 5. SEED: Posts padrão ────────────────────────────────────────

INSERT INTO public.blog_posts (slug, title, category, category_color, author, date, read_time, cover_url, excerpt, content) VALUES
(
  'contrato-de-locacao-guia-completo',
  'Contrato de Locação de Imóvel: o guia completo para inquilino e proprietário',
  'Locação',
  '#1a9e70',
  'Equipe Central de Contratos',
  '2024-06-10',
  '6 min',
  '../assets/blog/locacao.png',
  'Vai alugar um imóvel e não sabe por onde começar? Entenda o que não pode faltar num contrato de locação e como se proteger juridicamente — sem precisar de advogado.',
  '<p>Seja você proprietário de um imóvel querendo alugar ou uma pessoa procurando onde morar, o <strong>contrato de locação</strong> é o documento mais importante dessa relação. Ele protege os dois lados e evita dores de cabeça no futuro.</p>
<p>A boa notícia? Com a Central de Contratos, você gera um contrato completo e juridicamente adequado em menos de 5 minutos. Mas antes, vamos entender o que esse documento precisa ter.</p>
<h2>O que é um contrato de locação?</h2>
<p>É o acordo formal entre o <strong>locador</strong> (dono do imóvel) e o <strong>locatário</strong> (quem vai alugar). Ele estabelece as regras da convivência: quanto será pago, por quanto tempo, o que pode e o que não pode ser feito no imóvel.</p>
<p>A Lei do Inquilinato (Lei nº 8.245/91) é quem regula essa relação no Brasil, e um bom contrato precisa estar alinhado com ela.</p>
<h2>O que não pode faltar no contrato?</h2>
<ul>
  <li><strong>Identificação das partes:</strong> nome completo, CPF e endereço do locador e locatário.</li>
  <li><strong>Descrição do imóvel:</strong> endereço completo, metragem e estado de conservação.</li>
  <li><strong>Valor do aluguel e forma de pagamento:</strong> quanto, quando e como pagar (boleto, PIX, depósito).</li>
  <li><strong>Duração do contrato:</strong> prazo determinado ou indeterminado.</li>
  <li><strong>Reajuste:</strong> índice de reajuste (geralmente IGPM ou IPCA) e periodicidade.</li>
  <li><strong>Garantias:</strong> caução, fiador ou seguro-fiança.</li>
  <li><strong>Responsabilidades:</strong> quem paga IPTU, condomínio e consertos.</li>
  <li><strong>Regras de uso:</strong> pode ter animais? Sublocar? Reformar?</li>
  <li><strong>Condições de rescisão:</strong> multa por saída antecipada e prazo de aviso prévio.</li>
</ul>
<h2>Prazo do contrato: determinado ou indeterminado?</h2>
<p>Contratos com prazo <strong>determinado</strong> (ex: 30 meses) são os mais comuns e trazem mais segurança. Após o vencimento, o contrato pode ser renovado ou passa a valer por prazo indeterminado automaticamente.</p>
<p>No prazo indeterminado, qualquer das partes pode encerrar com 30 dias de antecedência (locatário) ou seguindo as regras da lei (locador).</p>
<h2>E se não houver contrato?</h2>
<p>Sem contrato escrito, a relação é muito mais difícil de provar. Em caso de conflito — falta de pagamento, danos ao imóvel ou despejo — você pode perder tempo e dinheiro na justiça. Não vale o risco.</p>
<h2>Como fazer o contrato agora?</h2>
<p>Na Central de Contratos, você preenche um formulário simples com os dados das partes e do imóvel, e o sistema gera automaticamente um contrato profissional em PDF, pronto para assinar.</p>
<blockquote>💡 Dica: sempre assine o contrato com reconhecimento de firma ou use assinatura eletrônica com validade jurídica para dar ainda mais segurança ao documento.</blockquote>
<h2>Conclusão</h2>
<p>Um contrato de locação bem feito é a base de uma relação tranquila entre proprietário e inquilino. Não deixe para depois: gere o seu agora mesmo na Central de Contratos e durma tranquilo.</p>'
),
(
  'contrato-compra-e-venda-quando-usar',
  'Contrato de Compra e Venda: quando é obrigatório e como fazer o seu corretamente',
  'Compra e Venda',
  '#EDB83D',
  'Equipe Central de Contratos',
  '2024-06-18',
  '5 min',
  '../assets/blog/compra-venda.png',
  'Vendendo um carro, um celular ou até um imóvel? Entenda quando o contrato de compra e venda é essencial e o que ele precisa ter para proteger vendedor e comprador.',
  '<p>Você está vendendo um veículo, um equipamento caro ou negociando a compra de um imóvel? O <strong>contrato de compra e venda</strong> é o documento que formaliza esse acordo e protege vendedor e comprador de arrependimentos, cobranças indevidas e problemas futuros.</p>
<h2>O que é um contrato de compra e venda?</h2>
<p>É o documento que comprova que uma parte (vendedor) cedeu um bem à outra (comprador) mediante pagamento de um valor.</p>
<h2>Quando ele é obrigatório?</h2>
<p>Para negociações de <strong>maior valor</strong> — veículos, imóveis, equipamentos — o contrato é fundamental porque evita que o vendedor seja responsabilizado por multas ou infrações após a venda, protege o comprador se o bem apresentar vícios ocultos, define as condições de parcelamento e consequências por inadimplência, e serve de prova em caso de disputa judicial.</p>
<h2>O que precisa ter no contrato?</h2>
<ul>
  <li><strong>Dados do vendedor e comprador:</strong> nome, CPF/CNPJ, endereço</li>
  <li><strong>Descrição detalhada do bem:</strong> no caso de veículo, placa, chassi, cor e ano</li>
  <li><strong>Valor total e forma de pagamento:</strong> à vista, parcelado, entrada + saldo</li>
  <li><strong>Data da entrega do bem</strong></li>
  <li><strong>Garantias e responsabilidades</strong></li>
  <li><strong>Multa por descumprimento</strong></li>
  <li><strong>Foro de eleição:</strong> cidade para resolver eventuais disputas</li>
</ul>
<blockquote>⚠️ Após a venda de veículo, registre a transferência de propriedade no DETRAN para se proteger legalmente, mesmo com o contrato assinado.</blockquote>'
),
(
  'uniao-estavel-o-que-e-como-comprovar',
  'União Estável: o que é, como comprovar e por que ter um documento oficial',
  'Família',
  '#e05a8a',
  'Equipe Central de Contratos',
  '2024-06-25',
  '7 min',
  '../assets/blog/uniao-estavel.png',
  'Mora junto há algum tempo e quer formalizar a relação? A União Estável tem direitos parecidos com o casamento — mas exige comprovação. Veja como fazer isso da forma mais simples possível.',
  '<p>Muitos casais optam por morar juntos sem casar no cartório. Mas isso não significa que a relação não tenha proteção jurídica — desde que seja caracterizada como <strong>União Estável</strong>.</p>
<h2>O que é a União Estável?</h2>
<p>É o reconhecimento legal de uma convivência pública, contínua, duradoura e com o objetivo de constituir família. O Código Civil brasileiro (art. 1.723) garante esse direito.</p>
<h2>Quais os direitos de quem tem União Estável?</h2>
<ul>
  <li>Partilha de bens adquiridos durante a união (regime de comunhão parcial por padrão)</li>
  <li>Direito à herança</li>
  <li>Inclusão como dependente no plano de saúde e IR</li>
  <li>Pensão alimentícia em caso de separação</li>
  <li>Benefícios previdenciários (INSS)</li>
</ul>
<h2>Como comprovar a União Estável?</h2>
<p>A forma mais simples e prática é a <strong>Declaração de União Estável</strong> — um documento assinado pelo casal que serve como prova perante órgãos públicos e privados.</p>
<blockquote>💡 Dica: para maior segurança jurídica, reconheça as assinaturas em cartório ou converta para uma escritura pública de União Estável.</blockquote>'
),
(
  'contrato-prestacao-servico-freelancer',
  'Contrato de Prestação de Serviços para Freelancers: proteja seu trabalho (e receba direito)',
  'Serviços',
  '#0a8aff',
  'Equipe Central de Contratos',
  '2024-07-02',
  '6 min',
  '../assets/blog/freelancer.png',
  'Trabalha como freelancer e já levou um calote? Ou tem medo de que o cliente peça alterações infinitas sem pagar? O contrato de prestação de serviços é sua proteção. Veja como fazer o seu.',
  '<p>Se você trabalha como designer, desenvolvedor, fotógrafo, redator, consultor ou qualquer outro tipo de prestador de serviço autônomo, já sabe: sem contrato, o risco é seu.</p>
<h2>Por que freelancers precisam de contrato?</h2>
<p>Sem um contrato, o cliente pode pedir revisões infinitas sem pagar mais, você pode não conseguir provar que prestou o serviço em caso de calote, e não há prazo definido para entrega ou pagamento.</p>
<h2>O que colocar no contrato?</h2>
<ul>
  <li><strong>Dados das partes:</strong> seu nome/CNPJ e do cliente</li>
  <li><strong>Descrição do serviço:</strong> seja específico!</li>
  <li><strong>Prazo de entrega</strong></li>
  <li><strong>Valor total e forma de pagamento:</strong> entrada, parcelas, prazo</li>
  <li><strong>Número de revisões incluídas</strong></li>
  <li><strong>Direitos sobre o trabalho</strong></li>
  <li><strong>Multa por atraso</strong></li>
  <li><strong>Condições de cancelamento</strong></li>
</ul>
<blockquote>🎯 Profissionalismo começa antes da primeira entrega. Enviar um contrato bem estruturado ao cliente também passa mais credibilidade e confiança no seu trabalho.</blockquote>'
),
(
  'mei-contratos-essenciais-para-trabalhar-seguro',
  'MEI: os contratos essenciais para você trabalhar com segurança jurídica',
  'MEI & Negócios',
  '#7c4dff',
  'Equipe Central de Contratos',
  '2024-07-10',
  '5 min',
  '../assets/blog/mei.png',
  'Abriu seu MEI mas ainda faz tudo no boca a boca? Isso pode custar caro. Veja quais contratos todo microempreendedor precisa ter para proteger seu negócio.',
  '<p>Virar MEI (Microempreendedor Individual) é o primeiro passo de muita gente que quer empreender de forma legal. Mas abrir o CNPJ é só o começo — para realmente proteger o seu negócio, você precisa de contratos.</p>
<h2>Por que MEI precisa de contrato?</h2>
<p>Mesmo sendo pequeno, seu negócio tem obrigações e direitos. Um contrato protege você em caso de inadimplência, define claramente o que será entregue e demonstra profissionalismo.</p>
<h2>Quais contratos todo MEI deveria ter?</h2>
<h3>1. Contrato de Prestação de Serviços</h3>
<p>Fundamental se você oferece qualquer tipo de serviço. Define o que será feito, quando, quanto vai custar e o que acontece se alguém não cumprir.</p>
<h3>2. Orçamento / Proposta Comercial</h3>
<p>Antes do contrato, o orçamento formaliza a proposta. Quando o cliente assina ou aprova, vira um compromisso.</p>
<h3>3. Contrato de Compra e Venda</h3>
<p>Se você vende produtos físicos, o contrato de compra e venda protege você em caso de reclamações ou falta de pagamento.</p>
<h3>4. Contrato de Parceria ou Colaboração</h3>
<p>Vai fazer um projeto em parceria com outro autônomo? Documente a divisão de responsabilidades, custos e lucros.</p>
<blockquote>📌 Lembre-se: profissionalismo não é só sobre a qualidade do produto ou serviço. É também sobre como você conduz os negócios. Um contrato bem feito faz parte disso.</blockquote>'
)
ON CONFLICT (slug) DO NOTHING;
