import { useRef, type ReactNode, type PointerEvent } from 'react'

/** Card com um holofote azul que segue o cursor por dentro (o "spotlight
 *  card"). A posição vai para variáveis CSS — nada de re-render a cada
 *  movimento do mouse. */
export default function CartaoHolofote({
  children,
  className = '',
  cor = 'color-mix(in oklab, var(--color-azul-claro) 16%, transparent)',
}: {
  children: ReactNode
  className?: string
  cor?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  function mover(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const caixa = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - caixa.left}px`)
    el.style.setProperty('--y', `${e.clientY - caixa.top}px`)
  }

  return (
    <div
      ref={ref}
      onPointerMove={mover}
      className={`group/holofote relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/holofote:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${cor}, transparent 45%)`,
        }}
      />
      {children}
    </div>
  )
}
