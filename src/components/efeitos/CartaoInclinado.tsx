import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import type { PointerEvent, ReactNode } from 'react'
import { MOLA_HOVER } from '../../lib/movimento'

/** Inclina em 3D na direção do cursor, com um reflexo (glare) que
 *  acompanha a luz. Só reage a mouse: no toque, fica parado. */
export default function CartaoInclinado({
  children,
  className = '',
  inclinacao = 7,
}: {
  children: ReactNode
  className?: string
  inclinacao?: number
}) {
  const reduzido = useReducedMotion()
  const rx = useSpring(0, MOLA_HOVER)
  const ry = useSpring(0, MOLA_HOVER)
  const escala = useSpring(1, MOLA_HOVER)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const brilho = useSpring(0, { stiffness: 200, damping: 30 })
  const reflexo = useMotionTemplate`radial-gradient(520px circle at ${gx}% ${gy}%, rgba(214, 241, 255, 0.16), transparent 45%)`

  function mover(e: PointerEvent<HTMLDivElement>) {
    if (reduzido || e.pointerType !== 'mouse') return
    const caixa = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - caixa.left) / caixa.width
    const py = (e.clientY - caixa.top) / caixa.height
    ry.set((px - 0.5) * inclinacao * 2)
    rx.set(-(py - 0.5) * inclinacao * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  function entrar(e: PointerEvent<HTMLDivElement>) {
    if (reduzido || e.pointerType !== 'mouse') return
    escala.set(1.015)
    brilho.set(1)
  }

  function sair() {
    rx.set(0)
    ry.set(0)
    escala.set(1)
    brilho.set(0)
  }

  return (
    <div className={`[perspective:1100px] ${className}`}>
      <motion.div
        onPointerMove={mover}
        onPointerEnter={entrar}
        onPointerLeave={sair}
        style={{ rotateX: rx, rotateY: ry, scale: escala, transformStyle: 'preserve-3d' }}
        className="relative h-full will-change-transform"
      >
        {children}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen"
          style={{ background: reflexo, opacity: brilho }}
        />
      </motion.div>
    </div>
  )
}
