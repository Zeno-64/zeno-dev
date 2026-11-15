import type { ReactNode } from 'react'

type Luz = 'azul' | 'gelo' | 'vermelha' | 'branca'

const CLASSE_LUZ: Record<Luz, string> = {
  azul: '',
  gelo: 'luz-gelo',
  vermelha: 'luz-vermelha',
  branca: 'luz-branca',
}

/** A janela com a luz correndo na borda — a mesma peça do zeno.net.br,
 *  com barra de título opcional. `quieta` deixa a luz parada até o hover
 *  (para grades com muitas janelas). */
export default function Janela({
  children,
  titulo,
  direita,
  luz = 'azul',
  quieta = false,
  className = '',
  miolo = '',
}: {
  children: ReactNode
  titulo?: ReactNode
  direita?: ReactNode
  luz?: Luz
  quieta?: boolean
  className?: string
  miolo?: string
}) {
  return (
    <div className={`moldura-luz ${CLASSE_LUZ[luz]} ${quieta ? 'moldura-quieta' : ''} ${className}`}>
      <div className={`h-full overflow-hidden rounded-[17px] bg-vidro/95 ${miolo}`}>
        {titulo !== undefined && (
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden>
              <i className="size-2.5 rounded-full bg-fraco/70" />
              <i className="size-2.5 rounded-full bg-fraco/70" />
              <i className="size-2.5 rounded-full bg-azul/80" />
            </span>
            <span className="ml-1 min-w-0 truncate font-mono text-[0.72rem] text-suave">{titulo}</span>
            {direita && <span className="ml-auto shrink-0">{direita}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
