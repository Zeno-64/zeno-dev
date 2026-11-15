/** Página Sobre. Datas e instituições vêm do LinkedIn público; onde o
 *  LinkedIn não mostra o detalhe (nome de curso, cargo exato), o texto
 *  fica genérico de propósito — complete aqui quando quiser. */

export const bio = [
  'Sou engenheiro de software com foco em backend: Java, Spring Boot e AWS, hoje na Hotmart. É onde passo o dia entre APIs, dados e integrações que não podem parar.',
  'Fora do expediente, viro o Zeno: faço sites, apps e ferramentas para negócios pequenos. O salão do bairro, a clínica de estética, o ateliê de colecionáveis, o professor particular — gente que vende pelo WhatsApp e precisa de um site rápido no celular, bonito e fácil de manter.',
  'Gosto de entregar coisa que funciona no aparelho de quem vai usar, carrega rápido e não depende de mim para trocar um texto. E de anotar o que aprendo no caminho: tudo vira estudo no zeno.blog.br.',
]

export type Marco = {
  quando: string
  titulo: string
  texto: string
  tipo: 'trabalho' | 'estudo' | 'certificacao' | 'projeto'
}

/** Do mais recente para o mais antigo. */
export const trajetoria: Marco[] = [
  {
    quando: '2026',
    titulo: 'Zeno: sites e apps sob medida',
    texto:
      'Nove sites para negócios pequenos, dois apps em desenvolvimento e uma extensão do Chrome em uso diário — todos no portfólio.',
    tipo: 'projeto',
  },
  {
    quando: 'hoje',
    titulo: 'Hotmart · engenharia de backend',
    texto: 'Java, Spring Boot e AWS no time de engenharia, em São Paulo.',
    tipo: 'trabalho',
  },
  {
    quando: '2026–2027',
    titulo: 'De volta aos estudos',
    texto: 'Nova formação em andamento na Anhanguera Educacional.',
    tipo: 'estudo',
  },
  {
    quando: '2022',
    titulo: 'Certificações AWS',
    texto: 'Cloud Practitioner (fevereiro) e Developer – Associate (março).',
    tipo: 'certificacao',
  },
  {
    quando: '2022',
    titulo: 'GFT · programa LevelUp',
    texto: 'Formação em nuvem pela GFT, seguida de projeto como desenvolvedor.',
    tipo: 'trabalho',
  },
  {
    quando: '2017–2021',
    titulo: 'Graduação',
    texto: 'Anhanguera Educacional.',
    tipo: 'estudo',
  },
  {
    quando: '2014–2016',
    titulo: 'Primeira formação',
    texto: 'Anhanguera Educacional.',
    tipo: 'estudo',
  },
]

export const certificacoes = [
  { nome: 'AWS Certified Developer – Associate', emissor: 'Amazon Web Services', ano: '2022' },
  { nome: 'AWS Certified Cloud Practitioner', emissor: 'Amazon Web Services', ano: '2022' },
]

export const idiomas = [
  { nome: 'Português', nivel: 'nativo' },
  { nome: 'Inglês', nivel: 'intermediário' },
]

/** Princípios que aparecem nos projetos — cada um com a prova ao lado. */
export const principios = [
  {
    titulo: 'Celular primeiro',
    prova: 'Toda direção visual é medida em 375×812 e 360×640 antes do desktop.',
  },
  {
    titulo: 'Conteúdo num arquivo só',
    prova: 'Texto, preço, foto e número de WhatsApp ficam em src/data — trocar um texto não exige caçar componente.',
  },
  {
    titulo: 'Nada inventado',
    prova: 'Seção de depoimento só aparece com depoimento real; enquanto não chega, ela fica escondida no código.',
  },
  {
    titulo: 'Sem mensalidade escondida',
    prova: 'Sites estáticos na Cloudflare, no plano gratuito. O cliente paga o domínio e mais nada.',
  },
]

export const foraDoCodigo = [
  { titulo: 'Anime', texto: 'O avatar é o Kaneki, de Tokyo Ghoul. Não é por acaso.' },
  { titulo: 'Jogos', texto: 'De PS2 a RPG Maker — e a vontade de ver jogo antigo rodando no navegador.' },
  { titulo: 'Aprender em público', texto: 'O que estudo vira trilha, nota ou post no blog.' },
]
