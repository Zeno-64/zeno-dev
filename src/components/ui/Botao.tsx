import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variante = 'primario' | 'secundario' | 'fantasma'

const BASE =
  'group/botao relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-300 ease-suave active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

const VARIANTES: Record<Variante, string> = {
  primario:
    'bg-azul text-white shadow-[0_0_0_1px_rgba(125,240,255,0.25),0_8px_30px_-8px_rgba(47,129,247,0.7)] hover:bg-[#3d8dfa] hover:shadow-[0_0_0_1px_rgba(125,240,255,0.5),0_10px_40px_-6px_rgba(47,129,247,0.9)]',
  secundario:
    'border border-white/12 bg-white/[0.03] text-titulo hover:border-azul-claro/50 hover:bg-azul/10',
  fantasma: 'text-azul-claro hover:text-ciano px-1',
}

type Props = {
  children: ReactNode
  variante?: Variante
  className?: string
  /** Rota interna ("/projetos") ou URL externa ("https://..."). */
  para?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  faisca?: boolean
  rotulo?: string
}

/** Botão do site. Com `para`, vira link (interno via React Router,
 *  externo abre em nova aba). Sem `para`, é um <button>. */
export default function Botao({
  children,
  variante = 'primario',
  className = '',
  para,
  onClick,
  type = 'button',
  faisca = variante === 'primario',
  rotulo,
}: Props) {
  const classe = `${BASE} ${VARIANTES[variante]} ${className}`
  const extra = faisca ? { 'data-faisca': '' } : {}

  if (para && /^(https?:|mailto:|tel:)/.test(para)) {
    const externo = para.startsWith('http')
    return (
      <a
        href={para}
        className={classe}
        aria-label={rotulo}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...extra}
      >
        {children}
      </a>
    )
  }
  if (para) {
    return (
      <Link to={para} className={classe} aria-label={rotulo} {...extra}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classe} aria-label={rotulo} {...extra}>
      {children}
    </button>
  )
}

/** Seta que anda um pouco no hover do botão. */
export function Seta({ externa = false }: { externa?: boolean }) {
  return (
    <span
      aria-hidden
      className={`inline-block transition-transform duration-300 ease-suave ${
        externa ? 'group-hover/botao:-translate-y-0.5 group-hover/botao:translate-x-0.5' : 'group-hover/botao:translate-x-1'
      }`}
    >
      {externa ? '↗' : '→'}
    </span>
  )
}
