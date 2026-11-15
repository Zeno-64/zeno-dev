import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'
import { projetos } from './src/data/projetos.ts'
import { metaPaginas } from './src/data/site.ts'

// Domínio de produção. og:image e og:url precisam ser absolutos — quem
// monta a prévia de link não resolve caminho relativo de forma confiável.
// Para testar em outro endereço: SITE_URL=https://... npm run build
const SITE = (process.env.SITE_URL ?? 'https://zeno.dev.br').replace(/\/+$/, '')

const escapar = (t: string) =>
  t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

type Meta = { caminho: string; titulo: string; descricao: string; imagem: string }

/** Troca o `content`/`href` de uma tag achada pelo atributo que a
 *  identifica. Se a tag sumir do index.html o build PARA: publicar o
 *  site inteiro com a meta errada é pior que um build vermelho. */
function trocar(html: string, seletor: string, atributo: 'content' | 'href', valor: string) {
  const alvo = new RegExp(`(<(?:meta|link)[^>]*${seletor}[^>]*${atributo}=")[^"]*(")`, 'i')
  if (!alvo.test(html)) throw new Error(`meta-por-rota: não achei ${seletor} no index.html`)
  return html.replace(alvo, `$1${escapar(valor)}$2`)
}

function aplicar(html: string, m: Meta) {
  const url = SITE + m.caminho
  let saida = html.replace(/<title>[^<]*<\/title>/, `<title>${escapar(m.titulo)}</title>`)
  saida = trocar(saida, 'name="description"', 'content', m.descricao)
  saida = trocar(saida, 'rel="canonical"', 'href', url)
  saida = trocar(saida, 'property="og:title"', 'content', m.titulo)
  saida = trocar(saida, 'property="og:description"', 'content', m.descricao)
  saida = trocar(saida, 'property="og:url"', 'content', url)
  saida = trocar(saida, 'property="og:image"', 'content', m.imagem)
  return saida
}

/** Grava um HTML por rota com as meta tags certas e o sitemap.xml.
 *
 *  O site é uma SPA: título e descrição só trocam depois que o JS roda, e
 *  crawler de link (WhatsApp, LinkedIn, Google) não roda JS. Com isto, o
 *  link de um case compartilhado mostra o nome e a imagem do projeto —
 *  mesma técnica do site da Narakaito Lab. */
function metaPorRota(): Plugin {
  let destino = 'dist'
  return {
    name: 'meta-por-rota',
    apply: 'build',
    configResolved(config) {
      destino = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const base = resolve(destino, 'index.html')
      if (!existsSync(base)) return
      const modelo = readFileSync(base, 'utf8')

      const imagem = (nome: string) =>
        existsSync(resolve(destino, 'og', `${nome}.jpg`)) ? `${SITE}/og/${nome}.jpg` : `${SITE}/og/inicio.jpg`

      const rotas: Meta[] = [
        ...Object.entries(metaPaginas).map(([caminho, m]) => ({
          caminho,
          titulo: m.titulo,
          descricao: m.descricao,
          imagem: imagem(caminho === '/' ? 'inicio' : caminho.slice(1)),
        })),
        ...projetos.map((p) => ({
          caminho: `/projetos/${p.slug}`,
          titulo: `${p.nome} · Projetos · Zeno`,
          descricao: p.resumo,
          imagem: imagem(`projeto-${p.slug}`),
        })),
      ]

      for (const rota of rotas) {
        const html = aplicar(modelo, rota)
        const arquivo =
          rota.caminho === '/' ? base : resolve(destino, rota.caminho.slice(1), 'index.html')
        mkdirSync(dirname(arquivo), { recursive: true })
        writeFileSync(arquivo, html)
      }

      const hoje = new Date().toISOString().slice(0, 10)
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...rotas.map(
          (r) =>
            `  <url><loc>${SITE}${r.caminho === '/' ? '/' : r.caminho}</loc><lastmod>${hoje}</lastmod></url>`,
        ),
        '</urlset>',
        '',
      ].join('\n')
      writeFileSync(resolve(destino, 'sitemap.xml'), sitemap)

      console.log(`meta-por-rota: ${rotas.length} páginas + sitemap.xml em ${SITE}`)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), metaPorRota()],
})
