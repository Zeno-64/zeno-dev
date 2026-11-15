import { motion, useReducedMotion } from 'framer-motion'
import type { ElementType } from 'react'
import { EASE_SUAVE } from '../../lib/movimento'

type Props = {
  texto: string
  as?: ElementType
  className?: string
  atraso?: number
  /** Intervalo entre palavras, em segundos. */
  escalonamento?: number
}

/** Cada palavra sobe de dentro de uma "fresta" (overflow hidden), uma
 *  depois da outra. Leitor de tela lê a frase inteira pelo aria-label. */
export default function TextoSubindo({ texto, as: Tag = 'p', className, atraso = 0, escalonamento = 0.045 }: Props) {
  const reduzido = useReducedMotion()
  const palavras = texto.split(' ')

  if (reduzido) return <Tag className={className}>{texto}</Tag>

  return (
    <Tag className={className}>
      <span className="sr-only">{texto}</span>
      <motion.span
        aria-hidden
        initial="escondido"
        whileInView="visivel"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: escalonamento, delayChildren: atraso }}
      >
        {palavras.map((palavra, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className="inline-block"
              variants={{
                escondido: { y: '105%', opacity: 0 },
                visivel: { y: '0%', opacity: 1 },
              }}
              transition={{ duration: 0.8, ease: EASE_SUAVE }}
            >
              {palavra}
            </motion.span>
            {i < palavras.length - 1 && ' '}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
