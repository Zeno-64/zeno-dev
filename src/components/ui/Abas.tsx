import { motion } from 'framer-motion'
import { useRef, type KeyboardEvent } from 'react'
import { MOLA_PILULA } from '../../lib/movimento'

type Aba<T extends string> = { id: T; rotulo: string; contagem?: number }

/** Abas com a pílula que desliza até a ativa (o "tabs sliding").
 *  Teclado: setas esquerda/direita, Home e End, como numa tablist. */
export default function Abas<T extends string>({
  abas,
  ativa,
  aoTrocar,
  rotulo,
  grupo,
}: {
  abas: Aba<T>[]
  ativa: T
  aoTrocar: (id: T) => void
  rotulo: string
  /** Nome único da pílula, para não "pular" entre grupos de abas diferentes. */
  grupo: string
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function teclar(e: KeyboardEvent, i: number) {
    let alvo = -1
    if (e.key === 'ArrowRight') alvo = (i + 1) % abas.length
    if (e.key === 'ArrowLeft') alvo = (i - 1 + abas.length) % abas.length
    if (e.key === 'Home') alvo = 0
    if (e.key === 'End') alvo = abas.length - 1
    if (alvo < 0) return
    e.preventDefault()
    aoTrocar(abas[alvo].id)
    refs.current[alvo]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={rotulo}
      className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/[0.07] bg-vidro/80 p-1 backdrop-blur [scrollbar-width:none]"
    >
      {abas.map((aba, i) => {
        const selecionada = aba.id === ativa
        return (
          <button
            key={aba.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            type="button"
            aria-selected={selecionada}
            tabIndex={selecionada ? 0 : -1}
            onClick={() => aoTrocar(aba.id)}
            onKeyDown={(e) => teclar(e, i)}
            className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
              selecionada ? 'text-white' : 'text-suave hover:text-titulo'
            }`}
          >
            {selecionada && (
              <motion.span
                layoutId={`pilula-${grupo}`}
                transition={MOLA_PILULA}
                className="absolute inset-0 rounded-full bg-azul shadow-[0_0_24px_-4px_rgba(47,129,247,0.8)]"
              />
            )}
            <span className="relative">
              {aba.rotulo}
              {aba.contagem !== undefined && (
                <span className={`ml-1.5 font-mono text-[0.68rem] ${selecionada ? 'text-white/80' : 'text-fraco'}`}>
                  {aba.contagem}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
