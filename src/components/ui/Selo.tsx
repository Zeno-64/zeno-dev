import { rotuloStatus, type Status } from '../../data/projetos'

const COR: Record<Status, string> = {
  'no-ar': 'border-verde/30 bg-verde/10 text-verde',
  'em-uso': 'border-azul-claro/30 bg-azul/10 text-azul-claro',
  entregue: 'border-gelo/25 bg-gelo/[0.07] text-gelo',
  'em-andamento': 'border-ambar/30 bg-ambar/10 text-ambar',
  pesquisa: 'border-vermelho-claro/30 bg-vermelho/10 text-vermelho-claro',
}

/** Selo de status do projeto, com ponto que pulsa quando está no ar. */
export default function Selo({ status, className = '' }: { status: Status; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide ${COR[status]} ${className}`}
    >
      <span className="relative flex size-1.5" aria-hidden>
        {status === 'no-ar' && <span className="pulso absolute inset-0 rounded-full bg-current" />}
        <span className="relative size-1.5 rounded-full bg-current" />
      </span>
      {rotuloStatus[status]}
    </span>
  )
}
