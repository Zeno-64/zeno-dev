import type { ReactNode } from 'react'
import TextoDecifrado from '../efeitos/TextoDecifrado'
import TextoSubindo from '../efeitos/TextoSubindo'

/** Abertura padrão de página: comando de terminal pequeno, título grande
 *  que decifra e um parágrafo que sobe palavra por palavra. */
export default function CabecalhoPagina({
  comando,
  titulo,
  descricao,
  children,
}: {
  comando: string
  titulo: string
  descricao?: string
  children?: ReactNode
}) {
  return (
    <header className="pb-10 pt-14 md:pb-14 md:pt-20">
      <p className="font-mono text-xs text-suave">
        <span className="text-azul-claro">$</span> {comando}
      </p>
      <TextoDecifrado
        as="h1"
        texto={titulo}
        className="titulo-secao mt-4 text-[clamp(2.6rem,7vw,5rem)]"
      />
      {descricao && (
        <TextoSubindo
          texto={descricao}
          atraso={0.15}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-texto md:text-xl"
        />
      )}
      {children}
    </header>
  )
}

/** Título de seção dentro da página. */
export function TituloSecao({
  rotulo,
  titulo,
  descricao,
  id,
}: {
  rotulo?: string
  titulo: string
  descricao?: string
  id?: string
}) {
  return (
    <div className="mb-8 md:mb-10">
      {rotulo && <p className="font-mono text-xs text-azul-claro">{rotulo}</p>}
      <TextoDecifrado as="h2" texto={titulo} className="titulo-secao mt-2 text-[clamp(1.9rem,4.5vw,3rem)]" />
      {descricao && <p className="mt-3 max-w-2xl text-base leading-relaxed text-suave md:text-lg">{descricao}</p>}
      {id && <span id={id} className="sr-only" />}
    </div>
  )
}
