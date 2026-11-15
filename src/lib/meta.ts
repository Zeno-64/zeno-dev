import { useEffect } from 'react'
import { SITE_URL } from '../data/site'

/** Troca título, descrição e URL canônica quando a página monta.
 *
 *  Isto vale para quem navega dentro do site. Para quem chega por link
 *  compartilhado (WhatsApp, LinkedIn, Google), o build já grava um HTML
 *  por rota com as mesmas meta tags — ver `metaPorRota` no vite.config.ts. */
export function usarMeta(titulo: string, descricao: string, caminho: string) {
  useEffect(() => {
    document.title = titulo
    definir('meta[name="description"]', 'content', descricao)
    definir('meta[property="og:title"]', 'content', titulo)
    definir('meta[property="og:description"]', 'content', descricao)
    definir('meta[property="og:url"]', 'content', SITE_URL + caminho)
    definir('link[rel="canonical"]', 'href', SITE_URL + caminho)
  }, [titulo, descricao, caminho])
}

function definir(seletor: string, atributo: string, valor: string) {
  document.head.querySelector(seletor)?.setAttribute(atributo, valor)
}
