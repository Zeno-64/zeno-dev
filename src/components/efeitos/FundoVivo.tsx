import { useEffect, useRef } from 'react'

/** Fundo do site inteiro: malha azul que só aparece perto do cursor
 *  (uma lanterna sobre o quadriculado), um brilho fixo no topo e um
 *  granulado bem leve. Decorativo — fora do fluxo e do leitor de tela.
 *
 *  A posição do cursor vai para variáveis CSS dentro de um
 *  requestAnimationFrame: no máximo uma escrita por quadro. */
export default function FundoVivo() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !matchMedia('(pointer: fine)').matches) return
    let pendente = 0
    let x = 0
    let y = 0
    function mover(e: PointerEvent) {
      x = e.clientX
      y = e.clientY
      if (pendente) return
      pendente = requestAnimationFrame(() => {
        el!.style.setProperty('--cx', `${x}px`)
        el!.style.setProperty('--cy', `${y}px`)
        pendente = 0
      })
    }
    window.addEventListener('pointermove', mover, { passive: true })
    return () => {
      window.removeEventListener('pointermove', mover)
      cancelAnimationFrame(pendente)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* brilho do topo */}
      <div
        className="absolute left-1/2 top-[-18rem] h-[40rem] w-[60rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in oklab, var(--color-azul) 26%, transparent), transparent)',
        }}
      />
      {/* malha fraca em todo lugar */}
      <div
        className="malha absolute inset-0 opacity-[0.18]"
        style={{ maskImage: 'linear-gradient(180deg, #000, transparent 70%)' }}
      />
      {/* malha forte só em volta do cursor */}
      <div
        className="malha absolute inset-0 opacity-60"
        style={{
          maskImage:
            'radial-gradient(260px circle at var(--cx, -999px) var(--cy, -999px), #000, transparent 70%)',
        }}
      />
      <div className="granulado absolute inset-0" />
    </div>
  )
}
