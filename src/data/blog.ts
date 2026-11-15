/** Integração com o zeno.blog.br.
 *
 *  A home busca os posts mais recentes em FEED_URL (JSON Feed 1.1 que o
 *  blog publica, com CORS liberado para este domínio no _headers dele).
 *  Se a busca falhar — rodando local, blog fora do ar, rede ruim — a
 *  lista abaixo aparece no lugar. Atualize-a de vez em quando. */

export const BLOG_URL = 'https://zeno.blog.br'
export const FEED_URL = `${BLOG_URL}/feed.json`

export type PostResumo = {
  titulo: string
  url: string
  data: string // AAAA-MM-DD
  resumo: string
  tags: string[]
}

export const postsReserva: PostResumo[] = [
  {
    titulo: 'Do registro.br à Cloudflare: site estático sem mensalidade',
    url: `${BLOG_URL}/posts/site-estatico-cloudflare-registro-br/`,
    data: '2026-11-15',
    resumo: 'O roteiro que uso em todo site de cliente: domínio, DNS, Worker de assets e o que conferir antes de divulgar.',
    tags: ['cloudflare', 'deploy', 'dns'],
  },
  {
    titulo: 'SPA, WhatsApp e a prévia de link que não aparece',
    url: `${BLOG_URL}/posts/spa-previa-de-link/`,
    data: '2026-11-15',
    resumo: 'Crawler de link não roda JavaScript. Como gerar um HTML por rota no build do Vite e fazer a foto certa aparecer.',
    tags: ['vite', 'seo', 'react'],
  },
  {
    titulo: 'Por que o wa.me fecha a aba no computador',
    url: `${BLOG_URL}/posts/wa-me-no-desktop/`,
    data: '2026-11-15',
    resumo: 'O botão de WhatsApp que funciona no celular e some no desktop — e o link que resolve.',
    tags: ['whatsapp', 'til'],
  },
]
