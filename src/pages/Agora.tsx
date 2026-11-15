import Revelar from '../components/efeitos/Revelar'
import CabecalhoPagina from '../components/ui/Cabecalho'
import Janela from '../components/ui/Janela'
import { agora, atualizadoEm } from '../data/agora'
import { BLOG_URL } from '../data/blog'
import { metaPaginas } from '../data/site'
import { usarMeta } from '../lib/meta'

const dataLonga = new Date(`${atualizadoEm}T12:00:00`).toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function Agora() {
  const meta = metaPaginas['/agora']
  usarMeta(meta.titulo, meta.descricao, '/agora')

  return (
    <>
      <CabecalhoPagina
        comando="cat agora.txt"
        titulo="Agora"
        descricao="O que ocupa a cabeça neste momento. Esta é uma página /agora: em vez de currículo, um retrato do presente — atualizado de tempos em tempos."
      >
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-suave">
          <span className="size-1.5 rounded-full bg-verde" aria-hidden />
          atualizado em <time dateTime={atualizadoEm}>{dataLonga}</time>
        </p>
      </CabecalhoPagina>

      <div className="grid gap-6 md:grid-cols-2">
        {agora.map((bloco, i) => (
          <Revelar key={bloco.titulo} atraso={(i % 2) * 0.08}>
            <Janela titulo={`agora/${bloco.titulo.toLowerCase().replaceAll(' ', '-')}.txt`} quieta className="group h-full">
              <section className="px-6 pb-7 pt-5" aria-labelledby={`agora-${i}`}>
                <h2 id={`agora-${i}`} className="font-marca text-2xl font-bold italic tracking-[-0.02em] text-titulo">
                  {bloco.titulo}
                </h2>
                <ul className="mt-4 space-y-3">
                  {bloco.itens.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-texto">
                      <span aria-hidden className="font-mono text-azul-claro">
                        ›
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Janela>
          </Revelar>
        ))}
      </div>

      <p className="mt-12 max-w-2xl text-sm leading-relaxed text-suave">
        O que sai daqui como aprendizado vira nota no{' '}
        <a href={BLOG_URL} className="text-azul-claro hover:text-ciano">
          zeno.blog.br
        </a>
        . A ideia de página /agora é do Derek Sivers.
      </p>
    </>
  )
}
