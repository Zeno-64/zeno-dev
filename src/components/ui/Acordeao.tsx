import { useId, useState } from 'react'

/** Lista de perguntas que abre e fecha animando a altura com o truque de
 *  grid-template-rows (0fr → 1fr): sem medir nada em JavaScript. */
export default function Acordeao({ itens }: { itens: { pergunta: string; resposta: string }[] }) {
  const [aberto, setAberto] = useState<number | null>(0)
  const base = useId()

  return (
    <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
      {itens.map((item, i) => {
        const estaAberto = aberto === i
        const idBotao = `${base}-b${i}`
        const idPainel = `${base}-p${i}`
        return (
          <div key={item.pergunta}>
            <h3>
              <button
                id={idBotao}
                type="button"
                aria-expanded={estaAberto}
                aria-controls={idPainel}
                onClick={() => setAberto(estaAberto ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={`text-lg transition-colors duration-300 md:text-xl ${
                    estaAberto ? 'text-titulo' : 'text-texto group-hover:text-titulo'
                  }`}
                >
                  {item.pergunta}
                </span>
                <span
                  aria-hidden
                  className={`relative grid size-8 shrink-0 place-items-center rounded-full border transition duration-300 ease-suave ${
                    estaAberto ? 'rotate-45 border-azul-claro/60 bg-azul/15 text-ciano' : 'border-white/10 text-suave'
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={idPainel}
              role="region"
              aria-labelledby={idBotao}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-suave ${
                estaAberto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 leading-relaxed text-suave">{item.resposta}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
