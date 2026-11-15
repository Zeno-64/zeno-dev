import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import CartaoProjeto from '../components/CartaoProjeto'
import Revelar from '../components/efeitos/Revelar'
import TextoDecifrado from '../components/efeitos/TextoDecifrado'
import Botao, { Seta } from '../components/ui/Botao'
import { copiar, useAviso } from '../components/ui/Aviso'
import Janela from '../components/ui/Janela'
import Selo from '../components/ui/Selo'
import { CapaTerminal, TelaCelular, TelaNavegador } from '../components/ui/Telas'
import { projetoPorSlug, projetos, rotuloStatus } from '../data/projetos'
import { SITE_URL } from '../data/site'
import { usarMeta } from '../lib/meta'
import { EASE_SUAVE } from '../lib/movimento'
import NaoEncontrado from './NaoEncontrado'

const ROTULO_CATEGORIA = { site: 'Site', app: 'App', ferramenta: 'Ferramenta', laboratorio: 'Laboratório' } as const

export default function Projeto() {
  const { slug = '' } = useParams()
  const projeto = projetoPorSlug(slug)
  const avisar = useAviso()
  usarMeta(
    projeto ? `${projeto.nome} · Projetos · Zeno` : 'Projeto não encontrado · Zeno',
    projeto ? projeto.resumo : 'Esse projeto não existe (ou mudou de endereço).',
    `/projetos/${slug}`,
  )

  if (!projeto) return <NaoEncontrado />

  const i = projetos.indexOf(projeto)
  const proximo = projetos[(i + 1) % projetos.length]
  const anterior = projetos[(i - 1 + projetos.length) % projetos.length]

  return (
    <article className="pt-10 md:pt-14">
      <nav aria-label="Trilha" className="font-mono text-xs text-suave">
        <Link to="/projetos" className="hover:text-azul-claro">
          ~/projetos
        </Link>
        <span className="mx-1.5 text-fraco">/</span>
        <span className="text-texto" aria-current="page">
          {projeto.slug}
        </span>
      </nav>

      <header className="mt-6 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Selo status={projeto.status} />
            <span className="font-mono text-xs text-suave">
              {ROTULO_CATEGORIA[projeto.categoria]} · {projeto.ano}
            </span>
          </div>
          <TextoDecifrado
            as="h1"
            texto={projeto.nome}
            className="titulo-secao mt-4 text-[clamp(2.6rem,7vw,5.2rem)]"
          />
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-texto md:text-xl">{projeto.resumo}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {projeto.url && (
            <Botao para={projeto.url}>
              Visitar o site <Seta externa />
            </Botao>
          )}
          <Botao
            variante="secundario"
            onClick={() => copiar(`${SITE_URL}/projetos/${projeto.slug}`).then((ok) => ok && avisar('link do case copiado'))}
          >
            Copiar link
          </Botao>
        </div>
      </header>

      {/* ---------- Tela ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: EASE_SUAVE, delay: 0.15 }}
        className="relative mt-12 md:mb-16"
      >
        {projeto.imagens ? (
          <>
            <TelaNavegador
              src={projeto.imagens.desktop}
              host={projeto.host ?? projeto.nome.toLowerCase()}
              alt={`Tela inicial do site ${projeto.nome} no computador`}
              prioridade
              className="md:w-[86%]"
            />
            {projeto.imagens.celular && (
              <TelaCelular
                src={projeto.imagens.celular}
                alt={`O site ${projeto.nome} no celular`}
                className="mx-auto mt-6 w-[55%] max-w-[15rem] md:absolute md:-bottom-16 md:right-0 md:mt-0 md:w-[22%] md:max-w-none"
              />
            )}
          </>
        ) : projeto.capa ? (
          <CapaTerminal arquivo={projeto.capa.arquivo} linhas={projeto.capa.linhas} className="md:aspect-[21/9]" />
        ) : null}
      </motion.div>

      {/* ---------- Conteúdo ---------- */}
      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-[1fr_17rem] md:gap-16">
        <div className="space-y-16">
          <Revelar>
            <section aria-labelledby="contexto">
              <h2 id="contexto" className="font-mono text-xs text-azul-claro">
                // contexto
              </h2>
              <p className="prosa mt-4 text-lg md:text-xl md:leading-relaxed">{projeto.contexto}</p>
            </section>
          </Revelar>

          <Revelar>
            <section aria-labelledby="feito">
              <h2 id="feito" className="font-mono text-xs text-azul-claro">
                // o que foi feito
              </h2>
              <ul className="mt-5 space-y-3">
                {projeto.feito.map((f) => (
                  <li key={f} className="flex gap-3 leading-relaxed text-texto">
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rotate-45 bg-azul-claro" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          </Revelar>

          <section aria-labelledby="decisoes">
            <Revelar>
              <h2 id="decisoes" className="font-mono text-xs text-azul-claro">
                // decisões
              </h2>
            </Revelar>
            <div className="mt-5 space-y-4">
              {projeto.decisoes.map((d, n) => (
                <Revelar key={d.titulo} atraso={n * 0.05}>
                  <div className="rounded-2xl border border-white/[0.07] bg-vidro/60 p-6 transition-colors hover:border-azul/30">
                    <h3 className="font-marca text-xl font-bold italic tracking-[-0.01em] text-titulo md:text-2xl">
                      {d.titulo}
                    </h3>
                    <p className="mt-2 leading-relaxed text-texto">{d.texto}</p>
                  </div>
                </Revelar>
              ))}
            </div>
          </section>

          {projeto.detalhe && (
            <Revelar>
              <Janela titulo="o-detalhe.txt" luz="gelo">
                <div className="px-6 py-6">
                  <h2 className="font-marca text-xl font-bold italic text-gelo-claro md:text-2xl">{projeto.detalhe.titulo}</h2>
                  <p className="mt-2 leading-relaxed text-texto">{projeto.detalhe.texto}</p>
                </div>
              </Janela>
            </Revelar>
          )}
        </div>

        <aside className="md:sticky md:top-24 md:self-start">
          <dl className="space-y-5 rounded-2xl border border-white/[0.07] bg-vidro/60 p-6 text-sm">
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-widest text-suave">para</dt>
              <dd className="mt-1 text-texto">{projeto.para}</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-widest text-suave">status</dt>
              <dd className="mt-1 text-texto">{rotuloStatus[projeto.status]}</dd>
            </div>
            {projeto.url && (
              <div>
                <dt className="font-mono text-[0.68rem] uppercase tracking-widest text-suave">endereço</dt>
                <dd className="mt-1">
                  <a
                    href={projeto.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-mono text-xs text-azul-claro hover:text-ciano"
                  >
                    {projeto.host} ↗
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-widest text-suave">stack</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {projeto.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[0.68rem] text-texto"
                  >
                    {t}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between gap-2 font-mono text-xs">
            <Link to={`/projetos/${anterior.slug}`} className="text-suave hover:text-azul-claro" aria-label={`Anterior: ${anterior.nome}`}>
              ← anterior
            </Link>
            <Link to={`/projetos/${proximo.slug}`} className="text-suave hover:text-azul-claro" aria-label={`Próximo: ${proximo.nome}`}>
              próximo →
            </Link>
          </div>
        </aside>
      </div>

      {/* ---------- Próximo ---------- */}
      <section className="mt-28 border-t border-white/[0.06] pt-14" aria-label="Próximo projeto">
        <p className="font-mono text-xs text-azul-claro">// próximo projeto</p>
        <div className="mt-6 max-w-3xl">
          <CartaoProjeto projeto={proximo} grande />
        </div>
      </section>
    </article>
  )
}
