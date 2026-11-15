// Gera as imagens de prévia de link (Open Graph, 1200×630) em public/og/.
//
//   npm run og
//
// Uma imagem por página (inicio.jpg, projetos.jpg…) e uma por projeto
// (projeto-<slug>.jpg), com o print do site ou a "capa" de terminal. O
// build (vite.config.ts) usa a do projeto quando ela existe e cai para
// og/inicio.jpg quando não existe — então rode isto sempre que entrar
// projeto novo ou mudar título/resumo, e faça commit das imagens.
//
// Precisa do Google Chrome instalado. Em outro caminho:
//   CHROME="/caminho/do/chrome" npm run og
// Roda direto no Node 22.18+ (lê TypeScript sem compilar).
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'
import { projetos, rotuloStatus, type Projeto } from '../src/data/projetos.ts'
import { metaPaginas, perfil } from '../src/data/site.ts'

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DESTINO = resolve(RAIZ, 'public/og')
const HOST = 'zeno.dev.br'

const chrome = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((c): c is string => !!c && existsSync(c))
if (!chrome) throw new Error('og: não achei o Chrome. Rode com CHROME="/caminho/do/chrome" npm run og')

const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Imagem de public/ embutida no HTML: o cartão é montado em about:blank,
 *  que não carrega file:// de forma confiável. */
function embutir(publico: string) {
  const arquivo = resolve(RAIZ, 'public', publico.replace(/^\//, ''))
  const tipo = arquivo.endsWith('.webp') ? 'image/webp' : arquivo.endsWith('.png') ? 'image/png' : 'image/jpeg'
  return `data:${tipo};base64,${readFileSync(arquivo).toString('base64')}`
}

const AVATAR = embutir(perfil.foto)

type Cartao = {
  nome: string
  rotulo: string
  titulo: string
  texto: string
  caminho: string
  visual: string
}

// ------------------------------------------------------------------ visuais

const visualAvatar = () => `
  <div class="avatar-grande"><img src="${AVATAR}" alt=""></div>`

const visualTela = (p: Projeto) => `
  <div class="janela">
    <div class="barra"><i></i><i></i><i></i><span>${esc(p.host ?? p.slug)}</span></div>
    <img class="tela" src="${embutir(p.imagens!.desktop)}" alt="">
  </div>`

const visualTerminal = (arquivo: string, linhas: string[]) => `
  <div class="janela">
    <div class="barra"><i></i><i></i><i></i><span>${esc(arquivo)}</span></div>
    <div class="terminal">
      ${linhas
        .slice(0, 7)
        .map((l, i) => `<div><span class="n">${i + 1}</span>${esc(l)}</div>`)
        .join('')}
    </div>
  </div>`

// ------------------------------------------------------------------ cartões

const NOMES_PAGINA: Record<string, string> = {
  '/': 'Zeno',
  '/projetos': 'Projetos',
  '/servicos': 'Serviços',
  '/sobre': 'Sobre',
  '/stack': 'Stack',
  '/agora': 'Agora',
  '/contato': 'Contato',
}

const cartoes: Cartao[] = [
  ...Object.entries(metaPaginas).map(([caminho, m]) => ({
    nome: caminho === '/' ? 'inicio' : caminho.slice(1),
    rotulo: caminho === '/' ? `~/${perfil.papel.toLowerCase()}` : `~${caminho}`,
    titulo: NOMES_PAGINA[caminho] ?? m.titulo,
    texto: m.descricao,
    caminho: caminho === '/' ? '' : caminho,
    visual:
      caminho === '/projetos'
        ? visualTerminal(
            'ls ~/projetos',
            projetos.slice(0, 7).map((p) => `${p.nome} · ${rotuloStatus[p.status]}`),
          )
        : visualAvatar(),
  })),
  ...projetos.map((p) => ({
    nome: `projeto-${p.slug}`,
    rotulo: `projeto · ${p.categoria} · ${rotuloStatus[p.status]}`,
    titulo: p.nome,
    texto: p.resumo,
    caminho: `/projetos/${p.slug}`,
    visual: p.imagens
      ? visualTela(p)
      : p.capa
        ? visualTerminal(p.capa.arquivo, p.capa.linhas)
        : visualAvatar(),
  })),
]

const FONTES =
  'https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@1,700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=block'

function html(c: Cartao) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<link rel="stylesheet" href="${FONTES}">
<style>
  * { margin: 0; box-sizing: border-box }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: #05070d; color: #f2f6fb; font-family: Inter, system-ui, sans-serif }
  .luz { position: absolute; inset: 0;
    background:
      radial-gradient(55% 75% at 88% 12%, rgba(47,129,247,.30), transparent 70%),
      radial-gradient(45% 55% at 0% 100%, rgba(88,179,255,.10), transparent 70%) }
  .malha { position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
    background-size: 44px 44px;
    -webkit-mask-image: radial-gradient(70% 90% at 75% 30%, #000 25%, transparent 80%) }
  .moldura { position: absolute; inset: 0; border: 1px solid rgba(88,179,255,.18) }
  main { position: relative; height: 100%; padding: 56px 64px 52px; display: flex; gap: 52px }
  .esquerda { flex: 1; min-width: 0; display: flex; flex-direction: column }
  .marca { display: flex; align-items: center; gap: 14px }
  .marca img { width: 50px; height: 50px; border-radius: 13px; object-fit: cover;
    border: 2px solid #05070d; box-shadow: 0 0 0 2px #e11d3a, 0 0 26px rgba(225,29,58,.55) }
  .marca b { font-family: 'Chakra Petch'; font-style: italic; font-weight: 700; font-size: 32px; letter-spacing: -.02em }
  .marca span { font-family: 'JetBrains Mono'; font-size: 15px; color: #58b3ff; border: 1px solid rgba(47,129,247,.35);
    background: rgba(47,129,247,.12); border-radius: 6px; padding: 2px 8px }
  .rotulo { margin-top: auto; font-family: 'JetBrains Mono'; font-size: 19px; color: #9fd8ff }
  h1 { margin-top: 12px; font-family: 'Chakra Petch'; font-style: italic; font-weight: 700; line-height: 1.02;
    letter-spacing: -.02em; text-shadow: 0 0 34px rgba(47,129,247,.40) }
  p { margin-top: 20px; font-size: 25px; line-height: 1.42; color: #c3cede;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden }
  .url { margin-top: 30px; font-family: 'JetBrains Mono'; font-size: 18px; color: #58b3ff }
  .url em { font-style: normal; color: #8093ab }
  .direita { width: 470px; flex-shrink: 0; display: flex; align-items: center; justify-content: center }
  .janela { width: 100%; border-radius: 16px; overflow: hidden; background: #0c111c;
    border: 1px solid rgba(88,179,255,.38);
    box-shadow: 0 0 0 1px rgba(47,129,247,.12), 0 0 60px -10px rgba(47,129,247,.55), 0 40px 80px -30px #000 }
  .barra { display: flex; align-items: center; gap: 8px; padding: 12px 16px;
    border-bottom: 1px solid rgba(255,255,255,.07); font-family: 'JetBrains Mono'; font-size: 13px; color: #8093ab }
  .barra i { width: 10px; height: 10px; border-radius: 50%; background: #253047 }
  .barra i:nth-child(3) { background: #2f81f7 }
  .barra span { margin-left: 10px }
  .tela { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; object-position: top }
  .terminal { padding: 22px 22px 26px; font-family: 'JetBrains Mono'; font-size: 16px; line-height: 1.85; color: #c3cede }
  .terminal div { white-space: nowrap; overflow: hidden; text-overflow: ellipsis }
  .terminal .n { display: inline-block; width: 26px; color: #4d5b70 }
  .avatar-grande { width: 330px; height: 330px; border-radius: 36px; padding: 3px;
    background: conic-gradient(from 210deg, #e11d3a, #ff6b7a, #2f81f7, #58b3ff, #e11d3a);
    box-shadow: 0 0 70px -6px rgba(225,29,58,.55), 0 0 120px -20px rgba(47,129,247,.5) }
  .avatar-grande img { width: 100%; height: 100%; border-radius: 33px; object-fit: cover; display: block; border: 4px solid #05070d }
</style></head><body>
<div class="luz"></div><div class="malha"></div><div class="moldura"></div>
<main>
  <div class="esquerda">
    <div class="marca"><img src="${AVATAR}" alt=""><b>${esc(perfil.nick)}</b><span>.dev</span></div>
    <div class="rotulo">${esc(c.rotulo)}</div>
    <h1 style="font-size:${c.titulo.length > 16 ? 62 : 80}px">${esc(c.titulo)}</h1>
    <p>${esc(c.texto)}</p>
    <div class="url">${HOST}<em>${esc(c.caminho)}</em></div>
  </div>
  <div class="direita">${c.visual}</div>
</main>
</body></html>`
}

mkdirSync(DESTINO, { recursive: true })
const navegador = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--hide-scrollbars'] })
try {
  const pagina = await navegador.newPage()
  await pagina.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
  for (const c of cartoes) {
    // 'load' e não 'networkidle0': a conexão com o Google Fonts fica
    // aberta entre um cartão e outro e o "rede ociosa" nunca chega
    await pagina.setContent(html(c), { waitUntil: 'load' })
    await pagina.evaluate(async () => {
      await document.fonts.ready
      await Promise.all([...document.images].map((i) => i.decode().catch(() => {})))
    })
    const arquivo = resolve(DESTINO, `${c.nome}.jpg`)
    await pagina.screenshot({ path: arquivo as `${string}.jpeg`, type: 'jpeg', quality: 86 })
    console.log('og:', `public/og/${c.nome}.jpg`)
  }
} finally {
  await navegador.close()
}
console.log(`og: ${cartoes.length} imagens`)
