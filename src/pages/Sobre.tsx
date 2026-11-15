import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import CartaoHolofote from '../components/efeitos/CartaoHolofote'
import Revelar from '../components/efeitos/Revelar'
import Botao, { Seta } from '../components/ui/Botao'
import CabecalhoPagina, { TituloSecao } from '../components/ui/Cabecalho'
import Janela from '../components/ui/Janela'
import { contato, metaPaginas, perfil } from '../data/site'
import { bio, certificacoes, foraDoCodigo, idiomas, principios, trajetoria, type Marco } from '../data/sobre'
import { usarMeta } from '../lib/meta'

const COR_TIPO: Record<Marco['tipo'], string> = {
  trabalho: 'text-azul-claro',
  estudo: 'text-gelo',
  certificacao: 'text-ambar',
  projeto: 'text-verde',
}

export default function Sobre() {
  const meta = metaPaginas['/sobre']
  usarMeta(meta.titulo, meta.descricao, '/sobre')
  const linkedin = contato.redes.find((r) => r.nome === 'LinkedIn')

  return (
    <>
      <CabecalhoPagina comando="whoami" titulo="Sobre" />

      {/* ---------- Quem ---------- */}
      <section className="grid gap-12 md:grid-cols-[18rem_1fr] md:gap-16">
        <Revelar>
          <div className="moldura-luz luz-vermelha giro-rapido mx-auto w-full max-w-[18rem] rounded-[26px] [--raio:26px]">
            <div className="rounded-[25px] bg-fundo p-2">
              <img
                src={perfil.foto}
                alt={perfil.fotoAlt}
                width={288}
                height={288}
                className="block aspect-square w-full rounded-[19px] object-cover"
              />
            </div>
          </div>
          <div className="mt-6 text-center md:text-left">
            <p className="font-marca text-3xl font-bold italic tracking-[-0.02em] text-titulo">{perfil.nick}</p>
            {perfil.nome && <p className="mt-1 text-sm text-texto">{perfil.nome}</p>}
            <p className="mt-1 font-mono text-xs text-suave">
              {perfil.papel.toLowerCase()} · {perfil.cidade}
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              {idiomas.map((l) => (
                <li key={l.nome} className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[0.68rem] text-suave">
                  {l.nome} · {l.nivel}
                </li>
              ))}
            </ul>
          </div>
        </Revelar>

        <div className="space-y-6">
          {bio.map((paragrafo, i) => (
            <Revelar key={i} atraso={0.08 * i}>
              <p className={`prosa ${i === 0 ? 'text-xl leading-relaxed text-titulo md:text-2xl' : ''}`}>{paragrafo}</p>
            </Revelar>
          ))}
          <Revelar atraso={0.3}>
            <div className="flex flex-wrap gap-3 pt-2">
              {linkedin && (
                <Botao para={linkedin.url}>
                  LinkedIn <Seta externa />
                </Botao>
              )}
              <Botao para="/projetos" variante="secundario">
                Ver o que já fiz
              </Botao>
            </div>
          </Revelar>
        </div>
      </section>

      {/* ---------- Princípios ---------- */}
      <section className="pt-28">
        <TituloSecao rotulo="// como eu trabalho" titulo="Quatro regras que aparecem em todo projeto" />
        <div className="grid gap-4 md:grid-cols-2">
          {principios.map((p, i) => (
            <Revelar key={p.titulo} atraso={(i % 2) * 0.08}>
              <CartaoHolofote className="h-full rounded-2xl border border-white/[0.07] bg-vidro/60">
                <div className="relative p-7">
                  <h3 className="font-marca text-2xl font-bold italic tracking-[-0.02em] text-titulo">{p.titulo}</h3>
                  <p className="mt-3 leading-relaxed text-suave">{p.prova}</p>
                </div>
              </CartaoHolofote>
            </Revelar>
          ))}
        </div>
      </section>

      <Trajetoria />

      {/* ---------- Certificações ---------- */}
      <section className="pt-28">
        <TituloSecao rotulo="// certificações" titulo="Papel passado" />
        <div className="grid gap-4 md:grid-cols-2">
          {certificacoes.map((c, i) => (
            <Revelar key={c.nome} atraso={i * 0.08}>
              <Janela titulo={`${c.emissor.toLowerCase().replaceAll(' ', '-')}.pem`} luz="gelo" quieta className="group">
                <div className="flex items-center gap-5 px-6 py-6">
                  <span
                    aria-hidden
                    className="grid size-14 shrink-0 place-items-center rounded-xl border border-ambar/30 bg-ambar/10 font-marca text-lg font-bold italic text-ambar"
                  >
                    AWS
                  </span>
                  <div>
                    <p className="font-medium text-titulo">{c.nome}</p>
                    <p className="mt-1 font-mono text-xs text-suave">
                      {c.emissor} · {c.ano}
                    </p>
                  </div>
                </div>
              </Janela>
            </Revelar>
          ))}
        </div>
      </section>

      {/* ---------- Fora do código ---------- */}
      <section className="pt-28">
        <TituloSecao rotulo="// fora do código" titulo="Quando o editor fecha" />
        <dl className="grid gap-8 md:grid-cols-3">
          {foraDoCodigo.map((f, i) => (
            <Revelar key={f.titulo} atraso={i * 0.08} className="border-t border-white/[0.08] pt-5">
              <dt className="font-marca text-xl font-bold italic text-gelo-claro">{f.titulo}</dt>
              <dd className="mt-2 leading-relaxed text-suave">{f.texto}</dd>
            </Revelar>
          ))}
        </dl>
      </section>
    </>
  )
}

/** Linha do tempo vertical; a linha se acende conforme a leitura desce. */
function Trajetoria() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] })
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })

  return (
    <section ref={ref} className="pt-28">
      <TituloSecao rotulo="// trajetória" titulo="De onde vim" />
      <div className="relative">
        <div aria-hidden className="absolute bottom-2 left-[0.55rem] top-2 w-px bg-white/[0.08]" />
        <motion.div
          aria-hidden
          style={{ scaleY: progresso }}
          className="absolute bottom-2 left-[0.55rem] top-2 w-px origin-top bg-gradient-to-b from-ciano via-azul-claro to-azul"
        />
        <ol className="space-y-10">
          {trajetoria.map((m) => (
            <li key={m.titulo + m.quando} className="relative grid gap-1 pl-10 md:grid-cols-[9rem_1fr] md:gap-8">
              <span aria-hidden className="absolute left-0 top-1.5 grid size-[1.15rem] place-items-center rounded-full border border-white/15 bg-fundo">
                <span className={`size-1.5 rounded-full bg-current ${COR_TIPO[m.tipo]}`} />
              </span>
              <Revelar>
                <p className={`font-mono text-sm ${COR_TIPO[m.tipo]}`}>{m.quando}</p>
              </Revelar>
              <Revelar atraso={0.05}>
                <h3 className="font-marca text-xl font-bold italic tracking-[-0.01em] text-titulo md:text-2xl">{m.titulo}</h3>
                <p className="mt-1 leading-relaxed text-suave">{m.texto}</p>
              </Revelar>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
