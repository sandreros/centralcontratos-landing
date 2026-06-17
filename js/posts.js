/**
 * CENTRAL DE CONTRATOS — Blog Posts
 * Posts padrão embutidos no código. Use o painel Admin (/admin/) para criar e editar posts
 * sem precisar mexer neste arquivo.
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
    excerpt: 'Vai alugar um imóvel e não sabe por onde começar? Entenda o que não pode faltar num contrato de locação e como se proteger juridicamente — sem precisar de advogado.',
    cover: '../assets/blog/locacao.png',
    content: `
      <p>Seja você proprietário de um imóvel querendo alugar ou uma pessoa procurando onde morar, o <strong>contrato de locação</strong> é o documento mais importante dessa relação. Ele protege os dois lados e evita dores de cabeça no futuro.</p>
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
      <p>Na Central de Contratos, você preenche um formulário simples com os dados das partes e do imóvel, e o sistema gera automaticamente um contrato profissional em PDF, pronto para assinar. Nada de jurídiquês desnecessário, nada de copiar modelo genérico da internet.</p>
      <blockquote>💡 Dica: sempre assine o contrato com reconhecimento de firma ou use assinatura eletrônica com validade jurídica para dar ainda mais segurança ao documento.</blockquote>

      <h2>Conclusão</h2>
      <p>Um contrato de locação bem feito é a base de uma relação tranquila entre proprietário e inquilino. Não deixe para depois: gere o seu agora mesmo na Central de Contratos e durma tranquilo.</p>
    `
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
    excerpt: 'Vendendo um carro, um celular ou até um imóvel? Entenda quando o contrato de compra e venda é essencial e o que ele precisa ter para proteger vendedor e comprador.',
    cover: '../assets/blog/compra-venda.png',
    content: `
      <p>Você está vendendo um veículo, um equipamento caro ou negociando a compra de um imóvel? O <strong>contrato de compra e venda</strong> é o documento que formaliza esse acordo e protege vendedor e comprador de arrependimentos, cobranças indevidas e problemas futuros.</p>
      <p>A boa notícia é que ele não precisa ser complicado. A Central de Contratos te ajuda a gerar um contrato completo em minutos.</p>

      <h2>O que é um contrato de compra e venda?</h2>
      <p>É o documento que comprova que uma parte (vendedor) cedeu um bem à outra (comprador) mediante pagamento de um valor. Ele vale para bens móveis (carros, motos, eletrônicos, animais) e imóveis.</p>

      <h2>Quando ele é obrigatório?</h2>
      <p>Tecnicamente, para bens de baixo valor, um recibo já resolve. Mas para negociações de <strong>maior valor</strong> — veículos, imóveis, equipamentos, gado — o contrato é fundamental porque:</p>
      <ul>
        <li>Evita que o vendedor seja responsabilizado por multas ou infrações após a venda</li>
        <li>Protege o comprador se o bem apresentar vícios ocultos</li>
        <li>Define as condições de parcelamento e consequências por inadimplência</li>
        <li>Serve de prova em caso de disputa judicial</li>
      </ul>

      <h2>O que precisa ter no contrato?</h2>
      <ul>
        <li><strong>Dados do vendedor e comprador:</strong> nome, CPF/CNPJ, endereço</li>
        <li><strong>Descrição detalhada do bem:</strong> no caso de veículo, placa, chassi, cor e ano</li>
        <li><strong>Valor total e forma de pagamento:</strong> à vista, parcelado, entrada + saldo</li>
        <li><strong>Data da entrega do bem</strong></li>
        <li><strong>Garantias e responsabilidades:</strong> quem responde por vícios ou dívidas anteriores?</li>
        <li><strong>Multa por descumprimento</strong></li>
        <li><strong>Foro de eleição:</strong> cidade para resolver eventuais disputas</li>
      </ul>

      <h2>Venda de veículo: atenção redobrada</h2>
      <p>No caso de carros e motos, o contrato é essencial para transferir a responsabilidade legal do veículo. Se o comprador não fizer a transferência do DETRAN e receber uma multa, sem contrato fica difícil provar que você não era mais o dono.</p>
      <blockquote>⚠️ Após a venda, registre a transferência de propriedade no DETRAN para se proteger legalmente, mesmo com o contrato assinado.</blockquote>

      <h2>Como gerar o seu contrato agora?</h2>
      <p>Acesse a Central de Contratos, selecione o modelo de Compra e Venda adequado ao seu bem, preencha os dados e baixe o PDF profissional. Simples assim. Nenhum conhecimento jurídico necessário.</p>
    `
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
    excerpt: 'Mora junto há algum tempo e quer formalizar a relação? A União Estável tem direitos parecidos com o casamento — mas exige comprovação. Veja como fazer isso da forma mais simples possível.',
    cover: '../assets/blog/uniao-estavel.png',
    content: `
      <p>Muitos casais optam por morar juntos sem casar no cartório. Mas isso não significa que a relação não tenha proteção jurídica — desde que seja caracterizada como <strong>União Estável</strong>.</p>
      <p>Entender o que é, como comprovar e como formalizar pode fazer uma grande diferença na vida do casal — especialmente em casos de separação, herança ou acesso a benefícios.</p>

      <h2>O que é a União Estável?</h2>
      <p>É o reconhecimento legal de uma convivência pública, contínua, duradoura e com o objetivo de constituir família — mesmo sem cerimônia de casamento. O Código Civil brasileiro (art. 1.723) garante esse direito.</p>
      <p>Para ser reconhecida, a relação precisa ter:</p>
      <ul>
        <li>Convivência pública (não escondida)</li>
        <li>Continuidade (não esporádica)</li>
        <li>Duração razoável (não existe prazo mínimo fixo em lei)</li>
        <li>Intenção de constituir família</li>
      </ul>

      <h2>Quais os direitos de quem tem União Estável?</h2>
      <p>Os direitos são parecidos com os do casamento:</p>
      <ul>
        <li>Partilha de bens adquiridos durante a união (regime de comunhão parcial por padrão)</li>
        <li>Direito à herança</li>
        <li>Inclusão como dependente no plano de saúde e IR</li>
        <li>Pensão alimentícia em caso de separação</li>
        <li>Benefícios previdenciários (INSS)</li>
      </ul>

      <h2>Como comprovar a União Estável?</h2>
      <p>A prova pode ser feita de várias formas:</p>
      <ul>
        <li>Declaração de União Estável assinada pelo casal</li>
        <li>Certidão lavrada em cartório</li>
        <li>Comprovantes de endereço conjunto, conta bancária compartilhada, fotos</li>
        <li>Testemunhas</li>
      </ul>
      <p>A forma mais simples e prática é a <strong>Declaração de União Estável</strong> — um documento assinado pelo casal (idealmente com reconhecimento de firma) que serve como prova perante órgãos públicos e privados.</p>

      <h2>E se o casal separar?</h2>
      <p>A dissolução da União Estável pode ser feita por acordo mútuo (via cartório) ou judicial. Ter um documento que define o regime de bens facilita muito esse processo e evita disputas desnecessárias.</p>

      <h2>Como gerar a Declaração agora?</h2>
      <p>Na Central de Contratos você encontra o modelo de <strong>Declaração de União Estável</strong> pronto. É só preencher os dados do casal, gerar o PDF e assinar. Em poucos minutos você tem um documento que pode ser apresentado em qualquer situação que exija comprovação da relação.</p>
      <blockquote>💡 Dica: para maior segurança jurídica, reconheça as assinaturas em cartório ou converta para uma escritura pública de União Estável.</blockquote>
    `
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
    excerpt: 'Trabalha como freelancer e já levou um calote? Ou tem medo de que o cliente peça alterações infinitas sem pagar? O contrato de prestação de serviços é sua proteção. Veja como fazer o seu.',
    cover: '../assets/blog/freelancer.png',
    content: `
      <p>Se você trabalha como designer, desenvolvedor, fotógrafo, redator, consultor ou qualquer outro tipo de prestador de serviço autônomo, já sabe: sem contrato, o risco é seu.</p>
      <p>O <strong>contrato de prestação de serviços</strong> é o que garante que você vai receber pelo seu trabalho, que o escopo está bem definido e que existe um caminho claro quando as coisas não saem como planejado.</p>

      <h2>Por que freelancers precisam de contrato?</h2>
      <p>Sem um contrato:</p>
      <ul>
        <li>O cliente pode pedir revisões infinitas sem pagar mais</li>
        <li>Você pode não conseguir provar que prestou o serviço em caso de calote</li>
        <li>Não há prazo definido para entrega ou pagamento</li>
        <li>Não está claro quem fica com os direitos sobre o trabalho criado</li>
      </ul>
      <p>Com um contrato bem feito, tudo isso é resolvido antes de começar.</p>

      <h2>O que colocar no contrato?</h2>
      <ul>
        <li><strong>Dados das partes:</strong> seu nome/CNPJ e do cliente</li>
        <li><strong>Descrição do serviço:</strong> seja específico! "Criação de 5 artes para redes sociais em formato PNG e JPG" é melhor que "trabalho de design"</li>
        <li><strong>Prazo de entrega</strong></li>
        <li><strong>Valor total e forma de pagamento:</strong> entrada, parcelas, prazo</li>
        <li><strong>Número de revisões incluídas</strong></li>
        <li><strong>Direitos sobre o trabalho:</strong> o cliente pode revender? Usar em outras plataformas?</li>
        <li><strong>Multa por atraso</strong> (tanto sua quanto do cliente)</li>
        <li><strong>Condições de cancelamento</strong></li>
      </ul>

      <h2>E se o cliente não pagar?</h2>
      <p>Com contrato assinado, você pode:</p>
      <ul>
        <li>Cobrar formalmente (por e-mail ou carta)</li>
        <li>Negativar o nome do cliente</li>
        <li>Recorrer ao Juizado Especial Cível (para valores até 40 salários mínimos, sem advogado)</li>
      </ul>
      <p>Sem contrato, fica muito mais difícil provar a dívida.</p>

      <h2>Como gerar o seu contrato?</h2>
      <p>A Central de Contratos tem modelos específicos de <strong>Contrato de Prestação de Serviços</strong> adaptados para diferentes tipos de trabalho. Você preenche os dados do projeto, define o escopo e baixa o PDF profissional — pronto para enviar ao cliente antes de começar qualquer trabalho.</p>
      <blockquote>🎯 Profissionalismo começa antes da primeira entrega. Enviar um contrato bem estruturado ao cliente também passa mais credibilidade e confiança no seu trabalho.</blockquote>
    `
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
    excerpt: 'Abriu seu MEI mas ainda faz tudo no boca a boca? Isso pode custar caro. Veja quais contratos todo microempreendedor precisa ter para proteger seu negócio.',
    cover: '../assets/blog/mei.png',
    content: `
      <p>Virar MEI (Microempreendedor Individual) é o primeiro passo de muita gente que quer empreender de forma legal. Mas abrir o CNPJ é só o começo — para realmente proteger o seu negócio, você precisa de contratos.</p>
      <p>Muitos MEIs ainda trabalham no "combinado verbal", no "pode confiar" — e aí, quando algo dá errado, não há o que fazer. Vamos mudar isso.</p>

      <h2>Por que MEI precisa de contrato?</h2>
      <p>Mesmo sendo pequeno, seu negócio tem obrigações e direitos. Um contrato:</p>
      <ul>
        <li>Protege você em caso de inadimplência</li>
        <li>Define claramente o que será entregue</li>
        <li>Serve como prova em caso de disputa</li>
        <li>Demonstra profissionalismo e aumenta a credibilidade</li>
      </ul>

      <h2>Quais contratos todo MEI deveria ter?</h2>

      <h3>1. Contrato de Prestação de Serviços</h3>
      <p>Fundamental se você oferece qualquer tipo de serviço — manutenção, consultoria, aulas, beleza, alimentação etc. Define o que será feito, quando, quanto vai custar e o que acontece se alguém não cumprir.</p>

      <h3>2. Orçamento / Proposta Comercial</h3>
      <p>Antes do contrato, o orçamento formaliza a proposta. Quando o cliente assina ou aprova, vira um compromisso. Simples mas poderoso.</p>

      <h3>3. Contrato de Compra e Venda</h3>
      <p>Se você vende produtos físicos — artesanato, alimentos, equipamentos — o contrato de compra e venda protege você em caso de reclamações sobre o produto ou falta de pagamento.</p>

      <h3>4. Contrato de Parceria ou Colaboração</h3>
      <p>Vai fazer um projeto em parceria com outro autônomo ou empresa? Documente a divisão de responsabilidades, custos e lucros para evitar conflitos depois.</p>

      <h3>5. Recibo de Pagamento</h3>
      <p>Não é um contrato em si, mas emitir recibo para cada pagamento recebido é boa prática financeira e serve como prova de quitação.</p>

      <h2>Preciso de advogado para fazer esses contratos?</h2>
      <p>Para a maioria das situações cotidianas de um MEI, não. A Central de Contratos oferece modelos validados e adequados à legislação brasileira — você preenche os dados, gera e baixa o PDF. Sem burocracias, sem custo de honorários.</p>

      <h2>Como começar?</h2>
      <p>Acesse a Central de Contratos, escolha o tipo de contrato que você precisa e gere agora mesmo. Em menos de 5 minutos você tem um documento profissional pronto para usar. Seu negócio merece essa proteção.</p>
      <blockquote>📌 Lembre-se: profissionalismo não é só sobre a qualidade do produto ou serviço. É também sobre como você conduz os negócios. Um contrato bem feito faz parte disso.</blockquote>
    `
  }
];

/**
 * Retorna os posts mesclando padrões com o que foi salvo pelo admin no localStorage.
 */
function getPosts() {
  try {
    const stored = JSON.parse(localStorage.getItem('cc_posts') || '[]');
    return stored.length > 0 ? stored : DEFAULT_POSTS;
  } catch {
    return DEFAULT_POSTS;
  }
}

/**
 * Salva os posts no localStorage (usado pelo painel admin).
 */
function savePosts(posts) {
  localStorage.setItem('cc_posts', JSON.stringify(posts));
}

/**
 * Encontra post pelo slug.
 */
function getPostBySlug(slug) {
  return getPosts().find(p => p.slug === slug) || null;
}
