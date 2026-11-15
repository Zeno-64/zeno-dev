import { Link } from 'react-router-dom'
import { contato, dominios, navegacao, perfil } from '../../data/site'

/** Rodapé: os três domínios lado a lado (o atual marcado), navegação,
 *  redes e um "Zeno" enorme e apagado no fundo. */
export default function Rodape() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-10 pt-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-6">
        <div>
          <p className="font-marca text-2xl font-bold italic tracking-[-0.02em] text-titulo">{perfil.nick}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-suave">{perfil.resumo}</p>
          <ul className="mt-6 space-y-1.5">
            {dominios.map((d) => (
              <li key={d.host}>
                {'atual' in d ? (
                  <span className="font-mono text-sm text-titulo" aria-current="page">
                    {d.host} <span className="text-[0.68rem] text-suave">— você está aqui</span>
                  </span>
                ) : (
                  <a href={d.url} className="group font-mono text-sm text-texto transition-colors hover:text-azul-claro">
                    {d.host}{' '}
                    <span className="text-[0.68rem] text-suave group-hover:text-azul-claro">— {d.papel} ↗</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Rodapé">
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-fraco">páginas</p>
          <ul className="mt-3 grid grid-cols-2 gap-1.5 md:grid-cols-1">
            {navegacao.map((n) => (
              <li key={n.rota}>
                <Link to={n.rota} className="text-sm text-texto transition-colors hover:text-azul-claro">
                  {n.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-widest text-fraco">redes</p>
          <ul className="mt-3 space-y-1.5">
            {contato.redes.map((r) => (
              <li key={r.nome}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-texto transition-colors hover:text-azul-claro"
                >
                  {r.nome} <span className="font-mono text-[0.68rem] text-suave">{r.rotulo}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[0.68rem] leading-relaxed text-suave">
            Feito com React, Tailwind e Framer Motion.
            <br />
            Hospedado na Cloudflare.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-5 font-mono text-[0.68rem] text-suave md:px-6">
        <span>
          © {new Date().getFullYear()} {perfil.nick} · {perfil.cidade}
        </span>
        <span>
          dica: aperte <kbd className="rounded border border-white/10 px-1">Ctrl K</kbd> em qualquer página
        </span>
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.28em] left-1/2 -z-10 -translate-x-1/2 select-none font-marca text-[clamp(8rem,26vw,22rem)] font-bold italic leading-none tracking-[-0.04em] text-white/[0.025]"
      >
        {perfil.nick}
      </p>
    </footer>
  )
}
