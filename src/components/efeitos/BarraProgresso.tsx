import { motion, useScroll, useSpring } from 'framer-motion'

/** Linha de luz no topo que acompanha a leitura da página. */
export default function BarraProgresso() {
  const { scrollYProgress } = useScroll()
  const escala = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: escala }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-azul via-azul-claro to-ciano"
    />
  )
}
