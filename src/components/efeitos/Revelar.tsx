import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_SUAVE } from '../../lib/movimento'

/** Sobe, desfoca para nítido e aparece quando entra na tela — uma vez. */
export default function Revelar({
  children,
  atraso = 0,
  className,
  y = 22,
}: {
  children: ReactNode
  atraso?: number
  className?: string
  y?: number
}) {
  const reduzido = useReducedMotion()
  if (reduzido) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE_SUAVE, delay: atraso }}
    >
      {children}
    </motion.div>
  )
}
