/** Página Stack: o que uso e para quê. `nivel` descreve a relação com a
 *  ferramenta, sem barrinha de porcentagem inventada. */

export type ItemStack = { nome: string; nota: string }
export type GrupoStack = { id: string; titulo: string; resumo: string; itens: ItemStack[] }

export const stack: GrupoStack[] = [
  {
    id: 'backend',
    titulo: 'Backend',
    resumo: 'O trabalho do dia a dia.',
    itens: [
      { nome: 'Java', nota: 'A linguagem principal no trabalho.' },
      { nome: 'Spring Boot', nota: 'APIs, integrações e serviços em produção.' },
      { nome: 'AWS', nota: 'Certificado Developer – Associate e Cloud Practitioner (2022).' },
      { nome: 'PostgreSQL', nota: 'Também por baixo do Supabase nos apps.' },
      { nome: 'Liquibase', nota: 'Migração de banco versionada junto com o código.' },
    ],
  },
  {
    id: 'web',
    titulo: 'Web',
    resumo: 'A base de todos os sites recentes.',
    itens: [
      { nome: 'React 19', nota: 'Componentes e rotas nos sites e no painel web.' },
      { nome: 'TypeScript', nota: 'Em tudo que não é HTML puro.' },
      { nome: 'Vite 8', nota: 'Dev server e build; plugins próprios para meta tags por rota.' },
      { nome: 'Tailwind CSS 4', nota: 'Tema no próprio CSS, via @theme.' },
      { nome: 'Framer Motion', nota: 'Transições de página, revelação por scroll, layout animado.' },
      { nome: 'Astro', nota: 'O blog: Markdown, RSS e páginas estáticas.' },
    ],
  },
  {
    id: 'mobile',
    titulo: 'Apps',
    resumo: 'Quando o projeto precisa morar no celular.',
    itens: [
      { nome: 'React Native + Expo', nota: 'Um código para Android e iOS, com expo-router.' },
      { nome: 'SQLite', nota: 'Dados no aparelho para funcionar sem internet.' },
      { nome: 'Supabase', nota: 'Postgres, login, arquivos e Row Level Security.' },
      { nome: 'Vitest', nota: 'Regras de negócio testadas fora da tela.' },
    ],
  },
  {
    id: 'infra',
    titulo: 'Publicação',
    resumo: 'Do build ao domínio.',
    itens: [
      { nome: 'Cloudflare Workers', nota: 'Assets estáticos no plano gratuito, deploy a cada push.' },
      { nome: 'registro.br', nota: 'Domínios .com.br e .net.br, DNS apontado para a Cloudflare.' },
      { nome: 'GitHub', nota: 'Um repositório por projeto.' },
      { nome: 'Docker', nota: 'Para o que precisa rodar igual em qualquer máquina.' },
    ],
  },
  {
    id: 'ferramentas',
    titulo: 'Bancada',
    resumo: 'O que está aberto na tela.',
    itens: [
      { nome: 'IntelliJ IDEA', nota: 'Java e Spring.' },
      { nome: 'VS Code', nota: 'Front, scripts e Markdown.' },
      { nome: 'Claude Code', nota: 'Par de programação: pesquisa, código e revisão.' },
      { nome: 'Python + Pillow', nota: 'Recorte de foto, imagens de prévia, screenshots em lote.' },
      { nome: 'FFmpeg', nota: 'Vídeo e áudio pela linha de comando.' },
    ],
  },
]

/** Faixa que corre na home. */
export const letreiro = [
  'Java',
  'Spring Boot',
  'AWS',
  'React',
  'TypeScript',
  'Tailwind',
  'Framer Motion',
  'React Native',
  'Expo',
  'Supabase',
  'PostgreSQL',
  'SQLite',
  'Vite',
  'Astro',
  'Cloudflare',
  'Chrome Extensions',
]
