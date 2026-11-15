import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import CartaoHolofote from '../components/efeitos/CartaoHolofote'
import Ima from '../components/efeitos/Ima'
import Revelar from '../components/efeitos/Revelar'
import Acordeao from '../components/ui/Acordeao'
import Botao, { Seta } from '../components/ui/Botao'
import CabecalhoPagina, { TituloSecao } from '../components/ui/Cabecalho'
import { projetoPorSlug } from '../data/projetos'
import { perguntas, processo, servicos } from '../data/servicos'
import { metaPaginas } from '../data/site'
import { usarMeta } from '../lib/meta'

export default function Servicos() {
  const meta = metaPaginas['/servicos']
  usarMeta(meta.titulo, meta.descricao, '/servicos')

  return (
    <>
      <CabecalhoPagina
        comando="man zeno-servicos"
        titulo="Serviços"
        descricao="Sites, catálogos, landing pages, apps e automações para negócios pequenos — feitos sob medida, publicados sem mensalidade e com o conteúdo fácil de trocar."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Ima>
            <Botao para="/contato">
              Montar briefing <Seta />
            </Botao>
          </Ima>
          <Botao para="#perguntas" variante="secundario" faisca={false}>
            Dúvidas frequentes
          </Botao>
        </div>
      </CabecalhoPagina>

      {/* ---------- Ofertas ---------- */}
      <section aria-label="O que eu faço" className="space-y-4">
        {servicos.map((s, i) => (
          <Revelar key={s.id} atraso={i * 0.05}>
            <CartaoHolofote className="rounded-3xl border border-white/[0.07] bg-vidro/60">
              <div className="relative grid gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:gap-12 md:p-10">
                <div>
                  <h2 className="font-marca text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold italic leading-[1.05] tracking-[-0.02em] text-titulo">
                    {s.titulo}
                  </h2>
                  <p className="mt-3 leading-relaxed text-suave">{s.para}</p>
                  {s.exemplos.length > 0 && (
                    <div className="mt-6">
                      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-fraco">feito assim</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {s.exemplos.map((slug) => {
                          const p = projetoPorSlug(slug)
                          if (!p) return null
                          return (
                            <li key={slug}>
                              <Link
                                to={`/projetos/${slug}`}
                                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] py-1 pl-1 pr-3 text-sm text-texto transition hover:border-azul-claro/50 hover:text-titulo"
                              >
                                {p.imagens ? (
                                  <img
                                    src={p.imagens.desktop}
                                    alt=""
                                    width={28}
                                    height={28}
                                    loading="lazy"
                                    className="size-7 rounded-full object-cover object-left-top"
                                  />
                                ) : (
                                  <span className="grid size-7 place-items-center rounded-full bg-azul/15 font-mono text-[0.6rem] text-azul-claro">
                                    {'</>'}
                                  </span>
                                )}
                                {p.nome}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </div>
                <ul className="space-y-3 self-center">
                  {s.inclui.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-texto">
                      <span aria-hidden className="mt-0.5 font-mono text-sm text-azul-claro">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CartaoHolofote>
          </Revelar>
        ))}
      </section>

      <Processo />

      {/* ---------- Perguntas ---------- */}
      <section id="perguntas" className="scroll-mt-24 pt-28">
        <TituloSecao rotulo="// faq" titulo="Perguntas de sempre" />
        <Acordeao itens={perguntas} />
      </section>

      <section className="pt-24 text-center">
        <Revelar>
          <p className="font-marca text-[clamp(1.8rem,4vw,3rem)] font-bold italic leading-tight tracking-[-0.02em] text-titulo">
            A primeira conversa não custa nada.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-suave">
            Monte o briefing em dois minutos. Se o seu caso não for para mim, eu digo — e indico o caminho.
          </p>
          <div className="mt-8 flex justify-center">
            <Ima>
              <Botao para="/contato">
                Começar <Seta />
              </Botao>
            </Ima>
          </div>
        </Revelar>
      </section>
    </>
  )
}

/** Os passos do trabalho, com uma linha de luz que se acende conforme a
 *  seção passa pela tela. */
function Processo() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <section ref={ref} className="pt-28">
      <TituloSecao
        rotulo="// como funciona"
        titulo="Do primeiro oi ao site no ar"
        descricao="Sem reunião de duas horas e sem documento de trinta páginas. Você vê o site no seu celular antes de ele ir para o domínio."
      />
      <div className="relative">
        <div aria-hidden className="absolute bottom-0 left-[0.6rem] top-0 w-px bg-white/[0.08] md:left-0 md:right-0 md:top-[0.6rem] md:h-px md:w-auto" />
        <motion.div
          aria-hidden
          style={{ scaleY: progresso }}
          className="absolute bottom-0 left-[0.6rem] top-0 w-px origin-top bg-gradient-to-b from-azul to-ciano md:hidden"
        />
        <motion.div
          aria-hidden
          style={{ scaleX: progresso }}
          className="absolute left-0 right-0 top-[0.6rem] hidden h-px origin-left bg-gradient-to-r from-azul to-ciano md:block"
        />
        <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          {processo.map((passo, i) => (
            <li key={passo.titulo} className="relative pl-10 md:pl-0 md:pt-10">
              <span
                aria-hidden
                className="absolute left-0 top-0 grid size-5 place-items-center rounded-full border border-azul-claro/50 bg-fundo md:left-0"
              >
                <span className="size-1.5 rounded-full bg-ciano shadow-[0_0_10px_2px_rgba(125,240,255,0.6)]" />
              </span>
              <Revelar atraso={i * 0.08}>
                <h3 className="font-marca text-xl font-bold italic tracking-[-0.01em] text-titulo">{passo.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-suave">{passo.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
