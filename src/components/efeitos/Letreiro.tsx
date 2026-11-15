/** Faixa que corre sem parar (o "logo loop"), com as bordas sumindo
 *  num degradê. Pausa no hover. A segunda cópia da lista existe só para
 *  o laço não ter emenda — por isso é aria-hidden. */
export default function Letreiro({ itens, rotulo }: { itens: readonly string[]; rotulo: string }) {
  const lista = (copia: boolean) => (
    <ul aria-hidden={copia || undefined} className="flex shrink-0 items-center gap-10 pr-10">
      {itens.map((item) => (
        <li key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span className="font-marca text-2xl font-bold italic tracking-[-0.02em] text-suave transition-colors hover:text-titulo md:text-3xl">
            {item}
          </span>
          <span aria-hidden className="size-1.5 rotate-45 bg-azul/60" />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      aria-label={rotulo}
      role="region"
      className="group relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="flex w-max animate-letreiro group-hover:[animation-play-state:paused]">
        {lista(false)}
        {lista(true)}
      </div>
    </div>
  )
}
