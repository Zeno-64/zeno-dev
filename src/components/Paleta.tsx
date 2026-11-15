import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BLOG_URL } from '../data/blog'
import { projetos } from '../data/projetos'
import { SITE_URL, contato, dominios, navegacao } from '../data/site'
import { EASE_SUAVE, normalizar } from '../lib/movimento'
import { copiar, useAviso } from './ui/Aviso'

type Comando = {
  id: string
  grupo: string
  rotulo: string
  dica?: string
  busca: string
  executar: () => void
}

/** Paleta de comandos (Ctrl K / ⌘K / "/"): navega pelas páginas e
 *  projetos, abre os outros domínios e copia o link da página atual.
 *  Segue o padrão de combobox + listbox para leitor de tela. */
export default function Paleta({ aberta, aoFechar }: { aberta: boolean; aoFechar: () => void }) {
  const navegar = useNavigate()
  const { pathname } = useLocation()
  const avisar = useAviso()
  const [busca, setBusca] = useState('')
  const [ativo, setAtivo] = useState(0)
  const campo = useRef<HTMLInputElement>(null)
  const anterior = useRef<HTMLElement | null>(null)
  const base = useId()

  const comandos = useMemo<Comando[]>(() => {
    const abrir = (url: string) => () => window.open(url, '_blank', 'noopener,noreferrer')
    const ir = (rota: string) => () => navegar(rota)
    return [
      ...navegacao.map((n) => ({
        id: `pag-${n.rota}`,
        grupo: 'Páginas',
        rotulo: n.rotulo,
        dica: n.rota,
        busca: normalizar(`${n.rotulo} ${n.rota} pagina`),
        executar: ir(n.rota),
      })),
      ...projetos.map((p) => ({
        id: `proj-${p.slug}`,
        grupo: 'Projetos',
        rotulo: p.nome,
        dica: p.para,
        busca: normalizar(`${p.nome} ${p.para} ${p.stack.join(' ')} ${p.categoria} projeto`),
        executar: ir(`/projetos/${p.slug}`),
      })),
      {
        id: 'blog',
        grupo: 'Links',
        rotulo: 'Abrir o blog',
        dica: 'zeno.blog.br',
        busca: normalizar('blog estudos posts zeno.blog.br'),
        executar: abrir(BLOG_URL),
      },
      ...dominios
        .filter((d) => !('atual' in d))
        .filter((d) => d.host !== 'zeno.blog.br')
        .map((d) => ({
          id: `dom-${d.host}`,
          grupo: 'Links',
          rotulo: `Abrir ${d.host}`,
          dica: d.papel,
          busca: normalizar(`${d.host} ${d.papel}`),
          executar: abrir(d.url),
        })),
      ...contato.redes.map((r) => ({
        id: `rede-${r.nome}`,
        grupo: 'Links',
        rotulo: r.nome,
        dica: r.rotulo,
        busca: normalizar(`${r.nome} ${r.rotulo} rede social`),
        executar: abrir(r.url),
      })),
      {
        id: 'copiar',
        grupo: 'Ações',
        rotulo: 'Copiar o link desta página',
        dica: SITE_URL + pathname,
        busca: normalizar('copiar link url compartilhar'),
        executar: () => {
          copiar(SITE_URL + pathname).then((ok) => ok && avisar('link copiado'))
        },
      },
    ]
  }, [navegar, pathname, avisar])

  const filtrados = useMemo(() => {
    const termos = normalizar(busca).split(/\s+/).filter(Boolean)
    if (!termos.length) return comandos
    return comandos.filter((c) => termos.every((t) => c.busca.includes(t)))
  }, [busca, comandos])

  useEffect(() => {
    if (aberta) {
      anterior.current = document.activeElement as HTMLElement | null
      setBusca('')
      setAtivo(0)
      // espera o painel montar
      requestAnimationFrame(() => campo.current?.focus())
    } else {
      anterior.current?.focus?.()
    }
  }, [aberta])

  useEffect(() => setAtivo(0), [busca])

  useEffect(() => {
    document.getElementById(`${base}-op-${ativo}`)?.scrollIntoView({ block: 'nearest' })
  }, [ativo, base])

  function executar(c: Comando | undefined) {
    if (!c) return
    aoFechar()
    c.executar()
  }

  function teclar(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setAtivo((i) => Math.min(i + 1, filtrados.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setAtivo((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      executar(filtrados[ativo])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      aoFechar()
    } else if (e.key === 'Tab') {
      // foco preso no campo enquanto a paleta está aberta
      e.preventDefault()
    }
  }

  let grupoAtual = ''

  return (
    <AnimatePresence>
      {aberta && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={aoFechar} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
            initial={{ opacity: 0, y: -12, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ duration: 0.28, ease: EASE_SUAVE }}
            className="moldura-luz relative w-full max-w-xl"
          >
            <div className="overflow-hidden rounded-[17px] bg-vidro">
              <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
                <span className="font-mono text-sm text-azul-claro" aria-hidden>
                  ›
                </span>
                <input
                  ref={campo}
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  onKeyDown={teclar}
                  role="combobox"
                  aria-expanded="true"
                  aria-controls={`${base}-lista`}
                  aria-activedescendant={filtrados.length ? `${base}-op-${ativo}` : undefined}
                  aria-autocomplete="list"
                  placeholder="Para onde? (páginas, projetos, links…)"
                  className="h-14 w-full bg-transparent font-mono text-sm text-titulo placeholder:text-fraco focus:outline-none"
                />
                <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[0.65rem] text-suave">esc</kbd>
              </div>

              <ul id={`${base}-lista`} role="listbox" aria-label="Resultados" className="max-h-[50vh] overflow-y-auto p-2">
                {filtrados.length === 0 && (
                  <li className="px-3 py-8 text-center font-mono text-sm text-suave">nada encontrado para “{busca}”</li>
                )}
                {filtrados.map((c, i) => {
                  const cabecalho = c.grupo !== grupoAtual ? c.grupo : null
                  grupoAtual = c.grupo
                  return (
                    <li key={c.id} role="presentation">
                      {cabecalho && (
                        <p className="px-3 pb-1 pt-3 font-mono text-[0.65rem] uppercase tracking-widest text-fraco" aria-hidden>
                          {cabecalho}
                        </p>
                      )}
                      <div
                        id={`${base}-op-${i}`}
                        role="option"
                        aria-selected={i === ativo}
                        onMouseMove={() => setAtivo(i)}
                        onClick={() => executar(c)}
                        className={`flex cursor-pointer items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors ${
                          i === ativo ? 'bg-azul/15 text-titulo' : 'text-texto'
                        }`}
                      >
                        <span className="truncate text-sm">{c.rotulo}</span>
                        {c.dica && <span className="shrink-0 truncate font-mono text-[0.68rem] text-suave">{c.dica}</span>}
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="flex gap-4 border-t border-white/[0.07] px-4 py-2 font-mono text-[0.65rem] text-fraco">
                <span>↑↓ navegar</span>
                <span>↵ abrir</span>
                <span className="ml-auto">{filtrados.length} itens</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
