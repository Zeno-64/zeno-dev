import { Link } from 'react-router-dom'
import type { Projeto } from '../data/projetos'
import CartaoInclinado from './efeitos/CartaoInclinado'
import Selo from './ui/Selo'
import { CapaTerminal, TelaNavegador } from './ui/Telas'

const ROTULO_CATEGORIA = {
  site: 'site',
  app: 'app',
  ferramenta: 'ferramenta',
  laboratorio: 'laboratório',
} as const

/** Card de projeto: a tela (ou a capa de terminal) inclina com o
 *  cursor; embaixo, nome, selo, resumo e a stack resumida. */
export default function CartaoProjeto({
  projeto,
  grande = false,
  prioridade = false,
}: {
  projeto: Projeto
  grande?: boolean
  prioridade?: boolean
}) {
  return (
    <Link
      to={`/projetos/${projeto.slug}`}
      className="group block h-full rounded-2xl focus-visible:outline-offset-8"
      aria-label={`${projeto.nome} — ${projeto.resumo}`}
    >
      <CartaoInclinado className="rounded-xl" inclinacao={grande ? 4 : 6}>
        <div className="relative rounded-xl">
          {projeto.imagens ? (
            <TelaNavegador
              src={projeto.imagens.desktop}
              host={projeto.host ?? projeto.nome.toLowerCase()}
              alt={`Tela inicial do site ${projeto.nome}`}
              prioridade={prioridade}
            />
          ) : projeto.capa ? (
            <CapaTerminal arquivo={projeto.capa.arquivo} linhas={projeto.capa.linhas} />
          ) : null}
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 transition duration-500 group-hover:ring-azul-claro/40" />
        </div>
      </CartaoInclinado>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3
          className={`font-marca font-bold italic tracking-[-0.02em] text-titulo transition-colors group-hover:text-gelo-claro ${
            grande ? 'text-3xl md:text-4xl' : 'text-2xl'
          }`}
        >
          {projeto.nome}
        </h3>
        <Selo status={projeto.status} />
      </div>
      <p className="mt-1 font-mono text-[0.7rem] text-suave">
        {ROTULO_CATEGORIA[projeto.categoria]} · {projeto.ano} · {projeto.para}
      </p>
      <p className={`mt-3 leading-relaxed text-texto ${grande ? 'text-lg' : ''}`}>{projeto.resumo}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologias">
        {projeto.stack.slice(0, grande ? 6 : 4).map((t) => (
          <li key={t} className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[0.66rem] text-suave">
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-azul-claro">
        ver o case
        <span aria-hidden className="transition-transform duration-300 ease-suave group-hover:translate-x-1">
          →
        </span>
      </p>
    </Link>
  )
}
