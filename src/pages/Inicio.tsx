import { Link } from 'react-router-dom'
import CartaoProjeto from '../components/CartaoProjeto'
import CartaoHolofote from '../components/efeitos/CartaoHolofote'
import Contador from '../components/efeitos/Contador'
import Ima from '../components/efeitos/Ima'
import Letreiro from '../components/efeitos/Letreiro'
import Revelar from '../components/efeitos/Revelar'
import TextoDecifrado from '../components/efeitos/TextoDecifrado'
import TextoSubindo from '../components/efeitos/TextoSubindo'
import TrocaTexto from '../components/efeitos/TrocaTexto'
import TerminalInterativo from '../components/TerminalInterativo'
import Botao, { Seta } from '../components/ui/Botao'
import { TituloSecao } from '../components/ui/Cabecalho'
import Janela from '../components/ui/Janela'
import { BLOG_URL } from '../data/blog'
import { projetos } from '../data/projetos'
import { metaPaginas, perfil } from '../data/site'
import { certificacoes } from '../data/sobre'
import { letreiro } from '../data/stack'
import { usarMeta } from '../lib/meta'
import { formatarData } from '../lib/movimento'
import { useUltimosPosts } from '../lib/useUltimosPosts'

const sitesEntregues = projetos.filter(
  (p) => p.categoria === 'site' && p.slug !== 'zeno' && (p.status === 'no-ar' || p.status === 'entregue'),
).length
const emProducao = projetos.filter((p) => p.status === 'no-ar' || p.status === 'em-uso').length
const appsEmConstrucao = projetos.filter((p) => p.categoria === 'app' && p.status === 'em-andamento').length
const noAr = projetos.filter((p) => p.status === 'no-ar' && p.slug !== 'zeno').length

const numeros = [
  { valor: sitesEntregues, rotulo: 'sites entregues para negócios' },
  { valor: emProducao, rotulo: 'projetos no ar ou em uso' },
  { valor: appsEmConstrucao, rotulo: 'apps em construção' },
  { valor: certificacoes.length, rotulo: 'certificações AWS' },
]

const frentes = [
  {
    titulo: 'Sites que levam o cliente para o WhatsApp',
    prova: `${sitesEntregues} sites para salão, estética, ateliê, aulas e ímãs — com o botão certo no celular e no computador.`,
    para: '/servicos',
    rotulo: 'ver serviços',
  },
  {
    titulo: 'Backend que aguenta produção',
    prova: 'Java, Spring Boot e AWS no dia a dia da Hotmart, com duas certificações AWS no caminho.',
    para: '/sobre',
    rotulo: 'trajetória',
  },
  {
    titulo: 'Apps e ferramentas sob medida',
    prova: 'Um app clínico multi-tenant, um app offline para a família e uma extensão do Chrome em uso diário.',
    para: '/projetos?tipo=app',
    rotulo: 'ver apps',
  },
]

export default function Inicio() {
  const meta = metaPaginas['/']
  usarMeta(meta.titulo, meta.descricao, '/')
  const destaques = projetos.filter((p) => p.destaque)
  const { posts, origem } = useUltimosPosts(3)

  return (
    <>
      {/* ---------- Abertura ---------- */}
      <section className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-12 md:grid-cols-[1.05fr_1fr] md:gap-10 md:py-16">
        <div>
          {perfil.disponibilidade && (
            <p className="inline-flex items-center gap-2 rounded-full border border-verde/25 bg-verde/[0.06] px-3 py-1 font-mono text-[0.7rem]">
              <span className="relative flex size-1.5" aria-hidden>
                <span className="pulso absolute inset-0 rounded-full bg-verde" />
                <span className="relative size-1.5 rounded-full bg-verde" />
              </span>
              <span className="texto-brilho">{perfil.disponibilidade}</span>
            </p>
          )}

          <h1 className="mt-6">
            <TextoDecifrado
              texto={perfil.nick}
              passo={55}
              className="block font-marca text-[clamp(4.5rem,13vw,9.5rem)] font-bold italic leading-[0.85] tracking-[-0.04em] text-titulo"
            />
            <span className="mt-3 block font-mono text-sm text-suave md:text-base">
              <span className="text-azul-claro">~/</span>
              {perfil.papel.toLowerCase()} · {perfil.cidade}
            </span>
          </h1>

          <p className="mt-8 text-xl leading-snug text-titulo md:text-2xl">
            Faço <TrocaTexto frases={perfil.frentes} className="text-gelo" />
          </p>
          <TextoSubindo
            texto={perfil.resumo}
            atraso={0.3}
            className="mt-4 max-w-xl text-base leading-relaxed text-texto md:text-lg"
          />

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Ima>
              <Botao para="/projetos">
                Ver projetos <Seta />
              </Botao>
            </Ima>
            <Botao para="/servicos" variante="secundario">
              Quero um site
            </Botao>
          </div>
          <p className="mt-4 font-mono text-[0.7rem] text-suave">
            {noAr} sites de clientes no ar agora — todos com link na página de projetos.
          </p>
        </div>

        <Revelar atraso={0.2} y={30}>
          <TerminalInterativo />
          <p className="mt-3 text-center font-mono text-[0.68rem] text-suave">
            o terminal funciona: tente <span className="text-azul-claro">cd projetos</span> ou{' '}
            <span className="text-azul-claro">abrir zapflow</span>
          </p>
        </Revelar>
      </section>

      {/* ---------- Números ---------- */}
      <section aria-label="Em números" className="border-y border-white/[0.06] py-10">
        <dl className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
          {numeros.map((n, i) => (
            <Revelar key={n.rotulo} atraso={i * 0.08} className="px-2 md:border-l md:border-white/[0.06] md:px-6 md:first:border-l-0">
              <dt className="sr-only">{n.rotulo}</dt>
              <dd>
                <Contador
                  valor={n.valor}
                  className="block font-marca text-5xl font-bold italic tracking-[-0.03em] text-titulo md:text-6xl"
                />
                <span className="mt-1 block text-sm text-suave">{n.rotulo}</span>
              </dd>
            </Revelar>
          ))}
        </dl>
      </section>

      {/* ---------- Destaques ---------- */}
      <section className="pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <TituloSecao
            rotulo="// trabalho selecionado"
            titulo="O que já está rodando"
            descricao="Sites no ar, app em construção e uma extensão que alguém usa todo dia. Cada um com o contexto e as decisões por trás."
          />
          <Link to="/projetos" className="group mb-10 font-mono text-sm text-azul-claro hover:text-ciano">
            todos os {projetos.length} projetos{' '}
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
          {destaques.map((p, i) => (
            <Revelar
              key={p.slug}
              atraso={(i % 2) * 0.1}
              className={i % 4 === 0 || i % 4 === 3 ? 'md:col-span-7' : 'md:col-span-5 md:pt-16'}
            >
              <CartaoProjeto projeto={p} grande={i % 4 === 0 || i % 4 === 3} />
            </Revelar>
          ))}
        </div>
      </section>

      {/* ---------- Frentes ---------- */}
      <section className="pt-32">
        <TituloSecao rotulo="// o que eu faço" titulo="Três frentes, um jeito de trabalhar" />
        <div className="space-y-3">
          {frentes.map((f, i) => (
            <Revelar key={f.titulo} atraso={i * 0.08}>
              <CartaoHolofote className="rounded-2xl border border-white/[0.07] bg-vidro/60">
                <Link
                  to={f.para}
                  className="group relative grid gap-4 px-6 py-8 md:grid-cols-[1.2fr_1fr_auto] md:items-center md:gap-10 md:px-10"
                >
                  <h3 className="font-marca text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold italic leading-[1.05] tracking-[-0.02em] text-titulo">
                    {f.titulo}
                  </h3>
                  <p className="leading-relaxed text-suave">{f.prova}</p>
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-azul-claro transition-colors group-hover:text-ciano">
                    {f.rotulo}
                    <span
                      aria-hidden
                      className="grid size-9 place-items-center rounded-full border border-azul/30 transition duration-300 ease-suave group-hover:translate-x-1 group-hover:border-ciano/60 group-hover:bg-azul/15"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </CartaoHolofote>
            </Revelar>
          ))}
        </div>
      </section>

      {/* ---------- Stack ---------- */}
      <section className="pt-28" aria-labelledby="titulo-letreiro">
        <p id="titulo-letreiro" className="mb-4 text-center font-mono text-xs text-suave">
          o que está na bancada — detalhes em{' '}
          <Link to="/stack" className="text-azul-claro hover:text-ciano">
            /stack
          </Link>
        </p>
        <Letreiro itens={letreiro} rotulo="Tecnologias que uso" />
      </section>

      {/* ---------- Blog ---------- */}
      <section className="pt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <TituloSecao
            rotulo="// do zeno.blog.br"
            titulo="Estudando em público"
            descricao="O que aprendo nos projetos vira nota no blog — do bug esquisito ao roteiro completo."
          />
          <a href={BLOG_URL} className="group mb-10 font-mono text-sm text-azul-claro hover:text-ciano">
            abrir o blog{' '}
            <span aria-hidden className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
        <ul className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {posts.map((post, i) => (
            <li key={post.url}>
              <Revelar atraso={i * 0.06}>
                <a
                  href={post.url}
                  className="group grid gap-2 py-6 md:grid-cols-[9rem_1fr_auto] md:items-baseline md:gap-8"
                >
                  <time dateTime={post.data} className="font-mono text-xs text-suave">
                    {post.data ? formatarData(post.data) : ''}
                  </time>
                  <span>
                    <span className="block text-lg text-titulo transition-colors group-hover:text-gelo-claro md:text-xl">
                      {post.titulo}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-suave">{post.resumo}</span>
                  </span>
                  <span className="hidden gap-1.5 md:flex">
                    {post.tags.slice(0, 2).map((t) => (
                      <span key={t} className="font-mono text-[0.68rem] text-azul-claro">
                        #{t}
                      </span>
                    ))}
                  </span>
                </a>
              </Revelar>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-[0.65rem] text-fraco">
          {origem === 'feed' ? 'lido agora do feed do blog' : 'lista salva — o feed do blog não respondeu'}
        </p>
      </section>

      {/* ---------- Chamada ---------- */}
      <section className="pt-28">
        <Revelar>
          <Janela titulo="proximo-projeto.md" className="mx-auto max-w-4xl">
            <div className="relative px-6 py-12 text-center md:px-14 md:py-16">
              <p className="font-mono text-xs text-azul-claro">// seu negócio aqui</p>
              <h2 className="titulo-secao mt-4 text-[clamp(2rem,5vw,3.6rem)]">
                Tem um negócio que merece um site melhor?
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-relaxed text-texto">
                Me conte o que você vende e onde atende. Em poucos minutos você monta um briefing — e eu respondo com
                o caminho mais simples que resolve.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Ima>
                  <Botao para="/contato">
                    Montar briefing <Seta />
                  </Botao>
                </Ima>
                <Botao para="/servicos" variante="secundario">
                  Ver serviços
                </Botao>
              </div>
            </div>
          </Janela>
        </Revelar>
      </section>
    </>
  )
}
