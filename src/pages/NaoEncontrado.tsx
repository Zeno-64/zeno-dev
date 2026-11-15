import { Link, useLocation } from 'react-router-dom'
import TextoDecifrado from '../components/efeitos/TextoDecifrado'
import Botao, { Seta } from '../components/ui/Botao'
import Janela from '../components/ui/Janela'
import { navegacao } from '../data/site'
import { usarMeta } from '../lib/meta'

export default function NaoEncontrado() {
  const { pathname } = useLocation()
  usarMeta('Página não encontrada · Zeno', 'Esse endereço não existe no zeno.dev.br.', pathname)

  return (
    <section className="grid min-h-[70vh] place-items-center py-16">
      <Janela titulo="zeno@dev: ~" className="w-full max-w-2xl">
        <div className="px-6 py-8 font-mono text-sm md:px-8">
          <p className="text-suave">
            <span className="text-azul-claro">$</span> cd {pathname}
          </p>
          <p className="mt-1 text-vermelho-claro">zeno: no such file or directory: {pathname}</p>
          <TextoDecifrado
            as="h1"
            texto="404"
            passo={70}
            className="mt-8 block font-marca text-[clamp(5rem,18vw,9rem)] font-bold italic leading-none tracking-[-0.04em] text-titulo"
          />
          <p className="mt-2 font-sans text-base text-texto">Essa página não existe — ou mudou de endereço.</p>
          <p className="mt-6 text-suave">
            <span className="text-azul-claro">$</span> ls
          </p>
          <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
            {navegacao.map((n) => (
              <li key={n.rota}>
                <Link to={n.rota} className="text-gelo hover:text-ciano">
                  {n.rota === '/' ? '~' : n.rota.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Botao para="/">
              Voltar ao início <Seta />
            </Botao>
          </div>
        </div>
      </Janela>
    </section>
  )
}
