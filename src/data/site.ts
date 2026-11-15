/** Dados gerais do portfólio: quem é, como achar, para onde ir.
 *  Tudo que é texto fixo do site sai daqui ou dos outros arquivos de
 *  `src/data/` — as páginas só montam o layout. */

export const SITE_URL = 'https://zeno.dev.br'

export const perfil = {
  nick: 'Zeno',
  /** Nome que aparece na página Sobre. Deixe '' para assinar só como Zeno. */
  nome: 'Kevin Baradelli',
  papel: 'Engenheiro de software',
  cidade: 'São Paulo, BR',
  foto: '/perfil.webp',
  fotoAlt: 'Kaneki, de Tokyo Ghoul, sobre fundo vermelho — o avatar do Zeno',
  /** Selo verde do topo. '' esconde. */
  disponibilidade: 'aberto a freelas',
  /** Frases que trocam no subtítulo da home, com blur. */
  frentes: [
    'backend em Java e Spring na Hotmart',
    'sites para negócios que vendem pelo WhatsApp',
    'apps em React Native com Supabase',
    'extensões e automações sob medida',
  ],
  resumo:
    'Engenheiro de software backend de dia. Fora do expediente, faço sites, apps e ferramentas para negócios pequenos — do salão de bairro ao ateliê de colecionáveis.',
} as const

export type Rede = { nome: string; url: string; rotulo: string }

/** `url` vazia esconde o canal em todo o site. */
export const contato = {
  /** Endereço de e-mail para orçamentos. Vazio = o canal não aparece. */
  email: '',
  /** WhatsApp em formato internacional, só dígitos (ex.: 5511999999999). */
  whatsapp: '',
  redes: [
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/in/kevin-baradelli/', rotulo: 'in/kevin-baradelli' },
    { nome: 'GitHub', url: 'https://github.com/Zeno-64', rotulo: 'Zeno-64' },
  ] satisfies Rede[],
}

export const dominios = [
  { host: 'zeno.net.br', url: 'https://zeno.net.br', papel: 'porta de entrada' },
  { host: 'zeno.dev.br', url: SITE_URL, papel: 'portfólio', atual: true },
  { host: 'zeno.blog.br', url: 'https://zeno.blog.br', papel: 'estudos' },
] as const

/** Ordem das rotas: decide se a transição de página vai para a
 *  esquerda (avançando) ou para a direita (voltando). */
export const navegacao = [
  { rota: '/', rotulo: 'Início' },
  { rota: '/projetos', rotulo: 'Projetos' },
  { rota: '/servicos', rotulo: 'Serviços' },
  { rota: '/sobre', rotulo: 'Sobre' },
  { rota: '/stack', rotulo: 'Stack' },
  { rota: '/agora', rotulo: 'Agora' },
  { rota: '/contato', rotulo: 'Contato' },
] as const

/** Metadados de cada página fixa — usados pela própria página (título da
 *  aba) e pelo build, que grava um HTML por rota com essas meta tags. */
export const metaPaginas: Record<string, { titulo: string; descricao: string }> = {
  '/': {
    titulo: 'Zeno — engenheiro de software · sites, apps e backend',
    descricao:
      'Portfólio do Zeno: backend em Java, Spring e AWS, e sites, apps e ferramentas sob medida para negócios pequenos.',
  },
  '/projetos': {
    titulo: 'Projetos · Zeno',
    descricao:
      'Sites no ar, apps em desenvolvimento, extensão do Chrome e experimentos — com o contexto e as decisões de cada um.',
  },
  '/servicos': {
    titulo: 'Serviços · Zeno',
    descricao:
      'Sites de uma página, catálogos, landing pages, apps e automações para negócios pequenos. Hospedagem sem mensalidade.',
  },
  '/sobre': {
    titulo: 'Sobre · Zeno',
    descricao: 'Quem está por trás do Zeno: trajetória, certificações e o que move os projetos.',
  },
  '/stack': {
    titulo: 'Stack · Zeno',
    descricao: 'As linguagens, frameworks e ferramentas que uso no trabalho e nos projetos — e por quê.',
  },
  '/agora': {
    titulo: 'Agora · Zeno',
    descricao: 'No que estou trabalhando, o que estou construindo e o que estou estudando neste momento.',
  },
  '/contato': {
    titulo: 'Contato · Zeno',
    descricao: 'Monte um briefing rápido e fale comigo sobre o seu projeto.',
  },
}
