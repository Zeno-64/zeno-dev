import Revelar from '../components/efeitos/Revelar'
import CabecalhoPagina from '../components/ui/Cabecalho'
import Janela from '../components/ui/Janela'
import { metaPaginas } from '../data/site'
import { stack } from '../data/stack'
import { usarMeta } from '../lib/meta'

export default function Stack() {
  const meta = metaPaginas['/stack']
  usarMeta(meta.titulo, meta.descricao, '/stack')

  return (
    <>
      <CabecalhoPagina
        comando="cat ~/.stack"
        titulo="Stack"
        descricao="O que uso no trabalho e nos projetos — e para quê. Sem barrinha de porcentagem: cada item diz onde ele entra."
      />

      <nav aria-label="Grupos da stack" className="mb-10 flex flex-wrap gap-2">
        {stack.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-suave transition hover:border-azul-claro/50 hover:text-titulo"
          >
            {g.titulo.toLowerCase()}
          </a>
        ))}
      </nav>

      <div className="grid gap-6 md:grid-cols-2">
        {stack.map((grupo, i) => (
          <Revelar key={grupo.id} atraso={(i % 2) * 0.08} className={i === 0 ? 'md:col-span-2' : ''}>
            <section id={grupo.id} className="scroll-mt-24" aria-labelledby={`t-${grupo.id}`}>
              <Janela titulo={`~/stack/${grupo.id}`} quieta className="group h-full">
                <div className="px-6 pb-6 pt-5">
                  <h2 id={`t-${grupo.id}`} className="font-marca text-3xl font-bold italic tracking-[-0.02em] text-titulo">
                    {grupo.titulo}
                  </h2>
                  <p className="mt-1 text-sm text-suave">{grupo.resumo}</p>
                  <ul className={`mt-6 grid gap-x-8 gap-y-1 ${i === 0 ? 'md:grid-cols-2' : ''}`}>
                    {grupo.itens.map((item) => (
                      <li
                        key={item.nome}
                        className="group/item flex flex-col gap-0.5 rounded-lg px-3 py-3 transition-colors hover:bg-azul/[0.07] sm:flex-row sm:items-baseline sm:gap-4"
                      >
                        <span className="shrink-0 font-mono text-sm text-gelo transition-colors group-hover/item:text-ciano sm:w-40">
                          {item.nome}
                        </span>
                        <span className="text-sm leading-relaxed text-suave">{item.nota}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Janela>
            </section>
          </Revelar>
        ))}
      </div>
    </>
  )
}
