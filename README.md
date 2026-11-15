# zeno.dev.br — portfólio

Site de várias páginas do Zeno: projetos com contexto e decisões, serviços,
sobre, stack, `/agora` e um contato que monta o briefing sozinho. Mesmo
estilo do `zeno.net.br` (fundo escuro, luz azul na borda, Chakra Petch em
itálico), com mais espaço e mais movimento.

Os três domínios são projetos separados:

| domínio        | papel                       | repositório      |
| -------------- | --------------------------- | ---------------- |
| `zeno.net.br`  | porta de entrada            | `../zeno-net`    |
| `zeno.dev.br`  | **este** — portfólio        | `../zeno-dev`    |
| `zeno.blog.br` | blog de estudos (Astro)     | `../zeno-blog`   |

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 4 (tema no CSS, `@theme` em `src/index.css`, o mesmo do `.net`)
- Framer Motion (transições de página, layout, revelação por scroll)
- React Router 7 com uma rota por página e _code splitting_ (cada página é
  um pedaço de JS que só baixa quando você navega até ela)
- Sem backend. Hospedado como assets estáticos no Cloudflare Workers.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5181 (na raiz do workspace: preview "zeno-dev")
npm run build    # tsc + vite build → dist/ (com um HTML por rota + sitemap.xml)
npm run preview  # serve o dist/
npm run og       # refaz as imagens de prévia de link em public/og/
```

Node 22.18 ou mais novo (`.nvmrc`). O `npm run og` usa o Google Chrome
instalado (outro caminho: `CHROME="/caminho/do/chrome" npm run og`).

## Onde mexer no conteúdo

Tudo que é texto está em `src/data/` — não precisa abrir componente.

| arquivo              | o que tem                                                        |
| -------------------- | ---------------------------------------------------------------- |
| `site.ts`            | perfil, **contato**, domínios, menu e título/descrição de cada página |
| `projetos.ts`        | os projetos (cards, filtros e a página de cada case)             |
| `servicos.ts`        | ofertas, processo de trabalho e perguntas frequentes             |
| `sobre.ts`           | bio, trajetória, certificações, princípios                       |
| `stack.ts`           | ferramentas por grupo e o letreiro da home                       |
| `agora.ts`           | a página `/agora` — mude `atualizadoEm` quando atualizar         |
| `blog.ts`            | endereço do feed do blog e os posts de reserva                   |

### Antes de publicar

- **Contato:** `contato.email` e `contato.whatsapp` em `site.ts` estão vazios
  de propósito. Preenchidos, aparecem os botões "Enviar pelo WhatsApp" e
  "Enviar por e-mail" no `/contato` (o WhatsApp abre o app no celular e o
  WhatsApp Web no computador). WhatsApp no formato `5511999999999`.
- **Nome:** `perfil.nome` aparece na página Sobre. Deixe `''` para assinar
  só como Zeno.

### Projeto novo

1. Acrescente um objeto em `src/data/projetos.ts` (o tipo `Projeto` no topo
   do arquivo diz o que é obrigatório). `destaque: true` leva para a home.
2. Prints em `public/projetos/`: `<slug>-desktop.webp` (1440×900) e
   `<slug>-celular.webp` (390×844 em 2×). Sem tela pública? Use `capa`
   (um terminal com algumas linhas) no lugar de `imagens`.
3. `npm run og` para gerar `public/og/projeto-<slug>.jpg`.
4. `npm run build` — a página `/projetos/<slug>` ganha HTML próprio, entra
   no sitemap e na paleta de comandos.

## Como está organizado

```
scripts/og.ts            gera as imagens de prévia (1200×630) com o Chrome
public/
  og/                    imagens de prévia de link (geradas, vão no commit)
  projetos/              prints dos projetos (webp)
  _headers               cabeçalhos de segurança e cache (Cloudflare)
src/
  data/                  todo o conteúdo (ver tabela acima)
  lib/
    meta.ts              título, descrição, og:* e canonical por página (no navegador)
    movimento.ts         curvas e molas compartilhadas
    useUltimosPosts.ts   lê o feed do blog; se falhar, usa os posts de reserva
  components/
    layout/              Layout (transição entre páginas), Topo, Rodape
    efeitos/             texto que decifra, texto que sobe, contador, cartão
                         com holofote, inclinação 3D, ímã, faíscas no clique,
                         letreiro, fundo que acende com o cursor, barra de leitura
    ui/                  Janela (a moldura com luz), Botao, Abas, Acordeao,
                         Aviso (toast), Telas (navegador/celular), Selo
    Paleta.tsx           paleta de comandos (Ctrl K ou /)
    TerminalInterativo.tsx  o terminal da home (digite `help`)
    CartaoProjeto.tsx
  pages/                 uma por rota
vite.config.ts           plugin meta-por-rota: um HTML por rota + sitemap.xml
```

**Por que um HTML por rota?** O site é uma SPA, e quem monta a prévia de
link (WhatsApp, LinkedIn, Google) não roda JavaScript. O plugin no
`vite.config.ts` grava `dist/<rota>/index.html` com título, descrição e
`og:image` certos. Se uma meta tag sumir do `index.html`, o build para.

**Feed do blog.** A home mostra os últimos posts de
`https://zeno.blog.br/feed.json`. Enquanto o blog não estiver no ar (ou se
falhar), aparecem os posts de `src/data/blog.ts` — o erro de DNS no console
em desenvolvimento é esperado até lá.

## Movimento e acessibilidade

- Tudo respeita "reduzir movimento" do sistema (`MotionConfig reducedMotion="user"`
  e um bloco `prefers-reduced-motion` no CSS).
- Textos animados têm a versão final para leitor de tela (`sr-only`) e a
  animação escondida dele (`aria-hidden`).
- Abas com setas do teclado, paleta como combobox, menu do celular fecha com
  Esc, link "Pular para o conteúdo".
- Efeitos inspirados em reactbits.dev, transitions.dev e nas regras do
  tasteskill.dev, reescritos à mão — sem biblioteca extra de efeitos.

## Deploy — Cloudflare Workers (assets estáticos, plano grátis)

`wrangler.jsonc` já está pronto. No painel: Workers & Pages → Create →
importar do Git.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- "Protect with Cloudflare Access" desligado
- Domínio: Settings → Domains & Routes → Custom domain → `zeno.dev.br`

Testar antes: `npx wrangler deploy --dry-run`. Para um endereço de teste
com as meta tags certas: `SITE_URL=https://zeno-dev.<conta>.workers.dev npm run build`.
