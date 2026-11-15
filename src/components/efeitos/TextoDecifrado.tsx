import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ElementType } from 'react'

const SIMBOLOS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+<>/\\=_'

type Props = {
  texto: string
  as?: ElementType
  className?: string
  /** ms entre um passo e outro. Cada letra embaralha por 2 passos. */
  passo?: number
  /** Atraso antes de começar, em ms. */
  atraso?: number
}

/** Texto que chega embaralhado e "decifra" da esquerda para a direita
 *  quando entra na tela. Leitor de tela recebe o texto final direto
 *  (aria-label); a animação é só visual.
 *  Com "reduzir movimento" ligado, o texto aparece pronto. */
export default function TextoDecifrado({ texto, as: Tag = 'span', className, passo = 32, atraso = 0 }: Props) {
  const ref = useRef<HTMLElement>(null)
  const visivel = useInView(ref, { once: true, amount: 0.6 })
  const reduzido = useReducedMotion()
  const [revelados, setRevelados] = useState(reduzido ? texto.length * 2 : 0)

  useEffect(() => {
    if (!visivel || reduzido) return
    let quadro = 0
    let intervalo: ReturnType<typeof setInterval> | undefined
    const inicio = setTimeout(() => {
      intervalo = setInterval(() => {
        quadro += 1
        setRevelados(quadro)
        if (quadro >= texto.length * 2) clearInterval(intervalo)
      }, passo)
    }, atraso)
    return () => {
      clearTimeout(inicio)
      if (intervalo) clearInterval(intervalo)
    }
  }, [visivel, reduzido, texto, passo, atraso])

  const prontos = Math.floor(revelados / 2)
  const iniciou = revelados > 0 || reduzido

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>
        {texto.split('').map((letra, i) => {
          if (letra === ' ') return ' '
          if (i < prontos || reduzido) return <span key={i}>{letra}</span>
          // antes de começar, mostra a letra apagada (evita "pulo" de largura)
          if (!iniciou) {
            return (
              <span key={i} className="opacity-0">
                {letra}
              </span>
            )
          }
          return (
            <span key={i} className="text-azul-claro/80">
              {SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)]}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
