import { AnimatePresence, motion } from 'framer-motion'
import { useId, useMemo, useState, type ReactNode } from 'react'
import Revelar from '../components/efeitos/Revelar'
import { copiar, useAviso } from '../components/ui/Aviso'
import Botao, { Seta } from '../components/ui/Botao'
import CabecalhoPagina from '../components/ui/Cabecalho'
import Janela from '../components/ui/Janela'
import { contato, metaPaginas } from '../data/site'
import { usarMeta } from '../lib/meta'
import { EASE_SUAVE } from '../lib/movimento'

const TIPOS = ['Site de uma página', 'Catálogo de produtos', 'Landing page', 'App', 'Extensão ou automação', 'Ainda não sei']
const DOMINIO = ['Já tenho domínio', 'Ainda não tenho', 'Não sei o que é isso']
const MATERIAL = ['Fotos e textos prontos', 'Tenho parte', 'Preciso de ajuda com isso']
const PRAZO = ['Sem pressa', 'Este mês', 'É urgente']

/** Link de WhatsApp que funciona nos dois mundos: wa.me no celular (abre
 *  o app) e web.whatsapp.com no computador — o wa.me no desktop pode
 *  fechar a aba sem abrir nada. Ver o case da Ste Sunshine. */
function linkWhatsApp(numero: string, texto: string) {
  const celular = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const t = encodeURIComponent(texto)
  return celular ? `https://wa.me/${numero}?text=${t}` : `https://web.whatsapp.com/send?phone=${numero}&text=${t}`
}

export default function Contato() {
  const meta = metaPaginas['/contato']
  usarMeta(meta.titulo, meta.descricao, '/contato')
  const avisar = useAviso()

  const [tipo, setTipo] = useState(TIPOS[0])
  const [negocio, setNegocio] = useState('')
  const [onde, setOnde] = useState('')
  const [dominio, setDominio] = useState(DOMINIO[1])
  const [material, setMaterial] = useState(MATERIAL[1])
  const [prazo, setPrazo] = useState(PRAZO[0])
  const [detalhes, setDetalhes] = useState('')

  const mensagem = useMemo(() => {
    const linhas = ['Oi, Zeno! Quero conversar sobre um projeto.', '', `• O que preciso: ${tipo}`]
    if (negocio.trim()) linhas.push(`• Negócio: ${negocio.trim()}`)
    if (onde.trim()) linhas.push(`• Onde estou hoje: ${onde.trim()}`)
    linhas.push(`• Domínio: ${dominio}`, `• Material: ${material}`, `• Prazo: ${prazo}`)
    if (detalhes.trim()) linhas.push('', detalhes.trim())
    return linhas.join('\n')
  }, [tipo, negocio, onde, dominio, material, prazo, detalhes])

  const linkedin = contato.redes.find((r) => r.nome === 'LinkedIn')

  async function copiarMensagem() {
    if (await copiar(mensagem)) avisar('mensagem copiada')
  }

  return (
    <>
      <CabecalhoPagina
        comando="./briefing.sh"
        titulo="Contato"
        descricao="Responda o que souber — a mensagem se monta sozinha ao lado. Depois é só copiar e mandar pelo canal que preferir."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:gap-14">
        {/* ---------- Formulário ---------- */}
        <form className="space-y-9" onSubmit={(e) => e.preventDefault()} aria-label="Briefing do projeto">
          <Grupo titulo="O que você precisa?">
            <Chips opcoes={TIPOS} valor={tipo} aoMudar={setTipo} nome="tipo" />
          </Grupo>

          <div className="grid gap-6 sm:grid-cols-2">
            <Campo rotulo="Nome do negócio" valor={negocio} aoMudar={setNegocio} exemplo="Ateliê da Ana" />
            <Campo rotulo="Instagram ou site atual" valor={onde} aoMudar={setOnde} exemplo="@ateliedaana" />
          </div>

          <Grupo titulo="Domínio (o endereço .com.br)">
            <Chips opcoes={DOMINIO} valor={dominio} aoMudar={setDominio} nome="dominio" />
          </Grupo>
          <Grupo titulo="Fotos e textos">
            <Chips opcoes={MATERIAL} valor={material} aoMudar={setMaterial} nome="material" />
          </Grupo>
          <Grupo titulo="Prazo">
            <Chips opcoes={PRAZO} valor={prazo} aoMudar={setPrazo} nome="prazo" />
          </Grupo>

          <label className="block" htmlFor="briefing-detalhes">
            <span className="text-sm text-titulo">Mais alguma coisa?</span>
            <textarea
              id="briefing-detalhes"
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              rows={4}
              placeholder="O que você vende, quem é o seu cliente, um site que você acha bonito…"
              className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-vidro/70 px-4 py-3 text-sm text-titulo placeholder:text-fraco focus:border-azul-claro/60 focus:outline-none"
            />
          </label>
        </form>

        {/* ---------- Mensagem ---------- */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Revelar>
            <Janela titulo="mensagem.txt" direita={<span className="font-mono text-[0.62rem] text-suave">{mensagem.length} caracteres</span>}>
              <pre className="max-h-[22rem] overflow-y-auto whitespace-pre-wrap break-words px-5 py-5 font-mono text-[0.78rem] leading-relaxed text-texto">
                {mensagem}
              </pre>
            </Janela>
          </Revelar>

          <div className="mt-5 flex flex-col gap-3">
            <Botao onClick={copiarMensagem}>Copiar mensagem</Botao>
            {contato.whatsapp && (
              <Botao para={linkWhatsApp(contato.whatsapp, mensagem)} variante="secundario">
                Enviar pelo WhatsApp <Seta externa />
              </Botao>
            )}
            {contato.email && (
              <Botao
                para={`mailto:${contato.email}?subject=${encodeURIComponent(`Projeto: ${tipo}`)}&body=${encodeURIComponent(mensagem)}`}
                variante="secundario"
              >
                Enviar por e-mail <Seta externa />
              </Botao>
            )}
            {linkedin && (
              <Botao para={linkedin.url} variante="secundario" faisca={false}>
                Abrir o LinkedIn e colar a mensagem <Seta externa />
              </Botao>
            )}
          </div>

          <ul className="mt-8 space-y-2 border-t border-white/[0.07] pt-6">
            {contato.redes.map((r) => (
              <li key={r.nome} className="flex items-center justify-between gap-3">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-sm text-texto hover:text-azul-claro">
                  {r.nome} <span className="font-mono text-xs text-suave">{r.rotulo}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copiar(r.url).then((ok) => ok && avisar(`${r.nome} copiado`))}
                  className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[0.65rem] text-suave transition hover:border-azul-claro/50 hover:text-titulo"
                  aria-label={`Copiar o link do ${r.nome}`}
                >
                  copiar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  const id = useId()
  return (
    <fieldset aria-labelledby={id}>
      <legend id={id} className="text-sm text-titulo">
        {titulo}
      </legend>
      <div className="mt-3">{children}</div>
    </fieldset>
  )
}

/** Opções em "chips" — por baixo, radios de verdade (teclado e leitor
 *  de tela funcionam como num formulário comum). */
function Chips({
  opcoes,
  valor,
  aoMudar,
  nome,
}: {
  opcoes: string[]
  valor: string
  aoMudar: (v: string) => void
  nome: string
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {opcoes.map((op) => {
        const marcado = op === valor
        return (
          <label
            key={op}
            className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm transition duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-azul-claro ${
              marcado ? 'border-azul-claro/60 text-white' : 'border-white/10 text-suave hover:border-white/25 hover:text-titulo'
            }`}
          >
            <input type="radio" name={nome} value={op} checked={marcado} onChange={() => aoMudar(op)} className="sr-only" />
            <AnimatePresence>
              {marcado && (
                <motion.span
                  layoutId={`chip-${nome}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE_SUAVE }}
                  className="absolute inset-0 rounded-full bg-azul/25"
                />
              )}
            </AnimatePresence>
            <span className="relative">{op}</span>
          </label>
        )
      })}
    </div>
  )
}

function Campo({
  rotulo,
  valor,
  aoMudar,
  exemplo,
}: {
  rotulo: string
  valor: string
  aoMudar: (v: string) => void
  exemplo: string
}) {
  // rótulo ligado por id, além do aninhamento: nome acessível sem ambiguidade
  const id = useId()
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm text-titulo">{rotulo}</span>
      <input
        id={id}
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={exemplo}
        className="mt-2 w-full rounded-xl border border-white/10 bg-vidro/70 px-4 py-3 text-sm text-titulo placeholder:text-fraco focus:border-azul-claro/60 focus:outline-none"
      />
    </label>
  )
}
