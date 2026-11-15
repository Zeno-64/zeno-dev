import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { navegacao } from '../../data/site'
import { EASE_SUAVE } from '../../lib/movimento'
import BarraProgresso from '../efeitos/BarraProgresso'
import Faiscas from '../efeitos/Faiscas'
import FundoVivo from '../efeitos/FundoVivo'
import Paleta from '../Paleta'
import { ProvedorAviso } from '../ui/Aviso'
import Rodape from './Rodape'
import Topo from './Topo'

/** Posição da rota na ordem da navegação. Página de projeto fica logo
 *  depois da lista de projetos. Desconhecida (404) vai para o fim. */
function posicao(caminho: string) {
  if (caminho.startsWith('/projetos/')) return 1.5
  const i = navegacao.findIndex((n) => n.rota === caminho)
  return i === -1 ? navegacao.length : i
}

/** Congela a página que está saindo: sem isto, o elemento antigo seria
 *  trocado pelo novo antes da animação de saída terminar. */
function PaginaCongelada() {
  const saida = useOutlet()
  const [congelada] = useState(saida)
  return congelada
}

/** Transição "lado a lado" (forward/back): avançando na ordem do menu,
 *  a página nova entra pela direita; voltando, entra pela esquerda. */
const variantes = {
  entrar: (dir: number) => ({ opacity: 0, x: dir * 48, filter: 'blur(6px)' }),
  // terminada a entrada, tira o filtro de vez: um `filter` qualquer (até
  // blur(0)) prende position: fixed dos filhos e mantém uma camada extra
  centro: { opacity: 1, x: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } },
  sair: (dir: number) => ({ opacity: 0, x: dir * -48, filter: 'blur(6px)' }),
}

export default function Layout() {
  const local = useLocation()
  const [anterior, setAnterior] = useState(local.pathname)
  const [direcao, setDirecao] = useState(1)
  const [paleta, setPaleta] = useState(false)

  // "estado derivado da render anterior", no padrão da documentação do React
  if (anterior !== local.pathname) {
    setDirecao(posicao(local.pathname) >= posicao(anterior) ? 1 : -1)
    setAnterior(local.pathname)
  }

  const abrirPaleta = useCallback(() => setPaleta(true), [])

  // âncora (#perguntas): rola até o alvo, esperando a página nova montar
  // se a âncora veio junto com uma troca de página
  useEffect(() => {
    if (!local.hash) return
    let tentativas = 0
    const t = setInterval(() => {
      const alvo = document.getElementById(decodeURIComponent(local.hash.slice(1)))
      if (alvo || ++tentativas > 20) {
        clearInterval(t)
        alvo?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 60)
    return () => clearInterval(t)
  }, [local.hash, local.pathname])

  useEffect(() => {
    function atalho(e: KeyboardEvent) {
      const alvo = e.target as HTMLElement
      const digitando = alvo.closest('input, textarea, [contenteditable="true"]')
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setPaleta((p) => !p)
      } else if (e.key === '/' && !digitando) {
        e.preventDefault()
        setPaleta(true)
      }
    }
    window.addEventListener('keydown', atalho)
    return () => window.removeEventListener('keydown', atalho)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <ProvedorAviso>
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-full bg-azul px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        <FundoVivo />
        <BarraProgresso />
        <Topo abrirPaleta={abrirPaleta} />

        <AnimatePresence
          mode="wait"
          custom={direcao}
          initial={false}
          onExitComplete={() => {
            if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
          }}
        >
          <motion.main
            id="conteudo"
            key={local.pathname}
            custom={direcao}
            variants={variantes}
            initial="entrar"
            animate="centro"
            exit="sair"
            transition={{ duration: 0.38, ease: EASE_SUAVE }}
            className="mx-auto min-h-[70vh] max-w-6xl px-4 md:px-6"
          >
            <PaginaCongelada />
          </motion.main>
        </AnimatePresence>

        <Rodape />
        <Paleta aberta={paleta} aoFechar={() => setPaleta(false)} />
        <Faiscas />
      </ProvedorAviso>
    </MotionConfig>
  )
}
