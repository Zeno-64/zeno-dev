import { motion, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Puxa o conteúdo na direção do cursor quando ele chega perto (o
 *  "magnet"). Raio de atração = `raio` px além da borda; `forca` divide o
 *  deslocamento (maior = mais sutil). Só em mouse, nunca no toque. */
export default function Ima({
  children,
  raio = 70,
  forca = 3.2,
  className = '',
}: {
  children: ReactNode
  raio?: number
  forca?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduzido = useReducedMotion()
  const [ponteiroFino, setPonteiroFino] = useState(false)
  const x = useSpring(0, { stiffness: 170, damping: 16, mass: 1 })
  const y = useSpring(0, { stiffness: 170, damping: 16, mass: 1 })

  useEffect(() => {
    setPonteiroFino(matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (reduzido || !ponteiroFino) return
    function mover(e: PointerEvent) {
      const el = ref.current
      if (!el) return
      const c = el.getBoundingClientRect()
      const cx = c.left + c.width / 2
      const cy = c.top + c.height / 2
      const fora = Math.max(
        Math.max(c.left - e.clientX, 0, e.clientX - c.right),
        Math.max(c.top - e.clientY, 0, e.clientY - c.bottom),
      )
      if (fora < raio) {
        const puxao = 1 - fora / raio
        x.set(((e.clientX - cx) / forca) * puxao)
        y.set(((e.clientY - cy) / forca) * puxao)
      } else {
        x.set(0)
        y.set(0)
      }
    }
    window.addEventListener('pointermove', mover, { passive: true })
    return () => window.removeEventListener('pointermove', mover)
  }, [reduzido, ponteiroFino, raio, forca, x, y])

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      <motion.div style={{ x, y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
