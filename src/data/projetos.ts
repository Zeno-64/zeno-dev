/** Os projetos do portfólio. Cada item vira um card em /projetos e uma
 *  página em /projetos/<slug> — e o build grava um HTML com as meta tags
 *  dele, para o link compartilhado mostrar título e imagem certos.
 *
 *  Regra da casa: só fato. Nada de número inventado, depoimento ou
 *  "resultado" que não dê para mostrar. */

export type Categoria = 'site' | 'app' | 'ferramenta' | 'laboratorio'

export type Status = 'no-ar' | 'em-uso' | 'entregue' | 'em-andamento' | 'pesquisa'

export type Projeto = {
  slug: string
  nome: string
  categoria: Categoria
  status: Status
  ano: number
  /** Para quem é (cliente, público ou "projeto pessoal"). */
  para: string
  /** Uma frase — aparece no card. */
  resumo: string
  url?: string
  /** Endereço curto exibido na moldura do navegador. */
  host?: string
  stack: string[]
  /** Aparece na home, na grade de destaques. */
  destaque?: boolean
  /** Screenshots em public/projetos (desktop 1440×900, celular 390×844 @1.5x). */
  imagens?: { desktop: string; celular?: string }
  /** Para projeto sem tela pública: uma "capa" em forma de terminal. */
  capa?: { arquivo: string; linhas: string[] }
  contexto: string
  feito: string[]
  decisoes: { titulo: string; texto: string }[]
  detalhe?: { titulo: string; texto: string }
}

export const categorias: { id: Categoria | 'todos'; rotulo: string }[] = [
  { id: 'todos', rotulo: 'Todos' },
  { id: 'site', rotulo: 'Sites' },
  { id: 'app', rotulo: 'Apps' },
  { id: 'ferramenta', rotulo: 'Ferramentas' },
  { id: 'laboratorio', rotulo: 'Laboratório' },
]

export const rotuloStatus: Record<Status, string> = {
  'no-ar': 'no ar',
  'em-uso': 'em uso',
  entregue: 'entregue',
  'em-andamento': 'em andamento',
  pesquisa: 'pesquisa',
}

const tela = (slug: string) => ({
  desktop: `/projetos/${slug}-desktop.webp`,
  celular: `/projetos/${slug}-celular.webp`,
})

export const projetos: Projeto[] = [
  {
    slug: 'narakaito-lab',
    nome: 'Narakaito Lab',
    categoria: 'site',
    status: 'no-ar',
    ano: 2026,
    para: 'Ateliê de figures em resina, São Paulo',
    resumo: 'Catálogo de colecionáveis em resina pintados à mão, com uma página por peça.',
    url: 'https://narakaito.com/',
    host: 'narakaito.com',
    stack: ['React 19', 'Vite 8', 'Tailwind 4', 'Framer Motion', 'React Router', 'Cloudflare Workers', 'Python'],
    destaque: true,
    imagens: tela('narakaito-lab'),
    contexto:
      'A Narakaito Lab imprime em resina e pinta à mão figures de anime e games, sob encomenda. O pedido fecha no WhatsApp — o site precisava mostrar o acabamento de perto e deixar cada peça fácil de compartilhar.',
    feito: [
      'Catálogo com rota própria para cada peça (/peca/<slug>) e galeria com foto ampliada',
      'Biblioteca de modelos separada do catálogo: foto do ateliê vai para o catálogo, arte do escultor aparece com crédito',
      'Ficha técnica, FAQ e botões que abrem o WhatsApp já citando a peça',
      'Domínio narakaito.com servido por um Worker de assets estáticos na Cloudflare',
    ],
    decisoes: [
      {
        titulo: 'Um HTML por peça, gerado no build',
        texto:
          'O site é uma SPA, e quem monta a prévia de link (WhatsApp, Instagram, Google) não roda JavaScript. Um plugin do Vite grava dist/peca/<slug>/index.html com título, descrição e imagem da peça: o link compartilhado mostra a foto certa.',
      },
      {
        titulo: 'Card de prévia em 1200×630',
        texto:
          'Foto quadrada vira card pequeno no WhatsApp. Um script em Python gera a imagem de prévia de cada peça nova no formato que o card usa inteiro.',
      },
      {
        titulo: 'Conteúdo num arquivo só',
        texto:
          'Peças, textos, FAQ e número do WhatsApp ficam em src/data/site.ts. Peça nova é um item a mais no array — a rota, o card e a página nascem dele.',
      },
    ],
    detalhe: {
      titulo: 'O nome do Worker importa',
      texto:
        'Se o name do wrangler.jsonc não bater com o Worker que serve o domínio, o deploy cria um Worker novo e vazio e o site no ar fica congelado na versão anterior. O aviso ficou escrito no próprio arquivo.',
    },
  },
  {
    slug: 'cleduart',
    nome: 'CleduArt',
    categoria: 'site',
    status: 'no-ar',
    ano: 2026,
    para: 'Acervo de antiguidades e coleções',
    resumo: 'Vitrine de antiguidades em que cada peça tem ficha técnica e a história do objeto.',
    url: 'https://www.cleduart.com.br/',
    host: 'cleduart.com.br',
    stack: ['React 19', 'Vite', 'TypeScript', 'Tailwind 4', 'Framer Motion', 'React Router'],
    destaque: true,
    imagens: tela('cleduart'),
    contexto:
      'O acervo vende pelo Instagram, com boas fotos e pouco espaço para contar a história de cada objeto — a indústria, a patente, a época que o produziu.',
    feito: [
      'Página por peça com fotos, ficha técnica e uma narrativa sobre a origem do objeto',
      'Notas históricas apuradas em fontes públicas (Camera-wiki, Camerapedia, Wikipédia, museus) e separadas do texto do anúncio, que aparece citado',
      'Linha do tempo do acervo, manifesto da casa e lightbox para as fotos',
      'Ajuste de tamanho de letra no topo do site',
    ],
    decisoes: [
      {
        titulo: 'Refeito em tema claro',
        texto:
          'A primeira versão era escura. O cliente contou que tinha dificuldade para ler, e o site foi refeito em tema claro, com contraste e tamanho de texto revistos.',
      },
      {
        titulo: 'Pesquisa separada de oferta',
        texto:
          'O que é apuração histórica e o que é texto do vendedor ficam em blocos diferentes — o visitante sabe o que é fonte e o que é anúncio.',
      },
    ],
    detalhe: {
      titulo: 'Peça nova é um objeto no array',
      texto: 'Todo o acervo vive em src/data/acervo.ts, com fotos em WebP de 1080 px e miniatura.',
    },
  },
  {
    slug: 'zapflow',
    nome: 'ZapFlow',
    categoria: 'ferramenta',
    status: 'em-uso',
    ano: 2026,
    para: 'Atendimento comercial pelo WhatsApp Web',
    resumo: 'Extensão do Chrome que transforma o WhatsApp Web num CRM: abas, quadro, respostas rápidas e agendamentos.',
    stack: ['JavaScript', 'Chrome Extension (Manifest V3)', 'Node (testes)'],
    destaque: true,
    capa: {
      arquivo: 'manifest.json',
      linhas: [
        '"manifest_version": 3',
        'barra lateral   → CRM · respostas · agenda',
        'abas no topo    → por etapa do funil',
        'botão flutuante → notas · lembretes · ⚡',
        'versão          → 1.9.x, em uso diário',
      ],
    },
    contexto:
      'Quem vende pelo WhatsApp perde conversa no meio da lista. A ideia foi levar o CRM para dentro do WhatsApp Web, em vez de abrir mais uma aba com outro sistema.',
    feito: [
      'Abas de CRM com contagem de conversas e um quadro Kanban para arrastar contatos entre etapas',
      'Respostas rápidas com ações, scripts, notas e lembretes',
      'Janela de mensagens agendadas com recorrência, pausa e envio imediato',
      'Configurações para ligar e desligar cada recurso do menu',
    ],
    decisoes: [
      {
        titulo: 'Sem etapa de build',
        texto:
          'O Chrome carrega os arquivos de src/ como estão. Menos ferramenta entre a correção e o cliente usando.',
      },
      {
        titulo: 'Testes sem framework',
        texto:
          'Os content scripts rodam num contexto isolado do Node (vm.createContext) durante os testes, e um "WhatsApp falso" local deixa testar a interface sem conta real.',
      },
    ],
  },
  {
    slug: 'app-nutricionista',
    nome: 'App para nutricionista',
    categoria: 'app',
    status: 'em-andamento',
    ano: 2026,
    para: 'Consultório de nutrição — e, depois, outros profissionais',
    resumo: 'App clínico com área do paciente: anamnese, avaliações, fórmulas e evolução.',
    stack: ['React Native', 'Expo', 'React', 'Vite', 'Supabase', 'PostgreSQL', 'Vitest', 'TypeScript'],
    destaque: true,
    capa: {
      arquivo: 'monorepo',
      linhas: [
        'apps/mobile        → Expo: nutricionista e paciente',
        'apps/web           → painel do consultório',
        'packages/calculos  → fórmulas + Vitest',
        'supabase/          → migrations + testes de RLS',
      ],
    },
    contexto:
      'O nutricionista usa um sistema pago e queria uma ferramenta feita para o jeito dele de atender — sem perder o histórico dos pacientes que já estão lá.',
    feito: [
      'Um único app nas lojas com dois perfis: o login decide se abre a área do nutricionista ou a do paciente',
      'Painel web para o consultório',
      'Pacote de cálculos (dobras cutâneas, gasto energético) em TypeScript puro, com testes',
      'Plano de migração dos dados do sistema anterior',
    ],
    decisoes: [
      {
        titulo: 'Multi-tenant desde o primeiro dia',
        texto:
          'Começa com um profissional, mas os dados já ficam isolados por consultório com Row Level Security no Postgres. Virar SaaS não exige refazer a base.',
      },
      {
        titulo: 'Fórmula só com fonte',
        texto: 'Cada fórmula tem a referência conferida num documento do próprio repositório, com status de verificação.',
      },
      {
        titulo: 'Escopo fechado',
        texto:
          'MVP = pacientes, anamnese, avaliação, evolução e migração. Plano alimentar, agenda e IA ficam para depois.',
      },
    ],
  },
  {
    slug: 'natalie-calegari',
    nome: 'Natalie Calegari',
    categoria: 'site',
    status: 'no-ar',
    ano: 2026,
    para: 'Esteticista e injetora em São Paulo',
    resumo: 'Landing page de estética com agendamento direto pelo WhatsApp.',
    url: 'https://www.nataliecalegari.com.br/',
    host: 'nataliecalegari.com.br',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Framer Motion'],
    imagens: tela('natalie-calegari'),
    contexto:
      'Clínica de estética que atende pelo Instagram e pelo WhatsApp. O objetivo era transformar visita em conversa, sem formulário no meio do caminho.',
    feito: [
      'Bloco "encontre pelo seu objetivo": manchas, linhas de expressão, rejuvenescimento',
      'Cards de procedimento com botão que abre o WhatsApp citando o procedimento clicado',
      'Paleta dourado e azul-marinho sobre bege, pensada para o nicho sem copiar clínica nenhuma',
    ],
    decisoes: [
      {
        titulo: 'Texto de procedimento passa pela profissional',
        texto:
          'Descrição de procedimento estético tem implicação regulatória (CRBM, ANVISA). Os textos ficaram marcados para revisão dela antes de ir ao ar.',
      },
      {
        titulo: 'Sem backend',
        texto: 'Nada de carrinho ou agenda própria: todo botão leva para o WhatsApp ou para o Instagram, onde ela já atende.',
      },
    ],
  },
  {
    slug: 'ste-sunshine',
    nome: 'Ste Sunshine',
    categoria: 'site',
    status: 'no-ar',
    ano: 2026,
    para: 'Ímãs de geladeira personalizados',
    resumo: 'Vitrine de ímãs personalizados que leva cada ocasião para uma conversa no WhatsApp.',
    url: 'https://stesunshine.com.br/',
    host: 'stesunshine.com.br',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind'],
    imagens: tela('ste-sunshine'),
    contexto:
      '"Eternizando memórias": a Stephani transforma fotos de viagem, casamento e família em ímãs. O site precisava vender a ideia antes mesmo de existirem fotos do produto.',
    feito: [
      'Grade "o que vira ímã" em mosaico, com uma mensagem de WhatsApp diferente por ocasião',
      '"Como funciona" em quatro passos no lugar de vitrine com preço — tudo é sob encomenda',
      'Imagens provisórias desenhadas em SVG no rosa da marca até as fotos reais chegarem',
    ],
    decisoes: [
      {
        titulo: 'Dois links de WhatsApp, de propósito',
        texto:
          'No celular o botão vai para wa.me, que abre o app. No computador vai para web.whatsapp.com: o wa.me tenta o protocolo whatsapp:// e, em máquina com o protocolo registrado sem app por trás, a aba fecha sozinha sem abrir nada.',
      },
    ],
    detalhe: {
      titulo: 'O primeiro da leva',
      texto:
        'Foi o projeto que gerou o roteiro de hospedagem (Cloudflare + registro.br) reaproveitado em todos os sites seguintes.',
    },
  },
  {
    slug: 'filiposo',
    nome: 'Filiposo',
    categoria: 'site',
    status: 'no-ar',
    ano: 2026,
    para: 'Aulas particulares de Exatas e Inglês',
    resumo: 'Landing page para aulas particulares com um mestre em Física.',
    url: 'https://site-filiposo.kevinbaradelli.workers.dev/',
    host: 'site-filiposo.workers.dev',
    stack: ['React', 'Vite', 'Tailwind 4', 'Fontsource'],
    imagens: tela('filiposo'),
    contexto:
      'O Filipe — o Filiposo — é mestre em Física e dá aulas de Matemática, Física, Química e Inglês, do ensino fundamental à faculdade.',
    feito: [
      'Landing com aulas, como funciona e diferenciais',
      'Catálogo de Exatas com rotas próprias',
      'Fraunces nos títulos e Inter no texto, empacotadas no próprio site',
    ],
    decisoes: [
      {
        titulo: 'Fontes servidas pelo site',
        texto: 'Com o Fontsource as fontes entram no build: uma requisição externa a menos no primeiro carregamento.',
      },
    ],
  },
  {
    slug: 'studio-rosa-charm',
    nome: 'Studio Rosa Charm',
    categoria: 'site',
    status: 'entregue',
    ano: 2026,
    para: 'Cabelo, manicure e pedicure em Foz do Iguaçu',
    resumo: 'Site institucional de um estúdio de beleza, com promoções e agendamento pelo WhatsApp.',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind 4', 'Framer Motion'],
    imagens: tela('studio-rosa-charm'),
    contexto:
      'A Silene Rosa atende em Foz do Iguaçu (PR). O site reúne serviços, portfólio, promoções com prazo e um caminho curto até o WhatsApp.',
    feito: [
      'Página única com serviços, promoções, portfólio e sobre',
      'Todos os botões abrem o WhatsApp',
      'Imagem de prévia e sitemap prontos para o domínio próprio',
    ],
    decisoes: [
      {
        titulo: 'Trocar a fonte por causa de um acento',
        texto:
          'A Cormorant Garamond desenha o circunflexo de "ê" e "ô" alto e deslocado — em "você" e "três" fica visivelmente quebrado em título grande. Os títulos foram para a Playfair Display, conferida contra ê â ô ã õ á ç.',
      },
    ],
  },
  {
    slug: 'sr-espaco-da-beleza',
    nome: 'SR Espaço da Beleza',
    categoria: 'site',
    status: 'em-andamento',
    ano: 2026,
    para: 'Salão de beleza em São Mateus, São Paulo',
    resumo: 'Site de salão construído a partir de uma leitura completa do Instagram da cliente.',
    stack: ['React 19', 'Vite', 'Tailwind 4', 'Framer Motion'],
    imagens: tela('sr-espaco-da-beleza'),
    contexto:
      'Cabelos, unhas, cílios, sobrancelhas, bronze e cursos. A cliente tem um Instagram ativo e quase nenhum material pronto fora dele.',
    feito: [
      'Levantamento do perfil: 107 posts, 36 colaborações e 8 destaques lidos e avaliados de 1 a 3',
      'As 24 fotos mais bem avaliadas viraram o material do site',
      'Direção visual medida no celular (375×812 e 360×640) e implementada em nove etapas',
    ],
    decisoes: [
      {
        titulo: 'Seção pronta, escondida até ter dado',
        texto:
          'Antes/depois e depoimentos já existem no código, mas só aparecem quando houver conteúdo real nos arquivos de dados. Nada de depoimento inventado.',
      },
      {
        titulo: 'Quiz e combo esperam a lista de serviços',
        texto:
          '"Qual serviço é a sua cara?" e o montador de combo com preço somado dependem da lista oficial de serviços e preços da cliente.',
      },
    ],
  },
  {
    slug: 'metodo-mvp',
    nome: 'Método M.V.P',
    categoria: 'site',
    status: 'entregue',
    ano: 2026,
    para: 'Nutricionista esportivo, online e no Rio de Janeiro',
    resumo: 'Landing page de emagrecimento refeita do zero: de Elementor para HTML, CSS e JavaScript puros.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Meta Pixel'],
    imagens: tela('metodo-mvp'),
    contexto:
      'A página de vendas rodava em WordPress com Elementor: pesada, e com o rastreamento de conversão quebrado sem ninguém saber.',
    feito: [
      'Redesign completo mantendo o texto original',
      'Sem framework e sem build: publica em qualquer hospedagem, inclusive no mesmo cPanel do WordPress',
      'Imagens em WebP e caminhos relativos — funciona na raiz do domínio ou numa subpasta',
    ],
    decisoes: [
      {
        titulo: 'Consertar o rastreamento',
        texto:
          'Os botões chamavam a função de evento por um atributo mal configurado no Elementor, e ela nunca rodava. Agora o Meta Pixel registra Lead e Contact em todo clique, com o nome do botão (hero, header, flutuante, final) para saber qual posição converte.',
      },
      {
        titulo: 'Página leve converte melhor',
        texto:
          'Carregar em uma fração do tempo da versão anterior ajuda a conversão e o índice de qualidade dos anúncios.',
      },
    ],
  },
  {
    slug: 'graziele-cruz',
    nome: 'Graziele Cruz',
    categoria: 'site',
    status: 'entregue',
    ano: 2026,
    para: 'Atendimentos de oráculos e terapias',
    resumo: 'Site de uma página, sem build e sem dependências, com mensagem de WhatsApp por serviço.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Cloudflare'],
    imagens: tela('graziele-cruz'),
    contexto:
      'Atendimentos individuais de baralho cigano, radiestesia e magias. Uma página, e cada serviço com a sua mensagem de WhatsApp já escrita.',
    feito: [
      'Site inteiro num index.html, com CSS e JavaScript embutidos',
      'Headers de segurança configurados num arquivo _headers',
      'Imagem de compartilhamento própria',
    ],
    decisoes: [
      {
        titulo: 'Domínio antes de divulgar',
        texto:
          'WhatsApp e Instagram guardam a prévia do link em cache. Divulgar no endereço provisório deixa a prévia errada presa — a URL canônica só é fechada com o domínio final.',
      },
    ],
  },
  {
    slug: 'app-receitas',
    nome: 'Receitas e estoque da casa',
    categoria: 'app',
    status: 'em-andamento',
    ano: 2026,
    para: 'Famílias — com atenção a quem tem dificuldade com tecnologia',
    resumo: 'App offline de receitas, despensa e lista de compras, pensado para a terceira idade.',
    stack: ['React Native', 'Expo', 'SQLite', 'Supabase', 'TypeScript', 'Vitest'],
    capa: {
      arquivo: 'dominio.ts',
      linhas: [
        'estoque  → geladeira · freezer · despensa',
        'receitas → porções · unidades · densidade',
        'lista    → o que falta, por receita',
        'sync     → SQLite ⇄ Supabase (cursor por xid)',
      ],
    },
    contexto:
      'A família guarda as receitas, controla o que tem em casa e monta a lista de compras com o que falta — no celular, inclusive sem internet.',
    feito: [
      'Estoque, receitas e lista gravando no SQLite do aparelho, sem precisar de conta',
      'Regras de unidades, porções e validade em TypeScript puro, com testes',
      'Catálogo de ingredientes com densidade, para comparar receita em xícara com estoque em quilo',
    ],
    decisoes: [
      {
        titulo: 'Local-first com sincronização própria',
        texto:
          'A tela lê e grava no SQLite; a sincronização com o Supabase usa o id de transação do Postgres (xid) como cursor. Sem serviço pago de sync, e o app segue rodando no Expo Go.',
      },
      {
        titulo: 'Pensado para quem tem 70 anos',
        texto: 'Interface mínima, ícones legíveis e letra grande. O estoque entra à mão ou por código de barras.',
      },
    ],
  },
  {
    slug: 'zeno',
    nome: 'zeno.net · .dev · .blog',
    categoria: 'site',
    status: 'no-ar',
    ano: 2026,
    para: 'Projeto pessoal',
    resumo: 'Três domínios, um nick: a porta de entrada, este portfólio e o blog de estudos.',
    url: 'https://zeno.net.br/',
    host: 'zeno.net.br',
    stack: ['React 19', 'Vite', 'Tailwind 4', 'Framer Motion', 'Astro', 'Cloudflare'],
    imagens: { desktop: '/projetos/zeno-net-desktop.webp', celular: '/projetos/zeno-net-celular.webp' },
    contexto:
      'Um endereço para cada intenção: quem quer saber quem eu sou cai no .net, quem quer ver trabalho vem ao .dev, e o que eu estudo fica no .blog.',
    feito: [
      'zeno.net.br: uma janela de terminal com a luz azul correndo na borda',
      'zeno.dev.br: este portfólio — transição entre páginas, terminal interativo e paleta de comandos (Ctrl K)',
      'zeno.blog.br: blog em Markdown com trilhas de estudo, séries, TIL e busca',
    ],
    decisoes: [
      {
        titulo: 'Três repositórios, um tema',
        texto:
          'Sem monorepo: os três compartilham só o bloco @theme do Tailwind (cores e fontes). Com três sites, copiar o tema sai mais barato que manter ferramenta para isso.',
      },
      {
        titulo: 'A luz da borda é só CSS',
        texto:
          'Um conic-gradient girando por @property --angulo, com o miolo opaco por cima — sobra 1px de luz. Com "reduzir movimento" ligado, a borda para.',
      },
    ],
  },
  {
    slug: 'ps2-no-navegador',
    nome: 'Jogo de PS2 no navegador',
    categoria: 'laboratorio',
    status: 'pesquisa',
    ano: 2026,
    para: 'Estudo pessoal',
    resumo: 'Pesquisa: recompilar um jogo de PS2 para WebAssembly e jogar online, com o multiplayer local virando rede.',
    stack: ['WebAssembly', 'WebGPU', 'C++', 'Recompilação estática'],
    capa: {
      arquivo: 'pipeline',
      linhas: [
        'EE (MIPS) → C++ → WASM',
        'GS        → WebGPU',
        '4 controles locais → lockstep online',
        'ISO: só do disco próprio, nunca publicada',
      ],
    },
    contexto:
      'Spy vs Spy (2005) saiu só na Europa para PS2 e tem multiplayer local para até quatro pessoas. A pergunta: dá para jogar online no navegador, como já fizeram com outros jogos da mesma época?',
    feito: [
      'Comparação entre emulação, decompilação e recompilação estática',
      'Plano de teste com um recompilador EE → C++ → WASM usando a cópia do próprio disco',
      'Desenho do online por sincronização de controles (lockstep) em cima do multiplayer local',
    ],
    decisoes: [
      {
        titulo: 'Recompilar antes de decompilar',
        texto: 'Validar um recompilador leva horas; uma decompilação completa levaria anos — e não há decomp conhecida desse jogo.',
      },
      {
        titulo: 'Nada de distribuir jogo',
        texto: 'Nenhuma ISO nem código recompilado vai para lugar público.',
      },
    ],
  },
]

export const projetoPorSlug = (slug: string) => projetos.find((p) => p.slug === slug)
