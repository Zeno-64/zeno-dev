/** Molduras para screenshots: uma de navegador (desktop) e uma de
 *  celular. As imagens são capturas reais dos sites, em public/projetos. */

export function TelaNavegador({
  src,
  host,
  alt,
  prioridade = false,
  className = '',
}: {
  src: string
  host?: string
  alt: string
  prioridade?: boolean
  className?: string
}) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-white/[0.08] bg-vidro shadow-2xl shadow-black/50 ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <span className="flex gap-1" aria-hidden>
          <i className="size-2 rounded-full bg-[#ff5f57]/70" />
          <i className="size-2 rounded-full bg-[#febc2e]/70" />
          <i className="size-2 rounded-full bg-[#28c840]/70" />
        </span>
        {host && (
          <span className="mx-auto max-w-[70%] truncate rounded-md bg-black/30 px-3 py-0.5 font-mono text-[0.62rem] text-suave">
            {host}
          </span>
        )}
      </div>
      <img
        src={src}
        alt={alt}
        width={1440}
        height={900}
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : 'auto'}
        decoding="async"
        className="block aspect-[16/10] w-full object-cover object-top"
      />
    </figure>
  )
}

export function TelaCelular({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <figure
      className={`overflow-hidden rounded-[1.6rem] border-[5px] border-[#1a2233] bg-black shadow-2xl shadow-black/60 ring-1 ring-white/10 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={390}
        height={844}
        loading="lazy"
        decoding="async"
        className="block aspect-[390/844] w-full object-cover object-top"
      />
    </figure>
  )
}

/** "Capa" de projeto sem tela pública (apps, extensão, pesquisa): um
 *  terminal com as linhas que resumem a arquitetura. */
export function CapaTerminal({ arquivo, linhas, className = '' }: { arquivo: string; linhas: string[]; className?: string }) {
  return (
    <div
      className={`relative flex aspect-[16/10] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#070a12] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 py-2">
        <span className="flex gap-1" aria-hidden>
          <i className="size-2 rounded-full bg-fraco/70" />
          <i className="size-2 rounded-full bg-fraco/70" />
          <i className="size-2 rounded-full bg-azul/80" />
        </span>
        <span className="font-mono text-[0.62rem] text-suave">{arquivo}</span>
      </div>
      <div className="relative flex flex-1 flex-col justify-center gap-2 px-5 py-4 font-mono text-[clamp(0.62rem,1.4vw,0.8rem)] leading-relaxed">
        {linhas.map((linha, i) => {
          const [antes, depois] = linha.split('→')
          return (
            <p key={i} className="truncate">
              <span className="mr-2 select-none text-fraco">{String(i + 1).padStart(2, ' ')}</span>
              <span className="text-gelo">{antes}</span>
              {depois !== undefined && (
                <>
                  <span className="text-azul">→</span>
                  <span className="text-texto">{depois}</span>
                </>
              )}
            </p>
          )
        })}
        <p className="text-fraco">
          <span className="mr-2 select-none">{String(linhas.length + 1).padStart(2, ' ')}</span>
          <span className="cursor-piscando inline-block h-[1em] w-[0.55ch] bg-ciano align-middle" />
        </p>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full blur-3xl"
          style={{ background: 'color-mix(in oklab, var(--color-azul) 22%, transparent)' }}
        />
      </div>
    </div>
  )
}
