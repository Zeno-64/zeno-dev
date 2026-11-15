import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import CartaoProjeto from '../components/CartaoProjeto'
import Abas from '../components/ui/Abas'
import CabecalhoPagina from '../components/ui/Cabecalho'
import Selo from '../components/ui/Selo'
import { categorias, projetos, type Categoria, type Status } from '../data/projetos'
import { metaPaginas } from '../data/site'
import { usarMeta } from '../lib/meta'
import { EASE_SUAVE } from '../lib/movimento'

type Filtro = Categoria | 'todos'

const ORDEM_STATUS: Status[] = ['no-ar', 'em-uso', 'em-andamento', 'entregue', 'pesquisa']

export default function Projetos() {
  const meta = metaPaginas['/projetos']
  usarMeta(meta.titulo, meta.descricao, '/projetos')

  // o filtro mora na URL (?tipo=app): dá para mandar o link já filtrado
  const [params, setParams] = useSearchParams()
  const tipo = params.get('tipo')
  const ativo: Filtro = categorias.some((c) => c.id === tipo) ? (tipo as Filtro) : 'todos'

  const lista = projetos.filter((p) => ativo === 'todos' || p.categoria === ativo)
  const abas = categorias.map((c) => ({
    id: c.id,
    rotulo: c.rotulo,
    contagem: c.id === 'todos' ? projetos.length : projetos.filter((p) => p.categoria === c.id).length,
  }))

  function trocar(id: Filtro) {
    setParams(id === 'todos' ? {} : { tipo: id }, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <CabecalhoPagina
        comando="ls ~/projetos"
        titulo="Projetos"
        descricao="Sites de clientes, apps em construção, uma extensão em uso diário e o que está no laboratório. Clique em qualquer um para ver o contexto e as decisões."
      />

      <div className="sticky top-16 z-30 -mx-4 flex flex-wrap items-center justify-between gap-4 bg-fundo/70 px-4 py-3 backdrop-blur-xl md:-mx-6 md:px-6">
        <Abas abas={abas} ativa={ativo} aoTrocar={trocar} rotulo="Filtrar projetos por tipo" grupo="projetos" />
        <ul className="hidden flex-wrap gap-2 lg:flex" aria-label="Legenda de status">
          {ORDEM_STATUS.map((s) => (
            <li key={s}>
              <Selo status={s} />
            </li>
          ))}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        {lista.length} projetos
      </p>

      <motion.div layout className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {lista.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
              transition={{ duration: 0.5, ease: EASE_SUAVE, delay: Math.min(i, 6) * 0.04 }}
            >
              <CartaoProjeto projeto={p} prioridade={i < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
