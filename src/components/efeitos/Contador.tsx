import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE_SUAVE } from '../../lib/movimento'

/** Número que conta de 0 até `valor` quando aparece na tela. */
export default function Contador({ valor, className }: { valor: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const visivel = useInView(ref, { once: true, amount: 0.8 })
  const reduzido = useReducedMotion()
  const [atual, setAtual] = useState(reduzido ? valor : 0)

  useEffect(() => {
    if (!visivel || reduzido) return
    const controle = animate(0, valor, {
      duration: 1.4,
      ease: EASE_SUAVE,
      onUpdate: (v) => setAtual(Math.round(v)),
    })
    return () => controle.stop()
  }, [visivel, reduzido, valor])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{valor}</span>
      <span aria-hidden className="tabular-nums">
        {atual}
      </span>
    </span>
  )
}
