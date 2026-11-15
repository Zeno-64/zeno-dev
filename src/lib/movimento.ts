/** Curvas e durações compartilhadas — as mesmas em todo o site, para o
 *  movimento ter uma "voz" só. */

export const EASE_SUAVE = [0.16, 1, 0.3, 1] as const
export const EASE_SAIDA = [0.7, 0, 0.84, 0] as const

export const DURACAO = {
  rapida: 0.18,
  media: 0.35,
  lenta: 0.6,
} as const

/** Mola das pílulas (nav e filtros): rápida, com um respiro no fim. */
export const MOLA_PILULA = { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 } as const

/** Mola de hover (cards, ímã). */
export const MOLA_HOVER = { type: 'spring', stiffness: 170, damping: 16, mass: 1 } as const

export const normalizar = (texto: string) =>
  texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

export const formatarData = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
