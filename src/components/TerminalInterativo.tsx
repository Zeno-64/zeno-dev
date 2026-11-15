import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { agora } from '../data/agora'
import { BLOG_URL } from '../data/blog'
import { projetos } from '../data/projetos'
import { perfil } from '../data/site'
import { stack } from '../data/stack'
import { normalizar } from '../lib/movimento'
import Janela from './ui/Janela'

type Linha = { id: number; conteudo: ReactNode; tipo?: 'cmd' | 'erro' | 'ok' }

const PAGINAS: Record<string, string> = {
  inicio: '/',
  home: '/',
  projetos: '/projetos',
  servicos: '/servicos',
  sobre: '/sobre',
  stack: '/stack',
  agora: '/agora',
  contato: '/contato',
}

const AJUDA: [string, string][] = [
  ['help', 'lista os comandos'],
  ['whoami', 'quem é o Zeno'],
  ['ls', 'páginas do site'],
  ['cd <página>', 'vai até a página (ex.: cd projetos)'],
  ['projetos', 'lista os projetos'],
  ['abrir <projeto>', 'abre um projeto (ex.: abrir zapflow)'],
  ['stack', 'o que eu uso'],
  ['agora', 'no que estou trabalhando'],
  ['blog', 'abre o zeno.blog.br'],
  ['clear', 'limpa a tela'],
]

/** O terminal da home: uma sessão gravada que roda sozinha e, no fim,
 *  um prompt de verdade para o visitante digitar. É a "coisa viva" da
 *  página — e um atalho para tudo. */
export default function TerminalInterativo() {
  const navegar = useNavigate()
  const reduzido = useReducedMotion()
  const [linhas, setLinhas] = useState<Linha[]>([])
  const [pronto, setPronto] = useState(false)
  const [entrada, setEntrada] = useState('')
  const [historico, setHistorico] = useState<string[]>([])
  const [posHist, setPosHist] = useState(-1)
  const campo = useRef<HTMLInputElement>(null)
  const tela = useRef<HTMLDivElement>(null)
  const seq = useRef(0)

  const novaLinha = (conteudo: ReactNode, tipo?: Linha['tipo']): Linha => ({ id: seq.current++, conteudo, tipo })

  // sessão gravada de abertura
  useEffect(() => {
    const roteiro: Linha[] = [
      novaLinha('zeno --resumo', 'cmd'),
      novaLinha(
        <>
          <span className="text-gelo">backend </span> Java · Spring Boot · AWS
        </>,
      ),
      novaLinha(
        <>
          <span className="text-gelo">web     </span> React · TypeScript · Tailwind
        </>,
      ),
      novaLinha(
        <>
          <span className="text-gelo">apps    </span> React Native · Expo · Supabase
        </>,
      ),
      novaLinha(
        <>
          <span className="text-gelo">projetos</span> {projetos.length} no portfólio, {projetos.filter((p) => p.status === 'no-ar').length} no
          ar agora
        </>,
      ),
      novaLinha(
        <span className="text-suave">
          digite <span className="text-ciano">help</span> para ver os comandos
        </span>,
      ),
    ]
    if (reduzido) {
      setLinhas(roteiro)
      setPronto(true)
      return
    }
    const timers = roteiro.map((l, i) =>
      setTimeout(() => setLinhas((atual) => [...atual, l]), 500 + i * (i === 0 ? 0 : 260) + (i > 0 ? 450 : 0)),
    )
    const fim = setTimeout(() => setPronto(true), 500 + roteiro.length * 260 + 600)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(fim)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduzido])

  useEffect(() => {
    tela.current?.scrollTo({ top: tela.current.scrollHeight, behavior: reduzido ? 'auto' : 'smooth' })
  }, [linhas, reduzido])

  function responder(texto: string): Linha[] {
    const [cmd = '', ...resto] = texto.trim().split(/\s+/)
    const arg = normalizar(resto.join(' '))
    switch (normalizar(cmd)) {
      case '':
        return []
      case 'help':
      case 'ajuda':
        return AJUDA.map(([c, d]) =>
          novaLinha(
            <>
              <span className="inline-block w-[9.5rem] text-ciano">{c}</span>
              <span className="text-suave">{d}</span>
            </>,
          ),
        )
      case 'whoami':
        return [novaLinha(`${perfil.nick} — ${perfil.papel.toLowerCase()}. ${perfil.resumo}`)]
      case 'ls':
        return [novaLinha(Object.keys(PAGINAS).filter((p) => p !== 'home').join('  '))]
      case 'cd': {
        const rota = PAGINAS[arg]
        if (!rota) return [novaLinha(`cd: página não encontrada: ${resto.join(' ') || '(vazio)'}`, 'erro')]
        setTimeout(() => navegar(rota), 350)
        return [novaLinha(`indo para ${rota}…`, 'ok')]
      }
      case 'projetos':
      case 'ls-projetos':
        return projetos.map((p) =>
          novaLinha(
            <>
              <span className="inline-block w-[11rem] truncate align-bottom text-ciano">{p.slug}</span>
              <span className="text-suave">{p.resumo}</span>
            </>,
          ),
        )
      case 'abrir':
      case 'open': {
        const p = projetos.find((x) => x.slug === arg || normalizar(x.nome).includes(arg))
        if (!arg || !p) return [novaLinha(`abrir: projeto não encontrado. tente: projetos`, 'erro')]
        setTimeout(() => navegar(`/projetos/${p.slug}`), 350)
        return [novaLinha(`abrindo ${p.nome}…`, 'ok')]
      }
      case 'stack':
        return stack.map((g) =>
          novaLinha(
            <>
              <span className="inline-block w-[7rem] text-gelo">{g.titulo.toLowerCase()}</span>
              {g.itens.map((i) => i.nome).join(' · ')}
            </>,
          ),
        )
      case 'agora':
        return agora.flatMap((bloco) => [
          novaLinha(<span className="text-gelo">{bloco.titulo.toLowerCase()}</span>),
          ...bloco.itens.map((i) => novaLinha(<span className="text-suave">  · {i}</span>)),
        ])
      case 'blog':
        window.open(BLOG_URL, '_blank', 'noopener,noreferrer')
        return [novaLinha('abrindo zeno.blog.br em outra aba…', 'ok')]
      case 'clear':
      case 'limpar':
        setLinhas([])
        return []
      case 'sudo':
        return [novaLinha('permissão negada. boa tentativa :)', 'erro')]
      case 'rm':
        return [novaLinha('aqui não. ;)', 'erro')]
      default:
        return [novaLinha(`comando não encontrado: ${cmd}. digite help`, 'erro')]
    }
  }

  function enviar(e: FormEvent) {
    e.preventDefault()
    const texto = entrada
    setEntrada('')
    setPosHist(-1)
    if (texto.trim()) setHistorico((h) => [texto, ...h].slice(0, 30))
    const eco = novaLinha(texto, 'cmd')
    const resposta = responder(texto)
    if (normalizar(texto.trim()) === 'clear' || normalizar(texto.trim()) === 'limpar') return
    setLinhas((atual) => [...atual, eco, ...resposta])
  }

  function teclar(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowUp' && historico.length) {
      e.preventDefault()
      const p = Math.min(posHist + 1, historico.length - 1)
      setPosHist(p)
      setEntrada(historico[p])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const p = posHist - 1
      setPosHist(p)
      setEntrada(p >= 0 ? historico[p] : '')
    }
  }

  return (
    <Janela
      titulo="zeno@dev: ~"
      direita={
        <Link to="/contato" className="font-mono text-[0.65rem] text-suave hover:text-azul-claro">
          bash
        </Link>
      }
      className="w-full"
    >
      <div
        ref={tela}
        onClick={() => campo.current?.focus()}
        className="h-[19rem] cursor-text overflow-y-auto px-4 py-4 font-mono text-[0.78rem] leading-relaxed md:h-[21rem]"
      >
        <div aria-live="polite" aria-relevant="additions">
          {linhas.map((l) => (
            <motion.p
              key={l.id}
              initial={reduzido ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`whitespace-pre-wrap break-words ${
                l.tipo === 'erro' ? 'text-vermelho-claro' : l.tipo === 'ok' ? 'text-verde' : 'text-texto'
              }`}
            >
              {l.tipo === 'cmd' && <span className="text-azul-claro">$ </span>}
              {l.conteudo}
            </motion.p>
          ))}
        </div>

        {pronto && (
          <form onSubmit={enviar} className="mt-1 flex items-center gap-2">
            <label htmlFor="terminal-entrada" className="text-azul-claro">
              $<span className="sr-only">Comando do terminal</span>
            </label>
            <input
              id="terminal-entrada"
              ref={campo}
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              onKeyDown={teclar}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="help"
              className="min-w-0 flex-1 bg-transparent text-titulo caret-ciano placeholder:text-fraco focus:outline-none"
            />
          </form>
        )}
      </div>
    </Janela>
  )
}
