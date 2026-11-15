import { useEffect, useState } from 'react'
import { FEED_URL, postsReserva, type PostResumo } from '../data/blog'

type ItemFeed = {
  title?: string
  url?: string
  summary?: string
  date_published?: string
  tags?: string[]
}

/** Últimos posts do zeno.blog.br, lidos do JSON Feed dele.
 *  Começa com a lista reserva (render imediato, sem "pulo") e troca pela
 *  lista viva se o feed responder em até 4 s. `origem` diz qual está na tela. */
export function useUltimosPosts(quantos = 3) {
  const [posts, setPosts] = useState<PostResumo[]>(postsReserva.slice(0, quantos))
  const [origem, setOrigem] = useState<'reserva' | 'feed'>('reserva')

  useEffect(() => {
    const controle = new AbortController()
    const limite = setTimeout(() => controle.abort(), 4000)

    fetch(FEED_URL, { signal: controle.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((feed: { items?: ItemFeed[] }) => {
        const itens = (feed.items ?? [])
          .filter((i) => i.title && i.url)
          .slice(0, quantos)
          .map((i) => ({
            titulo: i.title!,
            url: i.url!,
            resumo: i.summary ?? '',
            data: (i.date_published ?? '').slice(0, 10),
            tags: i.tags ?? [],
          }))
        if (itens.length > 0) {
          setPosts(itens)
          setOrigem('feed')
        }
      })
      .catch(() => {
        /* fica a reserva — sem barulho no console de quem visita */
      })
      .finally(() => clearTimeout(limite))

    return () => {
      clearTimeout(limite)
      controle.abort()
    }
  }, [quantos])

  return { posts, origem }
}
