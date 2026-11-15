import { useEffect, useRef } from 'react'

type Faisca = { x: number; y: number; angulo: number; inicio: number }

const DURACAO = 480
const QUANTAS = 8
const ALCANCE = 26
const TAMANHO = 11

/** Faíscas no clique (o "click spark"), em um canvas só para o site
 *  inteiro: qualquer elemento com `data-faisca` solta faíscas ao ser
 *  clicado. O laço de animação só roda enquanto há faísca viva. */
export default function Faiscas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let faiscas: Faisca[] = []
    let quadro = 0

    function ajustar() {
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function desenhar(agora: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, innerWidth, innerHeight)
      faiscas = faiscas.filter((f) => agora - f.inicio < DURACAO)
      for (const f of faiscas) {
        const p = (agora - f.inicio) / DURACAO
        const suave = 1 - (1 - p) ** 3
        const dist = ALCANCE * suave
        const comp = TAMANHO * (1 - p) ** 1.6
        const x1 = f.x + Math.cos(f.angulo) * dist
        const y1 = f.y + Math.sin(f.angulo) * dist
        ctx.strokeStyle = `rgba(125, 240, 255, ${1 - p})`
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x1 + Math.cos(f.angulo) * comp, y1 + Math.sin(f.angulo) * comp)
        ctx.stroke()
      }
      quadro = faiscas.length ? requestAnimationFrame(desenhar) : 0
    }

    function clicar(e: MouseEvent) {
      const alvo = (e.target as Element | null)?.closest('[data-faisca]')
      if (!alvo) return
      // clique de teclado (Enter/Espaço) chega com detail 0: sai do centro
      let x = e.clientX
      let y = e.clientY
      if (e.detail === 0) {
        const c = alvo.getBoundingClientRect()
        x = c.left + c.width / 2
        y = c.top + c.height / 2
      }
      const agora = performance.now()
      for (let i = 0; i < QUANTAS; i++) {
        faiscas.push({ x, y, angulo: (Math.PI * 2 * i) / QUANTAS - Math.PI / 2, inicio: agora })
      }
      if (!quadro) quadro = requestAnimationFrame(desenhar)
    }

    ajustar()
    window.addEventListener('resize', ajustar)
    document.addEventListener('click', clicar)
    return () => {
      window.removeEventListener('resize', ajustar)
      document.removeEventListener('click', clicar)
      cancelAnimationFrame(quadro)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[90] h-full w-full" />
}
