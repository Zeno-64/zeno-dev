import { AnimatePresence, motion } from 'framer-motion'
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { EASE_SUAVE } from '../../lib/movimento'

type Contexto = (texto: string) => void
const AvisoContexto = createContext<Contexto>(() => {})

/** Aviso flutuante (toast): sobe com fade, blur e escala, some sozinho
 *  em 2,4 s. Anunciado ao leitor de tela pela região aria-live. */
export function ProvedorAviso({ children }: { children: ReactNode }) {
  const [aviso, setAviso] = useState<{ id: number; texto: string } | null>(null)
  const tempo = useRef<ReturnType<typeof setTimeout>>(undefined)

  const avisar = useCallback((texto: string) => {
    clearTimeout(tempo.current)
    setAviso({ id: Date.now(), texto })
    tempo.current = setTimeout(() => setAviso(null), 2400)
  }, [])

  return (
    <AvisoContexto.Provider value={avisar}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
        <AnimatePresence>
          {aviso && (
            <motion.div
              key={aviso.id}
              initial={{ opacity: 0, y: 16, scale: 0.94, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 8, scale: 0.97, filter: 'blur(4px)' }}
              transition={{ duration: 0.35, ease: EASE_SUAVE }}
              className="flex items-center gap-2 rounded-full border border-azul-claro/30 bg-vidro/95 px-4 py-2 font-mono text-xs text-titulo shadow-[0_10px_40px_-10px_rgba(47,129,247,0.7)] backdrop-blur"
            >
              <span className="text-verde" aria-hidden>
                ✓
              </span>
              {aviso.texto}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AvisoContexto.Provider>
  )
}

export const useAviso = () => useContext(AvisoContexto)

/** Copia um texto e avisa. Cai num textarea escondido se a Clipboard
 *  API não estiver disponível (http sem TLS, navegador antigo). */
export async function copiar(texto: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texto)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = texto
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}
