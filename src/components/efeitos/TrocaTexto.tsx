import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EASE_SUAVE } from '../../lib/movimento'

/** Frases que se revezam com um blur na troca (o "text states swap").
 *  O leitor de tela recebe a lista inteira de uma vez, sem anúncio a
 *  cada troca — frase girando em aria-live seria barulho. */
export default function TrocaTexto({
  frases,
  intervalo = 3200,
  className,
}: {
  frases: readonly string[]
  intervalo?: number
  className?: string
}) {
  const reduzido = useReducedMotion()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduzido) return
    const t = setInterval(() => setI((n) => (n + 1) % frases.length), intervalo)
    return () => clearInterval(t)
  }, [reduzido, frases.length, intervalo])

  return (
    <span className={className}>
      <span className="sr-only">{frases.join('; ')}</span>
      <span aria-hidden className="relative inline-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={frases[i]}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: EASE_SUAVE }}
            className="col-start-1 row-start-1"
          >
            {frases[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
