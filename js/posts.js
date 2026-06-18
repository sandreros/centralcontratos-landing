/**
 * CENTRAL DE CONTRATOS — Blog Posts
 * ─────────────────────────────────────────────────────────────────
 * Posts são armazenados no Supabase (tabela blog_posts).
 * Se o Supabase não estiver configurado, usa DEFAULT_POSTS abaixo.
 *
 * Uso:
 *   const posts = await getPosts();
 *   const post  = await getPostBySlug('meu-slug');
 *   await upsertPost({ title, slug, ... });
 *   await deletePostById(id);
 */

const DEFAULT_POSTS = [
  {
    id: '1',
    slug: 'contrato-de-locacao-guia-completo',
    title: 'Contrato de Locação de Imóvel: o guia completo para inquilino e proprietário',
    category: 'Locação',
    categoryColor: '#1a9e70',
    author: 'Equipe Central de Contratos',
    date: '2024-06-10',
    readTime: '6 min',
    cover: '../assets/blog/locacao.png',
    excerpt: 'Vai alugar um imóvel e não sabe por onde começar? Entenda o que não pode faltar num contrato de locação e como se proteger juridicamente — sem precisar de advogado.',
    content: `<p>Seja você proprietário de um imóvel querendo alugar ou uma pessoa procurando onde morar, o <strong>contrato de locação</strong> é o documento mais importante dessa relação.</p>
      <h2>O que é um contrato de locação?</h2>
      <p>É o acordo formal entre o <strong>locador</strong> (dono do imóvel) e o <strong>locatário</strong> (quem vai alugar). Ele estabelece as regras da convivência: quanto será pago, por quanto tempo, o que pode e o que não pode ser feito no imóvel.</p>
      <h2>O que não pode faltar no contrato?</h2>
      <ul>
        <li><strong>Identificação das partes:</strong> nome completo, CPF e endereço.</li>
        <li><strong>Valor do aluguel e forma de pagamento.</strong></li>
        <li><strong>Duração do contrato:</strong> prazo determinado ou indeterminado.</li>
        <li><strong>Garantias:</strong> caução, fiador ou seguro-fiança.</li>
        <li><strong>Condições de rescisão.</strong></li>
      </ul>
      <blockquote>💡 Sempre assine o contrato com reconhecimento de firma para maior segurança jurídica.</blockquote>`,
    published: true,
  },
  {
    id: '2',
    slug: 'contrato-compra-e-venda-quando-usar',
    title: 'Contrato de Compra e Venda: quando é obrigatório e como fazer o seu corretamente',
    category: 'Compra e Venda',
    categoryColor: '#EDB83D',
    author: 'Equipe Central de Contratos',
    date: '2024-06-18',
    readTime: '5 min',
    cover: '../assets/blog/compra-venda.png',
    excerpt: 'Vendendo um carro, um celular ou até um imóvel? Entenda quando o contrato de compra e venda é essencial e o que ele precisa ter para proteger vendedor e comprador.',
    content: `<p>Você está vendendo um veículo, um equipamento caro ou negociando a compra de um imóvel? O <strong>contrato de compra e venda</strong> é o documento que formaliza esse acordo.</p>
      <h2>O que precisa ter no contrato?</h2>
      <ul>
        <li><strong>Dados do vendedor e comprador</strong></li>
        <li><strong>Descrição detalhada do bem</strong></li>
        <li><strong>Valor total e forma de pagamento</strong></li>
        <li><strong>Multa por descumprimento</strong></li>
      </ul>
      <blockquote>⚠️ Após a venda de veículo, registre a transferência no DETRAN.</blockquote>`,
    published: true,
  },
  {
    id: '3',
    slug: 'uniao-estavel-o-que-e-como-comprovar',
    title: 'União Estável: o que é, como comprovar e por que ter um documento oficial',
    category: 'Família',
    categoryColor: '#e05a8a',
    author: 'Equipe Central de Contratos',
    date: '2024-06-25',
    readTime: '7 min',
    cover: '../assets/blog/uniao-estavel.png',
    excerpt: 'Mora junto há algum tempo e quer formalizar a relação? A União Estável tem direitos parecidos com o casamento — mas exige comprovação.',
    content: `<p>Muitos casais optam por morar juntos sem casar no cartório. Mas isso não significa que a relação não tenha proteção jurídica — desde que seja caracterizada como <strong>União Estável</strong>.</p>
      <h2>O que é a União Estável?</h2>
      <p>É o reconhecimento legal de uma convivência pública, contínua, duradoura e com o objetivo de constituir família. O Código Civil brasileiro (art. 1.723) garante esse direito.</p>
      <blockquote>💡 Para maior segurança jurídica, reconheça as assinaturas em cartório.</blockquote>`,
    published: true,
  },
  {
    id: '4',
    slug: 'contrato-prestacao-servico-freelancer',
    title: 'Contrato de Prestação de Serviços para Freelancers: proteja seu trabalho (e receba direito)',
    category: 'Serviços',
    categoryColor: '#0a8aff',
    author: 'Equipe Central de Contratos',
    date: '2024-07-02',
    readTime: '6 min',
    cover: '../assets/blog/freelancer.png',
    excerpt: 'Trabalha como freelancer e já levou um calote? O contrato de prestação de serviços é sua proteção. Veja como fazer o seu.',
    content: `<p>Se você trabalha como designer, desenvolvedor, fotógrafo, redator, consultor ou qualquer outro tipo de prestador de serviço autônomo, já sabe: sem contrato, o risco é seu.</p>
      <h2>O que colocar no contrato?</h2>
      <ul>
        <li><strong>Dados das partes</strong></li>
        <li><strong>Descrição detalhada do serviço</strong></li>
        <li><strong>Prazo de entrega e forma de pagamento</strong></li>
        <li><strong>Número de revisões incluídas</strong></li>
      </ul>
      <blockquote>🎯 Profissionalismo começa antes da primeira entrega.</blockquote>`,
    published: true,
  },
  {
    id: '5',
    slug: 'mei-contratos-essenciais-para-trabalhar-seguro',
    title: 'MEI: os contratos essenciais para você trabalhar com segurança jurídica',
    category: 'MEI & Negócios',
    categoryColor: '#7c4dff',
    author: 'Equipe Central de Contratos',
    date: '2024-07-10',
    readTime: '5 min',
    cover: '../assets/blog/mei.png',
    excerpt: 'Abriu seu MEI mas ainda faz tudo no boca a boca? Veja quais contratos todo microempreendedor precisa ter para proteger seu negócio.',
    content: `<p>Virar MEI é o primeiro passo de muita gente que quer empreender de forma legal. Mas abrir o CNPJ é só o começo — para proteger o seu negócio, você precisa de contratos.</p>
      <h2>Quais contratos todo MEI deveria ter?</h2>
      <ul>
        <li>Contrato de Prestação de Serviços</li>
        <li>Orçamento / Proposta Comercial</li>
        <li>Contrato de Compra e Venda</li>
        <li>Contrato de Parceria ou Colaboração</li>
      </ul>
      <blockquote>📌 Profissionalismo não é só sobre qualidade do serviço. Um contrato bem feito faz parte disso.</blockquote>`,
    published: true,
  },
];

/** Cache em memória */
let _postsCache = null;

/**
 * Retorna todos os posts.
 * Prioridade: Supabase → DEFAULT_POSTS
 * @returns {Promise<Array>}
 */
async function getPosts() {
  if (_postsCache) return _postsCache;

  const sbPosts = await sbFetchPosts();

  if (sbPosts !== null) {
    _postsCache = sbPosts;
  } else {
    _postsCache = [...DEFAULT_POSTS];
  }

  return _postsCache;
}

/**
 * Busca um post pelo slug.
 * @returns {Promise<Object|null>}
 */
async function getPostBySlug(slug) {
  // Tenta direto no Supabase primeiro
  const sbPost = await sbFetchPostBySlug(slug);
  if (sbPost) return sbPost;

  // Fallback: busca no cache/default
  const posts = await getPosts();
  return posts.find(p => p.slug === slug) || null;
}

/**
 * Cria ou atualiza um post no Supabase.
 * @param {Object} post
 * @returns {Promise<Object>} post salvo
 */
async function upsertPost(post) {
  const saved = await sbUpsertPost(post);
  clearPostsCache();
  return saved;
}

/**
 * Remove um post pelo id.
 * @param {string} id
 */
async function deletePostById(id) {
  await sbDeletePost(id);
  clearPostsCache();
}

/** Invalida o cache de posts */
function clearPostsCache() {
  _postsCache = null;
}
