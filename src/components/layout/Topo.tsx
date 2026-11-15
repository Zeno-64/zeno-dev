import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { contato, dominios, navegacao, perfil } from '../../data/site'
import { EASE_SUAVE, MOLA_PILULA } from '../../lib/movimento'

const NAV_TOPO = navegacao.filter((n) => n.rota !== '/' && n.rota !== '/contato')

/** Cabeçalho fixo: logo, navegação com a pílula que segue a página
 *  ativa, atalho da paleta e o botão de contato. No celular, vira um
 *  menu de tela cheia com os links entrando em cascata. */
export default function Topo({ abrirPaleta }: { abrirPaleta: () => void }) {
  const { pathname } = useLocation()
  const [menu, setMenu] = useState(false)
  const [rolou, setRolou] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setRolou(y > 12))

  useEffect(() => setMenu(false), [pathname])

  // girou o tablet ou alargou a janela até o menu de desktop: fecha o
  // menu de celular, senão o body ficaria travado sem nada na tela
  useEffect(() => {
    const largo = window.matchMedia('(min-width: 64rem)')
    const aoMudar = () => largo.matches && setMenu(false)
    largo.addEventListener('change', aoMudar)
    return () => largo.removeEventListener('change', aoMudar)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    if (!menu) return
    const fechar = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', fechar)
    return () => window.removeEventListener('keydown', fechar)
  }, [menu])

  const ativa = (rota: string) => pathname === rota || pathname.startsWith(rota + '/')

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        rolou || menu ? 'border-b border-white/[0.06] bg-fundo/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:px-6">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Zeno — início">
          <span className="moldura-luz luz-vermelha giro-rapido rounded-[11px] !p-[1px]">
            <img
              src={perfil.foto}
              alt=""
              width={32}
              height={32}
              className="block size-8 rounded-[10px] border-2 border-fundo object-cover"
            />
          </span>
          <span className="font-marca text-xl font-bold italic tracking-[-0.02em] text-titulo">{perfil.nick}</span>
          <span className="rounded border border-azul/30 bg-azul/10 px-1.5 py-px font-mono text-[0.6rem] text-azul-claro">.dev</span>
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_TOPO.map((item) => (
              <li key={item.rota}>
                <NavLink
                  to={item.rota}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                    ativa(item.rota) ? 'text-titulo' : 'text-suave hover:text-titulo'
                  }`}
                >
                  {ativa(item.rota) && (
                    <motion.span
                      layoutId="pilula-nav"
                      transition={MOLA_PILULA}
                      className="absolute inset-0 rounded-full border border-azul/30 bg-azul/[0.12]"
                    />
                  )}
                  <span className="relative">{item.rotulo}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={abrirPaleta}
          className="ml-auto hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[0.7rem] text-suave transition hover:border-azul-claro/40 hover:text-titulo lg:ml-2 lg:flex"
          aria-label="Abrir paleta de comandos (Ctrl K)"
        >
          <span>buscar</span>
          <kbd className="whitespace-nowrap rounded border border-white/10 px-1 text-[0.62rem]">Ctrl K</kbd>
        </button>

        <Link
          to="/contato"
          data-faisca=""
          className="hidden rounded-full bg-azul px-4 py-1.5 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(47,129,247,0.9)] transition hover:bg-[#3d8dfa] lg:block"
        >
          Contato
        </Link>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={abrirPaleta}
            className="grid size-10 place-items-center rounded-full border border-white/10 text-suave"
            aria-label="Abrir paleta de comandos"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="menu-celular"
            className="relative grid size-10 place-items-center rounded-full border border-white/10"
            aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
          >
            <span
              className={`absolute h-px w-4 bg-titulo transition duration-300 ease-suave ${menu ? 'rotate-45' : '-translate-y-1'}`}
            />
            <span
              className={`absolute h-px w-4 bg-titulo transition duration-300 ease-suave ${menu ? '-rotate-45' : 'translate-y-1'}`}
            />
          </button>
        </div>
      </div>

      {/* Portal para o body: o cabeçalho ganha backdrop-filter quando o
          menu abre, e um ancestral com filtro vira o "containing block" de
          quem é position: fixed — o menu ficaria preso aos 64px do topo. */}
      {createPortal(
        <AnimatePresence>
          {menu && (
            <motion.div
              id="menu-celular"
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.45, ease: EASE_SUAVE }}
              className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-fundo/95 px-6 pb-10 pt-6 backdrop-blur-xl lg:hidden"
            >
              <nav aria-label="Menu">
                <motion.ul
                  initial="fora"
                  animate="dentro"
                  transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
                  className="flex flex-col"
                >
                  {navegacao.map((item) => (
                    <motion.li
                      key={item.rota}
                      variants={{ fora: { opacity: 0, x: -16 }, dentro: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.4, ease: EASE_SUAVE }}
                      className="border-b border-white/[0.06]"
                    >
                      <NavLink
                        to={item.rota}
                        className={`flex items-baseline justify-between py-4 font-marca text-3xl font-bold italic tracking-[-0.02em] ${
                          (item.rota === '/' ? pathname === '/' : ativa(item.rota)) ? 'text-gelo-claro' : 'text-titulo'
                        }`}
                      >
                        {item.rotulo}
                        <span className="font-mono text-xs font-normal not-italic text-fraco">{item.rota}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-suave">
                {dominios.map((d) => (
                  <a key={d.host} href={d.url} className="hover:text-azul-claro">
                    {d.host}
                  </a>
                ))}
                {contato.redes.map((r) => (
                  <a key={r.nome} href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-azul-claro">
                    {r.nome} ↗
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}
